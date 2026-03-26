# AndreYana Site — Context для следующей сессии

**Дата последнего обновления:** 26 марта 2026
**Размер проекта:** 641MB ✅ (в пределах лимита GitHub Pages 1GB)

---

## Что это за проект

Медиакит-сайт для пары **AndreYana** (актёры, модели, UGC-создатели).
Технологии: **Vanilla HTML/CSS/JS**, без фреймворков.
Файл: `index.html` (1932 строки), `style.css`
Деплой: **GitHub Pages**

---

## CSS-переменные
```css
--black: #0c0c0c
--gold: #c5a367
--cream: #f9f7f4
--light-gray: #ece9e4
```

## i18n система
- Атрибуты: `data-i18n` / `data-i18n-html`
- JS объект `translations` — 86 ключей (RU + EN)
- localStorage ключ: 'ay-lang'
- `encodeSrc()` — для URL-кодирования кириллических путей

---

## Что уже сделано (всё работает)

- ✅ Прелоадер
- ✅ Бегущая строка `.brands-ticker` с названиями брендов (15px, CSS анимация)
- ✅ Hover-подсказка «↗ Нажми, чтобы посмотреть» на карточках брендов (.brand-hint)
- ✅ «Наши клиенты» → «Наши рекламы»
- ✅ Видео «Прогулка Патрики» (portfolio_2026.mp4, 48MB, 1280x720)
- ✅ Постер для видео Патрики (poster_patriki.webp, 9:16 кроп, кадр 11сек)
- ✅ iPhone MAX оверлей — переписан (нет дублирующихся load, preload, seeked event)
- ✅ Удалены 3 фото из карусели (new_HNY_4654, new_HNY_5036, new_HNY_6024)
- ✅ Очистка: удалено ~760MB (видео-оригиналы, JPG-дубликаты, odyssey JPG, .DS_Store, pick-thumb.html)

---

## ЧТО НУЖНО СДЕЛАТЬ ПЕРЕД ДЕПЛОЕМ (вручную!)

1. Google Analytics — в index.html ~строка 55: заменить G-XXXXXXXXXX → реальный GA4 ID
2. Яндекс Метрика — в index.html: заменить XXXXXXXX → реальный ID счётчика
3. Домен — в index.html и sitemap.xml: заменить https://andreyana.ru/ → реальный URL

---

## iPhone MAX — итоговый код (уже в index.html)

getSrc(wrap) — возвращает src без #t=... суффикса
preloadMax(wrap) — вызывается на mouseenter, буферизует видео
openMax(wrap) — открывает оверлей, продолжает с currentTime, ждёт seeked
closeMax() — закрывает, возвращает время в inline видео

---

## Структура папки images/ (только нужные файлы)

Видео: portfolio_2026.mp4 (48MB), YanaBosh.mp4 (36MB), video_triple_coffee.mp4 (27MB),
       diploma.mp4 (21MB), mastercard_visa.mp4 (19MB), danang_coffee.mp4 (13MB),
       hyundai.mp4 (11MB), unicredit_bank_2021.mp4 (9.4MB), odyssey_film.mp4 (9.1MB),
       my_movie.mp4 (8.6MB), video_bana_khios.mp4 (8.2MB)

Постер: poster_patriki.webp (38KB)

Фото: только .webp (JPG-дубликаты удалены)

---

## Зависимости (CDN)
- Lenis smooth scroll v1.0.42

---

## Пользователь
- Имя: Andrey / Email: rivanoxen@gmail.com
