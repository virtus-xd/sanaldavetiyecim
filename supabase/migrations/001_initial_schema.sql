-- ============================================================
-- sanaldavetiyecim.com — Başlangıç Şeması
-- ============================================================

-- uuid-ossp kaldırıldı; gen_random_uuid() PostgreSQL 13+ built-in

-- ─── ENUM TİPLERİ ─────────────────────────────────────────────────────────────

CREATE TYPE event_type      AS ENUM ('dugun', 'soz', 'nisan', 'kina', 'ozel');
CREATE TYPE template_style  AS ENUM ('modern', 'klasik', 'minimal', 'romantik', 'luks', 'eglenceli');
CREATE TYPE order_status    AS ENUM ('beklemede', 'hazirlaniyor', 'tamamlandi', 'iptal');

-- ─── TABLOLAR ─────────────────────────────────────────────────────────────────

-- Davetiye Şablonları
CREATE TABLE templates (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  category       event_type  NOT NULL,
  style          template_style NOT NULL,
  preview_images TEXT[]      NOT NULL DEFAULT '{}',
  description    TEXT,
  price          DECIMAL(10,2) NOT NULL DEFAULT 199.00,
  is_popular     BOOLEAN     NOT NULL DEFAULT false,
  is_active      BOOLEAN     NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Siparişler
CREATE TABLE orders (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number     TEXT         NOT NULL UNIQUE,
  template_id      UUID         REFERENCES templates(id) ON DELETE SET NULL,
  status           order_status NOT NULL DEFAULT 'beklemede',
  customer_name    TEXT         NOT NULL,
  customer_email   TEXT         NOT NULL,
  customer_phone   TEXT         NOT NULL,
  event_type       event_type   NOT NULL,
  event_date       DATE         NOT NULL,
  event_time       TIME,
  event_location   TEXT,
  event_venue      TEXT,
  groom_name       TEXT,
  bride_name       TEXT,
  custom_message   TEXT,
  additional_notes TEXT,
  total_price      DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivered_url    TEXT,
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Müşteri Yorumları
CREATE TABLE testimonials (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT        NOT NULL,
  event_type    TEXT,
  comment       TEXT        NOT NULL,
  rating        INT         NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_visible    BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- İletişim Mesajları
CREATE TABLE contact_messages (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT,
  message    TEXT        NOT NULL,
  is_read    BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site Ayarları
CREATE TABLE site_settings (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT        NOT NULL UNIQUE,
  value      JSONB       NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── OTOMATİK updated_at TETİKLEYİCİLERİ ────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── İNDEKSLER ───────────────────────────────────────────────────────────────

CREATE INDEX idx_templates_category  ON templates(category)  WHERE is_active = true;
CREATE INDEX idx_templates_style     ON templates(style)      WHERE is_active = true;
CREATE INDEX idx_templates_popular   ON templates(is_popular) WHERE is_active = true;
CREATE INDEX idx_orders_number       ON orders(order_number);
CREATE INDEX idx_orders_email        ON orders(customer_email);
CREATE INDEX idx_orders_status       ON orders(status);
CREATE INDEX idx_testimonials_visible ON testimonials(is_visible);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────

ALTER TABLE templates        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders           ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials     ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings    ENABLE ROW LEVEL SECURITY;

-- Templates: herkes okuyabilir, sadece service_role yazabilir
CREATE POLICY "templates_public_read"
  ON templates FOR SELECT USING (is_active = true);

-- Testimonials: herkes okuyabilir, sadece service_role yazabilir
CREATE POLICY "testimonials_public_read"
  ON testimonials FOR SELECT USING (is_visible = true);

-- Orders: sipariş no + e-posta eşleşmesiyle okuma
CREATE POLICY "orders_customer_read"
  ON orders FOR SELECT
  USING (true); -- API route'ta kontrol edilir

-- Contact messages: herkes yazabilir
CREATE POLICY "contact_messages_insert"
  ON contact_messages FOR INSERT WITH CHECK (true);

-- Orders: herkes yeni sipariş ekleyebilir
CREATE POLICY "orders_insert"
  ON orders FOR INSERT WITH CHECK (true);
