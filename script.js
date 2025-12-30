const content = {
  hero: {
    name: "Frederik Maximilian Willemsen",
    headline: "AI & Data Project Intern · Software Engineer",
    value: "Machine-learning specialist turning analytical research into shipping software with measurable impact on latency, automation, and insight workflows.",
    location: "Munich area",
    ctas: {
      primary: { label: "View Projects", href: "#projects" },
      secondary: { label: "Contact", href: "#contact" }
    },
    social: [
      { label: "GitHub", url: "https://github.com/gitFrederik" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/frederik-willemsen-72013821b" }
    ]
  },
  about: {
    bio: "Currently pursuing my M.Sc. in Computer Science at TUM while focusing on AI-heavy consulting and engineering work. I care about data-rigorous decisions, pragmatic tooling, and keeping ML systems transparent enough for cross-functional partners to trust.",
    interests: ["Data-driven consulting", "ML systems", "Rapid prototyping", "Hackathons", "Student leadership"]
  },
  experience: [
    {
      role: "AI & Data Project Intern",
      company: "Deloitte Consulting",
      timeframe: "Oct 2025 – Feb 2026",
      bullets: [
        "Analyzed a nationwide OEM campaign and helped to make data-driven decisions",
        "Helped to build a prediction model that increased cross-selling accuracy",
        "Piloted a white-label enterprise chatbot in AWS, coordinating an international build team through rollout"
      ],
      stack: ["Python", "Flask", "Angular", "Pandas", "SQL", "AWS"]
    },
    {
      role: "Software Engineer Intern",
      company: "CHECK24",
      timeframe: "Aug 2025 – Oct 2025",
      bullets: [
        "Designed and deployed an MCP server for structured LLM context that cut API latency by 50% via smart caching",
        "Implemented an AI-powered natural-language filter supporting intuitive free-text search and auto-tagging",
        "Shipped production-grade monitoring and automation around ML features to keep operating costs low"
      ],
      stack: ["Java", "Spring Boot", "React", "Python"]
    }
  ],
  projects: [
    {
      name: "Data-Driven Simulation Configurations",
      featured: false,
      problem: "Physics-enhanced simulations at TUM needed faster algorithm tuning for high-performance particle simulations.",
      solution: "Built a machine learning pipeline which leveragessimulation data and uses PCA, K-means and more to find the best algorithm configuration.",
      results: "Delivered a 16% runtime reduction over legacy approaches on a high-performance cluster (coolMuc4) while enabling explainable decision-making.",
      tech: ["C++", "Python", "Pandas", "Random Forests"],
      links: [
        { label: "GitHub", url: "https://github.com/gitFrederik" },
        {
          label: "Read Thesis",
          url: "https://mediatum.ub.tum.de/doc/1797259/ffeqiqdcqqj2i6yq5rpd16q4k.pdf#:~:text=This%20thesis%20aims%20to%20implement,are%20expected%20to%20perform%20well."
        }
      ]
    },
    {
      name: "Molecular Dynamics Challenge",
      featured: false,
      problem: "Simulating complex molecules is computationally expensive. We wanted to find a way to speed up the simulations. Competed against 8 other teams to find the algorithmically most efficient way to do it.",
      solution: "Led a 3-person team building an OpenMP-accelerated framework with low-level optimizations and profiling.",
      results: "Achieved the best overall performance, posting a 60% speedup versus the next-best team.",
      tech: ["C++", "OpenMP", "Valgrind"],
      links: [{ label: "GitHub", url: "https://github.com/gitFrederik" }]
    },
    {
      name: "HackaTUM 24 Mobility Platform",
      featured: false,
      problem: "Hackathon teams needed a rapid way to explore car management scenarios within 72 hours.",
      solution: "Delivered a TypeScript + React prototype with Go services powering booking, telemetry, and admin flows.",
      results: "Enabled production-ready system design under hackathon constraints with strong UX handoff.",
      tech: ["React", "TypeScript", "Go"],
      links: [{ label: "GitHub", url: "https://github.com/gitFrederik" }]
    }
  ],
  skills: {
    Languages: ["Java", "Python", "C++", "C", "SQL"],
    Frameworks: ["React", "Angular", "Spring Boot", "Flask", "Node.js"],
    Tools: ["Pandas", "Matplotlib", "PyTorch", "OpenMP", "AWS", "Tableau", "Excel", "PowerPoint"],
    Concepts: ["ML Ops", "Data analysis", "Simulation modeling", "System design", "Mentorship"]
  },
  education: [
    {
      school: "Technical University of Munich",
      degree: "M.Sc. Computer Science",
      range: "2025 – 2027",
      coursework: ["Data Structures & Algorithms", "Probability & Statistics", "Machine Learning", "Autonomous Driving"]
    },
    {
      school: "Technical University of Munich",
      degree: "B.Sc. Computer Science (GPA 2.4 · Top 30%)",
      range: "2021 – 2025",
      coursework: ["Machine Learning", "Software Engineering", "Economics minor"]
    },
    {
      school: "University of California, Davis",
      degree: "Exchange Semester (GPA 3.92/4.0)",
      range: "Sep 2023 – Jan 2024",
      coursework: ["Computer Science", "Economics", "Political Science"]
    }
  ],
  highlights: [
    "Cut LLM context latency by 50% through MCP server design at CHECK24",
    "Delivered 16% faster particle simulations via thesis research",
    "Contributed to the development of a white-label enterprise chatbot in AWS at Deloitte Consulting"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateHero();
  hydrateAbout();
  hydrateExperience();
  hydrateProjects();
  hydrateSkills();
  hydrateEducation();
  hydrateHighlights();
  hydrateLinks("contact-links", content.hero.social);
  initThemeToggle();
  initNavHighlight();
  initSmoothScroll();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function hydrateHero() {
  const { hero } = content;
  document.getElementById("hero-name").textContent = hero.name;
  document.getElementById("hero-headline").textContent = hero.headline;
  document.getElementById("hero-value").textContent = hero.value;
  document.getElementById("hero-location").textContent = hero.location;
  const primary = document.getElementById("primary-cta");
  primary.textContent = hero.ctas.primary.label;
  primary.href = hero.ctas.primary.href;
  const secondary = document.getElementById("secondary-cta");
  secondary.textContent = hero.ctas.secondary.label;
  secondary.href = hero.ctas.secondary.href;
  hydrateLinks("hero-links", hero.social);
}

function hydrateLinks(containerId, links) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = link.label;
    anchor.setAttribute("aria-label", link.label);
    anchor.insertAdjacentHTML("beforeend", '<span aria-hidden="true">↗</span>');
    container.appendChild(anchor);
  });
}

