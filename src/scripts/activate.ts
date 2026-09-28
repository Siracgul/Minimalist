/**
 * [data-activate] öğeleri: ince imleçli cihazlarda hover/focus ile,
 * dokunmatik cihazlarda ekranın ortasına geldiğinde .is-active alır.
 * Motif animasyonlarını tetikler.
 */
let initialized = false;

export function initActivate() {
  if (initialized) return;
  initialized = true;

  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-activate]'));
  if (!items.length) return;

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (fine) {
    for (const el of items) {
      el.addEventListener('pointerenter', () => el.classList.add('is-active'));
      el.addEventListener('pointerleave', () => el.classList.remove('is-active'));
      el.addEventListener('focusin', () => el.classList.add('is-active'));
      el.addEventListener('focusout', () => el.classList.remove('is-active'));
    }
    // Sabit (hover'a bağlı olmayan) öğeler görünür olunca aktifleşsin
    observe(items.filter((el) => el.hasAttribute('data-activate-view')));
  } else {
    observe(items);
  }
}

function observe(items: HTMLElement[]) {
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-active'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.target.classList.toggle('is-active', e.isIntersecting);
    },
    { rootMargin: '-30% 0px -30% 0px' },
  );
  items.forEach((el) => io.observe(el));
}
