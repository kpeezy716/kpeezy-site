import type { DemoScenario } from "@/types/demo";

const end = (text: string, integration = "CRM") => ({ id: "done", botMessage: text, integration, completed: true });
const choice = (id: string, labels: string[], nextStepId: string, saveAs: string) => labels.map((label) => ({ id: `${id}-${label}`, label, nextStepId, saveAs }));

export const scenarios: DemoScenario[] = [
  {
    id: "beauty", industry: "Барбершоп / Beauty / SPA", title: "Запись и услуги", description: "Услуги → запись → клиент", icon: "scissors", startStepId: "welcome",
    steps: {
      welcome: { id: "welcome", botMessage: "Добро пожаловать 👋\nЧто вас интересует?", options: [
        { id: "services", label: "Услуги и цены", nextStepId: "service", saveAs: "Интерес" }, { id: "book", label: "Записаться", nextStepId: "date", saveAs: "Цель" }, { id: "faq", label: "Частые вопросы", nextStepId: "faq", saveAs: "Интерес" }, { id: "lead", label: "Оставить заявку", nextStepId: "name", saveAs: "Цель" }
      ] },
      service: { id: "service", botMessage: "Выберите услугу:", options: choice("service", ["Стрижка · 60 мин · demo 2 500 ₽", "SPA-программа · 90 мин · demo 4 500 ₽", "Массаж · 60 мин · demo 3 000 ₽"], "date", "Услуга") },
      faq: { id: "faq", botMessage: "Работаем ежедневно. Запись можно выбрать в пару нажатий.", options: [{ id: "faq-book", label: "Записаться", nextStepId: "date", saveAs: "Цель" }] },
      date: { id: "date", botMessage: "Имитация интеграции · YCLIENTS\nВыберите дату:", integration: "YCLIENTS", options: choice("date", ["Сегодня", "Завтра", "На выходных"], "time", "Дата") },
      time: { id: "time", botMessage: "Какое время удобно?", options: choice("time", ["11:00", "15:00", "19:00"], "done", "Время") },
      name: { id: "name", botMessage: "Как к вам обращаться?", input: { type: "text", placeholder: "Введите имя", saveAs: "Имя", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Оставьте номер телефона", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "comment" } },
      comment: { id: "comment", botMessage: "Коротко опишите ваш запрос", input: { type: "text", placeholder: "Комментарий", saveAs: "Комментарий", nextStepId: "done" } },
      done: end("Готово! Демонстрационная заявка передана администратору.", "Telegram администратору")
    }
  },
  {
    id: "cleaning", industry: "Клининг", title: "Расчёт уборки", description: "Расчёт → услуги → заявка", icon: "spray", startStepId: "type",
    steps: {
      type: { id: "type", botMessage: "Здравствуйте 👋\nПомогу рассчитать уборку.\n\nЧто нужно убрать?", options: choice("type", ["Квартира", "Дом", "Офис"], "rooms", "Тип") },
      rooms: { id: "rooms", botMessage: "Сколько комнат?", options: choice("rooms", ["1", "2", "3", "4+"], "area", "Комнаты") },
      area: { id: "area", botMessage: "Примерная площадь?", options: choice("area", ["До 40 м²", "40–70 м²", "70–100 м²", "100+ м²"], "extra", "Площадь") },
      extra: { id: "extra", botMessage: "Нужны дополнительные услуги?", options: choice("extra", ["Мытьё окон", "Холодильник", "Духовка", "Без дополнительных услуг"], "estimate", "Доп. услуга") },
      estimate: { id: "estimate", botMessage: "Предварительная стоимость:\nот 4 500 ₽\n\nФинальную стоимость подтвердит менеджер.", options: [{ id: "lead", label: "Оставить заявку", nextStepId: "name" }, { id: "back", label: "Вернуться", nextStepId: "type" }] },
      name: { id: "name", botMessage: "Введите имя", input: { type: "text", placeholder: "Ваше имя", saveAs: "Имя", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Введите телефон", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Спасибо!\n\nДемонстрационная заявка отправлена менеджеру.")
    }
  },
  {
    id: "auto", industry: "Автосервис / детейлинг", title: "Запись в сервис", description: "Услуга → авто → время", icon: "tire", startStepId: "service",
    steps: {
      service: { id: "service", botMessage: "Что хотите сделать с автомобилем?", options: choice("service", ["ТО", "Диагностика", "Детейлинг", "Шиномонтаж"], "car", "Услуга") },
      car: { id: "car", botMessage: "Марка автомобиля?", options: choice("car", ["BMW", "Mercedes", "Audi", "Другая"], "date", "Автомобиль") },
      date: { id: "date", botMessage: "Когда удобно приехать?", options: choice("date", ["Сегодня", "Завтра", "На выходных"], "phone", "Дата") },
      phone: { id: "phone", botMessage: "Оставьте номер телефона, и администратор подтвердит свободное время.", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Заявка передана сервису.", "Telegram администратору")
    }
  },
  {
    id: "education", industry: "Образование", title: "Подбор обучения", description: "Направление → уровень → урок", icon: "education", startStepId: "course",
    steps: {
      course: { id: "course", botMessage: "Здравствуйте!\nПомогу подобрать обучение.\n\nЧто вас интересует?", options: choice("course", ["Английский", "Программирование", "Подготовка к экзаменам"], "level", "Направление") },
      level: { id: "level", botMessage: "Ваш уровень?", options: choice("level", ["Начинающий", "Средний", "Продвинутый"], "goal", "Уровень") },
      goal: { id: "goal", botMessage: "Какая цель?", options: choice("goal", ["Для работы", "Для учёбы", "Для себя"], "trial", "Цель") },
      trial: { id: "trial", botMessage: "Хотите записаться на пробное занятие?", options: choice("trial", ["Да", "Сначала консультация"], "name", "Формат") },
      name: { id: "name", botMessage: "Как вас зовут?", input: { type: "text", placeholder: "Введите имя", saveAs: "Имя", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Оставьте телефон", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Менеджер получил демонстрационную заявку на пробный урок.")
    }
  },
  {
    id: "medical", industry: "Стоматология / клиника", title: "Запись к специалисту", description: "Специалист → время → контакт", icon: "medical", startStepId: "specialist",
    steps: {
      specialist: { id: "specialist", botMessage: "Здравствуйте!\n\nК какому специалисту хотите записаться?", options: choice("specialist", ["Стоматолог-терапевт", "Ортодонт", "Гигиенист"], "reason", "Специалист") },
      reason: { id: "reason", botMessage: "Что вас беспокоит?", options: choice("reason", ["Профилактический осмотр", "Лечение зуба", "Консультация"], "date", "Причина обращения") },
      date: { id: "date", botMessage: "Имитация интеграции · YCLIENTS\nВыберите удобный день:", integration: "YCLIENTS", options: choice("date", ["Сегодня", "Завтра", "На выходных"], "time", "Дата") },
      time: { id: "time", botMessage: "Выберите время:", options: choice("time", ["10:00", "14:00", "18:00"], "phone", "Время") },
      phone: { id: "phone", botMessage: "Оставьте номер телефона для подтверждения записи", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Спасибо! Демонстрационная запись передана администратору клиники.", "YCLIENTS")
    }
  },
  {
    id: "repair", industry: "Ремонт / выездные услуги", title: "Вызов мастера", description: "Проблема → срочность → район", icon: "repair", startStepId: "issue",
    steps: {
      issue: { id: "issue", botMessage: "Что случилось?", options: choice("issue", ["Сантехника", "Электрика", "Кондиционер", "Бытовая техника"], "urgency", "Тип проблемы") },
      urgency: { id: "urgency", botMessage: "Насколько срочно нужна помощь?", options: choice("urgency", ["Сегодня", "В течение 2–3 дней", "Не срочно"], "district", "Срочность") },
      district: { id: "district", botMessage: "В каком районе находится объект?", input: { type: "text", placeholder: "Например, Хамовники", saveAs: "Район", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Номер телефона?", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Спасибо.\nЗаявка передана мастеру. С вами свяжутся для уточнения деталей.")
    }
  },
  {
    id: "realty", industry: "Недвижимость", title: "Подбор объекта", description: "Цель → бюджет → район", icon: "home", startStepId: "intent",
    steps: {
      intent: { id: "intent", botMessage: "Помогу подобрать подходящие варианты.\n\nЧто вас интересует?", options: choice("intent", ["Купить", "Снять"], "property", "Цель") },
      property: { id: "property", botMessage: "Тип объекта?", options: choice("property", ["Квартира", "Дом"], "budget", "Тип объекта") },
      budget: { id: "budget", botMessage: "Бюджет?", options: choice("budget", ["До 10 млн", "10–20 млн", "20+ млн"], "rooms", "Бюджет") },
      rooms: { id: "rooms", botMessage: "Количество комнат?", options: choice("rooms", ["1", "2", "3", "4+"], "district", "Комнаты") },
      district: { id: "district", botMessage: "Какой район рассматриваете?", input: { type: "text", placeholder: "Введите район", saveAs: "Район", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Оставьте телефон", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Ваш демонстрационный запрос передан специалисту.")
    }
  },
  {
    id: "photo", industry: "Фотостудия", title: "Бронирование зала", description: "Формат → зал → время", icon: "camera", startStepId: "format",
    steps: {
      format: { id: "format", botMessage: "Какой формат съёмки планируете?", options: choice("format", ["Аренда зала", "Фотосессия", "Контент-съёмка"], "hall", "Формат съёмки") },
      hall: { id: "hall", botMessage: "Выберите зал:", options: choice("hall", ["Light hall", "Loft hall", "Циклорама"], "date", "Зал") },
      date: { id: "date", botMessage: "Выберите дату:", options: choice("date", ["Сегодня", "Завтра", "На выходных"], "time", "Дата") },
      time: { id: "time", botMessage: "Выберите время:", options: choice("time", ["11:00", "14:00", "18:00"], "phone", "Время") },
      phone: { id: "phone", botMessage: "Оставьте телефон для подтверждения бронирования", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
      done: end("Бронирование передано администратору фотостудии.", "CRM")
    }
  },
  {
    id: "b2b", industry: "B2B услуги", title: "Квалификация запроса", description: "Задача → масштаб → контакт", icon: "business", startStepId: "need",
    steps: {
      need: { id: "need", botMessage: "Здравствуйте!\n\nПомогу передать вашу задачу нужному специалисту.\n\nЧто требуется?", options: choice("need", ["Telegram-бот", "Mini App", "AI-автоматизация", "Интеграция CRM"], "size", "Задача") },
      size: { id: "size", botMessage: "Размер компании?", options: choice("size", ["1–10", "10–50", "50–200", "200+"], "timeline", "Размер компании") },
      timeline: { id: "timeline", botMessage: "Когда хотите запустить проект?", options: choice("timeline", ["Как можно быстрее", "В течение месяца", "Изучаю варианты"], "name", "Срок") },
      name: { id: "name", botMessage: "Как вас зовут?", input: { type: "text", placeholder: "Введите имя", saveAs: "Имя", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Телефон / Telegram", input: { type: "phone", placeholder: "Контакт для связи", saveAs: "Контакт", nextStepId: "done" } },
      done: end("Спасибо.\nДемонстрационная заявка сформирована и передана специалисту.")
    }
  }
];

export function createCustomScenario(industry: string): DemoScenario {
  const business = industry.trim() || "вашего бизнеса";
  return {
    id: "custom",
    industry: business,
    title: "Персональный сценарий",
    description: "Запрос → детали → контакт",
    icon: "business",
    startStepId: "request",
    steps: {
      request: { id: "request", botMessage: "Здравствуйте!\n\nЧто вас интересует?", options: choice("request", ["Узнать об услугах", "Получить консультацию", "Оставить заявку"], "details", "Запрос") },
      details: { id: "details", botMessage: "Коротко опишите, что вам нужно", input: { type: "text", placeholder: "Ваш запрос", saveAs: "Детали", nextStepId: "format" } },
      format: { id: "format", botMessage: "Как удобнее получить ответ?", options: choice("format", ["В Telegram", "Звонком", "По почте"], "name", "Канал связи") },
      name: { id: "name", botMessage: "Как к вам обращаться?", input: { type: "text", placeholder: "Введите имя", saveAs: "Имя", nextStepId: "phone" } },
      phone: { id: "phone", botMessage: "Оставьте контакт для связи", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Контакт", nextStepId: "done" } },
      done: end(`Спасибо! Запрос для «${business}» передан менеджеру.`, "Telegram администратору")
    }
  };
}
