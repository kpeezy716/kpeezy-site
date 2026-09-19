"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, AtSign, CalendarDays, ChevronRight, ClipboardList, MoreVertical, Paperclip, RotateCcw, Send, Smile, Sparkles } from "lucide-react";
import { useDemoBot } from "@/hooks/useDemoBot";
import { siteConfig } from "@/config/site";
import type { DemoScenario } from "@/types/demo";
import type { PricingPlan } from "@/data/pricing";

export function DemoBot({ scenario, plan, onStateChange }: { scenario: DemoScenario; plan: PricingPlan; onStateChange?: (data: Record<string, string>, integration?: string) => void }) {
  const { state, start, choose, submit, reset, back, currentStep } = useDemoBot(scenario, plan);
  const [value, setValue] = useState("");
  const chat = useRef<HTMLDivElement>(null);
  useEffect(() => { if (chat.current) chat.current.scrollTo({ top: chat.current.scrollHeight, behavior: "smooth" }); }, [state.messages, state.isTyping]);
  useEffect(() => { setValue(""); }, [scenario.id, currentStep?.id]);
  useEffect(() => { onStateChange?.(state.collectedData, state.integration); }, [onStateChange, state.collectedData, state.integration]);
  const handleInput = () => {
    if (!currentStep?.input) return;
    const min = currentStep.input.type === "phone" ? 5 : 2;
    if (value.trim().length >= min) submit(value.trim(), currentStep.input.nextStepId, currentStep.input.saveAs);
  };
  const canSubmit = Boolean(currentStep?.input && value.trim().length >= (currentStep.input.type === "phone" ? 5 : 2) && !state.isTyping);
  return <div className="demo-bot-wrap">
    <div className="phone">
      <div className="island" /><div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>
        <div className="tg-head"><button className="back-button" aria-label="Вернуться назад" disabled={!state.history.length || state.isTyping} onClick={back}><ArrowLeft size={18}/></button><div className="bot-avatar"><Sparkles size={15}/></div><div><strong>Демо-бот</strong><small>бот</small></div><MoreVertical size={19}/></div>
        <div className="chat" ref={chat}>
          <div className="day">Сегодня</div>
          {state.messages.map((m) => <div className={`bubble ${m.sender}`} key={m.id}>{m.text}</div>)}
          {state.isTyping && <div className="typing"><i/><i/><i/></div>}
          {state.completed && <div className="complete"><div className="complete-icon">✓</div><strong>Готово</strong><p>Так мог бы выглядеть сценарий для вашего бизнеса.</p><button onClick={reset}>Пройти ещё раз</button><a target="_blank" href={siteConfig.telegramUrl}>Обсудить такого бота</a></div>}
          {!state.completed && currentStep?.options && state.messages.length > 0 && (plan.id === "miniapp" ? <MiniApp currentStep={currentStep.botMessage} options={currentStep.options} disabled={state.isTyping} onChoose={choose}/> : <div className="bot-options">{currentStep.options.map((option) => <button disabled={state.isTyping} onClick={() => choose(option)} key={option.id}>{option.label}</button>)}</div>)}
          {!state.completed && currentStep?.input && state.messages.length > 0 && <div className="input-flow"><input aria-label={currentStep.input.placeholder} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleInput()} placeholder={currentStep.input.placeholder}/><button aria-label="Отправить сообщение" disabled={!canSubmit} onClick={handleInput}><Send size={17}/></button><p>Демо-режим: введённые данные никуда не отправляются.</p></div>}
          {state.integration && <IntegrationPreview integration={state.integration} scenario={scenario}/>} 
        </div>
        <div className="chat-footer">{!state.messages.length && !state.isTyping ? <button className="telegram-start" onClick={start}>START</button> : <><Paperclip size={19}/><span>Сообщение...</span><Smile size={19}/></>}</div>
      </div>
    </div>
    <button className="reset" onClick={reset}><RotateCcw size={15}/> Начать заново</button>
  </div>;
}

function MiniApp({ currentStep, options, disabled, onChoose }: { currentStep: string; options: NonNullable<DemoScenario["steps"][string]["options"]>; disabled: boolean; onChoose: (option: NonNullable<DemoScenario["steps"][string]["options"]>[number]) => void }) { return <div className="mini-app"><div className="mini-app-head"><span>Мини-приложение</span><b>×</b></div><h4>{currentStep}</h4><div className="mini-app-cards">{options.map((option, index) => <button disabled={disabled} onClick={() => onChoose(option)} key={option.id}><i>{index % 2 === 0 ? <CalendarDays size={18}/> : <ClipboardList size={18}/>}</i><span>{option.label}</span><ChevronRight size={16}/></button>)}</div></div>; }

function IntegrationPreview({ integration, scenario }: { integration: string; scenario: DemoScenario }) { const isYclients = integration.includes("YCLIENTS"); const isCrm = integration.includes("CRM"); const isMedical = scenario.id === "medical"; return <div className={`service-preview ${isYclients ? "yclients" : isCrm ? "crm" : ""}`}><div className="service-preview-head"><strong>{isYclients ? "YCLIENTS" : isCrm ? "CRM" : integration}</strong><span>Демо</span></div>{isYclients ? <><p>Новая запись</p><div><b>{isMedical ? "Приём у стоматолога" : "Стрижка"}</b><small>{isMedical ? "Сегодня · 10:00" : "Сегодня · 15:00"}</small></div><button>Запись создана ✓</button></> : isCrm ? <><p>Карточка лида</p><div><b>Новый клиент</b><small>Источник: Telegram</small></div><button>Лид добавлен ✓</button></> : <><p>Действие подготовлено</p><div><b>{integration}</b><small>Данные переданы в демо-режиме</small></div></>}</div>; }

export function BusinessResult({ data, integration, plan }: { data: Record<string, string>; integration?: string; plan: PricingPlan }) { return <aside className="business-panel"><h3>{plan.name}</h3><p className="panel-text">Что получает бизнес по итогам этого пути.</p><div className="plan-features">{plan.features.slice(0, 3).map((feature) => <span key={feature}>✓ {feature}</span>)}</div><div className="data-list">{Object.keys(data).length ? Object.entries(data).map(([key, value]) => <div className="data-row" key={key}><span>✓</span><div><small>{key}</small><strong>{value}</strong></div></div>) : <div className="empty-data"><AtSign size={22}/><p>Пройдите сценарий — здесь появятся данные и действия для выбранного тарифа.</p></div>}</div>{integration && <div className="integration"><small>Имитация интеграции · Демо</small><strong>{integration}</strong><span>✓ действие подготовлено</span></div>}<div className="transfer"><p>Возможности тарифа:</p><div><b>CRM</b><b>Администратору</b><b>Таблицы Google</b><b>Почта</b></div></div></aside>; }
