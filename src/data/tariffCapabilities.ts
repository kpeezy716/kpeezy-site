export type TariffCapability = { title: string; shortDescription: string; result: string[] };

export const tariffCapabilities: Record<string, TariffCapability> = {
  funnel: { title: "Автоматическая воронка", shortDescription: "Квалификация и передача обращения", result: ["Сбор запроса", "Контакт клиента", "Передача менеджеру"] },
  basic: { title: "Базовый Telegram-бот", shortDescription: "Каталог, FAQ и заявка", result: ["Услуги и цены", "Сбор контакта", "Передача администратору"] },
  advanced: { title: "Продвинутый бот", shortDescription: "Сегментация, CRM и напоминания", result: ["Сегмент клиента", "Карточка в CRM", "Следующее действие"] },
  miniapp: { title: "Telegram Mini App", shortDescription: "Интерфейс с каталогом и записью", result: ["Каталог услуг", "Личный раздел", "Онлайн-запись"] },
};
