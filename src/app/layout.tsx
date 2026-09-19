import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./additional.css";
import { siteConfig } from "@/config/site";

const montserrat = Montserrat({ subsets: ["cyrillic", "latin"], variable: "--font-montserrat" });
export const metadata: Metadata = { title: "Telegram-боты, Mini Apps и AI-автоматизация | KPEEZY", description: "Разработка Telegram-ботов, Mini Apps, CRM-интеграций и автоматизации бизнес-процессов.", openGraph: { title: siteConfig.title, description: siteConfig.description, type: "website" }, icons: { icon: "/favicon.svg" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body className={montserrat.variable}>{children}</body></html>; }
