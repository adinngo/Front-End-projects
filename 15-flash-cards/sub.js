// Data
const contents = [
  {
    question: "What is roadmap.sh?",
    answer:
      "roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.",
  },
  {
    question: "What are the plans for roadmap.sh?",
    answer:
      "Our long-term plan is to make roadmap.sh a go-to place for developers whenever they plan on learning something new.",
  },
  {
    question: "How is roadmap.sh built?",
    answer:
      "The website is built with Astro and Tailwind and is deployed to GitHub pages. The project is open-core and the codebase can be found on GitHub.",
  },
  {
    question: "Can I use roadmap.sh in my team?",
    answer:
      "Yes, you can use roadmap.sh within your team for educational and planning purposes, provided you comply with their usage terms.",
  },
  {
    question: "How can I create custom roadmaps?",
    answer:
      "Creating custom roadmaps can help tailor learning paths or project plans to fit the specific needs of your team or organization.",
  },
  {
    question: "Is roadmap.sh really 7th most starred project on GitHub?",
    answer:
      "Yes, roadmap.sh is currently ranked as the 7th most-starred open-source project on GitHub, with over 298,000 stars. This impressive ranking places it among the top repositories out of millions hosted on GitHub.",
  },
];

// Manipulate card
const prevCard = document.querySelector(".prev");
const nextCard = document.querySelector(".next");
const showAnswer = document.querySelector(".show-answer");
const hideAnswer = document.querySelector(".hide-answer");
const pages = contents.length;
const currentPage = document.querySelector(".current-page");

let index = 0;

function LoadPage() {
  //display current percent
  const currentPercent = getCurrentPercent();

  document.querySelector(".current-state").setAttribute("data-content", currentPercent + "%");

  //display current state
  generateCurrentState();

  //
  if (currentPercent === 100) {
    console.log("100");

    document.querySelector(".current-state").setAttribute("data-content", "");
    document.querySelector(".current-state").classList.add("finish-state");

    currentPage.style.display = "none";
  }
  //display pages
  currentPage.innerHTML = ` 
   <b>${index + 1} of ${pages}</b>`;

  // Update card container content
  document.querySelector(".card-container").innerHTML = `
    <div class="question-card card">
        <p>${contents[index].question}</p>
    </div>
    <div class="answer-card card">
      <p>${contents[index].answer}</p>
    </div>
  `;

  //turn off overflow when click next or previous
  document.querySelector(".card-container").style.overflow = "hidden";

  showAnswer.style.display = "block";
  hideAnswer.style.display = "none";
}

// Attach event listeners once
showAnswer.addEventListener("click", () => {
  document.querySelector(".card-container").style.overflowY = "scroll";

  showAnswer.style.display = "none";
  hideAnswer.style.display = "block";
  document.querySelector(".answer-card").classList.toggle("appearance-answer");
});

hideAnswer.addEventListener("click", () => {
  document.querySelector(".card-container").style.overflow = "hidden";

  showAnswer.style.display = "block";
  hideAnswer.style.display = "none";

  document.querySelector(".answer-card").classList.toggle("appearance-answer");
});

prevCard.addEventListener("click", () => {
  index -= 1;
  if (index < 0) {
    index = 0;
  }
  currentPage.style.display = "block";
  document.querySelector(".current-state").classList.remove("finish-state");
  LoadPage();
});

nextCard.addEventListener("click", () => {
  index += 1;
  if (index > contents.length - 1) {
    index = contents.length - 1;
  }
  LoadPage();
});

// Load the initial page
LoadPage();
function getCurrentPercent() {
  const currentPercent = Math.round(((index + 1) / pages) * 100);
  return currentPercent;
}

function generateCurrentPercent() {
  const currentPercent = getCurrentPercent();
  document.querySelector(".current-state").setAttribute("data-content", currentPercent + "%");
}
function generateCurrentState() {
  document.querySelector(".current-state").style.width = `${getCurrentPercent()}%`;
}
