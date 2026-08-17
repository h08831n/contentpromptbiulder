import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MousePointerClick, Link, Plus, Trash2, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { CTAType } from '../../types';

const CTA_TYPES: { type: CTAType; label: string; desc: string }[] = [
  { type: 'Purchase', label: 'خرید مستقیم / افزودن به سبد', desc: 'مناسب فروشگاه‌ها و محصولات' },
  { type: 'Contact / Phone Call', label: 'تماس تلفنی / استعلام قیمت فوری', desc: 'مناسب B2B، آهن‌آلات و خدمات مهندسی' },
  { type: 'Form Fill / Lead', label: 'ثبت فرم / درخواست پیش‌فاکتور', desc: 'جذب شماره تماس و سرنخ فروش' },
  { type: 'Download Guide', label: 'دانلود فایل / PDF چک‌لیست', desc: 'جذب لید مگنت و ایمیل' },
  { type: 'Internal Deep Dive', label: 'هدایت به صفحه کاتالوگ یا پیلار اصلی', desc: 'گردش کاربر داخل سایت' }
];

export const Step11Advanced: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();
  const ctr = currentProject.ctrAndCTA;

  const [newTitleVariant, setNewTitleVariant] = useState('');

  const handleUpdateCtr = (field: keyof typeof ctr, value: any) => {
    updateCurrentProject({
      ctrAndCTA: {
        ...ctr,
        [field]: value
      }
    });
  };

  const handleAddTitleVariant = () => {
    if (!newTitleVariant.trim()) return;
    handleUpdateCtr('metaTitleVariants', [...(ctr.metaTitleVariants || []), newTitleVariant.trim()]);
    setNewTitleVariant('');
  };

  const handleRemoveTitleVariant = (index: number) => {
    const updated = [...(ctr.metaTitleVariants || [])];
    updated.splice(index, 1);
    handleUpdateCtr('metaTitleVariants', updated);
  };

  const metaDescLength = (ctr.metaDescription || '').length;

  return (
    <div className="space-y-6 animate-fadeIn" id="step-11-advanced-container">
      {/* Meta Titles & Snippet CTR Optimization */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-slate-100 text-sm">
              بهینه‌سازی نرخ کلیک سرپ (Meta Title & Description CTR)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">{(ctr.metaTitleVariants || []).length} نسخه عنوان</span>
        </div>

        {/* Add Meta Title Option */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200">
            نسخه‌های عنوان متا (A/B Test Meta Titles)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitleVariant}
              onChange={(e) => setNewTitleVariant(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTitleVariant())}
              placeholder="مثال: راهنمای خرید میلگرد و تیرآهن؛ ۵ نکته حیاتی قبل از سفارش (۱۴۰۴)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddTitleVariant}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 pt-1">
            {(ctr.metaTitleVariants || []).map((t, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center justify-between text-xs text-slate-200">
                <span className="font-medium font-sans">گزینه {idx + 1}: {t}</span>
                <button type="button" onClick={() => handleRemoveTitleVariant(idx)} className="text-slate-500 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Description & URL Slug */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                توضیحات متا (Meta Description)
              </label>
              <span className={`text-[10px] font-mono ${
                metaDescLength >= 140 && metaDescLength <= 160 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {metaDescLength} / ۱۶۰ کاراکتر
              </span>
            </div>
            <textarea
              rows={2}
              value={ctr.metaDescription}
              onChange={(e) => handleUpdateCtr('metaDescription', e.target.value)}
              placeholder="توضیح جذاب و کلیک‌خور شامل کلمه کلیدی اصلی و فراخوان اقدام..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1">
              <Link className="w-3.5 h-3.5 text-indigo-400" />
              اسلاگ آدرس (URL Slug)
            </label>
            <input
              type="text"
              value={ctr.urlSlug}
              onChange={(e) => handleUpdateCtr('urlSlug', e.target.value)}
              placeholder="rebar-buying-guide"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-indigo-300 font-mono focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-400">انگلیسی، کوتاه و با خط تیره</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action (CTA) Strategy */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <MousePointerClick className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">استراتژی فراخوان به اقدام (Call to Action - CTA)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CTA_TYPES.map((c) => (
            <label
              key={c.type}
              className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                ctr.ctaType === c.type
                  ? 'bg-indigo-950/50 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="ctaType"
                  checked={ctr.ctaType === c.type}
                  onChange={() => handleUpdateCtr('ctaType', c.type)}
                  className="text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-bold text-slate-100">{c.label}</span>
              </div>
              <span className="text-[11px] text-slate-400">{c.desc}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">تیتر جذاب CTA</label>
            <input
              type="text"
              value={ctr.ctaHeadline}
              onChange={(e) => handleUpdateCtr('ctaHeadline', e.target.value)}
              placeholder="نیاز به استعلام فوری قیمت دارید؟"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">متن روی دکمه اقدام</label>
            <input
              type="text"
              value={ctr.ctaButtonText}
              onChange={(e) => handleUpdateCtr('ctaButtonText', e.target.value)}
              placeholder="مشاوره رایگان و دریافت پیش‌فاکتور"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">موقعیت قرارگیری CTA در متن</label>
            <select
              value={ctr.ctaPlacement}
              onChange={(e) => handleUpdateCtr('ctaPlacement', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="End of Article">انتهای مقاله (End of Article)</option>
              <option value="Mid-Content + End">میانه متن + انتهای مقاله (Mid + End)</option>
              <option value="Sticky Box">باکس چسبان شناور (Sticky Box)</option>
              <option value="Contextual Inline">درون‌پاراگرافی نامحسوس (Inline Contextual)</option>
            </select>
          </div>
        </div>

        {/* Local SEO Target */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-bold whitespace-nowrap">
            <MapPin className="w-4 h-4 text-rose-400" />
            تارگت جغرافیایی / لوکال سئو (اختیاری):
          </div>
          <input
            type="text"
            value={ctr.localCityOrProvince || ''}
            onChange={(e) => handleUpdateCtr('localCityOrProvince', e.target.value)}
            placeholder="مثال: تهران، اصفهان، بازار شادآباد"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
