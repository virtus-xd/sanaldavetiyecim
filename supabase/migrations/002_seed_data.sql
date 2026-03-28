-- ============================================================
-- Örnek veri — geliştirme ve test ortamı için
-- ============================================================

INSERT INTO templates (name, slug, category, style, preview_images, description, price, is_popular) VALUES
(
  'Zarif Altın', 'zarif-altin', 'dugun', 'luks',
  ARRAY['https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80'],
  'Altın ve krem tonlarında, zarif çiçek motifleri ile süslenmiş lüks düğün davetiyesi. Her detayda incelik taşır.',
  299.00, true
),
(
  'Modern Minimal', 'modern-minimal', 'dugun', 'minimal',
  ARRAY['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80'],
  'Sade çizgiler ve beyaz alan kullanımıyla tasarlanmış modern minimalist davetiye. Şıklık sadelikte saklıdır.',
  199.00, true
),
(
  'Romantik Gül', 'romantik-gul', 'nisan', 'romantik',
  ARRAY['https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=600&q=80'],
  'Pembe gül motifleri ve yumuşak renk geçişleriyle bezeli romantik nişan davetiyesi.',
  249.00, true
),
(
  'Klasik Lacivert', 'klasik-lacivert', 'dugun', 'klasik',
  ARRAY['https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80'],
  'Lacivert ve altın rengi uyumuyla hazırlanmış klasik ve zamansız düğün davetiyesi.',
  279.00, false
),
(
  'Bahar Çiçekleri', 'bahar-cicekleri', 'soz', 'romantik',
  ARRAY['https://images.unsplash.com/photo-1490750967868-88df5691cc11?w=600&q=80'],
  'Renkli bahar çiçekleri ve pastel tonlarla hazırlanmış neşeli söz davetiyesi.',
  219.00, true
),
(
  'Kına Gecesi', 'kina-gecesi', 'kina', 'eglenceli',
  ARRAY['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80'],
  'Kırmızı, turuncu ve altın renklerinin dansıyla hazırlanan coşkulu kına gecesi davetiyesi.',
  189.00, false
),
(
  'Boho Doğa', 'boho-doga', 'dugun', 'modern',
  ARRAY['https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80'],
  'Doğa temalı, pamuk çiçekleri ve yeşil yaprak motifleriyle süslenmiş boho düğün davetiyesi.',
  259.00, true
),
(
  'Siyah & Beyaz', 'siyah-beyaz', 'dugun', 'modern',
  ARRAY['https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=600&q=80'],
  'Siyah-beyaz kontrast ve geometrik desenlerle hazırlanmış çarpıcı modern düğün davetiyesi.',
  229.00, false
);

-- Örnek yorumlar
INSERT INTO testimonials (customer_name, event_type, comment, rating) VALUES
('Ayşe & Mehmet', 'Düğün',  'Davetiyemiz gerçekten mükemmeldi! Tüm misafirlerimiz ne kadar şık olduğunu söyledi. Hızlı teslimat ve özenli hizmet için çok teşekkürler.', 5),
('Zeynep & Ali',  'Nişan',  'Nişan davetiyemizi çok beğendik. Tasarım tam istediğimiz gibiydi ve linki paylaşmak çok kolaydı. Kesinlikle tavsiye ederim!', 5),
('Elif & Burak',  'Düğün',  'Harika bir hizmet aldık. Özel isteklerimizi dikkate alarak benzersiz bir davetiye hazırladılar. Fiyat/performans çok iyi.', 5),
('Selin & Emre',  'Söz',    'Söz törenimiz için hazırlanan davetiye tam hayalimizdekileydi. Gece çok güzel geçti, teşekkürler!', 4),
('Fatma & Kaan',  'Kına',   'Kına gecesi davetiyeleri rengarenk ve eğlenceli oldu. Misafirlerimiz çok beğendi, teşekkürler!', 5);
