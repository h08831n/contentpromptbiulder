import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Network, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const Step7Strategy: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();
  const topical = currentProject.topicalAuthority;

  const handleUpdateTopical = (field: keyof typeof topical, value: any) => {
    updateCurrentProject({
      topicalAuthority: {
        ...topical,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-7-strategy-container">
      {/* Content Role in Cluster */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Network className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">جایگاه در کلاستر موضوعی (Topical Authority Role)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { role: 'Pillar (محتوای جامع مرجع)' as const, label: 'صفحه مادر / پیلار اصلی', desc: 'پوشش جامع و وسیع تمام ابعاد با لینک‌دهی به کلاسترها' },
            { role: 'Cluster / Supporting (محتوای پشتیبان کلاستر)' as const, label: 'محتوای کلاستر تخصصی', desc: 'بررسی عمیق و میکروسکوپی یک زیرموضوع خاص و لینک به پیلار' },
            { role: 'Standalone (مقاله مستقل)' as const, label: 'مقاله تک و مستقل', desc: 'محتوای مستقل بدون وابستگی به ساختار کلاسترهای دیگر' }
          ].map((item) => (
            <label
              key={item.role}
              className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                topical.contentRole === item.role
                  ? 'bg-indigo-950/50 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="contentRole"
                  checked={topical.contentRole === item.role}
                  onChange={() => handleUpdateTopical('contentRole', item.role)}
                  className="text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-bold text-slate-100">{item.label}</span>
              </div>
              <span className="text-[11px] text-slate-400">{item.desc}</span>
            </label>
          ))}
        </div>

        {topical.contentRole === 'Cluster / Supporting (محتوای پشتیبان کلاستر)' && (
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              آدرس URL پیلار پیج مادر (Parent Pillar URL)
            </label>
            <input
              type="url"
              value={topical.parentPillarUrl || ''}
              onChange={(e) => handleUpdateTopical('parentPillarUrl', e.target.value)}
              placeholder="https://example.com/guide/parent-pillar"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-indigo-300 font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Unique Information Gain & Cannibalization Safeguards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unique Information Gain */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            ارزش افزوده محتوایی و داده‌های نو (Information Gain)
          </label>
          <textarea
            rows={4}
            value={topical.uniqueInformationGain}
            onChange={(e) => handleUpdateTopical('uniqueInformationGain', e.target.value)}
            placeholder="چه چیز جدیدی در این مقاله ارائه می‌شود که رقبا ندارند؟ مثال: فرمول تجربی محاسبه، جدول مقایسه نرخ افت وزن باربری، چک‌لیست بازرسی در کارگاه"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
          />
          <p className="text-[11px] text-slate-400">
            گوگل به مقالاتی که داده‌های اختصاصی (Proprietary Data) و تحلیل جدید ارائه دهند پاداش رتبه‌ای می‌دهد.
          </p>
        </div>

        {/* Cannibalization Safeguards */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-rose-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            پیشگیری از هم‌نوع‌خواری سئو (Keyword Cannibalization Guard)
          </label>
          <textarea
            rows={4}
            value={topical.cannibalizationSafeguards}
            onChange={(e) => handleUpdateTopical('cannibalizationSafeguards', e.target.value)}
            placeholder="مشخص کنید این مقاله با چه صفحات دیگری در سایت نباید تداخل پیدا کند. مثال: صفحه قیمت روز میلگرد فقط قیمت است و این مقاله صرفاً راهنمای خرید و بررسی کیفیت است."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
          />
          <p className="text-[11px] text-slate-400">
            دستورات اکید برای هوش مصنوعی جهت عدم هدف‌گیری کلمات کلیدی صفحات دیگر سایت.
          </p>
        </div>
      </div>

      {/* Freshness Signals */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-indigo-400" />
          <div>
            <span className="text-xs font-bold text-slate-100">سیگنال‌های تازگی محتوا (Content Freshness Signals)</span>
            <p className="text-[11px] text-slate-400">تأکید بر درج سال جاری (۱۴۰۴ / ۲۰۲۶) و استانداردهای روز بازار</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={topical.freshnessSignals}
          onChange={(e) => handleUpdateTopical('freshnessSignals', e.target.checked)}
          className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-800"
        />
      </div>
    </div>
  );
};
