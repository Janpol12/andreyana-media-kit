# AndreYana Site — Context для следующей сессии

**Дата:** 4 апреля 2026
**Статус:** Задеплоен на andreyana.site ✅ | Домен подключён ✅ | Hero CTA добавлен ✅

---

## Ссылки
- **Живой сайт:** https://andreyana.site
- **Гайд для подписчиков:** https://andreyana.site/guide.html
- **Репозиторий:** https://github.com/Janpol12/andreyana-media-kit.git
- **Локальная папка:** /Users/andrey/Downloads/Agents/andreyana-site

---

## Технологии
- Vanilla HTML/CSS/JS (без фреймворков)
- Lenis smooth scroll v1.0.42 (CDN)
- GitHub Pages (ветка **main**)
- Домен: **andreyana.site** (reg.ru)

## CSS-переменные
- --black: #0c0c0c
- --gold: #c5a367
- --cream: #f9f7f4
- --light-gray: #ece9e4

## i18n система
- Атрибуты: data-i18n / data-i18n-html
- JS объект translations — RU + EN
- localStorage ключ: 'ay-lang'
- encodeSrc() — для URL-кодирования кириллических путей

---

## Как пушить изменения на GitHub

```
cd ~/Downloads/Agents/andreyana-site && git add -A && git commit -m "update" && git push
```

Сайт обновляется через ~1 минуту после пуша.

---

## Локальный просмотр

```
cd ~/Downloads/Agents/andreyana-site && python3 -m http.server 8080
```
Затем открыть: http://localhost:8080

---

## Что сделано в сессии 4 апреля 2026

### Домен andreyana.site
- ✅ Куплен домен andreyana.site на reg.ru
- ✅ Настроены DNS: 4 A-записи GitHub Pages (185.199.108-111.153) + CNAME www → janpol12.github.io
- ✅ Создан CNAME файл в репозитории
- ✅ Все мета-теги исправлены (canonical, OG, JSON-LD) — теперь указывают на andreyana.site
- [ ] Включить Enforce HTTPS в GitHub → Settings → Pages (после подтягивания DNS)

