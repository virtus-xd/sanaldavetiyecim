"""
9 temanin tum ekran goruntülerini al
"""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = 'C:/Users/erdem/Desktop/sanaldavetiyecim/public/template-previews'
os.makedirs(OUTPUT_DIR, exist_ok=True)

BASE_URL = 'http://localhost:5174'

THEMES = [
    {'id': 'classic',  'label': 'Zümrüt & Altın'},
    {'id': 'floral',   'label': 'Romantik Çiçekli'},
    {'id': 'modern',   'label': 'Modern Minimalist'},
    {'id': 'rustic',   'label': 'Rustic Boho'},
    {'id': 'ocean',    'label': 'Ocean Breeze'},
    {'id': 'starry',   'label': 'Starry Night'},
    {'id': 'autumn',   'label': 'Autumn Romance'},
    {'id': 'gatsby',   'label': 'Luxury Gatsby'},
    {'id': 'vintage',  'label': 'Pastel Vintage'},
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for theme in THEMES:
        tid = theme['id']
        label = theme['label']
        print(f"\n=== {label} ({tid}) ===")

        # Sayfa aç ve localStorage'a temayı yaz
        page = browser.new_page(viewport={'width': 1280, 'height': 900})
        page.goto(BASE_URL)
        page.wait_for_load_state('networkidle')
        page.evaluate(f"localStorage.setItem('selectedTheme', '{tid}')")

        # Sayfayı yenile (tema uygulanır)
        page.reload()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        # 1. Zarf kapak (cover)
        cover_path = f'{OUTPUT_DIR}/{tid}_cover.png'
        page.screenshot(path=cover_path)
        print(f"  Cover: {cover_path}")

        # 2. Zarfa tıkla ve aç
        try:
            page.mouse.click(640, 450)
            page.wait_for_timeout(3000)

            # 3. İlk bölüm (giriş ekranı)
            intro_path = f'{OUTPUT_DIR}/{tid}_intro.png'
            page.screenshot(path=intro_path)
            print(f"  Intro: {intro_path}")

            # 4. Scroll ederek bölümleri yakala
            page_height = page.evaluate("document.body.scrollHeight")
            viewport_h = 900
            print(f"  Sayfa yüksekliği: {page_height}px")

            for i, scroll_y in enumerate(range(0, min(page_height, 3600), viewport_h)):
                page.evaluate(f"window.scrollTo(0, {scroll_y})")
                page.wait_for_timeout(800)
                section_path = f'{OUTPUT_DIR}/{tid}_section_{i+1}.png'
                page.screenshot(path=section_path)

            # 5. Full page screenshot
            full_path = f'{OUTPUT_DIR}/{tid}_full.png'
            page.screenshot(path=full_path, full_page=True)
            print(f"  Full page: {full_path}")

        except Exception as e:
            print(f"  Hata: {e}")

        page.close()

    browser.close()

print("\nTum temalar tamamlandi!")
