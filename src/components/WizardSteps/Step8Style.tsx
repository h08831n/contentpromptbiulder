import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PointOfView, ReadingLevel, BrandVoice } from '../../types';
import { PenTool, Eye, BookOpen, Clock, Table, CheckSquare, HelpCircle, Sparkles } from 'lucide-react';

const POV_LIST: { pov: PointOfView; label: string; example: string }[] = [
  { pov: 'First Person Singular (من)', label: 'اول شخص مفرد (من)', example: 'من در این بررسی تجربیات ۱۰ ساله خود را با شما به اشتراک می‌گذارم' },
  { pov: 'First Person Plural (ما/تیم)', label: 'اول شخص جمع (ما / تیم)', example: 'تیم کارشناسی ما در این راهنما تمام فاکتورها را تحلیل کرده است' },
  { pov: 'Second Person (شما)', label: 'دوم شخص مخاطب (شما)', example: 'شما قبل از خرید میلگرد باید به ۳ فاکتور اساسی توجه کنید' },
  { pov: 'Third Person (او/آنها/بی‌طرف)', label: 'سوم شخص بی‌طرف (او/این موضوع)', example: 'خریداران در بازار آهن همواره با نوسانات روبه‌رو هستند' }
];

const READING_LEVELS: { level: ReadingLevel; label: string }[] = [
  { level: 'عامه‌فهم و ساده', label: 'عامه‌فهم و ساده (مناسب عموم مخاطبان)' },
  { level: 'متوسط و کاربردی', label: 'متوسط و کاربردی (استاندارد وب و تجارت)' },
  { level: 'تخصصی و کارشناسی', label: 'تخصصی و کارشناسی (B2B و مهندسی)' },
  { level: 'آکادمیک و فنی', label: 'آکادمیک و متالورژی عمیق' }
];

export const Step8Style: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();
  const style = currentProject.styleAndTone;

  const handleUpdateStyle = (field: keyof typeof style, value: any) => {
    updateCurrentProject({
      styleAndTone: {
        ...style,
        [field]: value
      }
    });
  };

  const toggleTemplate = (templateKey: keyof typeof style.structureTemplates) => {
    updateCurrentProject({
      styleAndTone: {
        ...style,
        structureTemplates: {
          ...style.structureTemplates,
          [templateKey]: !style.structureTemplates[templateKey]
        }
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-8-style-container">
      {/* POV & Reading Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* POV */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Eye className="w-4 h-4" />
            <h4 className="font-bold text-slate-100 text-xs">زاویه دید راوی (Point of View - POV)</h4>
          </div>

          <div className="space-y-2">
            {POV_LIST.map((item) => (
              <label
                key={item.pov}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  style.pov === item.pov
                    ? 'bg-indigo-950/50 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="pov"
                  checked={style.pov === item.pov}
                  onChange={() => handleUpdateStyle('pov', item.pov)}
                  className="mt-1 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-100">{item.label}</div>
                  <div className="text-[11px] text-slate-400">{item.example}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Reading Level & Length */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              سطح درک مطلب و سختی متن (Reading Grade Level)
            </label>
            <select
              value={style.readingLevel}
              onChange={(e) => handleUpdateStyle('readingLevel', e.target.value as ReadingLevel)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              {READING_LEVELS.map((r) => (
                <option key={r.level} value={r.level}>{r.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              حجم کلمات هدف (Target Word Count)
            </label>
            <input
              type="text"
              value={style.articleLength}
              onChange={(e) => handleUpdateStyle('articleLength', e.target.value)}
              placeholder="مثال: ۲,۵۰۰ - ۳,۲۰۰ کلمه"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-indigo-400" />
              سبک قلاب شروع متن (Intro Hook Style)
            </label>
            <select
              value={style.introHookStyle}
              onChange={(e) => handleUpdateStyle('introHookStyle', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Direct Problem Statement">طرح مستقیم صورت مسئله و درد خریدار (Direct Problem Statement)</option>
              <option value="Shocking Statistic">آمار تکان‌دهنده و داده بازار (Shocking Statistic)</option>
              <option value="Question-Based">پرسش چالش‌برانگیز در ذهن مخاطب (Question-Based)</option>
              <option value="Storytelling">داستان‌سرایی و سناریوی واقعی کارگاهی (Storytelling)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mandatory Layout & Structural Blocks */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Table className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">المان‌های ساختاریافته اجباری در متن (Layout Blueprints)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { key: 'requireSummaryBox' as const, title: 'باکس خلاصه سریع (Summary Box)', desc: 'چکیده نکات کلیدی در ابتدای مقاله برای مخاطبان کم‌حوصله' },
            { key: 'requireComparisonTable' as const, title: 'جدول جامع مقایسه (Comparison Table)', desc: 'جدول استاندارد مارک‌داون شامل مشخصات، وزن و قیمت' },
            { key: 'requireChecklist' as const, title: 'چک‌لیست گام‌به‌گام (Checklist)', desc: 'فهرست بررسی قبل از خرید یا اجرای پروژه' },
            { key: 'requireKeyTakeaways' as const, title: 'نکات کلیدی هر بخش (Key Takeaways)', desc: 'بولت‌پوینت‌های جمع‌بندی بعد از هر سرفصل مهم' },
            { key: 'requireFAQ' as const, title: 'بخش سوالات متداول (FAQ Section)', desc: 'حداقل ۵ پرسش و پاسخ جامع بر اساس سرچ کاربران' }
          ].map((item) => (
            <label
              key={item.key}
              className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                style.structureTemplates[item.key]
                  ? 'bg-indigo-950/50 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={style.structureTemplates[item.key]}
                  onChange={() => toggleTemplate(item.key)}
                  className="rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-800"
                />
                <span className="text-xs font-bold text-slate-100">{item.title}</span>
              </div>
              <span className="text-[11px] text-slate-400">{item.desc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
