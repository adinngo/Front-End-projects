const countText = document.querySelector(".count-text");
const MAX_LENGTH = 250;
const userMessage = document.querySelector(".user-message");
let cnt = 0;

userMessage.addEventListener("input", () => {
  cnt = userMessage.value.length;
  if( cnt > 255) {
    userMessage.style.border = "none";
    userMessage.style.outline = "2px solid red";
    userMessage.style.color = "red";
    document.querySelector(".length-message").style.color = "red";
    countText.textContent = cnt;
  } else {
    userMessage.style.outlineColor = "black";
    userMessage.style.color = "#757575";
    document.querySelector(".length-message").style.color = "black";
    countText.textContent = cnt;
  }
})