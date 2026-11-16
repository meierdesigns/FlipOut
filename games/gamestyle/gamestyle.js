/* gamestyle.js – resolution & scaling. No build, no dependencies.
   <div class="gs-screen"><canvas class="gs-stage" ...></div> or <div class="gs-stage">DOM-Spiel</div>
   const s = GameStyle.screen(el, {width:320, height:240, integer:true, fill:.95}); s.ctx -> 2D-Context */
(function (g) {
  function screen(el, o) {
    o = o || {};
    const cs = getComputedStyle(el);
    const W = o.width || +cs.getPropertyValue('--res-w') || 320;
    const H = o.height || +cs.getPropertyValue('--res-h') || 240;
    const integer = o.integer !== false, fill = o.fill || 1;
    const stage = el.querySelector('.gs-stage');
    el.style.setProperty('--res-w', W); el.style.setProperty('--res-h', H);
    let ctx = null;
    if (stage && stage.tagName === 'CANVAS') {
      stage.width = W; stage.height = H;               // backbuffer = logical resolution
      ctx = stage.getContext('2d'); ctx.imageSmoothingEnabled = false;
    }
    function fit() {
      const host = el.parentElement, aw = host.clientWidth * fill, ah = (o.maxHeight || innerHeight) * fill;
      let sc = Math.min(aw / W, ah / H);
      sc = integer && sc >= 1 ? Math.floor(sc) : Math.max(sc, .1);   // scharfe Pixel
      el.style.setProperty('--scale', sc);
      return sc;
    }
    addEventListener('resize', fit); fit();
    // Pointer-Position in logische Pixel umrechnen
    function toLogical(e) {
      const r = el.getBoundingClientRect(), sc = r.width / W;
      return { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
    }
    return { el, stage, ctx, width: W, height: H, fit, toLogical };
  }
  g.GameStyle = { screen };
})(window);
