import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  X,
  Lock,
  Unlock,
  Sparkles,
  Copy,
  Check,
  Compass,
  FileSpreadsheet,
  Layers,
  Image,
  Share2,
  ShieldCheck,
  BarChart2,
  HelpCircle,
  Link,
  ChevronRight
} from 'lucide-react';
import { ContentPlanRow } from '../../types';

export const RowDetailDrawer: React.FC = () => {
  const {
    isRowDetailDrawerOpen,
    setRowDetailDrawerOpen,
    activeContentRow,
    updateContentPlanRow,
    toggleFieldLock,
    loadRowIntoWizard,
    showNotification
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'core' | 'structure' | 'images' | 'social' | 'eeat' | 'seo'>('core');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isRowDetailDrawerOpen || !activeContentRow) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showNotification('متن در کلیپ‌بورد کپی شد.', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isLocked = (field: string) => !!activeContentRow.isLockedFields?.[field];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-950 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRowDetailDrawerOpen(false)}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                  {activeContentRow.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {activeContentRow.id}</span>
              </div>
              <h2 className="text-base font-black text-white mt-1 max-w-xl truncate">
                {activeContentRow.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadRowIntoWizard(activeContentRow);
                setRowDetailDrawerOpen(false);
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              ورود به ویزارد پرامپت
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 border-b border-slate-800 bg-slate-900/30 overflow-x-auto no-scrollbar">
          {[
            { id: 'core', label: 'اطلاعات اصلی و کلمات کلیدی', icon: Layers },
            { id: 'structure', label: 'ساختار محتوا، هدینگ‌ها و FAQ', icon: Link },
            { id: 'images', label: 'پرامپت‌های انگلیسی تصاویر', icon: Image },
            { id: 'social', label: 'متن شبکه‌های اجتماعی', icon: Share2 },
            { id: 'eeat', label: 'تخصص نویسنده و EEAT', icon: ShieldCheck },
            { id: 'seo', label: 'متادیتا، اسکیما و امتیاز سئو', icon: BarChart2 }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  active ? 'bg-slate-800 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CORE */}
          {activeTab === 'core' && (
            <div className="space-y-6">
              {/* Title & Lock */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    عنوان مقاله (Article Title)
                  </label>
                  <button
                    onClick={() => toggleFieldLock(activeContentRow.id, 'title')}
                    className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                      isLocked('title')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isLocked('title') ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {isLocked('title') ? 'قفل شده (محافظت از بازتولید هوش مصنوعی)' : 'باز (قابل بازتولید هوش مصنوعی)'}
                  </button>
                </div>
                <input
                  type="text"
                  value={activeContentRow.title}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Primary Keyword & Product Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300">کلمه کلیدی اصلی (Primary Keyword)</label>
                  <input
                    type="text"
                    value={activeContentRow.primaryKeyword}
                    onChange={e => updateContentPlanRow(activeContentRow.id, { primaryKeyword: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300">نوع محصول / دسته‌بندی</label>
                  <input
                    type="text"
                    value={activeContentRow.productType}
                    onChange={e => updateContentPlanRow(activeContentRow.id, { productType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Secondary & LSI Keywords */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-2 block">کلمات کلیدی فرعی (Secondary Keywords)</label>
                  <div className="flex flex-wrap gap-2">
                    {activeContentRow.secondaryKeywords?.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs border border-slate-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 mb-2 block">کلمات معنایی و LSI (LSI Keywords)</label>
                  <div className="flex flex-wrap gap-2">
                    {activeContentRow.lsiKeywords?.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 bg-indigo-950/40 text-indigo-300 rounded-lg text-xs border border-indigo-500/30">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 mb-2 block">انتیتی‌ها و برندهای صنعتی (Entities)</label>
                  <div className="flex flex-wrap gap-2">
                    {activeContentRow.entities?.map((ent, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-950/40 text-amber-300 rounded-lg text-xs border border-amber-500/30">
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Information Gain & Strategic Description */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-amber-300 block">دستاورد اطلاعاتی و مزیت رقابتی (Unique Information Gain)</label>
                <textarea
                  rows={2}
                  value={activeContentRow.uniqueInformationGain}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { uniqueInformationGain: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: STRUCTURE & HEADINGS */}
          {activeTab === 'structure' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-amber-400 block">هدینگ اصلی H1</label>
                <input
                  type="text"
                  value={activeContentRow.h1}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { h1: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">هدینگ‌های اصلی H2</label>
                <div className="space-y-2">
                  {activeContentRow.h2?.map((heading, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200">
                      <span className="w-6 h-6 bg-slate-800 text-amber-400 rounded flex items-center justify-center font-bold font-mono">
                        {i + 1}
                      </span>
                      <span className="flex-1">{heading}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">سؤالات متداول کارگاهی و خریداران (FAQ)</label>
                <div className="space-y-3">
                  {activeContentRow.faq?.map((faqItem, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        {faqItem.question}
                      </div>
                      <div className="text-slate-400 leading-relaxed pr-5">
                        {faqItem.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">لینک‌های پیشنهادی داخلی (Internal Linking Matrix)</label>
                <div className="space-y-2">
                  {activeContentRow.internalLinks?.map((link, i) => (
                    <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-indigo-300">انکرتکست: {link.anchorText}</span>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{link.targetUrl}</div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        {link.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IMAGE PROMPTS */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-400">
                این پرامپت‌ها بر اساس استاندارد Midjourney و Imagen با جزئیات دقیق محیط صنعتی، سوله توزیع آهن و استانداردهای متالورژی تنظیم شده‌اند:
              </p>

              {activeContentRow.imagePrompts?.map((img, i) => (
                <div key={img.id || i} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5 text-amber-400" />
                      {img.title} ({img.type})
                    </span>
                    <button
                      onClick={() => copyToClipboard(img.promptEn, `img-${i}`)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1 transition-all"
                    >
                      {copiedKey === `img-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      کپی پرامپت انگلیسی
                    </button>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed text-left" dir="ltr">
                    {img.promptEn}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-400">متن جایگزین (Alt Text):</span>
                      <p className="text-slate-200 mt-0.5">{img.altTextFa}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">کپشن تصویر:</span>
                      <p className="text-slate-200 mt-0.5">{img.captionFa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SOCIAL BROADCAST */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              {/* Telegram */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    📢 متن پست تلگرام آهن اینجا
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeContentRow.socialTelegram, 'tg')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === 'tg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    کپی متن تلگرام
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={activeContentRow.socialTelegram}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { socialTelegram: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Instagram */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                    📸 کپشن اسلایدری اینستاگرام
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeContentRow.socialInstagram, 'ig')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === 'ig' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    کپی کپشن اینستاگرام
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={activeContentRow.socialInstagram}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { socialInstagram: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* LinkedIn */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    💼 متن پست تحلیلی لینکدین (B2B)
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeContentRow.socialLinkedIn, 'li')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === 'li' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    کپی متن لینکدین
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={activeContentRow.socialLinkedIn}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { socialLinkedIn: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 5: EEAT & AUTHOR */}
          {activeTab === 'eeat' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">نام و تخصص نویسنده / کارشناس محتوا</label>
                <input
                  type="text"
                  value={activeContentRow.eeat?.authorName || activeContentRow.author}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { author: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">بیوگرافی و رزومه فنی نویسنده (EEAT Bio)</label>
                <textarea
                  rows={3}
                  value={activeContentRow.eeat?.authorBio || ''}
                  onChange={e =>
                    updateContentPlanRow(activeContentRow.id, {
                      eeat: { ...activeContentRow.eeat, authorBio: e.target.value } as any
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">مراجع اعتبارسنجی و استانداردهای استنادشده</label>
                <input
                  type="text"
                  value={activeContentRow.eeat?.factCheckingSources || ''}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
                  readOnly
                />
              </div>
            </div>
          )}

          {/* TAB 6: SEO & METADATA */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">عنوان سئو انتخابی (Title Tag)</label>
                <input
                  type="text"
                  value={activeContentRow.seoTitle}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { seoTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">توضیحات متا انتخابی (Meta Description)</label>
                <textarea
                  rows={3}
                  value={activeContentRow.metaDescription}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { metaDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">اسلاگ URL (URL Slug)</label>
                <input
                  type="text"
                  value={activeContentRow.urlSlug}
                  onChange={e => updateContentPlanRow(activeContentRow.id, { urlSlug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono focus:border-amber-500 focus:outline-none text-left"
                  dir="ltr"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
