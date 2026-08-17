import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../i18n/translations';
import {
  X,
  Plus,
  Trash2,
  Building2,
  Sparkles,
  Check,
  Globe,
  BookOpen
} from 'lucide-react';
import { BrandIdentity, IndustryType, BrandVoice } from '../types';

export const BrandModal: React.FC = () => {
  const {
    isBrandModalOpen,
    setBrandModalOpen,
    brands,
    currentBrand,
    addBrand,
    updateBrand,
    deleteBrand,
    selectBrand,
    language
  } = useAppStore();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newIndustry, setNewIndustry] = useState<IndustryType>('Steel');
  const [newWebsite, setNewWebsite] = useState('');
  const [newVoice, setNewVoice] = useState<BrandVoice>('Authoritative');
  const [newUsp, setNewUsp] = useState('');

  if (!isBrandModalOpen) return null;

  const handleCreateBrand = () => {
    if (!newBrandName.trim()) return;
    const created: BrandIdentity = {
      id: 'brand-' + Date.now(),
      name: newBrandName.trim(),
      industry: newIndustry,
      website: newWebsite.trim() || 'https://example.com',
      brandVoice: newVoice,
      businessDescription: '',
      usp: newUsp.trim(),
      brandPositioning: '',
      productsServices: [],
      targetAudienceDefaults: '',
      forbiddenClaims: [],
      forbiddenTerms: [],
      preferredTerms: [],
      knowledgeBase: {
        expertise: '',
        certifications: [],
        editorialGuidelines: ''
      },
      createdAt: new Date().toISOString()
    };
    addBrand(created);
    selectBrand(created.id);
    setIsCreatingNew(false);
    setNewBrandName('');
    setNewWebsite('');
    setNewUsp('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" id="brand-modal">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">مدیریت برندها و صدای سازمانی (Brand Vault)</h3>
          </div>

          <button
            type="button"
            onClick={() => setBrandModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Create New Toggle / Form */}
          {!isCreatingNew ? (
            <div className="flex justify-between items-center bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-slate-200">افزودن پروفایل برند جدید</h4>
                <p className="text-[11px] text-slate-400">یک هویت تجاری جدید با لحن، خطوط قرمز و پایگاه دانش مجزا بسازید.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingNew(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                تعریف برند جدید
              </button>
            </div>
          ) : (
            <div className="bg-slate-950 border border-indigo-500/40 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-indigo-300">مشخصات برند جدید</span>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  انصراف
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">نام برند</label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="مثال: فولاد البرز"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">صنعت</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value as IndustryType)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Steel">Steel (فولاد و متالورژی)</option>
                    <option value="Construction">Construction (ساختمان)</option>
                    <option value="E-commerce">E-commerce (فروشگاه آنلاین)</option>
                    <option value="Technology">Technology (فناوری)</option>
                    <option value="Healthcare">Healthcare (سلامت و درمان)</option>
                    <option value="Finance">Finance (مالی و ارزی)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">وبسایت</label>
                  <input
                    type="url"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">مزیت رقابتی یکتا (USP)</label>
                  <input
                    type="text"
                    value={newUsp}
                    onChange={(e) => setNewUsp(e.target.value)}
                    placeholder="تحویل آنی، ضمانت کیفیت"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCreateBrand}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  ثبت و انتخاب این برند
                </button>
              </div>
            </div>
          )}

          {/* Existing Brands List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200">برندهای موجود ({brands.length})</h4>
            <div className="space-y-2">
              {brands.map((b) => {
                const isSelected = b.id === currentBrand?.id;
                return (
                  <div
                    key={b.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100">{b.name}</span>
                        <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
                          {b.industry}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                            برند فعال پروژه
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">{b.website}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isSelected && (
                        <button
                          type="button"
                          onClick={() => selectBrand(b.id)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all"
                        >
                          انتخاب
                        </button>
                      )}

                      {brands.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteBrand(b.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
