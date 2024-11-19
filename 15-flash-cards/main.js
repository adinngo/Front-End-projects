// data
const contents = [
  {
    question: "What is roadmap.sh?",
    answer:
      "roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings",
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

//manipulate card
const prevCard = document.querySelector(".prev");
const nextCard = document.querySelector(".next");
const showAnswer = document.querySelector(".show-answer");
const hideAnswer = document.querySelector(".hide-answer");
let index = 0;

LoadPage();


function LoadPage() {
   console.log(index);
  document.querySelector(".card-container").innerHTML = `
    <div class="question-card card">
        <p>${contents[index].question}</p>
    </div>
    <div class="answer-card card">
      <p>${contents[index].answer}</p>
    </div>
  `;
  
  document.querySelector(".show-answer").addEventListener("click", () => {
    hideAnswer.classList.toggle("appearance-action");
    showAnswer.classList.toggle("disappearance-action");
    document.querySelector(".answer-card").classList.toggle("appearance-answer");
  });

  hideAnswer.addEventListener("click", () => {
    hideAnswer.classList.toggle("appearance-action");
    showAnswer.classList.toggle("disappearance-action");
    document.querySelector(".answer-card").classList.toggle("appearance-answer");
  });

  prevCard.addEventListener("click", () => {
    index -= 1;
    if (index < 0) {
      index = contents.length - 1;
    }
    LoadPage();
  });
  nextCard.addEventListener("click", () => {
    index += 1;
    if (index > contents.length - 1) {
      index = 0;
    }
    LoadPage();
  });
}
