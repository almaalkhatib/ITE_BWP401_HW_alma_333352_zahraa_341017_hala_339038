"use strict";

/* 1. Team Participants Data */
const team = [
  {
    name: "Alma Alkhatib",
    id: "alma_333352",
    role: "الرئيسية وعن الدليل والتنقل"
  },
  {
    name: "Zahraa Omar",
    id: "zahraa_341017",
    role: "الفعاليات والتفاصيل والتفاعلات"
  },
  {
    name: "Hala Aledilbi",
    id: "hala_339038",
    role: "التواصل والتصميم والاختبار"
  }
];

/* 2. Contact Information */
const contact = {
  email: "events@example.com",
  social: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/"
    }
  ]
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[character];
  });
}

function svgImage(svg) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  return new Date(value + "T12:00:00").toLocaleDateString("ar", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatTime(value) {
  return new Date("2000-01-01T" + value + ":00").toLocaleTimeString("ar", {
    hour: "numeric",
    minute: "2-digit"
  });
}

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Fallback if localStorage is restricted
  }
}

/* Fallback SVG Image */
const fallbackImage = svgImage(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 550">
    <rect width="900" height="550" fill="#153e46"/>
    <circle cx="790" cy="70" r="170" fill="#147d7a"/>
    <circle cx="100" cy="510" r="170" fill="#21616a"/>
    <rect x="270" y="110" width="360" height="320" rx="30" fill="#fff"/>
    <path d="M300 110h300a30 30 0 0 1 30 30v65H270v-65a30 30 0 0 1 30-30" fill="#f0be70"/>
    <path d="M350 85v60M550 85v60" stroke="#153e46" stroke-width="16" stroke-linecap="round"/>
    <g fill="#e4f1ee">
      <rect x="325" y="245" width="60" height="55" rx="9"/>
      <rect x="420" y="245" width="60" height="55" rx="9"/>
      <rect x="515" y="245" width="60" height="55" rx="9"/>
      <rect x="325" y="335" width="60" height="55" rx="9"/>
    </g>
    <path d="m440 360 25 25 60-65" fill="none" stroke="#147d7a" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`);

document.addEventListener("error", function (event) {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.dataset.fallback !== "true") {
    image.dataset.fallback = "true";
    image.src = fallbackImage;
  }
}, true);

/* 3. Events Dataset */
const weekStart = new Date();
weekStart.setHours(0, 0, 0, 0);
weekStart.setDate(weekStart.getDate() - weekStart.getDay());

function dateFromWeek(offset) {
  const date = new Date(weekStart);
  date.setDate(date.getDate() + offset);
  return localDateString(date);
}

const images = {
  culture: "assets/img/culture.jpg",
  sport: "assets/img/sport.jpg",
  music: "assets/img/music.jpg",
  family: "assets/img/family.jpg",
  workshop: "assets/img/workshop.jpg",
  students: "assets/img/students.jpg",
  chess: "assets/img/chess.jpg"
};

const events = [
  {
    id: 1,
    title: "ملتقى القراءة والحوار",
    category: "ثقافة",
    date: dateFromWeek(4),
    start: "17:00",
    end: "19:00",
    city: "دمشق",
    venue: "قاعة الأنشطة الطلابية — موقع افتراضي",
    image: images.culture,
    gallery: [images.culture, images.students],
    summary: "كتب تجمعنا، وأفكار تستحق النقاش والمشاركة.",
    description:
      "لقاء ثقافي يتيح للطلاب مشاركة تجاربهم مع القراءة ومناقشة الكتب والأفكار في أجواء ودية. لا يشترط إنهاء كتاب محدد؛ يمكن لكل مشارك تقديم ترشيح أو فكرة أثرت فيه.",
    agenda: [
      "استقبال المشاركين والتعارف.",
      "مشاركة ترشيحات الكتب وتجارب القراءة.",
      "حوار مفتوح وتوصيات ختامية."
    ],
    featured: true,
    addedOrder: 4
  },
  {
    id: 2,
    title: "تحدي اللياقة الطلابي",
    category: "رياضة",
    date: dateFromWeek(5),
    start: "09:00",
    end: "11:00",
    city: "حلب",
    venue: "المساحة الرياضية — موقع افتراضي",
    image: images.sport,
    gallery: [images.sport, images.students],
    summary: "نشاط وحماس وتحديات جماعية لمستويات مختلفة.",
    description:
      "يوم رياضي ترفيهي يشجع الحركة والعمل الجماعي من خلال محطات خفيفة ومتنوعة. يختار كل مشارك الأنشطة المناسبة لقدرته، مع فترات راحة بين التحديات.",
    agenda: [
      "التعريف بالتحديات والإحماء.",
      "محطات حركية وألعاب جماعية.",
      "تمارين تهدئة وختام النشاط."
    ],
    featured: true,
    addedOrder: 3
  },
  {
    id: 3,
    title: "أمسية المواهب الموسيقية",
    category: "موسيقى",
    date: dateFromWeek(6),
    start: "18:00",
    end: "20:00",
    city: "حمص",
    venue: "المسرح الطلابي — موقع افتراضي",
    image: images.music,
    gallery: [images.music, images.students],
    summary: "مساحة للمواهب الجامعية في العزف والأداء.",
    description:
      "أمسية فنية تمنح الطلاب فرصة تقديم مواهبهم أمام زملائهم، وتجمع عروضًا فردية وجماعية في مساحة تشجع الإبداع وتبادل الخبرات.",
    agenda: [
      "افتتاح الأمسية والتعريف بالمشاركين.",
      "عروض موسيقية فردية وجماعية.",
      "لقاء قصير مع المواهب المشاركة."
    ],
    featured: true,
    addedOrder: 5
  },
  {
    id: 4,
    title: "يوم العائلة الجامعي",
    category: "عائلي",
    date: dateFromWeek(12),
    start: "10:00",
    end: "14:00",
    city: "دمشق",
    venue: "مساحة الأنشطة الخارجية — موقع افتراضي",
    image: images.family,
    gallery: [images.family, images.students],
    summary: "وقت ممتع يجمع الطلاب وعائلاتهم في أنشطة مشتركة.",
    description:
      "يوم اجتماعي يقرّب العائلات من المجتمع الجامعي من خلال ألعاب تعاونية وأركان فنية وأنشطة خفيفة تناسب أعمارًا مختلفة.",
    agenda: [
      "استقبال العائلات والتعريف بالبرنامج.",
      "ألعاب جماعية وأركان فنية.",
      "جلسة اجتماعية وصور تذكارية."
    ],
    featured: false,
    addedOrder: 6
  },
  {
    id: 5,
    title: "ورشة العرض والإلقاء",
    category: "ثقافة",
    date: dateFromWeek(9),
    start: "16:00",
    end: "18:00",
    city: "عبر الإنترنت",
    venue: "جلسة إلكترونية — يحدد المنظم رابطها",
    image: images.workshop,
    gallery: [images.workshop, images.students],
    summary: "تعلّم كيف تنظّم أفكارك وتقدّمها بثقة ووضوح.",
    description:
      "ورشة تطبيقية تساعد الطلاب على بناء عرض منظم واختيار الأفكار الأساسية وتحسين الإلقاء وإدارة الوقت. تتضمن تمارين قصيرة وملاحظات من المشاركين.",
    agenda: [
      "تنظيم الأفكار وبناء مقدمة واضحة.",
      "أساسيات تصميم الشرائح والإلقاء.",
      "عروض قصيرة وتغذية راجعة."
    ],
    featured: false,
    addedOrder: 2
  },
  {
    id: 6,
    title: "بطولة الشطرنج الجامعية",
    category: "رياضة",
    date: dateFromWeek(10),
    start: "15:00",
    end: "18:00",
    city: "حلب",
    venue: "نادي الطلاب — موقع افتراضي",
    image: images.chess,
    gallery: [images.chess, images.students],
    summary: "منافسات ودية لعشاق التركيز والتخطيط.",
    description:
      "بطولة ودية تجمع الطلاب المهتمين بالشطرنج، وتتيح للمبتدئين والهواة تجربة المنافسة ضمن جولات منظمة وأجواء مشجعة.",
    agenda: [
      "تسجيل المشاركين وشرح قواعد البطولة.",
      "إقامة جولات المنافسة.",
      "إعلان النتائج وتكريم المشاركين."
    ],
    featured: false,
    addedOrder: 1
  }
];

/* 4. Header, Navigation, and Footer Rendering */
function socialLinks() {
  return contact.social.map(function (item) {
    return `
      <a href="${escapeHTML(item.url)}"
         target="_blank"
         rel="noopener noreferrer">
        ${escapeHTML(item.name)}
      </a>
    `;
  }).join("");
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const navigation = [
  { file: "index.html", label: "الرئيسية" },
  { file: "events.html", label: "الفعاليات" },
  { file: "event.html", label: "تفاصيل الفعالية" },
  { file: "about.html", label: "عن الدليل" },
  { file: "contact.html", label: "اتصل بنا" }
];

document.getElementById("siteHeader").innerHTML = `
  <nav class="navbar navbar-expand-lg custom-navbar sticky-top" aria-label="التنقل الرئيسي">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
        <img src="assets/img/logo.png"
             class="site-logo"
             alt="شعار دليل فعاليات الجامعة الافتراضية السورية"
             onerror="this.style.display='none'">
        <span>🎓 دليل الفعاليات</span>
      </a>

      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavigation"
              aria-controls="mainNavigation"
              aria-expanded="false"
              aria-label="فتح قائمة التنقل">
        <i class="bi bi-list fs-3"></i>
      </button>

      <div class="collapse navbar-collapse" id="mainNavigation">
        <ul class="navbar-nav mx-auto gap-lg-1 py-3 py-lg-0">
          ${navigation.map(function (item) {
  const active = currentPage === item.file;
  const currentAttribute = active ? 'aria-current="page"' : "";

  return `
              <li class="nav-item">
                <a class="nav-link ${active ? "active" : ""}"
                   href="${item.file}"
                   ${currentAttribute}>${item.label}
                </a>
              </li>
            `;
}).join("")}
        </ul>

        <button id="themeToggle"
                type="button"
                class="theme-toggle-pill mb-3 mb-lg-0"
                aria-pressed="false"
                aria-label="تبديل المظهر">
          <span class="theme-icon-wrapper">
            <i class="bi bi-moon-stars-fill theme-icon"></i>
          </span>
          <span class="theme-text">الوضع الليلي</span>
        </button>
      </div>
    </div>
  </nav>
`;

/* Footer Rendering */
document.getElementById("siteFooter").innerHTML = `
  <div class="container">
    <div class="row g-4 text-start">
      <div class="col-lg-5">
        <h2 class="h5 text-white fw-bold">
          دليل فعاليات الجامعة الافتراضية السورية (SVU)
        </h2>
        <p class="text-secondary mb-0">
          مساحة لاكتشاف الأنشطة ومشاركة التجارب الجامعية.
        </p>
      </div>

      <div class="col-sm-6 col-lg-4">
        <h3 class="h6 text-white fw-bold mb-3">روابط التنقل السريع</h3>
        <div class="d-flex flex-wrap gap-3 footer-links">
          <a href="index.html">الرئيسية</a>
          <a href="events.html">الفعاليات</a>
          <a href="event.html">تفاصيل الفعالية</a>
          <a href="about.html">عن الدليل</a>
          <a href="contact.html">اتصل بنا</a>
        </div>
      </div>

      <div class="col-sm-6 col-lg-3">
        <h3 class="h6 text-white fw-bold mb-3">تواصل معنا</h3>
        <a href="mailto:${escapeHTML(contact.email)}" class="footer-email">
          ${escapeHTML(contact.email)}
        </a>
        <div class="social-links mt-3 d-flex gap-3">
          ${socialLinks()}
        </div>
      </div>
    </div>

    <div class="footer-bottom text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
      جميع الحقوق محفوظة © 2026 - دليل فعاليات الجامعة الافتراضية السورية (SVU)
    </div>
  </div>
`;

document.querySelectorAll("[data-email]").forEach(function (link) {
  link.textContent = contact.email;
  link.href = "mailto:" + contact.email;
});

document.querySelectorAll("[data-social]").forEach(function (element) {
  element.innerHTML = socialLinks();
});

/* 5. Dark Mode Controller */
const themeToggle = document.getElementById("themeToggle");

function applyTheme(dark) {
  document.body.classList.toggle("dark-mode", dark);

  const icon = themeToggle.querySelector(".theme-icon");
  const text = themeToggle.querySelector(".theme-text");

  if (dark) {
    icon.className = "bi bi-sun-fill theme-icon";
    text.textContent = "الوضع النهاري";
  } else {
    icon.className = "bi bi-moon-stars-fill theme-icon";
    text.textContent = "الوضع الليلي";
  }

  themeToggle.setAttribute("aria-pressed", String(dark));
}

applyTheme(readPreference("guideTheme") === "dark");

themeToggle.addEventListener("click", function () {
  const dark = !document.body.classList.contains("dark-mode");
  applyTheme(dark);
  savePreference("guideTheme", dark ? "dark" : "light");
});

/* 6. Render Team Members */
function avatarImage(index) {
  const colors = ["#147d7a", "#b98a42", "#7d68a6", "#aa657b", "#397e9b"];
  const color = colors[index % colors.length];

  return svgImage(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="50" fill="${color}"/>
      <circle cx="50" cy="36" r="17" fill="#fff"/>
      <path d="M19 88c2-22 14-33 31-33s29 11 31 33" fill="#fff"/>
    </svg>
  `);
}

