# Minimalist — Kurumsal Eğitim & Organizasyon

Minimalist'in web sitesi. [Astro](https://astro.build) ile yazılmış statik bir site. Çıktı saf HTML/CSS ve küçük, sayfaya özel JavaScript dosyalarından oluşur; herhangi bir statik barındırma servisinde (Netlify, Vercel, Cloudflare Pages, klasik hosting) yayınlanabilir.

## Çalıştırma

Node.js 22 veya üstü gerekir.

```bash
npm install
npm run dev       # geliştirme sunucusu → http://localhost:4321
npm run build     # yayın çıktısı → dist/
npm run preview   # dist/ çıktısını yerelde önizleme
```

Yayın adresi belli olduğunda derlemeyi adresle birlikte çalıştırın. Canonical bağlantılar, Open Graph, `sitemap.xml` ve `robots.txt` bu adresi kullanır:

```bash
PUBLIC_SITE_URL=https://www.alanadi.com npm run build
```

## Sayfalar

| Adres | Dosya |
| --- | --- |
| `/` | `src/pages/index.astro` (bölümler `src/components/home/` altında) |
| `/kurumsal-egitim/` | `src/pages/kurumsal-egitim.astro` |
| `/atolye-ve-kultur-sanat/` | `src/pages/atolye-ve-kultur-sanat.astro` |
| `/etkinlik-ve-organizasyon/` | `src/pages/etkinlik-ve-organizasyon.astro` |
| `/yaklasim/` | `src/pages/yaklasim.astro` |
| `/iletisim/` | `src/pages/iletisim.astro` + `src/components/ContactForm.astro` |
| 404 | `src/pages/404.astro` |

## İçerikler nereden değişir?

- **`src/data/site.ts`**: Site adı, açıklama, menü, **iletişim bilgileri, sosyal medya, form gönderim adresi, KVKK metni bağlantısı**. Boş bırakılan alanlar sitede hiç görünmez.
- **`src/data/content.ts`**: Birden fazla sayfada kullanılan metinler: üç hizmet alanı, beş adımlı çalışma süreci, "İnsan · Öğrenme · Kültür · Buluşma" kesişimi, ana sayfadaki örnek ihtiyaçlar ve form ilgi alanları.
- **`src/data/collections.ts`**: Sonradan eklenecek gerçek içerikler. Şu an hepsi **bilinçli olarak boş**:
  - `trainingPrograms`: eğitim başlıkları (boşken "yakında" notu gösterilir)
  - `culturalPrograms`: atölye / söyleşi / kültürel buluşma takvimi (boşken "yakında" notu gösterilir)
  - `pastProjects`: gerçekleşmiş etkinlikler (boşken bölüm hiç görünmez)
  - `references`, `testimonials`, `team`: referanslar, görüşler, ekip (boşken bölüm hiç görünmez)

  Kayıt eklediğinizde ilgili bölüm kendiliğinden oluşur. Görselleri `public/images/` altına koyup yolunu `'/images/dosya.jpg'` şeklinde yazın.
- Sayfaya özel metinler (ör. eğitim sayfasındaki "Hangi anlarda" listesi) ilgili `.astro` dosyasının başındaki `---` bloğunda dizi olarak durur.

Başlıklarda `*yıldız*` arasına alınan kelimeler bordo italik vurgulanır; cümle sonundaki nokta logodaki noktaya gönderme olarak bordo gösterilir.

## Talep formu: entegrasyon durumu

Form **şu an hiçbir yere gönderim yapmıyor**, çünkü henüz bir gönderim servisi tanımlı değil. Bu durumda kullanıcı formu doldurup gönderdiğinde site sahte bir başarı mesajı göstermez. Bunun yerine şunu açıkça söyler: *"Bu form henüz bir gönderim sistemine bağlı değil. Talebiniz gönderilmedi."* Kullanıcıya talep metnini kopyalama imkânı sunulur. `contact.email` doluysa e-posta uygulamasıyla gönderme bağlantısı da çıkar.

