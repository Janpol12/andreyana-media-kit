# AndreYana Site — Context для следующей сессии

**Дата:** 31 марта 2026
**Статус:** Задеплоен на GitHub Pages ✅ | Запушено ✅

---

## Ссылки
- **Живой сайт:** https://janpol12.github.io/andreyana-media-kit/
- **Репозиторий:** https://github.com/Janpol12/andreyana-media-kit.git
- **Локальная папка:** /Users/andrey/Downloads/Agents/andreyana-site

---

## Технологии
- Vanilla HTML/CSS/JS (без фреймворков)
- Lenis smooth scroll v1.0.42 (CDN)
- GitHub Pages (ветка **main** — не master!)

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

> ⚠️ Ветка называется **main** (не master). Первый раз нужно было `git push --set-upstream origin main` — уже сделано, теперь просто `git push`.

---

## Локальный просмотр

```
cd ~/Downloads/Agents/andreyana-site && python3 -m http.server 8080
```
Затем открыть: http://localhost:8080

---

## Что сделано в сессии 31 марта 2026

### Навигация (index.html + script.js)
- ✅ «Клиенты» → «Мы в рекламе»
- ✅ «Видео» → «Наши работы»

### Раздел «О нас» — карточки
- ✅ Шрифт увеличен на 20% (было 15px/18px → стало 18px/22px)
- ✅ «кино, сериалы, премиум реклама» → «кино, сериалы, реклама»
- ✅ «Премиальный UGC» → «UGC-контент»
- ✅ Статистика: «мастер-классов» → «мастер-классов с фотографами»

### Раздел «Фотографии»
- ✅ «Рекламные съёмки» → «Модельные съёмки»

### Раздел «Наши работы» (видео)
- ✅ 1-е видео: «Прогулка Патрики» → «Прогулка Патрики | Коллаборация с видеографом»
- ✅ 5-е видео (diploma.mp4): «Наши видео · Диплом» → «Кофемания», переставлено на 2-е место
- ✅ Добавлено новое видео: kofenya_misha.mp4 (49MB → 4.8MB) — «Кофейня MISSHA»
- ✅ Добавлено новое видео: hotel_four_seasons.mp4 (57MB → 3MB) — «Hotel Four Seasons lobby», стоит 2-м
- ✅ Добавлено новое видео: kraski_drop_colour.mp4 (222MB → 25MB) — «Краски Drop Colour»

### Порядок видео (текущий):
1. portfolio_2026.mp4 — Прогулка Патрики | Коллаборация с видеографом
2. hotel_four_seasons.mp4 — Hotel Four Seasons lobby
3. diploma.mp4 — Кофемания
4. video_triple_coffee.mp4 — Трипл кофе · UGC
5. danang_coffee.mp4 — Дананг · Кофе с тропическим дождём
6. video_bana_khios.mp4 — Бана Хилз · Travel
7. aquapark.mp4 — Аквапарк Микадзуки · Lifestyle
8. kofenya_misha.mp4 — Кофейня MISSHA
9. kraski_drop_colour.mp4 — Краски Drop Colour

### Раздел «Стоимость» (прайс)

**Раздел «Пакеты» — удалён полностью**

**Starter** — от 15 000 ₽ / $200
- 2 UGC-ролика 15–30 сек
- Включено: сценарии, съёмка, монтаж, музыка

**Standard** — от 35 000 ₽ / $450 (ПОПУЛЯРНЫЙ)
- 5 UGC-ролика 15–30 сек + 5 статичных фото
- Включено: сценарии, съёмка, монтаж, музыка

**Premium** — от 70 000 ₽ / $900
- 10 UGC-роликов + 15 статичных фото
- Съёмка семьи, атмосферный lifestyle
- Включено: сценарии, съёмка, монтаж, музыка
- Срок: 10–14 дней

**Дополнительно:**
- Передача сырых исходников — +30–50% к стоимости
- Права на использование в платной рекламе — +50% на 6 месяцев
- Фото-сет (10–15 кадров) — от 10 000 ₽
- Срочность до 3 дней — +40%

**CSS шрифты в прайсе (после увеличений):**
- .price-badge: 12px
- .price-tier: 13px
- .price-from / .price-usd / .price-desc: 16px
- .price-num: 50px
- .price-features li: 16px
- .price-cta: 14px
- .price-extras-title: 16px
- .price-extras-grid span: 19px
- .price-grid margin-top: 24px (было 64px)

---

## Структура видео (images/)

- portfolio_2026.mp4 (48MB) — Прогулка Патрики | Коллаборация с видеографом
- poster_patriki.webp (38KB) — постер
- hotel_four_seasons.mp4 (3MB) — Hotel Four Seasons lobby ✅ сжато
- diploma.mp4 (21MB) — Кофемания
- video_triple_coffee.mp4 (27MB) — Трипл кофе · UGC
- danang_coffee.mp4 (13MB) — Дананг · Кофе с тропическим дождём
- video_bana_khios.mp4 (8.2MB) — Бана Хилз · Travel
- aquapark.mp4 — Аквапарк Микадзуки · Lifestyle
- kofenya_misha.mp4 (4.8MB) — Кофейня MISSHA ✅ сжато
- kraski_drop_colour.mp4 (25MB) — Краски Drop Colour ✅ сжато (было 222MB .mov)
- YanaBosh.mp4 (36MB)
- mastercard_visa.mp4 (19MB)
- hyundai.mp4 (11MB)
- unicredit_bank_2021.mp4 (9.4MB)
- odyssey_film.mp4 (9.1MB)
- my_movie.mp4 (8.6MB)

> ⚠️ В папке images/ есть лишний файл « Hotel Four Seasons lobby.mp4» (57MB оригинал) — удалить вручную:
> `rm ~/Downloads/Agents/andreyana-site/images/\ Hotel\ Four\ Seasons\ lobby.mp4`
> затем: `git add -A && git commit -m "remove large original" && git push`

---

## ЧТО ЕЩЁ НЕ СДЕЛАНО

- [ ] Удалить оригинал « Hotel Four Seasons lobby.mp4» (57MB) из папки images/
- [ ] Google Analytics — заменить G-XXXXXXXXXX на реальный GA4 ID
- [ ] Можно купить свой домен и подключить через GitHub Pages Custom Domain

---

## Пользователь
- Имя: Andrey / Email: rivanoxen@gmail.com
