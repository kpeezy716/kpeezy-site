"use client";
import { Menu, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import { LanguageToggle } from "@/components/ui/LocaleProvider";
const links = [["Услуги", "services"], ["Демо", "demo"], ["Стоимость", "pricing"], ["Контакты", "contact"]] as const;
export function Header() { const [open, setOpen] = useState(false); return <header><div className="nav shell"><a className="brand ai-logo" href="#top">{siteConfig.brand}</a><nav className={open ? "open" : ""}>{links.map(([label, id]) => <a onClick={() => setOpen(false)} key={id} href={`#${id}`}>{label}</a>)}</nav><LanguageToggle/><a className="telegram-link" href={siteConfig.telegramUrl} target="_blank"><Send size={15} /> <span>Написать в Telegram</span></a><button className="menu" aria-label="Открыть меню" onClick={() => setOpen(!open)}><Menu /></button></div></header>; }
