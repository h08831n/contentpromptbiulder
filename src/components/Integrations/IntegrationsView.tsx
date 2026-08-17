import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Link2,
  FileSpreadsheet,
  Search,
  BarChart3,
  Globe,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Server,
  Cloud,
  Layers,
  Key,
  Copy,
  SlidersHorizontal
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const {
    gscSummary,
    ga4Summary,
    sheetsConfig,
    toggleIntegration,
    setSheetsSyncModalOpen,
    showNotification
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'google' | 'cloudflare' | 'api'>('google');
  const [cloudflareConfig, setCloudflareConfig] = useState({
    projectName: 'ahaninja-seo-platform',
    customDomain: 'seo.ahaninja.com',
    framework: 'Vite React',
    buildCommand: 'npm run build',
    outputDir: 'dist',
    nodeVersion: '20.x'
  });

  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopyCloudflareScript = () => {
    const wranglerConfig = `# wrangler.toml - Cloudflare Pages / Workers
name = "ahaninja-seo-intelligence"
compatibility_date = "2025-01-01"
pages_build_output_dir = "./dist"

[vars]
ENVIRONMENT = "production"
APP_NAME = "AhanInja SEO Intelligence"
`;
    navigator.clipboard.writeText(wranglerConfig);
    setCopiedKey(true);
    showNotification('کانفیگ Wrangler برای کلودفلر کپی شد.', 'success');
    setTimeout(() => setCopiedKey(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn" id="integrations-container">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-md shadow-indigo-500/10">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">اتصالات و همگام‌سازی‌های ابری (Integrations)</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مدیریت ارتباط دوطرفه گوگل شیتس، سرچ کنسول، آنالیتیکس ۴ و استقرار روی سرورهای Cloudflare
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'google' ? 'bg-indigo-600 text-white font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            سرویس‌های گوگل (GSC, GA4, Sheets)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cloudflare')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cloudflare' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            استقرار کلودفلر (Cloudflare Pages)
          </button>
        </div>
      </div>

      {/* TAB 1: GOOGLE INTEGRATIONS */}
      {activeTab === 'google' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Google Sheets */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    sheetsConfig.isConnected
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {sheetsConfig.isConnected ? 'متصل و همگام' : 'آفلاین'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">گوگل شیتس (Google Sheets)</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  همگام‌سازی زنده ماتریس ۵۰ ستونه محتوا با فایل مشترک تیم سئو، بازرگانی و مدیران آهن اینجا.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                <p className="text-slate-400 text-[11px]">شناسه شیت: {sheetsConfig.spreadsheetId || 'تنظیم نشده'}</p>
                <p className="text-slate-400 text-[11px]">برگه (Tab): {sheetsConfig.sheetName || 'Content_Plan_Matrix'}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSheetsSyncModalOpen(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                تنظیمات همگام‌سازی
              </button>

              <button
                type="button"
                onClick={() => toggleIntegration('sheets', !sheetsConfig.isConnected)}
                className="text-xs text-slate-400 hover:text-white"
              >
                {sheetsConfig.isConnected ? 'قطع اتصال' : 'اتصال دستی'}
              </button>
            </div>
          </div>

          {/* Card 2: Google Search Console */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Search className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    gscSummary.isConnected
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {gscSummary.isConnected ? 'متصل (Live Sync)' : 'حالت آزمایشی'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">سرچ کنسول (Search Console)</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  دریافت کلیک‌ها، ایمپرشن‌ها، افت رتبه‌ها و شناسایی خودکار کلمات Striking Distance (جایگاه ۵ تا ۲۰).
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                <p className="text-slate-400 text-[11px]">دامنه: {gscSummary.propertyUrl}</p>
                <p className="text-emerald-400 text-[11px]">کلیک ماهانه: {gscSummary.clicks.toLocaleString('fa-IR')}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleIntegration('gsc', !gscSummary.isConnected);
                  showNotification('وضعیت اتصال سرچ کنسول آهن اینجا تغییر یافت.', 'success');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gscSummary.isConnected
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                }`}
              >
                {gscSummary.isConnected ? 'قطع همگام‌سازی GSC' : 'اتصال به Search Console'}
              </button>
            </div>
          </div>

          {/* Card 3: Google Analytics 4 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    ga4Summary.isConnected
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {ga4Summary.isConnected ? 'متصل (Live)' : 'حالت آزمایشی'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">گوگل آنالیتیکس ۴ (GA4)</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  ردیابی رفتارهای کاربری، نرخ تعامل، لیدهای تلفنی و استفاده از محاسبه‌گر آنلاین وزن میلگرد.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                <p className="text-slate-400 text-[11px]">شناسه پراپرتی: {ga4Summary.propertyId}</p>
                <p className="text-indigo-400 text-[11px]">کاربران ارگانیک: {ga4Summary.organicUsers.toLocaleString('fa-IR')}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleIntegration('ga4', !ga4Summary.isConnected);
                  showNotification('وضعیت اتصال گوگل آنالیتیکس ۴ تغییر یافت.', 'success');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  ga4Summary.isConnected
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {ga4Summary.isConnected ? 'قطع اتصال GA4' : 'اتصال به GA4'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLOUDFLARE DEPLOYMENT GUIDE */}
      {activeTab === 'cloudflare' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Cloud className="w-7 h-7 text-amber-400" />
                <div>
                  <h3 className="text-base font-black text-white">راهنمای گام‌به‌گام استقرار روی Cloudflare Pages / CDN</h3>
                  <p className="text-xs text-slate-400">
                    برای آوردن این پلتفرم روی کلودفلر، مراحل زیر را به سادگی در داشبورد Cloudflare طی کنید:
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCloudflareScript}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedKey ? 'کپی شد ✓' : 'کپی کانفیگ wrangler.toml'}
              </button>
            </div>

            {/* Steps Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono">۱</span>
                  <span>اتصال به گیت‌هاب / آپلود کد</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  در داشبورد کلودفلر به بخش <b>Compute (Workers & Pages)</b> رفته و گزینه <b>Create application &gt; Pages</b> را انتخاب کنید و مخزن گیت‌هاب خود را متصل نمایید.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono">۲</span>
                  <span>تنظیمات Build Settings</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 font-mono text-[11px] bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <p>Framework preset: <b>Vite</b></p>
                  <p>Build command: <b>npm run build</b></p>
                  <p>Build output: <b>dist</b></p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono">۳</span>
                  <span>اتصال دامنه سفارشی (DNS)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  در تب <b>Custom domains</b> در Pages، ساب‌دامین خود مانند <code>seo.ahaninja.com</code> را ثبت کنید تا گواهینامه SSL رایگان و Edge CDN فعال گردد.
                </p>
              </div>
            </div>

            {/* Direct Cloudflare Headers and Caching Best Practices */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                مزایای استقرار روی Cloudflare برای سئو آهن اینجا:
              </h4>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><b>سرعت لود زیر ۱۰۰ میلی‌ثانیه:</b> توزیع استاتیک روی بیش از ۳۰۰ دیتاسنتر در سراسر جهان</li>
                <li><b>امنیت کامل DDoS و WAF:</b> محافظت از داده‌های قیمت‌گذاری و جلوگیری از اسکرپ غیرمجاز رقبا</li>
                <li><b>پشتیبانی از پروتکل HTTP/3 و Early Hints:</b> ارتقای چشمگیر امتیاز Core Web Vitals (LCP, INP, CLS)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
