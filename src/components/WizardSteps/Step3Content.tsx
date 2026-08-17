import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ContentType, ContentGoal } from '../../types';
import { FileText, Target, Users, HelpCircle, Layers } from 'lucide-react';

const CONTENT_TYPES: { type: ContentType; desc: string }[] = [
  { type: 'مقاله وبسایت', desc: 'محتوای بلاگ، مقالات آموزشی، تحلیلی و دانشنامه‌ای' },
  { type: 'رپورتاژ تبلیغاتی', desc: 'محتوای غیرمستقیم برای خبرگزاری‌ها همراه با لینک‌سازی هدفمند' },
  { type: 'محصول فروشگاهی', desc: 'توضیحات محصول، نقد و بررسی فنی و ویژگی‌های تبدیل‌کننده' },
  { type: 'معرفی بهترین مشاغل', desc: 'لیستیکل (Listicle) رتبه‌بندی ۱۰ کسب‌وکار یا سرویس برتر' },
  { type: 'افیلیت دیجیکالا', desc: 'نقد و بررسی تخصصی کالاها جهت هدایت به خرید از طریق لینک همکاری' },
  { type: 'صفحه لندینگ', desc: 'محتوای صفحه فرود با محوریت تبدیل و متقاعدسازی مستقیم' },
  { type: 'پیلار پیج (Pillar Page)', desc: 'ستون اصلی محتوایی و مادر یک کلاستر بزرگ' },
  { type: 'راهنمای گام‌به‌گام (How-To)', desc: 'آموزش‌های عملی همراه با مراحل گام‌به‌گام و تصویر' }
];

const CONTENT_GOALS: { goal: ContentGoal; desc: string }[] = [
  { goal: 'Rank on Google (Organic Traffic)', desc: 'کسب رتبه ۱ و جذب حداکثر ترافیک ارگانیک جستجو' },
  { goal: 'Lead Generation & Form Submissions', desc: 'جذب سرنخ، ثبت شماره تماس و درخواست پیش‌فاکتور' },
  { goal: 'Direct Sales & Conversions', desc: 'فروش مستقیم محصول یا خدمات' },
  { goal: 'Topical Authority Building', desc: 'پوشش عمیق موضوع جهت افزایش اعتبار دامنه در نگاه گوگل' },
  { goal: 'PR & Brand Awareness', desc: 'روابط عمومی، اعتمادسازی و ماندگاری نام برند در ذهن مخاطب' },
  { goal: 'Affiliate Click-Throughs', desc: 'افزایش نرخ کلیک روی دکمه‌های خرید افیلیت' }
];

export const Step3Content: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();

  return (
    <div className="space-y-6 animate-fadeIn" id="step-3-content-container">
      {/* Title & Topic */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <FileText className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">موضوع و عنوان هدف سئو</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              عنوان نهایی مقاله یا صفحه (Target H1 Title)
            </label>
            <input
              type="text"
              value={currentProject.articleTitle}
              onChange={(e) => updateCurrentProject({ articleTitle: e.target.value })}
              placeholder="مثال: راهنمای جامع خرید میلگرد و تیرآهن؛ نکات حیاتی پیش از سفارش در بازار آهن"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400">
              این عنوان به عنوان تیتر اصلی H1 در پرامپت قرار می‌گیرد و باید شامل کلمه کلیدی اصلی باشد.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              موضوع محوری و دامنه تحت پوشش (Topic Scope)
            </label>
            <textarea
              rows={2}
              value={currentProject.topic}
              onChange={(e) => updateCurrentProject({ topic: e.target.value })}
              placeholder="شرح دقیق موضوع: بررسی انواع گریدهای میلگرد، محاسبه وزن، استعلام قیمت و نحوه بازرسی بار"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Content Type & Primary Strategic Goal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Type */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Layers className="w-4 h-4" />
            <h4 className="font-bold text-slate-100 text-xs">نوع محتوا (Content Type)</h4>
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
            {CONTENT_TYPES.map((item) => (
              <label
                key={item.type}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  currentProject.contentType === item.type
                    ? 'bg-indigo-950/50 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="contentType"
                  checked={currentProject.contentType === item.type}
                  onChange={() => updateCurrentProject({ contentType: item.type })}
                  className="mt-1 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-100">{item.type}</div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Content Goal */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Target className="w-4 h-4" />
            <h4 className="font-bold text-slate-100 text-xs">هدف استراتژیک محتوا (Strategic Goal)</h4>
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
            {CONTENT_GOALS.map((item) => (
              <label
                key={item.goal}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  currentProject.contentGoal === item.goal
                    ? 'bg-indigo-950/50 border-indigo-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="contentGoal"
                  checked={currentProject.contentGoal === item.goal}
                  onChange={() => updateCurrentProject({ contentGoal: item.goal })}
                  className="mt-1 text-indigo-600 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-100">{item.goal}</div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
