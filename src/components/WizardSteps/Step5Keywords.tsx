import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Key, Tag, Sparkles, Ban, Layers, Plus, X } from 'lucide-react';

export const Step5Keywords: React.FC = () => {
  const { currentProject, updateCurrentProject } = useAppStore();

  const [newSecKey, setNewSecKey] = useState('');
  const [newLongTail, setNewLongTail] = useState('');
  const [newLsi, setNewLsi] = useState('');
  const [newEntity, setNewEntity] = useState('');
  const [newNegative, setNewNegative] = useState('');

  const keywords = currentProject.keywords;

  const handleUpdateKeywords = (field: keyof typeof keywords, value: any) => {
    updateCurrentProject({
      keywords: {
        ...keywords,
        [field]: value
      }
    });
  };

  const addItem = (field: 'secondaryKeywords' | 'longTailKeywords' | 'lsiKeywords' | 'entities' | 'negativeKeywords', value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    const currentList = keywords[field] || [];
    if (!currentList.includes(value.trim())) {
      handleUpdateKeywords(field, [...currentList, value.trim()]);
    }
    setter('');
  };

  const removeItem = (field: 'secondaryKeywords' | 'longTailKeywords' | 'lsiKeywords' | 'entities' | 'negativeKeywords', itemToRemove: string) => {
    const currentList = keywords[field] || [];
    handleUpdateKeywords(field, currentList.filter(i => i !== itemToRemove));
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-5-keywords-container">
      {/* Primary Keyword & Density */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Key className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">کلمه کلیدی اصلی (Focus Keyword) و چگالی هدف</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              کلمه کلیدی اصلی هدف سئو
            </label>
            <input
              type="text"
              value={currentProject.primaryKeyword}
              onChange={(e) => {
                const val = e.target.value;
                updateCurrentProject({
                  primaryKeyword: val,
                  keywords: { ...keywords, primaryKeyword: val }
                });
              }}
              placeholder="مثال: راهنمای خرید میلگرد"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-indigo-300 font-bold focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              چگالی توزیع کلمه کلیدی
            </label>
            <select
              value={keywords.targetDensity}
              onChange={(e) => handleUpdateKeywords('targetDensity', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="1.0% - 1.5%">۱.۰٪ تا ۱.۵٪ (طبیعی و ملایم)</option>
              <option value="1.8% - 2.2%">۱.۸٪ تا ۲.۲٪ (استاندارد رقابتی)</option>
              <option value="2.5% - 3.0%">۲.۵٪ تا ۳.۰٪ (فشرده و سنگین)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Secondary & Long-Tail Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Secondary Keywords */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              کلمات کلیدی فرعی و پشتیبان
            </label>
            <span className="text-[11px] text-slate-400">{keywords.secondaryKeywords.length} مورد</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSecKey}
              onChange={(e) => setNewSecKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('secondaryKeywords', newSecKey, setNewSecKey))}
              placeholder="مثال: جدول وزن میلگرد، تفاوت A2 و A3"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addItem('secondaryKeywords', newSecKey, setNewSecKey)}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 min-h-[48px]">
            {keywords.secondaryKeywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-700/80 text-indigo-300 rounded-lg text-xs">
                {k}
                <button type="button" onClick={() => removeItem('secondaryKeywords', k)} className="hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Long-Tail Keywords */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              عبارات دم‌دراز و پرسش‌های کاربران (Long-Tail)
            </label>
            <span className="text-[11px] text-slate-400">{keywords.longTailKeywords.length} مورد</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newLongTail}
              onChange={(e) => setNewLongTail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('longTailKeywords', newLongTail, setNewLongTail))}
              placeholder="مثال: نحوه محاسبه کرایه بار تریلی میلگرد"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addItem('longTailKeywords', newLongTail, setNewLongTail)}
              className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 min-h-[48px]">
            {keywords.longTailKeywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-amber-500/30 text-amber-300 rounded-lg text-xs">
                {k}
                <button type="button" onClick={() => removeItem('longTailKeywords', k)} className="hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Semantic LSI, Knowledge Graph Entities & Negative Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LSI Vocabulary */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-slate-200">
            واژگان مفهومی LSI
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLsi}
              onChange={(e) => setNewLsi(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('lsiKeywords', newLsi, setNewLsi))}
              placeholder="مثال: تنش تسلیم، بندیل"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addItem('lsiKeywords', newLsi, setNewLsi)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {keywords.lsiKeywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded text-[11px]">
                {k}
                <button type="button" onClick={() => removeItem('lsiKeywords', k)} className="hover:text-rose-400">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Knowledge Graph Named Entities */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-indigo-300 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-400" />
            موجودیت‌های معنایی (Entities)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newEntity}
              onChange={(e) => setNewEntity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('entities', newEntity, setNewEntity))}
              placeholder="مثال: ذوب آهن اصفهان، ISIRI 3132"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addItem('entities', newEntity, setNewEntity)}
              className="p-1.5 bg-indigo-800 hover:bg-indigo-700 text-slate-200 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {keywords.entities.map((k) => (
              <span key={k} className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 rounded text-[11px]">
                {k}
                <button type="button" onClick={() => removeItem('entities', k)} className="hover:text-rose-400">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Negative Keywords */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl space-y-3">
          <label className="block text-xs font-bold text-rose-300 flex items-center gap-1">
            <Ban className="w-3 h-3 text-rose-400" />
            کلمات منفی و ممنوعه (Negative)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newNegative}
              onChange={(e) => setNewNegative(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('negativeKeywords', newNegative, setNewNegative))}
              placeholder="مثال: ضایعات قراضه، رایگان"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:border-rose-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addItem('negativeKeywords', newNegative, setNewNegative)}
              className="p-1.5 bg-rose-900/80 hover:bg-rose-800 text-rose-200 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {keywords.negativeKeywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-950/60 border border-rose-800 text-rose-200 rounded text-[11px]">
                {k}
                <button type="button" onClick={() => removeItem('negativeKeywords', k)} className="hover:text-rose-400">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
