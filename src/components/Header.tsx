import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Sparkles,
  LayoutDashboard,
  Layers,
  Building2,
  FileCode,
  Globe2,
  ChevronDown,
  FileText,
  Plus
} from 'lucide-react';
import { LanguageCode } from '../types';

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'fa', label: 'فارسی' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' }
];

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    language,
    setLanguage,
    projects,
    currentProject,
    selectProject,
    createProject,
    setPresetsModalOpen,
    setBrandModalOpen,
    compilePrompt,
    setPromptPreviewOpen
  } = useAppStore();

  const t = TRANSLATIONS[language];

  const handleQuickCompile = () => {
    compilePrompt();
    setPromptPreviewOpen(true);
  };

  return (
    <header className="bg-slate-950/80 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md px-4 py-3" id="app-header">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-indigo-600/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wide flex items-center gap-2">
              SEO Content Intelligence Prompt Builder
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-mono">
                v2.5
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-sans">
              استودیوی حرفه‌ای ساخت پرامپت‌های مستر سئو و تولید محتوای هوش مصنوعی
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveView('wizard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'wizard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t.tabs.wizard}
          </button>

          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            {t.tabs.dashboard}
          </button>

          <button
            type="button"
            onClick={() => setPresetsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.tabs.presets}
          </button>

          <button
            type="button"
            onClick={() => setBrandModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            {t.tabs.brands}
          </button>
        </div>

        {/* Right Actions: Quick Project Selector, Compile Master Prompt, Language Switcher */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          {/* Project Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={currentProject?.id}
              onChange={(e) => selectProject(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-bold focus:outline-none max-w-[140px] truncate"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.articleTitle || p.topic}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Compile Trigger */}
          <button
            type="button"
            onClick={handleQuickCompile}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            کامپایل فوری
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-slate-300 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
