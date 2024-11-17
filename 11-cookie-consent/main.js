const closeBtn = document.querySelector(".close-btn");
const acceptBtn = document.querySelector(".accept-btn");
const cookieContainer = document.querySelector(".cookie-container");



if (localStorage.getItem("cookie") === null) {
  setTimeout(() => {
    cookieContainer.style.display = "flex";
  }, 4000);
}
acceptBtn.addEventListener("click", () => {
  cookieContainer.style.display = "none";
  localStorage.setItem("cookie", "yes");
});
closeBtn.addEventListener("click", () => (cookieContainer.style.display = "none"));
