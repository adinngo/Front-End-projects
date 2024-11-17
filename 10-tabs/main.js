const contents = ["Try to be useful", "Never give up", "Better every day", "Thank you", ""];

document.querySelectorAll("button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.querySelector(".content").textContent = `${contents[index]}`;
  });
});
