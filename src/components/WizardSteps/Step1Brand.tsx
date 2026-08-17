import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TRANSLATIONS } from '../../i18n/translations';
import { BrandVoice, IndustryType } from '../../types';
import { Building2, Plus, Sparkles, ShieldAlert, BookOpen, Layers } from 'lucide-react';

const INDUSTRIES: IndustryType[] = [
  'Steel', 'Construction', 'E-commerce', 'Technology', 'SaaS',
  'Healthcare', 'Finance', 'Education', 'Travel', 'Real Estate',
  'Food', 'Fashion', 'Manufacturing', 'Services', 'Automotive', 'Legal', 'Other'
];

const BRAND_VOICES: { value: BrandVoice; label: string; desc: string }[] = [
  { value: 'Authoritative', label: 'مرجع، قاطع و تخصصی (Authoritative)', desc: 'مناسب لیدرهای بازار، راهنماهای مهندسی و متالورژی' },
  { value: 'Professional', label: 'رسمی و شرکتی (Professional)', desc: 'لحن استاندارد B2B و خدمات تجاری' },
  { value: 'Conversational', label: 'دوستانه و محاوره‌ای کنترل‌شده (Conversational)', desc: 'مناسب وبلاگ‌های لایف‌استایل و بررسی‌های عامه‌پسند' },
  { value: 'Technical', label: 'کاملاً فنی و مهندسی (Technical)', desc: 'تمرکز روی پارامترها، کدها، آلیاژها و استانداردها' },
  { value: 'Journalistic', label: 'ژورنالیستی و بی‌طرف (Journalistic)', desc: 'ایده‌آل برای رپورتاژهای آگهی خبرگزاری‌ها' },
  { value: 'Sales-Oriented', label: 'ترغیب‌کننده و فروش‌محور (Sales-Oriented)', desc: 'مناسب لندینگ‌های فروشگاهی و معرفی آفرها' }
];

export const Step1Brand: React.FC = () => {
  const { currentBrand, updateBrand, brands, selectBrand, setBrandModalOpen, language } = useAppStore();
  const t = TRANSLATIONS[language];

  if (!currentBrand) return null;

  return (
    <div className="space-y-6 animate-fadeIn" id="step-1-brand-container">
      {/* Brand Selection / Quick Bar */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-400" />
          <span className="text-xs text-slate-300 font-semibold">برند فعال در این پروژه:</span>
          <select
            value={currentBrand.id}
            onChange={(e) => selectBrand(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-indigo-300 font-bold text-xs rounded-xl px-3 py-1.5 focus:border-indigo-500 focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name} ({b.industry})</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setBrandModalOpen(true)}
          className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          مدیریت یا افزودن برند جدید
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Name & Legal Name */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              نام تجاری برند (Brand Name)
            </label>
            <input
              type="text"
              value={currentBrand.name}
              onChange={(e) => updateBrand(currentBrand.id, { name: e.target.value })}
              placeholder="مثال: آهن آنلاین اسپادانا"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              صنعت و زمینه کاری (Industry)
            </label>
            <select
              value={currentBrand.industry}
              onChange={(e) => updateBrand(currentBrand.id, { industry: e.target.value as IndustryType })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              آدرس وبسایت رسمی
            </label>
            <input
              type="url"
              value={currentBrand.website}
              onChange={(e) => updateBrand(currentBrand.id, { website: e.target.value })}
              placeholder="https://example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Brand Voice / Tone */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-slate-200">
            لحن و صدای برند (Brand Voice & Personality)
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {BRAND_VOICES.map((v) => (
              <label
                key={v.value}
                className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  currentBrand.brandVoice === v.value
                    ? 'bg-indigo-950/50 border-indigo-500/80 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="brandVoice"
                  checked={currentBrand.brandVoice === v.value}
                  onChange={() => updateBrand(currentBrand.id, { brandVoice: v.value })}
                  className="mt-1 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-100">{v.label}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{v.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition & Brand Positioning */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              مزیت رقابتی یکتا (Unique Selling Proposition - USP)
            </label>
            <textarea
              rows={3}
              value={currentBrand.usp}
              onChange={(e) => updateBrand(currentBrand.id, { usp: e.target.value })}
              placeholder="چرا مشتری باید از شما خرید کند؟ مثال: ارائه برگه آنالیز رایگان، استعلام آنلاین قیمت، تحویل در کمتر از ۲۴ ساعت"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              پایگاه دانش، تخصص و سرتیفیکیت‌ها (E-E-A-T Knowledge Base)
            </label>
            <textarea
              rows={3}
              value={currentBrand.knowledgeBase.expertise}
              onChange={(e) => updateBrand(currentBrand.id, {
                knowledgeBase: { ...currentBrand.knowledgeBase, expertise: e.target.value }
              })}
              placeholder="سوابق تجربی، سال‌های فعالیت در بازار، آزمایشگاه‌های تخصصی، مجوزهای رسمی و گواهینامه‌های استاندارد"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Forbidden Claims and Terms (Red Lines) */}
        <div className="border-t border-slate-800/80 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              ادعاها و کلمات ممنوعه (Forbidden Claims / Words)
            </label>
            <input
              type="text"
              value={currentBrand.forbiddenTerms.join(', ')}
              onChange={(e) => updateBrand(currentBrand.id, {
                forbiddenTerms: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              })}
              placeholder="مثال: ارزان‌ترین در جهان، جنس تقلبی، تخفیف فضایی (با کاما جدا کنید)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-rose-200 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              دستورالعمل‌های نگارشی و خط مشی محتوایی
            </label>
            <input
              type="text"
              value={currentBrand.knowledgeBase.editorialGuidelines}
              onChange={(e) => updateBrand(currentBrand.id, {
                knowledgeBase: { ...currentBrand.knowledgeBase, editorialGuidelines: e.target.value }
              })}
              placeholder="مثال: تمام اعداد به فارسی نوشته شوند، واحدها بر حسب کیلوگرم باشد"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
