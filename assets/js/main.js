/**
 * THE SPOTLIGHT COMEDY ACADEMY
 * Main Interactive Engine: Stage Lighting, Navigation, Theming & Validation
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Authentication & Session State Simulation
     ------------------------------------------------------------------------ */
  const AUTH_KEY = 'theatre_student_session';

  function isStudentLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  function setStudentLoginState(loggedIn, studentName = 'Alex Rivera') {
    if (loggedIn) {
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem('theatre_student_name', studentName);
    } else {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem('theatre_student_name');
    }
    updateNavAuthUI();
  }

  function updateNavAuthUI() {
    const loginBtns = document.querySelectorAll('.nav-login-btn');
    const dashboardBtns = document.querySelectorAll('.nav-dashboard-btn');
    const isInsidePages = window.location.pathname.includes('/pages/');

    loginBtns.forEach(btn => {
      btn.textContent = 'Login';
      const targetHref = isInsidePages ? 'login.html' : 'pages/login.html';
      btn.setAttribute('href', targetHref);
      btn.onclick = null;
    });

    dashboardBtns.forEach(btn => {
      btn.classList.remove('disabled');
      btn.removeAttribute('aria-disabled');
      const targetHref = isInsidePages ? 'dashboard.html' : 'pages/dashboard.html';
      btn.setAttribute('href', targetHref);
      btn.title = 'Student Dashboard';
      btn.onclick = null;
    });
  }

  /* ------------------------------------------------------------------------
     2. Dark / Light Mode Engine with System Auto-Detection
     ------------------------------------------------------------------------ */
  const THEME_KEY = 'theatre_theme_mode';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(activeTheme);

    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || (document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
    }
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
      if (theme === 'dark') {
        // Sun icon for dark mode (click to toggle light)
        icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      } else {
        // Moon icon for light mode (click to toggle dark)
        icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. RTL Mirrored Layout Engine
     ------------------------------------------------------------------------ */
  const RTL_KEY = 'theatre_layout_dir';

  function initRTL() {
    const savedDir = localStorage.getItem(RTL_KEY) || 'ltr';
    applyRTL(savedDir);

    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyRTL(nextDir);
        localStorage.setItem(RTL_KEY, nextDir);
      });
    });
  }

  function applyRTL(dir) {
    document.documentElement.setAttribute('dir', dir);
    const rtlLink = document.getElementById('rtl-stylesheet');
    if (rtlLink) {
      rtlLink.disabled = (dir !== 'rtl');
    }
  }

  /* ------------------------------------------------------------------------
     4. Navigation & Mobile Drawer
     ------------------------------------------------------------------------ */
  function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const siteHeader = document.querySelector('.site-header');

    function closeMobileMenu() {
      if (siteNav && siteNav.classList.contains('mobile-open')) {
        siteNav.classList.remove('mobile-open');
        if (menuToggle) {
          menuToggle.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('menu-open');
        if (siteHeader) siteHeader.classList.remove('menu-active');
      }
    }

    if (menuToggle && siteNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('mobile-open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('menu-open', isOpen);
        if (siteHeader) {
          siteHeader.classList.toggle('menu-active', isOpen);
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!siteNav.contains(e.target) && !menuToggle.contains(e.target) && siteNav.classList.contains('mobile-open')) {
          closeMobileMenu();
        }
      });

      // Close when clicking any link inside siteNav
      siteNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close on Escape key press
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeMobileMenu();
        }
      });
    }

    // Detect iPad Pro and tablet touch environments to activate hamburger menu identically to Tab view
    function updateIPadProState() {
      const isIPad = (
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
        /iPad|iPadOS/i.test(navigator.userAgent) ||
        (window.matchMedia('(hover: none) and (pointer: coarse)').matches && window.innerWidth >= 768 && window.innerWidth <= 1366)
      );

      if (isIPad) {
        document.documentElement.classList.add('is-ipad-pro');
      } else {
        document.documentElement.classList.remove('is-ipad-pro');
      }
    }
    updateIPadProState();
    window.addEventListener('resize', updateIPadProState);
    window.addEventListener('orientationchange', updateIPadProState);

    // Auto-close menu if resizing into desktop web view
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && !document.documentElement.classList.contains('is-ipad-pro')) {
        closeMobileMenu();
      }
    });

    // Mark current active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. 3D Animated Theatrical Stage Canvas (Spotlight Beams & Stage Dust)
     ------------------------------------------------------------------------ */
  function initStageCanvas() {
    const canvasContainers = document.querySelectorAll('.stage-canvas-container');
    if (!canvasContainers.length) return;

    canvasContainers.forEach(container => {
      const canvas = container.querySelector('.stage-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width, height;
      let particles = [];
      const particleCount = window.innerWidth < 640 ? 15 : 45; // reduced on mobile per spec

      function resize() {
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      // Create ambient stage dust motes
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.8,
          speedY: Math.random() * 0.4 + 0.1,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.6 + 0.2
        });
      }

      let angle = 0;

      function render() {
        ctx.clearRect(0, 0, width, height);

        // Sweeping Spotlight Beams
        angle += 0.008;
        const beamCenter1 = width * 0.5 + Math.sin(angle) * (width * 0.25);
        const beamCenter2 = width * 0.5 + Math.cos(angle * 0.8) * (width * 0.3);

        // Spotlight 1: Warm Marquee Gold
        const grad1 = ctx.createRadialGradient(width * 0.2, 0, 50, beamCenter1, height * 0.85, 450);
        grad1.addColorStop(0, 'rgba(245, 183, 0, 0.22)');
        grad1.addColorStop(0.5, 'rgba(245, 183, 0, 0.08)');
        grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.moveTo(width * 0.2, 0);
        ctx.lineTo(beamCenter1 - 180, height);
        ctx.lineTo(beamCenter1 + 180, height);
        ctx.closePath();
        ctx.fill();

        // Spotlight 2: Theatrical Crimson Hue
        const grad2 = ctx.createRadialGradient(width * 0.8, 0, 50, beamCenter2, height * 0.85, 450);
        grad2.addColorStop(0, 'rgba(196, 30, 58, 0.20)');
        grad2.addColorStop(0.5, 'rgba(196, 30, 58, 0.06)');
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.moveTo(width * 0.8, 0);
        ctx.lineTo(beamCenter2 - 160, height);
        ctx.lineTo(beamCenter2 + 160, height);
        ctx.closePath();
        ctx.fill();

        // Stage dust motes
        ctx.fillStyle = 'rgba(245, 183, 0, 0.65)';
        particles.forEach(p => {
          p.y -= p.speedY;
          p.x += p.speedX;
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 183, 0, ${p.opacity})`;
          ctx.fill();
        });

        requestAnimationFrame(render);
      }
      render();
    });
  }

  /* ------------------------------------------------------------------------
     6. Client-Side Form Validation (Contact & Lead Forms)
     ------------------------------------------------------------------------ */
  function initForms() {
    const contactForm = document.getElementById('theatreContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameField = contactForm.querySelector('[name="name"]');
        const emailField = contactForm.querySelector('[name="email"]');
        const messageField = contactForm.querySelector('[name="message"]');

        // Name check
        if (nameField) {
          if (!nameField.value.trim()) {
            setFieldValidity(nameField, false, 'The spotlight needs a name! Please enter your name.');
            isValid = false;
          } else {
            setFieldValidity(nameField, true);
          }
        }

        // Email check
        if (emailField) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
            setFieldValidity(emailField, false, 'We need a real email so the Box Office can reach you!');
            isValid = false;
          } else {
            setFieldValidity(emailField, true);
          }
        }

        // Message check
        if (messageField) {
          if (!messageField.value.trim() || messageField.value.trim().length < 10) {
            setFieldValidity(messageField, false, 'Give us a bit more comedy to work with (at least 10 characters).');
            isValid = false;
          } else {
            setFieldValidity(messageField, true);
          }
        }

        if (isValid) {
          contactForm.reset();
        }
      });

      // Clear validation state on input
      contactForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            setFieldValidity(input, true);
          }
        });
      });
    }

    // Newsletter Quick Signup
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.includes('@')) {
          form.reset();
        }
      });
    });
  }

  function setFieldValidity(field, valid, errorMessage = '') {
    const errorEl = field.parentElement.querySelector('.form-error');
    if (!valid) {
      field.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = errorMessage;
    } else {
      field.classList.remove('is-invalid');
      if (errorEl) errorEl.textContent = '';
    }
  }

  /* ------------------------------------------------------------------------
     7. Toast Notification Utility
     ------------------------------------------------------------------------ */
  function showTheatricalToast(message) {
    // Disabled per user request - popup messages removed
    return;
  }

  /* ------------------------------------------------------------------------
     8. FAQ Accordion
     ------------------------------------------------------------------------ */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     9. Interactive "Pick Your Improv Style" Widget (Home 2)
     ------------------------------------------------------------------------ */
  function initPathSelectorWidget() {
    const tabs = document.querySelectorAll('.path-tab-btn');
    const panels = document.querySelectorAll('.path-content-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. Scroll Up (Back to Top) Button
     ------------------------------------------------------------------------ */
  function initScrollToTop() {
    let scrollBtn = document.getElementById('scrollToTopBtn');

    if (!scrollBtn) {
      scrollBtn = document.createElement('button');
      scrollBtn.id = 'scrollToTopBtn';
      scrollBtn.className = 'scroll-top-btn';
      scrollBtn.setAttribute('type', 'button');
      scrollBtn.setAttribute('aria-label', 'Scroll back to top');
      scrollBtn.setAttribute('title', 'Back to top');
      scrollBtn.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      `;
      document.body.appendChild(scrollBtn);
    }

    const toggleScrollBtn = () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    toggleScrollBtn();

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     Initialization
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavigation();
    initStageCanvas();
    initForms();
    initFAQ();
    initPathSelectorWidget();
    initScrollToTop();
    updateNavAuthUI();
  });

  // Global window helpers for inline demo triggers
  window.theatreAuth = {
    isLoggedIn: isStudentLoggedIn,
    login: (name) => setStudentLoginState(true, name),
    logout: () => setStudentLoginState(false),
    toast: showTheatricalToast
  };
})();
