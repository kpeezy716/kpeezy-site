import { siteConfig } from "@/config/site";
export function Footer() { return <footer><div className="shell footer-inner"><div><a className="brand ai-logo" href="#top">{siteConfig.brand}</a><p>Telegram-боты • мини-приложения • AI-автоматизация</p></div><a href={siteConfig.telegramUrl} target="_blank">Telegram: @{siteConfig.telegramUsername}</a><p>© {new Date().getFullYear()}</p></div></footer>; }
