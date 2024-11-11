const openNavBtn = document.querySelector(".header__bars ");
const closeNavBtn = document.querySelector(".header__close ");
const mobileNav = document.querySelector(".mobile-nav");
let isMobileNavOpen = false;
openNavBtn.addEventListener("click", () => {
  openNavBtn.style.display = "none";

  closeNavBtn.style.display = "block";

  mobileNav.style.display = "flex";

  document.body.style.overflowY = "hidden";

  isMobileNavOpen = false;
});
closeNavBtn.addEventListener("click", () => {

  openNavBtn.style.display = "block";

  closeNavBtn.style.display = "none";

  mobileNav.style.display = "none";

  document.body.style.overflowY = "scroll";

  isMobileNavOpen = true;
});
