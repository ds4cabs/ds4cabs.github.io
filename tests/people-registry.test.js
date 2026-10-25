const test = require('node:test');
const assert = require('node:assert/strict');

const { buildPeopleViews } = require('../assets/js/people-registry.js');

test('buildPeopleViews derives every page roster from one registry', () => {
  const people = [
    { id: 'lead', name: 'Leader', type: 'leader', role: 'Program Lead', active: true },
    { id: 'mentor', name: 'Mentor', type: 'mentor', role: 'Mentor', active: true },
    { id: 'admin', name: 'Admin', type: 'admin', role: 'Admin & Mentor', active: true },
    { id: 'mentee-2026', name: 'Current Mentee', type: 'mentee', role: 'Intern', year: 2026 },
    { id: 'mentee-2025', name: 'Past Mentee', type: 'mentee', role: 'Intern', year: 2025 },
    { id: 'inactive-mentor', name: 'Inactive Mentor', type: 'mentor', role: 'Mentor', active: false }
  ];

  const views = buildPeopleViews(people, 2026);

  assert.deepEqual(views.homepage.leadership.map(p => p.id), ['lead']);
  assert.deepEqual(views.homepage.mentors.map(p => p.id), ['mentor', 'admin']);
  assert.deepEqual(views.homepage.mentees.map(p => p.id), ['mentee-2026']);
  assert.deepEqual(views.mentorPage.leadership.map(p => p.id), ['lead']);
  assert.deepEqual(views.mentorPage.mentors.map(p => p.id), ['mentor', 'admin']);
  assert.deepEqual(Object.keys(views.cohorts), ['2025', '2026']);
  assert.deepEqual(views.cohorts[2025].map(p => p.id), ['mentee-2025']);
});

test('the production registry contains every roster and profile page', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const registryPath = path.join(__dirname, '..', 'people.json');
  const people = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const views = buildPeopleViews(people, 2026);

  assert.equal(people.length, 72);
  assert.equal(new Set(people.map(person => person.id)).size, 72);
  assert.equal(views.homepage.leadership.length, 3);
  assert.equal(views.homepage.mentors.length, 16);
  assert.equal(views.homepage.mentees.length, 30);
  assert.equal(views.cohorts[2025].length, 21);
  assert.equal(views.cohorts[2024].length, 2);

  const profileFiles = ['mentor', 'admin', 'mentee']
    .flatMap(directory => fs.readdirSync(path.join(__dirname, '..', directory))
      .filter(name => name.endsWith('.html') && name !== 'profile-template.html')
      .map(name => `${directory}/${name}`));
  const registeredProfiles = people.map(person => person.profile).filter(Boolean);
  assert.deepEqual([...registeredProfiles].sort(), [...profileFiles].sort());
});

test('every page that renders cards loads the people registry helper before main.js', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const root = path.join(__dirname, '..');
  const pages = fs.readdirSync(root, { recursive: true })
    .filter(name => name.endsWith('.html'))
    .map(name => path.join(root, name))
    .filter(file => fs.readFileSync(file, 'utf8').includes('main.js'));

  assert.ok(pages.length > 0);
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const helper = html.indexOf('people-registry.js');
    const main = html.indexOf('main.js');
    assert.ok(helper >= 0, `${path.relative(root, file)} is missing people-registry.js`);
    assert.ok(helper < main, `${path.relative(root, file)} loads main.js before people-registry.js`);
  }
});

test('main.js loads people.json and builds page views from the registry', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'main.js'), 'utf8');

  assert.match(source, /new URL\("\.\.\/\.\.\/people\.json"/);
  assert.doesNotMatch(source, /data\/people\.json/);
  assert.match(source, /buildPeopleViews\(/);
  assert.doesNotMatch(source, /cohort\.mentors|cohort\.interns|cohort\.leadership|data\.team/);
});

test('projects.js contains cohort metadata but no duplicated person rosters', () => {
  const path = require('node:path');
  const projectsPath = path.join(__dirname, '..', 'assets', 'js', 'projects.js');
  global.window = {};
  delete require.cache[require.resolve(projectsPath)];
  require(projectsPath);
  const projects = global.window.DS4CABS_PROJECTS;

  assert.equal(projects.team, undefined);
  for (const cohort of Object.values(projects.cohorts)) {
    assert.equal(cohort.mentors, undefined);
    assert.equal(cohort.interns, undefined);
    assert.equal(cohort.leadership, undefined);
  }
});

test('role README files are generated from people.json', () => {
  const path = require('node:path');
  const { spawnSync } = require('node:child_process');
  const script = path.join(__dirname, '..', 'scripts', 'generate_people_readmes.py');
  const result = spawnSync('python3', [script, '--check'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test('role folders provide templates and every profile carries registration metadata', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const root = path.join(__dirname, '..');

  for (const directory of ['mentor', 'admin', 'mentee']) {
    assert.ok(fs.existsSync(path.join(root, directory, 'profile-template.html')), `${directory} template is missing`);
    const profiles = fs.readdirSync(path.join(root, directory)).filter(name => name.endsWith('.html') && name !== 'profile-template.html');
    for (const name of profiles) {
      const html = fs.readFileSync(path.join(root, directory, name), 'utf8');
      assert.match(html, /<meta name="ds4cabs-name" content="[^"]+"\s*\/?>/, `${directory}/${name} is missing ds4cabs-name`);
      assert.match(html, /<meta name="ds4cabs-role" content="[^"]+"\s*\/?>/, `${directory}/${name} is missing ds4cabs-role`);
      if (directory === 'mentee') {
        assert.match(html, /<meta name="ds4cabs-year" content="\d{4}"\s*\/?>/, `${directory}/${name} is missing ds4cabs-year`);
      }
    }
  }

  const script = path.join(root, 'scripts', 'generate_people_readmes.py');
  const { spawnSync } = require('node:child_process');
  const result = spawnSync('python3', [script, '--validate'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test('GitHub Actions validates profile uploads and regenerates the public registry', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const workflow = path.join(__dirname, '..', '.github', 'workflows', 'sync-people.yml');
  assert.ok(fs.existsSync(workflow), 'sync-people workflow is missing');
  const source = fs.readFileSync(workflow, 'utf8');
  assert.match(source, /pull_request:/);
  assert.match(source, /push:/);
  assert.match(source, /generate_people_readmes\.py --validate/);
  assert.match(source, /generate_people_readmes\.py/);
  assert.match(source, /git push/);
});
