const settingBtn = document.querySelector(".setting-btn");
const subredditNameInput = document.querySelector(".subreddit-name-input");
const addSubredditBtn = document.querySelector(".add-subreddit-btn");


settingBtn.addEventListener("click", () => {
  document.querySelector(".setting-section ").classList.toggle("setting-section-appearance");
  document.querySelector(".subreddit-posts").classList.toggle("subreddit-posts-opacity");
});


checkFilled();
function checkFilled() {
  if (subredditNameInput.value) {
    addSubredditBtn.disabled = false;
  } else {
    addSubredditBtn.disabled = true;
  }
}

subredditNameInput.addEventListener("input", checkFilled);
