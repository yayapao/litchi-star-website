const root = document.documentElement;
const year = document.querySelector("#year");
const identity = document.querySelector("[data-tilt]");
const plate = identity?.querySelector(".logo-plate");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mx", `${event.clientX}px`);
  root.style.setProperty("--my", `${event.clientY}px`);
}, { passive: true });

if (identity && plate && window.matchMedia("(pointer: fine)").matches) {
  identity.addEventListener("pointermove", (event) => {
    const bounds = identity.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    plate.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(8px)`;
  });

  identity.addEventListener("pointerleave", () => {
    plate.style.transform = "";
  });
}

if (identity && "IntersectionObserver" in window) {
  root.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  observer.observe(identity);
}
