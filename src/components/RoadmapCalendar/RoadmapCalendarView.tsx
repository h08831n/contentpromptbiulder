import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  FileText,
  Plus,
  ArrowRight,
  Tag,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { ContentPlanRow, PlanItemStatus } from '../../types';

export const RoadmapCalendarView: React.FC = () => {
  const {
    contentPlan,
    updateContentPlanRow,
    setActiveContentRowId,
    loadRowIntoWizard,
    addContentPlanRow,
    showNotification
  } = useAppStore();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Current month, 1 = Next month
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'month' | 'cluster' | 'timeline'>('month');

  // Categories of content in steel
  const categories = ['ALL', 'میلگرد', 'تیرآهن و هاش', 'ورق سیاه و روغنی', 'قوطی و پروفیل', 'لوله مانیسمان', 'نبشی و ناودانی'];

  const filteredPlan = useMemo(() => {
    return contentPlan.filter(r => {
      if (selectedCategory !== 'ALL' && !r.productType.includes(selectedCategory) && !r.title.includes(selectedCategory)) {
        return false;
      }
      return true;
    });
  }, [contentPlan, selectedCategory]);

  // Group by Status
  const statusBuckets = useMemo(() => {
    const planned = filteredPlan.filter(r => r.status === 'Planned');
    const inProgress = filteredPlan.filter(r => r.status === 'In Progress');
    const review = filteredPlan.filter(r => r.status === 'Review');
    const published = filteredPlan.filter(r => r.status === 'Published');
    return { planned, inProgress, review, published };
  }, [filteredPlan]);

  // Group by Cluster
  const clusterBuckets = useMemo(() => {
    const map = new Map<string, ContentPlanRow[]>();
    filteredPlan.forEach(r => {
      const cluster = r.productType || 'عمومی و متفرقه';
      if (!map.has(cluster)) map.set(cluster, []);
      map.get(cluster)!.push(r);
    });
    return Array.from(map.entries());
  }, [filteredPlan]);

  const handleStatusChange = (rowId: string, status: PlanItemStatus) => {
    updateContentPlanRow(rowId, { status });
    showNotification('وضعیت انتشار محتوا به‌روزرسانی شد.', 'info');
  };

  const getStatusBadge = (status: PlanItemStatus) => {
    switch (status) {
      case 'Published':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">منتشر شده</span>;
      case 'Review':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-500/30">بررسی نهایی</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30">در حال تدوین</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">برنامه‌ریزی شده</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn" id="roadmap-calendar-container">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shadow-md shadow-amber-500/10">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">نقشه راه، تقویم سردبیری و زمان‌بندی انتشار محتوا</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مدیریت ریتم انتشار مقالات تخصصی فولاد، همگام با نوسانات بازار آهن، بورس کالا و فصول ساخت‌وساز
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setViewMode('month')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'month' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            کانبان وضعیت (Kanban)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cluster')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'cluster' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            کلاسترهای موضوعی فولاد
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'timeline' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            تقویم هفتگی انتشار
          </button>
        </div>
      </div>

      {/* Filter Tabs by Product Category */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-1">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 whitespace-nowrap pl-2">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          کلاستر محصول:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat === 'ALL' ? 'همه کلاسترها' : cat}
          </button>
        ))}
      </div>

      {/* VIEW 1: KANBAN STATUS COLUMNS */}
      {viewMode === 'month' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Column 1: Planned */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                <h3 className="text-xs font-bold text-slate-200">برنامه‌ریزی شده (Planned)</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg">
                {statusBuckets.planned.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {statusBuckets.planned.map(row => (
                <div
                  key={row.id}
                  className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 space-y-2.5 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px]">
                    <span className="text-amber-400 font-semibold truncate">{row.productType}</span>
                    <span className="text-slate-500 font-mono">{row.targetDate || 'تاریخ باز'}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug line-clamp-2">
                    {row.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 font-mono truncate">
                    🎯 {row.primaryKeyword}
                  </p>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(row.id, 'In Progress')}
                      className="text-[10px] px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg transition-all"
                    >
                      شروع نگارش ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveContentRowId(row.id)}
                      className="text-[10px] text-slate-400 hover:text-white"
                    >
                      جزئیات
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-slate-900/50 border border-amber-500/20 rounded-2xl p-4 space-y-3 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-xs font-bold text-amber-300">در حال تدوین (Writing)</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-amber-950 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/30">
                {statusBuckets.inProgress.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {statusBuckets.inProgress.map(row => (
                <div
                  key={row.id}
                  className="bg-slate-950 border border-amber-500/30 rounded-xl p-3.5 space-y-2.5 hover:border-amber-500/60 transition-all"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px]">
                    <span className="text-amber-400 font-semibold truncate">{row.productType}</span>
                    <span className="text-slate-500 font-mono">{row.wordCount} کلمه</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug line-clamp-2">
                    {row.title}
                  </h4>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(row.id, 'Review')}
                      className="text-[10px] px-2 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-all"
                    >
                      ارسال به بازبینی ←
                    </button>
                    <button
                      type="button"
                      onClick={() => loadRowIntoWizard(row)}
                      className="text-[10px] px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                    >
                      ویزارد
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Review */}
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-4 space-y-3 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <h3 className="text-xs font-bold text-purple-300">بازبینی فنی و متالورژی</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded-lg border border-purple-500/30">
                {statusBuckets.review.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {statusBuckets.review.map(row => (
                <div
                  key={row.id}
                  className="bg-slate-950 border border-purple-500/30 rounded-xl p-3.5 space-y-2.5 hover:border-purple-500/60 transition-all"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px]">
                    <span className="text-purple-400 font-semibold truncate">{row.productType}</span>
                    <span className="text-emerald-400 font-mono">سئو: ۱۰۰٪</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug line-clamp-2">
                    {row.title}
                  </h4>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(row.id, 'Published')}
                      className="text-[10px] px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-lg transition-all font-bold"
                    >
                      تایید و انتشار نهایی ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveContentRowId(row.id)}
                      className="text-[10px] text-slate-400 hover:text-white"
                    >
                      بررسی
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Published */}
          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-4 space-y-3 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-xs font-bold text-emerald-300">منتشر شده (Published)</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                {statusBuckets.published.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {statusBuckets.published.map(row => (
                <div
                  key={row.id}
                  className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3.5 space-y-2.5 hover:border-emerald-500/60 transition-all"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px]">
                    <span className="text-emerald-400 font-semibold truncate">{row.productType}</span>
                    <span className="text-slate-500 font-mono">آنلاین</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug line-clamp-2">
                    {row.title}
                  </h4>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-1">
                    <span className="text-[10px] text-slate-400 font-mono">
                      لینک: {row.urlSlug || '/blog/...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveContentRowId(row.id)}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300"
                    >
                      مشاهده ۵۰ فیلد
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TOPICAL CLUSTERS */}
      {viewMode === 'cluster' && (
        <div className="space-y-4">
          {clusterBuckets.map(([clusterName, rows]) => (
            <div key={clusterName} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-black text-white">{clusterName}</h3>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                    {rows.length} محتوا
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addContentPlanRow(`راهنمای تخصصی جدید برای ${clusterName}`);
                    showNotification(`عنوان جدید به کلاستر ${clusterName} افزوده شد.`, 'success');
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  افزودن محتوا به کلاستر
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {rows.map(row => (
                  <div
                    key={row.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between gap-3 hover:border-slate-700"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {getStatusBadge(row.status)}
                        <span className="text-[10px] text-slate-500 font-mono">{row.searchIntent}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-2">{row.title}</h4>
                      <p className="text-[11px] text-amber-400 mt-1 truncate">کلمه: {row.primaryKeyword}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => loadRowIntoWizard(row)}
                        className="text-indigo-400 hover:text-indigo-300 font-bold"
                      >
                        ارسال به ویزارد
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveContentRowId(row.id)}
                        className="text-slate-400 hover:text-white"
                      >
                        جزئیات ۵۰ ستون
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: WEEKLY TIMELINE SCHEDULE */}
      {viewMode === 'timeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              برنامه زمانی و ریتم هفتگی انتشار محتوا در آهن اینجا
            </h3>
            <span className="text-xs text-slate-400 font-mono">هدف: ۴ تا ۶ محتوای عمیق در ماه</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {['شنبه (تحلیل قیمت)', 'یکشنبه (راهنما)', 'دوشنبه (تخصصی/اشتال)', 'سه‌شنبه (گزارش بورس)', 'چهارشنبه (مقایسه برندها)', 'پنج‌شنبه (جمع‌بندی)', 'جمعه (استراحت)'].map((day, idx) => {
              const matchedRows = filteredPlan.filter((_, i) => i % 7 === idx);
              return (
                <div key={day} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                  <h4 className="text-[11px] font-bold text-amber-400 border-b border-slate-800/80 pb-1.5">{day}</h4>
                  <div className="space-y-2">
                    {matchedRows.length === 0 ? (
                      <p className="text-[10px] text-slate-600">برنامه‌ای نیست</p>
                    ) : (
                      matchedRows.map(r => (
                        <div key={r.id} className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px] space-y-1">
                          <p className="font-bold text-slate-200 line-clamp-2">{r.title}</p>
                          <span className="text-[9px] text-indigo-300 block">{r.productType}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
