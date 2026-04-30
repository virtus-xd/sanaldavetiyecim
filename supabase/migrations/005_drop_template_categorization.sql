-- ============================================================
-- Şablon kategorizasyonunu kaldır
-- ============================================================
-- Bir tema artık tek bir etkinlik türü veya stilden bağımsız.
-- category ve style alanları artık zorunlu değil; UI tarafında
-- da bu kolonlar kullanılmıyor.

ALTER TABLE templates ALTER COLUMN category DROP NOT NULL;
ALTER TABLE templates ALTER COLUMN style    DROP NOT NULL;

DROP INDEX IF EXISTS idx_templates_category;
DROP INDEX IF EXISTS idx_templates_style;

-- ============================================================
-- Yeni tema: "Zerafet" (theme_key: flowers-pink)
-- ============================================================

INSERT INTO templates (name, slug, preview_images, description, price, is_popular, theme_key)
VALUES (
  'Zerafet',
  'zerafet',
  ARRAY['/invitation-assets/flowers-pink-envelope.png'],
  'Pudra pembesi ve adaçayı yeşili tonlarında, çiçek motifleriyle bezenmiş zarif davetiye tasarımı.',
  249.00,
  true,
  'flowers-pink'
);
