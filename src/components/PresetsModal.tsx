import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../i18n/translations';
import { PRESET_TEMPLATES } from '../data/presets';
import {
  X,
  Sparkles,
  Check,
  Layers,
  FileText,
  Clock,
  Compass,
  ArrowLeft
} from 'lucide-react';

export const PresetsModal: React.FC = () => {
  const {
    isPresetsModalOpen,
    setPresetsModalOpen,
    applyPreset,
    setActiveView,
    setActiveStep,
    showNotification,
    language
  } = useAppStore();

  if (!isPresetsModalOpen) return null;

  const handleSelectPreset = (presetId: string) => {
    applyPreset(presetId);
    setPresetsModalOpen(false);
    setActiveView('wizard');
    setActiveStep(1);
    showNotification('الگوی استراتژی سئو با موفقیت روی پروژه اعمال شد!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" id="presets-modal">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">الگوهای استراتژیک آماده سئو (SEO Strategy Blueprints)</h3>
          </div>

          <button
            type="button"
            onClick={() => setPresetsModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESET_TEMPLATES.map((preset) => (
            <div
              key={preset.id}
              className="bg-slate-950/60 border border-slate-800 hover:border-indigo-500/60 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all hover:bg-slate-950/90 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                    {preset.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {preset.articleLength}
                  </span>
                </div>

                <h4 className="text-xs font-black text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {preset.name}
                </h4>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {preset.contentType}
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                    {preset.intent}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  اعمال الگو
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
