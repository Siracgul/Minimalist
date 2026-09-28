/** Header: kaydırınca arka plan, aşağı kaydırırken gizlenme; mobil menü. */
export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 320 && !header.contains(document.activeElement)) {
      header.classList.add('is-hidden');
    } else if (goingUp || y < 320) {
      header.classList.remove('is-hidden');
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  update();

  if (!menu || !openBtn || !closeBtn) return;

  const close = () => {
    menu.close();
  };
  openBtn.addEventListener('click', () => {
    menu.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  });
  closeBtn.addEventListener('click', close);
  menu.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    openBtn.focus();
  });
  // Aynı sayfadaki bir bağlantıya tıklanınca menüyü kapat
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  // Ekran genişleyince açık menüyü kapat
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => {
    if (e.matches && menu.open) close();
  });
}
