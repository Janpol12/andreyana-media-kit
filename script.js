/* ============================================
   ANDREYANA — Site interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Scroll Animations (Intersection Observer) ===
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // === Navbar scroll effect ===
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // === Mobile menu toggle ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('nav__toggle--active');
            navMenu.classList.toggle('nav__menu--open');
            document.body.style.overflow = navMenu.classList.contains('nav__menu--open') ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('nav__toggle--active');
                navMenu.classList.remove('nav__menu--open');
                document.body.style.overflow = '';
            });
        });
    }

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Parallax hero image ===
    const heroImage = document.getElementById('heroImage');

    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;

            if (scrollY < heroHeight) {
                const parallaxOffset = scrollY * 0.35;
                heroImage.style.transform = `scale(1.05) translateY(${parallaxOffset}px)`;
            }
        }, { passive: true });
    }

    // === Custom cursor ===
    const cursorDot = document.getElementById('cursorDot');

    if (cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            dotX += (mouseX - dotX) * 0.15;
            dotY += (mouseY - dotY) * 0.15;
            cursorDot.style.left = dotX - 4 + 'px';
            cursorDot.style.top = dotY - 4 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .portfolio__item, .video__card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('cursor-dot--hover'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('cursor-dot--hover'));
        });
    }

    // === Contact form (visual feedback only) ===
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('contactSubmit');
            const originalText = submitBtn.querySelector('.contact__submit-text').textContent;

            submitBtn.querySelector('.contact__submit-text').textContent = 'ОТПРАВЛЕНО ✓';
            submitBtn.querySelector('.contact__submit-arrow').style.display = 'none';
            submitBtn.style.borderColor = '#c9a96e';
            submitBtn.style.color = '#c9a96e';

            setTimeout(() => {
                submitBtn.querySelector('.contact__submit-text').textContent = originalText;
                submitBtn.querySelector('.contact__submit-arrow').style.display = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                contactForm.reset();
            }, 2500);
        });
    }

    // === Timeline animation (progressive reveal) ===
    const timelineItems = document.querySelectorAll('.timeline__item');
    const timelineLine = document.querySelector('.timeline__line');

    if (timelineLine) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            timelineObserver.observe(item);
        });
    }

    // === Hero text reveal on load ===
    setTimeout(() => {
        document.querySelectorAll('.hero__title-line').forEach((line, i) => {
            setTimeout(() => line.classList.add('animated'), i * 200);
        });
    }, 300);

    setTimeout(() => {
        document.querySelector('.hero__subtitle')?.classList.add('animated');
    }, 800);

    setTimeout(() => {
        document.querySelector('.hero__tagline')?.classList.add('animated');
        document.querySelector('.hero__scroll')?.classList.add('animated');
    }, 1000);

    setTimeout(() => {
        document.querySelector('.hero__issue')?.classList.add('animated');
    }, 400);

});