function hydrateAbout() {
  const { about } = content;
  document.getElementById("about-bio").textContent = about.bio;
  const chips = document.getElementById("interest-chips");
  chips.innerHTML = "";
  about.interests.forEach((interest) => {
    const span = document.createElement("span");
    span.textContent = interest;
    chips.appendChild(span);
  });
}

function hydrateExperience() {
  const wrapper = document.getElementById("experience-list");
  wrapper.innerHTML = "";
  content.experience.forEach((role) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${role.role} · ${role.company}</h3>
      <p>${role.timeframe}</p>
      <ul>${role.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
    card.appendChild(renderStack(role.stack));
    wrapper.appendChild(card);
  });
}

function hydrateProjects() {
  const wrapper = document.getElementById("project-list");
  wrapper.innerHTML = "";
  content.projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = project.featured ? "card featured" : "card";
    card.innerHTML = `
      <h3>${project.name}</h3>
      <div class="project-copy">
        <p><strong>Problem:</strong> ${project.problem}</p>
        <p><strong>Solution:</strong> ${project.solution}</p>
        <p><strong>Results:</strong> ${project.results}</p>
      </div>
    `;
    const links = document.createElement("div");
    links.className = "hero-links";
    project.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = link.label + " ↗";
      links.appendChild(anchor);
    });
    card.appendChild(renderStack(project.tech));
    card.appendChild(links);
    wrapper.appendChild(card);
  });
}

function hydrateSkills() {
  const wrapper = document.getElementById("skills-grid");
  wrapper.innerHTML = "";
  Object.entries(content.skills).forEach(([group, items]) => {
    const div = document.createElement("article");
    div.className = "skill-group";
    div.innerHTML = `<h3>${group}</h3>`;
    const list = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    div.appendChild(list);
    wrapper.appendChild(div);
  });
}

function hydrateEducation() {
  const wrapper = document.getElementById("education-list");
  wrapper.innerHTML = "";
  content.education.forEach((edu) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${edu.school}</h3>
      <p>${edu.degree} · ${edu.range}</p>
      <p><strong>Coursework:</strong> ${edu.coursework.join(", ")}</p>
    `;
    wrapper.appendChild(card);
  });
}

function hydrateHighlights() {
  const list = document.getElementById("highlight-list");
  list.innerHTML = "";
  content.highlights.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderStack(items) {
  const stack = document.createElement("div");
  stack.className = "tech-stack";
  items.forEach((tech) => {
    const span = document.createElement("span");
    span.textContent = tech;
    stack.appendChild(span);
  });
  return stack;
}

function initThemeToggle() {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  if (stored) {
    body.dataset.theme = stored;
  }
  updateThemeIcon(toggle, body.dataset.theme);
  toggle.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
    body.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(toggle, nextTheme);
  });
}

function updateThemeIcon(toggle, theme) {
  toggle.querySelector(".icon").textContent = theme === "dark" ? "☾" : "☀";
}

function initNavHighlight() {
  const navLinks = document.querySelectorAll(".nav-link");
  const mapping = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    mapping.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = mapping.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { root: null, threshold: 0.5 }
  );

  document.querySelectorAll("main section").forEach((section) => observer.observe(section));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        target.focus({ preventScroll: true });
      }
    });
  });
}
