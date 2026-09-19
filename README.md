# KPEEZY — Telegram automation landing

Лендинг-портфолио с интерактивной frontend-only симуляцией Telegram-бота. Демо не отправляет и не хранит введённые данные.

## Запуск

```bash
pnpm install
pnpm dev
pnpm build
```

Для Vercel: импортируйте репозиторий, команда сборки — `pnpm build`.

## Где редактировать

- Контакты и бренд: `src/config/site.ts`
- Цены: `src/data/pricing.ts`
- Отрасли и сценарии бота: `src/data/scenarios.ts`
- Демонстрационные проекты: `src/components/sections/DemoProjects.tsx`
