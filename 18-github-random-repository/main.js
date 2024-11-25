const searchBtn = document.querySelector(".search-btn");
const languageSelect = document.querySelector(".languages-select");
const result = document.querySelector(".result");
const currentState = document.querySelector(".current-state");

// create status messages to handle error status
const statusMessages = {
  400: "Bad Request - The server couldn't understand your request.",
  401: "Unauthorized - Please check your credentials.",
  403: "Forbidden - You don't have permission to access this resource.",
  404: "Not Found - The requested resource was not found.",
  422: "Unprocessable Entity - The input data is invalid.",
  500: "Internal Server Error - Something went wrong on the server.",
  502: "Bad Gateway - The server is unavailable at the moment.",
  503: "Service Unavailable - The server is temporarily down.",
};

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
      const customMessage = statusMessages[response.status];
      throw new Error(`Error: ${response.status} ${customMessage}`);
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
    searchBtn.classList.remove("success-btn");
    // change result to error
    result.classList.add("error-result");
    result.innerHTML = `<p>${error.message}</p>`;
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
