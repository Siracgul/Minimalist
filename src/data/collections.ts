/**
 * Sonradan eklenecek gerçek içerikler.
 *
 * Bu listeler şimdilik bilinçli olarak BOŞ. Boş olduğu sürece ilgili bölümler
 * sitede görünmez (ya da "yakında" notu gösterilir). Gerçek bilgi geldiğinde
 * örnekteki yapıya uygun kayıt eklemeniz yeterli; tasarım otomatik oluşur.
 *
 * Görseller için: dosyayı /public/images/ altına koyun ve yolu '/images/dosya.jpg'
 * şeklinde yazın.
 */

/** Eğitim programları / başlıkları — /kurumsal-egitim sayfasında listelenir */
export interface TrainingProgram {
  title: string;
  summary: string;
  format?: string; // ör. 'Yarım gün · Yüz yüze'
  audience?: string; // ör. 'Yeni yöneticiler'
}
export const trainingPrograms: TrainingProgram[] = [
  // { title: '...', summary: '...', format: '...', audience: '...' },
];

/** Atölye, söyleşi ve kültürel buluşmalar — /atolye-ve-kultur-sanat sayfasında listelenir */
export interface CulturalProgram {
  title: string;
  kind: 'Atölye' | 'Söyleşi' | 'Kültürel buluşma';
  summary: string;
  date?: string; // Kesinleşmişse görünen tarih, ör. '12 Kasım 2026'
  location?: string;
  registrationUrl?: string; // Yalnızca kayıt gerçekten açıksa doldurun
}
export const culturalPrograms: CulturalProgram[] = [
  // { title: '...', kind: 'Atölye', summary: '...', date: '...', location: '...' },
];

/** Gerçekleşmiş etkinlikler / projeler — /etkinlik-ve-organizasyon sayfasında gösterilir */
export interface PastProject {
  title: string;
  client?: string; // Yalnızca izin alınmışsa
  year?: string;
  summary: string;
  image?: string;
  imageAlt?: string;
}
export const pastProjects: PastProject[] = [];

/** Referans kurumlar — /yaklasim sayfasında gösterilir */
export interface Reference {
  name: string;
  logo?: string; // '/images/referanslar/kurum.svg'
  url?: string;
}
export const references: Reference[] = [];

/** Katılımcı / iş ortağı görüşleri — /yaklasim sayfasında gösterilir */
export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
}
export const testimonials: Testimonial[] = [];

/** Ekip — /yaklasim sayfasında gösterilir */
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}
export const team: TeamMember[] = [];
