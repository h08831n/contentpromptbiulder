import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { ContentPlanView } from './components/ContentPlanMatrix/ContentPlanView';
import { SEODashboardView } from './components/SEODashboard/SEODashboardView';
import { ForensicAuditView } from './components/AuditSuite/ForensicAuditView';
import { TaskCenterView } from './components/TaskCenter/TaskCenterView';
import { Wizard } from './components/Wizard';
import { RoadmapCalendarView } from './components/RoadmapCalendar/RoadmapCalendarView';
import { CopilotChatView } from './components/Copilot/CopilotChatView';
import { KnowledgeGraphView } from './components/KnowledgeGraph/KnowledgeGraphView';
import { IntegrationsView } from './components/Integrations/IntegrationsView';
import { RowDetailDrawer } from './components/ContentPlanMatrix/RowDetailDrawer';
import { ExcelImportModal } from './components/ContentPlanMatrix/ExcelImportModal';
import { SheetsSyncModal } from './components/ContentPlanMatrix/SheetsSyncModal';
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
      className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col font-sans"
    >
      {/* Top Main Navigation Header */}
      <Header />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className={`border shadow-2xl px-4 py-3 rounded-2xl flex items-center gap-3 text-xs text-white ${
            notification.type === 'error'
              ? 'bg-rose-950 border-rose-500/50 text-rose-200'
              : notification.type === 'success'
              ? 'bg-slate-900 border-emerald-500/50 text-emerald-200'
              : 'bg-slate-900 border-amber-500/50 text-amber-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{notification.message}</span>
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
        {activeView === 'content-plan' && <ContentPlanView />}
        {activeView === 'seo-dashboard' && <SEODashboardView />}
        {activeView === 'audit-suite' && <ForensicAuditView />}
        {activeView === 'task-center' && <TaskCenterView />}
        {activeView === 'wizard' && <Wizard />}
        {activeView === 'roadmap' && <RoadmapCalendarView />}
        {activeView === 'copilot' && <CopilotChatView />}
        {activeView === 'knowledge-graph' && <KnowledgeGraphView />}
        {activeView === 'integrations' && <IntegrationsView />}
      </main>

      {/* Slide-out Drawers and Floating Modals */}
      <RowDetailDrawer />
      <ExcelImportModal />
      <SheetsSyncModal />
      <PromptPreviewModal />
      <BrandModal />
      <PresetsModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-[11px] text-slate-500 font-mono">
        AhanInja SEO Content Intelligence & Matrix Platform • Google AI Studio • v4.0 Matrix
      </footer>
    </div>
  );
}
