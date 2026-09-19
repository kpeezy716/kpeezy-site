"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/components/ui/LocaleProvider";

const lead = "Разрабатываем решения под ключ: связываем между собой сервисы, настраиваем автоматические процессы, AI-помощников, Telegram Mini Apps и разворачиваем всё на сервере, чтобы система работала стабильно 24/7.";

export function Hero() {
  const { t } = useLocale();
  const integrations = [
    { name: "Telegram", logo: "https://cdn.simpleicons.org/telegram" },
    { name: "YCLIENTS", logo: "https://static.tildacdn.com/tild3236-3636-4965-b132-353065646264/logo_bottom.svg", className: "yclients-wordmark", showLabel: false },
    { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets" },
    { name: "1С", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/1C%20Company%20logo.svg", className: "wide-logo one-c-logo", showLabel: false },
    { name: "Битрикс24", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Bitrix24-logo-ru.svg", className: "wide-logo bitrix-logo", showLabel: false },
    { name: "amoCRM", logo: "https://www.amocrm.ru/views/pages/landing/images/about_us/logo_bl.png", className: "wide-logo amocrm-logo", showLabel: false },
    { name: "Instagram", logo: "https://cdn.simpleicons.org/instagram" }
  ];
  const LogoTrack = ({ reverse = false }: { reverse?: boolean }) => <div className={reverse ? "logo-track reverse" : "logo-track"}>{[...integrations, ...integrations].map((service, index) => <span key={`${service.name}-${index}`}><img className={service.className} src={service.logo} alt={service.name}/>{service.showLabel !== false && <b>{service.name}</b>}</span>)}</div>;
  return <section id="top" className="hero shell"><div className="hero-copy"><h1>{t("Telegram-боты")}<br/>{t("и автоматизация")}<br/><em>{t("для бизнеса")}</em></h1><p className="lead">{t(lead)}</p><div className="hero-actions"><a className="button button-primary" href="#demo">{t("Попробовать демо-бота")} <ArrowDown size={17}/></a><a className="button button-secondary" target="_blank" href={siteConfig.telegramUrl}>{t("Обсудить проект")} <ArrowRight size={17}/></a></div></div><aside className="integration-stack"><div className="logo-slider"><LogoTrack/><LogoTrack reverse/></div></aside></section>;
}
