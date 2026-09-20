import type { BusinessProfile } from "@/data/businessProfiles";
import type { PricingPlan } from "@/data/pricing";
import type { DemoOption, DemoScenario, DemoStep } from "@/types/demo";

const option = (id: string, label: string, nextStepId: string, saveAs: string): DemoOption => ({ id, label, nextStepId, saveAs });
const serviceOptions = (profile: BusinessProfile, nextStepId: string) => profile.services.map((label, index) => option(`service-${index}`, label, nextStepId, profile.serviceLabel));
const input = (botMessage: string, placeholder: string, saveAs: string, nextStepId: string): DemoStep => ({ id: nextStepId === "contact" ? "details" : nextStepId, botMessage, input: { type: "text", placeholder, saveAs, nextStepId } });

function finish(profile: BusinessProfile, integration = profile.integration): DemoStep {
  return { id: "done", botMessage: `Спасибо! ${profile.completion}`, integration, completed: true };
}

function basicSteps(profile: BusinessProfile): Record<string, DemoStep> {
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! Это демо для «${profile.name}». Что вас интересует?`, options: [option("catalog", "Услуги и цены", "service", "Раздел"), option("book", "Оставить заявку", "details", "Раздел"), option("faq", "Частые вопросы", "faq", "Раздел")] },
    service: { id: "service", botMessage: "Выберите подходящий вариант:", options: serviceOptions(profile, "details") },
    faq: { id: "faq", botMessage: "Здесь бот отвечает на частые вопросы и помогает выбрать следующий шаг.", options: [option("faq-service", "Посмотреть услуги", "service", "Действие")] },
    details: input(profile.detailQuestion, "Введите детали", "Детали", "contact"),
    contact: { id: "contact", botMessage: profile.contactPrompt, input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
    done: finish(profile, profile.integration === "YCLIENTS" ? "YCLIENTS" : "Telegram администратору"),
  };
}

function advancedSteps(profile: BusinessProfile): Record<string, DemoStep> {
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! Демо «${profile.name}» уточнит запрос и подготовит данные для команды.`, options: [option("catalog", "Выбрать услугу", "service", "Раздел"), option("consult", "Получить консультацию", "segment", "Раздел")] },
    service: { id: "service", botMessage: "Выберите интересующий вариант:", options: serviceOptions(profile, "segment") },
    segment: { id: "segment", botMessage: "Это первое обращение?", options: [option("new", "Впервые", "details", "Сегмент"), option("return", "Уже обращался", "details", "Сегмент")] },
    details: input(profile.detailQuestion, "Введите детали", "Детали", "contact"),
    contact: { id: "contact", botMessage: profile.contactPrompt, input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "crm" } },
    crm: { id: "crm", botMessage: "Карточка клиента подготовлена. Что сделать дальше?", integration: profile.integration === "YCLIENTS" ? "YCLIENTS + CRM" : "CRM", options: [option("manager", "Передать менеджеру", "done", "Следующее действие"), option("reminder", "Отправить напоминание", "done", "Следующее действие")] },
    done: finish(profile, profile.integration === "YCLIENTS" ? "YCLIENTS + CRM" : "CRM"),
  };
}

function miniAppSteps(profile: BusinessProfile): Record<string, DemoStep> {
  const miniApp = { title: profile.name, tabs: ["Главная", "Услуги", "Запись"], note: "Интерфейс адаптирован под бизнес" };
  return {
    home: { id: "home", botMessage: `Откройте мини-приложение «${profile.name}».`, miniApp, options: [option("catalog", "Каталог услуг", "service", "Раздел"), option("booking", "Записаться", "details", "Раздел"), option("profile", "Мои заявки", "details", "Раздел")] },
    service: { id: "service", botMessage: "Выберите услугу в каталоге:", miniApp, options: serviceOptions(profile, "details") },
    details: { id: "details", botMessage: profile.detailQuestion, miniApp, options: [option("today", "Сегодня", "contact", "Дата"), option("tomorrow", "Завтра", "contact", "Дата"), option("weekend", "На выходных", "contact", "Дата")] },
    contact: { id: "contact", botMessage: profile.contactPrompt, input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
    done: finish(profile, "Мини-приложение + " + profile.integration),
  };
}

function funnelSteps(profile: BusinessProfile): Record<string, DemoStep> {
  return {
    welcome: { id: "welcome", botMessage: `Здравствуйте! Помогу быстро передать запрос в «${profile.name}».`, options: [option("service", "Выбрать услугу", "service", "Целевое действие"), option("lead", "Оставить заявку", "details", "Целевое действие")] },
    service: { id: "service", botMessage: "Выберите интересующий вариант:", options: serviceOptions(profile, "details") },
    details: input("Коротко опишите запрос", "Ваш запрос", "Детали", "contact"),
    contact: { id: "contact", botMessage: "Как удобнее с вами связаться?", options: [option("telegram", "В Telegram", "done", "Канал связи"), option("phone", "Звонком", "phone", "Канал связи")] },
    phone: { id: "phone", botMessage: "Оставьте номер телефона", input: { type: "phone", placeholder: "+7 999 000 00 00", saveAs: "Телефон", nextStepId: "done" } },
    done: finish(profile, "Telegram администратору"),
  };
}

export function buildDynamicScenario(profile: BusinessProfile, tariff: PricingPlan): DemoScenario {
  const steps = tariff.id === "miniapp" ? miniAppSteps(profile) : tariff.id === "advanced" ? advancedSteps(profile) : tariff.id === "funnel" ? funnelSteps(profile) : basicSteps(profile);
  return { id: "custom", industry: profile.name, title: `${profile.name} • Демо`, description: "Сценарий адаптирован под выбранную отрасль", icon: "business", startStepId: tariff.id === "miniapp" ? "home" : "welcome", steps, forceScenarioEntry: true };
}
