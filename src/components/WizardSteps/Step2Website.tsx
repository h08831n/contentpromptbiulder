import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TRANSLATIONS } from '../../i18n/translations';
import { Globe, Plus, Trash2, Link2, ExternalLink, ShieldCheck } from 'lucide-react';

export const Step2Website: React.FC = () => {
  const { currentWebsite, currentProject, updateCurrentProject, websites, language } = useAppStore();
  const t = TRANSLATIONS[language];

  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  if (!currentWebsite) return null;

  const handleAddExistingUrl = () => {
    if (!newUrl.trim() || !newTitle.trim()) return;
    currentWebsite.existingUrls.push({
      url: newUrl.trim(),
      title: newTitle.trim(),
      mainKeyword: newKeyword.trim() || newTitle.trim()
    });
    setNewUrl('');
    setNewTitle('');
    setNewKeyword('');
  };

  const handleRemoveUrl = (index: number) => {
    currentWebsite.existingUrls.splice(index, 1);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="step-2-website-container">
      {/* Website Domain & Core Config */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-400">
          <Globe className="w-5 h-5" />
          <h3 className="font-bold text-slate-100 text-sm">مشخصات دامنه و معماری وبسایت</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">دامنه وبسایت (Domain)</label>
            <input
              type="text"
              value={currentWebsite.domain}
              disabled
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">نام سایت / برند آنلاین</label>
            <input
              type="text"
              value={currentWebsite.siteName}
              disabled
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">نیچ مارکت و دسته‌بندی اصلی</label>
            <input
              type="text"
              value={currentWebsite.niche}
              disabled
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Existing URLs Repository (مخزن صفحات موجود سایت برای لینک‌سازی داخلی) */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Link2 className="w-4 h-4" />
            <h4 className="font-bold text-slate-100 text-xs">
              مخزن صفحات موجود سایت (جهت درج خودکار لینک‌های داخلی معتبر)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {currentWebsite.existingUrls.length} صفحه ثبت شده
          </span>
        </div>

        {/* Form to add new URL to the repository */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="url"
              placeholder="آدرس URL (https://...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none font-mono"
            />
            <input
              type="text"
              placeholder="عنوان صفحه (مثال: قیمت روز میلگرد)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="کلمه کلیدی هدف این صفحه"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddExistingUrl}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن به مخزن لینک‌ها
            </button>
          </div>
        </div>

        {/* Existing URLs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">عنوان صفحه</th>
                <th className="py-2.5 px-3">کلمه کلیدی هدف</th>
                <th className="py-2.5 px-3 font-mono">آدرس URL</th>
                <th className="py-2.5 px-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {currentWebsite.existingUrls.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 text-slate-300">
                  <td className="py-2.5 px-3 font-medium text-slate-100">{item.title}</td>
                  <td className="py-2.5 px-3 text-indigo-300 font-mono">{item.mainKeyword}</td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono truncate max-w-[220px]">
                    <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-indigo-300 flex items-center gap-1">
                      {item.url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