document.querySelectorAll("[data-team]").forEach(function (container) {
  container.innerHTML = team.map(function (member, index) {
    return `
      <div class="col-12 col-sm-6 col-lg animate-item" style="animation-delay: ${index * 0.1}s">
        <article class="team-card panel text-center">
          <img src="${avatarImage(index)}"
               class="team-avatar mb-3"
               alt="صورة رمزية للمشارك ${index + 1}">
          <h3 class="h5 fw-bold">${escapeHTML(member.name)}</h3>
          <p class="small text-muted mb-2">${escapeHTML(member.role)}</p>
          <span class="team-id badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
            الرقم الجامعي: <bdi>${escapeHTML(member.id)}</bdi>
          </span>
        </article>
      </div>
    `;
  }).join("");
});

/* 7. Event Card Template */
function badgeClass(category) {
  return {
    "ثقافة": "badge-culture",
    "رياضة": "badge-sport",
    "موسيقى": "badge-music",
    "عائلي": "badge-family"
  }[category] || "badge-culture";
}

function eventCard(event, index = 0) {
  const isToday = event.date === localDateString(new Date());
  const delay = (index % 6) * 0.08;

  return `
    <div class="col-12 col-md-6 col-lg-4 animate-item" style="animation-delay: ${delay}s">
      <article class="card event-card card-modern h-100">
        <div class="card-img-wrapper">
          <img src="${escapeHTML(event.image)}"
               class="card-img-top"
               alt="صورة توضيحية: ${escapeHTML(event.title)}"
               loading="lazy">
        </div>

        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="badge event-badge ${badgeClass(event.category)}">
              ${escapeHTML(event.category)}
            </span>
            ${isToday ? '<span class="badge today-badge">اليوم</span>' : ""}
          </div>

          <h3 class="card-title h5 fw-bold mb-2">
            ${escapeHTML(event.title)}
          </h3>

          <p class="event-meta small text-muted mb-1">
            <i class="bi bi-calendar3 me-1"></i>
            <time datetime="${event.date}">${formatDate(event.date)}</time>
            • <i class="bi bi-geo-alt me-1"></i>${escapeHTML(event.city)}
          </p>

          <p class="event-meta small text-muted mb-3">
            ${escapeHTML(event.venue)}
          </p>

          <p class="text-muted small mb-4">
            ${escapeHTML(event.summary)}
          </p>

          <a href="event.html?id=${event.id}"
             class="btn btn-outline-primary mt-auto rounded-3 fw-semibold"
             aria-label="تفاصيل ${escapeHTML(event.title)}">
            اكتشف التفاصيل
          </a>
        </div>
      </article>
    </div>
  `;
}

