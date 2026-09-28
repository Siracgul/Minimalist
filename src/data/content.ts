/**
 * Sitede birden fazla yerde kullanılan içerikler.
 * Metinleri buradan güncelleyebilirsiniz; sayfalar bu verileri otomatik kullanır.
 */

export type ServiceKey = 'egitim' | 'atolye' | 'organizasyon';
export type Motif = 'align' | 'layers' | 'field';

export interface Service {
  key: ServiceKey;
  index: string;
  title: string;
  href: string;
  motif: Motif;
  summary: string;
  keywords: string[];
}

export const services: Service[] = [
  {
    key: 'egitim',
    index: '01',
    title: 'Kurumsal Eğitim',
    href: '/kurumsal-egitim/',
    motif: 'align',
    summary:
      'Kurumun gerçek ihtiyacından yola çıkan, katılımcıyı sürecin içine alan ve ertesi gün işe taşınabilen öğrenme deneyimleri.',
    keywords: ['İhtiyaca göre içerik', 'Katılımcı etkileşimi', 'İş hayatıyla bağ'],
  },
  {
    key: 'atolye',
    index: '02',
    title: 'Atölye & Kültür-Sanat',
    href: '/atolye-ve-kultur-sanat/',
    motif: 'layers',
    summary:
      'Birlikte üretmeye, farklı bakış açılarıyla düşünmeye ve kültürel paylaşıma alan açan atölyeler, söyleşiler ve buluşmalar.',
    keywords: ['Atölyeler', 'Söyleşiler', 'Kültürel buluşmalar'],
  },
  {
    key: 'organizasyon',
    index: '03',
    title: 'Etkinlik & Organizasyon',
    href: '/etkinlik-ve-organizasyon/',
    motif: 'field',
    summary:
      'Amacı, içeriği, katılımcı deneyimi ve uygulamasıyla tek bir bütün olarak düşünülmüş kurumsal buluşmalar.',
    keywords: ['Amaç', 'İçerik', 'Katılımcı deneyimi', 'Uygulama'],
  },
];

/** Çalışma yaklaşımı adımları */
export const process = [
  {
    title: 'Dinlemek',
    subtitle: 'İhtiyacı anlamak',
    text: 'Önce soruyoruz: Bu konu neden şimdi gündemde? Kimler katılacak, sonunda ne değişmiş olmalı? Kurumun diliyle, gündemiyle ve beklentileriyle tanışıyoruz.',
  },
  {
    title: 'Çerçevelemek',
    subtitle: 'Amacı netleştirmek',
    text: 'Duyduklarımızı sade bir çerçeveye dönüştürüyoruz: hedef, katılımcılar, süre, format ve başarı ölçütü. Neyin yapılacağı kadar neyin yapılmayacağı da bu aşamada belli olur.',
  },
  {
    title: 'Tasarlamak',
    subtitle: 'Deneyimi kurgulamak',
    text: 'İçeriği, akışı, etkileşim anlarını ve mekânı birlikte düşünüyoruz. Eğitmen, sanatçı ya da konuşmacıyı ihtiyaca göre belirliyor; taslağı sizinle birlikte olgunlaştırıyoruz.',
  },
  {
    title: 'Uygulamak',
    subtitle: 'Günü yönetmek',
    text: 'Hazırlıktan kapanışa kadar süreçteyiz. Katılımcıların karşılanmasından zamanlamaya, teknik detaylardan içerik akışına kadar her şeyin yerinde olmasını sağlıyoruz.',
  },
  {
    title: 'Değerlendirmek',
    subtitle: 'Geriye bakmak, ileriye taşımak',
    text: 'Katılımcı geri bildirimlerini ve kendi gözlemlerimizi sizinle paylaşıyoruz. Öğrenilenin işe nasıl taşınacağına ve bir sonraki adımın ne olabileceğine birlikte bakıyoruz.',
  },
];

