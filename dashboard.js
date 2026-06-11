const email = localStorage.getItem("stacklyEmail") || "dhamu@stackly.in";
const name = email.split("@")[0] || "Guest";
const clean = name.charAt(0).toUpperCase() + name.slice(1);
document.getElementById("dashName").textContent = clean;
document.getElementById("dashEmail").textContent = email;

const panelData = {
  programs: {
    title: "Programs",
    text: "Explore Stackly NGO charity programs and monitor active community support work across Salem.",
    cards: [
      ["Education Support", "School kits, notebooks, exam guidance, mentoring sessions, and digital learning support for students."],
      ["Food Donation Drives", "Weekly meal packing, grocery support, breakfast campaigns, and senior citizen food relief."],
      ["Healthcare Initiatives", "Free health camps, blood donation awareness, medicine support, and hygiene kit distribution."],
      ["Women Empowerment", "Skill training, self-help group guidance, safety awareness, and small business support programs."],
      ["Child Welfare", "Nutrition support, counselling support, school retention drives, and safe learning activities."],
      ["Environment Projects", "Tree plantation, lake cleaning, plastic awareness, and community cleanliness campaigns."]
    ]
  },
  hours: {
    title: "Volunteer Hours",
    text: "Track volunteer contribution, monthly service records, completed tasks, and impact ranking.",
    cards: [
      ["Total Service Hours", "128 volunteer hours recorded across events, education support, food donation, and field visits."],
      ["This Month", "18 hours completed this month with 6 hours pending approval from the coordinator."],
      ["Upcoming Tasks", "Food packing, student mentoring, event setup, donation sorting, and beneficiary follow-up are open."],
      ["Achievement Badges", "Helper, Mentor, Event Champion, Health Camp Supporter, and Community Star badges available."],
      ["Volunteer Ranking", "Top volunteers are ranked based on hours, punctuality, event support, and feedback score."],
      ["Attendance Summary", "Daily check-in, check-out, event attendance, and missed task status are maintained here."]
    ]
  },
  events: {
    title: "Events",
    text: "View upcoming charity events, completed activities, registration status, and event impact.",
    cards: [
      ["Upcoming Food Camp", "Food relief camp scheduled this Saturday at Salem community support center, 10:00 AM."],
      ["Education Kit Drive", "Notebook and stationery distribution planned for government school students next week."],
      ["Health Awareness Camp", "General checkup, blood pressure screening, hygiene awareness, and first-aid guidance."],
      ["Volunteer Orientation", "New volunteer onboarding with role briefing, safety rules, and field activity planning."],
      ["Completed Events", "Last month 9 events completed with 420 beneficiaries reached through community drives."],
      ["Event Gallery", "Photos, highlights, feedback notes, and media references from completed programs."]
    ]
  },
  stories: {
    title: "Stories",
    text: "Read real impact stories from beneficiaries, donors, volunteers, and community partners.",
    cards: [
      ["Student Success Story", "A school kit and mentoring support helped a student continue classes with confidence."],
      ["Family Relief Story", "Monthly grocery support reduced food pressure for a local family during a difficult month."],
      ["Volunteer Experience", "A young volunteer shared learning from food distribution and community visit activities."],
      ["Donor Impact", "Donation support helped provide notebooks, meals, health kits, and event materials."],
      ["Community Voice", "Local partners appreciated consistent support for education, food, and awareness programs."],
      ["Featured Beneficiary", "Selected beneficiary stories show how each program creates measurable positive change."]
    ]
  },
  certificates: {
    title: "Certificates",
    text: "Manage certificates for volunteer service, participation, donation support, and event completion.",
    cards: [
      ["Volunteer Certificate", "Issued after completing eligible service hours and verified field activities."],
      ["Event Certificate", "Available for volunteers who participated in registered charity events."],
      ["Donation Certificate", "Recognition certificate for donors supporting education, food, and health programs."],
      ["Participation Certificate", "Given for awareness camps, orientation programs, and community campaigns."],
      ["Download Status", "Certificate requests, approval status, download option, and issue date are listed."],
      ["Verification Info", "Certificate ID, volunteer name, program name, coordinator approval, and validity details."]
    ]
  },
  support: {
    title: "Support",
    text: "Get help for programs, events, certificates, donations, volunteer tasks, and dashboard access.",
    cards: [
      ["FAQ Help", "Find answers for login, role access, event joining, certificates, and donation receipts."],
      ["Raise Ticket", "Submit issues related to volunteer hours, wrong details, event status, or certificate download."],
      ["Contact Support", "Email support@stackly.org or call +91 98765 43210 during working hours."],
      ["Office Timing", "Monday to Saturday, 9:00 AM to 6:00 PM. Sunday support for urgent field events only."],
      ["Salem Office", "Stackly NGO, Salem, Tamil Nadu. Visit for program coordination and donation support."],
      ["Emergency Help", "For urgent event changes, contact the coordinator through phone before sending email."]
    ]
  }
};

const panelAssets = {
  programs: "assets/children.webp",
  hours: "assets/volunteer.webp",
  events: "assets/group.webp",
  stories: "assets/child.webp",
  certificates: "assets/team.webp",
  support: "assets/contact.webp"
};

