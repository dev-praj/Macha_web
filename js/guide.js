/**
 * Macha Guide — Interactive Behavior
 * - Sticky Table of Contents Scroll-Spy
 * - Instant Client-side Search & Section Filtering
 * - Interactive Onboarding Checklist with localStorage
 * - Snippet & Command Copy Buttons
 * - Back to Top Smooth Scroll
 */

const DOWNLOADS = {
  windows: 'https://github.com/dev-praj/Macha_by_Prajwal/releases/download/beta/macha.exe',
  android: 'https://github.com/dev-praj/Macha_by_Prajwal/releases/download/beta/macha.apk',
  releases: 'https://github.com/dev-praj/Macha_by_Prajwal/releases'
};

document.addEventListener('DOMContentLoaded', () => {
  initDownloadLinks();
  initScrollSpy();
  initSearch();
  initChecklist();
  initCopyButtons();
  initBackToTop();
  initAnchorLinks();
});

function initDownloadLinks() {
  document.querySelectorAll('[data-dl="windows"]').forEach(el => {
    el.href = DOWNLOADS.windows;
    el.rel = 'noopener';
  });
  document.querySelectorAll('[data-dl="android"]').forEach(el => {
    el.href = DOWNLOADS.android;
    el.rel = 'noopener';
  });
  document.querySelectorAll('[data-dl="releases"]').forEach(el => {
    el.href = DOWNLOADS.releases;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

/* ── 1. Scroll-Spy Table of Contents ────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section.guide-section, .feature-detail-card[id]');
  const tocLinks = document.querySelectorAll('.toc-link, .toc-sublink');
  if (!sections.length || !tocLinks.length) return;

  const linkMap = new Map();
  tocLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      linkMap.set(hash.slice(1), link);
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(l => l.classList.remove('active'));
        const activeLink = linkMap.get(id);
        if (activeLink) {
          activeLink.classList.add('active');
          // If activeLink is sublink, also activate parent toc-link
          const parentNav = activeLink.closest('.toc-subnav');
          if (parentNav) {
            const parentLink = parentNav.previousElementSibling;
            if (parentLink && parentLink.classList.contains('toc-link')) {
              parentLink.classList.add('active');
            }
          }
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ── 2. Client-side Search & Filter ─────────────────────────────────────── */
function initSearch() {
  const searchInput = document.getElementById('guide-search-input');
  const searchEmpty = document.getElementById('search-empty');
  const featureCards = document.querySelectorAll('.feature-detail-card');
  const guideSections = document.querySelectorAll('.guide-section');
  if (!searchInput) return;

  // Global hotkey '/' to focus search
  window.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      applyFilter('');
      searchInput.blur();
    }
  });

  searchInput.addEventListener('input', e => {
    applyFilter(e.target.value.trim().toLowerCase());
  });

  function applyFilter(query) {
    if (!query) {
      featureCards.forEach(card => card.style.display = '');
      guideSections.forEach(sec => sec.style.display = '');
      if (searchEmpty) searchEmpty.classList.remove('active');
      return;
    }

    let matchCount = 0;

    featureCards.forEach(card => {
      const text = (card.innerText || card.textContent).toLowerCase();
      if (text.includes(query)) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle sections
    guideSections.forEach(sec => {
      // If it's features section, keep visible if any feature card matches
      if (sec.id === 'features') {
        sec.style.display = matchCount > 0 ? '' : 'none';
      } else {
        const text = (sec.innerText || sec.textContent).toLowerCase();
        if (text.includes(query)) {
          sec.style.display = '';
          matchCount++;
        } else {
          sec.style.display = 'none';
        }
      }
    });

    if (searchEmpty) {
      if (matchCount === 0) {
        searchEmpty.classList.add('active');
      } else {
        searchEmpty.classList.remove('active');
      }
    }
  }
}

/* ── 3. Interactive Onboarding Checklist ────────────────────────────────── */
function initChecklist() {
  const STORAGE_KEY = 'macha_guide_steps_v1';
  const checkItems = document.querySelectorAll('.step-item');
  const progressText = document.getElementById('checklist-progress-text');
  const resetBtn = document.getElementById('checklist-reset-btn');
  if (!checkItems.length) return;

  let savedState = {};
  try {
    savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (err) {
    savedState = {};
  }

  function updateUI() {
    let completedCount = 0;
    checkItems.forEach(item => {
      const stepId = item.dataset.stepId;
      const isDone = !!savedState[stepId];
      if (isDone) {
        item.classList.add('completed');
        completedCount++;
      } else {
        item.classList.remove('completed');
      }
    });

    if (progressText) {
      progressText.textContent = `${completedCount} of ${checkItems.length} completed`;
    }
  }

  checkItems.forEach(item => {
    const trigger = item.querySelector('.step-check-custom') || item;
    trigger.addEventListener('click', () => {
      const stepId = item.dataset.stepId;
      savedState[stepId] = !savedState[stepId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      } catch (e) {}
      updateUI();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      savedState = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      updateUI();
    });
  }

  updateUI();
}

/* ── 4. Snippet & Command Copy Buttons ──────────────────────────────────── */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetText = btn.dataset.copyText || btn.previousElementSibling?.textContent || '';
      if (!targetText) return;

      navigator.clipboard.writeText(targetText.trim()).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.warn('Clipboard write failed:', err);
      });
    });
  });
}

/* ── 5. Back to Top Button ──────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── 6. Smooth Scroll Anchors with Offset ────────────────────────────────── */
function initAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });
}
