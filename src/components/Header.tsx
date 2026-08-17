import React from 'react';
import { useAppStore, AppView } from '../store/useAppStore';
import {
  Sparkles,
  Table,
  BarChart3,
  ListTodo,
  Compass,
  Calendar,
  Bot,
  Network,
  Link2,
  FileSpreadsheet,
  Upload,
  FileCode,
  Building2,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { exportContentPlanToExcel } from '../engine/excelEngine';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    contentPlan,
    currentBrand,
    mode,
    setMode,
    setExcelImportModalOpen,
    setBrandModalOpen,
    setPresetsModalOpen,
    setPromptPreviewOpen,
    compilePrompt,
    showNotification
  } = useAppStore();

  const handleExportExcel = () => {
    exportContentPlanToExcel(contentPlan, `AhanInja_SEO_Content_Matrix_${new Date().toISOString().split('T')[0]}.xlsx`);
    showNotification('فایل اکسل با ۵۰ ستون کامل دانلود شد.', 'success');
  };

  const handleQuickCompile = () => {
    compilePrompt();
    setPromptPreviewOpen(true);
  };

  const navItems: { view: AppView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { view: 'content-plan', label: 'جدول ۵۰ فیلدی محتوا', icon: Table },
    { view: 'seo-dashboard', label: 'عملیات و فرصت‌ها', icon: BarChart3 },
    { view: 'audit-suite', label: 'حسابرسی فنی ۱۲ گانه', icon: ShieldCheck },
    { view: 'task-center', label: 'مرکز تسک‌های سئو', icon: ListTodo },
    { view: 'wizard', label: 'ویزارد پرامپت', icon: Compass },
    { view: 'roadmap', label: 'نقشه راه و تقویم', icon: Calendar },
    { view: 'copilot', label: 'دستیار AI سئو', icon: Bot },
    { view: 'knowledge-graph', label: 'پایگاه دانش فولاد', icon: Network },
    { view: 'integrations', label: 'اتصالات گوگل', icon: Link2 }
  ];

  return (
    <header className="bg-slate-950/90 border-b border-slate-800/90 sticky top-0 z-40 backdrop-blur-lg px-4 py-2.5" id="app-header">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Brand & Platform Identity */}
        <div className="flex items-center justify-between w-full xl:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-500 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black text-white tracking-tight">
                  آهن اینجا <span className="text-amber-400 font-medium text-xs">| AhanInja SEO Intelligence</span>
                </h1>
                <button
                  onClick={() => setMode(mode === 'production' ? 'demo' : 'production')}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                    mode === 'production'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}
                  title="تغییر وضعیت بین حالت پروداکشن واقعی و دمو"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${mode === 'production' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {mode === 'production' ? 'PROD LIVE' : 'DEMO MODE'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                موتور سئو ۱۲ مرحله‌ای، ماتریس ۵۰ فیلد، همگام‌سازی اکسل، سرچ کنسول و پایگاه دانش فولاد
              </p>
            </div>
          </div>

          {/* Mobile Fast Action Buttons */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="p-1.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs"
              title="خروجی اکسل"
            >
              <FileSpreadsheet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setExcelImportModalOpen(true)}
              className="p-1.5 bg-slate-900 text-slate-200 border border-slate-800 rounded-lg text-xs"
              title="ورودی اکسل"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Primary Nav Tabs */}
        <nav className="flex items-center overflow-x-auto no-scrollbar gap-1 bg-slate-900/80 border border-slate-800/80 p-1 rounded-xl max-w-full">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20 font-black'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="hidden xl:flex items-center gap-2">
          {/* Excel Export Button */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-2.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="خروجی اکسل ۵۰ ستونه"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            خروجی اکسل
          </button>

          {/* Excel Import Button */}
          <button
            type="button"
            onClick={() => setExcelImportModalOpen(true)}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="ورود فایل اکسل یا CSV"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            ورودی اکسل
          </button>

          {/* Quick Master Prompt Preview */}
          <button
            type="button"
            onClick={handleQuickCompile}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-sm shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            پرامپت مستر
          </button>

          {/* Brand Profile Button */}
          <button
            type="button"
            onClick={() => setBrandModalOpen(true)}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title="پروفایل برند آهن اینجا"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
