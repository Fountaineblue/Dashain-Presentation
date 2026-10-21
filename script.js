
const slides = [...document.querySelectorAll(".slide")];
const slideCount = document.getElementById("slideCount");
const slideTitle = document.getElementById("slideTitle");
const progressBar = document.getElementById("progressBar");
const presenterNotes = document.getElementById("presenterNotes");
const notesText = document.getElementById("notesText");
const notesButton = document.getElementById("notesButton");

let currentSlide = 0;

const titles = [
  "WELCOME", "THE FEELING", "THE LEGEND",
  "15 DAYS", "TIKA + JAMARA", "OLD KATHMANDU",
  "THE FEAST", "THEN + NOW", "THE TAKEAWAY"
];

const notes = [
  "Start by asking whether anyone has heard of Dashain. Explain that this is a nostalgic journey through Nepal's biggest festive season. Mention that the artwork is inspired by old Kathmandu, not an exact historical reconstruction.",
  "Dashain is widely celebrated by Nepali Hindu communities, but practices differ among families and communities. It lasts 15 days, and family reunion is one of its most meaningful themes.",
  "Explain how Durga defeated Mahishasura. In another tradition, Vijayadashami is associated with Rama defeating Ravana. These stories symbolize good overcoming evil.",
  "Focus on five key moments. Day 1: Ghatasthapana. Day 7: Phulpati. Days 8 and 9: special worship. Day 10: tika and blessings. Day 15: Kojagrat Purnima.",
  "Describe how elders place tika and jamara on family members and offer blessings. Some also give dakshina. Ask the audience whether they have a similar tradition.",
  "Invite the audience to imagine the rooftops of Kathmandu decades ago: kites, bamboo swings, radios, holidays, new clothes, and families gathering. Explain that this is a nostalgic impression of the era.",
  "Talk about sel roti, chiura, curries, and achar. Mention that festival meals differ among families and regions, including vegetarian households.",
  "Discuss Nepalis living overseas, keeping traditions alive through gatherings and calls. Ask whether the audience celebrates any festival away from their hometown.",
  "End with the idea that Dashain is about belonging and blessings. Ask the quiz question, thank everyone, and wish them Dashain ko shubhakamana."
];

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  slides[currentSlide].scrollTop = 0;

  slideCount.textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  slideTitle.textContent = titles[index];
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  notesText.textContent = notes[index];

  history.replaceState(null, "", `#scene-${index + 1}`);
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

document.addEventListener("keydown", e => {
  if (["ArrowRight", "PageDown"].includes(e.key)) {
    e.preventDefault();
    nextSlide();
  } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
    e.preventDefault();
    prevSlide();
  } else if (e.key === "Escape") {
    presenterNotes.hidden = true;
    notesButton.setAttribute("aria-pressed", "false");
  }
});

notesButton.addEventListener("click", () => {
  presenterNotes.hidden = !presenterNotes.hidden;
  notesButton.setAttribute("aria-pressed", String(!presenterNotes.hidden));
  notesText.textContent = notes[currentSlide];
});

const dayInformation = [
  {
    heading: "DAY 01 / PLANTING NEW BEGINNINGS",
    text: "Ghatasthapana marks the start of Dashain. Families establish a sacred space and sow grains to grow jamara, which will later be offered with blessings."
  },
  {
    heading: "DAY 07 / WELCOMING PHULPATI",
    text: "Phulpati involves ceremonial offerings of flowers, leaves, and plants. Traditionally, a special Phulpati procession is associated with Kathmandu's Hanuman Dhoka."
  },
  {
    heading: "DAYS 08–09 / DURGA'S STRENGTH",
    text: "Maha Ashtami and Maha Nawami are important days of worship dedicated to Durga and her forms. Observances differ by community, temple, and household."
  },
  {
    heading: "DAY 10 / VIJAYA DASHAMI",
    text: "The most anticipated family day! Elders give tika, jamara, and blessings. Relatives visit one another, and celebrations often continue for several days."
  },
  {
    heading: "DAY 15 / KOJAGRAT PURNIMA",
    text: "The full-moon day traditionally closes the Dashain period. Many households observe worship of Lakshmi, marking the conclusion of the festival."
  }
];

document.querySelectorAll(".day").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".day").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");

    const info = dayInformation[Number(button.dataset.day)];
    document.getElementById("dayDetail").innerHTML = `
      <div class="eyebrow">${info.heading}</div>
      <p>${info.text}</p>
    `;
  });
});

function checkAnswer(button, correct) {
  const result = document.getElementById("quizResult");
  result.textContent = correct
    ? "✳ CORRECT! JAMARA — THE SACRED FESTIVAL SPROUTS."
    : "NOT QUITE! THE ANSWER IS JAMARA.";
  result.style.color = "#e9b763";
  document.querySelectorAll(".quiz button").forEach(b => {
    b.style.opacity = b === button ? "1" : ".5";
  });
}

// Allow swipe navigation on touch devices.
let touchStartX = 0;
let touchStartY = 0;

document.querySelector("main").addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.querySelector("main").addEventListener("touchend", e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  const dy = e.changedTouches[0].screenY - touchStartY;

  if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0) nextSlide();
    else prevSlide();
  }
}, { passive: true });

// Restore a scene URL if provided.
const match = window.location.hash.match(/^#scene-(\d+)$/);
if (match) goToSlide(Number(match[1]) - 1);
