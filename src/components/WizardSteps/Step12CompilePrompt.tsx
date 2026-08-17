import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { validateSeoProject } from '../../engine/validator';
import { getSmartRecommendations } from '../../engine/smartRecommendations';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Download,
  FileCode,
  Eye,
  Bot,
  Layers,
  ShieldCheck,
  Check,
  Image,
  Share2,
  Calculator
} from 'lucide-react';
import { STEEL_FORMULAS, STEEL_REBAR_STAHL_TABLE, STEEL_FACTORIES_IRAN } from '../../data/steelData';

export const Step12CompilePrompt: React.FC = () => {
  const { currentProject, currentBrand, currentWebsite, compilePrompt, setPromptPreviewOpen, showNotification } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [copiedSpecificId, setCopiedSpecificId] = useState<string | null>(null);
  const [lastCompiled, setLastCompiled] = useState<ReturnType<typeof compilePrompt> | null>(null);
  const [previewTab, setPreviewTab] = useState<'prompt' | 'images' | 'socials' | 'steel'>('prompt');

  const validation = validateSeoProject(currentProject);
  const recommendations = getSmartRecommendations(currentProject);

  const handleCompile = () => {
    const res = compilePrompt();
    setLastCompiled(res);
    showNotification('پرامپت مستر سئو آهن اینجا با موفقیت کامپایل شد!');
  };

  const handleCopyPrompt = (tag = 'General') => {
    const promptToCopy = lastCompiled?.promptText || compilePrompt().promptText;
    navigator.clipboard.writeText(promptToCopy);
    setCopied(true);
    showNotification(`پرامپت سئو کپی شد (آماده ارسال به ${tag})`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySpecific = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSpecificId(id);
    showNotification('کپی شد!');
    setTimeout(() => setCopiedSpecificId(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const promptText = lastCompiled?.promptText || compilePrompt().promptText;
    const blob = new Blob([promptText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEO-Master-Prompt-${currentProject.primaryKeyword.replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('فایل مارک‌داون دانلود شد.');
  };

  const handleDownloadJson = () => {
    const data = {
      project: currentProject,
      brand: currentBrand,
      website: currentWebsite,
      compiledPrompt: lastCompiled || compilePrompt()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEO-Project-${currentProject.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('پروژه سئو در قالب JSON دانلود شد.');
  };

  const activeResult = lastCompiled || compilePrompt();

  return (
    <div className="space-y-6 animate-fadeIn" id="step-12-compile-container">
      {/* Top Banner: SEO Quality Score Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-400/20 rounded-full text-indigo-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              ارزیابی هوشمند کیفیت پرامپت و استراتژی سئو آهن اینجا
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">
              {currentProject.articleTitle || 'پروژه محتوای سئو آهن اینجا'}
            </h2>
            <p className="text-xs text-slate-300">
              کلمه کلیدی اصلی: <span className="font-bold text-indigo-300">"{currentProject.primaryKeyword}"</span> | نوع محتوا: <span className="font-semibold text-slate-200">{currentProject.contentType}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 px-6 py-4 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300 font-mono">
                {validation.score}/۱۰۰
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">امتیاز جامع سئو</div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-xs font-bold text-emerald-400">{validation.grade}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">سطح اعتبار</div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Strengths, Alerts & Algorithmic Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths & Alerts */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              نقاط قوت استراتژی ({validation.strengths.length})
            </h4>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {validation.strengths.map((s, i) => (
                <div key={i} className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {validation.warnings.length > 0 && (
            <div className="space-y-3 border-t border-slate-800/80 pt-4">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                هشدارهای بهبود کیفیت ({validation.warnings.length})
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {validation.warnings.map((w, i) => (
                  <div key={i} className="text-xs text-amber-200 bg-amber-950/20 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-center justify-between gap-2">
                    <span>• {w}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smart Algorithmic Recommendations */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              پیشنهادات هوشمند موتور الگوریتمی ({recommendations.length})
            </h4>
            <span className="text-[10px] text-slate-400">تحلیل همزمان بازار آهن و Intent</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100">{rec.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    rec.impact === 'High' ? 'bg-rose-950 text-rose-300' : 'bg-indigo-950 text-indigo-300'
                  }`}>
                    اثر {rec.impact === 'High' ? 'بالا' : 'متوسط'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Action Deck: Compile & Fast Export */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-base font-black text-white">تولید نهایی پرامپت مستر سئو آهن اینجا</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            تمامی ۱۲ ماژول تحلیلی شامل برندینگ آهن اینجا، فرمول‌های مهندسی، گراف دانش فولادی و پرامپت‌های تصویر در یک پکیج جامع یکپارچه شده‌اند.
          </p>
        </div>

        {/* Big Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleCompile}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            کامپایل و به‌روزرسانی پرامپت
          </button>

          <button
            type="button"
            onClick={() => {
              if (!lastCompiled) handleCompile();
              setPromptPreviewOpen(true);
            }}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-2xl text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            مشاهده در پنجره تمام‌صفحه
          </button>
        </div>

        {/* 1-Click Copy for Target AI Platforms */}
        <div className="border-t border-slate-800/80 pt-5">
          <span className="text-[11px] text-slate-400 block mb-3 font-semibold">
            کپی مستقیم پرامپت بهینه‌سازی‌شده برای مدل‌های هوش مصنوعی:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => handleCopyPrompt('ChatGPT 4o')}
              className="px-4 py-2 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              کپی برای ChatGPT-4o
            </button>

            <button
              type="button"
              onClick={() => handleCopyPrompt('Claude 3.5 Sonnet')}
              className="px-4 py-2 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              کپی برای Claude 3.5 Sonnet
            </button>

            <button
              type="button"
              onClick={() => handleCopyPrompt('Google Gemini')}
              className="px-4 py-2 bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/40 text-blue-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              کپی برای Google Gemini
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              دانلود Markdown (.md)
            </button>

            <button
              type="button"
              onClick={handleDownloadJson}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <FileCode className="w-3.5 h-3.5" />
              دانلود پروژه JSON
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Live Output Tabs */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-3 gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewTab('prompt')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                previewTab === 'prompt' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-4 h-4" />
              پرامپت مقاله اصلی
            </button>

            <button
              type="button"
              onClick={() => setPreviewTab('images')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                previewTab === 'images' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              پرامپت تصاویر ({activeResult.imagePrompts?.length || 4})
            </button>

            <button
              type="button"
              onClick={() => setPreviewTab('socials')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                previewTab === 'socials' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4" />
              سوشال مدیا
            </button>

            <button
              type="button"
              onClick={() => setPreviewTab('steel')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                previewTab === 'steel' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              فرمول‌ها و اشتال
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
            <span>{activeResult.metadata.wordCount} کلمه</span>
            <span>~{activeResult.metadata.estimatedTokens} توکن</span>
          </div>
        </div>

        {/* Tab 1: Prompt Text */}
        {previewTab === 'prompt' && (
          <pre className="text-[11px] text-slate-300 font-mono leading-relaxed bg-slate-900/60 p-4 rounded-xl max-h-96 overflow-y-auto whitespace-pre-wrap select-text border border-slate-800">
            {activeResult.promptText}
          </pre>
        )}

        {/* Tab 2: AI Image Prompts */}
        {previewTab === 'images' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[500px] overflow-y-auto pr-1">
            {(activeResult.imagePrompts || []).map((img) => (
              <div key={img.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{img.title}</span>
                    <button
                      type="button"
                      onClick={() => handleCopySpecific(img.promptEn, img.id)}
                      className="px-2 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded text-[10px] flex items-center gap-1 transition-all"
                    >
                      {copiedSpecificId === img.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedSpecificId === img.id ? 'کپی شد' : 'کپی پرامپت'}
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-300 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800 leading-relaxed whitespace-pre-wrap dir-ltr text-left">
                    {img.promptEn}
                  </pre>
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5 border-t border-slate-800/80 pt-1.5">
                  <div><strong className="text-indigo-400">Alt:</strong> {img.altTextFa}</div>
                  <div><strong className="text-amber-400">کپشن:</strong> {img.captionFa}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Social Copy */}
        {previewTab === 'socials' && activeResult.socialPrompts && (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">پست تلگرام (Telegram)</span>
                <button
                  type="button"
                  onClick={() => handleCopySpecific(activeResult.socialPrompts!.telegramPost, 's_tg')}
                  className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded text-xs flex items-center gap-1 transition-all"
                >
                  {copiedSpecificId === 's_tg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  کپی متن تلگرام
                </button>
              </div>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 p-3 rounded-lg border border-slate-800">
                {activeResult.socialPrompts.telegramPost}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">کپشن اینستاگرام (Instagram)</span>
                <button
                  type="button"
                  onClick={() => handleCopySpecific(activeResult.socialPrompts!.instagramCaption, 's_ig')}
                  className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded text-xs flex items-center gap-1 transition-all"
                >
                  {copiedSpecificId === 's_ig' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  کپی متن اینستاگرام
                </button>
              </div>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 p-3 rounded-lg border border-slate-800">
                {activeResult.socialPrompts.instagramCaption}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 4: Steel */}
        {previewTab === 'steel' && (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {STEEL_FORMULAS.map((f, i) => (
                <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-white">{f.name}</div>
                  <div className="text-xs font-mono text-amber-400 dir-ltr text-left">{f.formula}</div>
                  <div className="text-[10px] text-slate-400">{f.description}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
              <h5 className="text-xs font-bold text-slate-200">جدول اشتال میلگرد</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-right">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-1.5">سایز</th>
                      <th className="p-1.5">وزن هر شاخه ۱۲م (اشتال)</th>
                      <th className="p-1.5">گرید استاندارد</th>
                      <th className="p-1.5">کارخانه‌های برتر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {STEEL_REBAR_STAHL_TABLE.map((r) => (
                      <tr key={r.size} className="hover:bg-slate-950">
                        <td className="p-1.5 font-bold text-white">میلگرد {r.size}</td>
                        <td className="p-1.5 font-mono text-indigo-300">{r.twelveMeterWeight} kg</td>
                        <td className="p-1.5 text-amber-300 font-mono">{r.standardGrade}</td>
                        <td className="p-1.5 text-slate-400">{r.topIranianMills.slice(0, 2).join('، ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


