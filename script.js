
// ==========================================
// DASHAIN — POSTCARDS FROM KATHMANDU
// Presentation Interactions
// ==========================================

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

// ------------------------------------------
// PRESENTER SPEAKING NOTES
// ------------------------------------------

const notes = [
  `Welcome everyone! Today I want to take you on a little
  trip to Nepal, especially Kathmandu, to explore Dashain.
  This isn't just a religious festival. For many Nepalis,
  it is deeply connected to childhood, family, and home.
  The artwork is inspired by nostalgic Kathmandu.`,

  `Dashain is celebrated over 15 days and is one of the
  most important festivals in Nepal. Families travel
  long distances to reunite. There are blessings,
  worship, new clothes, and celebrations.
  Not all communities celebrate it the same way.
  I like to think of Dashain as the season when
  everyone tries to find their way home.`,

  `The festival celebrates the triumph of good over evil.
  One important story is about Durga defeating Mahishasura.
  Another tradition connects Vijayadashami with Rama
  defeating Ravana. What makes these stories meaningful
  is their shared message about strength and goodness.`,

  `Dashain lasts 15 days. Let me show you the five key
  moments. On Ghatasthapana, jamara is planted.
  Phulpati brings ceremonial offerings. Ashtami and
  Nawami are important days of worship. On Day 10,
  families receive tika, jamara and blessings.
  Kojagrat Purnima marks the festival's conclusion.
  Click each card as you talk.`,

  `This is probably one of my favorite Dashain traditions.
  The older generation gives blessings to younger family
  members. They place tika and jamara on them, and
  sometimes give dakshina, which is money.
  As a child, dakshina was always exciting!
  But beyond the gifts, it's a moment of connection
  between generations.`,

  `Imagine Kathmandu decades ago. Kids flying kites
  on rooftops, bamboo swings, new clothes, transistor
  radios, school holidays and relatives coming over.
  These images evoke a nostalgic impression rather
  than documenting one exact year. Ask the audience
  what childhood festivals they remember most.`,

  `No Nepali celebration is complete without food.
  Sel roti is a ring-shaped fried rice bread.
  Chiura is beaten rice and is often eaten with curry.
  Many households prepare masu and achar.
  Every family has its own recipes and traditions,
  so there is no single universal Dashain menu.`,

  `Traditions change as people migrate.
  Nepalis living overseas may celebrate in apartments
  or community halls rather than their ancestral homes.
  Families often recreate familiar rituals and meals.
  Technology also helps people remain connected.
  For me, this shows that tradition lives through people.`,

  `To wrap up, Dashain is about blessings, belonging,
  culture, and the feeling of home. Before we finish,
  here is a little quiz. What are the sacred sprouts
  called? Thank everyone and wish them:
  Dashain ko shubhakamana!`
];

// ------------------------------------------
// SLIDE NAVIGATION
// ------------------------------------------

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove("active");

  currentSlide = index;

  slides[currentSlide].classList.add("active");
  slides[currentSlide].scrollTop = 0;

  slideCount.textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  slideTitle.textContent = slides[index].dataset.title;

  progressBar.style.width =
    `${((index + 1) / slides.length) * 100}%`;

  notesText.textContent = notes[index];

  prevButton.disabled = index === 0;
  nextButton.disabled = index === slides.length - 1;

  window.history.replaceState(
    null,
    "",
    `#scene-${index + 1}`
  );
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Navigation buttons
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

// Cover button
document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", nextSlide);
});

// Replay
document.getElementById("replayButton").addEventListener(
  "click",
  () => goToSlide(0)
);

// Home logo
document.getElementById("homeLink").addEventListener(
  "click",
  event => {
    event.preventDefault();
    goToSlide(0);
  }
);

// ------------------------------------------
// KEYBOARD NAVIGATION
// ------------------------------------------

document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    prevSlide();
  }

  if (event.key === "Escape") {
    presenterNotes.hidden = true;
    notesButton.setAttribute("aria-pressed", "false");
  }
});

