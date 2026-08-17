import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { WIZARD_STEPS } from '../data/presets';
import { TRANSLATIONS } from '../i18n/translations';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Globe,
  FileText,
  Compass,
  Key,
  Search,
  Network,
  PenTool,
  Link2,
  Code2,
  MousePointerClick,
  FileCode
} from 'lucide-react';

import { Step1Brand } from './WizardSteps/Step1Brand';
import { Step2Website } from './WizardSteps/Step2Website';
import { Step3Content } from './WizardSteps/Step3Content';
import { Step4SearchIntent } from './WizardSteps/Step4SearchIntent';
import { Step5Keywords } from './WizardSteps/Step5Keywords';
import { Step6SERP } from './WizardSteps/Step6SERP';
import { Step7Strategy } from './WizardSteps/Step7Strategy';
import { Step8Style } from './WizardSteps/Step8Style';
import { Step9LinksVisuals } from './WizardSteps/Step9LinksVisuals';
import { Step10AISearchSchema } from './WizardSteps/Step10AISearchSchema';
import { Step11Advanced } from './WizardSteps/Step11Advanced';
import { Step12CompilePrompt } from './WizardSteps/Step12CompilePrompt';

const STEP_ICONS = [
  Building2,
  Globe,
  FileText,
  Compass,
  Key,
  Search,
  Network,
  PenTool,
  Link2,
  Code2,
  MousePointerClick,
  FileCode
];

export const Wizard: React.FC = () => {
  const {
    activeStep,
    setActiveStep,
    nextStep,
    prevStep,
    language,
    setPresetsModalOpen,
    compilePrompt,
    setPromptPreviewOpen
  } = useAppStore();
  const t = TRANSLATIONS[language];

  const currentStepDef = WIZARD_STEPS[activeStep - 1] || WIZARD_STEPS[0];

  const renderStepComponent = () => {
    switch (activeStep) {
      case 1: return <Step1Brand />;
      case 2: return <Step2Website />;
      case 3: return <Step3Content />;
      case 4: return <Step4SearchIntent />;
      case 5: return <Step5Keywords />;
      case 6: return <Step6SERP />;
      case 7: return <Step7Strategy />;
      case 8: return <Step8Style />;
      case 9: return <Step9LinksVisuals />;
      case 10: return <Step10AISearchSchema />;
      case 11: return <Step11Advanced />;
      case 12: return <Step12CompilePrompt />;
      default: return <Step1Brand />;
    }
  };

  return (
    <div className="space-y-6" id="main-wizard-wrapper">
      {/* 12-Step Horizontal Navigation Stepper */}
      <div className="bg-slate-900/60 border border-slate-800/90 p-4 rounded-3xl backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {WIZARD_STEPS.map((s, idx) => {
            const Icon = STEP_ICONS[idx] || FileText;
            const isActive = activeStep === s.stepNumber;
            const isCompleted = activeStep > s.stepNumber;

            return (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => setActiveStep(s.stepNumber)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all whitespace-nowrap text-xs font-bold cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : isCompleted
                    ? 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.stepNumber}
                </div>
                <span>{language === 'fa' ? s.titleFa : s.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Step Context Header */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs font-mono">
              {activeStep}/12
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                {language === 'fa' ? currentStepDef.titleFa : currentStepDef.titleEn}
              </h2>
              <p className="text-[11px] text-slate-400">{currentStepDef.descriptionFa}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPresetsModalOpen(true)}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              بارگذاری قالب آماده
            </button>
          </div>
        </div>
      </div>

      {/* Active Step Dynamic Form View */}
      <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-3xl shadow-xl min-h-[420px]">
        {renderStepComponent()}
      </div>

      {/* Bottom Step Control Navigation Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={activeStep === 1}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeStep === 1
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          {t.actions.previousStep}
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span>{t.labels.step}</span>
          <span className="font-bold text-indigo-300">{activeStep}</span>
          <span>{t.labels.of}</span>
          <span>12</span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (activeStep === 12) {
              compilePrompt();
              setPromptPreviewOpen(true);
            } else {
              nextStep();
            }
          }}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          {activeStep === 12 ? (
            <>
              <Sparkles className="w-4 h-4" />
              {t.actions.compilePrompt}
            </>
          ) : (
            <>
              {t.actions.nextStep}
              <ChevronLeft className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
