import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  Calendar,
  Layers,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { SEOTaskItem, PriorityLevel } from '../../types';

export const TaskCenterView: React.FC = () => {
  const {
    seoTasks,
    updateTaskStatus,
    addCustomTask,
    addContentPlanRow,
    setActiveView,
    showNotification
  } = useAppStore();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'TODO' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'KEYWORD_GAP' | 'CONTENT_GAP' | 'CANNIBALIZATION' | 'CONTENT_DECAY' | 'TECHNICAL' | 'INTERNAL_LINKING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<SEOTaskItem['category']>('CONTENT_GAP');
  const [newTaskPriority, setNewTaskPriority] = useState<PriorityLevel>('High');
  const [newTaskImpact, setNewTaskImpact] = useState('افزایش ترافیک ارگانیک کلاستر مقاطع فولادی');
  const [newTaskAction, setNewTaskAction] = useState('تولید محتوا و پیاده‌سازی چک‌لیست سئو');

  const filteredTasks = useMemo(() => {
    return seoTasks.filter(task => {
      if (statusFilter !== 'ALL' && task.status !== statusFilter) return false;
      if (priorityFilter !== 'ALL' && task.priority !== priorityFilter) return false;
      if (categoryFilter !== 'ALL' && task.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchImpact = task.estimatedImpact.toLowerCase().includes(q);
        const matchAction = task.suggestedAction.toLowerCase().includes(q);
        if (!matchTitle && !matchImpact && !matchAction) return false;
      }
      return true;
    });
  }, [seoTasks, statusFilter, priorityFilter, categoryFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = seoTasks.length;
    const todo = seoTasks.filter(t => t.status === 'TODO').length;
    const inProgress = seoTasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completed = seoTasks.filter(t => t.status === 'COMPLETED').length;
    const critical = seoTasks.filter(t => t.priority === 'Critical').length;
    return { total, todo, inProgress, completed, critical };
  }, [seoTasks]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addCustomTask({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      status: 'TODO',
      estimatedImpact: newTaskImpact,
      suggestedAction: newTaskAction
    });

    setNewTaskTitle('');
    setIsNewTaskModalOpen(false);
  };

  const handleCreateContentFromTask = (task: SEOTaskItem) => {
    const title = task.title.replace('پوشش کلمه کلیدی: ', '').replace('رفع کانیبالیزیشن: ', '').replace('به‌روزرسانی محتوای رو به زوال: ', '');
    addContentPlanRow(title);
    updateTaskStatus(task.id, 'IN_PROGRESS');
    showNotification(`محتوای «${title}» به جدول محتوا افزوده و وضعیت تسک در حال انجام شد.`, 'success');
  };

  const getPriorityBadge = (p: PriorityLevel) => {
    switch (p) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">بحرانی (Critical)</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">بالا (High)</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/40">متوسط (Medium)</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">عادی (Low)</span>;
    }
  };

  const getCategoryLabel = (cat: SEOTaskItem['category']) => {
    switch (cat) {
      case 'KEYWORD_GAP':
        return 'شکاف کلمات کلیدی';
      case 'CONTENT_GAP':
        return 'شکاف محتوایی کلاستر';
      case 'CANNIBALIZATION':
        return 'رفع هم‌پوشانی (Cannibalization)';
      case 'CONTENT_DECAY':
        return 'به‌روزرسانی محتوای زوال‌یافته';
      case 'INTERNAL_LINKING':
        return 'استراتژی لینک‌سازی داخلی';
      case 'TECHNICAL':
        return 'سئو تکنیکال و اسکیما';
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn" id="task-center-container">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">مرکز تسک‌ها و اکشن‌پلن سئو آهن اینجا</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                تسک‌های هوشمند استخراج‌شده از تحلیل سرچ کنسول، شناسایی رقبا، شکاف محتوایی و افت رتبه
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            تسک جدید سئو
          </button>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setStatusFilter('ALL')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'ALL' ? 'bg-slate-900 border-indigo-500 shadow-md' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>کل تسک‌ها</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2 font-mono">{stats.total}</p>
        </div>

        <div
          onClick={() => setStatusFilter('TODO')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'TODO' ? 'bg-slate-900 border-rose-500 shadow-md' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-rose-400 text-xs font-semibold">
            <span>در انتظار اقدام (Todo)</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-rose-300 mt-2 font-mono">{stats.todo}</p>
        </div>

        <div
          onClick={() => setStatusFilter('IN_PROGRESS')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'IN_PROGRESS' ? 'bg-slate-900 border-amber-500 shadow-md' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
            <span>در حال انجام (Progress)</span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-amber-300 mt-2 font-mono">{stats.inProgress}</p>
        </div>

        <div
          onClick={() => setStatusFilter('COMPLETED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'COMPLETED' ? 'bg-slate-900 border-emerald-500 shadow-md' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>انجام‌شده (Done)</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-emerald-300 mt-2 font-mono">{stats.completed}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="جستجو در تسک‌ها، پیامد سئو یا اقدامات..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">همه اولویت‌ها</option>
            <option value="Critical">بحرانی (Critical)</option>
            <option value="High">بالا (High)</option>
            <option value="Medium">متوسط (Medium)</option>
            <option value="Low">کم (Low)</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">همه دسته‌بندی‌ها</option>
            <option value="KEYWORD_GAP">شکاف کلمات کلیدی</option>
            <option value="CONTENT_GAP">شکاف محتوایی</option>
            <option value="CANNIBALIZATION">کانیبالیزیشن</option>
            <option value="CONTENT_DECAY">زوال محتوا</option>
            <option value="INTERNAL_LINKING">لینک‌سازی داخلی</option>
            <option value="TECHNICAL">سئو تکنیکال</option>
          </select>
        </div>
      </div>

      {/* Task Cards List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-sm font-bold text-slate-200">تسکی با این فیلتر یافت نشد</h3>
            <p className="text-xs text-slate-500 mt-1">همه تسک‌های این بخش انجام شده‌اند یا فیلتر را تغییر دهید.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isCompleted = task.status === 'COMPLETED';
            const isInProgress = task.status === 'IN_PROGRESS';

            return (
              <div
                key={task.id}
                className={`bg-slate-900/60 border rounded-2xl p-5 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-emerald-950/60 bg-emerald-950/10 opacity-75'
                    : isInProgress
                    ? 'border-amber-500/30 bg-slate-900/90 shadow-md shadow-amber-950/10'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {getCategoryLabel(task.category)}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      ثبت: {new Date(task.createdAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold leading-snug ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                    {task.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-slate-950/60 rounded-lg px-3 py-1.5 border border-slate-800/80 text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="font-semibold text-slate-300">پیامد سئو:</span>
                      <span className="truncate">{task.estimatedImpact}</span>
                    </div>

                    <div className="bg-slate-950/60 rounded-lg px-3 py-1.5 border border-slate-800/80 text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span className="font-semibold text-slate-300">اقدام پیشنهادی:</span>
                      <span className="truncate">{task.suggestedAction}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center">
                  {/* Convert to 50-col Content Plan Row button */}
                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={() => handleCreateContentFromTask(task)}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="افزودن مستقیم به جدول محتوا با ۵۰ فیلد"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      تبدیل به محتوا
                    </button>
                  )}

                  {/* Status Toggle Buttons */}
                  <select
                    value={task.status}
                    onChange={e => updateTaskStatus(task.id, e.target.value as any)}
                    className={`text-xs font-bold rounded-xl px-3 py-1.5 border focus:outline-none cursor-pointer ${
                      task.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : task.status === 'IN_PROGRESS'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    <option value="TODO">در انتظار (Todo)</option>
                    <option value="IN_PROGRESS">در حال انجام (In Progress)</option>
                    <option value="COMPLETED">تکمیل شد (Completed)</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Custom Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                تعریف تسک جدید برای تیم سئو و محتوا
              </h3>
              <button
                type="button"
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان تسک:</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="مثال: پوشش کلاستر میلگرد ظفر بناب و جدول وزن سایزهای ۱۲ تا ۲۲"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">دسته‌بندی:</label>
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="CONTENT_GAP">شکاف محتوایی</option>
                    <option value="KEYWORD_GAP">شکاف کلمه کلیدی</option>
                    <option value="CANNIBALIZATION">رفع کانیبالیزیشن</option>
                    <option value="CONTENT_DECAY">به‌روزرسانی زوال محتوا</option>
                    <option value="INTERNAL_LINKING">لینک‌سازی داخلی</option>
                    <option value="TECHNICAL">سئو تکنیکال</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">اولویت اقدام:</label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Critical">بحرانی (Critical)</option>
                    <option value="High">بالا (High)</option>
                    <option value="Medium">متوسط (Medium)</option>
                    <option value="Low">عادی (Low)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">پیامد و ارزش تخمینی سئو:</label>
                <input
                  type="text"
                  value={newTaskImpact}
                  onChange={e => setNewTaskImpact(e.target.value)}
                  placeholder="مثال: رشد ۳۵٪ ایمپرشن و جذب ترافیک خریداران میلگرد بناب"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">اقدام پیشنهادی اجرایی:</label>
                <input
                  type="text"
                  value={newTaskAction}
                  onChange={e => setNewTaskAction(e.target.value)}
                  placeholder="مثال: تولید راهنمای خرید و اتصال به لندینگ قیمت میلگرد بناب"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  ذخیره تسک
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
