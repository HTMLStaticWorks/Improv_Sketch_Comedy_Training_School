/**
 * THE SETUP - IMPROV & SKETCH COMEDY TRAINING SCHOOL
 * 3D Spotlight Tilt Cards Engine
 * Section 2 & Section 6 Implementation
 */

(function () {
  'use strict';

  // Check if device supports fine hover / non-touch to avoid lag on mobile
  const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 640;

  function initTiltCards() {
    const cards = document.querySelectorAll('.theatre-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      // Skip if already initialized
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = 'true';

      let bounds;
      let isHovering = false;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      function handlePointerEnter() {
        if (isTouchDevice()) return;
        updateBounds();
        isHovering = true;
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease, border-color 0.2s ease';
      }

      function handlePointerMove(e) {
        if (!isHovering || isTouchDevice()) return;
        
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        // Calculate normalized coordinate (-1 to 1)
        const xPct = (mouseX / bounds.width - 0.5) * 2;
        const yPct = (mouseY / bounds.height - 0.5) * 2;

        // Max tilt rotation degrees (subtle yet noticeable theatrical card elevation)
        const maxRotation = 12;
        const rotateX = -yPct * maxRotation;
        const rotateY = xPct * maxRotation;

        // Spotlight glow position for CSS radial-gradient
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);

        // Apply 3D perspective transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
      }

      function handlePointerLeave() {
        if (isTouchDevice()) return;
        isHovering = false;
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
      }

      card.addEventListener('pointerenter', handlePointerEnter);
      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);
    });
  }

  // Scroll reveal entrance animation for all cards
  function initCardScrollReveal() {
    const cards = document.querySelectorAll('.theatre-card, .step-card, .testimonial-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Staggered theatrical entrance delay
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (idx % 4) * 100);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
      card.classList.add('fade-in-up');
      observer.observe(card);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTiltCards();
    initCardScrollReveal();
  });

  // Re-run on window resize if crossing touch/desktop boundaries
  window.addEventListener('resize', () => {
    if (window.innerWidth < 640) {
      document.querySelectorAll('.theatre-card').forEach(card => {
        card.style.transform = 'none';
      });
    }
  });

  window.theatreTilt = {
    init: initTiltCards,
    refresh: initTiltCards
  };
})();
