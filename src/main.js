// ─────────────────────────────────────────
// NAVBAR — scroll behavior + mobile menu
// ─────────────────────────────────────────

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("navbar-scrolled", window.scrollY > 40);
});

const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
let open = false;

btn.addEventListener("click", () => {
  open = !open;
  menu.classList.toggle("is-open", open);
  bar1.style.transform = open ? "translateY(6px) rotate(45deg)" : "";
  bar2.style.opacity = open ? "0" : "1";
  bar3.style.transform = open
    ? "translateY(-6px) rotate(-45deg) scaleX(1.5)"
    : "";
});

menu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    open = false;
    menu.classList.remove("is-open");
    bar1.style.transform = "";
    bar2.style.opacity = "1";
    bar3.style.transform = "";
  });
});

// ─────────────────────────────────────────
// GALERÍA — lightbox
// ─────────────────────────────────────────

(function () {
  const grid = document.getElementById("galeriaGrid");
  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightboxContent");
  const counter = document.getElementById("lightboxCounter");
  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");

  if (!grid || !lightbox) return;

  const items = Array.from(grid.querySelectorAll(".galeria-item"));
  let current = 0;

  function getMediaForIndex(index) {
    const item = items[index];
    const img = item.querySelector("img");
    const bg = item.style.backgroundImage;

    if (img) return `<img src="${img.src}" alt="Galería ${index + 1}">`;
    if (bg && bg !== "none") {
      const url = bg.replace(/url\(["']?/, "").replace(/["']?\)$/, "");
      return `<img src="${url}" alt="Galería ${index + 1}">`;
    }

    return `
      <div class="lightbox-placeholder">
        <span class="lb-icon">✂</span>
        <span class="lb-label">Foto próximamente</span>
      </div>`;
  }

  function showLightbox(index) {
    current = index;
    content.innerHTML = getMediaForIndex(current);
    counter.textContent = `${current + 1} / ${items.length}`;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      content.innerHTML = "";
    }, 300);
  }

  function navigate(dir) {
    current = (current + dir + items.length) % items.length;
    content.innerHTML = getMediaForIndex(current);
    counter.textContent = `${current + 1} / ${items.length}`;
  }

  items.forEach((item) => {
    item.addEventListener("click", () =>
      showLightbox(parseInt(item.dataset.index, 10)),
    );
  });

  btnClose.addEventListener("click", closeLightbox);
  btnPrev.addEventListener("click", () => navigate(-1));
  btnNext.addEventListener("click", () => navigate(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
})();
