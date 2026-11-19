/* ==========================================================================
   MACHA — JAVASCRIPT ENGINE
   - App-Faithful Startup Greeting Animation (Macha, Cubee, Onee)
   - Real App Gaze Tracking (lookX * 14px, lookY * -10px) across all avatars
   - 3D Hand-of-Cards Avatar Stack with Parallax & Hover Physics
   - Interactive Bento Demos (Screen Island State Switcher, Audio Waveform)
   - Dual-Layer Custom Cursor (Matcha Spotlight)
   - Download Toast Notifications & Accessibility Fallbacks
   ========================================================================== */

'use strict';

(function () {
  // ── Global Coordinates & State ──────────────────────────────────────────
  let mouseX = 0, mouseY = 0;       // Normalized (-1 to +1)
  let rawMouseX = window.innerWidth / 2;
  let rawMouseY = window.innerHeight / 2;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. Cursor Spotlight & Mouse Tracking ────────────────────────────────
  function initCursor() {
    const spotlight = document.getElementById('cursor-spotlight');

    window.addEventListener('pointermove', (e) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      if (spotlight) {
        spotlight.style.left = `${rawMouseX}px`;
        spotlight.style.top  = `${rawMouseY}px`;
        spotlight.classList.add('visible');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      if (spotlight) {
        spotlight.classList.remove('visible');
      }
    });

    // Device orientation fallback for mobile tilt
    if (window.DeviceOrientationEvent && !window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma == null || e.beta == null) return;
        mouseX = Math.max(-1, Math.min(1, e.gamma / 22));
        mouseY = Math.max(-1, Math.min(1, (e.beta - 40) / 22));
      }, { passive: true });
    }
  }

  // ── 2. App Startup Greeting Animation (Port of windows/src/macha/greeting.ts & greet()) ─
  function initStartupAnimation() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Skip loader if seen this session, ?skip_loader query param, or prefers-reduced-motion
    const alreadyLoaded = sessionStorage.getItem('macha_session_loaded');
    const urlParams = new URLSearchParams(window.location.search);
    if (alreadyLoaded === 'true' || reducedMotion || urlParams.has('skip_loader')) {
      document.documentElement.classList.remove('loader-active');
      document.documentElement.classList.add('no-loader');
      loader.remove();
      return;
    }

    const cubee = document.getElementById('startup-cubee');
    const onee = document.getElementById('startup-onee');
    const macha = document.getElementById('startup-macha');
    const machaEyesNormal = document.getElementById('st-macha-eyes-normal');
    const machaEyesHappy = document.getElementById('st-macha-eyes-happy');
    const handL = document.getElementById('macha-hand-l');
    const handR = document.getElementById('macha-hand-r');
    const greetingText = document.getElementById('greeting-text');
    const greetingSubline = document.getElementById('greeting-subline');
    const progressBar = document.getElementById('startup-progress-bar');
    const skipBtn = document.getElementById('startup-skip');
    const startupEyes = loader.querySelectorAll('.av-eyes');

    const startTime = performance.now();
    const LANG_HOLD = 1000; // 1.0s per language hello (per user request)
    const minDuration = 8800; // Total duration: 7 languages * 1.0s (7s) + 1.8s for "Macha says hello"
    let isExiting = false;
    let animFrameId = null;

    // Eye gaze tracking for startup avatars
    function updateStartupGaze() {
      if (isExiting) return;
      const eyeX = mouseX * 12;
      const eyeY = mouseY * -8;
      startupEyes.forEach((eyes) => {
        eyes.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
      });
      animFrameId = requestAnimationFrame(updateStartupGaze);
    }
    animFrameId = requestAnimationFrame(updateStartupGaze);

    // Progress bar runner over the full 8.8s duration
    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(98, (elapsed / minDuration) * 98);
      if (progressBar) progressBar.style.width = `${pct}%`;
    }, 30);

    // ── Chronological Step Sequence ──
    // T = 0.05s: Cubee pops up on left (E.back)
    setTimeout(() => {
      if (isExiting) return;
      if (cubee) cubee.classList.add('entered');
    }, 50);

    // T = 0.18s: Onee pops up on right (E.back)
    setTimeout(() => {
      if (isExiting) return;
      if (onee) onee.classList.add('entered');
    }, 180);

    // T = 0.32s: Macha (cream, front) pops up (E.back from greeting.ts T.grow)
    setTimeout(() => {
      if (isExiting) return;
      if (macha) macha.classList.add('entered');
    }, 320);

    // T = 0.60s: Macha happy squint (app greeting.ts T.squint0 = 0.6)
    setTimeout(() => {
      if (isExiting) return;
      if (machaEyesNormal && machaEyesHappy) {
        machaEyesNormal.style.display = 'none';
        machaEyesHappy.style.display = 'block';
      }
    }, 600);

    // T = 0.80s: Skip button fades in (bottom right) so user can skip anytime
    setTimeout(() => {
      if (isExiting) return;
      if (skipBtn) skipBtn.classList.add('visible');
    }, 800);

    // T = 1.00s: Macha eyes open & blink
    setTimeout(() => {
      if (isExiting) return;
      if (machaEyesNormal && machaEyesHappy) {
        machaEyesHappy.style.display = 'none';
        machaEyesNormal.style.display = 'block';
        machaEyesNormal.classList.add('blinking');
        setTimeout(() => machaEyesNormal.classList.remove('blinking'), 150);
      }
    }, 1000);

    // T = 1.30s: Macha bounce & wave with hands (app greeting.ts T.pop0 = 1.36s)
    setTimeout(() => {
      if (isExiting) return;
      if (macha) macha.classList.add('bouncing');
      if (handL) handL.classList.add('out');
      if (handR) {
        handR.classList.add('out');
        setTimeout(() => handR.classList.add('waving'), 100);
      }
      try {
        const audio = new Audio('assets/startup/greet.wav');
        audio.volume = 0.35;
        audio.play().catch(() => {});
      } catch (e) {}
    }, 1300);

    // Periodic natural blinks while on screen
    const blinkInterval = setInterval(() => {
      if (isExiting) { clearInterval(blinkInterval); return; }
      if (machaEyesNormal && machaEyesNormal.style.display !== 'none') {
        machaEyesNormal.classList.add('blinking');
        setTimeout(() => machaEyesNormal.classList.remove('blinking'), 140);
      }
    }, 2200);

    // Multi-lingual greeting cycle (1.0s per language)
    // 0s: Hello -> 1s: Namaste -> 2s: నమస్కారం -> 3s: ನಮಸ್ಕಾರ -> 4s: Hola -> 5s: Bonjour -> 6s: こんにちは -> 7s: Macha says hello 👋
    const languages = [
      'Hello',
      'Namaste',
      'నమస్కారం',
      'ನಮಸ್ಕಾರ',
      'Hola',
      'Bonjour',
      'こんにちは'
    ];
    let langIndex = 0;
    const langInterval = setInterval(() => {
      if (isExiting) { clearInterval(langInterval); return; }
      langIndex++;
      if (langIndex < languages.length) {
        if (greetingText) {
          greetingText.classList.add('tick');
          setTimeout(() => {
            if (isExiting) return;
            greetingText.textContent = languages[langIndex];
            greetingText.classList.remove('tick');
          }, 180);
        }
      } else {
        clearInterval(langInterval);
        // Land on "Macha says hello 👋"
        if (greetingText) {
          greetingText.classList.add('tick');
          setTimeout(() => {
            if (isExiting) return;
            greetingText.textContent = 'Macha says hello 👋';
            greetingText.classList.remove('tick');
            if (greetingSubline) greetingSubline.classList.add('visible');
            // Happy smile & bounce on final landing
            if (macha) macha.classList.add('bouncing');
            if (machaEyesNormal && machaEyesHappy) {
              machaEyesNormal.style.display = 'none';
              machaEyesHappy.style.display = 'block';
              setTimeout(() => {
                if (isExiting) return;
                machaEyesHappy.style.display = 'none';
                machaEyesNormal.style.display = 'block';
              }, 1200);
            }
          }, 180);
        }
      }
    }, LANG_HOLD);

    // ── Smooth Exit & Handoff to Hero ──
    function completeAndExit() {
      if (isExiting) return;
      isExiting = true;

      sessionStorage.setItem('macha_session_loaded', 'true');
      document.documentElement.classList.remove('loader-active');

      clearInterval(progressTimer);
      clearInterval(langInterval);
      clearInterval(blinkInterval);
      if (animFrameId) cancelAnimationFrame(animFrameId);

      // Tuck hands and complete progress
      if (handL) handL.classList.remove('out');
      if (handR) handR.classList.remove('out', 'waving');
      if (progressBar) progressBar.style.width = '100%';

      // Smooth fade and transform towards the hero
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
          if (loader.parentNode) loader.remove();
        }, 700);
      }, 350);
    }

    // Skip button click handler
    if (skipBtn) {
      skipBtn.addEventListener('click', completeAndExit);
    }

    // Safety fallback: dismiss after max duration + buffer
    setTimeout(completeAndExit, minDuration + 800);

    // Synchronize completion with page readiness
    function scheduleExit() {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(completeAndExit, remaining);
    }

    if (document.readyState === 'complete') {
      scheduleExit();
    } else {
      window.addEventListener('load', scheduleExit);
    }
  }

  // ── 3. Hero Avatar Stack (3D Parallax + Real App Eye Tracking) ───────────
  function initHeroAvatars() {
    const cluster = document.getElementById('hero-avatar-cluster');
    if (!cluster) return;

    const cards = cluster.querySelectorAll('.avatar-card');
    const allEyes = cluster.querySelectorAll('.av-eyes');

    window.addEventListener('pointermove', () => {
      // Eye gaze: lookX * 14px horizontal, lookY * -10px vertical (matches app)
      const gazeX = mouseX * 14;
      const gazeY = mouseY * -10;
      allEyes.forEach((eyes) => {
        eyes.style.transform = `translate(${gazeX}px, ${gazeY}px)`;
      });

      // Subtle card parallax depth
      cards.forEach((card, i) => {
        const depth = (i - 1) * 0.5;
        card.style.transform = card.style.transform.replace(/translateX\([^)]+\)/, '') ||
          card.getAttribute('data-base-transform') || '';
      });
    }, { passive: true });
  }

  // ── 4. Bento Island State Switcher ───────────────────────────────────────
  function initBentoIsland() {
    const btns = document.querySelectorAll('.island-btn');
    const stateText = document.querySelector('.island-state-text');
    const dot = document.querySelector('.state-dot');
    if (!btns.length || !stateText) return;

    const states = {
      idle:     { label: 'Listening for tasks…',   dotColor: '#8DBF5A' },
      thinking: { label: 'Thinking deeply…',       dotColor: '#FF9A8B' },
      working:  { label: 'Working on it…',         dotColor: '#FF6A57' },
      happy:    { label: 'Done! Great work! ✓',    dotColor: '#B9DE82' },
    };

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const state = states[btn.dataset.state] || states.idle;
        if (stateText.querySelector('span:last-child')) {
          stateText.querySelector('span:last-child').textContent = state.label;
        }
        if (dot) dot.style.backgroundColor = state.dotColor;
      });
    });
  }

  // ── 5. Toast Notification ────────────────────────────────────────────────
  function initToast() {
    const toast = document.getElementById('toast');
    const dlBtns = document.querySelectorAll('[download]');
    if (!toast || !dlBtns.length) return;

    dlBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      });
    });
  }

  // ── 6. Navbar Scroll Effect ──────────────────────────────────────────────
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Init All ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initStartupAnimation();
    initHeroAvatars();
    initBentoIsland();
    initToast();
    initNavbar();
  });

})();
