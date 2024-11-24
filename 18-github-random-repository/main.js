const searchBtn = document.querySelector(".search-btn");
const languageSelect = document.querySelector(".languages-select");
const result = document.querySelector(".result");
const currentState = document.querySelector(".current-state");


// get languages data
async function loadLanguages() {
  let languagesDataHTML = "";
  const response = await fetch(
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
  );
  const languagesData = await response.json();
  languagesData.forEach((element) => {
    languagesDataHTML += `
      <option value="${element.value}">${element.title}</option>
    `;
  });
  languageSelect.innerHTML = languagesDataHTML;
}
loadLanguages();

/* handle the case if user does not chose a specific language */
languageSelect.addEventListener("input", checkSelected);
checkSelected();
function checkSelected() {
  if (languageSelect.value) {
    searchBtn.disabled = false;
  } else {
    searchBtn.disabled = true;
  }
}
/* end of handling the case if user does not chose a specific language */

// Function to fetch random repository
function loadingState() {
  //loading state
  result.classList.remove("success-result");
  currentState.textContent = "Loading State";
  result.innerHTML = `<p class="loading">Loading...</p>`;
  searchBtn.disabled = true;
}
async function fetchRandomRepo(language) {
  loadingState();

  const apiUrl = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=100`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching repositories");
    }

    const data = await response.json();
    if (data.items.length === 0) {
      throw new Error("No repositories found for the selected language.");
    }

    // Select a random repository
    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
    displayRepoDetails(randomRepo);
  } catch (error) {
    // current state
    currentState.textContent = "Error State";

    //change css button to error
    searchBtn.textContent = "Click to retry";
    searchBtn.classList.add("error-btn");

    // change result to error
    result.innerHTML = `<p class="error-result">${error.message}</p>`;
    searchBtn.classList.remove("success-btn");
  } finally {
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", () => {
  fetchRandomRepo(languageSelect.value);
});

function displayRepoDetails(repo) {
  // change current state to success
  currentState.textContent = "Success";

  //change result to success
  result.classList.add("success-result");
  result.innerHTML = `
    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
    <p>${repo.description || "No description available"}</p>
    <ul>
      <li>⭐ Stars: ${repo.stargazers_count}</li>
      <li>🍴 Forks: ${repo.forks_count}</li>
      <li>🐛 Open Issues: ${repo.open_issues_count}</li>
    </ul>
  `;

  //change css button to success
  searchBtn.classList.remove("error-btn");
  searchBtn.classList.add("success-btn");
  searchBtn.textContent = "Refresh";
}
