import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { Wizard } from './components/Wizard';
import { Dashboard } from './components/Dashboard';
import { PromptPreviewModal } from './components/PromptPreviewModal';
import { BrandModal } from './components/BrandModal';
import { PresetsModal } from './components/PresetsModal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const {
    activeView,
    language,
    notification,
    clearNotification
  } = useAppStore();

  const isRtl = language === 'fa' || language === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col font-sans"
    >
      {/* Top Main Navigation Header */}
      <Header />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className="bg-slate-900 border border-indigo-500/50 shadow-2xl px-4 py-3 rounded-2xl flex items-center gap-3 text-xs text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{notification}</span>
            <button
              type="button"
              onClick={clearNotification}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeView === 'wizard' && <Wizard />}
        {activeView === 'dashboard' && <Dashboard />}
      </main>

      {/* Modals */}
      <PromptPreviewModal />
      <BrandModal />
      <PresetsModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-[11px] text-slate-500 font-mono">
        SEO Content Intelligence Prompt Builder • Google AI Studio • Production Grade
      </footer>
    </div>
  );
}
