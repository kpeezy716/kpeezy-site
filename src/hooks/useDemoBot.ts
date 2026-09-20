"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { ChatMessage, DemoOption, DemoScenario, DemoState } from "@/types/demo";
import type { PricingPlan } from "@/data/pricing";

type Action =
  | { type: "reset"; scenario: DemoScenario }
  | { type: "addUser"; text: string; saveAs?: string; value?: string; nextStepId: string }
  | { type: "showBot"; scenario: DemoScenario; stepId: string; planIntro?: string; planIntegration?: string }
  | { type: "typing"; value: boolean }
  | { type: "back" };

const initial = (scenario: DemoScenario): DemoState => ({ scenarioId: scenario.id, currentStepId: scenario.startStepId, messages: [], collectedData: {}, isTyping: false, completed: false, history: [] });

function reducer(state: DemoState, action: Action): DemoState {
  if (action.type === "reset") return initial(action.scenario);
  if (action.type === "typing") return { ...state, isTyping: action.value };
  if (action.type === "back") { const previous = state.history.at(-1); return previous ? { ...state, ...previous, history: state.history.slice(0, -1), isTyping: false, completed: false } : state; }
  if (action.type === "addUser") return {
    ...state,
    messages: [...state.messages, { id: `${Date.now()}-user`, sender: "user", text: action.text }],
    currentStepId: action.nextStepId,
    collectedData: action.saveAs ? { ...state.collectedData, [action.saveAs]: action.value || action.text } : state.collectedData,
    history: [...state.history, { currentStepId: state.currentStepId, messages: state.messages, collectedData: state.collectedData, integration: state.integration }]
  };
  const step = action.scenario.steps[action.stepId];
  return {
    ...state,
    isTyping: false,
    currentStepId: step.id,
    completed: Boolean(step.completed),
    integration: step.integration || action.planIntegration,
    messages: [...state.messages, { id: `${Date.now()}-bot`, sender: "bot", text: [action.planIntro, step.botMessage].filter(Boolean).join("\n\n") }]
  };
}

export function useDemoBot(scenario: DemoScenario, plan: PricingPlan) {
  const activeScenario = useMemo<DemoScenario>(() => ({
    ...scenario,
    startStepId: scenario.forceScenarioEntry || plan.entry === "industry" ? scenario.startStepId : "__plan__",
    steps: {
      ...scenario.steps,
      __plan__: { ...plan.demoStep, id: "__plan__", options: plan.demoStep.options?.map((option) => ({ ...option, nextStepId: option.nextStepId === "__industry__" ? scenario.startStepId : option.nextStepId })) },
      ...Object.fromEntries(Object.entries(plan.demoMoreSteps ?? {}).map(([id, step]) => [id, { ...step, options: step.options?.map((option) => ({ ...option, nextStepId: option.nextStepId === "__industry__" ? scenario.startStepId : option.nextStepId })) }]))
    }
  }), [plan.demoMoreSteps, plan.demoStep, scenario]);
  const [state, dispatch] = useReducer(reducer, activeScenario, initial);
  useEffect(() => { dispatch({ type: "reset", scenario: activeScenario }); }, [activeScenario]);
  const deliver = useCallback((text: string, nextStepId: string, saveAs?: string, value?: string, includePlan = false) => {
    if (state.isTyping || state.completed) return;
    dispatch({ type: "addUser", text, nextStepId, saveAs, value });
    dispatch({ type: "typing", value: true });
    window.setTimeout(() => dispatch({ type: "showBot", scenario: activeScenario, stepId: nextStepId, planIntro: includePlan ? plan.demoIntro : undefined, planIntegration: includePlan ? plan.demoIntegration : undefined }), 450);
  }, [activeScenario, plan.demoIntegration, plan.demoIntro, state.completed, state.isTyping]);
  const start = useCallback(() => deliver("/start", activeScenario.startStepId, undefined, undefined, true), [activeScenario.startStepId, deliver]);
  const choose = useCallback((option: DemoOption) => deliver(option.label, option.nextStepId, option.saveAs, option.value), [deliver]);
  const submit = useCallback((value: string, nextStepId: string, saveAs: string) => deliver(value, nextStepId, saveAs), [deliver]);
  const reset = useCallback(() => dispatch({ type: "reset", scenario: activeScenario }), [activeScenario]);
  const back = useCallback(() => dispatch({ type: "back" }), []);
  return { state, start, choose, submit, reset, back, currentStep: activeScenario.steps[state.currentStepId] };
}
