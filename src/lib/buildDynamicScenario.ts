import { profileFor, type BusinessArchetype, type BusinessProfile } from "@/data/businessProfiles";
import type { PricingPlan } from "@/data/pricing";
import type { DemoMiniApp, DemoOption, DemoScenario, DemoStep } from "@/types/demo";

type CatalogItem = { title: string; description: string; meta: string };

const catalogues: Record<BusinessArchetype, CatalogItem[]> = {
  beauty: [{ title: "Стрижка", description: "Мастер и форма стрижки", meta: "60 мин · от 2 500 ₽" }, { title: "Окрашивание", description: "Подбор оттенка и техника", meta: "от 5 500 ₽" }, { title: "Укладка", description: "Образ к событию", meta: "45 мин · от 1 800 ₽" }],
  cleaning: [{ title: "Поддерживающая уборка", description: "Регулярный порядок дома", meta: "от 3 500 ₽" }, { title: "Генеральная уборка", description: "Полная уборка всех зон", meta: "от 7 900 ₽" }, { title: "Уборка после ремонта", description: "Пыль, следы работ и окна", meta: "от 12 000 ₽" }],
  food: [{ title: "Забронировать столик", description: "Выбор даты и времени", meta: "Ответ за 2 мин" }, { title: "Посмотреть меню", description: "Основное меню и бар", meta: "Новинки недели" }, { title: "Оформить заказ", description: "Самовывоз или доставка", meta: "от 40 мин" }],
  auto: [{ title: "Диагностика", description: "Проверка узлов автомобиля", meta: "от 1 500 ₽" }, { title: "Техническое обслуживание", description: "Работы по регламенту", meta: "от 4 500 ₽" }, { title: "Шиномонтаж", description: "Комплекс на 4 колеса", meta: "от 2 400 ₽" }],
  medical: [{ title: "Консультация специалиста", description: "Первичный приём", meta: "от 2 000 ₽" }, { title: "Профилактический осмотр", description: "Диагностика и план лечения", meta: "60 мин" }, { title: "Лечение", description: "Подбор процедуры", meta: "По плану врача" }],
  education: [{ title: "Пробный урок", description: "Знакомство с преподавателем", meta: "Бесплатно · 30 мин" }, { title: "Выбрать курс", description: "Программа под цель", meta: "12–24 занятия" }, { title: "Консультация", description: "Подбор траектории", meta: "Сегодня" }],
  realty: [{ title: "Купить объект", description: "Подбор по бюджету", meta: "Новые варианты" }, { title: "Снять объект", description: "Актуальные предложения", meta: "Без комиссии" }, { title: "Получить консультацию", description: "Оценка запроса", meta: "Ответ сегодня" }],
  repair: [{ title: "Вызвать мастера", description: "Выезд и диагностика", meta: "Сегодня" }, { title: "Получить расчёт", description: "Предварительная смета", meta: "За 5 минут" }, { title: "Срочный выезд", description: "Мастер в ближайшее окно", meta: "от 60 мин" }],
  b2b: [{ title: "Получить консультацию", description: "Разбор текущего процесса", meta: "30 минут" }, { title: "Обсудить проект", description: "Оценка решения и сроков", meta: "Онлайн" }, { title: "Оставить заявку", description: "Передача в нужную команду", meta: "Ответ сегодня" }],
  photo: [{ title: "Аренда зала", description: "Самостоятельная съёмка", meta: "от 2 000 ₽ / час" }, { title: "Фотосессия с фотографом", description: "Зал, свет и работа фотографа", meta: "от 7 500 ₽" }, { title: "Контент-съёмка", description: "Для бренда, каталога или соцсетей", meta: "от 12 000 ₽" }],
  generic: [{ title: "Узнать об услугах", description: "Основные направления", meta: "Каталог" }, { title: "Получить консультацию", description: "Короткий разбор задачи", meta: "Сегодня" }, { title: "Оставить заявку", description: "Связь с командой", meta: "Ответ в Telegram" }],
};

