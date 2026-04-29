-- ============================================================
-- Template → tema eşleştirme alanı
-- ============================================================

ALTER TABLE templates ADD COLUMN theme_key TEXT;

-- Mevcut template'ler için tema eşleştirmesi
UPDATE templates SET theme_key = 'classic' WHERE slug = 'zarif-altin';
UPDATE templates SET theme_key = 'modern'  WHERE slug = 'modern-minimal';
UPDATE templates SET theme_key = 'floral'  WHERE slug = 'romantik-gul';
UPDATE templates SET theme_key = 'starry'  WHERE slug = 'klasik-lacivert';
UPDATE templates SET theme_key = 'vintage' WHERE slug = 'bahar-cicekleri';
UPDATE templates SET theme_key = 'autumn'  WHERE slug = 'kina-gecesi';
UPDATE templates SET theme_key = 'rustic'  WHERE slug = 'boho-doga';
UPDATE templates SET theme_key = 'gatsby'  WHERE slug = 'siyah-beyaz';
