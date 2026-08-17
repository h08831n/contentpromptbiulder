import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { X, FileSpreadsheet, RefreshCw, CheckCircle2, Link2, ExternalLink, Shield } from 'lucide-react';
import { syncWithGoogleSheets } from '../../engine/sheetsEngine';

export const SheetsSyncModal: React.FC = () => {
  const {
    isSheetsSyncModalOpen,
    setSheetsSyncModalOpen,
    sheetsConfig,
    contentPlan,
    currentBrand,
    currentWebsite,
    toggleIntegration,
    showNotification
  } = useAppStore();

  const [spreadsheetUrl, setSpreadsheetUrl] = useState(sheetsConfig.spreadsheetId || '');
  const [sheetName, setSheetName] = useState(sheetsConfig.sheetName || 'SEO_Content_Plan');
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isSheetsSyncModalOpen) return null;

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await syncWithGoogleSheets(
        { ...sheetsConfig, spreadsheetId: spreadsheetUrl, sheetName },
        contentPlan,
        currentBrand,
        currentWebsite
      );
      toggleIntegration('sheets', true);
      showNotification(res.message, 'success');
      setSheetsSyncModalOpen(false);
    } catch (err: any) {
      showNotification(err.message || 'خطا در همگام‌سازی با گوگل شیتز', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">اتصال و همگام‌سازی گوگل شیتز (Google Sheets)</h3>
              <p className="text-[11px] text-slate-400">همگام‌سازی دوطرفه جدول محتوا با شیتز آنلاین</p>
            </div>
          </div>
          <button
            onClick={() => setSheetsSyncModalOpen(false)}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3.5 flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200 leading-relaxed">
              با اتصال گوگل شیتز، کلیه تغییرات جدول محتوا در لحظه با برگه اشتراکی تیم تولید محتوا و سئو همگام می‌شود.
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">لینک یا شناسه برگه گوگل شیتز (Spreadsheet URL / ID)</label>
            <input
              type="text"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={spreadsheetUrl}
              onChange={e => setSpreadsheetUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono text-left"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">نام تب برگه (Sheet Tab Name)</label>
            <input
              type="text"
              value={sheetName}
              onChange={e => setSheetName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>تعداد ردیف‌های فعلی آماده همگام‌سازی:</span>
              <span className="font-bold text-white font-mono">{contentPlan.length} ردیف</span>
            </div>
            <div className="flex justify-between">
              <span>وضعیت اتصال:</span>
              <span className="font-bold text-amber-400 font-mono">آماده اتصال</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-950">
          <button
            type="button"
            onClick={() => setSheetsSyncModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
          >
            انصراف
          </button>
          <button
            type="button"
            disabled={isSyncing}
            onClick={handleSync}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            تایید و همگام‌سازی
          </button>
        </div>
      </div>
    </div>
  );
};
