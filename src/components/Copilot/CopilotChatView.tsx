import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  Plus,
  ArrowRight,
  TrendingUp,
  Flame,
  ShieldCheck,
  Building2,
  Table,
  BarChart3,
  HelpCircle,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { askSEOCopilot, CopilotMessage } from '../../engine/copilotEngine';
import { calculateSEOHealthScore } from '../../engine/seoOpportunityEngine';

export const CopilotChatView: React.FC = () => {
  const {
    currentBrand,
    contentPlan,
    gscSummary,
    ga4Summary,
    seoTasks,
    addContentPlanRow,
    setActiveView,
    showNotification
  } = useAppStore();

  const healthScore = calculateSEOHealthScore(gscSummary, ga4Summary, contentPlan);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `سلام! من **دستیار هوشمند سئو و محتوای آهن اینجا (AhanInja AI Copilot)** هستم.
من با تسلط کامل بر پایگاه دانش متالورژی ایران (استاندارد ملی ۳۱۳۲، جدول اشتال، کارخانجات برتر مانند ذوب آهن، فولاد مبارکه و نیشابور) و همگام با دیتای سرچ کنسول آماده‌ام تا در موارد زیر به شما کمک کنم:

• **پیشنهاد و تدوین کلاسترهای جدید محتوا** برای میلگرد، تیرآهن، ورق و پروفیل
• **شناسایی و رفع هم‌پوشانی (Cannibalization)** بین صفحات قیمت و بلاگ
• **تدوین استراتژی کلمات با ایمپرشن بالا و کلیک کم (Striking Distance)**
• **استراتژی پیشرفته لینک‌سازی داخلی** و بهینه‌سازی تجربه کاربر و تبدیل (CRO)`,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
      suggestedActions: [
        { label: '💡 تحلیل کلاستر مقاطع فولادی', actionType: 'ANALYZE_CLUSTER' },
        { label: '📈 بهینه‌سازی کلمات جایگاه ۵ تا ۱۰', actionType: 'SHOW_STRIKING_DISTANCE' },
        { label: '🔗 رفع کانیبالیزیشن قیمت میلگرد', actionType: 'GOTO_CANNIBALIZATION' },
        { label: '➕ افزودن ۵ مقاله ضروری به جدول', actionType: 'ADD_PRESET_CLUSTER' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('fa-IR')
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    try {
      const assistantReply = await askSEOCopilot(textToSend, messages, {
        brand: currentBrand,
        contentPlan,
        healthScore,
        tasks: seoTasks
      });
      setMessages(prev => [...prev, assistantReply]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'متاسفانه در برقراری ارتباط خطایی رخ داد. لطفاً مجدداً تلاش کنید.',
          timestamp: new Date().toLocaleTimeString('fa-IR')
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: { label: string; actionType: string; payload?: any }) => {
    if (action.actionType === 'ADD_PRESET_CLUSTER') {
      const sampleTitles = [
        'راهنمای جامع خرید میلگرد ذوب آهن اصفهان و تشخیص علامت ESCO',
        'جدول کامل وزن میلگرد ظفر بناب و مقایسه با استاندارد اشتال',
        'تفاوت میلگرد A3 و A4 در سازه‌های بلندمرتبه و برج‌ها',
        'راهنمای خرید ورق سیاه ST52 اکسین اهواز و کاربرد صنعتی',
        'فرمول آنلاین محاسبه ظرفیت بارگیری میلگرد در تریلی و کفی'
      ];
      sampleTitles.forEach(t => addContentPlanRow(t));
      showNotification('۵ محتوای کلاستر فولادی با ۵۰ ستون کامل به جدول محتوا افزوده شدند.', 'success');
      setMessages(prev => [
        ...prev,
        {
          id: 'action-res-' + Date.now(),
          sender: 'assistant',
          text: `✅ ۵ ردیف محتوای تخصصی با ۵۰ ستون هوشمند تولید و به **جدول جامع محتوا** اضافه شدند. می‌توانید آن‌ها را مشاهده و با یک کلیک به پرامپت تبدیل نمایید.`,
          timestamp: new Date().toLocaleTimeString('fa-IR')
        }
      ]);
    } else if (action.actionType === 'GOTO_TASKS') {
      setActiveView('task-center');
    } else if (action.actionType === 'GOTO_CANNIBALIZATION') {
      setActiveView('seo-dashboard');
    } else if (action.actionType === 'ANALYZE_CLUSTER') {
      handleSendMessage('یک تحلیل عمیق از اولویت‌های کلاستر میلگرد و تیرآهن برای آهن اینجا ارائه بده.');
    } else if (action.actionType === 'SHOW_STRIKING_DISTANCE') {
      handleSendMessage('کلمات کلیدی در رتبه ۵ تا ۱۰ سرچ کنسول را چطور به رتبه ۱ تا ۳ برسانم؟');
    }
  };

  const quickPrompts = [
    'چطور کلاستر میلگرد اصفهان و بناب را پوشش دهم؟',
    'استراتژی حل کانیبالیزیشن کلمه «قیمت روز میلگرد»',
    'چک‌لیست تولید محتوای تخصصی ورق سیاه ST37',
    'فرمول بهینه‌سازی تگ تایتل و افزایش نرخ کلیک (CTR)'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-fadeIn" id="copilot-chat-container">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-500 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">دستیار تخصصی هوش مصنوعی سئو آهن اینجا</h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                Active Context
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              متصل به پایگاه داده ۵۰ ستونی، متالورژی فولاد و الگوریتم‌های رتبه‌بندی گوگل ۲۰۲۵
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveView('content-plan')}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl font-bold flex items-center gap-1.5 transition-all"
          >
            <Table className="w-3.5 h-3.5 text-amber-400" />
            مشاهده جدول ۵۰ ستونی
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[580px]">
        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map(msg => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                )}

                <div className={`max-w-2xl space-y-2.5 ${isAssistant ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-slate-950 border border-slate-800 text-slate-200 shadow-md whitespace-pre-line'
                        : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-medium'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Assistant Interactive Actions */}
                  {isAssistant && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="px-3 py-1 bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 font-mono block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {!isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-1 text-indigo-300 font-bold text-xs">
                    شما
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-amber-400 animate-spin" />
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                در حال تحلیل داده‌های متالورژی و سرچ کنسول آهن اینجا...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center overflow-x-auto no-scrollbar gap-1.5">
          <span className="text-[11px] text-slate-400 whitespace-nowrap pl-1">پرسش‌های سریع:</span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="سؤال یا درخواست سئو خود را مطرح کنید (مثال: چطور ترافیک میلگرد اصفهان را ۲ برابر کنم؟)..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 rounded-2xl shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
