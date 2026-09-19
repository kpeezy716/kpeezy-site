import Image from "next/image";
import { Check } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const projects = [
  { title: "Telegram-бот для барбершопа", image: "/mockups/barbershop.png", alt: "Барбер работает с клиентом", features: ["Услуги", "Мастера", "FAQ", "YCLIENTS", "Заявки"], concept: "Запись и подбор услуги" },
  { title: "Telegram-бот для SPA", image: "/mockups/spa.png", alt: "Специалист готовит SPA-процедуру", features: ["SPA-программы", "Прайс", "FAQ", "Запись", "Консультация"], concept: "Программы и запись" },
  { title: "Telegram-сервис для клининга", image: "/mockups/cleaning.png", alt: "Команда выполняет уборку", features: ["Расчёт", "Дополнительные услуги", "Заявка", "Менеджер"], concept: "Расчёт и заявка" }
];

export function DemoProjects() { return <section id="projects" className="section shell"><SectionTitle eyebrow="ПОРТФОЛИО" title="Демонстрационные проекты" text="Примеры того, как мои решения могут выглядеть для разных типов бизнеса."/><div className="project-grid">{projects.map((project) => <article className="project-card" key={project.title}><div className="project-screen"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 720px) 100vw, 33vw"/><span>ДЕМО-КОНЦЕПТ</span><p>{project.concept}</p></div><h3>{project.title}</h3><div className="feature-tags">{project.features.map((feature) => <span key={feature}><Check size={12}/>{feature}</span>)}</div></article>)}</div></section>; }
