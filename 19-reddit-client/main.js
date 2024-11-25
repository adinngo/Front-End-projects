const subRedditsContainer = document.querySelector(".subreddits-container");
const subredditNameInput = document.querySelector(".subreddit-name-input");
const addSubredditBtn = document.querySelector(".add-subreddit-btn");

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

checkFilled();
function checkFilled() {
  if (subredditNameInput.value) {
    addSubredditBtn.disabled = false;
  } else {
    addSubredditBtn.disabled = true;
  }
}
subredditNameInput.addEventListener("input", checkFilled);



async function fetchSubReddit(subredditName) {
  // const loadingState = subredditElement.querySelector(".subreddit-loading-spinner");

  try {
    const response = await fetch(`https://www.reddit.com/r/${subredditName}.json`);
    if (!response.ok) {
      const customMessage = statusMessages[response.status];
      throw new Error(`${response.status} ${customMessage}`);
    }

    const data = await response.json();
    return data.data.children.map((post) => ({
      title: post.data.title,
      author: post.data.author,
      votes: post.data.ups,
      linkToPost: `https://www.reddit.com${post.data.permalink}`,
    }));
  } catch (error) {
    throw new Error(error.message);
  } 
  
}


addSubredditBtn.addEventListener("click", async () => {
  const subRedditName = subredditNameInput.value.trim().replace(/\s+/g, "");

  // Create loading state
  const subreddit = document.createElement("div");
  subreddit.className = "subreddit";
  subreddit.innerHTML = `
    <h2 class="subreddit-name">${subRedditName}</h2>
    <p class="loading">Loading...</p>`;
  subRedditsContainer.appendChild(subreddit);

  try {
    const posts = await fetchSubReddit(subRedditName);

    // display posts in lane
    subreddit.innerHTML = `
      <div class="subreddit-heading">
        <h2 class="subreddit-name">
        <a href="https://www.reddit.com/r/${subRedditName}"target="_blank">${subRedditName}</a></h2>
        <button class="setting-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>
        <div class="setting-section">
          <button class="refresh-btn btn">Refresh</button class="btn">
          <div class="border"></div>
          <button class="delete-btn btn">Delete</button class="btn">
        </div>
      </div>
    `;

    posts.forEach((post) => {
      const postsDiv = document.createElement("div");
      postsDiv.className = "subreddit-posts";
      postsDiv.innerHTML = `
         <div class="post">
          <div class="post-hover">
            <a href="${post.linkToPost}" target="_blank">
              <h3 class="post-title">${post.title}</h3>
              <p class="post-author">Author: ${post.author}</p>
              <p class="post-vote-counts">Votes: ${post.votes}</p>
            </a>
          </div>
      </div> 
      `;
      subreddit.appendChild(postsDiv);
    });
  } catch (error) {
    subreddit.innerHTML = `
     <div class="subreddit-heading">
        <h2 class="subreddit-name">
        <a href="https://www.reddit.com/r/${subRedditName}"target="_blank">${subRedditName}</a></h2>
        <button class="setting-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>
        <div class="setting-section">
          <button class="refresh-btn btn">Refresh</button class="btn">
          <div class="border"></div>
          <button class="delete-btn btn">Delete</button class="btn">
        </div>
      </div>
      <p class="error">Error: ${error.message}</p>

    `;
  }

  subredditNameInput.value = "";
 
});

