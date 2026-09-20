"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BriefcaseBusiness, CarFront, Check, Copy, GraduationCap, House, Layers3, Scissors, SprayCan, Stethoscope, Wrench } from "lucide-react";
import { scenarios } from "@/data/scenarios";
import { pricing, type PricingPlan } from "@/data/pricing";
import type { DemoScenario } from "@/types/demo";
import { DemoBot, BusinessResult } from "@/components/demo-bot/DemoBot";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { resolveBusinessProfile, normalizeBusinessName } from "@/lib/resolveBusinessProfile";
import { buildDynamicScenario } from "@/lib/buildDynamicScenario";
import type { BusinessProfile } from "@/data/businessProfiles";

const industryIcons = { scissors: Scissors, spray: SprayCan, tire: CarFront, education: GraduationCap, repair: Wrench, home: House, business: BriefcaseBusiness, medical: Stethoscope };
const demoPlans = pricing.filter((plan) => plan.id !== "support");
const industryAliases: Record<string, string> = { barbershop: "beauty", beauty: "beauty", spa: "beauty", cleaning: "cleaning", autoservice: "auto", "auto-service": "auto", auto: "auto", education: "education", clinic: "medical", dentistry: "medical", medical: "medical", repair: "repair", realty: "realty", b2b: "b2b" };
const industrySlugs: Record<string, string> = { beauty: "barbershop", cleaning: "cleaning", auto: "autoservice", education: "education", medical: "clinic", repair: "repair", realty: "realty", b2b: "b2b" };

