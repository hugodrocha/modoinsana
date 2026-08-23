const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const rail = document.querySelector(".video-rail");

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

if (rail) {
  let direction = 1;
  setInterval(() => {
    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 0) {
      return;
    }
    if (rail.scrollLeft >= max - 4) {
      direction = -1;
    }
    if (rail.scrollLeft <= 4) {
      direction = 1;
    }
    rail.scrollBy({ left: 280 * direction, behavior: "smooth" });
  }, 4200);
}