const specialists: Record<BusinessArchetype, CatalogItem[]> = {
  beauty: [{ title: "Алексей", description: "Барбер · 6 лет опыта", meta: "Ближайшее: 11:00" }, { title: "Мария", description: "Стилист-колорист", meta: "Ближайшее: 15:00" }],
  cleaning: [{ title: "Стандартная бригада", description: "2 специалиста и инвентарь", meta: "Завтра" }, { title: "Расширенная бригада", description: "Для больших площадей", meta: "На выходных" }],
  food: [{ title: "Основной зал", description: "До 4 гостей", meta: "19:00" }, { title: "Терраса", description: "Свободные столики", meta: "20:30" }],
  auto: [{ title: "Слесарный участок", description: "ТО и диагностика", meta: "Сегодня · 16:00" }, { title: "Детейлинг-зона", description: "Уход за кузовом", meta: "Завтра · 12:00" }],
  medical: [{ title: "Анна Власова", description: "Стоматолог-терапевт", meta: "Сегодня · 10:00" }, { title: "Илья Соколов", description: "Ортодонт", meta: "Завтра · 14:00" }],
  education: [{ title: "Анна", description: "Преподаватель · C1", meta: "Сегодня · 18:00" }, { title: "Максим", description: "Наставник по IT", meta: "Завтра · 17:00" }],
  realty: [{ title: "Подборка №1", description: "5 объектов по запросу", meta: "Новые сегодня" }, { title: "Личный брокер", description: "Сопровождение сделки", meta: "Связь в Telegram" }],
  repair: [{ title: "Мастер Сергей", description: "Выезд и диагностика", meta: "Сегодня · 15:00" }, { title: "Мастер Павел", description: "Срочные работы", meta: "В ближайший час" }],
  b2b: [{ title: "Аналитик процесса", description: "Разберёт текущую схему", meta: "Сегодня" }, { title: "Руководитель проекта", description: "Оценит решение и сроки", meta: "На этой неделе" }],
  photo: [{ title: "Light hall", description: "Панорамные окна · 55 м²", meta: "Сегодня · 14:00" }, { title: "Loft hall", description: "Фактурные стены · 70 м²", meta: "Сегодня · 18:00" }, { title: "Циклорама", description: "Белый фон · 45 м²", meta: "Завтра · 11:00" }],
  generic: [{ title: "Специалист команды", description: "Подберёт решение", meta: "Сегодня" }, { title: "Менеджер проекта", description: "Свяжется удобным способом", meta: "В Telegram" }],
};

const option = (id: string, label: string, nextStepId: string, saveAs: string, description?: string, meta?: string): DemoOption => ({ id, label, nextStepId, saveAs, description, meta });
const fromCatalogue = (profile: BusinessProfile, nextStepId: string) => catalogues[profile.archetype].map((item, index) => option(`service-${index}`, item.title, nextStepId, profile.serviceLabel, item.description, item.meta));
const fromSpecialists = (profile: BusinessProfile, nextStepId: string) => specialists[profile.archetype].map((item, index) => option(`expert-${index}`, item.title, nextStepId, "Специалист", item.description, item.meta));
const bookingIntegration = (profile: BusinessProfile) => ["beauty", "medical", "education"].includes(profile.archetype) ? "YCLIENTS" : "CRM";
const phone = (message: string, nextStepId: string, saveAs = "Телефон"): DemoStep => ({ id: "phone", botMessage: message, input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs, nextStepId } });
const name = (nextStepId: string): DemoStep => ({ id: "name", botMessage: "Как к вам обращаться?", input: { type: "text", placeholder: "Введите имя", saveAs: "Имя", nextStepId } });
const completed = (profile: BusinessProfile, integration: string): DemoStep => ({ id: "done", botMessage: `Готово! ${profile.completion}`, integration, completed: true });

