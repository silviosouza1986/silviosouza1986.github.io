(() => {
  'use strict';

  // Marca que o JS carregou — habilita o reveal apenas neste caso (RF-07 / PORT-006)
  document.documentElement.classList.add('js');

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ========================
  // STORAGE SEGURO (PORT-002)
  // Fallback em memória quando localStorage está indisponível/bloqueado.
  // ========================
  const memoryStore = new Map();
  const storageAvailable = (() => {
    try {
      const probeKey = '__portfolio_probe__';
      window.localStorage.setItem(probeKey, '1');
      window.localStorage.removeItem(probeKey);
      return true;
    } catch (e) {
      return false;
    }
  })();

  function getStoredValue(key, allowedValues, fallback) {
    try {
      const raw = storageAvailable ? window.localStorage.getItem(key) : memoryStore.get(key);
      return allowedValues.includes(raw) ? raw : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStoredValue(key, value) {
    try {
      if (storageAvailable) {
        window.localStorage.setItem(key, value);
      } else {
        memoryStore.set(key, value);
      }
    } catch (e) {
      memoryStore.set(key, value);
    }
  }

  // ========================
  // i18n — LANGUAGE
  // ========================
  const LANG_KEY = 'portfolio-lang';
  const LANGS = ['pt', 'en'];

  function detectLanguage() {
    const saved = getStoredValue(LANG_KEY, LANGS, null);
    if (saved) return saved;
    const lang = navigator.language || navigator.userLanguage || '';
    const isPt = lang.toLowerCase().startsWith('pt');
    return isPt ? 'pt' : 'en';
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    setStoredValue(LANG_KEY, lang);

    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    $$('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    const langBtn = $('#langToggle span');
    if (langBtn) {
      langBtn.textContent = translations[lang]['lang.code'];
    }

    document.title = lang === 'pt' ? 'Silvio | Portfólio' : 'Silvio | Portfolio';
  }

  let currentLang = detectLanguage();
  applyLanguage(currentLang);

  const langToggle = $('#langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      applyLanguage(currentLang);
    });
  }

  // ========================
  // MOBILE MENU (PORT-003)
  // ========================
  const menuBtn = $('#menuBtn');
  const navLinks = $('#navLinks');
  const overlay = $('#mobileOverlay');

  if (menuBtn && navLinks) {
    menuBtn.setAttribute('aria-controls', 'navLinks');

    let menuOpen = false;

    function openMenu() {
      if (menuOpen) return;
      menuOpen = true;
      navLinks.classList.add('open');
      navLinks.setAttribute('aria-hidden', 'false');
      if (overlay) overlay.classList.add('visible');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu({ returnFocus = false } = {}) {
      if (!menuOpen) return;
      menuOpen = false;
      navLinks.classList.remove('open');
      navLinks.setAttribute('aria-hidden', 'true');
      if (overlay) overlay.classList.remove('visible');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (returnFocus) menuBtn.focus();
    }

    navLinks.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');

    menuBtn.addEventListener('click', () => {
      menuOpen ? closeMenu({ returnFocus: true }) : openMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', () => closeMenu({ returnFocus: true }));
    }

    $$('.navbar__links a').forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu({ returnFocus: true });
      }
    });
  }

  // ========================
  // THEME TOGGLE
  // ========================
  const themeToggle = $('#themeToggle');
  const STORAGE_KEY = 'portfolio-theme';
  const THEMES = ['dark', 'light'];

  function getPreferredTheme() {
    const saved = getStoredValue(STORAGE_KEY, THEMES, null);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredValue(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`;
    } else {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>`;
    }
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  if (themeToggle) {
    applyTheme(getPreferredTheme());
  }

  // ========================
  // SCROLL ANIMATIONS
  // ========================
  const reveals = $$('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // ========================
  // ACTIVE NAV LINK
  // ========================
  const sections = $$('section[id]');
  const navAnchors = $$('.navbar__links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  updateActiveNav();
})();
