import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Search, Trophy, Users, Plus, Trash2, HelpCircle } from 'lucide-react';
import { CompetitorAnalysisItem } from '../../types';

const SERP_FEATURES_LIST = [
  'Featured Snippet (پاسخ برجسته)',
  'People Also Ask (سوالات مرتبط)',
  'Table Rich Result (جدول داده)',
  'Video Pack (ویدیوهای یوتیوب/آپارات)',
  'Image Pack (تصاویر مرتبط)',
  'Local Pack (نقشه و کسب‌وکارهای محلی)',
  'SiteLinks (لینک‌های داخلی سایت)',
  'Knowledge Panel (گراف دانش گوگل)'
];

export const Step6SERP: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();

  const [compUrl, setCompUrl] = useState('');
  const [compStrength, setCompStrength] = useState('');
  const [compWeakness, setCompWeakness] = useState('');
  const [compWordCount, setCompWordCount] = useState<number | ''>('');

  const [newPaa, setNewPaa] = useState('');

  const serp = currentProject.serp;

  const handleUpdateSerp = (field: keyof typeof serp, value: any) => {
    updateCurrentProject({
      serp: {
        ...serp,
        [field]: value
      }
    });
  };

  const toggleSerpFeature = (feature: string) => {
    const current = serp.serpFeatures || [];
    if (current.includes(feature)) {
      handleUpdateSerp('serpFeatures', current.filter(f => f !== feature));
    } else {
      handleUpdateSerp('serpFeatures', [...current, feature]);
    }
  };

  const handleAddCompetitor = () => {
    if (!compUrl.trim()) return;
    const newItem: CompetitorAnalysisItem = {
      id: 'comp-' + Date.now(),
      urlOrTitle: compUrl.trim(),
      strengths: compStrength.trim() || 'پوشش کلی موضوع',
      weaknesses: compWeakness.trim() || 'عدم ارائه داده‌های تجربی و جدول مقایسه',
      wordCountEstimate: compWordCount ? Number(compWordCount) : undefined
    };
    handleUpdateSerp('competitors', [...(serp.competitors || []), newItem]);
    setCompUrl('');
    setCompStrength('');
    setCompWeakness('');
    setCompWordCount('');
  };

  const handleRemoveCompetitor = (id: string) => {
    handleUpdateSerp('competitors', (serp.competitors || []).filter(c => c.id !== id));
  };

  const handleAddPaa = () => {
    if (!newPaa.trim()) return;
    handleUpdateSerp('paaQuestions', [...(serp.paaQuestions || []), newPaa.trim()]);
    setNewPaa('');
  };

  const handleRemovePaa = (index: number) => {
    const updated = [...(serp.paaQuestions || [])];
    updated.splice(index, 1);
    handleUpdateSerp('paaQuestions', updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-6-serp-container">
      {/* SERP Features & Zero-Click */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Search className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">فیچرهای صفحه نتایج گوگل (SERP Features)</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SERP_FEATURES_LIST.map((feat) => {
            const isSelected = (serp.serpFeatures || []).includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => toggleSerpFeature(feat)}
                className={`p-2.5 rounded-xl border text-right transition-all text-xs font-semibold ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {feat}
              </button>
            );
          })}
        </div>

        {/* Zero-Click Strategy */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={serp.targetZeroClick}
              onChange={(e) => handleUpdateSerp('targetZeroClick', e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-800"
            />
            <div>
              <span className="text-xs font-bold text-slate-100">شکار رتبه صفر و فیچرد اسنیپت (Featured Snippet)</span>
              <p className="text-[11px] text-slate-400">ارائه پاسخ صریح و مستقیم در ۴۰ تا ۶۰ کلمه ابتدایی بعد از هدینگ</p>
            </div>
          </label>

          {serp.targetZeroClick && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-semibold whitespace-nowrap">فرمت اسنیپت هدف:</span>
              <select
                value={serp.featuredSnippetGoal}
                onChange={(e) => handleUpdateSerp('featuredSnippetGoal', e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-indigo-300 rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="Table">جدول مقایسه‌ای (Table)</option>
                <option value="Bulleted List">لیست بولت‌دار (Bulleted List)</option>
                <option value="Step-by-Step">مراحل گام‌به‌گام (Step-by-Step)</option>
                <option value="Definition">تعریف صریح پاراگرافی (Definition)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Competitors Gap Analysis */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Trophy className="w-4 h-4" />
            <h4 className="font-bold text-slate-100 text-xs">
              آنالیز رقبای برتر لینک ۱ تا ۳ گوگل (Competitor Intelligence)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">{(serp.competitors || []).length} رقیب آنالیز شده</span>
        </div>

        {/* Add competitor box */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="text"
              placeholder="نام رقیب یا URL (مثال: آهن‌مکان)"
              value={compUrl}
              onChange={(e) => setCompUrl(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="نقاط قوت رقیب"
              value={compStrength}
              onChange={(e) => setCompStrength(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="نقاط ضعف و شکاف محتوایی رقیب"
              value={compWeakness}
              onChange={(e) => setCompWeakness(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="تخمین طول کلمات (مثال: ۲۲۰۰)"
              value={compWordCount}
              onChange={(e) => setCompWordCount(e.target.value ? Number(e.target.value) : '')}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddCompetitor}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن آنالیز رقیب
            </button>
          </div>
        </div>

        {/* Competitors List */}
        <div className="space-y-2">
          {(serp.competitors || []).map((c) => (
            <div key={c.id} className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-100">{c.urlOrTitle}</span>
                  {c.wordCountEstimate && (
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      ~{c.wordCountEstimate} کلمه
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div><span className="text-emerald-400 font-semibold">نقطه قوت:</span> {c.strengths}</div>
                  <div><span className="text-rose-400 font-semibold">شکاف و ضعف:</span> {c.weaknesses}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCompetitor(c.id)}
                className="text-slate-500 hover:text-rose-400 p-1.5"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* People Also Ask (PAA) */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            پرسش‌های تکمیلی سرپ (People Also Ask - PAA)
          </label>
          <span className="text-[11px] text-slate-400">{(serp.paaQuestions || []).length} پرسش</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newPaa}
            onChange={(e) => setNewPaa(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPaa())}
            placeholder="مثال: بهترین کارخانه تولیدکننده میلگرد در ایران کدام است؟"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddPaa}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5 pt-1">
          {(serp.paaQuestions || []).map((q, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300">
              <span>? {q}</span>
              <button type="button" onClick={() => handleRemovePaa(idx)} className="text-slate-500 hover:text-rose-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