function funnelSteps(profile: BusinessProfile): Record<string, DemoStep> {
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! Помогу быстро направить обращение в «${profile.name}».`, options: [option("funnel-catalog", "Посмотреть направления", "catalogue", "Цель", "Выберите нужную услугу", "Каталог"), option("funnel-calc", "Получить быстрый расчёт", "qualification", "Цель", "Несколько вопросов — и заявка у команды", "≈ 2 минуты"), option("funnel-contact", "Связаться с менеджером", "contact-channel", "Цель", "Сразу выберем удобный канал", "Без ожидания")] },
    catalogue: { id: "catalogue", botMessage: "Выберите интересующее направление:", options: fromCatalogue(profile, "qualification") },
    qualification: { id: "qualification", botMessage: "Когда нужен результат?", options: [option("urgent", "Как можно скорее", "contact-channel", "Срочность", "Передадим в приоритетную очередь", "Сегодня"), option("week", "В течение недели", "contact-channel", "Срочность", "Подберём подходящее время", "Планово"), option("research", "Пока сравниваю варианты", "contact-channel", "Срочность", "Отправим полезную подборку", "Без звонка")] },
    "contact-channel": { id: "contact-channel", botMessage: "Куда удобнее отправить ответ?", options: [option("telegram", "В Telegram", "name", "Канал связи", "Сообщение от менеджера", "Telegram"), option("call", "Звонком", "name", "Канал связи", "Менеджер перезвонит", "Телефон")] },
    name: name("phone"),
    phone: phone("Оставьте номер для связи — заявка сразу попадёт нужному специалисту.", "done"),
    done: completed(profile, "Telegram администратору"),
  };
}

function basicSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const integration = bookingIntegration(profile);
  return {
    welcome: { id: "welcome", botMessage: `Добро пожаловать в «${profile.name}»! Что хотите сделать?`, options: [option("catalog", "Услуги и цены", "catalogue", "Раздел", "Каталог с актуальными предложениями", "3 раздела"), option("book", "Записаться", "experts", "Раздел", "Подбор специалиста и времени", "Онлайн-запись"), option("faq", "Вопросы и ответы", "faq", "Раздел", "Быстрые ответы без ожидания", "FAQ")] },
    catalogue: { id: "catalogue", botMessage: "Выберите услугу из каталога:", options: fromCatalogue(profile, "service-next") },
    "service-next": { id: "service-next", botMessage: "Услуга выбрана. Продолжим к записи или посмотрим похожие варианты?", options: [option("expert", "Выбрать специалиста", "experts", "Действие", "Покажем ближайшие окна", "Запись"), option("more", "Вернуться в каталог", "catalogue", "Действие", "Другие услуги и цены", "Каталог")] },
    faq: { id: "faq", botMessage: "Ответим на частые вопросы и предложим следующий шаг.", options: [option("hours", "График и свободные окна", "experts", "Вопрос", "Покажем время без звонка", "Онлайн"), option("price", "Стоимость услуг", "catalogue", "Вопрос", "Цены и состав услуг", "Каталог")] },
    experts: { id: "experts", botMessage: "Кого или какой вариант выбираете?", integration, options: fromSpecialists(profile, "date") },
    date: { id: "date", botMessage: "Выберите удобный день:", integration, options: [option("today", "Сегодня", "time", "Дата", "Есть свободные окна", "2 окна"), option("tomorrow", "Завтра", "time", "Дата", "Больше доступного времени", "5 окон"), option("weekend", "На выходных", "time", "Дата", "Спокойный график", "3 окна")] },
    time: { id: "time", botMessage: "Какое время подойдёт?", options: [option("morning", "10:30", "name", "Время", "Утреннее окно", "Свободно"), option("day", "14:00", "name", "Время", "Дневное окно", "Свободно"), option("evening", "18:30", "name", "Время", "Вечернее окно", "Свободно")] },
    name: name("phone"),
    phone: phone("Оставьте телефон — мы подтвердим выбранное время.", "done"),
    done: completed(profile, integration),
  };
}

function advancedSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const integration = profile.integration === "YCLIENTS" ? "YCLIENTS + CRM" : "CRM";
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! «${profile.name}» узнаёт контекст обращения, чтобы предложить персональный путь.`, options: [option("new", "Я здесь впервые", "catalogue", "Статус клиента", "Подберём услугу с нуля", "Новый клиент"), option("return", "Я уже клиент", "client-card", "Статус клиента", "Откроем персональный сценарий", "Личный путь")] },
    "client-card": { id: "client-card", botMessage: "Клиентский профиль найден. Можно быстро повторить услугу или посмотреть персональные предложения.", integration, options: [option("repeat", "Повторить прошлую услугу", "date", "Действие", "Быстрая запись в знакомый формат", "1 минута"), option("offers", "Посмотреть предложения", "catalogue", "Действие", "Подборка по истории обращений", "Персонально")] },
    catalogue: { id: "catalogue", botMessage: "Что вас интересует сейчас?", options: fromCatalogue(profile, "qualification") },
    qualification: { id: "qualification", botMessage: "Что для вас важнее?", options: [option("fast", "Ближайшее время", "date", "Приоритет", "Сразу покажем свободные окна", "Сегодня"), option("specialist", "Конкретный специалист", "experts", "Приоритет", "Учтём предпочтение", "Персонально"), option("details", "Нужна консультация", "details", "Приоритет", "Соберём контекст для команды", "AI-подбор")] },
    details: { id: "details", botMessage: "Коротко опишите задачу — AI-помощник добавит контекст в карточку клиента.", input: { type: "text", placeholder: "Например, нужна консультация", saveAs: "Комментарий", nextStepId: "experts" } },
    experts: { id: "experts", botMessage: "Подобрали варианты с учётом вашего запроса:", integration, options: fromSpecialists(profile, "date") },
    date: { id: "date", botMessage: "Выберите время для записи:", integration, options: [option("today", "Сегодня · 18:30", "name", "Дата и время", "Ближайшее доступное окно", "Рекомендуем"), option("tomorrow", "Завтра · 12:00", "name", "Дата и время", "Удобное дневное окно", "Свободно"), option("weekend", "Суббота · 11:30", "name", "Дата и время", "Запись на выходных", "Свободно")] },
    name: name("phone"),
    phone: phone("Оставьте телефон для подтверждения и персональных уведомлений.", "crm"),
    crm: { id: "crm", botMessage: "Карточка клиента собрана: услуга, сегмент, предпочтения и контакт уже в CRM.", integration, options: [option("reminder", "Поставить напоминание", "automation", "Следующее действие", "За 24 часа до записи", "Автоматически"), option("followup", "Отправить подборку", "automation", "Следующее действие", "Персональное сообщение клиенту", "Автоматически")] },
    automation: { id: "automation", botMessage: "Автоматизация настроена: клиент получит нужное сообщение, а команда увидит статус в CRM.", integration, options: [option("finish", "Завершить сценарий", "done", "Статус", "Все действия записаны", "Готово")] },
    done: completed(profile, integration),
  };
}

