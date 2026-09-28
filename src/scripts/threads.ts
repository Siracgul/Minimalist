/**
 * "Buluşma noktası" — ana sayfa hero animasyonu.
 *
 * Farklı yönlerden gelen ince çizgiler (insanlar, bakış açıları, içerikler)
 * logodaki bordo noktada buluşur. Çizgiler yavaşça nefes alır, imleçle hafifçe
 * esner; üzerlerinden noktaya doğru küçük parçacıklar akar.
 *
 * - prefers-reduced-motion: tek bir durağan kare çizilir.
 * - Görünmediğinde / sekme gizliyken döngü durur.
 * - Canvas desteklenmezse hero yine eksiksiz görünür (dekoratiftir).
 */

type Pt = { x: number; y: number };
type Thread = {
  angle: number; // başlangıç açısı (odak etrafında)
  reach: number; // başlangıç uzaklığı çarpanı
  swirl: number; // eğrilik
  arrive: number; // varış açısı sapması
  color: string;
  width: number;
  delay: number;
  phase: number;
  speed: number;
};
type Spark = { thread: number; t: number; v: number };

const COLORS = {
  soft: 'rgba(122,156,160,0.55)',
  softFaint: 'rgba(122,156,160,0.32)',
  teal: 'rgba(15,61,70,0.42)',
  bordo: 'rgba(136,45,50,0.85)',
  dot: '#882D32',
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Kübik bezier'i t noktasında böler, ilk parçanın kontrol noktalarını döndürür */
function splitBezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): [Pt, Pt, Pt, Pt] {
  const lerp = (a: Pt, b: Pt): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  const a = lerp(p0, p1);
  const b = lerp(p1, p2);
  const c = lerp(p2, p3);
  const d = lerp(a, b);
  const e = lerp(b, c);
  const f = lerp(d, e);
  return [p0, a, d, f];
}

function bezierPoint(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const w0 = u * u * u;
  const w1 = 3 * u * u * t;
  const w2 = 3 * u * t * t;
  const w3 = t * t * t;
  return {
    x: w0 * p0.x + w1 * p1.x + w2 * p2.x + w3 * p3.x,
    y: w0 * p0.y + w1 * p1.y + w2 * p2.y + w3 * p3.y,
  };
}

