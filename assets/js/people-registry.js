// DS4CABS people registry selectors.
// Works in browsers and Node so the roster rules stay testable.
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.DS4CABS_PEOPLE_REGISTRY = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function isActive(person) {
    return person.active !== false;
  }

  function buildPeopleViews(people, activeYear) {
    const list = Array.isArray(people) ? people : [];
    const active = list.filter(isActive);
    const leadership = active.filter(person => person.type === "leader");
    const mentors = active.filter(person => person.type === "mentor" || person.type === "admin");
    const mentees = active.filter(person => person.type === "mentee" && person.year === activeYear);

    const years = [...new Set(
      active
        .filter(person => person.type === "mentee" && Number.isFinite(person.year))
        .map(person => person.year)
    )].sort((a, b) => b - a);

    const cohorts = {};
    years.forEach(year => {
      cohorts[year] = active.filter(person => person.type === "mentee" && person.year === year);
    });

    return {
      homepage: { leadership, mentors, mentees },
      mentorPage: { leadership, mentors },
      cohorts
    };
  }

  return { buildPeopleViews };
});
