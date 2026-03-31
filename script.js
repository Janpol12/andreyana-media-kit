/* ============================================
   ANDREYANA — Site Interactions & Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── PRELOADER ───
  (function () {
    const pl = document.getElementById('preloader');
    const body = document.body;

    // Lock scroll during preloader
    body.classList.add('pl-active');

    // Total show time: animations end ~2.1s, we add small buffer
    const SHOW_DURATION = 2200;

    function hidePreloader() {
      pl.classList.add('pl-hide');
      body.classList.remove('pl-active');

      // Remove from DOM after fade-out completes (0.9s)
      setTimeout(() => pl.classList.add('pl-done'), 950);
    }

    // Hide after SHOW_DURATION OR when page is fully loaded — whichever is later
    let timerDone = false;
    let loadDone = false;

    const tryHide = () => {
      if (timerDone && loadDone) hidePreloader();
    };

    setTimeout(() => { timerDone = true; tryHide(); }, SHOW_DURATION);
    // Force-hide after 3.5s max — large videos can delay window.load forever
    setTimeout(() => { timerDone = true; loadDone = true; hidePreloader(); }, 3500);

    if (document.readyState === 'complete') {
      loadDone = true;
    } else {
      window.addEventListener('load', () => { loadDone = true; tryHide(); }, { once: true });
    }
  })();

  // ─── SMOOTH SCROLL (LENIS) ───
  const lenis = window.lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
    lerp: 0.08, // Added lerp for softer feel
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ─── NAV SCROLL ───
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ─── REVEAL ON SCROLL (ROBUST SYSTEM) ───
  const triggerReveal = (el) => {
    if (!el.classList.contains('active')) {
      el.classList.add('active');
      if (typeof observer !== 'undefined') observer.unobserve(el);
    }
  };

  const observerOptions = {
    threshold: [0, 0.01],
    rootMargin: '10% 0px 20% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        triggerReveal(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('[class*="reveal"], .mask-reveal');
  revealElements.forEach(el => observer.observe(el));

  // Fallback 1: Force visible on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) triggerReveal(el);
      });
    }, 500);
  });

  // Fallback 2: Absolute safety timeout (2s)
  setTimeout(() => {
    revealElements.forEach(el => triggerReveal(el));
  }, 2500);

  // ─── PARALLAX SYNCED WITH LENIS ───
  const parallaxItems = Array.from(document.querySelectorAll('.parallax-bg')).map(el => ({
    el,
    parent: el.parentElement,
    speed: 0.12,
    top: 0,
    height: 0
  }));

  function cacheLayout() {
    parallaxItems.forEach(item => {
      const rect = item.parent.getBoundingClientRect();
      item.top = rect.top + window.scrollY;
      item.height = rect.height;
    });
  }

  window.addEventListener('resize', cacheLayout);
  cacheLayout();

  lenis.on('scroll', (e) => {
    const scrollY = e.scroll;
    const vh = window.innerHeight;

    parallaxItems.forEach(item => {
      const relativeY = scrollY - item.top;
      if (relativeY + vh > 0 && relativeY < item.height + vh) {
        const move = (vh / 2 - (relativeY + item.height / 2)) * 0.08;
        item.el.style.transform = `translate3d(0, ${move}px, 0) scale(1.1)`;
      }
    });
  });

  // ─── COUNTER ANIMATION ───
  (function () {
    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = target >= 50 ? 1800 : 1200;
      const start = performance.now();

      el.classList.add('counting');

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(easeOutExpo(progress) * target);

        el.textContent = value + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
          el.classList.remove('counting');
          el.dataset.done = 'true';
        }
      }
      requestAnimationFrame(tick);
    }

    function animateText(el) {
      const finalText = el.dataset.countText;
      const chars = ['—', '/', 'F', 'Fu', 'Ful', 'Full'];
      let i = 0;
      el.classList.add('counting');
      const iv = setInterval(() => {
        el.textContent = chars[i] || finalText;
        i++;
        if (i >= chars.length) {
          clearInterval(iv);
          el.textContent = finalText;
          el.classList.remove('counting');
          el.dataset.done = 'true';
        }
      }, 80);
    }

    const counters = document.querySelectorAll('[data-count], [data-count-text]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          const el = entry.target;
          if (el.dataset.count !== undefined) {
            animateCounter(el);
          } else {
            animateText(el);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => counterObserver.observe(el));
  })();

  // ─── BRAND DRAWER ───
  (function () {
    const BRAND_MEDIA = {
      hyundai: {
        label: 'Съёмки для Hyundai',
        items: [
          { type: 'video', src: 'images/hyundai.mp4', alt: 'Hyundai' },
          { type: 'photo', src: 'images/hyundai_still_01.webp', alt: 'Hyundai' },
          { type: 'photo', src: 'images/hyundai_still_03.webp', alt: 'Hyundai' },
          { type: 'photo', src: 'images/hyundai_still_04.webp', alt: 'Hyundai' },
          { type: 'photo', src: 'images/hyundai_still_05.webp', alt: 'Hyundai' },
          { type: 'photo', src: 'images/hyundai_still_06.webp', alt: 'Hyundai' },
        ]
      },
      landrover: {
        label: 'Съёмки для Odyssey',
        items: [
          { type: 'video', src: 'images/odyssey_film.mp4', alt: 'Odyssey', wide: true },
          { type: 'photo', src: 'images/odyssey_17.webp', alt: 'Odyssey' },
          { type: 'photo', src: 'images/odyssey_33.webp', alt: 'Odyssey' },
          { type: 'photo', src: 'images/odyssey_41.webp', alt: 'Odyssey' },
          { type: 'photo', src: 'images/odyssey_46.webp', alt: 'Odyssey' },
          { type: 'photo', src: 'images/odyssey_47.webp', alt: 'Odyssey' },
          { type: 'photo', src: 'images/odyssey_49.webp', alt: 'Odyssey' },
          { type: 'photo', src: 'images/odyssey_52.webp', alt: 'Odyssey' },
        ]
      },
      fourseasons: {
        label: 'Съёмки для Four Seasons',
        items: [
          { type: 'video', src: 'images/fourseasons.mp4', alt: 'Four Seasons', wide: true },
        ]
      },
      unicredit: {
        label: 'Съёмки для UniCredit Bank',
        items: [
          { type: 'video', src: 'images/unicredit_bank_2021.mp4', alt: 'UniCredit', wide: true },
          { type: 'photo', src: 'images/UC_1.14.1.webp', alt: 'UniCredit' },
          { type: 'photo', src: 'images/UC_1.28.1.webp', alt: 'UniCredit' },
          { type: 'photo', src: 'images/UC_1.55.1.webp', alt: 'UniCredit' },
          { type: 'photo', src: 'images/UC_1.73.1.webp', alt: 'UniCredit' },
          { type: 'photo', src: 'images/UC_1.30.1.webp', alt: 'UniCredit' },
        ]
      },
      yandex: {
        label: 'Съёмки для Mastercard',
        items: [
          { type: 'video', src: 'images/mastercard_visa.mp4', alt: 'Mastercard', wide: true },
        ]
      },
      ultima: {
        label: 'Съёмки для Bosch',
        items: [
          { type: 'video', src: 'images/YanaBosh.mp4', alt: 'Bosch', wide: true },
        ]
      }
    };

    const drawer = document.getElementById('brand-drawer');
    const strip = document.getElementById('bd-strip');
    const titleEl = document.getElementById('bd-title');
    const closeBtn = document.getElementById('bd-close');
    let activeCard = null;
    let activeKey = null;

    function buildStrip(key) {
      const data = BRAND_MEDIA[key];
      strip.innerHTML = '';
      if (!data || !data.items.length) {
        strip.innerHTML = '<p class="bd-empty">Медиа для этого бренда скоро появятся</p>';
        return;
      }
      titleEl.textContent = data.label;
      data.items.forEach((item, i) => {
        const el = document.createElement('div');
        if (item.type === 'photo') {
          el.className = 'bd-item bd-photo';
          el.style.opacity = '0';
          el.style.transform = 'translateY(16px)';
          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.alt;
          img.loading = 'lazy';
          el.appendChild(img);
          el.addEventListener('click', () => {
            const brandPhotos = data.items
              .filter(it => it.type === 'photo')
              .map(it => ({ src: it.src, alt: it.alt }));
            const photoIdx = brandPhotos.findIndex(it => it.src === item.src);
            if (window._lbOpenWith) window._lbOpenWith(brandPhotos, photoIdx);
          });
        } else {
          el.className = 'bd-item bd-video' + (item.wide ? ' bd-video--wide' : '');
          el.style.opacity = '0';
          el.style.transform = 'translateY(16px)';
          const vid = document.createElement('video');
          vid.src = item.src + '#t=0.001';
          vid.preload = 'metadata';
          vid.playsInline = true;
          vid.controls = true;
          el.appendChild(vid);
          const playIcon = document.createElement('div');
          playIcon.className = 'bd-play-icon';
          playIcon.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="white" stroke-opacity="0.7" stroke-width="1.5"/>
              <polygon points="15,12 26,18 15,24" fill="white" fill-opacity="0.9"/>
            </svg>`;
          el.appendChild(playIcon);
          vid.addEventListener('play', () => { playIcon.style.display = 'none'; });
        }
        strip.appendChild(el);
        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 80 + i * 60);
      });
    }

    function openDrawer(key, cardEl) {
      if (activeKey === key && drawer.classList.contains('bd-open')) {
        closeDrawer();
        return;
      }
      if (activeCard) activeCard.classList.remove('bd-active');
      activeCard = cardEl;
      activeCard.classList.add('bd-active');
      activeKey = key;
      buildStrip(key);
      drawer.classList.add('bd-open');
      setTimeout(() => {
        drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }

    function closeDrawer() {
      drawer.classList.remove('bd-open');
      if (activeCard) { activeCard.classList.remove('bd-active'); activeCard = null; }
      activeKey = null;
    }

    document.querySelectorAll('.brand-card[data-brand]').forEach(card => {
      card.addEventListener('click', () => openDrawer(card.dataset.brand, card));
      card.style.cursor = 'pointer';
    });
    closeBtn.addEventListener('click', closeDrawer);
  })();

  // ─── LIGHTBOX ───
  (function () {
    const overlay = document.getElementById('lb-overlay');
    const lbImg = document.getElementById('lb-img');
    const lbClose = document.getElementById('lb-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    const lbCounter = document.getElementById('lb-counter');
    const lbDotsWrap = document.getElementById('lb-dots');

    const photoItems = Array.from(document.querySelectorAll('.photo-item img'));
    const originalPhotos = photoItems.map(img => ({ src: img.src, alt: img.alt }));
    const photos = [...originalPhotos];
    let current = 0;
    let isOpen = false;
    let usingCustomPhotos = false;

    function buildDots() {
      lbDotsWrap.innerHTML = '';
      photos.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'lb-dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', `Фото ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        lbDotsWrap.appendChild(dot);
      });
    }

    buildDots();

    const dots = () => Array.from(lbDotsWrap.querySelectorAll('.lb-dot'));

    function updateDots(index) {
      dots().forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function updateCounter(index) {
      lbCounter.textContent = `${index + 1} / ${photos.length}`;
    }

    function goTo(index, direction = 0) {
      if (!photos.length) return;
      const next = (index + photos.length) % photos.length;
      lbImg.classList.add('lb-anim-out');
      setTimeout(() => {
        current = next;
        lbImg.src = photos[current].src;
        lbImg.alt = photos[current].alt;
        lbImg.classList.remove('lb-anim-out');
        updateCounter(current);
        updateDots(current);
        lbPrev.style.opacity = photos.length > 1 ? '1' : '0';
        lbNext.style.opacity = photos.length > 1 ? '1' : '0';
      }, 180);
    }

    function open(index) {
      current = index;
      lbImg.src = photos[current].src;
      lbImg.alt = photos[current].alt;
      updateCounter(current);
      updateDots(current);
      overlay.classList.add('lb-open');
      isOpen = true;
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('lb-open');
      isOpen = false;
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
      setTimeout(() => {
        lbImg.src = '';
        if (usingCustomPhotos) {
          usingCustomPhotos = false;
          photos.splice(0, photos.length, ...originalPhotos);
          current = 0;
          buildDots();
        }
      }, 400);
    }

    photoItems.forEach((img, i) => {
      img.closest('.photo-item').addEventListener('click', () => open(i));
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', () => goTo(current - 1, -1));
    lbNext.addEventListener('click', () => goTo(current + 1, 1));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goTo(current - 1, -1);
      if (e.key === 'ArrowRight') goTo(current + 1, 1);
    });
    let touchStartX = 0;
    overlay.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? goTo(current + 1, 1) : goTo(current - 1, -1); }
    }, { passive: true });

    window._lbOpen = open;
    window._lbOpenWith = function (customPhotos, startIndex) {
      usingCustomPhotos = true;
      photos.splice(0, photos.length, ...customPhotos);
      current = startIndex;
      buildDots();
      open(startIndex);
    };
  })();

  // ─── VIDEO PLAYER LOGIC ───
  (function () {
    document.querySelectorAll('.video-wrap[data-video-src]').forEach(wrap => {
      const video = wrap.querySelector('video');
      const playBtn = wrap.querySelector('.vplay-btn');
      function showBtn() { playBtn.style.opacity = '1'; playBtn.style.pointerEvents = ''; }
      function hideBtn() { playBtn.style.opacity = '0'; playBtn.style.pointerEvents = 'none'; }
      playBtn.addEventListener('click', () => { video.play().catch(() => { }); hideBtn(); });
      video.addEventListener('click', () => {
        if (video.paused) { video.play().catch(() => { }); hideBtn(); } else { video.pause(); }
      });
      video.addEventListener('pause', showBtn);
      video.addEventListener('ended', () => { video.currentTime = 0; showBtn(); });
    });
  })();

  // ─── CAROUSELS (PHOTO & VIDEO) ───
  function setupCarousel(gridSelector, prevBtnId, nextBtnId, dotsWrapId, itemSelector, stepWidth) {
    const grid = document.querySelector(gridSelector);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsWrap = document.getElementById(dotsWrapId);
    if (!grid || !prevBtn || !nextBtn) return;

    const items = grid.querySelectorAll(itemSelector);
    if (dotsWrap && items.length > 1) {
      items.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'caro-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => { grid.scrollTo({ left: items[i].offsetLeft - 80, behavior: 'smooth' }); });
        dotsWrap.appendChild(d);
      });
    }

    function getActiveDot() {
      const center = grid.scrollLeft + grid.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      return closest;
    }

    function updateDots() {
      if (!dotsWrap) return;
      const active = getActiveDot();
      dotsWrap.querySelectorAll('.caro-dot').forEach((d, i) => d.classList.toggle('active', i === active));
    }

    function updateBtns() {
      prevBtn.classList.toggle(gridSelector.includes('photo') ? 'pcaro-hidden' : 'vcaro-hidden', grid.scrollLeft <= 8);
      nextBtn.classList.toggle(gridSelector.includes('photo') ? 'pcaro-hidden' : 'vcaro-hidden', grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 8);
    }

    prevBtn.addEventListener('click', () => { grid.scrollBy({ left: -stepWidth(), behavior: 'smooth' }); });
    nextBtn.addEventListener('click', () => { grid.scrollBy({ left: stepWidth(), behavior: 'smooth' }); });
    grid.addEventListener('scroll', () => { updateBtns(); updateDots(); }, { passive: true });
    updateBtns();
    updateDots();

    const section = grid.closest('section');
    if (section) {
      section.setAttribute('tabindex', '-1');
      section.style.outline = 'none';
      section.addEventListener('mouseenter', () => section.focus({ preventScroll: true }));
      section.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); grid.scrollBy({ left: -stepWidth(), behavior: 'smooth' }); }
        if (e.key === 'ArrowRight') { e.preventDefault(); grid.scrollBy({ left: stepWidth(), behavior: 'smooth' }); }
      });
    }

    let isDragging = false, startX = 0, startScroll = 0;
    grid.addEventListener('mousedown', e => {
      if (e.target.closest('.vplay-btn') || e.target.closest('.vexpand-btn')) return;
      isDragging = true;
      startX = e.pageX;
      startScroll = grid.scrollLeft;
      grid.classList.add('is-dragging');
    });
    window.addEventListener('mouseup', () => { isDragging = false; grid.classList.remove('is-dragging'); });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      grid.scrollLeft = startScroll - (e.pageX - startX);
    });
  }

  setupCarousel('.photo-grid', 'pcaro-prev', 'pcaro-next', 'pcaro-dots', '.photo-item', () => {
    const card = document.querySelector('.photo-item');
    return card ? card.offsetWidth + 24 : 280;
  });

  setupCarousel('.video-grid', 'vcaro-prev', 'vcaro-next', 'vcaro-dots', '.video-card', () => {
    const card = document.querySelector('.video-card');
    return card ? card.offsetWidth + 40 : 340;
  });

  // ─── i18n LANGUAGE TOGGLE ───
  (function () {
    var currentLang = localStorage.getItem('ay-lang') || 'ru';
    var translations = {
      ru: {
        'nav-about': 'О нас',
        'nav-brands': 'Мы в рекламе',
        'nav-photos': 'Портфолио',
        'nav-media': 'Наши работы',
        'nav-collab': 'Сотрудничество',
        'nav-contact': 'Контакт',
        'hero-tag': 'Медиа Кит · 2026',
        'hero-subtitle': 'Актёры · Модели · UGC-создатели',
        'about-label': 'О НАС',
        'about-title': 'О нас',
        'about-lead': 'Андрей &amp; Яна — UGC-креаторы, актёры и модели<br><em>performance creators</em><br>Создаём контент, который удерживает внимание и продаёт.',
        'about-body': '<div class="about-cards"><div class="about-card"><div class="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></div><div class="about-text"><strong>100+ проектов:</strong> кино, сериалы, реклама.</div></div><div class="about-card"><div class="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg></div><div class="about-text"><strong>Полный цикл продакшена:</strong> монтаж, съёмка, дрон.</div></div><div class="about-card"><div class="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div class="about-text"><strong>UGC-контент</strong> для отелей, fashion, travel.</div></div></div>',
        'stat-projects': 'рекламных проектов',
        'stat-masterclass': 'мастер-классов с фотографами',
        'stat-cycle': 'цикл производства',
        'brands-label': 'Мы в рекламе',
        'brands-title': 'Работали<br>с лучшими',
        'brands-count': '6 брендов',
        'cat-auto': 'Автомобили',
        'cat-fashion': 'Премиум · Одежда',
        'cat-hotels': 'Отели · Люкс',
        'cat-finance': 'Финансы',
        'cat-finpay': 'Финансы · Платежи',
        'cat-appliance': 'Техника · Бытовая',
        'brand-hint': '↗ Нажми, чтобы посмотреть',
        'bd-title': 'Съёмки для бренда',
        'photos-label': 'Фотографии',
        'photos-title': 'Модельные съёмки',
        'video-label': 'Видео',
        'video-title': 'Наши работы',
        'vl-showreel2026': 'Прогулка Патрики | Коллаборация с видеографом',
        'vl-coffee': 'Трипл кофе · UGC',
        'vl-danang': 'Дананг · Кофе с тропическим дождём',
        'vl-bana': 'Бана Хилз · Travel',
        'vl-diploma': 'Кофемания',
        'vl-aqua': 'Аквапарк Микадзуки · Lifestyle',
        'vl-misha': 'Кофейня MISSHA',
        'vl-fourseasons': 'Hotel Four Seasons lobby',
        'vl-kraski': 'Краски Drop Colour',
        'collab-label': 'Форматы работы',
        'collab-title': 'Открыты<br>к сотрудничеству',
        'collab-h1': 'Люксовые отели и курорты',
        'collab-d1': 'UGC-контент, review, lifestyle-видео для премиум-размещения',
        'collab-h2': 'Travel-бренды',
        'collab-d2': 'Атмосферные travel-видео и фото — от идеи до монтажа, полностью самостоятельно',
        'collab-h3': 'Мода и косметика',
        'collab-d3': 'Рекламные съёмки пары и соло, кино- и сериальный опыт',
        'collab-h4': 'Lifestyle-проекты',
        'collab-d4': 'Честный, живой и красивый контент — с душой, химией и профессионализмом',
        'contact-label': 'Контакт',
        'contact-title': 'Давайте<br>творить красоту<br>вместе ✨',
        'contact-desc': 'Открыты для UGC, рекламных съёмок, амбассадорств и коллабораций с люксовыми отелями, travel-брендами, модой, косметикой и lifestyle-проектами.',
        'footer-copy': '© 2026 · Медиа Кит · Актёры и UGC-создатели',
        'nav-pricing': 'Прайс',
        'price-label': 'Стоимость',
        'price-title': 'Прайс на<br>UGC-контент',
        'price-from': 'от',
        'price-popular': 'Популярный',
        'price-cta': 'Обсудить',
        'price-t1-tier': 'Starter',
        'price-t1-desc': 'Для небольших брендов и первого сотрудничества',
        'price-t1-f1': '1 вертикальное видео (15–30 сек)',
        'price-t1-f2': 'Монтаж + субтитры',
        'price-t1-f3': 'Использование в органике',
        'price-t1-f4': 'Срок: 5–7 дней',
        'price-t2-tier': 'Standard',
        'price-t2-desc': 'Самый востребованный формат для брендов',
        'price-t2-f1': '5 UGC-ролика 15–30 сек + 5 статичных фото',
        'price-t2-f2': 'Включено: сценарии, съёмка, монтаж, музыка',
        'price-t3-tier': 'Premium',
        'price-t3-desc': 'Для люксовых брендов, отелей и travel',
        'price-t3-f1': '10 UGC-роликов + 15 статичных фото',
        'price-t3-f2': 'Съёмка семьи, атмосферный lifestyle',
        'price-t3-f3': 'Включено: сценарии, съёмка, монтаж, музыка',
        'price-t3-f4': 'Срок: 10–14 дней',
        'price-bundles-title': 'Пакеты',
        'price-b1-name': 'Mini ×3',
        'price-b1-desc': '3 коротких видео',
        'price-b2-name': 'Content Month',
        'price-b2-desc': '6 видео за месяц',
        'price-b3-name': 'Hotel Stay',
        'price-b3-desc': 'Проживание + 5 видео + 10 фото',
        'price-extras-title': 'Дополнительно',
        'price-e1': 'Передача сырых исходников — +30–50% к стоимости',
        'price-e2': 'Права на использование в платной рекламе — +50% на 6 месяцев',
        'price-e3': '📸 Фото-сет (10–15 кадров) — от 10 000 ₽',
        'price-e4': '⏱ Срочность до 3 дней — +40%'
      },
      en: {
        'nav-about': 'About',
        'nav-brands': 'Clients',
        'nav-photos': 'Portfolio',
        'nav-media': 'Videos',
        'nav-collab': 'Collaboration',
        'nav-contact': 'Contact',
        'hero-tag': 'Media Kit · 2026',
        'hero-subtitle': 'Actors · Models · UGC Creators',
        'about-label': 'ABOUT US',
        'about-title': 'About Us',
        'about-lead': 'Andrey &amp; Yana — UGC creators, actors &amp; models<br><em>performance creators</em><br>We make content that holds attention and drives sales.',
        'about-body': '<div class="about-cards"><div class="about-card"><div class="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg></div><div class="about-text"><strong>100+ projects:</strong> films, series, premium advertising.</div></div><div class="about-card"><div class="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg></div><div class="about-text"><strong>Full cycle production:</strong> editing, shooting, drone.</div></div><div class="about-card"><div class="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><div class="about-text"><strong>Premium UGC</strong> for hotels, fashion, travel.</div></div></div>',
        'stat-projects': 'advertising projects',
        'stat-masterclass': 'masterclasses',
        'stat-cycle': 'full production cycle',
        'brands-label': 'Our Ads',
        'brands-title': 'Worked with<br>the Best',
        'brands-count': '6 brands',
        'cat-auto': 'Automotive',
        'cat-fashion': 'Premium · Fashion',
        'cat-hotels': 'Hotels · Luxury',
        'cat-finance': 'Finance',
        'cat-finpay': 'Finance · Payments',
        'cat-appliance': 'Home Appliances',
        'brand-hint': '↗ Click to view',
        'bd-title': 'Brand Shoots',
        'photos-label': 'Photography',
        'photos-title': 'Model Shoots',
        'video-label': 'Video',
        'video-title': 'Our Works',
        'vl-showreel2026': 'Patriki Walk | Collab with videographer',
        'vl-coffee': 'Triple Coffee · UGC',
        'vl-danang': 'Da Nang · Coffee in Tropical Rain',
        'vl-bana': 'Bana Hills · Travel',
        'vl-diploma': 'Coffemania',
        'vl-aqua': 'Mikadzuki Aquapark · Lifestyle',
        'vl-misha': 'Kofeyna MISSHA',
        'vl-fourseasons': 'Hotel Four Seasons lobby',
        'vl-kraski': 'Kraski Drop Colour',
        'collab-label': 'Work Formats',
        'collab-title': 'Open for<br>Collaboration',
        'collab-h1': 'Luxury Hotels & Resorts',
        'collab-d1': 'UGC content, reviews, lifestyle videos for premium placements',
        'collab-h2': 'Travel Brands',
        'collab-d2': 'Atmospheric travel videos and photos — from concept to edit, fully self-produced',
        'collab-h3': 'Fashion & Beauty',
        'collab-d3': 'Couple and solo ad shoots, film and TV experience',
        'collab-h4': 'Lifestyle Projects',
        'collab-d4': 'Honest, vibrant and beautiful content — with soul, chemistry and professionalism',
        'contact-label': 'Contact',
        'contact-title': 'Let\'s create<br>beauty<br>together ✨',
        'contact-desc': 'Open to UGC, advertising shoots, brand ambassadorship and collaborations with luxury hotels, travel brands, fashion, beauty and lifestyle projects.',
        'footer-copy': '© 2026 · Media Kit · Actors & UGC Creators',
        'nav-pricing': 'Pricing',
        'price-label': 'Rates',
        'price-title': 'UGC Content<br>Pricing',
        'price-from': 'from',
        'price-popular': 'Most Popular',
        'price-cta': 'Get in Touch',
        'price-t1-tier': 'Starter',
        'price-t1-desc': 'For smaller brands and first collaborations',
        'price-t1-f1': '1 vertical video (15–30 sec)',
        'price-t1-f2': 'Edit + subtitles',
        'price-t1-f3': 'Organic use rights',
        'price-t1-f4': 'Delivery: 5–7 days',
        'price-t2-tier': 'Standard',
        'price-t2-desc': 'The most requested format for brands',
        'price-t2-f1': '5 UGC videos 15–30 sec + 5 static photos',
        'price-t2-f2': 'Included: scripts, filming, editing, music',
        'price-t3-tier': 'Premium',
        'price-t3-desc': 'For luxury brands, hotels & travel',
        'price-t3-f1': '10 UGC videos + 15 static photos',
        'price-t3-f2': 'Family shoot, atmospheric lifestyle',
        'price-t3-f3': 'Included: scripts, filming, editing, music',
        'price-t3-f4': 'Delivery: 10–14 days',
        'price-bundles-title': 'Bundles',
        'price-b1-name': 'Mini ×3',
        'price-b1-desc': '3 short videos',
        'price-b2-name': 'Content Month',
        'price-b2-desc': '6 videos per month',
        'price-b3-name': 'Hotel Stay',
        'price-b3-desc': 'Stay + 5 videos + 10 photos',
        'price-extras-title': 'Add-ons',
        'price-e1': 'Raw footage delivery — +30–50% to price',
        'price-e2': 'Paid ad usage rights — +50% for 6 months',
        'price-e3': '📸 Photo set (10–15 shots) — from $130',
        'price-e4': '⏱ Rush delivery (3 days) — +40%'
      }
    };

    function applyLang(lang) {
      currentLang = lang;
      document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) el.textContent = translations[lang][key];
      });
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
      });
      var btn = document.getElementById('lang-toggle');
      if (btn) btn.textContent = lang === 'ru' ? 'EN' : 'RU';
      localStorage.setItem('ay-lang', lang);
    }
    var btn = document.getElementById('lang-toggle');
    if (btn) { btn.addEventListener('click', function () { applyLang(currentLang === 'ru' ? 'en' : 'ru'); }); }
    if (currentLang === 'en') applyLang('en');
    else btn && (btn.textContent = 'EN');
  })();

  // ─── iPhone MAX OVERLAY ───
  (function () {
    const overlay = document.getElementById('iphone-max-overlay');
    const maxVideo = document.getElementById('iphone-max-video');
    const closeBtn = document.getElementById('iphone-max-close');
    if (!overlay || !maxVideo || !closeBtn) return;
    let sourceVideo = null;
    function encodeSrc(src) { return src.split('/').map(seg => encodeURIComponent(seg)).join('/'); }
    function getSrc(wrap) {
      var inlineVideo = wrap.querySelector('video');
      var src = inlineVideo && inlineVideo.querySelector('source') ? inlineVideo.querySelector('source').getAttribute('src') : encodeSrc(wrap.dataset.videoSrc);
      return src.replace(/#.*$/, '');
    }
    function preloadMax(wrap) {
      if (overlay.classList.contains('imax-open')) return;
      var src = getSrc(wrap);
      if ((maxVideo.getAttribute('src') || '') !== src) { maxVideo.removeAttribute('src'); maxVideo.src = src; maxVideo.load(); }
    }
    function openMax(wrap) {
      var inlineVideo = wrap.querySelector('video');
      var currentTime = inlineVideo ? inlineVideo.currentTime : 0;
      if (inlineVideo) inlineVideo.pause();
      sourceVideo = inlineVideo;
      var poster = inlineVideo ? inlineVideo.getAttribute('poster') : null;
      if (poster) maxVideo.setAttribute('poster', poster); else maxVideo.removeAttribute('poster');
      var src = getSrc(wrap);
      if ((maxVideo.getAttribute('src') || '') !== src) { maxVideo.removeAttribute('src'); maxVideo.src = src; maxVideo.load(); }
      overlay.classList.add('imax-open');
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
      function tryPlay() {
        if (currentTime > 1) {
          var onSeeked = () => { maxVideo.removeEventListener('seeked', onSeeked); maxVideo.play().catch(() => { }); };
          maxVideo.addEventListener('seeked', onSeeked); maxVideo.currentTime = currentTime;
        } else { maxVideo.play().catch(() => { }); }
      }
      if (maxVideo.readyState >= 3) tryPlay(); else maxVideo.addEventListener('canplay', function onReady() { maxVideo.removeEventListener('canplay', onReady); tryPlay(); });
    }
    function closeMax() {
      var savedTime = maxVideo.currentTime;
      maxVideo.pause();
      if (sourceVideo) {
        var sv = sourceVideo; sourceVideo = null;
        var onSeeked = () => { sv.removeEventListener('seeked', onSeeked); };
        sv.addEventListener('seeked', onSeeked); try { sv.currentTime = savedTime; } catch (e) { }
      }
      maxVideo.removeAttribute('src'); maxVideo.load();
      overlay.classList.remove('imax-open'); document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    document.querySelectorAll('.vexpand-btn').forEach(btn => {
      var phone = btn.closest('.video-phone');
      var wrap = phone ? phone.querySelector('.video-wrap') : null;
      btn.addEventListener('mouseenter', () => { if (wrap) preloadMax(wrap); });
      btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); if (wrap) openMax(wrap); });
    });
    closeBtn.addEventListener('click', closeMax);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeMax(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('imax-open')) closeMax(); });
  })();

});
