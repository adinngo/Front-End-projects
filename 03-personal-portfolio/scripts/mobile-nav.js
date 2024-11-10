const navBtn = document.querySelector(".header__bars ");
const mobileNav = document.querySelector(".mobile-nav");
let isMobileNavOpen = false;
navBtn.addEventListener("click", () => {
  if (isMobileNavOpen) {
    mobileNav.style.display = "none";
    isMobileNavOpen = false;
  } else {
    mobileNav.style.display = "flex";
    document.body.style.overflowY = "hidden";
    isMobileNavOpen = true;
  }
});
