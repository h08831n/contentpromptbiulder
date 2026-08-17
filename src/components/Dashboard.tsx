import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../i18n/translations';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { ContentType } from '../types';

export const Dashboard: React.FC = () => {
  const {
    projects,
    currentProject,
    selectProject,
    createProject,
    deleteProject,
    cloneProject,
    setActiveView,
    setActiveStep,
    setPresetsModalOpen,
    language,
    compilePrompt,
    setPromptPreviewOpen
  } = useAppStore();

  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'ALL' || p.contentType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleOpenProject = (id: string) => {
    selectProject(id);
    setActiveView('wizard');
    setActiveStep(1);
  };

  const handleQuickCompile = (id: string) => {
    selectProject(id);
    compilePrompt();
    setPromptPreviewOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="dashboard-container">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            داشبورد مدیریت پروژه‌های محتوای سئو
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ایجاد، ویرایش، تکثیر و کامپایل سریع پرامپت‌های مستر برای کلیه مقالات، رپورتاژها و صفحات محصول
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPresetsModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            الگوهای آماده استراتژی
          </button>

          <button
            type="button"
            onClick={() => {
              createProject('مقاله سئو جدید');
              setActiveView('wizard');
              setActiveStep(1);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.actions.createNewProject}
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در عنوان، موضوع یا کلمه کلیدی..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 whitespace-nowrap">فیلتر نوع:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="ALL">همه انواع محتوا ({projects.length})</option>
            <option value="مقاله وبسایت">مقاله وبسایت</option>
            <option value="رپورتاژ تبلیغاتی">رپورتاژ تبلیغاتی</option>
            <option value="محصول فروشگاهی">محصول فروشگاهی</option>
            <option value="معرفی بهترین مشاغل">معرفی بهترین مشاغل</option>
            <option value="افیلیت دیجیکالا">افیلیت دیجیکالا</option>
            <option value="پیلار پیج (Pillar Page)">پیلار پیج</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((p) => {
          const isSelected = p.id === currentProject.id;
          return (
            <div
              key={p.id}
              className={`bg-slate-900/50 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-700 ${
                isSelected ? 'border-indigo-500/80 shadow-lg shadow-indigo-950/40 bg-slate-900/80' : 'border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {p.contentType}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(p.updatedAt).toLocaleDateString('fa-IR')}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-100 line-clamp-2 leading-relaxed">
                    {p.articleTitle || p.topic}
                  </h3>
                  <p className="text-[11px] text-indigo-400 mt-1 font-semibold truncate">
                    کلمه کلیدی: "{p.primaryKeyword}"
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenProject(p.id)}
                  className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  ویرایش در ویزارد
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleQuickCompile(p.id)}
                    title="کامپایل سریع پرامپت"
                    className="p-2 bg-slate-950 hover:bg-slate-800 text-amber-300 rounded-lg border border-slate-800"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => cloneProject(p.id)}
                    title="تکثیر پروژه"
                    className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteProject(p.id)}
                      title="حذف پروژه"
                      className="p-2 bg-slate-950 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
