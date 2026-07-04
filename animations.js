/* ════════════════════════════════════════════════════════════════════════
   iMathMate — one-pager animation layer (index.html only)
   Fully additive & defensive: it only ADDS classes / CSS custom props to
   elements the dc-runtime does not manage the styles of, so React
   re-renders (scroll nav, language switch) never fight it. If anything
   throws, everything tagged is force-revealed so content can never be
   left hidden. Delete this file + animations.css + the two include lines
   in <head> to restore the old page (see ANIMATIONS-README.md).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HAS_IO = typeof IntersectionObserver === 'function';

  /* Force-show everything this layer ever hid — safety hatch. */
  function revealAll() {
    document.querySelectorAll('.al-r').forEach(function (el) { el.classList.add('al-in'); });
  }
  window.__alRevealAll = revealAll;

  /* The dc-runtime renders the page after load; poll until the footer
     grid exists (last DOM chunk), then initialise. Give up after 12s. */
  var tries = 0;
  var poll = setInterval(function () {
    if (document.querySelector('[data-ft-grid]')) {
      clearInterval(poll);
      try { init(); } catch (e) { revealAll(); }
    } else if (++tries > 150) {
      clearInterval(poll);
    }
  }, 80);

  function init() {
    initProgressBar();
    initHeader();
    if (!REDUCED) {
      initGlow();
      initReveals();
      initCounters();
      initShine();
      initTilesAndParallax();
    }
  }

  /* ── Scroll progress bar ── */
  function initProgressBar() {
    var bar = document.createElement('div');
    bar.id = 'alProgress';
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / max)) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ── Header glass deepens after scrolling past the hero top ── */
  function initHeader() {
    var last = null;
    function update() {
      var hdr = document.querySelector('[data-bar]');
      if (!hdr) return;
      var on = (window.scrollY || 0) > 40;
      if (on !== last) { hdr.classList.toggle('al-hdr', on); last = on; }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Cursor spotlight (fine pointers only) ── */
  function initGlow() {
    if (!matchMedia('(pointer: fine)').matches) return;
    var glow = document.createElement('div');
    glow.id = 'alGlow';
    document.body.appendChild(glow);
    var tx = -600, ty = -600, x = tx, y = ty, raf = null, shown = false;
    function frame() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      if (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) raf = requestAnimationFrame(frame);
      else raf = null;
    }
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; x = tx; y = ty; glow.style.opacity = '1'; }
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () {
      glow.style.opacity = '0'; shown = false;
    });
  }

  /* ── Scroll reveals for the text blocks the template never animated ── */
  function initReveals() {
    if (!HAS_IO) return;
    var targets = []; // [element, delaySeconds]

    /* Section headers: badge pill → h2 → sub-paragraph, staggered. */
    ['#problem', '#purpose', '#usp', '#process'].forEach(function (sel) {
      var sect = document.querySelector(sel);
      var h2 = sect && sect.querySelector('h2');
      if (!h2) return;
      var badge = h2.previousElementSibling;
      if (badge && badge.tagName === 'DIV') targets.push([badge, 0]);
      targets.push([h2, 0.09]);
      var sub = h2.nextElementSibling;
      if (sub && sub.tagName === 'P') targets.push([sub, 0.18]);
    });

    /* CTA band: every block in the centered column. */
    var ctaH2 = document.querySelector('#ctaBand h2');
    if (ctaH2 && ctaH2.parentElement) {
      Array.prototype.forEach.call(ctaH2.parentElement.children, function (child, i) {
        targets.push([child, i * 0.1]);
      });
    }

    /* Solution / loop callouts (matched on normalised inline style since
       the runtime reformats style strings). */
    var probCallout = findByStyle('#problem', 'margin-top:32px');
    if (probCallout) targets.push([probCallout, 0.1]);
    var procCallout = findByStyle('#process', 'margin-top:60px');
    if (procCallout) targets.push([procCallout, 0.1]);

    /* Footer: columns cascade, then newsletter, then bottom bar. */
    var ftGrid = document.querySelector('[data-ft-grid]');
    if (ftGrid) {
      Array.prototype.forEach.call(ftGrid.children, function (col, i) {
        targets.push([col, i * 0.09]);
      });
    }
    var nl = document.querySelector('[data-ft-nl]');
    if (nl) targets.push([nl, 0]);
    var fb = document.querySelector('[data-ft-bottom]');
    if (fb) targets.push([fb, 0.1]);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('al-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -7% 0px' });

    targets.forEach(function (t) {
      var el = t[0];
      /* Skip anything already on screen (mid-page reload) — no flash. */
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.style.setProperty('--al-d', t[1] + 's');
      el.classList.add('al-r');
      io.observe(el);
    });
  }

  function findByStyle(scopeSel, needle) {
    var scope = document.querySelector(scopeSel);
    if (!scope) return null;
    var divs = scope.querySelectorAll('div[style]');
    for (var i = 0; i < divs.length; i++) {
      var s = (divs[i].getAttribute('style') || '').replace(/\s+/g, '');
      if (s.indexOf(needle) !== -1) return divs[i];
    }
    return null;
  }

  /* ── Count-up on the stat numbers (hero + CTA band) ── */
  function initCounters() {
    if (!HAS_IO) return;
    var spans = [];
    var heroStats = document.querySelector('[data-stats]');
    if (heroStats) spans = spans.concat(firstSpans(heroStats));
    var ctaH2 = document.querySelector('#ctaBand h2');
    if (ctaH2 && ctaH2.parentElement) {
      var rows = ctaH2.parentElement.children;
      var statsRow = rows[rows.length - 1];
      if (statsRow) spans = spans.concat(firstSpans(statsRow));
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          setTimeout(function () { countUp(entry.target); }, 300);
        }
      });
    }, { threshold: 0.4 });

    spans.forEach(function (sp) {
      var m = /^(\d+(?:\.\d+)?)(.*)$/.exec((sp.textContent || '').trim());
      if (!m) return;
      sp.dataset.alNum = m[1];
      sp.dataset.alSuffix = m[2];
      io.observe(sp);
    });
  }

  function firstSpans(container) {
    var out = [];
    Array.prototype.forEach.call(container.children, function (child) {
      var sp = child.querySelector && child.querySelector('span');
      if (sp) out.push(sp);
    });
    return out;
  }

  function countUp(sp) {
    var target = parseFloat(sp.dataset.alNum);
    var suffix = sp.dataset.alSuffix || '';
    var decimals = (sp.dataset.alNum.split('.')[1] || '').length;
    var t0 = null, DUR = 1300;
    function tick(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / DUR);
      var eased = 1 - Math.pow(1 - p, 3);
      sp.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else sp.textContent = sp.dataset.alNum + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ── Sheen sweep on the primary (coral) CTA buttons ── */
  function initShine() {
    var picks = [
      document.querySelector('[data-ctatop]'),
      document.querySelector('[data-ctarow] a'),
    ];
    var ctaH2 = document.querySelector('#ctaBand h2');
    if (ctaH2 && ctaH2.parentElement) {
      var btn = ctaH2.parentElement.querySelector('a');
      if (btn) picks.push(btn);
    }
    picks.forEach(function (el) { if (el) el.classList.add('al-shine'); });
  }

  /* ── Hero tile bob + scroll-driven parallax on decorative art ── */
  function initTilesAndParallax() {
    document.querySelectorAll('[data-tile]').forEach(function (tile, i) {
      tile.classList.add('al-bob');
      tile.style.setProperty('--al-bob-dur', (5.6 + i * 0.9) + 's');
      tile.style.setProperty('--al-bob-del', (i * -1.7) + 's');
    });

    if (!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'))) return;
    var px = [];
    var heroImg = document.querySelector('[data-stage] > img');
    if (heroImg) px.push([heroImg, 20]);
    var probChar = document.querySelector('[data-prob-char]');
    if (probChar) px.push([probChar, 28]);
    var uspChar = document.querySelector('[data-usp-char]');
    if (uspChar) px.push([uspChar, 28]);
    document.querySelectorAll('#ctaBand > span').forEach(function (sp, i) {
      px.push([sp, 14 + (i % 4) * 6]);
    });
    document.querySelectorAll('[data-ft-wrap] > span').forEach(function (sp) {
      px.push([sp, 42]);
    });
    px.forEach(function (t) {
      t[0].style.setProperty('--al-px', t[1] + 'px');
      t[0].classList.add('al-px');
    });
  }
})();