// ------------------------------------------
// PRESENTER NOTES
// ------------------------------------------

notesButton.addEventListener("click", () => {
  const opening = presenterNotes.hidden;

  presenterNotes.hidden = !opening;

  notesButton.setAttribute(
    "aria-pressed",
    String(opening)
  );

  notesText.textContent = notes[currentSlide];
});

// ------------------------------------------
// INTERACTIVE DASHAIN CALENDAR
// ------------------------------------------

const festivalDays = [
  {
    heading: "DAY 01 / PLANTING NEW BEGINNINGS",
    description:
      "Ghatasthapana marks the beginning of Dashain. Families establish a sacred space and plant grains to grow jamara, which will later be used for blessings."
  },
  {
    heading: "DAY 07 / WELCOMING PHULPATI",
    description:
      "Phulpati features ceremonial offerings of leaves, flowers, and sacred plants. Kathmandu is known for its traditional Phulpati procession associated with Hanuman Dhoka."
  },
  {
    heading: "DAYS 08–09 / THE POWER OF DURGA",
    description:
      "Maha Ashtami and Maha Nawami are important days for worship of Goddess Durga. Rituals and observances vary among households and communities."
  },
  {
    heading: "DAY 10 / VIJAYA DASHAMI",
    description:
      "The most anticipated family occasion! Elders place tika and jamara on younger relatives and offer blessings. Many families continue visiting relatives on the following days."
  },
  {
    heading: "DAY 15 / KOJAGRAT PURNIMA",
    description:
      "The full-moon day traditionally marks the conclusion of Dashain. Many families worship Goddess Lakshmi and bring the festival period to a close."
  }
];

const dayButtons = document.querySelectorAll(".day-card");
const dayDetail = document.getElementById("dayDetail");

dayButtons.forEach(button => {
  button.addEventListener("click", () => {
    dayButtons.forEach(day => {
      day.classList.remove("selected");
      day.setAttribute("aria-pressed", "false");
    });

    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");

    const index = Number(button.dataset.day);
    const info = festivalDays[index];

    dayDetail.innerHTML = `
      <span>${info.heading}</span>
      <p>${info.description}</p>
    `;
  });
});

// ------------------------------------------
// INTERACTIVE QUIZ
// ------------------------------------------

const quizButtons = document.querySelectorAll(
  ".quiz-options button"
);

const quizResult = document.getElementById("quizResult");

quizButtons.forEach(button => {
  button.addEventListener("click", () => {
    const correct = button.dataset.correct === "true";

    if (correct) {
      quizResult.textContent =
        "✳ CORRECT! JAMARA — THE SACRED FESTIVAL SPROUTS.";
    } else {
      quizResult.textContent =
        "NOT QUITE! THE CORRECT ANSWER IS JAMARA.";
    }

    quizButtons.forEach(option => {
      option.style.opacity = option === button ? "1" : ".5";
    });
  });
});

// ------------------------------------------
// MOBILE SWIPE NAVIGATION
// ------------------------------------------

let touchStartX = 0;
let touchStartY = 0;

const presentation = document.getElementById("presentation");

presentation.addEventListener(
  "touchstart",
  event => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  },
  { passive: true }
);

presentation.addEventListener(
  "touchend",
  event => {
    const deltaX =
      event.changedTouches[0].screenX - touchStartX;

    const deltaY =
      event.changedTouches[0].screenY - touchStartY;

    if (
      Math.abs(deltaX) > 80 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.5
    ) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  },
  { passive: true }
);

// ------------------------------------------
// INITIALIZE PRESENTATION
// ------------------------------------------

const match = window.location.hash.match(
  /^#scene-(\d+)$/
);

if (match) {
  goToSlide(Number(match[1]) - 1);
} else {
  goToSlide(0);
}

console.log("Dashain — Postcards from Kathmandu ✳ Ready!");
