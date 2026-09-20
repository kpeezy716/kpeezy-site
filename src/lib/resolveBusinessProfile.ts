import { profileFor, type BusinessArchetype, type BusinessProfile } from "@/data/businessProfiles";

const rules: Array<[BusinessArchetype, string[]]> = [
  ["beauty", ["барбер", "barber", "салон", "beauty", "космет", "spa", "спа", "маникюр", "парикмах"]],
  ["food", ["ресторан", "restaurant", "кафе", "coffee", "кофе", "пицц", "еда", "food", "бар "]],
  ["auto", ["авто", "car", "шиномонтаж", "детейл", "детейлинг", "сто", "гараж"]],
  ["medical", ["стомат", "dental", "клиник", "clinic", "медиц", "врач", "doctor", "health"]],
  ["education", ["школ", "school", "курс", "course", "обуч", "образован", "репетитор", "academy"]],
  ["realty", ["недвиж", "real estate", "риелтор", "застрой", "квартир", "жил"]],
  ["repair", ["ремонт", "repair", "мастер", "сантех", "электрик", "кондиционер", "монтаж"]],
  ["b2b", ["b2b", "агентств", "agency", "консалт", "consult", "производств", "логист"]],
];

export function normalizeBusinessName(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 60);
}

export function resolveBusinessProfile(value: string): BusinessProfile {
  const name = normalizeBusinessName(value) || "Ваш бизнес";
  const normalized = name.toLowerCase().replace(/ё/g, "е");
  const archetype = rules.find(([, keywords]) => keywords.some((keyword) => normalized.includes(keyword)))?.[0] ?? "generic";
  return profileFor(name, archetype);
}