/* 8. Home Page: Featured Slider and Latest Events */
const featuredSlides = document.getElementById("featuredSlides");

if (featuredSlides) {
  const featured = events.filter(function (event) {
    return event.featured;
  });

  featuredSlides.innerHTML = featured.map(function (event, index) {
    return `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <article class="featured-slide hero-slide">
          <img src="${escapeHTML(event.image)}" alt="${escapeHTML(event.title)}">
          <div class="featured-content hero-overlay">
            <span class="badge event-badge ${badgeClass(event.category)} mb-2 align-self-start">
              ${escapeHTML(event.category)}
            </span>
            <h3 class="fw-bold">${escapeHTML(event.title)}</h3>
            <p>${escapeHTML(event.summary)}</p>
            <p class="small opacity-75">
              ${formatDate(event.date)} • ${escapeHTML(event.city)}
            </p>
            <a href="event.html?id=${event.id}" class="btn btn-gold align-self-start mt-2">
              تفاصيل الفعالية
            </a>
          </div>
        </article>
      </div>
    `;
  }).join("");

  if (window.bootstrap && document.getElementById("featuredCarousel")) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const carousel = new bootstrap.Carousel(
      document.getElementById("featuredCarousel"),
      {
        interval: reduceMotion ? false : 5000,
        pause: "hover",
        touch: true
      }
    );

    if (!reduceMotion) {
      carousel.cycle();
    }
  }
}

