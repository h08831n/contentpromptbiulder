import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  Plus,
  Compass,
  CheckCircle2,
  BarChart3,
  Search,
  Eye,
  RefreshCw,
  ListPlus
} from 'lucide-react';
import { calculateSEOHealthScore } from '../../engine/seoOpportunityEngine';

export const SEODashboardView: React.FC = () => {
  const {
    gscSummary,
    ga4Summary,
    contentPlan,
    keywordGaps,
    contentGaps,
    cannibalizations,
    contentDecays,
    addContentPlanRow,
    convertGapToTask,
    convertCannibalizationToTask,
    convertDecayToTask,
    setActiveView,
    showNotification
  } = useAppStore();

  const healthScore = calculateSEOHealthScore(gscSummary, ga4Summary, contentPlan);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'keywords' | 'contentGaps' | 'cannibalization' | 'decay'>('overview');

  const handleConvertGapToContent = (title: string) => {
    addContentPlanRow(title);
    showNotification(`محتوای «${title}» با ۵۰ فیلد به جدول محتوا افزوده شد.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Top SEO Health Score Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Main Health Metric */}
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-1 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white font-mono">{healthScore.overallScore}</span>
                <span className="text-[10px] text-amber-400 font-bold">امتیاز سئو کل</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">داشبورد فرصت‌ها و سلامت سئو آهن اینجا</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  وضعیت کلی: بسیار مطلوب
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                تحلیل یکپارچه معماری محتوا، انطباق با جدول اشتال، کلمات در آستانه رتبه ۱ گوگل (Striking Distance) و پیشگیری از هم‌پوشانی صفحات.
              </p>
            </div>
          </div>

          {/* Quick Actions & Audit Suite Launcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setActiveView('audit-suite')}
              className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              اجرای حسابرسی فنی ۱۲ گانه (Forensic Suite)
            </button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">کلیک ارگانیک ۲۸ روزه</span>
              <span className="text-base font-black text-white font-mono mt-0.5 block">
                {gscSummary.clicks.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">نرخ کلیک (CTR)</span>
              <span className="text-base font-black text-emerald-400 font-mono mt-0.5 block">
                {gscSummary.ctr}%
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">جایگاه میانگین</span>
              <span className="text-base font-black text-amber-400 font-mono mt-0.5 block">
                {gscSummary.avgPosition}
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">نرخ تبدیل سرنخ (CR)</span>
              <span className="text-base font-black text-indigo-400 font-mono mt-0.5 block">
                {ga4Summary.conversionRate}%
              </span>
            </div>
          </div>

        {/* Sub Scores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {[
            { label: 'فنی و ساختار', score: healthScore.technicalScore },
            { label: 'کیفیت محتوا', score: healthScore.contentQualityScore },
            { label: 'تطابق با اینتنت', score: healthScore.searchIntentAlignment },
            { label: 'پوشش کلاستر', score: healthScore.topicalCoverageScore },
            { label: 'لینک‌های داخلی', score: healthScore.internalLinkingScore },
            { label: 'بهینگی CTR', score: healthScore.ctrPerformanceScore },
            { label: 'تازگی داده‌ها', score: healthScore.freshnessScore },
            { label: 'نرخ تبدیل B2B', score: healthScore.conversionScore }
          ].map((sub, i) => (
            <div key={i} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-center">
              <span className="text-[11px] text-slate-400 block truncate">{sub.label}</span>
              <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">{sub.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs for Opportunities */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'نمای کلی فرصت‌ها', count: keywordGaps.length + contentGaps.length },
          { id: 'keywords', label: 'فرصت‌های رتبه ۴ تا ۲۰ سرچ کنسول', count: keywordGaps.length },
          { id: 'contentGaps', label: 'شکاف محتوایی با رقبا (Content Gap)', count: contentGaps.length },
          { id: 'cannibalization', label: 'هشدارهای کانیبالیزیشن (تداخل صفحات)', count: cannibalizations.length },
          { id: 'decay', label: 'محتواهای در حال افت ترافیک (Content Decay)', count: contentDecays.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            {tab.label}
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeSubTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: KEYWORD GAPS */}
      {(activeSubTab === 'overview' || activeSubTab === 'keywords') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              کلمات کلیدی در آستانه صفحه اول (Striking Distance & High Impression)
            </h3>
            <span className="text-xs text-slate-400">
              این کلمات جستجوی بالایی دارند و با بروزرسانی یا ساخت صفحه اختصاصی بلافاصله جهش رتبه خواهند داشت.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keywordGaps.map(kw => (
              <div key={kw.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-mono">
                      {kw.opportunityType}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{kw.query}</h4>
                  </div>
                  <span className="text-xs font-black font-mono text-amber-400">
                    رتبه: {kw.currentPosition}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-500 block">ایمپرشن</span>
                    <span className="font-mono text-slate-200 font-bold">{kw.impressions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">کلیک ماهانه</span>
                    <span className="font-mono text-slate-200 font-bold">{kw.clicks}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">تخمین رشد کلیک</span>
                    <span className="font-mono text-emerald-400 font-bold">+{kw.estimatedTrafficGain}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">اقدام پیشنهادی: {kw.recommendedAction}</span>
                  <button
                    onClick={() => handleConvertGapToContent(kw.query)}
                    className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    افزودن به جدول محتوا
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CONTENT GAPS */}
      {(activeSubTab === 'overview' || activeSubTab === 'contentGaps') && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-400" />
              موضوعات غایب در سایت آهن اینجا که رقبا ترافیک می‌گیرند (Content Gap)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {contentGaps.map(gap => (
              <div key={gap.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-400 font-mono">تقاضا: {gap.searchDemand.toLocaleString()}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                      {gap.priority}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-relaxed">{gap.suggestedTitle}</h4>
                  <p className="text-[11px] text-slate-400">
                    رقبای پوشش‌دهنده: {gap.competitorCovering.join('، ')}
                  </p>
                </div>

                <button
                  onClick={() => handleConvertGapToContent(gap.suggestedTitle)}
                  className="w-full mt-2 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-black flex items-center justify-center gap-1 shadow transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ایجاد پروژه محتوا
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CANNIBALIZATION */}
      {(activeSubTab === 'overview' || activeSubTab === 'cannibalization') && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              هم‌پوشانی و تداخل رتبه‌ها (Keyword Cannibalization)
            </h3>
          </div>

          <div className="space-y-3">
            {cannibalizations.map(can => (
              <div key={can.id} className="bg-slate-900 border border-amber-500/30 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">کلمه کلیدی دارای تداخل:</span>
                    <span className="text-xs font-bold text-amber-400">{can.query}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      اقدام: {can.recommendedAction}
                    </span>
                    <button
                      onClick={() => convertCannibalizationToTask({
                        id: can.id,
                        query: can.query,
                        urlA: can.conflictingUrls[0]?.url || '',
                        urlB: can.conflictingUrls[1]?.url || '',
                        severity: 'Critical',
                        recommendedAction: can.recommendedAction
                      })}
                      className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <ListPlus className="w-3.5 h-3.5" />
                      تبدیل به تسک رفع تداخل
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {can.conflictingUrls.map((u, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-slate-200">{u.title}</div>
                      <div className="font-mono text-[11px] text-slate-400 truncate">{u.url}</div>
                      <div className="flex justify-between text-slate-400 text-[10px] pt-1">
                        <span>ایمپرشن: {u.impressions}</span>
                        <span>کلیک: {u.clicks}</span>
                        <span>رتبه: {u.position}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  💡 {can.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DECAY */}
      {(activeSubTab === 'overview' || activeSubTab === 'decay') && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              محتواهای نیازمند بروزرسانی و بازنویسی (Content Decay)
            </h3>
          </div>

          <div className="space-y-3">
            {contentDecays.map(dec => (
              <div key={dec.id} className="bg-slate-900 border border-rose-500/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30 font-bold">
                      {dec.status}
                    </span>
                    <h4 className="text-sm font-bold text-white">{dec.title}</h4>
                  </div>
                  <p className="text-xs font-mono text-slate-400">{dec.pageUrl}</p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="text-center">
                    <span className="text-slate-500 block text-[10px]">افت ترافیک</span>
                    <span className="text-rose-400 font-bold font-mono">-{dec.percentageLoss}%</span>
                  </div>
                  <div className="text-center">
                    <span className="text-slate-500 block text-[10px]">تغییر رتبه</span>
                    <span className="text-amber-400 font-bold font-mono">{dec.previousPosition} → {dec.currentPosition}</span>
                  </div>
                  <button
                    onClick={() => convertDecayToTask({
                      id: dec.id,
                      url: dec.pageUrl,
                      decayScore: dec.percentageLoss,
                      clickDeclinePercent: dec.percentageLoss,
                      previousPosition: dec.previousPosition,
                      currentPosition: dec.currentPosition,
                      recommendedAction: 'بازنویسی بخش‌های فرسوده، بروزرسانی قیمت روز و جدول اشتال'
                    })}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ListPlus className="w-3.5 h-3.5" />
                    ثبت تسک
                  </button>
                  <button
                    onClick={() => handleConvertGapToContent(`بروزرسانی: ${dec.title}`)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow cursor-pointer"
                  >
                    بروزرسانی در ماتریس
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
