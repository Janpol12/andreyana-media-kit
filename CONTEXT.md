# AndreYana Site — Context для следующей сессии

**Дата:** 30 марта 2026
**Размер проекта:** 641MB ✅
**Статус:** Задеплоен на GitHub Pages ✅

---

## Ссылки
- **Живой сайт:** https://janpol12.github.io/andreyana-media-kit/
- **Репозиторий:** https://github.com/Janpol12/andreyana-media-kit.git
- **Локальная папка:** /Users/andrey/Downloads/Agents/andreyana-site

---

## Технологии
- Vanilla HTML/CSS/JS (без фреймворков)
- Lenis smooth scroll v1.0.42 (CDN)
- GitHub Pages (ветка master)

## CSS-переменные
- --black: #0c0c0c
- --gold: #c5a367
- --cream: #f9f7f4
- --light-gray: #ece9e4

## i18n система
- Атрибуты: data-i18n / data-i18n-html
- JS объект translations — 86 ключей (RU + EN)
- localStorage ключ: 'ay-lang'
- encodeSrc() — для URL-кодирования кириллических путей

---

## Что сделано (всё работает)

- ✅ Деплой на GitHub Pages (https://janpol12.github.io/andreyana-media-kit/)
- ✅ Яндекс Метрика подключена (счётчик 108252394, Вебвизор включён)
- ✅ Домен прописан: janpol12.github.io/andreyana-media-kit во всех тегах
- ✅ Бегущая строка .brands-ticker (15px)
- ✅ Hover-подсказка «↗ Нажми, чтобы посмотреть» на карточках брендов
- ✅ «Наши рекламы» (было «Наши клиенты»)
- ✅ Видео «Прогулка Патрики» (portfolio_2026.mp4, 48MB) + постер poster_patriki.webp
- ✅ iPhone MAX оверлей — seeked event, preload, без двойного load()
- ✅ Удалены 3 фото из карусели
- ✅ Очистка мусора: ~760MB удалено (JPG-дубликаты, видео-оригиналы)
- ✅ Прайс Starter обновлён: 2 UGC-ролика 15–30 сек + Включено: сценарии, съёмка, монтаж, музыка

---

## ЧТО ЕЩЁ НЕ СДЕЛАНО

- [ ] Google Analytics — заменить G-XXXXXXXXXX на реальный GA4 ID (у пользователя нет аккаунта)
- [ ] Можно купить свой домен и подключить через GitHub Pages Custom Domain

---

## Прайс (текущие данные)

**Starter** — от 15 000 ₽ / $200
- 2 UGC-ролика 15–30 сек
- Включено: сценарии, съёмка, монтаж, музыка

**Standard** — от 35 000 ₽ / $450 (ПОПУЛЯРНЫЙ)
- 1 видео (30–60 сек) + 2 варианта монтажа
- Съёмка пары или соло на выбор
- Права на рекламу — 3 месяца
- Срок: 7–10 дней

**Premium** — от 70 000 ₽ / $900
- Hero-видео (45–90 сек) + 2–3 reels
- Съёмка пары, атмосферный lifestyle
- Drone-съёмка (по локации)
- Права на рекламу — 6 месяцев
- Срок: 10–14 дней

---

## Как пушить изменения на GitHub

```
cd ~/Downloads/Agents/andreyana-site && git add -A && git commit -m "update" && git push
```

Сайт обновляется через ~1 минуту после пуша.

---

## Локальный просмотр

Запустить сервер на своём Mac:
```
cd ~/Downloads/Agents/andreyana-site && python3 -m http.server 8080
```
Затем открыть: http://localhost:8080

---

## Структура видео (images/)

- portfolio_2026.mp4 (48MB) — Прогулка Патрики
- poster_patriki.webp (38KB) — постер
- YanaBosh.mp4 (36MB)
- video_triple_coffee.mp4 (27MB)
- diploma.mp4 (21MB)
- mastercard_visa.mp4 (19MB)
- danang_coffee.mp4 (13MB)
- hyundai.mp4 (11MB)
- unicredit_bank_2021.mp4 (9.4MB)
- odyssey_film.mp4 (9.1MB)
- my_movie.mp4 (8.6MB)
- video_bana_khios.mp4 (8.2MB) — Бана Хилз · Travel

---

## Пользователь
- Имя: Andrey / Email: rivanoxen@gmail.com