const latestEventsContainer = document.getElementById("latestEvents");
if (latestEventsContainer) {
  latestEventsContainer.innerHTML = [...events]
    .sort(function (a, b) {
      return b.addedOrder - a.addedOrder;
    })
    .slice(0, 3)
    .map(function (ev, idx) {
      return eventCard(ev, idx);
    })
    .join("");
}

/* 9. Search, Filtering, and Category Persistence */
const eventsGrid = document.getElementById("eventsGrid");

if (eventsGrid) {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const dateFilter = document.getElementById("dateFilter");
  const locationFilter = document.getElementById("locationFilter");

  const queryCategory = new URLSearchParams(window.location.search).get("category");
  const initialCategory = queryCategory !== null ? queryCategory : readPreference("guideCategory");
  const allowedCategories = ["ثقافة", "رياضة", "موسيقى", "عائلي"];

  if (allowedCategories.includes(initialCategory)) {
    categoryFilter.value = initialCategory;
  }

  function filterEvents() {
    const search = searchInput.value.trim().toLocaleLowerCase("ar");

    const filtered = events.filter(function (event) {
      const text = [
        event.title,
        event.summary,
        event.description,
        event.city,
        event.venue
      ].join(" ").toLocaleLowerCase("ar");

      return (
        text.includes(search) &&
        (!categoryFilter.value || event.category === categoryFilter.value) &&
        (!dateFilter.value || event.date === dateFilter.value) &&
        (!locationFilter.value || event.city === locationFilter.value)
      );
    }).sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });

    eventsGrid.innerHTML = filtered.map(function (ev, idx) {
      return eventCard(ev, idx);
    }).join("");

    document.getElementById("resultsCount").textContent = `عدد النتائج: ${filtered.length}`;
    document.getElementById("noResults").hidden = filtered.length !== 0;

    savePreference("guideCategory", categoryFilter.value);
  }

  searchInput.addEventListener("input", filterEvents);
  categoryFilter.addEventListener("change", filterEvents);
  dateFilter.addEventListener("change", filterEvents);
  locationFilter.addEventListener("change", filterEvents);

  document.getElementById("filterForm").addEventListener("submit", function (event) {
    event.preventDefault();
    filterEvents();
  });

  document.getElementById("resetFilters").addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "";
    dateFilter.value = "";
    locationFilter.value = "";

    const url = new URL(window.location.href);
    url.searchParams.delete("category");

    try {
      window.history.replaceState(null, "", url.href);
    } catch {
      // Ignore history errors on file:// protocol
    }

    filterEvents();
  });

  filterEvents();
}