function animateCounters(scope = document) {
  scope.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count || "0");
    const prefix = node.dataset.prefix || "";
    const suffix = node.dataset.suffix || "";
    const duration = 900;
    const started = performance.now();

    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      node.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

function prepareTopCounters() {
  document.querySelectorAll(".dash-grid .dash-box strong").forEach((node) => {
    const raw = node.textContent.trim();
    const match = raw.match(/^([^0-9]*)([0-9]+)(.*)$/);
    if (!match) return;
    node.dataset.prefix = match[1];
    node.dataset.count = match[2];
    node.dataset.suffix = match[3];
    node.textContent = `${match[1]}0${match[3]}`;
  });
}

function renderPanel(key) {
  const data = panelData[key] || panelData.programs;
  const root = document.getElementById("dashDynamic");
  if (!root) return;
  document.body.dataset.dashPanel = key;

  const total = data.cards.length;
  const active = Math.max(3, Math.min(total, Math.round(total * 0.65)));
  const image = panelAssets[key] || panelAssets.programs;
  const percent = Math.min(96, 64 + total * 5);
  root.innerHTML = `
    <div class="dash-portal-banner">
      <div>
        <p class="eyebrow">Role Workspace</p>
        <h2>${data.title} Command Center</h2>
        <p>${data.text} Use this workspace to review progress, assign next actions, and monitor community support in real time.</p>
      </div>
      <div class="portal-badges">
        <span>Live</span><span>Verified</span><span>Updated</span>
      </div>
    </div>
    <div class="dash-feature-panel">
      <div class="dash-feature-copy">
        <p class="eyebrow">Charity Activity</p>
        <h2>${data.title}</h2>
        <p>${data.text}</p>
        <div class="dash-mini-stats">
          <span><b data-count="${total}">0</b> Focus Areas</span>
          <span><b data-count="${active}">0</b> Active Now</span>
          <span><b>24/7</b> Support</span>
        </div>
      </div>
      <div class="dash-visual-card">
        <img src="${image}" alt="${data.title}">
        <div class="dash-visual-overlay"><small>Current Impact</small><strong>${data.title}</strong></div>
      </div>
    </div>
    <div class="dash-analytics-row">
      <article class="dash-chart-card">
        <div class="donut-chart" style="--p:${percent}"><span><b data-count="${percent}">0</b>%</span></div>
        <div><h3>Impact Score</h3><p>Live progress based on active focus areas, support tasks, and community updates.</p></div>
      </article>
      <article class="dash-chart-card">
        <h3>Monthly Activity</h3>
        <div class="bar-set">
          <i style="--h:62%"></i><i style="--h:78%"></i><i style="--h:54%"></i><i style="--h:88%"></i><i style="--h:70%"></i>
        </div>
      </article>
      <article class="dash-chart-card">
        <h3>Quick Status</h3>
        <ul class="dash-status-list"><li><span></span> New requests reviewed</li><li><span></span> Field team updated</li><li><span></span> Reports ready</li></ul>
      </article>
    </div>
    <div class="dash-content-grid attractive-grid">
      ${data.cards.map((card, index) => `
        <article class="dash-info attractive-card">
          <div class="card-count">${String(index + 1).padStart(2, "0")}</div>
          <h3>${card[0]}</h3>
          <p>${card[1]}</p>
          <div class="mini-progress"><i style="--w:${55 + index * 7}%"></i></div>
          <a href="404.html" class="dash-card-link">View details</a>
        </article>`).join("")}
    </div>
    <div class="dash-bottom-row">
      <article class="dash-timeline"><h3>Recent Updates</h3><ul><li>Coordinator reviewed latest ${data.title.toLowerCase()} activity.</li><li>Community support data updated for Salem field team.</li><li>Next follow-up action added to dashboard queue.</li></ul></article>
      <article class="dash-action-box"><h3>Quick Action</h3><p>Use this panel to monitor work progress, check updates, and coordinate NGO support activities.</p><div class="dash-action-grid"><a href="404.html" class="btn">Open Report</a><a href="404.html" class="btn gold">Create Task</a></div></article>
    </div>`;
  animateCounters(root);
}

document.querySelectorAll(".dash-menu a[data-panel]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".dash-menu a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    renderPanel(link.dataset.panel);
  });
});

const dashToggle = document.querySelector(".dash-mobile-toggle");
const dashMenu = document.querySelector(".dash-menu");
if (dashToggle && dashMenu) {
  dashToggle.textContent = "";
  dashToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("dash-menu-open");
    dashToggle.classList.toggle("is-open", open);
    dashToggle.setAttribute("aria-expanded", String(open));
  });

  dashMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("dash-menu-open");
      dashToggle.classList.remove("is-open");
      dashToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("a.logo").forEach((logo) => {
  logo.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
  });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href="404.html"]');
  if (link) {
    localStorage.setItem("stacklyPreviousPage", window.location.pathname.split("/").pop() || "index.html");
  }
});

prepareTopCounters();
animateCounters();
renderPanel("programs");
