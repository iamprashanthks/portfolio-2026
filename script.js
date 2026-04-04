const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".tab-panel"));

function setActiveTab(tabId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === tabId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === tabId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

const lazySections = document.querySelectorAll(".lazy-section");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("loaded");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "250px 0px" }
  );
  lazySections.forEach((section) => sectionObserver.observe(section));
} else {
  lazySections.forEach((section) => section.classList.add("loaded"));
}

function updateDateTime() {
  const now = new Date();

  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  const yearEl = document.getElementById("current-year");

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString("en-IN", dateOptions);
  }

  if (timeEl) {
    timeEl.textContent = `${now.toLocaleTimeString("en-IN", timeOptions)} IST`;
  }

  if (yearEl) {
    yearEl.textContent = String(now.getFullYear());
  }
}

updateDateTime();
setInterval(updateDateTime, 1000);

const mainCta = document.querySelector(".main-cta");
if (mainCta) {
  mainCta.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveTab("contact");
    const target = document.querySelector("#contact-panel");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
