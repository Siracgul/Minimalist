/**
 * Görünür alana giren öğelere .is-in sınıfı ekler.
 * [data-reveal] ve .split öğeleri CSS ile animasyonlanır.
 */
const targets = document.querySelectorAll<HTMLElement>('[data-reveal], .split');

if (!('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));
}