Formu gerçek bir sisteme bağlamak için `src/data/site.ts` içindeki `form.endpoint` alanını doldurun ya da derlemede `PUBLIC_FORM_ENDPOINT` ortam değişkenini verin. Form, alanları JSON olarak bu adrese `POST` eder (`Accept: application/json`). Formspree, Getform, Basin gibi servisler ya da kendi API'niz kullanılabilir. "Talebiniz bize ulaştı" mesajı yalnızca sunucu başarılı (2xx) yanıt verirse gösterilir; hata olursa kullanıcı bilgilendirilir ve yazdıkları kaybolmaz.

Gönderilen alanlar: `ilgi`, `ihtiyac`, `katilimci`, `zaman`, `ad`, `kurum`, `eposta`, `telefon`, `_konu`. Formda bot tuzağı (`web` alanı) ve istemci tarafı doğrulama vardır.

## Gerçek bilgilerle tamamlanması gerekenler

- [ ] İletişim: e-posta, telefon, adres, harita bağlantısı (`src/data/site.ts → contact`)
- [ ] Sosyal medya hesapları (`src/data/site.ts → social`)
- [ ] Form gönderim adresi (`form.endpoint`) ve KVKK aydınlatma metni bağlantısı (`form.privacyUrl`)
- [ ] Yayın alan adı (`PUBLIC_SITE_URL`)
- [ ] Eğitim programları, atölye/etkinlik takvimi, gerçekleşmiş projeler, referanslar, görüşler, ekip (`src/data/collections.ts`)
- [ ] Logonun orijinal vektör dosyası (aşağıya bakın)

## Marka varlıkları

- `src/components/Logo.astro` (ana logo) ve `src/components/LogoMark.astro` ("M." ikonu), paylaşılan logo görselinden **birebir vektörleştirildi**. Şekil ve oran değiştirilmedi, yazı fontla taklit edilmedi, logonun altına slogan eklenmedi. Açık zeminde bordo, koyu zeminde krem renkte kullanılıyor. Tasarımcıdan orijinal SVG/AI dosyası gelirse bu iki bileşendeki `path` verilerini onunla değiştirmeniz önerilir. Aynı durum `public/logo.svg`, `public/favicon.svg`, `public/*.png` ve `public/og.png` için de geçerli.
- Renkler `src/styles/global.css` içindeki `:root` değişkenlerinde tanımlı. Metin/zemin kombinasyonlarının kontrastı WCAG AA'ya göre kontrol edildi. Açık turkuaz (#7A9CA0) açık zeminde yalnızca dekoratif öğelerde kullanılıyor.

## Kullanılan varlıklar ve lisanslar

- **Yazı tipleri**: Newsreader ve Hanken Grotesk (SIL Open Font License 1.1). Fontsource paketleriyle siteyle birlikte sunuluyor, dışarıya istek atılmıyor. İkisi de Türkçe karakterleri (ç, ğ, ı, İ, ö, ş, ü) destekliyor.
- **Fotoğraf ve video**: Kullanılmadı. Stok görseller Minimalist'in gerçekleştirdiği işler gibi algılanabileceği için tercih edilmedi. Görsel anlatım, koda dayalı özgün animasyonlarla kuruldu: ana sayfadaki "buluşma noktası" canvas animasyonu ve her hizmet alanının SVG motifi. Gerçek proje fotoğrafları geldiğinde `collections.ts` üzerinden eklenebilir.
- İkonlar ve tüm grafikler bu proje için çizildi.

## Erişilebilirlik ve performans notları

- Klavye ile tam gezinme: içeriğe geç bağlantısı, görünür odak halkaları, mobil menüde odak tuzağı ve Esc ile kapanma (`<dialog>`), ihtiyaç seçicide ok tuşlarıyla sekme gezinmesi.
- `prefers-reduced-motion` açıkken animasyonlar durur, hero tek bir durağan kare olarak çizilir, yatay kaydırmalı süreç bölümü dikey listeye döner.
- JavaScript kapalıyken bütün içerik görünür kalır.
- Hero animasyonu ekranda değilken ya da sekme arka plandayken durur. Piksel yoğunluğu 2x ile sınırlıdır.
- Sayfalar arası geçişler tarayıcının yerel View Transitions özelliğini kullanır (JS gerektirmez; desteklemeyen tarayıcılarda normal geçiş yapılır).
