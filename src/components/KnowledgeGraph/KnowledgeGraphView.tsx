import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Network,
  Search,
  Building2,
  BookOpen,
  FileCheck,
  Tag,
  Copy,
  Plus,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { STEEL_INDUSTRY_ENTITIES } from '../../data/industryKnowledgeBase';
import { IndustryEntityItem } from '../../types';

export const KnowledgeGraphView: React.FC = () => {
  const {
    knowledgeGraphEntities,
    addContentPlanRow,
    showNotification
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEntity, setSelectedEntity] = useState<IndustryEntityItem | null>(null);

  const categories = [
    { id: 'ALL', label: 'همه نهادها' },
    { id: 'Manufacturer', label: 'کارخانجات و تولیدکنندگان برتر' },
    { id: 'Standard', label: 'استانداردها و مراجع فنی' },
    { id: 'Product', label: 'مقاطع و گریدهای فولادی' },
    { id: 'Formula', label: 'فرمول‌ها و جداول محاسباتی' }
  ];

  const filteredEntities = useMemo(() => {
    return knowledgeGraphEntities.filter(item => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.nameFa.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchKws = item.keywords.some(k => k.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchKws) return false;
      }
      return true;
    });
  }, [knowledgeGraphEntities, selectedCategory, searchQuery]);

  const handleCopyEntityContext = (item: IndustryEntityItem) => {
    const text = `نهاد فولادی: ${item.nameFa} (${item.nameEn})
دسته‌بندی: ${item.category}
کلمات کلیدی مرتبط: ${item.keywords.join('، ')}
توضیحات و مشخصات فنی: ${item.description}
ویژگی‌های کلیدی: ${JSON.stringify(item.properties, null, 2)}`;

    navigator.clipboard.writeText(text);
    showNotification(`اطلاعات نهاد «${item.nameFa}» کپی شد.`, 'success');
  };

  const handleCreateContentForEntity = (item: IndustryEntityItem) => {
    let title = '';
    if (item.category === 'Manufacturer') {
      title = `راهنمای جامع خرید محصولات ${item.nameFa} و جدول وزن و علائم اختصاری`;
    } else if (item.category === 'Standard') {
      title = `تحلیل تخصصی ${item.nameFa} در ساخت‌وساز و جدول اشتال مهندسی`;
    } else {
      title = `بررسی مشخصات فنی و فرمول محاسبه قیمت ${item.nameFa}`;
    }

    addContentPlanRow(title);
    showNotification(`محتوای «${title}» به جدول محتوا افزوده شد.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn" id="knowledge-graph-container">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-md shadow-indigo-500/10">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">پایگاه دانش و گراف موجودیت‌های صنعت فولاد ایران</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مجموعه غنی از کارخانجات (اصفهان، نیشابور، بناب)، استانداردها (ISIRI 3132)، فرمول‌های اشتال و گریدهای متالورژی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-slate-950 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl">
            {knowledgeGraphEntities.length} موجودیت تاییدشده
          </span>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="جستجو در کارخانه، استاندارد، گرید فولادی یا علامت اختصاری..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Entities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntities.map(item => {
          return (
            <div
              key={item.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-slate-700 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {item.category === 'Manufacturer'
                      ? 'کارخانه'
                      : item.category === 'Standard'
                      ? 'استاندارد مرجع'
                      : item.category === 'Formula'
                      ? 'فرمول اشتال'
                      : 'گرید محصول'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">{item.nameEn}</span>
                </div>

                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                    {item.nameFa}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Key Properties Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.keywords.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800/80 px-2 py-0.5 rounded-lg font-mono"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleCreateContentForEntity(item)}
                  className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ساخت محتوا
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyEntityContext(item)}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800"
                  title="کپی مشخصات برای استفاده در پرامپت"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
