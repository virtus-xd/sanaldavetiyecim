-- ============================================================
-- Yeni temalar: Sage Bahçe, Boho Krem, Bahar Çiçeği
-- ============================================================
-- Galeri destekli, davetiye-main'den uyarlanmış 3 yeni tema.

INSERT INTO templates (name, slug, preview_images, description, price, is_popular, theme_key)
VALUES
  ('Sage Bahçe',     'sage-bahce',     ARRAY['/themes/sage/envelope.webp',     '/themes/sage/bg.webp'],
   'Adaçayı yeşili tonlarında, yumuşak çiçek motifleri ve cam efektli kart tasarımı ile zarif bir doğal davetiye.',
   259.00, true, 'sage'),
  ('Boho Krem',      'boho-krem',      ARRAY['/themes/boho/envelope.webp',     '/themes/boho/bg.webp'],
   'Krem ve toprak tonlarında, kemerli kart formu ve el yazısı tipografi ile sıcak boho davetiye tasarımı.',
   249.00, true, 'boho'),
  ('Bahar Çiçeği',   'bahar-cicegi',   ARRAY['/themes/blossom/envelope.webp',  '/themes/blossom/hero-bg.webp'],
   'Soluk yeşil ve beyaz çiçek paletinde, glassmorphism kartlar ve katmanlı çiçek arka planları ile taze bir bahar temalı davetiye.',
   269.00, true, 'blossom');