function linkFor(plan: PricingPlan, scenario: DemoScenario) {
  const params = new URLSearchParams({ tariff: plan.id, industry: industrySlugs[scenario.id] ?? "cleaning" });
  if (scenario.id === "custom") { params.set("industry", "custom"); params.set("business", scenario.industry); }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function DemoSection() {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario>(scenarios[1]);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(demoPlans.find((plan) => plan.id === "basic") ?? demoPlans[0]);
  const [key, setKey] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [integration, setIntegration] = useState<string>();
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customBusinessInput, setCustomBusinessInput] = useState("");
  const [customBusinessProfile, setCustomBusinessProfile] = useState<BusinessProfile>();
  const demoRef = useRef<HTMLDivElement>(null);
  const sync = useCallback((newData: Record<string, string>, nextIntegration?: string) => { setData(newData); setIntegration(nextIntegration); }, []);
  const resetDemo = () => { setData({}); setIntegration(undefined); setKey((value) => value + 1); };
  const activeScenario = useMemo(() => customBusinessProfile ? buildDynamicScenario(customBusinessProfile, selectedPlan) : selectedScenario, [customBusinessProfile, selectedPlan, selectedScenario]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = demoPlans.find((item) => item.id === params.get("tariff"));
    const requestedIndustry = params.get("industry")?.toLowerCase().trim();
    const knownScenario = requestedIndustry ? scenarios.find((item) => item.id === industryAliases[requestedIndustry]) : undefined;
    if (plan) setSelectedPlan(plan);
    if (knownScenario) setSelectedScenario(knownScenario);
    if (requestedIndustry === "custom" && params.get("business")) {
      const business = normalizeBusinessName(params.get("business") ?? "");
      if (business.length >= 2) { setCustomBusinessInput(business); setCustomBusinessProfile(resolveBusinessProfile(business)); }
    }
    const timer = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams({ tariff: selectedPlan.id, industry: customBusinessProfile ? "custom" : (industrySlugs[selectedScenario.id] ?? "cleaning") });
    if (customBusinessProfile) params.set("business", customBusinessProfile.name);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [ready, selectedPlan.id, selectedScenario, customBusinessProfile]);

  const selectScenario = (id: string) => {
    const scenario = scenarios.find((item) => item.id === id);
    if (scenario) { setSelectedScenario(scenario); setCustomBusinessProfile(undefined); setCustomBusinessInput(""); resetDemo(); }
  };
  const selectPlan = (id: string) => {
    const plan = demoPlans.find((item) => item.id === id);
    if (plan) { setSelectedPlan(plan); resetDemo(); }
  };
  const createCustomDemo = () => {
    const business = normalizeBusinessName(customBusinessInput);
    if (business.length < 2) return;
    setCustomBusinessInput(business);
    setCustomBusinessProfile(resolveBusinessProfile(business));
    resetDemo();
    window.setTimeout(() => {
      const target = demoRef.current;
      if (target && target.getBoundingClientRect().top > window.innerHeight * .55) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };
  const shareDemo = async () => {
    try { await navigator.clipboard.writeText(linkFor(selectedPlan, selectedScenario)); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };
  const selectedFeatures = useMemo(() => selectedPlan.features.slice(0, 4), [selectedPlan.features]);

  return <section id="demo" className="section demo-section"><div className="shell">
    <SectionTitle center title="Попробуйте бота прямо сейчас" text="Выберите тариф и свой бизнес — бот покажет путь клиента в рамках выбранного решения."/>
    <div className="demo-picker"><div className="picker-head"><Layers3 size={17}/><div><strong>Выберите тариф</strong><small>Тариф определяет функциональность сценария.</small></div></div><div className="plan-grid">{demoPlans.map((plan) => <button type="button" className={selectedPlan.id === plan.id ? "plan-option active" : "plan-option"} onClick={() => selectPlan(plan.id)} key={plan.id}><span>{selectedPlan.id === plan.id && <Check size={14}/>}</span><strong>{plan.name}</strong><small>{plan.price}</small></button>)}</div></div>
    <div className="picker-head industry-head"><Layers3 size={17}/><div><strong>Выберите отрасль</strong><small>Каждый вариант открывает отдельный реалистичный путь клиента.</small></div></div>
    <div className="industry-grid">{scenarios.map((scenario) => { const Icon = industryIcons[scenario.icon]; return <button type="button" className={!customBusinessProfile && selectedScenario.id === scenario.id ? "industry active" : "industry"} onClick={() => selectScenario(scenario.id)} key={scenario.id}><i><Icon size={18}/></i><strong>{scenario.industry}</strong><small>{scenario.description}</small></button>; })}</div>
    <form className="custom-business" onSubmit={(event) => { event.preventDefault(); createCustomDemo(); }}><label htmlFor="custom-business">Не нашли свой бизнес?</label><div><input id="custom-business" value={customBusinessInput} maxLength={60} onChange={(event) => setCustomBusinessInput(event.target.value)} placeholder="Например, салон красоты" aria-describedby="custom-business-note"/><button type="submit" disabled={normalizeBusinessName(customBusinessInput).length < 2}>Создать демо</button></div><small id="custom-business-note">Демо-сценарий адаптируется под указанную сферу.</small></form>
    <div className="demo-summary"><p>Вы выбрали: <b>{selectedPlan.name}</b> для <b>{activeScenario.industry}</b></p><button type="button" onClick={shareDemo}><Copy size={15}/>{copied ? "Ссылка скопирована" : "Скопировать ссылку на демо"}</button></div>
    <div className="experience-label"><span>Демонстрационный сценарий</span><p>Функциональность и путь клиента зависят от выбранного тарифа.</p></div><div className="experience-frame" ref={demoRef}><div className="demo-layout"><DemoBot key={`${activeScenario.id}-${activeScenario.industry}-${selectedPlan.id}-${key}`} scenario={activeScenario} plan={selectedPlan} onStateChange={sync}/><BusinessResult data={data} integration={integration} plan={selectedPlan} scenario={activeScenario}/></div></div>
    <div className="demo-value"><h3>Возможности выбранного тарифа</h3>{selectedFeatures.map((item) => <p key={item}>✓ {item}</p>)}</div>
  </div></section>;
}
