export type BusinessArchetype = "beauty" | "food" | "auto" | "medical" | "education" | "realty" | "repair" | "b2b" | "generic";
export type BusinessIcon = "scissors" | "utensils" | "car" | "stethoscope" | "graduation" | "house" | "wrench" | "briefcase";

export type BusinessProfile = {
  name: string;
  archetype: BusinessArchetype;
  icon: BusinessIcon;
  serviceLabel: string;
  services: string[];
  detailQuestion: string;
  contactPrompt: string;
  integration: string;
  completion: string;
};

type ProfileTemplate = Omit<BusinessProfile, "name">;

export const businessProfiles: Record<BusinessArchetype, ProfileTemplate> = {
  beauty: { archetype: "beauty", icon: "scissors", serviceLabel: "Услуга", services: ["Стрижка", "Окрашивание", "Укладка"], detailQuestion: "Когда вам удобно записаться?", contactPrompt: "Оставьте телефон для подтверждения записи", integration: "YCLIENTS", completion: "Запись передана администратору." },
  food: { archetype: "food", icon: "utensils", serviceLabel: "Заказ", services: ["Посмотреть меню", "Забронировать столик", "Оформить заказ"], detailQuestion: "На какое время или дату оформить запрос?", contactPrompt: "Оставьте телефон для подтверждения", integration: "CRM", completion: "Запрос передан менеджеру ресторана." },
  auto: { archetype: "auto", icon: "car", serviceLabel: "Услуга", services: ["Диагностика", "Техническое обслуживание", "Шиномонтаж"], detailQuestion: "Когда удобно приехать?", contactPrompt: "Оставьте телефон, чтобы подтвердить время", integration: "CRM", completion: "Заявка передана в автосервис." },
  medical: { archetype: "medical", icon: "stethoscope", serviceLabel: "Приём", services: ["Консультация специалиста", "Профилактический осмотр", "Лечение"], detailQuestion: "Выберите удобный день для приёма", contactPrompt: "Оставьте телефон для подтверждения записи", integration: "YCLIENTS", completion: "Запись передана администратору клиники." },
  education: { archetype: "education", icon: "graduation", serviceLabel: "Направление", services: ["Выбрать курс", "Пробный урок", "Консультация"], detailQuestion: "Какой формат обучения вам подходит?", contactPrompt: "Оставьте телефон для связи", integration: "CRM", completion: "Заявка на обучение передана менеджеру." },
  realty: { archetype: "realty", icon: "house", serviceLabel: "Задача", services: ["Купить объект", "Снять объект", "Получить консультацию"], detailQuestion: "Какой район рассматриваете?", contactPrompt: "Оставьте телефон для подбора вариантов", integration: "CRM", completion: "Запрос передан специалисту по недвижимости." },
  repair: { archetype: "repair", icon: "wrench", serviceLabel: "Задача", services: ["Вызвать мастера", "Получить расчёт", "Срочный выезд"], detailQuestion: "Коротко опишите задачу", contactPrompt: "Оставьте телефон для связи с мастером", integration: "CRM", completion: "Заявка передана мастеру." },
  b2b: { archetype: "b2b", icon: "briefcase", serviceLabel: "Запрос", services: ["Получить консультацию", "Обсудить проект", "Оставить заявку"], detailQuestion: "Коротко опишите задачу", contactPrompt: "Оставьте контакт для связи", integration: "CRM", completion: "Запрос передан менеджеру." },
  generic: { archetype: "generic", icon: "briefcase", serviceLabel: "Запрос", services: ["Узнать об услугах", "Получить консультацию", "Оставить заявку"], detailQuestion: "Коротко опишите, что вам нужно", contactPrompt: "Оставьте контакт для связи", integration: "CRM", completion: "Запрос передан менеджеру." },
};

export function profileFor(name: string, archetype: BusinessArchetype): BusinessProfile {
  return { name, ...businessProfiles[archetype] };
}