### Улучшения сайта (index.html + style.css)
- ✅ Добавлена CTA кнопка «Обсудить проект →» в Hero section (золотая, ведёт на #contact)
- ✅ Добавлен CTA-блок после видео-секции («Понравился формат? Написать нам →»)
- ✅ Удалён дублирующий canonical тег (был старый GitHub URL)

### Guide.html
- ✅ Секция «Что получилось у нас» расширена до 9 карточек:
  1 день · RU+EN · 0₽ · О нас · 6 видео с рекламой · 25 фото · 9 рилз · Прайс · Связь

### Outreach для отелей
- ✅ Создан Hotel Outreach Kit (outputs/hotels-outreach.html) — 20 отелей + RU/EN шаблоны
- ✅ Разработан формат нестандартного письма (начинать с детали про отель, не с себя)
- ✅ Разобраны 2 письма (MYS, Chekhoff) — плюсы/минусы

---

## ЧТО ЕЩЁ НЕ СДЕЛАНО (приоритет)

### Срочно:
- [ ] **Enforce HTTPS** — GitHub → репозиторий → Settings → Pages → галочка Enforce HTTPS
- [ ] **Google Analytics** — заменить G-XXXXXXXXXX на реальный GA4 ID
  - Зайти: analytics.google.com → создать ресурс GA4 → скопировать Measurement ID
- [ ] **Отзывы** — добавить блок с 2–3 отзывами от брендов (нужны тексты от Андрея)

### Важно:
- [ ] **Статистика** — уточнить реальные цифры у Андрея: сколько брендов / роликов / лет
- [ ] **FAQ на основном сайте** — 5–6 вопросов снимают возражения покупателей
- [ ] **CTA после фото-галереи** — аналогично блоку после видео
- [ ] **Удалить оригинал** «Hotel Four Seasons lobby.mp4» (57MB):
  ```
  rm ~/Downloads/Agents/andreyana-site/images/\ Hotel\ Four\ Seasons\ lobby.mp4
  git add -A && git commit -m "remove large original" && git push
  ```

### Потом:
- [ ] Кейс-секция — 1–2 истории: задача → решение → результат
- [ ] OG-превью протестировать (https://developers.facebook.com/tools/debug/)

---

## Email для рассылки отелям
- **Рабочий email сайта:** andreyanamusic@gmail.com
- **Доп. email:** rivanoxen@gmail.com

---

## Список отелей для UGC-предложения (20 штук)

### 🇷🇺 МОСКВА (6 отелей)

| # | Отель | Адрес | Instagram | Email / Контакт |
|---|-------|-------|-----------|-----------------|
| 1 | **MYS Boutique Hotel 5★** | Кривоколенный пер., 10с4 | @mys_hotel_moscow | reception@mys-hotel.ru |
| 2 | **Chekhoff Hotel · Curio by Hilton 5★** | Петровка | @chekhoffhotelmoscow (34K) | reservations@chekhoffhotel.com · PR: Nina Chernokalskaya (LinkedIn) |
| 3 | **Parradosso Boutique Hotel 5★** | Настасьинский пер., 8к1 | — | info@friendlyinn.ru |
| 4 | **Savoy Hotel Moscow 5★** | Рождественка, 3/6 | @savoymoscow | eng.savoy.ru · Sales: Pavel Korsakov (LinkedIn) |
| 5 | **The Rooms Boutique Hotel 5★** | Таганская | — | sales@mghotels.ru · +7 499 110-92-00 |
| 6 | **Four Seasons Hotel Moscow 5★** | Охотный ряд | — | fourseasons.com/moscow · уже в портфолио! |

### 🇷🇺 САНКТ-ПЕТЕРБУРГ (4 отеля)

| # | Отель | Адрес | Instagram | Email / Контакт |
|---|-------|-------|-----------|-----------------|
| 7 | **Dom Boutique Hotel 5★** | Гангутская ул., 4 | @domboutiquehotel | info@domboutiquehotel.com · +7 812 245-10-40 |
| 8 | **Trezzini Palace Hotel 5★** | Университетская наб., 21 | — | trezzinipalace.com · GM: Marina Makk · +7 812 313-66-22 |
| 9 | **Villa du Prince 5★** | Каменный остров | @villa.prince.hotel | villaduprince.ru |
| 10 | **Золотой Треугольник 4★** | Большая Конюшенная, 12 | — | booking@gthotel.ru · +7 812 490-77-10 |
| 11 | **Taleon Imperial Hotel 5★** | Наб. р. Мойки, 59 | — | taleon.ru |
| 12 | **Kempinski Hotel Moika 22 5★** | Наб. р. Мойки, 22 | — | kempinski.com/stpetersburg |
| 13 | **Belmond Grand Hotel Europe 5★** | Михайловская, 1/7 | — | belmond.com |
| 14 | **W St. Petersburg 5★** | Вознесенский пр., 6 | — | marriott.com/w-saint-petersburg |

### 🇷🇺 СОЧИ (3 отеля)

| # | Отель | Контакт |
|---|-------|---------|
| 15 | **Hyatt Regency Sochi** | hyatt.com/sochi |
| 16 | **Swissôtel Resort Sochi Kamelia** | swissotel.com/sochi |
| 17 | **Pullman Sochi Centre** | pullmanhotels.com |

### 🇦🇪 ОАЭ / 🇻🇳 Вьетнам / 🇹🇭 Таиланд (3 отеля)

| # | Отель | Контакт |
|---|-------|---------|
| 18 | **Atlantis The Palm, Dubai** | atlantis.com |
| 19 | **One&Only The Palm, Dubai** | oneandonlyresorts.com |
| 20 | **InterContinental Danang Sun Peninsula** | intercontinental.com/danang · уже снимали Дананг |

---

## Формат письма для отелей

**Тема:** `[Название отеля] · живой UGC-контент для ваших соцсетей`

**Структура:**
1. Первое предложение — конкретная деталь про ЭТОТ отель (не про себя!)
2. Кто мы + что предлагаем (2-3 предложения)
3. Ссылка на медиакит
4. Цена + простой следующий шаг

**Нельзя использовать:** взаимовыгодное сотрудничество, синергия, охваты, «я являюсь»

**Пример открытия (Chekhoff):**
> «Ваши авторские коктейли особенно бы понравились А.П.Чехову — и он был бы в восторге от концептуальной кухни в отеле своего имени.»

---

## Прайс (текущий)

**Starter** — от 15 000 ₽ / $200 · 2 ролика 15–30 сек
**Standard** — от 35 000 ₽ / $450 · 5 роликов + 5 фото (ПОПУЛЯРНЫЙ)
**Premium** — от 70 000 ₽ / $900 · 10 роликов + 15 фото, 10–14 дней

Доп: исходники +30–50% · реклама +50%/6мес · срочность +40%

---

## Структура видео (images/)
1. portfolio_2026.mp4 (48MB) — Прогулка Патрики | Коллаборация с видеографом
2. hotel_four_seasons.mp4 (3MB) — Hotel Four Seasons lobby ✅ сжато
3. diploma.mp4 (21MB) — Кофемания
4. video_triple_coffee.mp4 (27MB) — Трипл кофе · UGC
5. danang_coffee.mp4 (13MB) — Дананг · Кофе с тропическим дождём
6. video_bana_khios.mp4 (8.2MB) — Бана Хилз · Travel
7. aquapark.mp4 — Аквапарк Микадзуки · Lifestyle
8. kofenya_misha.mp4 (4.8MB) — Кофейня MISSHA ✅ сжато
9. kraski_drop_colour.mp4 (25MB) — Краски Drop Colour ✅ сжато

---

## Пользователь
- Имя: Andrey / Email: rivanoxen@gmail.com
- Email сайта: andreyanamusic@gmail.com
- Телетайп: https://teletype.in/@andreyanapro/editor
