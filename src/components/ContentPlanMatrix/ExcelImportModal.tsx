import React, { useState, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { parseExcelOrCsvFile } from '../../engine/excelEngine';
import { ContentPlanRow } from '../../types';

export const ExcelImportModal: React.FC = () => {
  const {
    isExcelImportModalOpen,
    setExcelImportModalOpen,
    currentBrand,
    currentWebsite,
    importContentPlanRows,
    showNotification
  } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [autoCompleteAI, setAutoCompleteAI] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedPreview, setParsedPreview] = useState<ContentPlanRow[]>([]);

  if (!isExcelImportModalOpen) return null;

  const handleFile = async (file: File) => {
    setSelectedFile(file);
    setIsLoading(true);
    try {
      const res = await parseExcelOrCsvFile(file, currentBrand, currentWebsite, autoCompleteAI);
      setParsedPreview(res.rows);
      showNotification(`${res.totalParsed} ردیف آماده ایمپورت است.`, 'info');
    } catch (err: any) {
      showNotification('خطا در پردازش فایل: ' + (err?.message || 'فرمت نامعتبر'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmImport = () => {
    if (parsedPreview.length === 0) return;
    importContentPlanRows(parsedPreview);
    setExcelImportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-black text-white">ورود جدول محتوا از فایل اکسل یا CSV</h3>
          </div>
          <button
            onClick={() => setExcelImportModalOpen(false)}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Dropzone */}
          <div
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              isDragging
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-slate-700 hover:border-slate-500 bg-slate-950/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shadow-inner">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                {selectedFile ? selectedFile.name : 'فایل اکسل (.xlsx, .xls) یا .csv را اینجا رها کنید یا کلیک کنید'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                ستون‌های اکسل به صورت خودکار تشخیص داده و نگاشت می‌شوند.
              </p>
            </div>
          </div>

          {/* Settings: Auto AI Generation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs font-bold text-white">تکمیل هوشمند ۵۰ ستون با هوش مصنوعی</p>
                <p className="text-[11px] text-slate-400">
                  اگر اکسل شما فقط شامل «عنوان» یا «کلمه کلیدی» باشد، سایر فیلدها خودکار تولید می‌شوند.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoCompleteAI}
                onChange={e => setAutoCompleteAI(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Preview list */}
          {parsedPreview.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>پیش‌نمایش ردیف‌های پردازش شده ({parsedPreview.length} مورد):</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {parsedPreview.slice(0, 5).map((row, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 truncate max-w-sm">{row.title}</span>
                    <span className="text-amber-400 font-mono text-[11px]">{row.primaryKeyword}</span>
                  </div>
                ))}
                {parsedPreview.length > 5 && (
                  <p className="text-[11px] text-center text-slate-400">
                    و {parsedPreview.length - 5} ردیف دیگر...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-950">
          <button
            type="button"
            onClick={() => setExcelImportModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
          >
            انصراف
          </button>
          <button
            type="button"
            disabled={parsedPreview.length === 0 || isLoading}
            onClick={handleConfirmImport}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            افزودن به جدول محتوا ({parsedPreview.length} ردیف)
          </button>
        </div>
      </div>
    </div>
  );
};