const mini = (profile: BusinessProfile, note: string, subtitle: string, section: string): DemoMiniApp => ({ title: profile.name, tabs: ["Главная", "Услуги", "Запись"], note, subtitle, badge: section, section });

function miniAppSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const integration = `Мини-приложение + ${bookingIntegration(profile)}`;
  return {
    home: { id: "home", botMessage: `Откройте интерфейс «${profile.name}» — это отдельное Mini App внутри Telegram.`, miniApp: mini(profile, "Выберите нужный раздел", "Каталог, запись и личный кабинет в одном интерфейсе", "Главная"), options: [option("catalog", "Каталог услуг", "catalogue", "Раздел", "Карточки с ценами и деталями", "Услуги"), option("booking", "Быстрая запись", "date", "Раздел", "Свободные окна без переписки", "Запись"), option("account", "Личный кабинет", "account", "Раздел", "История обращений и предложения", "Профиль")] },
    catalogue: { id: "catalogue", botMessage: "Каталог открыт. Выберите услугу:", miniApp: mini(profile, "Услуги и цены", "Карточки адаптированы под выбранный бизнес", "Каталог"), options: fromCatalogue(profile, "service-details") },
    "service-details": { id: "service-details", botMessage: "Карточка услуги открыта: можно сразу продолжить к записи или сохранить её в личном кабинете.", miniApp: mini(profile, "Карточка услуги", "Описание, цена и действие клиента", "Услуга"), options: [option("booking", "Выбрать время", "date", "Действие", "Переход к расписанию", "Записаться"), option("save", "Сохранить в избранное", "account", "Действие", "Услуга появится в личном кабинете", "Сохранено")] },
    date: { id: "date", botMessage: "Расписание обновлено в реальном времени:", integration, miniApp: mini(profile, "Свободные даты", "Выберите подходящий день", "Расписание"), options: [option("today", "Сегодня", "time", "Дата", "2 свободных окна", "18:30"), option("tomorrow", "Завтра", "time", "Дата", "5 свободных окон", "12:00"), option("weekend", "На выходных", "time", "Дата", "Спокойный график", "11:30")] },
    time: { id: "time", botMessage: "Выберите конкретное окно:", integration, miniApp: mini(profile, "Выбор времени", "Бронирование займёт один шаг", "Расписание"), options: [option("first", "10:30", "phone", "Время", "Первое доступное окно", "Свободно"), option("second", "14:00", "phone", "Время", "Дневное окно", "Свободно"), option("third", "18:30", "phone", "Время", "Вечернее окно", "Свободно")] },
    phone: phone("Оставьте телефон — запись появится в личном кабинете сразу после подтверждения.", "account"),
    account: { id: "account", botMessage: "Личный кабинет обновлён: здесь клиент видит запись, историю и персональные предложения.", integration, miniApp: mini(profile, "Ваш личный кабинет", "Запись сохранится здесь после подтверждения", "Профиль"), options: [option("appointment", "Моя запись", "done", "Раздел", "Дата, время и выбранная услуга", "Активно"), option("offers", "Персональные предложения", "done", "Раздел", "Предложения по истории обращений", "Для вас")] },
    done: completed(profile, integration),
  };
}

