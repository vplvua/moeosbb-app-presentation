# Презентація мобільного додатку «Моє ОСББ»

[Slidev](https://sli.dev/)-презентація дизайну кабінету мешканця.

**Дивитися онлайн:** https://vplvua.github.io/moeosbb-app-presentation/

## Локальний запуск

```bash
npm install
npm run dev      # http://localhost:3030
```

## Команди

- `npm run dev` — dev-сервер із живим перезавантаженням
- `npm run build` — статична збірка в `dist/`
- `npm run export` — експорт у PDF

## Структура

- `slides.md` — налаштування деки та порядок слайдів
- `pages/` — по одному файлу на слайд
- `style.css` — брендові стилі
- `public/screens/` — скриншоти екранів додатку (генеруються `scripts/capture-screens.mjs`)

Деплой на GitHub Pages — автоматично при пуші в `main` (`.github/workflows/deploy.yml`).
