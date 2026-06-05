const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

let activeIndex = 0;

function renderLightbox(index) {
  const img = galleryItems[index]?.querySelector("img");
  if (!img || !lightboxImage) {
    return;
  }

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  activeIndex = index;
}

function openLightbox(index) {
  if (!lightbox) {
    return;
  }

  renderLightbox(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function nextImage() {
  if (!galleryItems.length) {
    return;
  }

  const nextIndex = (activeIndex + 1) % galleryItems.length;
  renderLightbox(nextIndex);
}

function prevImage() {
  if (!galleryItems.length) {
    return;
  }

  const prevIndex = (activeIndex - 1 + galleryItems.length) % galleryItems.length;
  renderLightbox(prevIndex);
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

if (closeBtn) {
  closeBtn.addEventListener("click", closeLightbox);
}

if (nextBtn) {
  nextBtn.addEventListener("click", nextImage);
}

if (prevBtn) {
  prevBtn.addEventListener("click", prevImage);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    prevImage();
  }
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}
