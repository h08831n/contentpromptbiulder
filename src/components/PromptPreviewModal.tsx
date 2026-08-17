import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Bot,
  Sparkles,
  Layers,
  Image,
  Share2,
  Calculator,
  Tag
} from 'lucide-react';
import { STEEL_REBAR_STAHL_TABLE, STEEL_FACTORIES_IRAN, STEEL_FORMULAS } from '../data/steelData';

export const PromptPreviewModal: React.FC = () => {
  const {
    isPromptPreviewOpen,
    setPromptPreviewOpen,
    generatedPromptResult,
    compilePrompt,
    currentProject,
    currentBrand,
    currentWebsite,
    showNotification
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'full' | 'images' | 'socials' | 'steel' | 'sections' | 'json'>('full');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);

  if (!isPromptPreviewOpen) return null;

  const result = generatedPromptResult || compilePrompt();

  const handleCopy = (tag = 'Prompt', textToCopy = result.promptText) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showNotification(`پرامپت در کلیپ‌بورد کپی شد (${tag})`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySpecific = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItemId(id);
    showNotification('کپی شد!');
    setTimeout(() => setCopiedItemId(null), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([result.promptText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEO-Master-Prompt-${currentProject.primaryKeyword.replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const data = {
      project: currentProject,
      brand: currentBrand,
      website: currentWebsite,
      compiledPrompt: result
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEO-Prompt-${currentProject.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" id="prompt-preview-modal">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                مستر پرامپت کامپایل‌شده سئو (Master SEO Prompt)
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  امتیاز کیفیت: {result.metadata.qualityScore}/۱۰۰
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {result.metadata.wordCount} کلمه • ~{result.metadata.estimatedTokens} توکن تخمینی • ویژه «{currentBrand?.name || 'آهن اینجا'}»
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopy('Master Prompt')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'کپی شد' : 'کپی پرامپت سئو'}
            </button>

            <button
              type="button"
              onClick={() => setPromptPreviewOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('full')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'full' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              پرامپت مقاله اصلی
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('images')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'images' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              پرامپت تصاویر ({result.imagePrompts?.length || 4})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('socials')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'socials' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              کپی شبکه‌های اجتماعی
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('steel')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'steel' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              جدول اشتال و کارخانه‌ها
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'sections' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              ماژول‌ها ({result.sections.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'json' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JSON
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadMd}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              دانلود Markdown
            </button>
            <button
              type="button"
              onClick={handleDownloadJson}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5" />
              دانلود JSON
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950/70 select-text">
          {activeTab === 'full' && (
            <pre className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-5 rounded-2xl border border-slate-800 select-text">
              {result.promptText}
            </pre>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
                این پرامپت‌ها بر اساس استانداردهای Midjourney v6.1، DALL-E 3 و عکاسی استودیویی صنعتی تنظیم شده‌اند تا تصاویری با هویت بصری یکپارچه و بدون کپی‌رایت برای مقاله ایجاد کنید:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(result.imagePrompts || []).map((img) => (
                  <div key={img.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-white">{img.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded">{img.type}</span>
                          <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded font-mono">{img.aspectRatio}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopySpecific(img.promptEn, img.id)}
                        className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-lg text-xs flex items-center gap-1 font-semibold transition-all"
                      >
                        {copiedItemId === img.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedItemId === img.id ? 'کپی شد' : 'کپی پرامپت'}
                      </button>
                    </div>

                    <pre className="text-[11px] text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-wrap dir-ltr text-left">
                      {img.promptEn}
                    </pre>

                    <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                      <div><strong className="text-indigo-400">متن Alt فارسی:</strong> {img.altTextFa}</div>
                      <div><strong className="text-amber-400">کپشن:</strong> {img.captionFa}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'socials' && result.socialPrompts && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Telegram Post */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-indigo-300 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      پست آماده تلگرام (Telegram Channel Post)
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopySpecific(result.socialPrompts!.telegramPost, 'tg')}
                      className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-lg text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedItemId === 'tg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      کپی متن
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {result.socialPrompts.telegramPost}
                  </pre>
                </div>

                {/* Instagram Carousel Caption */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-amber-300 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      کپشن و اسلایدهای اینستاگرام (Instagram Carousel)
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopySpecific(result.socialPrompts!.instagramCaption, 'ig')}
                      className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-lg text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedItemId === 'ig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      کپی متن
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {result.socialPrompts.instagramCaption}
                  </pre>
                </div>

                {/* LinkedIn Post */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-blue-300 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      پست تحلیلی لینکدین ویژه مهندسین و مدیران خرید (LinkedIn B2B Post)
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopySpecific(result.socialPrompts!.linkedInPost, 'li')}
                      className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-lg text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedItemId === 'li' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      کپی متن
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {result.socialPrompts.linkedInPost}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'steel' && (
            <div className="space-y-5">
              {/* Formulas */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-xs text-indigo-300">فرمول‌های مهندسی محاسبه وزن و مشخصات فنی فولاد</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {STEEL_FORMULAS.map((f, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white">{f.name}</div>
                      <div className="text-xs font-mono text-amber-400 dir-ltr text-left">{f.formula}</div>
                      <div className="text-[11px] text-slate-400">{f.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stahl Rebar Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-xs text-indigo-300">جدول استاندارد اشتال میلگرد و مقایسه وزن هر شاخه ۱۲ متری کارخانه‌ها</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950 text-slate-300">
                        <th className="p-2.5 font-bold">سایز</th>
                        <th className="p-2.5 font-bold">وزن هر متر (اشتال)</th>
                        <th className="p-2.5 font-bold">وزن شاخه ۱۲م</th>
                        <th className="p-2.5 font-bold">گرید استاندارد</th>
                        <th className="p-2.5 font-bold">تنش تسلیم (MPa)</th>
                        <th className="p-2.5 font-bold">کارخانه‌های برتر</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {STEEL_REBAR_STAHL_TABLE.map((r) => (
                        <tr key={r.size} className="hover:bg-slate-950/40 text-slate-300">
                          <td className="p-2.5 font-bold text-white">میلگرد {r.size}</td>
                          <td className="p-2.5 font-mono">{r.nominalWeightPerMeter} kg</td>
                          <td className="p-2.5 font-mono text-indigo-300 font-bold">{r.twelveMeterWeight} kg</td>
                          <td className="p-2.5 font-mono text-amber-300">{r.standardGrade}</td>
                          <td className="p-2.5 font-mono">{r.tensileYieldMpa}</td>
                          <td className="p-2.5 text-slate-400 text-[11px]">{r.topIranianMills.slice(0, 3).join('، ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Factories Marks */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-xs text-indigo-300">علائم اختصاری کارخانجات فولاد ایران جهت تشخیص اصالت</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {STEEL_FACTORIES_IRAN.map((fac, i) => (
                    <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{fac.name}</div>
                        <div className="text-[10px] text-slate-400">{fac.city}</div>
                      </div>
                      <span className="text-xs font-mono font-black text-amber-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                        {fac.rebarMarking}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {result.sections.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSectionIdx(idx)}
                    className={`w-full text-right p-3 rounded-xl border text-xs font-bold transition-all block ${
                      selectedSectionIdx === idx
                        ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl max-h-[60vh] overflow-y-auto">
                <h4 className="text-xs font-bold text-indigo-300 mb-3 border-b border-slate-800 pb-2">
                  {result.sections[selectedSectionIdx]?.title}
                </h4>
                <pre className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap select-text">
                  {result.sections[selectedSectionIdx]?.content}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <pre className="text-xs text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-5 rounded-2xl border border-slate-800 select-text">
              {JSON.stringify(
                {
                  project: currentProject,
                  brand: currentBrand,
                  website: currentWebsite,
                  compiledPrompt: result
                },
                null,
                2
              )}
            </pre>
          )}
        </div>

        {/* Target AI Copy Bar Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>ارسال مستقیم پرامپت به:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopy('ChatGPT 4o')}
              className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              کپی برای ChatGPT-4o
            </button>

            <button
              type="button"
              onClick={() => handleCopy('Claude 3.5 Sonnet')}
              className="px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              کپی برای Claude 3.5
            </button>

            <button
              type="button"
              onClick={() => handleCopy('Google Gemini')}
              className="px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/40 text-blue-300 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              کپی برای Gemini 1.5/2.0
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

