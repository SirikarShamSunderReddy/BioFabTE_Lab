/* BioFabTE — Shared Script */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-aware navbar ─────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ─────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page && href.includes(page))) {
      link.classList.add('active');
    }
  });

  /* ── Mobile menu ─────────────────────────── */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('navDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const open = drawer.classList.contains('open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ───────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0,                        // fire as soon as 1px enters viewport
      rootMargin: '0px 0px -60px 0px'     // trigger 60px before bottom edge
    });

    revealEls.forEach(el => {
      // Immediately reveal anything already in the viewport on load
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        io.observe(el);
      }
    });
  }

  /* ── Publications tabs ───────────────────── */
  const pubTabs = document.querySelectorAll('.pub-tab');
  if (pubTabs.length) {
    pubTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        pubTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.pub-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ── Hero counter animation ──────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = parseInt(el.dataset.count);
        const dur = 1800;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * end);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io2.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => io2.observe(el));
  }

  /* ── Flip Cards — Mobile Touch Toggle ───────
     On touch/pointer devices that don't support
     :hover (phones, tablets), tapping a .flip-card
     toggles the .is-flipped class.  A second tap
     anywhere outside un-flips all cards.
  ──────────────────────────────────────────── */
  const flipCards = document.querySelectorAll('.flip-card');
  if (flipCards.length) {
    // Detect coarse pointer (touch screens)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouch) {
      flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
          const isFlipped = card.classList.contains('is-flipped');

          // Un-flip all other cards first
          flipCards.forEach(c => {
            if (c !== card) c.classList.remove('is-flipped');
          });

          // Toggle this card
          card.classList.toggle('is-flipped', !isFlipped);

          // Stop propagation so the document listener doesn't immediately close it
          e.stopPropagation();
        });
      });

      // Tap outside → close all flipped cards
      document.addEventListener('click', () => {
        flipCards.forEach(c => c.classList.remove('is-flipped'));
      });
    }
  }
  
});
document.addEventListener("DOMContentLoaded", function () {
  // Select parent container
  const teamGrid = document.querySelector(".team-grid");

  // Count flip-card children
  const count = teamGrid ? teamGrid.querySelectorAll(".flip-card").length : 0;

  // Update the count in UI
  const countElement = document.querySelector(".team-section-title .count");
  
  if (countElement) {
    countElement.textContent = count;
  }
});
