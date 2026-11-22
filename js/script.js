(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const year = document.querySelector("[data-year]");
  const dialog = document.querySelector("#lightbox");
  const lightboxImg = dialog.querySelector("[data-lightbox-img]");
  const lightboxCaption = dialog.querySelector("[data-lightbox-caption]");
  const lightboxCount = dialog.querySelector("[data-lightbox-count]");
  const shots = Array.from(document.querySelectorAll("[data-gallery] button"));
  const copyButton = document.querySelector("[data-copy]");
  const copyStatus = document.querySelector("#copy-status");

  let photoIndex = 0;
  let lastFocus = null;

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  toggle.addEventListener("click", function () {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });

  const sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });

    const spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + id;
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function showPhoto(index) {
    photoIndex = (index + shots.length) % shots.length;
    const button = shots[photoIndex];
    const image = button.querySelector("img");
    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt;
    lightboxImg.width = image.width || image.naturalWidth || 960;
    lightboxImg.height = image.height || image.naturalHeight || 1280;
    lightboxCaption.textContent = button.getAttribute("data-caption") || image.alt;
    lightboxCount.textContent = photoIndex + 1 + " / " + shots.length;
    if (!dialog.open) {
      lastFocus = document.activeElement;
      dialog.showModal();
    }
  }

  shots.forEach(function (button, index) {
    button.addEventListener("click", function () {
      showPhoto(index);
    });
  });

  dialog.querySelector("[data-lightbox-close]").addEventListener("click", function () {
    dialog.close();
  });

  dialog.querySelector("[data-lightbox-prev]").addEventListener("click", function () {
    showPhoto(photoIndex - 1);
  });

  dialog.querySelector("[data-lightbox-next]").addEventListener("click", function () {
    showPhoto(photoIndex + 1);
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      showPhoto(photoIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      showPhoto(photoIndex - 1);
    }
  });

  if (copyButton) {
    copyButton.addEventListener("click", async function () {
      const email = copyButton.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email copied.";
        copyButton.textContent = "Copied";
      } catch (error) {
        copyStatus.textContent = "Copy failed. The email is bpkakarla@gmail.com.";
      }
      window.setTimeout(function () {
        copyButton.textContent = "Copy email";
      }, 1800);
    });
  }
})();
