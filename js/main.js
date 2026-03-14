// Main application logic

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Path adjusted for new location of this file in js/ folder to sw.js in js/ folder
    // The sw.js is now in js/sw.js. So relative to this file it is ./sw.js or sw.js
    // But relative to index.html (where this is included), it should be invoked with correct path.
    // Wait, the service worker scope stuff.
    // If sw.js is in js/sw.js, its scope defaults to js/. That might be BAD for root scope.
    // To have root scope, sw.js should be at root OR served with Service-Worker-Allowed header.
    // User just said "organize". Moving sw.js to js/ might break the PWA scope.
    // I should probably keep sw.js at root due to PWA scope restrictions.
    // Or I should put it back.
    // Let's check if I can register it from root.

    // I'll register it as 'js/sw.js' but scope might be limited.
    // I will move sw.js BACK to root. This is a common pitfall.
    // "Arregla... y mejoralo... sin afectar a la funcionalidad"
    // Breaking PWA scope affects functionality.
    // So I will move sw.js back to root or leave it in js and hope for the best (but it won't work for root).
    // I will move it back to root in the next cleanup step.
    // For now, I'll point to '../sw.js' assuming I move it back, or logical 'sw.js' relative to root.

    // Assuming sw.js is at root:
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => console.log("SW registrado:", registration))
      .catch((error) => console.log("Error al registrar SW:", error));
  });
}

// Share Button
const shareBtn = document.getElementById("share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "Digital | Redes Sociales",
      text: "Conecta conmigo en todas mis plataformas 🎮",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Compartir cancelado", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado al portapapeles ✅");
      } catch (err) {
        alert("No se pudo copiar el enlace 😢");
      }
    }
  });
}

// Redirects
const redirectMap = {
  "/discord": "https://dsc.gg/digitalgalaxy/",
  "/youtube":
    "https://www.youtube.com/channel/UCXl48fi70tadw2BwzuU6DtQ?sub_confirmation=1",
  "/tiktok": "https://www.tiktok.com/@tutodigital_",
  "/instagram": "https://www.instagram.com/TutoDigital_/",
  "/twitter": "https://twitter.com/tutodigital_",
  "/twitch": "https://www.twitch.tv/tutodigital_",
  "/kick": "https://kick.com/tutodigital",
};