export function initThreads(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const host = canvas.parentElement as HTMLElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rand = mulberry32(7);

  let w = 0;
  let h = 0;
  let dpr = 1;
  let focus: Pt = { x: 0, y: 0 };
  let radius = 0;
  let threads: Thread[] = [];
  let sparks: Spark[] = [];
  let start = 0;
  let raf = 0;
  let visible = true;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  function build() {
    const mobile = w < 720;
    const count = mobile ? 34 : 60;
    threads = [];
    for (let i = 0; i < count; i++) {
      // Açıları eşit dağıt, biraz sapma ekle: her yönden gelen bir demet
      const base = (i / count) * Math.PI * 2;
      const r = rand();
      let color = r < 0.62 ? COLORS.softFaint : r < 0.9 ? COLORS.soft : COLORS.teal;
      if (i % 19 === 7) color = COLORS.bordo;
      threads.push({
        angle: base + (rand() - 0.5) * 0.35,
        reach: 0.85 + rand() * 0.75,
        swirl: 0.35 + rand() * 0.45,
        arrive: (rand() - 0.5) * 0.9,
        color,
        width: color === COLORS.bordo ? 1.25 : 0.6 + rand() * 0.7,
        delay: rand() * 900,
        phase: rand() * Math.PI * 2,
        speed: 0.00018 + rand() * 0.00022,
      });
    }
    sparks = Array.from({ length: mobile ? 6 : 12 }, () => newSpark(true));
  }

  function newSpark(initial = false): Spark {
    return {
      thread: Math.floor(rand() * threads.length),
      t: initial ? rand() * 0.8 : 0,
      v: 0.0009 + rand() * 0.0012,
    };
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mobile = w < 720;
    const fx = parseFloat(host.dataset[mobile ? 'fxMobile' : 'fx'] || '0.72');
    const fy = parseFloat(host.dataset[mobile ? 'fyMobile' : 'fy'] || '0.45');
    focus = { x: w * fx, y: h * fy };
    radius = Math.hypot(w, h) * (mobile ? 0.62 : 0.5);
    if (!threads.length || (threads.length > 40) !== !mobile) build();
    if (reduced.matches) draw(performance.now() + 1e6);
  }

  function geometry(th: Thread, time: number): [Pt, Pt, Pt, Pt] {
    const breathe = reduced.matches ? 0 : Math.sin(time * th.speed + th.phase);
    const ang = th.angle + breathe * 0.04;
    const dist = radius * th.reach;
    const p0 = { x: focus.x + Math.cos(ang) * dist, y: focus.y + Math.sin(ang) * dist };

    // Girdap etkisi: kontrol noktaları aynı yönde döner (logodaki kıvrımın yankısı)
    const sw = th.swirl + breathe * 0.06;
    const a1 = ang - sw * 1.1;
    const p1 = {
      x: focus.x + Math.cos(a1) * dist * 0.62 + pointer.x * 26 * th.reach,
      y: focus.y + Math.sin(a1) * dist * 0.62 + pointer.y * 26 * th.reach,
    };
    const a2 = ang - sw * 2.1 + th.arrive;
    const near = Math.min(w, h) * 0.16;
    const p2 = {
      x: focus.x + Math.cos(a2) * near + pointer.x * 10,
      y: focus.y + Math.sin(a2) * near + pointer.y * 10,
    };
    return [p0, p1, p2, focus];
  }

  function draw(now: number) {
    const t = now - start;
    ctx!.clearRect(0, 0, w, h);

    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    let arrived = 0;
    for (let i = 0; i < threads.length; i++) {
      const th = threads[i];
      const p = Math.min(1, Math.max(0, (t - th.delay) / 2200));
      if (p <= 0) continue;
      const e = easeOut(p);
      if (p >= 1) arrived++;
      const g = geometry(th, now);
      const [a, b, c, d] = e < 1 ? splitBezier(g[0], g[1], g[2], g[3], e) : g;
      ctx!.beginPath();
      ctx!.moveTo(a.x, a.y);
      ctx!.bezierCurveTo(b.x, b.y, c.x, c.y, d.x, d.y);
      ctx!.strokeStyle = th.color;
      ctx!.lineWidth = th.width;
      ctx!.stroke();
    }

    // Noktaya akan parçacıklar
    const ready = arrived / threads.length;
    if (ready > 0.9 && !reduced.matches) {
      for (const s of sparks) {
        s.t += s.v * 16;
        if (s.t >= 1) Object.assign(s, newSpark());
        const th = threads[s.thread];
        const g = geometry(th, now);
        const pt = bezierPoint(g[0], g[1], g[2], g[3], easeOut(s.t));
        const alpha = Math.sin(Math.PI * s.t) * 0.9;
        ctx!.beginPath();
        ctx!.arc(pt.x, pt.y, th.color === COLORS.bordo ? 2.4 : 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = th.color === COLORS.bordo ? `rgba(136,45,50,${alpha})` : `rgba(15,61,70,${alpha * 0.7})`;
        ctx!.fill();
      }
    }

    // Buluşma noktası
    const dp = Math.min(1, Math.max(0, (t - 1900) / 900));
    if (dp > 0) {
      const base = Math.max(9, Math.min(w, h) * 0.018);
      const r = base * easeOutBack(dp);
      // halka
      const pulse = reduced.matches ? 0 : (now % 3600) / 3600;
      if (dp >= 1 && pulse > 0) {
        ctx!.beginPath();
        ctx!.arc(focus.x, focus.y, base + pulse * base * 3.2, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(136,45,50,${0.35 * (1 - pulse)})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
      ctx!.beginPath();
      ctx!.arc(focus.x, focus.y, r, 0, Math.PI * 2);
      ctx!.fillStyle = COLORS.dot;
      ctx!.fill();
    }
  }

  function loop(now: number) {
    draw(now);
    raf = requestAnimationFrame(loop);
  }

  function play() {
    cancelAnimationFrame(raf);
    if (reduced.matches) {
      draw(performance.now() + 1e6);
      return;
    }
    if (visible && !document.hidden) raf = requestAnimationFrame(loop);
  }

  // Başlangıç
  resize();
  start = performance.now();
  canvas.classList.add('is-ready');
  play();

  new ResizeObserver(() => resize()).observe(host);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else cancelAnimationFrame(raf);
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else play();
  });

  reduced.addEventListener('change', play);

  if (window.matchMedia('(pointer: fine)').matches) {
    host.addEventListener('pointermove', (e) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    host.addEventListener('pointerleave', () => {
      pointer.tx = 0;
      pointer.ty = 0;
    });
  }
}
