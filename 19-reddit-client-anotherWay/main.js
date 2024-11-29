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

// handle the case user doesn't input name when reload the page
checkFilled();
function checkFilled() {
  if (subredditNameInput.value) {
    addSubredditBtn.disabled = false;
  } else {
    addSubredditBtn.disabled = true;
  }
}
// handle the case user doesn't input name
subredditNameInput.addEventListener("input", checkFilled);

// save data
let subredditList = [];

async function fetchSubReddit(subredditName) {
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

async function addSubReddit(subredditName) {
  // Sanitize subreddit name
  const sanitizedSubRedditName = subredditName.toLowerCase().trim().replace(/\s+/g, "");

  console.log(sanitizedSubRedditName);

  // Create loading state
  const subreddit = document.createElement("div");
  subreddit.className = "subreddit";
  subreddit.innerHTML = `
    <h2 class="subreddit-name">${sanitizedSubRedditName}</h2>
    <p class="loading">Loading...</p>;
  `;
  subRedditsContainer.appendChild(subreddit);

  let postsFetched = [];

  try {
    postsFetched = await fetchSubReddit(sanitizedSubRedditName);
    subredditList.push({
      subredditTitle: sanitizedSubRedditName,
      errorStatus: "",
      posts: postsFetched,
    });
  } catch (error) {
    subredditList.push({
      subredditTitle: sanitizedSubRedditName,
      errorStatus: error.message,
      posts: [],
    });
  }
  saveToLocal();
  renderSubRedditList();
}

function renderSubRedditList() {
  console.log(subredditList);

  let subredditListHTML = "";
  subredditList.forEach((subreddit) => {
    subredditListHTML += `
    <div class="subreddit">

      <!-- heading part -->
      <div class="subreddit-heading">

        <h2 class="subreddit-name">
        <a href="https://www.reddit.com/r/${subreddit.subredditTitle}"target="_blank">r/${
      subreddit.subredditTitle
    }</a></h2>

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

      <p class="error">${subreddit.errorStatus}</p>

      <!-- posts part -->

      <div class="subreddit-posts">
          ${renderSubRedditPosts(subreddit.posts)}
      </div>

    </div>
    `;
  });
  subRedditsContainer.innerHTML = subredditListHTML;

  document.querySelectorAll(".subreddit").forEach((subreddit, index) => {
    const settingButton = subreddit.querySelector(".setting-btn");
    const settingSection = subreddit.querySelector(".setting-section");
    const deleteButton = subreddit.querySelector(".delete-btn");
    const refreshButton = subreddit.querySelector(".refresh-btn");

    settingButton.addEventListener("click", () => {
      settingSection.classList.toggle("setting-section-appearance");
      subreddit.querySelector(".subreddit-posts").classList.toggle("subreddit-posts-opacity");
    });

    deleteButton.addEventListener("click", () => {
      subredditList.splice(index, 1);
      saveToLocal();
      renderSubRedditList();
    });

    refreshButton.addEventListener("click", async () => {
      subreddit.innerHTML = `
        <h2 class="subreddit-name">${subredditList[index].subredditTitle}</h2>
        <p class="loading">Loading...</p>;
      `;

      let postsFetched = [];

      try {
        postsFetched = await fetchSubReddit(subredditList[index].subredditTitle);
    
        subredditList[index].posts = postsFetched;           
      } catch (error) {
     
        subredditList[index].errorStatus = error.message; 
      }
      renderSubRedditList();
    });
  });
}
function renderSubRedditPosts(posts) {
  let postsHTML = "";
  posts.forEach((post) => {
    postsHTML += `
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
  });
  return postsHTML;
}

addSubredditBtn.addEventListener("click", async () => {
  const subRedditName = subredditNameInput.value;
  subredditNameInput.value = "";

  // handle the case user doesn't input name when clicking button
  checkFilled();

  for (const subreddit of subredditList) {
    if (subreddit.subredditTitle === subRedditName) {
      alert(`You already search ${subRedditName}`);
      return;
    }
  }
  await addSubReddit(subRedditName);
});

function saveToLocal() {
  localStorage.setItem("subredditList", JSON.stringify(subredditList));
}
function refreshSubRedditList() {
  subredditList = [];

  const storedList = JSON.parse(localStorage.getItem("subredditList")) || [];

  storedList.forEach(async (item) => {
    await addSubReddit(item.subredditTitle);
  });
}

refreshSubRedditList();
