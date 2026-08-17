import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Link2, Image, ExternalLink, Plus, Trash2, Tag, Sparkles, Copy, Check, SlidersHorizontal } from 'lucide-react';
import { AnchorStrategy, InternalLinkItem, ExternalCitationItem, VisualElementType } from '../../types';
import { generateAIImagePrompts } from '../../engine/aiImagePromptEngine';

const ANCHOR_STRATEGIES: AnchorStrategy[] = [
  'Exact Match',
  'Partial / Phrase Match',
  'Branded',
  'Generic / Natural',
  'Compound'
];

const VISUAL_OPTIONS: VisualElementType[] = [
  'تصویر شاخص با پرامپت DALL-E',
  'جدول مقایسه یا مشخصات فنی',
  'اینفوگرافیک / فلوچارت متنی',
  'باکس نکته کلیدی / هشدار طلایی',
  'ویدیو امبد یا پادکست فرضی',
  'چک‌لیست تعاملی مارک‌داون',
  'ماشین‌حساب / ابزار تعاملی'
];

export const Step9LinksVisuals: React.FC = () => {
  const { currentProject, updateCurrentProject, currentWebsite, currentBrand } = useAppStore();

  const internalLinking = currentProject.internalLinking;
  const externalCitations = currentProject.externalCitations || [];
  const visualElements = currentProject.visualElements || [];

  // Local state for adding manual internal link
  const [targetUrl, setTargetUrl] = useState('');
  const [suggestedAnchor, setSuggestedAnchor] = useState('');
  const [anchorStrategy, setAnchorStrategy] = useState<AnchorStrategy>('Exact Match');
  const [relevanceNote, setRelevanceNote] = useState('');

  // Local state for external citation
  const [extSourceName, setExtSourceName] = useState('');
  const [extSourceUrl, setExtSourceUrl] = useState('');
  const [extType, setExtType] = useState<ExternalCitationItem['citationType']>('Government / Standard');

  // Copied state tracker for image prompts
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate dynamic AI Image Prompts
  const aiImagePrompts = generateAIImagePrompts(currentProject, currentBrand);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateInternal = (field: keyof typeof internalLinking, value: any) => {
    updateCurrentProject({
      internalLinking: {
        ...internalLinking,
        [field]: value
      }
    });
  };

  const handleAddManualLink = () => {
    if (!targetUrl.trim() || !suggestedAnchor.trim()) return;
    const newItem: InternalLinkItem = {
      id: 'link-' + Date.now(),
      targetUrl: targetUrl.trim(),
      suggestedAnchor: suggestedAnchor.trim(),
      anchorStrategy,
      relevanceNote: relevanceNote.trim() || 'ارجاع در بخش مرتبط'
    };
    handleUpdateInternal('manualLinks', [...internalLinking.manualLinks, newItem]);
    setTargetUrl('');
    setSuggestedAnchor('');
    setRelevanceNote('');
  };

  const handleRemoveManualLink = (id: string) => {
    handleUpdateInternal('manualLinks', internalLinking.manualLinks.filter(l => l.id !== id));
  };

  const handleAddExternalCitation = () => {
    if (!extSourceName.trim() || !extSourceUrl.trim()) return;
    const newItem: ExternalCitationItem = {
      id: 'ext-' + Date.now(),
      sourceName: extSourceName.trim(),
      sourceUrl: extSourceUrl.trim(),
      citationType: extType
    };
    updateCurrentProject({
      externalCitations: [...externalCitations, newItem]
    });
    setExtSourceName('');
    setExtSourceUrl('');
  };

  const handleRemoveExternalCitation = (id: string) => {
    updateCurrentProject({
      externalCitations: externalCitations.filter(e => e.id !== id)
    });
  };

  const toggleVisualElement = (item: VisualElementType) => {
    if (visualElements.includes(item)) {
      updateCurrentProject({
        visualElements: visualElements.filter(v => v !== item)
      });
    } else {
      updateCurrentProject({
        visualElements: [...visualElements, item]
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-9-links-container">
      {/* AI Image Generation Studio Section */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900/50 to-slate-900/40 border border-indigo-500/30 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-100 text-sm">
              استودیو تولید پرامپت تصاویر با هوش مصنوعی (AI Image Prompt Generator)
            </h3>
          </div>
          <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-mono">
            Midjourney v6.1 & DALL-E 3
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          پرامپت‌های مهندسی‌شده عکاسی صنعتی، اینفوگرافیک متالورژی و کلوزآپ مقاطع فولادی متناسب با موضوع «{currentProject.primaryKeyword}» جهت تولید تصاویر اختصاصی بدون کپی‌رایت:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {aiImagePrompts.map((img) => {
            const isCopied = copiedId === img.id;
            return (
              <div
                key={img.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all rounded-xl p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">{img.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded">
                          {img.type}
                        </span>
                        <span className="text-[10px] bg-slate-800/80 text-amber-400 font-mono px-1.5 py-0.5 rounded">
                          {img.aspectRatio}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText(img.promptEn, img.id)}
                      className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-lg text-[11px] flex items-center gap-1 font-semibold transition-all shrink-0"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? 'کپی شد' : 'کپی پرامپت انگلیسی'}
                    </button>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800/80 p-2.5 rounded-lg">
                    <p className="text-[11px] font-mono text-slate-300 leading-relaxed dir-ltr text-left select-all line-clamp-3 hover:line-clamp-none transition-all">
                      {img.promptEn}
                    </p>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-400">
                      <span className="text-indigo-400 font-semibold">متن جایگزین (Alt Text): </span>
                      {img.altTextFa}
                    </div>
                    <div className="text-slate-400">
                      <span className="text-amber-400 font-semibold">توضیح زیر تصویر (Caption): </span>
                      {img.captionFa}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Linking Engine */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Link2 className="w-5 h-5" />
            <h3 className="font-bold text-slate-100 text-sm">استراتژی لینک‌سازی داخلی (Internal Linking)</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">سقف لینک‌ها:</span>
            <input
              type="number"
              min={1}
              max={15}
              value={internalLinking.maxInternalLinks}
              onChange={(e) => handleUpdateInternal('maxInternalLinks', Number(e.target.value))}
              className="w-14 bg-slate-950 border border-slate-700 text-xs text-indigo-300 font-bold rounded-lg px-2 py-1 text-center"
            />
          </div>
        </div>

        {/* Quick picker from Website URLs Repository */}
        {currentWebsite && currentWebsite.existingUrls.length > 0 && (
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl space-y-2">
            <span className="text-[11px] text-slate-400 font-semibold block">
              انتخاب سریع از صفحات وبسایت {currentWebsite.siteName}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentWebsite.existingUrls.map((u, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTargetUrl(u.url);
                    setSuggestedAnchor(u.mainKeyword || u.title);
                  }}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/50 rounded-lg text-slate-300 text-xs transition-colors flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-indigo-400" />
                  {u.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add internal link form */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <input
              type="url"
              placeholder="آدرس URL مقصد (https://...)"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="انکرتکست پیشنهادی"
              value={suggestedAnchor}
              onChange={(e) => setSuggestedAnchor(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <select
              value={anchorStrategy}
              onChange={(e) => setAnchorStrategy(e.target.value as AnchorStrategy)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              {ANCHOR_STRATEGIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="یادداشت و محل ارجاع"
              value={relevanceNote}
              onChange={(e) => setRelevanceNote(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddManualLink}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن لینک داخلی
            </button>
          </div>
        </div>

        {/* Links List */}
        <div className="space-y-1.5">
          {internalLinking.manualLinks.map((l) => (
            <div key={l.id} className="bg-slate-950 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-indigo-300">[{l.suggestedAnchor}]</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{l.anchorStrategy}</span>
                <span className="text-slate-400 font-mono truncate max-w-[200px]">{l.targetUrl}</span>
                <span className="text-slate-500 text-[11px]">({l.relevanceNote})</span>
              </div>
              <button type="button" onClick={() => handleRemoveManualLink(l.id)} className="text-slate-500 hover:text-rose-400 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* External Citations & Authoritative References */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <ExternalLink className="w-5 h-5" />
            <h4 className="font-bold text-slate-100 text-xs">
              استناد به مراجع معتبر خارجی و استانداردهای ملی (Authoritative External Citations)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">{externalCitations.length} منبع</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              placeholder="نام منبع (مثال: سازمان ملی استاندارد ایران)"
              value={extSourceName}
              onChange={(e) => setExtSourceName(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="url"
              placeholder="آدرس منبع (http://...)"
              value={extSourceUrl}
              onChange={(e) => setExtSourceUrl(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
            />
            <select
              value={extType}
              onChange={(e) => setExtType(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Government / Standard">سازمان دولتی / استاندارد ملی</option>
              <option value="Authoritative Study / ISO">مطالعات بین‌المللی / ISO</option>
              <option value="Industry Report">گزارش آماری صنعت</option>
              <option value="Wiki / Encyclopedic">دانشنامه‌ای و مرجع</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddExternalCitation}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن منبع استناد
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          {externalCitations.map((e) => (
            <div key={e.id} className="bg-slate-950 border border-slate-800/80 px-3 py-2 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100">{e.sourceName}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{e.citationType}</span>
                <span className="text-slate-400 font-mono">{e.sourceUrl}</span>
              </div>
              <button type="button" onClick={() => handleRemoveExternalCitation(e.id)} className="text-slate-500 hover:text-rose-400 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Elements & Media Directives */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Image className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">المان‌های بصری و پلِیس‌هولدرهای چندرسانه‌ای</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {VISUAL_OPTIONS.map((item) => {
            const isSelected = visualElements.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleVisualElement(item)}
                className={`p-3 rounded-xl border text-right transition-all text-xs font-semibold ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

