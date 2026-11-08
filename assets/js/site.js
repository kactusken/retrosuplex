/* Retro Suplex: lightbox for screenshots, TOC scroll-spy. Everything works without it. */
(function () {
  // --- lightbox: click a .crt screenshot link to see the original at whole-number zoom
  var box;
  function close() { if (box) { box.remove(); box = null; document.removeEventListener('keydown', onKey); } }
  function onKey(e) { if (e.key === 'Escape') close(); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.crt a');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (!/\.(png|webp|gif|jpe?g)$/i.test(a.pathname)) return;
    e.preventDefault();
    close();
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Image viewer');
    var img = new Image();
    img.alt = (a.querySelector('img') || {}).alt || '';
    img.onload = function () {
      var nw = img.naturalWidth, nh = img.naturalHeight;
      var k = Math.min((innerWidth - 48) / nw, (innerHeight - 90) / nh);
      var s = k >= 1 ? Math.floor(k) : k; // integer zoom up keeps pixels crisp
      img.style.width = Math.round(nw * s) + 'px';
      img.style.height = Math.round(nh * s) + 'px';
      var cap = document.createElement('div');
      cap.textContent = nw + ' × ' + nh + (s >= 1 ? '  ·  ' + s + '×' : '') + '  ·  ESC / click to close';
      box.appendChild(cap);
    };
    img.src = a.href;
    box.appendChild(img);
    box.addEventListener('click', close);
    document.body.appendChild(box);
    document.addEventListener('keydown', onKey);
  });

  // --- TOC: float in the left margin on wide screens, highlight the section being read
  var toc = document.querySelector('details.toc');
  if (!toc) return;
  var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
  var wide = matchMedia('(min-width: 1440px)');
  function sync() { toc.open = wide.matches; }
  sync();
  (wide.addEventListener ? wide.addEventListener('change', sync) : wide.addListener(sync));

  var heads = links.map(function (l) { return document.getElementById(decodeURIComponent(l.hash.slice(1))); });
  var cur = -1;
  function spy() {
    var i = -1;
    for (var n = 0; n < heads.length; n++) if (heads[n] && heads[n].getBoundingClientRect().top < innerHeight * 0.3) i = n;
    if (i === cur) return;
    cur = i;
    links.forEach(function (l, n) { l.classList.toggle('on', n === i); });
    if (i >= 0 && wide.matches) {
      var l = links[i], r = l.getBoundingClientRect(), t = toc.getBoundingClientRect();
      if (r.top < t.top + 40 || r.bottom > t.bottom - 10) l.scrollIntoView({ block: 'nearest' });
    }
  }
  addEventListener('scroll', spy, { passive: true });
  spy();
})();