/** Minimalist'in konumlandığı kesişim */
export const intersection = [
  {
    key: 'insan',
    title: 'İnsan',
    text: 'Her şey katılımcıyla başlar: kim olduğu, neye ihtiyaç duyduğu, salondan neyle çıkmak istediği.',
  },
  {
    key: 'ogrenme',
    title: 'Öğrenme',
    text: 'Bilgi aktarmakla yetinmeyen; deneyerek, tartışarak ve uygulayarak kalıcı hâle gelen öğrenme.',
  },
  {
    key: 'kultur',
    title: 'Kültür',
    text: 'Sanatın ve kültürün düşünmeyi açan, insanlar arasında ortak bir dil kuran gücü.',
  },
  {
    key: 'bulusma',
    title: 'Buluşma',
    text: 'İnsanları aynı zamanda ve aynı mekânda, anlamlı bir içerik etrafında bir araya getirmek.',
  },
];

/** Form ilgi alanları (ContactForm ve NeedFinder birlikte kullanır) */
export const interests = [
  { value: 'egitim', label: 'Kurumsal eğitim' },
  { value: 'atolye', label: 'Atölye' },
  { value: 'kultur', label: 'Kültür-sanat buluşması' },
  { value: 'organizasyon', label: 'Etkinlik & organizasyon' },
  { value: 'belirsiz', label: 'Henüz net değil' },
];

/** Ana sayfadaki "ihtiyaç" seçicisi */
export const needs = [
  {
    quote: 'Ekipler arasındaki iletişim zayıfladı, ama klasik bir eğitim istemiyoruz.',
    answer:
      'Önce iletişimin nerede koptuğunu anlamaya çalışırız. Ardından katılımcıların kendi örnekleri üzerinden çalıştığı uygulamalı bir eğitim kurgular; gerekirse ekipleri birlikte üretmeye davet eden bir atölyeyle destekleriz.',
    services: ['egitim', 'atolye'] as ServiceKey[],
    interests: ['egitim', 'atolye'],
  },
  {
    quote: 'Yeni yöneticilerimiz için sahici bir gelişim süreci arıyoruz.',
    answer:
      'Tek seferlik bir oturum yerine birkaç buluşmaya yayılan bir süreç öneririz. Her buluşma bir öncekinin üzerine kurulur; aradaki haftalarda öğrenilenler sahada denenir ve bir sonraki oturumda birlikte ele alınır.',
    services: ['egitim'] as ServiceKey[],
    interests: ['egitim'],
  },
  {
    quote: 'Yıl sonu buluşmamız bu kez yalnızca bir yemek olmasın.',
    answer:
      'Önce buluşmanın bu yıl ne söylemesi gerektiğini birlikte tanımlarız. Akışı bir söyleşi, kısa bir atölye ya da kültürel bir deneyimle zenginleştirir; davetten kapanışa kadar anlamlı bir bütüne dönüştürürüz.',
    services: ['organizasyon', 'atolye'] as ServiceKey[],
    interests: ['organizasyon', 'kultur'],
  },
  {
    quote: 'Çalışanlarımızla kültür-sanat üzerinden farklı bir bağ kurmak istiyoruz.',
    answer:
      'Kurumun gündemine ve katılımcıların ilgisine uygun atölye, söyleşi ya da kültürel buluşmaları bir program hâlinde kurgularız. Tek seferlik bir buluşma da olabilir, yıl boyuna yayılan bir seri de.',
    services: ['atolye'] as ServiceKey[],
    interests: ['kultur', 'atolye'],
  },
  {
    quote: 'Ne istediğimizi tam bilmiyoruz; ama bir şeyin değişmesi gerektiğini biliyoruz.',
    answer:
      'Bu çok olağan. İlk görüşmenin amacı zaten bu: ihtiyacı birlikte adlandırmak. Ardından size uygun formatı önerir, gerekiyorsa küçük ve ölçülebilir bir adımla başlarız.',
    services: [] as ServiceKey[],
    interests: ['belirsiz'],
  },
];
