
// DASHAIN — POSTCARDS FROM KATHMANDU
// Complete presentation JavaScript, version 5

const slides = [...document.querySelectorAll(".slide")];
const slideCount = document.getElementById("slideCount");
const slideTitle = document.getElementById("slideTitle");
const progressBar = document.getElementById("progressBar");
const notesButton = document.getElementById("notesButton");
const presenterNotes = document.getElementById("presenterNotes");
const notesText = document.getElementById("notesText");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentSlide = 0;

const notes = [
  "Welcome everyone! Today we're exploring Dashain, one of Nepal's most important festivals. This is a journey through traditions, childhood memories, and the feeling of home. The graphics are inspired by old Kathmandu.",
  "Dashain lasts 15 days. It's a time when families reunite, children get holidays, relatives visit, and people receive blessings. Different Nepali communities celebrate differently. For many families, Dashain is about coming home.",
  "One tradition celebrates Goddess Durga defeating Mahishasura, symbolizing the victory of good over evil. Another tradition connects Vijayadashami with Rama defeating Ravana. These stories emphasize strength, courage, and goodness.",
  "Let's explore five key moments: Ghatasthapana when jamara is planted, Phulpati, Maha Ashtami and Nawami, Vijaya Dashami when families receive blessings, and Kojagrat Purnima when the festival ends. Click the cards.",
  "On Vijaya Dashami, elders bless younger family members with tika and jamara. Dakshina is money sometimes given as a gift. It's a beautiful tradition connecting generations.",
  "Imagine old Kathmandu during Dashain: children on rooftops flying kites, bamboo swings, holiday clothes, and family gatherings. These are nostalgic cultural images rather than an exact historical reconstruction.",
  "Let's talk food! Sel roti is a ring-shaped rice bread. Chiura is beaten rice. Families prepare curries and pickles. Food customs differ across Nepal, but gathering to share a meal is a familiar theme.",
  "Many Nepalis live abroad and celebrate Dashain far away from home. Traditions continue through shared meals, visits, and calls. The place may change, but the feeling of connection continues.",
  "Dashain is about family, culture, blessings, and belonging. Let's do a quick quiz: what are the sacred sprouts called? The answer is jamara! Dashain ko shubhakamana!"
];

// Change slide
function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove("active");
  slides[currentSlide].setAttribute("aria-hidden", "true");

  currentSlide = index;

  slides[currentSlide].classList.add("active");
  slides[currentSlide].setAttribute("aria-hidden", "false");
  slides[currentSlide].scrollTop = 0;

  slideCount.textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  slideTitle.textContent = slides[index].dataset.title;
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;

  notesText.textContent = notes[index];

  prevButton.disabled = index === 0;
  nextButton.disabled = index === slides.length - 1;

  history.replaceState(null, "", `#slide-${index + 1}`);
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Navigation
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

document.querySelector("[data-next]").addEventListener("click", nextSlide);

document.getElementById("replayButton").addEventListener("click", () => {
  goToSlide(0);
});

document.getElementById("homeLink").addEventListener("click", event => {
  event.preventDefault();
  goToSlide(0);
});

// Keyboard controls
document.addEventListener("keydown", event => {
  if (["ArrowRight", "PageDown"].includes(event.key)) {
    event.preventDefault();
    nextSlide();
  }

  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    prevSlide();
  }

  if (event.key === "Escape") {
    presenterNotes.hidden = true;
    notesButton.setAttribute("aria-pressed", "false");
  }
});

// Presenter notes
notesButton.addEventListener("click", () => {
  presenterNotes.hidden = !presenterNotes.hidden;
  notesButton.setAttribute("aria-pressed", String(!presenterNotes.hidden));
  notesText.textContent = notes[currentSlide];
});

// Dashain timeline
const days = [
  {
    title: "DAY 01 / PLANTING NEW BEGINNINGS",
    description: "Ghatasthapana marks the beginning of Dashain. Families establish a sacred space and grow jamara, the sprouts later used for blessings."
  },
  {
    title: "DAY 07 / WELCOMING PHULPATI",
    description: "Phulpati involves ceremonial offerings of leaves, flowers, and plants. Kathmandu is known for its traditional Phulpati procession associated with Hanuman Dhoka."
  },
  {
    title: "DAYS 08–09 / THE POWER OF DURGA",
    description: "Maha Ashtami and Maha Nawami are important days of Goddess Durga worship. Rituals and customs differ between communities and households."
  },
  {
    title: "DAY 10 / VIJAYA DASHAMI",
    description: "Families gather for tika, jamara, and blessings from elders. Visiting relatives and celebrating together may continue over several days."
  },
  {
    title: "DAY 15 / KOJAGRAT PURNIMA",
    description: "Kojagrat Purnima traditionally marks the conclusion of Dashain. Many families observe worship of Goddess Lakshmi."
  }
];

const dayCards = document.querySelectorAll(".day-card");
const dayDetail = document.getElementById("dayDetail");

dayCards.forEach(card => {
  card.addEventListener("click", () => {
    dayCards.forEach(button => {
      button.classList.remove("selected");
      button.setAttribute("aria-pressed", "false");
    });

    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");

    const day = days[Number(card.dataset.day)];

    dayDetail.innerHTML = `
      <strong>${day.title}</strong>
      <p>${day.description}</p>
    `;
  });
});

// Final quiz
const quizButtons = document.querySelectorAll(".quiz-options button");
const quizResult = document.getElementById("quizResult");

quizButtons.forEach(button => {
  button.addEventListener("click", () => {
    const correct = button.dataset.correct === "true";

    quizResult.textContent = correct
      ? "✳ CORRECT! JAMARA — THE SACRED SPROUTS."
      : "NOT QUITE! THE CORRECT ANSWER IS JAMARA.";

    quizButtons.forEach(option => {
      option.style.opacity = option === button ? "1" : ".5";
    });
  });
});

// Swipe navigation on touch devices
let startX = 0;
let startY = 0;

const presentation = document.getElementById("presentation");

presentation.addEventListener("touchstart", event => {
  startX = event.changedTouches[0].screenX;
  startY = event.changedTouches[0].screenY;
}, { passive: true });

presentation.addEventListener("touchend", event => {
  const dx = event.changedTouches[0].screenX - startX;
  const dy = event.changedTouches[0].screenY - startY;

  if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0) nextSlide();
    else prevSlide();
  }
}, { passive: true });

// Initialize
slides.forEach((slide, index) => {
  slide.setAttribute("aria-hidden", String(index !== 0));
});

const savedSlide = window.location.hash.match(/^#slide-(\d+)$/);
const startSlide = savedSlide ? Number(savedSlide[1]) - 1 : 0;

goToSlide(startSlide >= 0 && startSlide < slides.length ? startSlide : 0);

console.log("Dashain presentation loaded successfully.");
