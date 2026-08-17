import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ShieldCheck, Code2, Bot, Award, CheckCircle2 } from 'lucide-react';

const SCHEMA_TYPES = [
  { type: 'Article' as const, label: 'Article / BlogPosting', desc: 'نشانه‌گذاری استاندارد مقالات و اخبار' },
  { type: 'FAQPage' as const, label: 'FAQPage (پرسش و پاسخ)', desc: 'نمایش سوالات متداول در نتایج سرپ گوگل' },
  { type: 'HowTo' as const, label: 'HowTo (راهنمای گام‌به‌گام)', desc: 'مراحل عملیاتی همراه با تصاویر گام‌به‌گام' },
  { type: 'Product' as const, label: 'Product & Offer', desc: 'قیمت، موجودی انبار و ریتینگ محصول' },
  { type: 'Review' as const, label: 'Review / Rating', desc: 'ستاره‌های امتیازدهی و نقد کارشناسی' },
  { type: 'BreadcrumbList' as const, label: 'BreadcrumbList', desc: 'مسیر سلسله‌مراتبی صفحات در سرپ' }
];

export const Step10AISearchSchema: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();
  const schema = currentProject.schemaAndEEAT;

  const handleUpdateSchema = (field: keyof typeof schema, value: any) => {
    updateCurrentProject({
      schemaAndEEAT: {
        ...schema,
        [field]: value
      }
    });
  };

  const toggleSchemaType = (type: typeof SCHEMA_TYPES[0]['type']) => {
    const current = schema.schemaTypes || [];
    if (current.includes(type)) {
      handleUpdateSchema('schemaTypes', current.filter(t => t !== type));
    } else {
      handleUpdateSchema('schemaTypes', [...current, type]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-10-schema-container">
      {/* Schema.org Types Selection */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Code2 className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">انتخاب انواع کدهای اسکیما (Schema.org JSON-LD)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCHEMA_TYPES.map((item) => {
            const isSelected = (schema.schemaTypes || []).includes(item.type);
            return (
              <label
                key={item.type}
                className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSchemaType(item.type)}
                    className="rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-800"
                  />
                  <span className="text-xs font-bold text-slate-100">{item.label}</span>
                </div>
                <span className="text-[11px] text-slate-400">{item.desc}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Author Credibility & E-E-A-T Signals */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <ShieldCheck className="w-5 h-5" />
          <h4 className="font-bold text-slate-100 text-xs">
            سیگنال‌های اعتبار نویسنده و تخصص (E-E-A-T Framework)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">نام نویسنده / کارشناس</label>
            <input
              type="text"
              value={schema.authorName}
              onChange={(e) => handleUpdateSchema('authorName', e.target.value)}
              placeholder="مثال: مهندس محمدرضا سلیمانی"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">عنوان شغلی و تخصص</label>
            <input
              type="text"
              value={schema.authorTitle}
              onChange={(e) => handleUpdateSchema('authorTitle', e.target.value)}
              placeholder="مثال: کارشناس ارشد متالورژی و مشاور بازار آهن"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">پروفایل لینکدین یا صفحه نویسنده</label>
            <input
              type="url"
              value={schema.authorLinkedInOrUrl || ''}
              onChange={(e) => handleUpdateSchema('authorLinkedInOrUrl', e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-200">بیوگرافی تجربی و صلاحیت‌های نویسنده</label>
          <textarea
            rows={2}
            value={schema.authorBio}
            onChange={(e) => handleUpdateSchema('authorBio', e.target.value)}
            placeholder="شرح سوابق کاری، پروژه‌های نظارتی و تدوین مقالات تخصصی..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Generative Engine Optimization (GEO) & AI Citations */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Bot className="w-5 h-5 text-indigo-400 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              بهینه‌سازی برای موتورهای هوش مصنوعی (GEO - Generative Engine Optimization)
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-mono">
                SearchGPT • Perplexity • Gemini
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
              تنظیم لحن و ساختاربندی به فرمت فکت‌های صریح، داده‌های قابل استخراج آماری و سرفصل‌های دایرکت جهت نقل‌قول مستقیم در هوش مصنوعی.
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap self-start sm:self-auto">
          <input
            type="checkbox"
            checked={schema.geoOptimizedForAI}
            onChange={(e) => handleUpdateSchema('geoOptimizedForAI', e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-800"
          />
          <span className="text-xs font-bold text-slate-200">فعال‌سازی دستورات GEO</span>
        </label>
      </div>
    </div>
  );
};
