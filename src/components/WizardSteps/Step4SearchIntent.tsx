import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SearchIntentType, FunnelStage } from '../../types';
import { HelpCircle, Filter, HeartCrack, CheckCircle2, Compass } from 'lucide-react';

const SEARCH_INTENTS: { type: SearchIntentType; title: string; desc: string }[] = [
  { type: 'Informational', title: 'اطلاعاتی و دانشی (Informational)', desc: 'کاربر به دنبال یادگیری، پاسخ به سوال یا فهمیدن نحوه کار است (مثال: میلگرد A3 چیست؟)' },
  { type: 'Commercial', title: 'بررسی تجاری و مقایسه (Commercial Investigation)', desc: 'کاربر قصد خرید دارد اما در حال مقایسه برندها، قیمت‌ها و کیفیت‌هاست (مثال: مقایسه میلگرد اصفهان و نیشابور)' },
  { type: 'Transactional', title: 'خرید و اقدام مستقیم (Transactional)', desc: 'کاربر آماده سفارش و پرداخت است (مثال: خرید اینترنتی میلگرد ۱۶)' },
  { type: 'Navigational', title: 'مسیریابی به سایت/صفحه مشخص (Navigational)', desc: 'کاربر به دنبال یک صفحه خاص از یک برند است (مثال: قیمت میلگرد اسپادانا)' },
  { type: 'Comparison', title: 'مقایسه‌ای و رتبه‌بندی (Comparison)', desc: 'بررسی ۱۰ محصول برتر با جدول مشخصات و تفاوت‌ها' },
  { type: 'Problem Solving', title: 'حل مسئله و رفع خطا (Problem Solving)', desc: 'رفع مشکل، عیب‌یابی فنی و راهکارهای فوری' },
  { type: 'Local', title: 'محلی و جغرافیایی (Local)', desc: 'جستجوی خدمات در شهر یا محدوده جغرافیایی خاص (مثال: انبار آهن شادآباد تهران)' }
];

const FUNNEL_STAGES: { stage: FunnelStage; title: string; desc: string }[] = [
  { stage: 'TOFU (آگاهی)', title: 'بالای قیف (TOFU - Top of Funnel)', desc: 'جذب مخاطب عمومی، افزایش آگاهی از مسئله و ایجاد تعامل اولیه' },
  { stage: 'MOFU (بررسی و ارزیابی)', title: 'میان قیف (MOFU - Middle of Funnel)', desc: 'ارزیابی گزینه‌ها، مقایسه تخصصی و راهنمای انتخاب' },
  { stage: 'BOFU (تصمیم‌گیری و خرید)', title: 'پایین قیف (BOFU - Bottom of Funnel)', desc: 'تبدیل نهایی، ارائه آفر، پیش‌فاکتور و ترغیب به ثبت خرید' }
];

export const Step4SearchIntent: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();

  const handleUpdateIntent = (field: keyof typeof currentProject.searchIntent, value: any) => {
    updateCurrentProject({
      searchIntent: {
        ...currentProject.searchIntent,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-4-intent-container">
      {/* Search Intent Selector */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Compass className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">قصد جستجوی کاربر (Search Intent)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SEARCH_INTENTS.map((item) => (
            <label
              key={item.type}
              className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                currentProject.searchIntent.intent === item.type
                  ? 'bg-indigo-950/50 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <input
                  type="radio"
                  name="searchIntent"
                  checked={currentProject.searchIntent.intent === item.type}
                  onChange={() => handleUpdateIntent('intent', item.type)}
                  className="text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-bold text-slate-100">{item.title}</span>
              </div>
              <span className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Funnel Stage */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Filter className="w-4 h-4" />
          <h4 className="font-bold text-slate-100 text-xs">جایگاه در قیف بازاریابی محتوا (Sales Funnel)</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FUNNEL_STAGES.map((f) => (
            <label
              key={f.stage}
              className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                currentProject.searchIntent.funnelStage === f.stage
                  ? 'bg-indigo-950/50 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="funnelStage"
                  checked={currentProject.searchIntent.funnelStage === f.stage}
                  onChange={() => handleUpdateIntent('funnelStage', f.stage)}
                  className="text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-bold text-slate-100">{f.title}</span>
              </div>
              <span className="text-[11px] text-slate-400">{f.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Searcher Psychology & Pain Points */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <HeartCrack className="w-3.5 h-3.5 text-rose-400" />
              نقطه درد اصلی کاربر (User Pain Point)
            </label>
            <textarea
              rows={3}
              value={currentProject.searchIntent.userPainPoint}
              onChange={(e) => handleUpdateIntent('userPainPoint', e.target.value)}
              placeholder="کاربر چه دغدغه‌ای دارد؟ مثال: ترس از خرید میلگرد غیراستاندارد سبک با قیمت گزاف"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              پرسش بنیادین در ذهن جستجوگر
            </label>
            <textarea
              rows={3}
              value={currentProject.searchIntent.primaryQuestion}
              onChange={(e) => handleUpdateIntent('primaryQuestion', e.target.value)}
              placeholder="مثال: چگونه قیمت واقعی میلگرد را محاسبه کنم و چه کارخانه‌ای مطمئن‌تر است؟"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              نتیجه مطلوب و احساس رضایت پس از خواندن
            </label>
            <textarea
              rows={3}
              value={currentProject.searchIntent.expectedOutcome}
              onChange={(e) => handleUpdateIntent('expectedOutcome', e.target.value)}
              placeholder="مثال: خریدار با اطمینان تناژ و سایز میلگرد را مشخص کرده و تماس می‌گیرد"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
