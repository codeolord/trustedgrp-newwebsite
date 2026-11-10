/* Site interactions. No dependencies. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Toast ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    const el = $('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3200);
  }
  window.siteToast = toast;
  $$('[data-toast-msg]').forEach((b) => b.addEventListener('click', () => toast(b.dataset.toastMsg)));

  /* Header ----------------------------------------------------------------- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Dropdown mega menus ---------------------------------------------------- */
  const dropdowns = $$('[data-dropdown]');
  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d === except) return;
      d.classList.remove('is-open');
      const b = d.querySelector('.nav-link');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  dropdowns.forEach((d) => {
    const trigger = d.querySelector('.nav-link');
    let t;
    const open = () => { clearTimeout(t); closeAll(d); d.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { d.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
    trigger.addEventListener('click', (e) => { e.stopPropagation(); d.classList.contains('is-open') ? close() : open(); });
    if (finePointer) {
      d.addEventListener('mouseenter', open);
      d.addEventListener('mouseleave', () => { t = setTimeout(close, 140); });
    }
    d.addEventListener('focusout', (e) => { if (!d.contains(e.relatedTarget)) close(); });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('[data-dropdown]')) closeAll(); });

  /* Mobile nav ------------------------------------------------------------- */
  const menuBtn = $('[data-menu-toggle]');
  const mobileNav = $('[data-mobile-nav]');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') !== 'true';
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1100 && mobileNav.classList.contains('is-open')) menuBtn.click();
    });
  }

  /* Escape closes overlays ------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeAll();
    const m = $('.modal.is-open');
    if (m) closeModal(m);
    const hp = $('[data-help-panel].is-open');
    if (hp) toggleHelp(false);
  });

  /* Tabs ------------------------------------------------------------------- */
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const panels = $$('[role="tabpanel"]', root);
    const select = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => p.classList.toggle('is-active', i === j));
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView && window.innerWidth < 1024 && tabs[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
  });

  /* Accordion -------------------------------------------------------------- */
  $$('[data-accordion]').forEach((root) => {
    const items = $$(':scope > .acc-item', root);
    const linked = root.dataset.linked ? document.getElementById(root.dataset.linked) : null;
    const arts = linked ? $$('.benefit-art', linked) : [];
    items.forEach((item, i) => {
      const b = $('.acc-btn', item);
      b.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        if (linked && !willOpen) return; // linked accordions always keep one item open
        items.forEach((o) => { o.classList.remove('is-open'); $('.acc-btn', o).setAttribute('aria-expanded', 'false'); });
        if (willOpen) { item.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); }
        arts.forEach((a, j) => a.classList.toggle('is-active', j === i));
      });
    });
  });

  /* Carousel --------------------------------------------------------------- */
  $$('[data-carousel]').forEach((root) => {
    const track = $('.carousel-track', root);
    const slides = $$('.slide', root);
    const dots = $$('.dot', root);
    let i = 0, timer;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, j) => d.setAttribute('aria-current', String(i === j)));
      slides.forEach((s, j) => s.setAttribute('aria-hidden', String(i !== j)));
    };
    const play = () => { if (reduceMotion || slides.length < 2) return; clearInterval(timer); timer = setInterval(() => go(i + 1), 7000); };
    const stop = () => clearInterval(timer);
    $('[data-prev]', root)?.addEventListener('click', () => { go(i - 1); play(); });
    $('[data-next]', root)?.addEventListener('click', () => { go(i + 1); play(); });
    dots.forEach((d, j) => d.addEventListener('click', () => { go(j); play(); }));
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    let x0 = null;
    track.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
      x0 = null; play();
    });
    go(0); play();
  });

  /* Modals ----------------------------------------------------------------- */
  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    document.body.classList.add('no-scroll');
    const f = m.querySelector('[data-autofocus], .modal-close');
    f && f.focus();
    m.dispatchEvent(new CustomEvent('modal:open'));
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    m.dispatchEvent(new CustomEvent('modal:close'));
    lastFocus && lastFocus.focus();
  }
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) {
      const m = document.getElementById(opener.dataset.open);
      if (m) { e.preventDefault(); openModal(m); }
    }
    const closer = e.target.closest('[data-close]');
    if (closer) { const m = closer.closest('.modal'); m && closeModal(m); }
  });

  /* Product tour ----------------------------------------------------------- */
  const tour = $('[data-tour]');
  if (tour) {
    const slides = $$('[data-tour-slide]', tour);
    const steps = $$('[data-tour-step]', tour);
    const DURATION = 5000;
    let idx = 0, raf, start;
    const show = (n) => {
      idx = n % slides.length;
      slides.forEach((s, j) => { s.hidden = j !== idx; });
      steps.forEach((s, j) => { s.classList.toggle('is-active', j === idx); $('i', s).style.width = j < idx ? '100%' : '0'; });
      start = performance.now();
    };
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      $('i', steps[idx]).style.width = `${p * 100}%`;
      if (p >= 1) show(idx + 1 >= slides.length ? 0 : idx + 1);
      raf = requestAnimationFrame(tick);
    };
    steps.forEach((s, j) => s.addEventListener('click', () => show(j)));
    const modal = tour.closest('.modal');
    modal.addEventListener('modal:open', () => { show(0); if (!reduceMotion) raf = requestAnimationFrame(tick); });
    modal.addEventListener('modal:close', () => cancelAnimationFrame(raf));
  }

  /* Help widget ------------------------------------------------------------ */
  const helpBtn = $('[data-help-toggle]');
  const helpPanel = $('[data-help-panel]');
  function toggleHelp(force) {
    if (!helpBtn) return;
    const open = typeof force === 'boolean' ? force : !helpPanel.classList.contains('is-open');
    helpPanel.classList.toggle('is-open', open);
    helpBtn.setAttribute('aria-expanded', String(open));
  }
  helpBtn && helpBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleHelp(); });
  document.addEventListener('click', (e) => { if (helpPanel && helpPanel.classList.contains('is-open') && !e.target.closest('[data-help-panel]')) toggleHelp(false); });

  /* Filterable lists (templates, integrations, blog) ------------------------ */
  $$('[data-filter]').forEach((root) => {
    const chips = $$('[data-filter-value]', root);
    const search = $('[data-filter-search]', root);
    const items = $$('[data-item]', root);
    const empty = $('[data-empty]', root);
    const params = new URLSearchParams(location.search);
    let cat = 'all';
    const apply = () => {
      const q = (search ? search.value : '').trim().toLowerCase();
      let shown = 0;
      items.forEach((it) => {
        const okCat = cat === 'all' || (it.dataset.category || '').split('|').includes(cat);
        const okQ = !q || (it.dataset.name || it.textContent).toLowerCase().includes(q);
        const show = okCat && okQ;
        it.hidden = !show;
        if (show) shown++;
      });
      empty && empty.classList.toggle('is-visible', shown === 0);
      const counter = $('[data-count]', root);
      counter && (counter.textContent = shown);
    };
    chips.forEach((c) => c.addEventListener('click', () => {
      cat = c.dataset.filterValue;
      chips.forEach((x) => { x.classList.toggle('is-active', x === c); x.setAttribute('aria-pressed', String(x === c)); });
      apply();
    }));
    search && search.addEventListener('input', apply);
    const reset = $('[data-filter-reset]', root);
    reset && reset.addEventListener('click', () => { if (search) search.value = ''; chips[0] && chips[0].click(); apply(); });
    if (params.get('q') && search) search.value = params.get('q');
    const pc = params.get('category');
    if (pc) { const c = chips.find((x) => x.dataset.filterValue === pc); c && c.click(); }
    apply();
    // Highlight a deep-linked item (e.g. /certificate-templates#id)
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && root.contains(target)) {
        target.hidden = false;
        target.style.outline = '3px solid var(--blue)';
        target.style.outlineOffset = '6px';
        target.style.borderRadius = '16px';
        setTimeout(() => target.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }), 200);
      }
    }
  });

  /* Template preview modal --------------------------------------------------- */
  const preview = $('#preview');
  if (preview) {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-preview]');
      if (!b) return;
      const card = b.closest('[data-item]');
      const svg = card && card.querySelector('.tpl-thumb svg');
      if (!svg) return;
      $('[data-preview-slot]', preview).innerHTML = svg.outerHTML;
      $('[data-preview-title]', preview).textContent = card.dataset.title || '';
      $('[data-preview-cat]', preview).textContent = card.dataset.category.split('|')[0] || '';
      $('[data-preview-use]', preview).href = '/contact?template=' + encodeURIComponent(card.id);
      openModal(preview);
    });
  }

  /* Forms ------------------------------------------------------------------ */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$('[data-form]').forEach((form) => {
    form.setAttribute('novalidate', '');
    const validateField = (input) => {
      const field = input.closest('.field');
      if (!field) return true;
      let ok = true;
      const v = input.type === 'checkbox' ? input.checked : input.value.trim();
      if (input.required && !v) ok = false;
      if (ok && input.type === 'email' && v && !EMAIL.test(v)) ok = false;
      if (ok && input.type === 'url' && v && !/^https?:\/\/[^\s.]+\.\S+$/.test(v)) ok = false;
      if (ok && input.minLength > 0 && v && v.length < input.minLength) ok = false;
      if (ok && input.dataset.match) { const other = form.querySelector(input.dataset.match); ok = other && other.value === input.value; }
      field.classList.toggle('has-error', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    $$('input, select, textarea', form).forEach((i) => {
      i.addEventListener('blur', () => { if (i.value) validateField(i); });
      i.addEventListener('input', () => { if (i.closest('.field.has-error')) validateField(i); });
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputs = $$('input, select, textarea', form);
      const results = inputs.map(validateField);
      const firstBad = inputs[results.indexOf(false)];
      if (firstBad) { firstBad.focus(); return; }
      const submit = $('[type="submit"]', form);
      const label = submit ? submit.innerHTML : '';
      if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
      const emailInput = $('input[type="email"]', form);
      const slot = form.nextElementSibling && $('[data-sent-email]', form.nextElementSibling);
      const errorSlot = $('[data-form-error]', form);
      if (errorSlot) errorSlot.hidden = true;
      try {
        const apiBase = ['trustedgrp.com', 'www.trustedgrp.com'].includes(location.hostname) ? 'https://api.trustedgrp.com' : '';
        const response = await fetch(`${apiBase}/api/forms`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: form.dataset.form, ...Object.fromEntries(new FormData(form).entries()) }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'We could not submit the form. Please try again.');
        if (slot && emailInput) slot.textContent = emailInput.value;
        form.classList.add('is-sent');
        form.reset();
      } catch (error) {
        if (errorSlot) {
          errorSlot.textContent = error.message || 'We could not submit the form. Please try again.';
          errorSlot.hidden = false;
        } else {
          toast(error.message || 'We could not submit the form. Please try again.');
        }
      } finally {
        if (submit) { submit.disabled = false; submit.innerHTML = label; }
      }
    });
  });
  $$('[data-form-again]').forEach((b) => b.addEventListener('click', () => {
    const form = b.closest('.form-success').previousElementSibling;
    form && form.classList.remove('is-sent');
  }));

  $$('[data-pw-toggle]').forEach((b) => b.addEventListener('click', () => {
    const input = b.parentElement.querySelector('input');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    b.textContent = show ? 'Hide' : 'Show';
  }));

  /* Copy buttons ----------------------------------------------------------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const target = document.getElementById(b.dataset.copy);
    try { await navigator.clipboard.writeText(target.innerText); toast('Copied to clipboard'); } catch (_) { toast('Press Ctrl+C to copy'); }
  }));

  /* Scrollspy (features sidebar, article TOC) ------------------------------ */
  $$('[data-scrollspy]').forEach((nav) => {
    const links = $$('a[href^="#"]', nav);
    const map = new Map();
    links.forEach((a) => { const s = document.getElementById(a.getAttribute('href').slice(1)); s && map.set(s, a); });
    if (!('IntersectionObserver' in window) || !map.size) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { links.forEach((l) => l.classList.remove('is-active')); map.get(en.target).classList.add('is-active'); }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, s) => io.observe(s));
  });

  /* Reveal on scroll ------------------------------------------------------- */
  const reveals = $$('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach((r) => io.observe(r));
  } else reveals.forEach((r) => r.classList.add('is-in'));

  $$('[data-year]').forEach((y) => { y.textContent = new Date().getFullYear(); });

  /* Show context from query params when a page requests it. */
  const qp = new URLSearchParams(location.search);
  $$('[data-param]').forEach((el) => {
    const v = qp.get(el.dataset.param);
    if (!v) return;
    el.hidden = false;
    const slot = $('[data-param-value]', el);
    slot && (slot.textContent = v.replace(/-\d+$/, '').replace(/-/g, ' '));
  });

  /* Certificate generator (keyword-based demo; swap in a real model call) --- */
  const ai = $('[data-ai]');
  if (ai) {
    const PALETTES = {
      blue: ['#0b65ad', '#ffb547'], navy: ['#0a3260', '#c99a2e'], green: ['#0e7a6b', '#f2b84b'], purple: ['#7a4ee0', '#ff9ec7'],
      pink: ['#d9468f', '#ffd166'], black: ['#161616', '#c99a2e'], orange: ['#f07b2d', '#1d3557'], red: ['#c1121f', '#003049'],
      teal: ['#0e9aa7', '#f6cd61'], gold: ['#8a6d1d', '#e9c46a'],
    };
    const DEFAULT = ['#0b65ad', '#ffb547'];
    const STYLE_WORDS = { classic: /classic|formal|elegant|university|traditional|diploma/, modern: /modern|tech|startup|bold|sleek/, geo: /fun|kids|colou?rful|playful|geometric|school/, minimal: /minimal|simple|clean|corporate/, wave: /ocean|wave|calm|wellness|yoga|health/, ribbon: /business|professional|award|excellence|ribbon/ };
    const TYPES = [
      [/award|excellence|best|winner/, ['Award', 'of Excellence', 'in recognition of outstanding performance in']],
      [/appreciat|thank|volunteer|gratitude/, ['Certificate', 'of Appreciation', 'with sincere thanks for contributions to']],
      [/attend|participat|webinar|conference|event|summit|meetup/, ['Certificate', 'of Attendance', 'for attending']],
      [/training|workshop|bootcamp/, ['Training', 'Certificate', 'for successfully completing']],
      [/achieve|milestone/, ['Certificate', 'of Achievement', 'for outstanding achievement in']],
    ];
    const state = { style: 'modern', palette: DEFAULT, text: {} };
    const stage = $('[data-ai-preview]', ai);
    const input = $('[data-ai-input]', ai);

    const titleCase = (s) => s.replace(/\b([a-z])/g, (m) => m.toUpperCase());
    function parse(prompt) {
      const p = prompt.toLowerCase();
      let style = state.style;
      for (const [k, re] of Object.entries(STYLE_WORDS)) if (re.test(p)) { style = k; break; }
      let palette = state.palette;
      for (const [k, v] of Object.entries(PALETTES)) if (new RegExp('\\b' + k).test(p)) { palette = v; break; }
      let [title, subtitle, line] = ['Certificate', 'of Completion', 'for successfully completing the course'];
      for (const [re, v] of TYPES) if (re.test(p)) { [title, subtitle, line] = v; break; }
      const art = '(?:an?\\s+|the\\s+|my\\s+|our\\s+)?([^,.;!?]+)';
      const m = prompt.match(new RegExp('\\bfor\\s+' + art, 'i')) || prompt.match(new RegExp('\\b(?:in|on)\\s+' + art, 'i'));
      let course = m ? m[1].replace(/\b(certificate|course completion|completion)\b/gi, '').trim() : '';
      course = course.split(/\s+(?:with|in|using|that|style)\s+/i)[0].trim();
      course = course ? titleCase(course).slice(0, 48) : 'Your Course Name';
      const nameMatch = prompt.match(/(?:to|named|recipient)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
      return { style, palette, text: { title, subtitle, line, course, name: nameMatch ? nameMatch[1] : 'Chinedu Okafor' } };
    }
    function render() {
      const tpl = document.getElementById('ai-tpl-' + state.style);
      if (!tpl) return;
      let html = tpl.innerHTML.trim();
      html = html.replace(/#0b65ad/gi, state.palette[0]).replace(/#ffb547/gi, state.palette[1]);
      stage.querySelector('[data-ai-svg]').innerHTML = html;
      const svg = stage.querySelector('svg');
      Object.entries(state.text).forEach(([k, v]) => {
        $$(`[data-f="${k}"]`, svg).forEach((t) => { t.textContent = t.dataset.case === 'upper' ? v.toUpperCase() : v; });
      });
      $$(`[data-f="titlefull"]`, svg).forEach((t) => { t.textContent = `${state.text.title || 'Certificate'} ${state.text.subtitle || ''}`.toUpperCase(); });
      $$('[data-style-opt]', ai).forEach((b) => b.classList.toggle('is-active', b.dataset.styleOpt === state.style));
      $$('[data-color-opt]', ai).forEach((b) => b.classList.toggle('is-active', PALETTES[b.dataset.colorOpt][0] === state.palette[0]));
      $$('[data-ai-field]', ai).forEach((f) => { if (document.activeElement !== f) f.value = state.text[f.dataset.aiField] || ''; });
    }
    function generate() {
      const prompt = input.value.trim();
      if (!prompt) { input.focus(); toast('Describe the certificate you need first'); return; }
      const r = parse(prompt);
      state.style = r.style;
      state.palette = r.palette;
      state.text = { ...state.text, ...r.text };
      stage.classList.add('is-loading');
      setTimeout(() => { render(); stage.classList.remove('is-loading'); }, reduceMotion ? 0 : 900);
    }
    $('[data-ai-go]', ai).addEventListener('click', generate);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } });
    $$('[data-ai-suggest]', ai).forEach((b) => b.addEventListener('click', () => { input.value = b.textContent; generate(); }));
    $$('[data-style-opt]', ai).forEach((b) => b.addEventListener('click', () => { state.style = b.dataset.styleOpt; render(); }));
    $$('[data-color-opt]', ai).forEach((b) => b.addEventListener('click', () => { state.palette = PALETTES[b.dataset.colorOpt]; render(); }));
    $$('[data-ai-field]', ai).forEach((f) => f.addEventListener('input', () => { state.text[f.dataset.aiField] = f.value; render(); }));
    $('[data-ai-download]', ai).addEventListener('click', () => {
      const svg = stage.querySelector('svg');
      const blob = new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (state.text.course || 'certificate').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.svg';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    state.text = { title: 'Certificate', subtitle: 'of Completion', name: 'Chinedu Okafor', course: 'Advanced Project Management', line: 'for successfully completing the course', date: 'May 14, 2026' };
    render();
  }
})();