const photoFormats = (nextStepId: string) => [option("hall-rent", "Аренда зала", nextStepId, "Формат съёмки", "Самостоятельная съёмка в студии", "от 2 000 ₽ / час"), option("photographer", "Фотосессия с фотографом", nextStepId, "Формат съёмки", "Зал, свет и работа фотографа", "от 7 500 ₽"), option("content", "Контент-съёмка", nextStepId, "Формат съёмки", "Для бренда, каталога или соцсетей", "от 12 000 ₽")];
const photoHalls = (nextStepId: string) => fromSpecialists(profileFor("Фотостудия", "photo"), nextStepId).map((item) => ({ ...item, saveAs: "Зал" }));
const photoDates = (nextStepId: string) => [option("today", "Сегодня", nextStepId, "Дата", "Осталось 2 окна", "14:00 · 18:00"), option("tomorrow", "Завтра", nextStepId, "Дата", "Больше доступного времени", "11:00 · 15:00"), option("weekend", "На выходных", nextStepId, "Дата", "Популярные часы", "3 окна")];
const photoTimes = (nextStepId: string) => [option("time-11", "11:00–12:00", nextStepId, "Время", "1 час аренды", "Свободно"), option("time-14", "14:00–16:00", nextStepId, "Время", "2 часа — популярный слот", "Свободно"), option("time-18", "18:00–20:00", nextStepId, "Время", "Вечерняя съёмка", "Свободно")];
const photoExtras = (nextStepId: string) => [option("makeup", "Нужен визажист", nextStepId, "Дополнительно", "Добавим к бронированию", "+ 3 000 ₽"), option("equipment", "Нужен свет и оборудование", nextStepId, "Дополнительно", "Подготовим до вашего прихода", "+ 1 500 ₽"), option("none", "Только зал", nextStepId, "Дополнительно", "Без дополнительных услуг", "Готово")];