/* 10. Event Details Page Controller */
const eventContent = document.getElementById("eventContent");

if (eventContent) {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  const id = idParam ? Number(idParam) : 1;

  const selectedEvent = events.find(function (event) {
    return event.id === id;
  });

  if (!selectedEvent) {
    document.getElementById("eventError").hidden = false;
    eventContent.hidden = true;
  } else {
    document.getElementById("eventError").hidden = true;
    eventContent.hidden = false;

    document.title = `${selectedEvent.title} | دليل الفعاليات`;
    document.getElementById("eventPageTitle").textContent = selectedEvent.title;
    document.getElementById("eventPageSummary").textContent = selectedEvent.summary;

    const image = document.getElementById("detailImage");
    image.src = selectedEvent.image;
    image.alt = `صورة توضيحية: ${selectedEvent.title}`;

    const category = document.getElementById("detailCategory");
    category.textContent = selectedEvent.category;
    category.className = `badge event-badge mb-3 ${badgeClass(selectedEvent.category)}`;

    document.getElementById("detailDescription").textContent = selectedEvent.description;
    document.getElementById("detailDate").textContent = formatDate(selectedEvent.date);
    document.getElementById("detailTime").textContent = `${formatTime(selectedEvent.start)} – ${formatTime(selectedEvent.end)}`;
    document.getElementById("detailLocation").textContent = `${selectedEvent.city} — ${selectedEvent.venue}`;

    document.getElementById("detailAgenda").innerHTML = selectedEvent.agenda.map(function (item) {
      return `<li>${escapeHTML(item)}</li>`;
    }).join("");

    document.getElementById("mapCaption").textContent =
      selectedEvent.city === "عبر الإنترنت"
        ? "فعالية إلكترونية؛ لا تتطلب الحضور إلى موقع."
        : `${selectedEvent.city} — ${selectedEvent.venue}`;

    document.getElementById("eventMap").href = "https://share.google/MfcSvasNaO7ZIJrTd";

    document.getElementById("eventGallery").innerHTML = selectedEvent.gallery.map(function (src, index) {
      return `
        <div class="col-12 col-md-6 animate-item" style="animation-delay: ${index * 0.12}s">
          <img src="${escapeHTML(src)}"
               class="gallery-image"
               alt="صورة توضيحية للفعالية ${index + 1}"
               loading="lazy">
        </div>
      `;
    }).join("");

    const sameCategory = events.filter(function (event) {
      return event.id !== selectedEvent.id && event.category === selectedEvent.category;
    });

    const related = sameCategory.length
      ? sameCategory
      : events.filter(function (event) {
        return event.id !== selectedEvent.id;
      }).slice(0, 3);

    document.getElementById("relatedEvents").innerHTML = related.map(function (ev, idx) {
      return eventCard(ev, idx);
    }).join("");

    document.getElementById("calendarButton").addEventListener("click", function () {
      downloadCalendar(selectedEvent);
    });

    document.getElementById("shareButton").addEventListener("click", async function () {
      const status = document.getElementById("shareStatus");
      const url = window.location.href;
      status.hidden = true;

      try {
        if (navigator.share && ["http:", "https:"].includes(window.location.protocol)) {
          await navigator.share({
            title: selectedEvent.title,
            text: selectedEvent.summary,
            url: url
          });
          status.textContent = "تمت مشاركة الفعالية.";
        } else if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          status.textContent = "تم نسخ رابط الفعالية.";
        } else {
          status.textContent = `انسخ الرابط للمشاركة: ${url}`;
        }
        status.hidden = false;
      } catch (error) {
        if (error.name !== "AbortError") {
          status.textContent = `انسخ الرابط يدويًا: ${url}`;
          status.hidden = false;
        }
      }
    });

    const bookingStatus = document.getElementById("bookingStatus");

    document.getElementById("bookingForm").addEventListener("submit", function (event) {
      event.preventDefault();
      bookingStatus.textContent =
        `تم تأكيد الحجز التجريبي لفعالية «${selectedEvent.title}». ` +
        "هذا لا يمثل حجزًا فعليًا.";
      bookingStatus.hidden = false;
      event.currentTarget.reset();
    });

    document.getElementById("bookingModal").addEventListener("show.bs.modal", function () {
      bookingStatus.hidden = true;
    });
  }
}

