// DS4CABS — Project catalog
// Categories: agents, rag, trials, discovery, workshop, ds4, market, regulatory, infrastructure, misc
// Edit this file to add/update projects. The site reads from window.DS4CABS_PROJECTS.

window.DS4CABS_PROJECTS = {
  // ====================================================================
  // TEAM — full DS4CABS roster (cross-cohort, evergreen).
  // --------------------------------------------------------------------
  // Rendered on /team.html. The current-cohort grids on the home page
  // still read from `cohorts.<year>` (mentors / interns / leadership).
  //
  // Person entry schema is the same as cohort entries, plus an optional
  // `email` field that renders as a mailto link.
  // ====================================================================
  team: {
    leaders: [
      { name: "Shicheng Guo",   role: "Program Lead",  affiliation: "CABS · DS4CABS", email: "shicheng.guo@cabsweb.org", headshot: "assets/img/people/shicheng-guo.jpg" },
      { name: "Sihong Zhou",    role: "Program Lead",  affiliation: "CABS · DS4CABS", email: "sihong.zhou@cabsweb.org" },
      { name: "Liping Meng",    role: "Program Lead",  affiliation: "CABS · DS4CABS", email: "liping.meng@cabsweb.org" }
    ],
    mentors_admin: [
      { name: "Baixue Zhang (Doris)", role: "Admin & Mentor", email: "doris.zbx@gmail.com",       headshot: "assets/img/people/baixue-zhang.jpg" },
      { name: "Quinn Leng",           role: "Admin & Mentor", email: "quinn.leng.666@gmail.com",  headshot: "assets/img/people/quinn-leng.jpeg" },
      { name: "Yongli Shan",          role: "Admin & Mentor", email: "shan.yongli@gmail.com",     headshot: "assets/img/people/yongli-shan.jpg" },
      { name: "Ying Yang",            role: "Admin & Mentor", email: "yangying2013@gmail.com",    headshot: "assets/img/people/ying-yang.jpeg" },
      { name: "Zuolin Cheng",         role: "Admin & Mentor", email: "zuolincheng166@gmail.com",  headshot: "assets/img/people/zuolin-cheng.jpg" },
      { name: "Yuntao Zhang",         role: "Admin & Mentor", email: "ustb.zhangyuntao@gmail.com",headshot: "assets/img/people/yuntao-zhang.jpg" },
      { name: "Alexander Wu",         role: "Admin & Mentor", email: "alexander.wu7@gmail.com",   headshot: "assets/img/people/alexander-wu.jpg" },
      { name: "Kay Tong",             role: "Admin & Mentor", email: "kay.tong@cabsweb.org" },
      { name: "Lena Li",              role: "Admin & Mentor", email: "lena.li@cabsweb.org" },
      { name: "Zhiqing Wang",         role: "Admin & Mentor", email: "zwang9187@gmail.com" },
      { name: "Le Cai",               role: "Admin & Mentor", email: "le.cai@cabsweb.org",        headshot: "assets/img/people/le-cai.jpg" },
      { name: "Jingyuan Huang",       role: "Admin & Mentor", email: "elvahdesign@gmail.com" }
    ],
    // Intern entries support optional `affiliation`, `linkedin`, and
    // `github` fields. Empty strings are skipped by the renderer.
    // Data sourced from assets/img/people/CABS_2026_Interns_Master_Merged.xlsx.
    interns_mentees: [
      { name: "Jia Chen", role: "Intern", email: "jiabreaker@gmail.com", affiliation: "Student @ University of Washington, Information School", linkedin: "https://www.linkedin.com/in/jah-chen-at-uw/", github: "https://github.com/JahMeat", headshot: "assets/img/people/jia-chen.jpg" },
      { name: "Yu-Jung Liang", role: "Intern", email: "angelliang112@gmail.com", affiliation: "Master Student, UCSD", linkedin: "", github: "https://github.com/amberyliang", headshot: "assets/img/people/yu-jung-liang.jpg" },
      { name: "Anagha Gardane", role: "Intern", email: "angdata09@gmail.com", affiliation: "MS, University of Delaware", linkedin: "https://www.linkedin.com/in/93006b68/", github: "", headshot: "assets/img/people/anagha-gardane.jpg" },
      { name: "Chengxi Zhang", role: "Intern", email: "zhangcx318@gmail.com", affiliation: "Graduate Student, Georgia Tech", linkedin: "https://linkedin.com/in/chengxizhang", github: "https://github.com/AngryMonsta", headshot: "assets/img/people/chengxi-zhang.jpg" },
      { name: "Hubert Chen", role: "Intern", email: "hubertchen2020@gmail.com", affiliation: "Vanderbilt University", linkedin: "https://www.linkedin.com/in/hubertychen/", github: "https://github.com/hubertchen2020", headshot: "assets/img/people/hubert-chen.jpg" },
      { name: "Zechuan Shi", role: "Intern", email: "tristanzeshi@gmail.com", affiliation: "PhD Candidate, UC Irvine", linkedin: "https://www.linkedin.com/in/zechuan-tristan-shi-55b21387/", github: "https://github.com/rootze", headshot: "assets/img/people/zechuan-shi.jpeg" },
      { name: "Yichen Dai", role: "Intern", email: "yichendai3@gmail.com", affiliation: "Student", linkedin: "https://www.linkedin.com/in/yichen-dai-76849b326", github: "https://github.com/daiyichen27", headshot: "assets/img/people/yichen-dai.heic" },
      { name: "Ying Shi", role: "Intern", email: "shiying3646@gmail.com", affiliation: "", linkedin: "https://www.linkedin.com/in/yingshi-research", github: "https://github.com/yshi6125", headshot: "assets/img/people/ying-shi.jpg" },
      { name: "Reuben N Addison", role: "Intern", email: "reuben.addison@gmail.com", affiliation: "Assistant Professor, DePauw University", linkedin: "https://www.linkedin.com/in/reuben-newton-addison-ph-d-04394870/", github: "https://github.com/reubebe", headshot: "assets/img/people/reuben-addison.jpg" },
      { name: "Karen Wang", role: "Intern", email: "K27wang@gmail.com", affiliation: "UC Santa Cruz", linkedin: "https://www.linkedin.com/in/karen-wang-bio/", github: "https://github.com/ka2ren", headshot: "assets/img/people/karen-wong.png" },
      { name: "Xiaoxue Li", role: "Intern", email: "lxx.glasgow@gmail.com", affiliation: "University of Chicago", linkedin: "https://www.linkedin.com/in/xiaoxue-l-899729259/", github: "https://github.com/lxxglasgow-lab", headshot: "assets/img/people/xiaoxue-li.jpg" },
      { name: "Wendi Ma", role: "Intern", email: "mawendi2019@gmail.com", affiliation: "Graduate Student, University of Miami", linkedin: "https://www.linkedin.com/in/wend1/", github: "https://github.com/Wend1MMM", headshot: "assets/img/people/wendi-ma.jpg" },
      { name: "Sicheng Chen", role: "Intern", email: "sc2977786@gmail.com", affiliation: "BPharmSci (Advanced) Graduate, Monash University", linkedin: "https://www.linkedin.com/in/sicheng-c-899762306", github: "https://github.com/SichengChen-web", headshot: "assets/img/people/sicheng-chen.png" },
      { name: "Beyza Yoruk", role: "Intern", email: "yorukbeyza02@gmail.com", affiliation: "Undergraduate, Muğla Sıtkı Koçman University", linkedin: "https://www.linkedin.com/in/beyza-y%C3%B6r%C3%BCk-0a118b337/", github: "https://github.com/beyzolog", headshot: "assets/img/people/beyza-yoruk.jpeg" },
      { name: "Tobias Lin", role: "Intern", email: "tobiaslin338@gmail.com", affiliation: "Undergraduate Student", linkedin: "https://www.linkedin.com/in/tobias-lin/", github: "https://github.com/TobiasLin6", headshot: "assets/img/people/tobias-lin.jpg" },
      { name: "Yifeng Liang", role: "Intern", email: "yl11795@nyu.edu", affiliation: "MPH Epidemiology, NYU", linkedin: "https://www.linkedin.com/in/yifeng-liang/", github: "https://github.com/leungyeefong", headshot: "assets/img/people/yifeng-liang.png" },
      { name: "Jingrui Mu", role: "Intern", email: "mujingrui.uibe@gmail.com", affiliation: "Statistics PhD Candidate, McGill University", linkedin: "https://www.linkedin.com/in/jingrui-mu/", github: "https://github.com/Mujingrui", headshot: "assets/img/people/jingrui-mu.jpg" },
      { name: "Ivan Yu", role: "Intern", email: "icstivan@gmail.com", affiliation: "Student, USF", linkedin: "https://www.linkedin.com/in/ivan-yu-a25a32334/", github: "https://github.com/dataByIvan", headshot: "assets/img/people/ivan-yu.jpeg" },
      { name: "Chang Li", role: "Intern", email: "lic052463@gmail.com", affiliation: "MS Statistics, San José State University", linkedin: "https://www.linkedin.com/in/chang-li-b56a06396", github: "https://github.com/Chang-Lii", headshot: "assets/img/people/chang-li.jpg" },
      { name: "Shawn Phan", role: "Intern", email: "shawnphan23@gmail.com", affiliation: "Data Science Student, University of San Francisco", linkedin: "https://www.linkedin.com/in/shawnphan", github: "https://github.com/spphan", headshot: "assets/img/people/shawn-phan.jpg" },
      { name: "Lengxi Huang", role: "Intern", email: "lengxi.huang@gmail.com", affiliation: "Graduate Student, Yale University", linkedin: "https://www.linkedin.com/in/lengxi-huang-6270071b2/", github: "https://github.com/lexihuang05", headshot: "assets/img/people/lengxi-huang.jpeg" },
      { name: "Jason Zhou", role: "Intern", email: "zhoujason371@gmail.com", affiliation: "Undergraduate, UC Santa Cruz", linkedin: "", github: "https://github.com/Jason-5678", headshot: "assets/img/people/jason-zhou.jpg" },
      { name: "Chin Hung Lin", role: "Intern", email: "chinhunglin0@gmail.com", affiliation: "Graduate Student, UC Davis", linkedin: "https://www.linkedin.com/in/chin-hung-lin-407362195", github: "https://github.com/chinhunglin0-ctrl" },
      { name: "Matias", role: "Intern", email: "tashibama@gmail.com", affiliation: "Undergraduate, Duke University", linkedin: "https://linkedin.com/in/matias-ignacio-pinto-chavez-a18512297", github: "https://github.com/MatiPinto03", headshot: "assets/img/people/matias-pinto.png" },
      { name: "Shucheng Cao", role: "Intern", email: "shucheng.cao@mail.mcgill.ca", affiliation: "PhD Candidate, McGill University", linkedin: "https://www.linkedin.com/in/shucheng-bangli-cao/", github: "https://github.com/SchengC", headshot: "assets/img/people/shucheng-cao.jpg" },
      { name: "Endeshaw Assefa Derso", role: "Intern", email: "enduass@gmail.com", affiliation: "Postdoc, University of Milano-Bicocca", linkedin: "https://www.linkedin.com/in/endeshaw-assefa-d-2363a3132/", github: "", headshot: "assets/img/people/endeshaw-assefa.png" },
      { name: "Aaron Wu", role: "Intern", email: "wu.aaron.0001@gmail.com", affiliation: "Undergraduate, Northeastern University (Data Science & Psychology)", linkedin: "https://www.linkedin.com/in/aaron-wu-10a9403a9", github: "https://github.com/aaron123-dev", headshot: "assets/img/people/aaron-wu.jpg" },
      { name: "Natalie Huang", role: "Intern", email: "nathuang10@gmail.com", affiliation: "Undergraduate, UC Davis", linkedin: "https://www.linkedin.com/in/natalie-huang-682818342", github: "https://github.com/nath1012", headshot: "assets/img/people/natalie-huang.heic" },
      { name: "Christina Fu", role: "Intern", email: "christinawfu@gmail.com", affiliation: "BS Biology, Emory University", linkedin: "https://www.linkedin.com/in/christina-w-fu", github: "https://github.com/christinawfu", headshot: "assets/img/people/christina-fu.jpg" },
      { name: "Kening Li", role: "Intern", email: "mkeningli@gmail.com", affiliation: "Student, UCSD & Weill Cornell", linkedin: "https://www.linkedin.com/in/kening-li-8366b8255/", github: "https://github.com/Rika-Li", headshot: "assets/img/people/kening-li.jpg" }
    ]
  },

  featured: [
    {
      name: "CABS_Smart_Website",
      desc: "Smart, AI-powered website for the CABS community — the next-generation hub for events, members, and content.",
      lang: "TypeScript",
      tag: "Flagship",
      stars: 2,
      url: "https://github.com/ds4cabs/CABS_Smart_Website"
    },
    {
      name: "CABS-Data-Science-Summer-Internship-Program",
      desc: "Mentored open-source internship program — the source of the 9 ‘Open*’ projects shipping this 2026 cohort.",
      lang: "Program",
      tag: "Education",
      stars: 5,
      url: "https://github.com/ds4cabs/CABS-Data-Science-Summer-Internship-Program"
    },
    {
      name: "PharmaInformatics",
      desc: "Pharma + bioinformatics tooling — pipelines, notebooks, and reference implementations for drug-development data.",
      lang: "Python",
      tag: "Toolkit",
      url: "https://github.com/ds4cabs/PharmaInformatics"
    },
    {
      name: "VirtualCellChallenge2025",
      desc: "Community challenge code for single-cell perturbation modeling — most-starred repo in the org.",
      lang: "Jupyter",
      tag: "Challenge",
      stars: 9,
      forks: 5,
      url: "https://github.com/ds4cabs/VirtualCellChallenge2025"
    },
    {
      name: "AlphaGenomeBench",
      desc: "Benchmarks and evaluations for genome-scale foundation models.",
      lang: "Python",
      tag: "Benchmark",
      stars: 3,
      url: "https://github.com/ds4cabs/AlphaGenomeBench"
    },
    {
      name: "cabs-workshop-llm-agents",
      desc: "Hands-on workshop for biologists: RAG, tool-calling agents, and local LLM deployments — privacy-preserving by default.",
      lang: "Jupyter",
      tag: "Workshop",
      stars: 1,
      url: "https://github.com/ds4cabs/cabs-workshop-llm-agents"
    }
  ],

  // ====================================================================
  // COHORTS — year-keyed program data
  // --------------------------------------------------------------------
  // The site automatically displays the highest year-key found in
  // `cohorts`. To roll over to a new year, just add a new entry
  // (e.g. `2027: { ... }`) and the page flips: titles, dates, key facts,
  // and the mentor / intern / leadership grids all read from that block.
  //
  // Per-year shape:
  //
  //   {
  //     year:        2026,
  //     dates: {
  //       open:      "Jan 1, 2026",
  //       deadline:  "May 15, 2026",
  //       start:     "Jun 15, 2026",
  //       end:       "Aug 15, 2026",
  //       window:    "Jun 15 – Aug 15, 2026"
  //     },
  //     target_size: "20+",                    // shown in the facts strip
  //     mentors:     [ /* person entries */ ],
  //     interns:     [ /* person entries */ ],
  //     leadership:  [ /* person entries */ ]
  //   }
  //
  // Person entry schema (all fields except `name` are optional — missing
  // fields are skipped in the rendered card; a missing `headshot` falls
  // back to a CSS-drawn initials avatar):
  //
  //   {
  //     name:        "Jane Doe",
  //     affiliation: "Stanford University",
  //     role:        "Postdoc, Computational Biology",       // mentors/leads
  //     major:       "MS, Statistics",                       // interns
  //     interests:   ["single-cell genomics", "RWE"],
  //     headshot:    "assets/img/people/jane-doe.jpg",       // 400x400 sq
  //     linkedin:    "https://www.linkedin.com/in/janedoe",
  //     github:      "https://github.com/janedoe",
  //     project:     { name: "OpenTrial",                    // interns only
  //                    url:  "https://github.com/ds4cabs/OpenTrial",
  //                    desc: "Open infrastructure for clinical trial intelligence." },
  //     org_role:    "Operations Co-Lead"                    // leadership only
  //   }
  //
  // Drop headshot JPGs into assets/img/people/ (see that folder's README
  // for naming).
  // ====================================================================
  cohorts: {
    2026: {
      year: 2026,
      dates: {
        open:     "Jan 1, 2026",
        deadline: "May 15, 2026",
        start:    "Jun 15, 2026",
        end:      "Aug 15, 2026",
        window:   "Jun 15 – Aug 15, 2026"
      },
      target_size: "20+",

      // Industry & academic experts guiding the cohort 1:1.
      // (Empty until populated — site shows a "become a mentor" CTA.)
      mentors: [
        // {
        //   name: "Jane Doe",
        //   affiliation: "Stanford University",
        //   role: "Postdoc, Computational Biology",
        //   interests: ["single-cell genomics", "causal inference"],
        //   headshot: "assets/img/people/jane-doe.jpg",
        //   linkedin: "https://www.linkedin.com/in/janedoe",
        //   github: "https://github.com/janedoe"
        // }
      ],

      // The "Open*" project cohort. One entry per intern; multi-author
      // projects are split into individual entries that share a `project`.
      interns: [
        { name: "Reuben Addison", project: { name: "OpenTrial",      url: "https://github.com/ds4cabs/OpenTrial",      desc: "Open infrastructure for clinical trial intelligence." } },
        { name: "Xiaoxue Li",     project: { name: "OpenTarget",     url: "https://github.com/ds4cabs/OpenTarget",     desc: "Open-source target discovery & prioritization." } },
        { name: "Shucheng",       project: { name: "CausalSentinel", url: "https://github.com/ds4cabs/CausalSentinel", desc: "Causal-inference monitoring for real-world evidence." } },
        { name: "Natalie",        project: { name: "CausalSentinel", url: "https://github.com/ds4cabs/CausalSentinel", desc: "Causal-inference monitoring for real-world evidence." } },
        { name: "Shawn Phan",     project: { name: "OpenLedger",     url: "https://github.com/ds4cabs/OpenLedger",     desc: "Transparent ledger for pharma data provenance." } },
        { name: "Kening Li",      project: { name: "OpenPulse",      url: "https://github.com/ds4cabs/OpenPulse",      desc: "Real-time signal monitoring across pharma data streams." } },
        { name: "Jason Zhou",     project: { name: "OpenMarket",     url: "https://github.com/ds4cabs/OpenMarket",     desc: "Open market-access analytics for biopharma." } },
        { name: "Beyza",          project: { name: "OpenRepurpose",  url: "https://github.com/ds4cabs/OpenRepurpose",  desc: "Drug-repurposing pipeline with biomedical literature integration." } },
        { name: "Chin Hung",      project: { name: "OpenRepurpose",  url: "https://github.com/ds4cabs/OpenRepurpose",  desc: "Drug-repurposing pipeline with biomedical literature integration." } },
        { name: "Christina",      project: { name: "OpenRepurpose",  url: "https://github.com/ds4cabs/OpenRepurpose",  desc: "Drug-repurposing pipeline with biomedical literature integration." } },
        { name: "Aaron Wu",       project: { name: "CompassAgent",   url: "https://github.com/ds4cabs/CompassAgent",   desc: "Multi-agent system for biopharma research navigation." } }
      ],

      // Volunteer organizers. (Empty until populated.)
      leadership: [
        // {
        //   name: "Jane Doe",
        //   org_role: "Operations Co-Lead",
        //   affiliation: "CABS",
        //   headshot: "assets/img/people/jane-doe.jpg",
        //   linkedin: "https://www.linkedin.com/in/janedoe"
        // }
      ]
    }

    // Roll over to 2027 by adding the block below (and the site flips
    // automatically — no template edits needed):
    //
    // ,2027: {
    //   year: 2027,
    //   dates: { open: "...", deadline: "...", start: "...", end: "...", window: "..." },
    //   target_size: "30+",
    //   mentors: [...],
    //   interns: [...],
    //   leadership: [...]
    // }
  },

  // All projects with categories
  // categories: agents, rag, trials, discovery, workshop, ds4, market, regulatory, infrastructure, misc
  all: [
    // ---------- AI agents ----------
    { name: "CompassAgent",      cat: "agents",  lang: "Python",  desc: "Multi-agent system for biopharma research navigation (2026 cohort).",       url: "https://github.com/ds4cabs/CompassAgent" },
    { name: "DataCraftAgent",    cat: "agents",  lang: "Python",  desc: "Agentic data wrangling for biomedical pipelines.",                          stars: 2, url: "https://github.com/ds4cabs/DataCraftAgent" },
    { name: "TrialSageAgent",    cat: "agents",  lang: "Python",  desc: "Clinical trial intelligence agent.",                                       stars: 3, url: "https://github.com/ds4cabs/TrialSageAgent" },
    { name: "StrategiXAgent",    cat: "agents",  lang: "Jupyter", desc: "Strategic decision-support agent for pharma.",                              stars: 2, url: "https://github.com/ds4cabs/StrategiXAgent" },
    { name: "TargetScoutAgent",  cat: "agents",  lang: "Python",  desc: "Target discovery agent that searches and ranks candidate targets.",         stars: 1, url: "https://github.com/ds4cabs/TargetScoutAgent" },
    { name: "TargetFinderAgent", cat: "agents",  lang: "Jupyter", desc: "Agentic target-finder workflow.",                                          stars: 1, url: "https://github.com/ds4cabs/TargetFinderAgent" },
    { name: "TrialAIAgent",      cat: "agents",  lang: "Python",  desc: "Clinical-trial AI assistant.",                                              stars: 1, url: "https://github.com/ds4cabs/TrialAIAgent" },
    { name: "TrialAgent",        cat: "agents",  lang: "Python",  desc: "Clinical-trial assistant (companion to TrialAIAgent).",                     url: "https://github.com/ds4cabs/TrialAgent" },
    { name: "ChatClaw",          cat: "agents",  lang: "Python",  desc: "Conversational interface for internal data.",                               url: "https://github.com/ds4cabs/ChatClaw" },

    // ---------- RAG / LLM frameworks ----------
    { name: "rag-biomedical-decision", cat: "rag", lang: "Python",  desc: "RAG-based decision-support assistant over biomedical literature.",         url: "https://github.com/ds4cabs/rag-biomedical-decision" },
    { name: "paper-qa",                cat: "rag", lang: "Python",  desc: "High-accuracy RAG for scientific document Q&A with citations.",            url: "https://github.com/ds4cabs/paper-qa" },
    { name: "claude_skills",           cat: "rag", lang: "Python",  desc: "Public repository of Agent Skills.",                                       url: "https://github.com/ds4cabs/claude_skills" },
    { name: "skills",                  cat: "rag", lang: "Shell",   desc: "Skills for real engineers — curated from a .claude directory.",            url: "https://github.com/ds4cabs/skills" },
    { name: "SuperClaude_Framework",   cat: "rag", lang: "Python",  desc: "Configuration framework enhancing Claude Code with personas and methodologies.", url: "https://github.com/ds4cabs/SuperClaude_Framework" },
    { name: "PharmaSkills",            cat: "rag", lang: "Python",  desc: "Pharma-flavored agent skills.",                                            url: "https://github.com/ds4cabs/PharmaSkills" },
    { name: "virtual-lab",             cat: "rag", lang: "Jupyter", desc: "A virtual lab of LLM agents for science research.",                        url: "https://github.com/ds4cabs/virtual-lab" },

    // ---------- Discovery / Genomics ----------
    { name: "AlphaGenomeBench",        cat: "discovery", lang: "Python",  desc: "Benchmarks for genome-scale foundation models.",                       stars: 3, url: "https://github.com/ds4cabs/AlphaGenomeBench" },
    { name: "VirtualCellChallenge2025",cat: "discovery", lang: "Jupyter", desc: "Single-cell perturbation modeling challenge.",                          stars: 9, url: "https://github.com/ds4cabs/VirtualCellChallenge2025" },
    { name: "Virtual-Cell-Challenge",  cat: "discovery", lang: "Python",  desc: "Reference pipeline for single-cell perturbation data loading.",         stars: 1, url: "https://github.com/ds4cabs/Virtual-Cell-Challenge" },
    { name: "knockout-discovery",      cat: "discovery", lang: "Python",  desc: "Predict drug efficacy and side effects from human knockouts.",          url: "https://github.com/ds4cabs/knockout-discovery" },
    { name: "siRNADiscovery",          cat: "discovery", lang: "Python",  desc: "siRNA discovery and design.",                                          url: "https://github.com/ds4cabs/siRNADiscovery" },
    { name: "T2T-MFA8",                cat: "discovery", lang: "",        desc: "Telomere-to-telomere assembly of a crab-eating macaque.",              url: "https://github.com/ds4cabs/T2T-MFA8" },
    { name: "OpenTarget",              cat: "discovery", lang: "Python",  desc: "Open target discovery & prioritization (2026 cohort).",                url: "https://github.com/ds4cabs/OpenTarget" },
    { name: "OpenRepurpose",           cat: "discovery", lang: "Python",  desc: "Drug repurposing using literature integration (2026 cohort).",         url: "https://github.com/ds4cabs/OpenRepurpose" },

    // ---------- Clinical trials ----------
    { name: "OpenTrial",         cat: "trials", lang: "Python", desc: "Open infrastructure for clinical-trial intelligence (2026 cohort).",   url: "https://github.com/ds4cabs/OpenTrial" },
    { name: "BioTrialNet",       cat: "trials", lang: "R",      desc: "Network-style modeling of biomedical trials.",                          url: "https://github.com/ds4cabs/BioTrialNet" },
    { name: "Clinical-Trial-Atlas", cat: "trials", lang: "",    desc: "Atlas of clinical trials.",                                             url: "https://github.com/ds4cabs/Clinical-Trial-Atlas" },
    { name: "CausalSentinel",    cat: "trials", lang: "Python", desc: "Causal monitoring for real-world evidence (2026 cohort).",              url: "https://github.com/ds4cabs/CausalSentinel" },
    { name: "EfficacyLens",      cat: "trials", lang: "Python", desc: "Lens into trial efficacy outcomes.",                                    url: "https://github.com/ds4cabs/EfficacyLens" },

    // ---------- Regulatory / Policy ----------
    { name: "FDA202CRL",      cat: "regulatory", lang: "",       desc: "FDA Complete Response Letters dataset & analysis.", stars: 2, url: "https://github.com/ds4cabs/FDA202CRL" },
    { name: "ds4RegAffairs",  cat: "regulatory", lang: "",       desc: "Data science for regulatory affairs.",                       url: "https://github.com/ds4cabs/ds4RegAffairs" },
    { name: "ds4CSR",         cat: "regulatory", lang: "",       desc: "Data science for clinical study reports.",                   url: "https://github.com/ds4cabs/ds4CSR" },
    { name: "ds4Legal",       cat: "regulatory", lang: "",       desc: "Data science for legal & compliance.",                       url: "https://github.com/ds4cabs/ds4Legal" },
    { name: "ds4CompEthics",  cat: "regulatory", lang: "",       desc: "Data science for compliance & ethics.",                      url: "https://github.com/ds4cabs/ds4CompEthics" },

    // ---------- Market / Commercial / HEOR ----------
    { name: "OpenMarket",        cat: "market", lang: "Python", desc: "Open market-access analytics (2026 cohort).",        url: "https://github.com/ds4cabs/OpenMarket" },
    { name: "CABSPriceStrategy", cat: "market", lang: "R",      desc: "Pricing-strategy analytics in R.",          stars: 1, url: "https://github.com/ds4cabs/CABSPriceStrategy" },
    { name: "AwesomeMarketing",  cat: "market", lang: "",       desc: "Curated marketing analytics for pharma.",   stars: 2, url: "https://github.com/ds4cabs/AwesomeMarketing" },
    { name: "ds4MarketAccess",   cat: "market", lang: "",       desc: "Data science for market access.",                  url: "https://github.com/ds4cabs/ds4MarketAccess" },
    { name: "ds4Commercial",     cat: "market", lang: "",       desc: "Data science for commercial operations.",          url: "https://github.com/ds4cabs/ds4Commercial" },
    { name: "ds4HEOR",           cat: "market", lang: "",       desc: "Data science for HEOR.",                            url: "https://github.com/ds4cabs/ds4HEOR" },
    { name: "ds4BizDev",         cat: "market", lang: "",       desc: "Data science for business development.",            url: "https://github.com/ds4cabs/ds4BizDev" },
    { name: "ds4MedAffairs",     cat: "market", lang: "",       desc: "Data science for medical affairs.",                 url: "https://github.com/ds4cabs/ds4MedAffairs" },

    // ---------- DS4 functional tracks ----------
    { name: "ds4Finance",        cat: "ds4", desc: "Data science for finance teams.",         url: "https://github.com/ds4cabs/ds4Finance" },
    { name: "ds4RiskMgmt",       cat: "ds4", desc: "Data science for risk management.",        url: "https://github.com/ds4cabs/ds4RiskMgmt" },
    { name: "ds4PatientAdvocacy",cat: "ds4", desc: "Data science for patient advocacy.",      url: "https://github.com/ds4cabs/ds4PatientAdvocacy" },
    { name: "ds4ProjMgmt",       cat: "ds4", desc: "Data science for project management.",     url: "https://github.com/ds4cabs/ds4ProjMgmt" },
    { name: "ds4ClinPharm",      cat: "ds4", desc: "Data science for clinical pharmacology.", url: "https://github.com/ds4cabs/ds4ClinPharm" },
    { name: "ds4EHS",            cat: "ds4", desc: "Data science for EHS.",                   url: "https://github.com/ds4cabs/ds4EHS" },
    { name: "ds4Strategy",       cat: "ds4", desc: "Data science for strategy.",              url: "https://github.com/ds4cabs/ds4Strategy" },
    { name: "ds4CorpComms",      cat: "ds4", desc: "Data science for corporate communications.", url: "https://github.com/ds4cabs/ds4CorpComms" },
    { name: "ds4IT",             cat: "ds4", desc: "Data science for IT teams.",               url: "https://github.com/ds4cabs/ds4IT" },
    { name: "ds4HR",             cat: "ds4", desc: "Data science for HR.",                     url: "https://github.com/ds4cabs/ds4HR" },
    { name: "ds4SupplyChain",    cat: "ds4", desc: "Data science for supply chain.",           url: "https://github.com/ds4cabs/ds4SupplyChain" },
    { name: "ds4QAQC",           cat: "ds4", desc: "Data science for QA/QC.",                  url: "https://github.com/ds4cabs/ds4QAQC" },
    { name: "ds4MfgOps",         cat: "ds4", desc: "Data science for manufacturing ops.",      url: "https://github.com/ds4cabs/ds4MfgOps" },
    { name: "ds4ClinDev",        cat: "ds4", desc: "Data science for clinical development.",   url: "https://github.com/ds4cabs/ds4ClinDev" },
    { name: "ds4RnD",            cat: "ds4", desc: "Data science for R&D.",                    url: "https://github.com/ds4cabs/ds4RnD" },
    { name: "ds4TransMed",       cat: "ds4", desc: "Data science for translational medicine.", url: "https://github.com/ds4cabs/ds4TransMed" },

    // ---------- Workshop / Education ----------
    { name: "cabs-workshop-llm-agents",                        cat: "workshop", lang: "Jupyter", desc: "Workshop: RAG, tool-calling agents, and private LLM deployments.", stars: 1, url: "https://github.com/ds4cabs/cabs-workshop-llm-agents" },
    { name: "cabs-ai-digital-productivity-series",             cat: "workshop", desc: "AI digital productivity series for pharma teams.",                          url: "https://github.com/ds4cabs/cabs-ai-digital-productivity-series" },
    { name: "CABS-Data-Science-Summer-Internship-Program",     cat: "workshop", desc: "Summer internship program — mentored open-source pharma projects.",         stars: 5, url: "https://github.com/ds4cabs/CABS-Data-Science-Summer-Internship-Program" },
    { name: "CABS-Data-Science-Winter-Internship-Program",     cat: "workshop", desc: "Winter internship program.",                                                  url: "https://github.com/ds4cabs/CABS-Data-Science-Winter-Internship-Program" },
    { name: "CABS-R-Graph-Gallery",                            cat: "workshop", desc: "Reproducible R visualizations for clinical & market data.",                    url: "https://github.com/ds4cabs/CABS-R-Graph-Gallery" },
    { name: "FigureYa",                                        cat: "workshop", lang: "HTML",   desc: "Curated figures / reproducibility resources.",                  url: "https://github.com/ds4cabs/FigureYa" },
    { name: "ML-NLP-for-Drug-Discovery-in-Under_served-Diseases", cat: "workshop", lang: "Python", desc: "NLP-driven discovery for underserved diseases.",            url: "https://github.com/ds4cabs/ML-NLP-for-Drug-Discovery-in-Under_served-Diseases" },

    // ---------- Infrastructure / Org ----------
    { name: "CABS_Smart_Website",     cat: "infrastructure", lang: "TypeScript", desc: "AI-powered next-gen website for the CABS community.", stars: 2, url: "https://github.com/ds4cabs/CABS_Smart_Website" },
    { name: "ds4cabs.github.io",      cat: "infrastructure", lang: "HTML",       desc: "This site — the DS4CABS landing page.",                            url: "https://github.com/ds4cabs/ds4cabs.github.io" },
    { name: "ds4cabs2asana",          cat: "infrastructure", lang: "Python",     desc: "Bridge / sync between DS4CABS and Asana.",                  stars: 1, url: "https://github.com/ds4cabs/ds4cabs2asana" },
    { name: "Automated-ProgramBook-Producer", cat: "infrastructure", desc: "Automates conference program books from speaker submissions.",     stars: 2, url: "https://github.com/ds4cabs/Automated-ProgramBook-Producer" },
    { name: "Computer-Aided-Biomedical-Sciences", cat: "infrastructure", desc: "Computer-Aided Biomedical Sciences org content.",                          url: "https://github.com/ds4cabs/Computer-Aided-Biomedical-Sciences" },
    { name: "CABS-Chinese-American-Biopharmaceutical-Society", cat: "infrastructure", desc: "About CABS — the parent organization.",                         url: "https://github.com/ds4cabs/CABS-Chinese-American-Biopharmaceutical-Society" },
    { name: "cabstools",              cat: "infrastructure", desc: "R toolkit to streamline drug development.",                                          url: "https://github.com/ds4cabs/cabstools" },
    { name: "Pharma",                 cat: "infrastructure", desc: "Pharma org-wide utilities and references.",                                          url: "https://github.com/ds4cabs/Pharma" },
    { name: "PharmaBioinfomatics",    cat: "infrastructure", desc: "Pharma + bioinformatics references.",                                       stars: 1, url: "https://github.com/ds4cabs/PharmaBioinfomatics" },
    { name: "CompPharmaHub",          cat: "infrastructure", desc: "Computational pharma hub.",                                                          url: "https://github.com/ds4cabs/CompPharmaHub" },
    { name: "ai4pharma",              cat: "infrastructure", lang: "Python", desc: "AI for pharma — utilities and notebooks.",                           url: "https://github.com/ds4cabs/ai4pharma" },
    { name: "HelloPharma",            cat: "infrastructure", lang: "Python", desc: "Getting-started pharma project.",                          stars: 1, url: "https://github.com/ds4cabs/HelloPharma" },
    { name: "PharmaInformatics",      cat: "infrastructure", lang: "Python", desc: "Pharma informatics pipelines.",                            stars: 1, url: "https://github.com/ds4cabs/PharmaInformatics" },

    // ---------- Misc / Specialty ----------
    { name: "Paper2Video",         cat: "misc", lang: "Python",  desc: "Automatic video generation from scientific papers.",                 url: "https://github.com/ds4cabs/Paper2Video" },
    { name: "TEDDY",               cat: "misc", desc: "TEDDY project resources.",                                                    stars: 1, url: "https://github.com/ds4cabs/TEDDY" },
    { name: "Awesome_Translational_Medicine", cat: "misc", desc: "Curated translational-medicine resources.",                                  url: "https://github.com/ds4cabs/Awesome_Translational_Medicine" },
    { name: "CSFProteoQC",         cat: "misc", desc: "Blood-contamination QC for CSF biomarker analysis.",                                     url: "https://github.com/ds4cabs/CSFProteoQC" },
    { name: "AI4NephroNexus",      cat: "misc", desc: "AI for nephrology.",                                                                     url: "https://github.com/ds4cabs/AI4NephroNexus" },
    { name: "AI4FA",               cat: "misc", desc: "AI agent for financial report analysis.",                                                url: "https://github.com/ds4cabs/AI4FA" },
    { name: "EventScreenPro",      cat: "misc", desc: "Event/screening tool.",                                                                  url: "https://github.com/ds4cabs/EventScreenPro" },
    { name: "edgar",               cat: "misc", lang: "Python", desc: "SEC EDGAR utilities for biopharma analysis.",                            url: "https://github.com/ds4cabs/edgar" },
    { name: "pink-trumpet",        cat: "misc", desc: "Pink Trumpet — experimental project.",                                                   url: "https://github.com/ds4cabs/pink-trumpet" },
    { name: "pink-trumpet-gf",     cat: "misc", desc: "Pink Trumpet (gf variant).",                                                             url: "https://github.com/ds4cabs/pink-trumpet-gf" },

    // 2026 intern projects (also surfaced in the interns section)
    { name: "OpenLedger",  cat: "infrastructure", desc: "Transparent ledger for pharma data provenance (2026 cohort).", url: "https://github.com/ds4cabs/OpenLedger" },
    { name: "OpenPulse",   cat: "infrastructure", desc: "Real-time signal monitoring (2026 cohort).",                    url: "https://github.com/ds4cabs/OpenPulse" }
  ],

  filters: [
    { id: "all",            label: "All" },
    { id: "agents",         label: "AI Agents" },
    { id: "rag",            label: "RAG · LLMs" },
    { id: "discovery",      label: "Discovery · Genomics" },
    { id: "trials",         label: "Clinical Trials" },
    { id: "regulatory",     label: "Regulatory · Policy" },
    { id: "market",         label: "Market · HEOR" },
    { id: "ds4",            label: "DS4 Functional" },
    { id: "workshop",       label: "Workshops · Education" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "misc",           label: "Specialty" }
  ]
};