function photoFunnelSteps(profile: BusinessProfile): Record<string, DemoStep> {
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! Помогу быстро подобрать формат съёмки в «${profile.name}».`, options: [option("start-booking", "Забронировать зал", "format", "Цель", "Подберём зал и доступный день", "≈ 2 минуты"), option("consult", "Нужна консультация", "format", "Цель", "Соберём запрос для администратора", "Без звонка")] },
    format: { id: "format", botMessage: "Какой формат съёмки планируете?", options: photoFormats("hall") },
    hall: { id: "hall", botMessage: "Какой зал вам ближе по стилю?", options: photoHalls("date") },
    date: { id: "date", botMessage: "Когда планируете съёмку?", options: photoDates("contact-channel") },
    "contact-channel": { id: "contact-channel", botMessage: "Куда отправить подборку зала и свободных окон?", options: [option("telegram", "В Telegram", "name", "Канал связи", "Администратор пришлёт подборку", "Telegram"), option("call", "Звонком", "name", "Канал связи", "Уточним детали по телефону", "Звонок")] },
    name: name("phone"), phone: phone("Оставьте телефон — администратор закрепит выбранный зал и свяжется с вами.", "done"), done: completed(profile, "Telegram администратору"),
  };
}

function photoBasicSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const integration = "CRM + расписание залов";
  return {
    welcome: { id: "welcome", botMessage: `Добро пожаловать в «${profile.name}»! Что хотите забронировать?`, options: [option("catalogue", "Залы и форматы съёмки", "format", "Раздел", "Каталог с ценами и условиями", "Каталог"), option("booking", "Быстрое бронирование", "hall", "Раздел", "Сразу выбрать зал и время", "Онлайн"), option("rules", "Условия аренды", "format", "Раздел", "Правила, оборудование и опции", "FAQ")] },
    format: { id: "format", botMessage: "Выберите формат — мы покажем подходящие залы:", options: photoFormats("hall") },
    hall: { id: "hall", botMessage: "Выберите зал и посмотрите его характеристики:", integration, options: photoHalls("date") },
    date: { id: "date", botMessage: "Расписание зала обновлено в реальном времени. Выберите дату:", integration, options: photoDates("time") },
    time: { id: "time", botMessage: "Какой слот бронируем?", options: photoTimes("extras") },
    extras: { id: "extras", botMessage: "Нужны дополнительные опции к съёмке?", options: photoExtras("name") },
    name: name("phone"), phone: phone("Оставьте телефон — отправим подтверждение бронирования и детали по залу.", "done"), done: completed(profile, integration),
  };
}

function photoAdvancedSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const integration = "CRM + онлайн-оплата";
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! «${profile.name}» учитывает историю бронирований, чтобы быстрее собрать съёмку.`, options: [option("new", "Я бронирую впервые", "format", "Статус клиента", "Подберём зал и формат с нуля", "Новый клиент"), option("return", "Я уже был в студии", "client-card", "Статус клиента", "Повторим любимый зал или услугу", "Личный путь")] },
    "client-card": { id: "client-card", botMessage: "Нашли ваш профиль: раньше вы выбирали Loft hall. Что сделать?", integration, options: [option("repeat", "Повторить Loft hall", "date", "Действие", "Быстрое бронирование по истории", "1 минута"), option("new-hall", "Подобрать другой зал", "format", "Действие", "Учтём задачу и стиль съёмки", "Подбор")] },
    format: { id: "format", botMessage: "Для какой съёмки нужен зал?", options: photoFormats("hall") },
    hall: { id: "hall", botMessage: "Подобрали залы по формату, свету и площади:", integration, options: photoHalls("date") },
    date: { id: "date", botMessage: "Выберите свободную дату — слот будет удержан 15 минут:", integration, options: photoDates("time") },
    time: { id: "time", botMessage: "Выберите длительность и время съёмки:", options: photoTimes("extras") },
    extras: { id: "extras", botMessage: "Добавим услуги и оборудование к единому заказу:", options: photoExtras("name") },
    name: name("phone"), phone: phone("Оставьте телефон — создадим карточку бронирования и отправим ссылку на предоплату.", "crm"),
    crm: { id: "crm", botMessage: "Бронирование создано в CRM: зал, слот, услуги и контакт собраны в одной карточке.", integration, options: [option("payment", "Получить ссылку на предоплату", "automation", "Следующее действие", "Слот закрепится после оплаты", "2 000 ₽"), option("reminder", "Поставить напоминание", "automation", "Следующее действие", "Напомним за 24 часа", "Автоматически")] },
    automation: { id: "automation", botMessage: "Автоматизация готова: клиент получит подтверждение, ссылку на оплату и напоминание, а команда увидит статус брони.", integration, options: [option("finish", "Завершить бронирование", "done", "Статус", "Все действия записаны", "Готово")] }, done: completed(profile, integration),
  };
}

function photoMiniAppSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const integration = "Mini App + CRM + онлайн-оплата";
  const app = (note: string, subtitle: string, section: string) => mini(profile, note, subtitle, section);
  return {
    home: { id: "home", botMessage: `Откройте Mini App «${profile.name}»: здесь клиент сам подбирает зал и завершает бронирование.`, miniApp: app("Бронирование фотостудии", "Залы, свободные слоты и заказ в одном интерфейсе", "Главная"), options: [option("catalogue", "Подобрать зал", "format", "Раздел", "По формату, свету и площади", "Залы"), option("booking", "Мои бронирования", "account", "Раздел", "Активные съёмки и история", "Профиль")] },
    format: { id: "format", botMessage: "Выберите формат съёмки:", miniApp: app("Формат съёмки", "Каталог подскажет подходящие залы", "Каталог"), options: photoFormats("hall") },
    hall: { id: "hall", botMessage: "Карточки залов показывают площадь, стиль и доступные слоты:", miniApp: app("Выберите зал", "Фильтр по свету, стилю и площади", "Каталог"), options: photoHalls("date") },
    date: { id: "date", botMessage: "Расписание синхронизировано с бронями студии:", integration, miniApp: app("Свободные даты", "Выберите день для съёмки", "Расписание"), options: photoDates("time") },
    time: { id: "time", botMessage: "Выберите свободный слот:", integration, miniApp: app("Время съёмки", "Слот удерживается до оформления", "Расписание"), options: photoTimes("extras") },
    extras: { id: "extras", botMessage: "Добавьте услуги к заказу в один тап:", miniApp: app("Дополнительные услуги", "Визажист, свет и оборудование", "Каталог"), options: photoExtras("phone") },
    phone: phone("Оставьте телефон — после предоплаты бронирование появится в личном кабинете.", "checkout"),
    checkout: { id: "checkout", botMessage: "Слот удержан. Подтвердите бронирование предоплатой:", integration, miniApp: app("Подтверждение брони", "Безопасная предоплата закрепляет выбранный слот", "Расписание"), options: [option("pay", "Внести предоплату", "account", "Оплата", "Бронь будет подтверждена", "2 000 ₽"), option("change", "Изменить время", "time", "Действие", "Вернуться к расписанию", "Назад")] },
    account: { id: "account", botMessage: "Бронирование подтверждено. В личном кабинете доступны зал, время, услуги и инструкция к съёмке.", integration, miniApp: app("Моё бронирование", "Все детали собраны в одной карточке", "Профиль"), options: [option("details", "Посмотреть бронь", "done", "Раздел", "Зал, дата, время и услуги", "Активно"), option("repeat", "Повторить съёмку", "format", "Действие", "Создать новую бронь по шаблону", "Быстро")] },
    done: completed(profile, integration),
  };
}

export function buildDynamicScenario(profile: BusinessProfile, tariff: PricingPlan, scenarioId = "custom"): DemoScenario {
  const photoSteps = tariff.id === "miniapp" ? photoMiniAppSteps : tariff.id === "advanced" ? photoAdvancedSteps : tariff.id === "funnel" ? photoFunnelSteps : photoBasicSteps;
  const steps = profile.archetype === "photo" ? photoSteps(profile) : tariff.id === "miniapp" ? miniAppSteps(profile) : tariff.id === "advanced" ? advancedSteps(profile) : tariff.id === "funnel" ? funnelSteps(profile) : basicSteps(profile);
  const titleByPlan: Record<string, string> = { funnel: "Автоматическая воронка", basic: "Каталог и запись", advanced: "Персональный сценарий", miniapp: "Mini App: интерфейс клиента" };
  const descriptionByPlan: Record<string, string> = { funnel: "Быстрая квалификация и передача", basic: "Услуги, FAQ и онлайн-запись", advanced: "CRM, сегменты и автоматизация", miniapp: "Каталог, расписание и личный кабинет" };
  return { id: scenarioId, industry: profile.name, title: titleByPlan[tariff.id] ?? "Сценарий клиента", description: descriptionByPlan[tariff.id] ?? "Путь клиента", icon: "business", startStepId: tariff.id === "miniapp" ? "home" : "welcome", steps, forceScenarioEntry: true };
}