/* 11. Calendar ICS File Generator */
function escapeCalendar(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function downloadCalendar(event) {
  function calendarTime(time) {
    return event.date.replace(/-/g, "") + "T" + time.replace(":", "") + "00";
  }

  const timestamp = new Date().toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  // Local timezone schedule format
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//University Events Student Project//AR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:event-${event.id}-${event.date}@example.com`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${calendarTime(event.start)}`,
    `DTEND:${calendarTime(event.end)}`,
    `SUMMARY:${escapeCalendar(event.title)}`,
    `DESCRIPTION:${escapeCalendar(event.description)}`,
    `LOCATION:${escapeCalendar(event.city + " - " + event.venue)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n") + "\r\n";

  const blob = new Blob([content], {
    type: "text/calendar;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `event-${event.id}.ics`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 1000);
}

/* 12. Contact Form Validation */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");
  const status = document.getElementById("contactStatus");

  const inputs = [nameInput, emailInput, messageInput];

  function markField(input, valid) {
    input.classList.toggle("is-invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
  }

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      status.hidden = true;
    });
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const validName = nameInput.value.trim().length >= 2;
    const validEmail =
      emailInput.validity.valid &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const validMessage = messageInput.value.trim().length >= 10;

    markField(nameInput, validName);
    markField(emailInput, validEmail);
    markField(messageInput, validMessage);

    status.hidden = false;

    if (!validName || !validEmail || !validMessage) {
      status.className = "alert alert-danger mt-3";
      status.textContent = "تعذّر قبول النموذج. صحّح الحقول الموضحة ثم حاول مرة أخرى.";

      const firstInvalid = contactForm.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    status.className = "alert alert-success mt-3";
    status.textContent =
      "تم التحقق من البيانات بنجاح. الإرسال تجريبي ولم تُرسل الرسالة إلى بريد فعلي.";

    contactForm.reset();

    inputs.forEach(function (input) {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    });
  });
}

/* 13. Scroll to Top Button & Scroll Reveal Animations */
document.body.insertAdjacentHTML("beforeend", `
  <button id="scrollTop"
          type="button"
          class="scroll-top-btn"
          aria-label="العودة إلى أعلى الصفحة"
          hidden>
    <i class="bi bi-arrow-up"></i>
  </button>
`);

const scrollTopButton = document.getElementById("scrollTop");

function updateScrollButton() {
  const show = window.scrollY >= 320;
  scrollTopButton.hidden = !show;
  scrollTopButton.classList.toggle("visible", show);
}

window.addEventListener("scroll", updateScrollButton, { passive: true });
updateScrollButton();

scrollTopButton.addEventListener("click", function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth"
  });
});

/* Intersection Observer for Smooth Section Animations */
const animatedElements = document.querySelectorAll(".panel, .section-heading, .category-link");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach(function (el) {
    el.classList.add("reveal-init");
    observer.observe(el);
  });
}