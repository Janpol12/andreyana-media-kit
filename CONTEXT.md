# AndreYana Site — Context для нового диалога
**Дата:** 11 апреля 2026

---

## Что это за проект
Сайт-медиакит для Андрея и Яны — UGC-пара, актёры, модели.
- Репозиторий: `~/Downloads/Agents/andreyana-site/`
- Деплой: GitHub Pages → https://andreyana.site (обновляется через 1–2 минуты после пуша)
- Push делает Андрей сам из своего терминала: `git add -A && git commit -m "..." && git push origin main`
- Стек: vanilla HTML/CSS/JS, без фреймворков
- i18n: `data-i18n` / `data-i18n-html` атрибуты, translations в `script.js`, ключ localStorage `'ay-lang'`
- CSS переменные: `--black: #0c0c0c`, `--gold / --accent-gold: #c5a367`, `--cream: #f9f7f4`

---

## Текущее состояние Hero (актуально)
```html
<div class="hero-top-left">
  <h1 class="hero-title">Andre<em>Yana</em></h1>
  <p class="hero-subtitle" data-i18n="hero-subtitle">Актёры · Модели · UGC</p>
</div>
<div class="hero-content">
  <span class="hero-ugc-text" data-i18n-html="hero-ugc-text">
    Создаём<br><em>UGC-контент,</em><br>который удерживает<br>внимание и <em>продаёт.</em>
  </span>
</div>
<div class="hero-bottom-phrase">
  <a href="#contact" class="hero-cta-main" data-i18n="hero-cta">Обсудить проект</a>
</div>
```
- Верхний левый: AndreYana (h1) + Актёры · Модели · UGC
- Центр-низ: UGC-текст
- **Новое:** кнопка CTA внизу слева (desktop) / полная ширина (мобиль < 768px)
- Стиль кнопки: glassmorphic (blur backdrop, gold border), hover → arrow сдвигается вправо
- Nav-logo: «Медиа Кит · 2026» (data-i18n="nav-logo")
- hero-title: `clamp(32px, 6.2vw, 80px)`

---

## Структура секций (текущий порядок)
1. Hero — с кнопкой CTA
2. About (`id="about"`) — заголовок «Почему нас выбирают»
   - **Новое:** блок `about-chemistry` с 3-уровневым текстом (intro serif, gold values, conclusion)
3. Бренды-тикер (100+ брендов)
4. Brands (`id="brands"`) — портфолио клиентов
5. Photos (`id="photos"`)
6. Video (`id="media"`)
7. **Collab (`id="collab"`)** — **ПЕРЕРАБОТАНО**: 
   - Лейбл: «В сотрудничестве»
   - Заголовок: «Что вы получаете»
   - 4 карточки с новыми иконками и текстом о преимуществах:
     1. ✦ UGC-формат, рекламный результат
     2. 🎬 Полный цикл производства
     3. 🔗 Органическое продвижение
     4. ❤️ Реальные парные истории
8. Pricing (`id="pricing"`)
9. Contact (`id="contact"`) — двухколоночный

---

## About секция — Chemistry блок (новое)
Структура 3 уровней текста:
```html
<p class="about-chemistry-text" data-i18n-html="chemistry-text">
  <span class="ct-intro">Люди подписываются на нас не за красивую картинку —<br>а за настоящую связь между нами.</span>
  <span class="ct-values">Любовь&nbsp;&nbsp;·&nbsp;&nbsp;Доверие&nbsp;&nbsp;·&nbsp;&nbsp;Семейные ценности</span>
  <span class="ct-conclusion">Это то, что бренды пытаются передать через актёров,<br>а у нас это реальность.<br>Зрители это чувствуют — и <em>верят.</em></span>
</p>
```

**CSS классы:**
- `.about-chemistry-text` — flex column, gap: 20px
- `.ct-intro` — serif italic, крупный (18–24px), самый заметный
- `.ct-values` — золотой заголовок, капсы, разрядка, border-top/bottom
- `.ct-conclusion` — тело текста с курсивным *верят*

---

## Collab секция — Что изменилось
**Было:** 4 формата работы (отели, travel, fashion, lifestyle) с описанием каждого
**Стало:** Преимущества сотрудничества (что клиент получает)

Новые i18n ключи:
- `collab-label`: «В сотрудничестве»
- `collab-title`: «Что вы получаете»
- `collab-h1-h4`, `collab-d1-d4` — новый текст о 4 преимуществах
- Новые иконки (Sparkle, Clapper, Share, Heart) вместо старых

---

## i18n — все ключи (актуально)
**Hero:**
- `nav-logo`, `hero-ugc-text`, `hero-subtitle`, **`hero-cta`** (новое)

**About:**
- `about-label`, `about-title`, `chemistry-heading`, `chemistry-text`

**Collab (переработано):**
- `collab-label` ← «Форматы работы» → **«В сотрудничестве»**
- `collab-title` ← «Открыты к сотрудничеству» → **«Что вы получаете»**
- `collab-h1`, `collab-d1` — UGC-формат, рекламный результат
- `collab-h2`, `collab-d2` — Полный цикл производства
- `collab-h3`, `collab-d3` — Органическое продвижение
- `collab-h4`, `collab-d4` — Реальные парные истории

**Contact & Form:**
- `cf-name`, `cf-brand`, `cf-task`, `cf-contact`, `cf-submit`, `cf-success`, `cf-success-sub`

---

## Последние коммиты (запушены на GitHub)
1. `13b221c` — update collab section + chemistry text redesign
2. `3d88253` — add hero CTA button ("Обсудить проект")
3. `0c7d0d6` — fix hero CTA button mobile layout (full width, no text overlap)

---

## Следующие приоритетные задачи

### Срочно (воронка продаж)
- [ ] Секция «Как мы работаем» — 4 шага: Бриф → Концепция → Съёмка+монтаж → Сдача
- [ ] Добавить CTA кнопку после видео секции
- [ ] Переставить «Что вы получаете» перед портфолио (сейчас после)

### Важно (доверие + социальное доказательство)
- [ ] Секция отзывов клиентов (нужны реальные цитаты)
- [ ] Заменить стат «20+ мастер-классов» на что-то релевантное (охват аккаунтов, дни сдачи и т.д.)
- [ ] Фото-портфолио брендов (быстрее загружается, чем много видео)

### Технические
- [ ] Formspree email: переподтвердить (Settings → Resend verification)
- [ ] Google Analytics — заменить G-XXXXXXXXXX на реальный ID
- [ ] Оптимизация мобиля (проверить все секции на узких экранах)
- [ ] Навигация: 7 пунктов → 4 (убрать лишние)

---

## Аудит воронки (выводы)
Проблемы текущей воронки:
1. ✅ Hero CTA — **ИСПРАВЛЕНО** (кнопка добавлена)
2. Нет объяснения что такое UGC и почему это нужно (боль клиента)
3. «Что вы получаете» стоит после видео вместо перед ним
4. Нет секции «Как мы работаем» (снимает тревогу перед заказом)
5. Нет отзывов (социальное доказательство)
6. Статистика не релевантна для брендов

---

## Notes
- Все i18n работает (RU ↔ EN через toggle)
- Мобильная версия требует внимания (Hero текст не должен перекрываться)
- Сайт быстрый, нет лишних скриптов
- GitHub Pages деплой стабилен, обновление через 1–2 мин
