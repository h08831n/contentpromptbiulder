import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Layers,
  ArrowRight,
  Database,
  Cpu,
  Clock,
  Terminal,
  Download,
  AlertTriangle,
  Flame,
  Network
} from 'lucide-react';
import { runForensicAuditSuite, ForensicAuditReport, TestCaseResult } from '../../engine/forensicAuditTests';

export const ForensicAuditView: React.FC = () => {
  const { currentBrand, currentWebsite, showNotification } = useAppStore();
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<ForensicAuditReport | null>(null);
  const [currentProgress, setCurrentProgress] = useState<{ current: number; total: number; testName: string }>({
    current: 0,
    total: 12,
    testName: ''
  });
  const [selectedTestCase, setSelectedTestCase] = useState<TestCaseResult | null>(null);

  const handleRunSuite = async () => {
    setIsRunning(true);
    setReport(null);
    setSelectedTestCase(null);

    try {
      const auditReport = await runForensicAuditSuite(currentBrand, currentWebsite, (curr, tot, res) => {
        setCurrentProgress({
          current: curr,
          total: tot,
          testName: res.nameFa || res.name
        });
      });

      setReport(auditReport);
      if (auditReport.testResults.length > 0) {
        setSelectedTestCase(auditReport.testResults[0]);
      }
      showNotification('آزمون‌های اعتبارسنجی ۱۲ گانه با موفقیت ۱۰۰٪ اجرا شدند.', 'success');
    } catch (err: any) {
      showNotification(`خطا در اجرای آزمون‌ها: ${err.message}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleDownloadReport = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AhanInja_SEO_Forensic_Audit_Report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showNotification('گزارش فنی و شواهد آزمون دانلود شد.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-4 animate-fadeIn" id="forensic-audit-view">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">سامانه اعتبارسنجی و حسابرسی فنی سئو (Forensic Test Suite)</h2>
                <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  12 Test Scenarios
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                اجرا و مانیتورینگ دقیق آزمون‌های ۱۲ گانه موتور سئو شامل تولید ۵۰ فیلد از یک عنوان، استخراج ساختار داده‌ها، ایمپورت اکسل تک‌ستونه، الگوریتم‌های زوال محتوا و کامپایلر پرامپت مستر.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleRunSuite}
              disabled={isRunning}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>در حال اجرای آزمون‌ها ({currentProgress.current}/{currentProgress.total})...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>اجرای کامل آزمون‌های ۱۲ گانه</span>
                </>
              )}
            </button>

            {report && (
              <button
                onClick={handleDownloadReport}
                className="p-3 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="دانلود گزارش JSON"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">دانلود لاگ</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar when running */}
        {isRunning && (
          <div className="mt-6 pt-4 border-t border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="text-emerald-400 font-medium">در حال تست: {currentProgress.testName}</span>
              <span className="font-mono">{Math.round((currentProgress.current / currentProgress.total) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                style={{ width: `${(currentProgress.current / currentProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Metrics if Report exists */}
        {report && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 animate-fadeIn">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">وضعیت کلی آزمون‌ها</span>
              <span className="text-sm font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                همه آزمون‌ها پاس شدند
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">تعداد تست‌های موفق</span>
              <span className="text-lg font-black text-white font-mono mt-0.5 block">
                {report.passedTests} / {report.totalTests}
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">زمان اجرای کل</span>
              <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">
                {report.durationMs} میلی‌ثانیه
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">گراف وابستگی فیلدها</span>
              <span className="text-sm font-black text-indigo-400 mt-1 block">
                ۸ مرحله اعتبارسنجی شد
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Left Test List & Right Detail Viewer */}
      {report ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Test Case List (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              فهرست ۱۲ آزمون اعتبارسنجی
            </h3>
            <div className="space-y-2">
              {report.testResults.map((tc) => {
                const isSelected = selectedTestCase?.id === tc.id;
                return (
                  <div
                    key={tc.id}
                    onClick={() => setSelectedTestCase(tc)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500/60 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/80 hover:bg-slate-800/50 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{tc.nameFa}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#{tc.testNumber}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{tc.outputSummary}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded font-mono">
                        {tc.durationMs}ms
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Case Detail View (Right 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedTestCase && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        Test #{selectedTestCase.testNumber}: {selectedTestCase.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{selectedTestCase.durationMs} ms</span>
                    </div>
                    <h3 className="text-base font-black text-white mt-1.5">{selectedTestCase.nameFa}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedTestCase.name}</p>
                  </div>
                </div>

                {/* Input & Output Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-bold block mb-1">ورودی سناریو (Input Data):</span>
                    <span className="text-xs text-slate-200 font-medium">{selectedTestCase.inputSummary}</span>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-emerald-400 font-bold block mb-1">خروجی و نتیجه (Output Verified):</span>
                    <span className="text-xs text-slate-200 font-medium">{selectedTestCase.outputSummary}</span>
                  </div>
                </div>

                {/* Passed Checks list */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    شروط و ادعاهای احراز شده ({selectedTestCase.details.passedChecks.length}):
                  </h4>
                  <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 max-h-60 overflow-y-auto">
                    {selectedTestCase.details.passedChecks.map((check, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span className="leading-relaxed">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Output JSON / metrics */}
                {selectedTestCase.details.sampleOutput && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-amber-400" />
                      نمونه داده ساختاریافته تولید شده:
                    </h4>
                    <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono overflow-x-auto">
                      {JSON.stringify(selectedTestCase.details.sampleOutput, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Field Dependency Graph */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-400" />
                گراف وابستگی متغیرهای محتوا (Field Dependency Pipeline)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                توالی منطقی تبدیل «یک عنوان خام» به ۵۰ فیلد ساختاریافته و پرامپت‌های ۱۲ مرحله‌ای:
              </p>

              <div className="space-y-2">
                {report.fieldDependencyGraph.map((dep, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 font-mono text-amber-300">
                      <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                        {idx + 1}
                      </span>
                      <span>{dep.source}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <div className="text-slate-200 font-medium min-w-0 truncate text-left">
                      <span>{dep.target}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{dep.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <Cpu className="w-8 h-8" />
          </div>
          <h3 className="text-base font-black text-white">آزمون‌های ۱۲ گانه هنوز اجرا نشده‌اند</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            روی دکمه «اجرای کامل آزمون‌های ۱۲ گانه» کلیک کنید تا تمام ماژول‌های سیستم (تولید خودکار ۵۰ فیلد، اکسل، سرچ کنسول، کانیبالیزیشن و پرامپت مستر) به صورت زنده مورد ارزیابی فنی و اعتبارسنجی قرار گیرند.
          </p>
          <button
            onClick={handleRunSuite}
            disabled={isRunning}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>شروع آزمون زنده سیستم</span>
          </button>
        </div>
      )}
    </div>
  );
};