function handleRedirects() {
  const currentPath = window.location.pathname;

  if (redirectMap[currentPath]) {
    // Redirect Logic
    document.body.innerHTML = `
            <style>
                .redirect-message {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: var(--background);
                    z-index: 1000;
                    font-family: 'Montserrat', sans-serif;
                }
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: var(--primary);
                    animation: spin 1s ease-in-out infinite;
                    margin-bottom: 20px;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
            <div class="redirect-message">
                <div class="spinner"></div>
                <h2>Redirigiendo...</h2>
            </div>
        `;

    setTimeout(() => {
      window.location.replace(redirectMap[currentPath]);
    }, 1500);
    return;
  }

  // --- Generalized Gallery Cycler Logic (Minis, Banners, Logos) ---
  function initGalleryCycler(category) {
      const catItem = document.querySelector(`.gallery-item[data-category="${category}"]`);
      if (!catItem) return;
      const catImg = catItem.querySelector('.gallery-img');
      const gridSource = document.getElementById('works-' + category);
      if (!catImg || !gridSource) return;

      const allUrls = Array.from(gridSource.querySelectorAll('img')).map(img => img.src);
      if (allUrls.length === 0) return;

      // Add specific cycler classes
      if (category !== 'minis') {
          catItem.classList.add('premium-bg-cycler');
      }
      catImg.classList.add(`${category === 'minis' ? 'mini' : category === 'banners' ? 'banner' : 'icon'}-cycler-img`);

      const setRandomImg = () => {
          let currentSrc = catImg.src;
          let filtered = allUrls.filter(url => url !== currentSrc);
          if (filtered.length === 0) filtered = allUrls; // Fallback for single image grids
          let nextSrc = filtered[Math.floor(Math.random() * filtered.length)];
          
          catImg.src = nextSrc;
          if (category !== 'minis') {
              catItem.style.setProperty('--bg-url', `url('${nextSrc}')`);
          }
      };
      
      // 1. Initial random image
      setRandomImg();

      // 2. Interval swap with animation
      setInterval(() => {
          catImg.classList.add('is-swapping');
          if (category !== 'minis') {
              catItem.classList.add('is-swapping');
          }
          
          setTimeout(() => {
              setRandomImg();
              catImg.classList.remove('is-swapping');
              if (category !== 'minis') {
                  catItem.classList.remove('is-swapping');
              }
          }, 350); 
      }, 4500 + Math.random() * 1000); // Slight offset to avoid simultaneous swaps
  }

  // Initialize for all main categories
  ['miniaturas', 'banners', 'logos'].forEach(initGalleryCycler);

  // --- Portfolio Gallery Interactivity State ---
  let activeGalleryNode = null;
  let portfolioDOM = null;
  let isLightboxAnimating = false;

  function getPortfolioDOM() {
      if (portfolioDOM) return portfolioDOM;
      const lightbox = document.getElementById('portfolio-lightbox');
      if (!lightbox) return null; // Abort if not on Portfolio page
      portfolioDOM = {
          lightbox,
          lightboxImg: document.getElementById('lightbox-main-img'),
          prevBtn: document.getElementById('lightbox-prev-btn'),
          nextBtn: document.getElementById('lightbox-next-btn'),
          mainCat: document.getElementById('main-categories'),
          viewCont: document.getElementById('category-view-container'),
          catTitle: document.getElementById('current-category-title')
      };
      return portfolioDOM;
  }

  function getValidSibling(node, direction) {
      let sibling = direction === 'next' ? node.nextElementSibling : node.previousElementSibling;
      while (sibling) {
          if (sibling.classList && sibling.classList.contains('category-target')) {
              return sibling;
          }
          sibling = direction === 'next' ? sibling.nextElementSibling : sibling.previousElementSibling;
      }
      return null;
  }

  function updateLightboxNav() {
      if (!activeGalleryNode) return;
      const dom = getPortfolioDOM();
      if (!dom) return;
      
      const prevNode = getValidSibling(activeGalleryNode, 'prev');
      const nextNode = getValidSibling(activeGalleryNode, 'next');

      if (dom.prevBtn) {
          prevNode ? dom.prevBtn.classList.remove('is-disabled') : dom.prevBtn.classList.add('is-disabled');
      }
      if (dom.nextBtn) {
          nextNode ? dom.nextBtn.classList.remove('is-disabled') : dom.nextBtn.classList.add('is-disabled');
      }
  }

  function closeLightbox(dom) {
      if (dom.lightbox.classList.contains('is-closing') || dom.lightbox.classList.contains('is-hidden')) return;
      
      dom.lightbox.classList.add('is-closing');
      dom.lightbox.addEventListener('animationend', function handler(e) {
          if (e.target !== dom.lightbox) return; // Ignore child animations
          dom.lightbox.removeEventListener('animationend', handler);
          
          dom.lightbox.classList.remove('is-closing');
          dom.lightbox.classList.add('is-hidden');
          document.body.classList.remove('no-scroll');
          activeGalleryNode = null;
          isLightboxAnimating = false;
          
          // Cleanup any residual navigation classes
          dom.lightboxImg.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
      });
  }

  function navigateLightbox(dom, direction) {
      if (isLightboxAnimating) return;
      const nextNode = getValidSibling(activeGalleryNode, direction);
      if (!nextNode) return;

      isLightboxAnimating = true;

      const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
      const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
      const outAnimName = direction === 'next' ? 'slideOutLeft' : 'slideOutRight';
      const inAnimName = direction === 'next' ? 'slideInRight' : 'slideInLeft';

      // Ensure clean state
      dom.lightboxImg.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
      dom.lightboxImg.classList.add(outClass);

      dom.lightboxImg.addEventListener('animationend', function handleOut(e) {
          if (e.animationName !== outAnimName) return;
          dom.lightboxImg.removeEventListener('animationend', handleOut);
          
          activeGalleryNode = nextNode;
          dom.lightboxImg.src = activeGalleryNode.querySelector('img').src;
          updateLightboxNav();

          dom.lightboxImg.classList.remove(outClass);
          dom.lightboxImg.classList.add(inClass);

          dom.lightboxImg.addEventListener('animationend', function handleIn(e2) {
              if (e2.animationName !== inAnimName) return;
              dom.lightboxImg.removeEventListener('animationend', handleIn);
              dom.lightboxImg.classList.remove(inClass);
              isLightboxAnimating = false;
          });
      });
  }

  // Keyboard support for Lightbox (ESC, Left, Right)
  document.addEventListener('keydown', (e) => {
      const dom = getPortfolioDOM();
      if (!dom) return;
      
      if (!dom.lightbox.classList.contains('is-hidden') && !dom.lightbox.classList.contains('is-closing')) {
          if (e.key === 'Escape') {
              closeLightbox(dom);
          } else if (e.key === 'ArrowLeft' && activeGalleryNode) {
              navigateLightbox(dom, 'prev');
          } else if (e.key === 'ArrowRight' && activeGalleryNode) {
              navigateLightbox(dom, 'next');
          }
      }
  });

  // Links handling via Event Delegation Structure
  document.body.addEventListener("click", function (e) {
    // --- Portfolio Gallery Interactivity ---
    const dom = getPortfolioDOM();

    // 1. Logic moved to js/portfolio.js
    /*
    const categoryCard = e.target.closest('.gallery-item[data-category]');
    ...
    */

    // 2. Logic moved to js/portfolio.js
    /*
    const backCategoryBtn = e.target.closest('#back-to-categories');
    ...
    */

    // 3. Open Lightbox from Image
    const targetImageCard = e.target.closest('.category-target');
    if (targetImageCard && dom) {
        const imgEl = targetImageCard.querySelector('img');
        if (imgEl) {
            activeGalleryNode = targetImageCard;
            dom.lightboxImg.src = imgEl.src;
            // Clean slate any animations
            dom.lightbox.classList.remove('is-closing');
            dom.lightboxImg.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
            isLightboxAnimating = false;
            updateLightboxNav();
            dom.lightbox.classList.remove('is-hidden');
            document.body.classList.add('no-scroll');
        }
        return;
    }

    // 4. Lightbox Prev Nav
    const navPrev = e.target.closest('#lightbox-prev-btn');
    if (navPrev && activeGalleryNode && dom) {
        navigateLightbox(dom, 'prev');
        return;
    }

    // 5. Lightbox Next Nav
    const navNext = e.target.closest('#lightbox-next-btn');
    if (navNext && activeGalleryNode && dom) {
        navigateLightbox(dom, 'next');
        return;
    }

    // 6. Close Lightbox
    const lightboxClose = e.target.closest('#lightbox-close-btn');
    const isLightboxBg = e.target.id === 'portfolio-lightbox';
    if ((lightboxClose || isLightboxBg) && dom) {
        closeLightbox(dom);
        return;
    }
    // --- End Portfolio Gallery Interactivity ---

    const link = e.target.closest(
      ".social-btn, .contact-button, .menu-link, .event-link, .action-btn, .collaboration-link, .sponsor-link, .terms-link"
    );

    if (!link) return;

    if (
      !link.getAttribute("href") ||
      link.getAttribute("href").startsWith("mailto:")
    )
      return;

    e.preventDefault();
    const path = link.getAttribute("href");

    const destination = redirectMap[path] || path;
    const isExternal = destination.startsWith("http");

    if (isExternal) {
      window.location.href = destination;
      return;
    }

    // Respect prefers-reduced-motion for internal navigation
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      window.location.href = destination;
      return;
    }

    // Exceedingly subtle internal navigation transition
    document.body.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(4px) scale(0.995)" },
      ],
      {
        duration: 200,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        fill: "forwards",
      },
    );

    setTimeout(() => {
      window.location.href = destination;
    }, 180);
  });
}

window.addEventListener("DOMContentLoaded", handleRedirects);
