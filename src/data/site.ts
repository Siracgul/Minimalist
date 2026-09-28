/**
 * Site genel ayarları.
 *
 * Boş bırakılan (null / '') alanlar sitede hiç gösterilmez.
 * Gerçek bilgiler netleştiğinde yalnızca bu dosyayı doldurmanız yeterli.
 */

export const site = {
  name: 'Minimalist',
  legalName: 'Minimalist Kurumsal Eğitim & Organizasyon',
  descriptor: 'Kurumsal Eğitim & Organizasyon',
  description:
    'Minimalist; kurumlar için eğitimler, atölyeler, kültür-sanat buluşmaları ve organizasyonlar tasarlar. İhtiyacı dinler, deneyimi özenle kurgular, uygulamayı baştan sona üstlenir.',
  /** Yayın adresi (sonda / olmadan). Ör: 'https://www.minimalist.com.tr'. astro.config.mjs de bunu kullanır. */
  url: import.meta.env.PUBLIC_SITE_URL || '',
  locale: 'tr_TR',
};

/** İletişim bilgileri — gerçek bilgiler geldiğinde doldurun. Boş olanlar gösterilmez. */
export const contact = {
  email: '', // ör. 'merhaba@alanadi.com'
  phone: '', // ör. '+90 212 000 00 00' (görünen biçim)
  address: '', // ör. 'Mahalle, Cadde No, İlçe / İl'
  mapUrl: '', // ör. Google Maps bağlantısı
};

/** Sosyal medya — boş olanlar gösterilmez. */
export const social: { label: string; url: string }[] = [
  // { label: 'Instagram', url: 'https://instagram.com/...' },
  // { label: 'LinkedIn', url: 'https://linkedin.com/company/...' },
];

/**
 * Talep formu gönderimi.
 *
 * endpoint: Formu JSON olarak POST eden bir servis adresi (Formspree, Getform, Basin
 * ya da kendi API'niz). Boşsa form hiçbir yere gönderim yapmaz ve kullanıcıya
 * bunu dürüstçe söyler. Ortam değişkeni ile de verilebilir: PUBLIC_FORM_ENDPOINT
 *
 * privacyUrl: KVKK aydınlatma metninin adresi. Doluysa onay kutusunda bağlantı olarak gösterilir.
 */
export const form = {
  endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
  privacyUrl: '',
};

export const nav = [
  { href: '/kurumsal-egitim/', label: 'Kurumsal Eğitim' },
  { href: '/atolye-ve-kultur-sanat/', label: 'Atölye & Kültür-Sanat' },
  { href: '/etkinlik-ve-organizasyon/', label: 'Etkinlik & Organizasyon' },
  { href: '/yaklasim/', label: 'Yaklaşım' },
];
