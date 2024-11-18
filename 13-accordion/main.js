// // data
const contents = [
  {
    question: "What is roadmap.sh?",
    answer:
      "roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings",
  },
  {
    question: "What are the plans for roadmap.sh?",
    answer:
      "Our long-term plan is to make roadmap.sh a go-to place for developers whenever they plan on learning something new. We started with roadmaps, guides, videos and other visual content but we plan on introducing best practices, best-practices for certain tasks, quizzes to test your knowledge and prepare yourself for the interviews, project ideas to work on while following the roadmaps, public profiles to share your progress and interact with the other learners and so on.",
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

// /* start of generating questions in html */

let accordionHTML = "";

contents.forEach((content) => {
  const html = `
       <li class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">
              <p>${content.question}</p>
              <button class="open-answer"><i class="bx bx-chevron-down"></i></button>
            </div>
            <div class="accordion-content">
              <p>${content.answer}</p>
            </div>
          </div>
        </li>
    `;

  accordionHTML += html;
});

document.querySelector(".js-accordions-list").innerHTML = accordionHTML;

// /* end of generating questions in html */

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const button = accordion.querySelector(".open-answer");
  const content = accordion.querySelector(".accordion-content");

  button.addEventListener("click", () => {
    const isActive = accordion.classList.contains("active");

    // Close all accordions
    accordions.forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".accordion-content").style.maxHeight = null;
    });

    // Open clicked accordion if it wasn't already active
    if (!isActive) {
      accordion.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});


