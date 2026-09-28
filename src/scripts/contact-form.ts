/** Talep formu: ön doldurma, doğrulama ve (yapılandırıldıysa) gerçek gönderim. */

const LABELS: Record<string, string> = {
  ilgi: 'İlgi alanı',
  ihtiyac: 'İhtiyaç',
  katilimci: 'Tahmini katılımcı sayısı',
  zaman: 'Planlanan dönem',
  ad: 'Ad soyad',
  kurum: 'Kurum',
  eposta: 'E-posta',
  telefon: 'Telefon',
};

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  if (!form) return;

  const endpoint = form.dataset.endpoint?.trim() || '';
  const email = form.dataset.email?.trim() || '';
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const statusBox = form.querySelector<HTMLElement>('[data-status]')!;
  const actions = form.querySelector<HTMLElement>('[data-actions]')!;
  const copyBtn = form.querySelector<HTMLButtonElement>('[data-copy]')!;
  const copyLabel = form.querySelector<HTMLElement>('[data-copy-label]')!;
  const mailLink = form.querySelector<HTMLAnchorElement>('[data-mailto]')!;
  const mailHint = form.querySelector<HTMLElement>('[data-mail-hint]')!;

  // --- URL'den ön doldurma (ör. /iletisim/?ilgi=egitim,atolye&ihtiyac=...) ---
  const params = new URLSearchParams(location.search);
  const pre = (params.get('ilgi') || '').split(',').filter(Boolean);
  form.querySelectorAll<HTMLInputElement>('input[name="ilgi"]').forEach((cb) => {
    if (pre.includes(cb.value)) cb.checked = true;
  });
  const need = params.get('ihtiyac');
  const textarea = form.querySelector<HTMLTextAreaElement>('[name="ihtiyac"]')!;
  if (need && !textarea.value) textarea.value = `${need.slice(0, 300)}\n\n`;

  // --- Doğrulama ---
  const required = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]'));

  const errorFor = (el: Element) => {
    const id = el.getAttribute('aria-describedby');
    return id ? form.querySelector<HTMLElement>(`#${id}`) : null;
  };

  const validate = (el: HTMLInputElement | HTMLTextAreaElement) => {
    let ok: boolean;
    if (el instanceof HTMLInputElement && el.type === 'checkbox') ok = el.checked;
    else if (el instanceof HTMLTextAreaElement) ok = el.value.trim().length >= 10;
    else if (el.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
    else ok = el.value.trim().length > 0;
    el.setAttribute('aria-invalid', String(!ok));
    const err = errorFor(el);
    if (err) err.hidden = ok;
    return ok;
  };

  required.forEach((el) => {
    el.addEventListener('blur', () => {
      if (el.value || el.getAttribute('aria-invalid') === 'true') validate(el);
    });
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validate(el);
    });
    el.addEventListener('change', () => {
      if (el.getAttribute('aria-invalid') === 'true') validate(el);
    });
  });

  const collect = () => {
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    const ilgiValues = fd.getAll('ilgi') as string[];
    const ilgiLabels = ilgiValues.map(
      (v) => form.querySelector<HTMLInputElement>(`input[name="ilgi"][value="${v}"]`)?.nextElementSibling?.textContent?.trim() || v,
    );
    data.ilgi = ilgiLabels.join(', ');
    for (const key of ['ihtiyac', 'katilimci', 'zaman', 'ad', 'kurum', 'eposta', 'telefon']) {
      data[key] = String(fd.get(key) || '').trim();
    }
    return data;
  };

  const summary = (data: Record<string, string>) =>
    Object.entries(data)
      .filter(([, v]) => v)
      .map(([k, v]) => `${LABELS[k] ?? k}: ${v}`)
      .join('\n');

  const showStatus = (state: 'ok' | 'error' | 'offline', data?: Record<string, string>) => {
    statusBox.hidden = false;
    statusBox.querySelectorAll<HTMLElement>('[data-state]').forEach((el) => (el.hidden = el.dataset.state !== state));
    actions.hidden = state === 'ok';
    if (data && state !== 'ok') {
      const text = summary(data);
      copyBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(text);
          copyLabel.textContent = 'Kopyalandı';
        } catch {
          copyLabel.textContent = 'Kopyalanamadı — metni elle seçin';
        }
        setTimeout(() => (copyLabel.textContent = 'Talep metnini kopyala'), 2600);
      };
      if (email) {
        mailLink.hidden = false;
        mailHint.hidden = false;
        mailLink.href = `mailto:${email}?subject=${encodeURIComponent(
          `Talep: ${data.kurum || 'Kurumsal talep'}`,
        )}&body=${encodeURIComponent(text)}`;
      }
    }
    statusBox.focus({ preventScroll: true });
    statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const results = required.map((el) => validate(el));
    const firstInvalid = required[results.indexOf(false)];
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    // Bot tuzağı doluysa sessizce durdur
    const hp = form.querySelector<HTMLInputElement>('[name="web"]');
    if (hp?.value) return;

    const data = collect();

    if (!endpoint) {
      showStatus('offline', data);
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = 'Gönderiliyor…';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _konu: `Web talebi — ${data.kurum}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.querySelectorAll<HTMLElement>('fieldset, .cform__submit').forEach((el) => (el.hidden = true));
      showStatus('ok');
    } catch {
      showStatus('error', data);
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Talebi gönder';
    }
  });
}
