import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Plus,
  Sparkles,
  Search,
  Filter,
  FileSpreadsheet,
  Upload,
  RefreshCw,
  Trash2,
  Lock,
  Unlock,
  ExternalLink,
  Compass,
  CheckSquare,
  Square,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';
import { exportContentPlanToExcel } from '../../engine/excelEngine';
import { ContentPlanRow, PlanItemStatus, PriorityLevel } from '../../types';

export const ContentPlanView: React.FC = () => {
  const {
    contentPlan,
    addContentPlanRow,
    updateContentPlanRow,
    deleteContentPlanRow,
    batchGenerateRows,
    setActiveContentRowId,
    loadRowIntoWizard,
    toggleFieldLock,
    setExcelImportModalOpen,
    setSheetsSyncModalOpen,
    showNotification
  } = useAppStore();

  // Fast single title input
  const [quickTitle, setQuickTitle] = useState('');
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);
  const [bulkTitlesText, setBulkTitlesText] = useState('');

  // Table Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [productFilter, setProductFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [columnPreset, setColumnPreset] = useState<'all' | 'seo' | 'keywords' | 'structure' | 'social'>('all');

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Filtered Rows
  const filteredRows = useMemo(() => {
    return contentPlan.filter(row => {
      if (statusFilter !== 'ALL' && row.status !== statusFilter) return false;
      if (productFilter !== 'ALL' && !row.productType.includes(productFilter)) return false;
      if (priorityFilter !== 'ALL' && row.priority !== priorityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = row.title?.toLowerCase().includes(q);
        const matchKw = row.primaryKeyword?.toLowerCase().includes(q);
        const matchProd = row.productType?.toLowerCase().includes(q);
        if (!matchTitle && !matchKw && !matchProd) return false;
      }
      return true;
    });
  }, [contentPlan, statusFilter, productFilter, priorityFilter, searchQuery]);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addContentPlanRow(quickTitle.trim());
    setQuickTitle('');
  };

  const handleBulkAdd = () => {
    const titles = bulkTitlesText
      .split('\n')
      .map(t => t.trim())
      .filter(Boolean);

    if (titles.length === 0) return;

    titles.forEach(t => addContentPlanRow(t));
    setBulkTitlesText('');
    setIsBulkAddOpen(false);
    showNotification(`${titles.length} عنوان جدید با ۵۰ ستون کامل اضافه شد.`, 'success');
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRows.map(r => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleBatchAI = async () => {
    if (selectedIds.length === 0) return;
    setIsProcessingBatch(true);
    await batchGenerateRows(selectedIds);
    setIsProcessingBatch(false);
    setSelectedIds([]);
  };

  const getPriorityColor = (p: PriorityLevel) => {
    switch (p) {
      case 'Critical':
        return 'bg-rose-950/60 text-rose-300 border-rose-500/30';
      case 'High':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/30';
      case 'Medium':
        return 'bg-sky-950/60 text-sky-300 border-sky-500/30';
      case 'Low':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getStatusColor = (s: PlanItemStatus) => {
    switch (s) {
      case 'Published':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
      case 'Prompt Ready':
      case 'Brief Ready':
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30';
      case 'Writing':
      case 'Review':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Top Banner & Quick Add Input */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                جدول جامع استراتژی و تقویم محتوا (Content Matrix of Truth)
              </h2>
              <span className="text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                {contentPlan.length} ردیف فعال
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              تنها با وارد کردن عنوان، کلیه ۵۰ فیلد سئو، کلمات کلیدی، استانداردهای فولاد، هدینگ‌ها، پرامپت‌های تصویر و شبکه‌های اجتماعی خودکار تولید می‌شوند.
            </p>
          </div>

          {/* Quick Title Add Form */}
          <form onSubmit={handleQuickAdd} className="w-full lg:w-auto flex-1 max-w-xl flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={quickTitle}
                onChange={e => setQuickTitle(e.target.value)}
                placeholder="عنوان محتوا را بنویسید (مثلاً: راهنمای خرید تیرآهن ۱۴ اصفهان)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 pr-9 transition-all"
              />
              <Sparkles className="w-4 h-4 text-amber-400 absolute right-3 top-2.5" />
            </div>
            <button
              type="submit"
              disabled={!quickTitle.trim()}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              تولید هوشمند ۵۰ ستون
            </button>
            <button
              type="button"
              onClick={() => setIsBulkAddOpen(!isBulkAddOpen)}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold shrink-0 transition-all border border-slate-700"
              title="افزودن دسته‌جمعی عناوین"
            >
              افزودن انبوه
            </button>
          </form>
        </div>

        {/* Bulk Titles Expandable Drawer */}
        {isBulkAddOpen && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
            <label className="text-xs font-bold text-slate-300 block">
              عناوین مقالات را خط به خط وارد کنید (هر خط یک عنوان):
            </label>
            <textarea
              rows={4}
              value={bulkTitlesText}
              onChange={e => setBulkTitlesText(e.target.value)}
              placeholder="قیمت میلگرد ذوب آهن اصفهان امروز&#10;فرمول محاسبه آنلاین وزن ورق سیاه ST52&#10;تفاوت تیرآهن IPE و هاش سنگین IPB&#10;جدول سایز و وزن قوطی پروفیل ساختمانی"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsBulkAddOpen(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-400 text-xs rounded-lg hover:bg-slate-700"
              >
                بستن
              </button>
              <button
                type="button"
                onClick={handleBulkAdd}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg shadow"
              >
                تولید خودکار برای تمام خطوط
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar: Filters, Column Toggles, Batch Actions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Filters & Search */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجو در عناوین و کلمات..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pr-8 pl-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">همه وضعیت‌ها</option>
            <option value="Idea">ایده (Idea)</option>
            <option value="Brief Ready">بریف آماده (Brief Ready)</option>
            <option value="Prompt Ready">پرامپت آماده (Prompt Ready)</option>
            <option value="Writing">در حال نگارش (Writing)</option>
            <option value="Published">منتشر شده (Published)</option>
          </select>

          {/* Product Filter */}
          <select
            value={productFilter}
            onChange={e => setProductFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">همه دسته‌بندی‌ها</option>
            <option value="میلگرد">میلگرد آجدار</option>
            <option value="تیرآهن">تیرآهن و هاش</option>
            <option value="ورق">انواع ورق فولادی</option>
            <option value="پروفیل">قوطی و پروفیل</option>
          </select>

          {/* Column Presets */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-500 px-1">نمایش ستون:</span>
            {[
              { id: 'all', label: 'همه ۵۰ ستون' },
              { id: 'seo', label: 'اصلی سئو' },
              { id: 'keywords', label: 'کلمات و LSI' },
              { id: 'structure', label: 'هدینگ و بریف' },
              { id: 'social', label: 'تصویر و سوشال' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setColumnPreset(p.id as any)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  columnPreset === p.id ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Batch Actions & Sync Tools */}
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg">
              <span className="text-xs text-amber-300 font-bold font-mono">{selectedIds.length} ردیف انتخاب شده</span>
              <button
                type="button"
                disabled={isProcessingBatch}
                onClick={handleBatchAI}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-md flex items-center gap-1 shadow transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                بازتولید مجدد با AI
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSheetsSyncModalOpen(true)}
            className="px-2.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/40 rounded-lg text-xs font-bold flex items-center gap-1.5"
            title="همگام‌سازی گوگل شیتز"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            شیتز آنلاین
          </button>
        </div>
      </div>

      {/* Primary Data Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse">
            {/* Header Row */}
            <thead>
              <tr className="bg-slate-950/90 text-slate-300 border-b border-slate-800 font-bold">
                <th className="p-3 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-amber-400">
                    {selectedIds.length === filteredRows.length && filteredRows.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-3 min-w-[260px]">عنوان اصلی مقاله</th>
                <th className="p-3 min-w-[110px]">وضعیت</th>
                <th className="p-3 min-w-[150px]">کلمه کلیدی اصلی</th>
                <th className="p-3 min-w-[120px]">دسته‌بندی محصول</th>

                {/* Conditional Columns based on Presets */}
                {(columnPreset === 'all' || columnPreset === 'seo') && (
                  <>
                    <th className="p-3 min-w-[130px]">هدف جستجو (Intent)</th>
                    <th className="p-3 min-w-[90px]">کلمات</th>
                    <th className="p-3 min-w-[80px]">امتیاز سئو</th>
                    <th className="p-3 min-w-[90px]">اولویت</th>
                  </>
                )}

                {(columnPreset === 'all' || columnPreset === 'keywords') && (
                  <>
                    <th className="p-3 min-w-[200px]">کلمات کلیدی فرعی</th>
                    <th className="p-3 min-w-[180px]">انتیتی‌های صنعتی</th>
                  </>
                )}

                {(columnPreset === 'all' || columnPreset === 'structure') && (
                  <>
                    <th className="p-3 min-w-[220px]">تگ هدینگ H1</th>
                    <th className="p-3 min-w-[160px]">دستاورد اطلاعاتی (Gain)</th>
                  </>
                )}

                {(columnPreset === 'all' || columnPreset === 'social') && (
                  <>
                    <th className="p-3 min-w-[140px]">پرامپت‌های عکس</th>
                    <th className="p-3 min-w-[140px]">سوشال مدیا</th>
                  </>
                )}

                <th className="p-3 min-w-[160px] text-center sticky left-0 bg-slate-950/95 border-l border-slate-800">
                  عملیات
                </th>
              </tr>
            </thead>

            {/* Table Body Rows */}
            <tbody className="divide-y divide-slate-800/60">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={12} className="p-8 text-center text-slate-500">
                    هیچ مقاله‌ای با فیلترهای انتخابی یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => {
                  const isSelected = selectedIds.includes(row.id);
                  const isLocked = row.isLockedFields?.title;

                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-800/40 transition-all ${
                        isSelected ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleSelectRow(row.id)}
                          className="text-slate-400 hover:text-amber-400"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Title & Lock */}
                      <td className="p-3">
                        <div className="flex items-start gap-2">
                          <button
                            onClick={() => toggleFieldLock(row.id, 'title')}
                            className="mt-0.5 text-slate-500 hover:text-amber-400 shrink-0"
                            title={isLocked ? 'عنوان قفل است' : 'عنوان باز است'}
                          >
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Unlock className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                            )}
                          </button>
                          <div
                            onClick={() => setActiveContentRowId(row.id)}
                            className="font-bold text-slate-200 hover:text-amber-300 cursor-pointer line-clamp-2 leading-relaxed"
                          >
                            {row.title}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border ${getStatusColor(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Primary Keyword */}
                      <td className="p-3 font-semibold text-amber-300">
                        {row.primaryKeyword}
                      </td>

                      {/* Product Type */}
                      <td className="p-3 text-slate-300">
                        {row.productType}
                      </td>

                      {/* SEO View Columns */}
                      {(columnPreset === 'all' || columnPreset === 'seo') && (
                        <>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                              {row.searchIntent}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-slate-400">
                            {row.wordCount}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-emerald-400 font-mono">
                              {row.seoScore}/100
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityColor(
                                row.priority
                              )}`}
                            >
                              {row.priority}
                            </span>
                          </td>
                        </>
                      )}

                      {/* Keywords Columns */}
                      {(columnPreset === 'all' || columnPreset === 'keywords') && (
                        <>
                          <td className="p-3 text-slate-400 text-[11px] max-w-xs truncate">
                            {Array.isArray(row.secondaryKeywords)
                              ? row.secondaryKeywords.slice(0, 3).join(' | ')
                              : row.secondaryKeywords}
                          </td>
                          <td className="p-3 text-slate-400 text-[11px] max-w-xs truncate">
                            {Array.isArray(row.entities)
                              ? row.entities.slice(0, 3).join(' | ')
                              : row.entities}
                          </td>
                        </>
                      )}

                      {/* Structure Columns */}
                      {(columnPreset === 'all' || columnPreset === 'structure') && (
                        <>
                          <td className="p-3 text-slate-300 text-[11px] max-w-xs truncate">
                            {row.h1}
                          </td>
                          <td className="p-3 text-slate-400 text-[11px] max-w-xs truncate">
                            {row.uniqueInformationGain || 'تحلیل مقایسه‌ای کارخانجات'}
                          </td>
                        </>
                      )}

                      {/* Social & Images Columns */}
                      {(columnPreset === 'all' || columnPreset === 'social') && (
                        <>
                          <td className="p-3 text-slate-400 text-[11px]">
                            {row.imagePrompts?.length || 4} پرامپت آماده
                          </td>
                          <td className="p-3 text-slate-400 text-[11px]">
                            تلگرام، اینستا، لینکدین
                          </td>
                        </>
                      )}

                      {/* Actions (Sticky Left) */}
                      <td className="p-3 sticky left-0 bg-slate-900/95 border-l border-slate-800">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => loadRowIntoWizard(row)}
                            className="p-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 rounded-lg transition-all"
                            title="ورود به ویزارد ۱۲ مرحله‌ای پرامپت"
                          >
                            <Compass className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveContentRowId(row.id)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
                            title="مشاهده و ویرایش ۵۰ فیلد"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteContentPlanRow(row.id)}
                            className="p-1.5 bg-rose-950/40 hover:bg-rose-900 text-rose-400 rounded-lg transition-all"
                            title="حذف ردیف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
