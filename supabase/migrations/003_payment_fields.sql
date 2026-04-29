-- ============================================================
-- Ödeme takip alanları — orders tablosuna ekleme
-- ============================================================

ALTER TABLE orders ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'beklemede'
  CHECK (payment_status IN ('beklemede', 'onaylandi', 'iptal'));

ALTER TABLE orders ADD COLUMN payment_method TEXT NOT NULL DEFAULT 'havale';

ALTER TABLE orders ADD COLUMN payment_note TEXT;

ALTER TABLE orders ADD COLUMN payment_confirmed_at TIMESTAMPTZ;

-- Ödeme durumuna göre filtreleme indeksi
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
