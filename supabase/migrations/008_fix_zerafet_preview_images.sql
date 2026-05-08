-- ============================================================
-- Zerafet temasının kapak ve detay görsellerini gerçek dosyalara yönelt
-- ============================================================
-- Önceki kayıt /invitation-assets/... yoluna bakıyordu (dosya yok).
-- Sadece header bg (kapak) ve zarf görselini gösteriyoruz.

UPDATE templates
SET preview_images = ARRAY[
  '/themes/flowers-pink/envelope.png',
  '/themes/flowers-pink/bg.png'
],
updated_at = NOW()
WHERE slug = 'zerafet';
