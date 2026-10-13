(function () {
  // Nav border once scrolled
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal-on-scroll for major blocks
  var revealEls = document.querySelectorAll('.cards, .metrics, .gallery, .cols, .evidence, .pipeline, .timeline, .skillgrid, .section__head, .project__head');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });

    // Active nav link
    var links = {};
    document.querySelectorAll('.nav__links a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var groups = { iris: 'work', rag: 'work', rube: 'work', vib: 'work', work: 'work', experience: 'experience', skills: 'skills', contact: 'contact' };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = groups[e.target.id];
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('is-active', k === key); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(groups).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Lightbox
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('figcaption');
  var figs = Array.prototype.slice.call(document.querySelectorAll('.fig'));
  var current = 0;
  function show(i) {
    current = (i + figs.length) % figs.length;
    var img = figs[current].querySelector('img');
    var cap = figs[current].querySelector('figcaption');
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    boxCap.innerHTML = cap ? cap.innerHTML : '';
  }
  if (typeof box.showModal === 'function') {
    figs.forEach(function (fig, i) {
      fig.querySelector('.zoom').addEventListener('click', function () { show(i); box.showModal(); });
    });
    box.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  } else {
    // Old browsers: open the image itself
    figs.forEach(function (fig) {
      fig.querySelector('.zoom').addEventListener('click', function () { window.open(fig.querySelector('img').src, '_blank'); });
    });
  }

  // Copy email
  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () { var o = btn.textContent; btn.textContent = 'Copied ✓'; setTimeout(function () { btn.textContent = o; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
      else window.location.href = 'mailto:' + text;
    });
  });
})();
