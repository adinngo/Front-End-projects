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

const currentPage = document.querySelector(".current-page");

const currentState = document.querySelector(".current-state");

const container = document.querySelector(".card-container");

const pages = contents.length;

let index = 0;

// Load the initial page
LoadPage();

function LoadPage() {
  //display show answer btn
  displayShowAnswerBtn();

  //display current state
  generateCurrentState();

  //display current percent
  const currentPercent = getCurrentPercent();

  if (currentPercent === 100) {

    setTimeout(()=>{
      currentState.setAttribute("data-content", "");
    }, 100);

    currentState.classList.add("finished-state");

    //remove current page
    currentPage.style.display = "none";
  }

  //display pages
  currentPage.innerHTML = `<b>${index + 1} of ${pages}</b>`;

  // Update card container content
  container.innerHTML = `
    <div class="question-card card">
        <p>${contents[index].question}</p>
    </div>

    <div class="answer-card card">
      <p>${contents[index].answer}</p>
    </div>
  `;

  //disable overflow when click next or previous
  disableOverFlow();
}

// Attach event listeners once
showAnswer.addEventListener("click", () => {
  //enable overflow
  container.style.overflowY = "scroll";

  document.querySelector(".answer-card").classList.add("appearance-answer");

  displayHideAnswerBtn();
});

hideAnswer.addEventListener("click", () => {
  disableOverFlow();

  document.querySelector(".answer-card").classList.remove("appearance-answer");

  displayShowAnswerBtn();
});

prevCard.addEventListener("click", () => {
  index -= 1;
  if (index < 0) {
    index = 0;
  }

  currentPage.style.display = "block";

  currentState.classList.remove("finished-state");

  LoadPage();
});

nextCard.addEventListener("click", () => {
  index += 1;

  if (index > contents.length - 1) {
    index = contents.length - 1;
  }

  LoadPage();
});

function getCurrentPercent() {
  const currentPercent = Math.round(((index + 1) / pages) * 100);

  return currentPercent;
}


function generateCurrentState() {
  const currentPercent = getCurrentPercent();
  currentState.setAttribute("data-content", currentPercent + "%");

  currentState.style.width = `${getCurrentPercent()}%`;
}
function displayShowAnswerBtn() {
  showAnswer.style.display = "block";

  hideAnswer.style.display = "none";
}

function displayHideAnswerBtn() {
  showAnswer.style.display = "none";

  hideAnswer.style.display = "block";
}

function disableOverFlow() {
  container.style.overflow = "hidden";
}
