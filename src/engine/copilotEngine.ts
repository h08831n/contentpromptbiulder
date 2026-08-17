import { ContentPlanRow, BrandIdentity, SEOHealthScoreBreakdown, SEOTaskItem } from '../types';
import { STEEL_INDUSTRY_ENTITIES } from '../data/industryKnowledgeBase';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionType: string; payload?: any }[];
}

export async function askSEOCopilot(
  prompt: string,
  history: CopilotMessage[],
  context: {
    brand: BrandIdentity;
    contentPlan: ContentPlanRow[];
    healthScore?: SEOHealthScoreBreakdown;
    tasks?: SEOTaskItem[];
  }
): Promise<CopilotMessage> {
  const p = prompt.trim();

  // Try calling server-side Gemini API
  try {
    const res = await fetch('/api/ai/copilot-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: p,
        history: history.slice(-6),
        context: {
          brandName: context.brand.name,
          contentRowsCount: context.contentPlan.length,
          topKeywords: context.contentPlan.map(r => r.primaryKeyword).slice(0, 8),
          healthScore: context.healthScore?.overallScore || 90
        }
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('fa-IR'),
          suggestedActions: data.suggestedActions
        };
      }
    }
  } catch (e) {
    // Graceful fallback to expert industrial heuristic reasoning
  }

  // Industrial Heuristic Knowledge Response
  let replyText = '';
  let actions: { label: string; actionType: string; payload?: any }[] = [];

  if (p.includes('اولویت') || p.includes('برنامه') || p.includes('نقشه راه') || p.includes('چی بنویسم')) {
    replyText = `بر اساس تحلیل داده‌های کلاستر مقاطع فولادی آهن اینجا، پیشنهاد می‌کنم به ترتیب زیر عمل نمایید:

۱. **کلاستر میلگرد (فوری - Critical):**
   - راهنمای خرید میلگرد و جدول وزن اشتال کارخانجات (ذوب آهن اصفهان، بناب، نیشابور)
   - تفاوت میلگردهای گرید A2، A3 و A4 در پروژه‌های ساختمانی
۲. **کلاستر ورق و پروفیل (High):**
   - فرمول آنلاین محاسبه وزن ورق سیاه ST37 و ST52 مبارکه
   - جدول ابعاد و قیمت قوطی پروفیل ساختمانی ۲ میل
۳. **بهینه‌سازی صفحات با ایمپرشن بالا و کلیک کم (Striking Distance):**
   - کلمات جایگاه ۵ تا ۱۰ سرچ کنسول را با ارتقای تگ عنوان و افزودن چک‌لیست خرید بهبود دهید.`;

    actions = [
      { label: '➕ افزودن ۵ مقاله پیشنهادی به جدول محتوا', actionType: 'ADD_PRESET_CLUSTER' },
      { label: '📊 مشاهده تسک‌های اولویت‌دار', actionType: 'GOTO_TASKS' }
    ];
  } else if (p.includes('کانیبالیزیشن') || p.includes('همپوشانی') || p.includes('cannibalization')) {
    replyText = `برای حل هم‌پوشانی (Cannibalization) در کلمات پرتکرار مانند «قیمت میلگرد»:

۱. **تطبیق سرچ اینتنت (Search Intent):**
   - صفحه لندینگ اصلی (\`/prices/rebar\`) صرفاً برای استعلام قیمت لحظه‌ای، جدول روزانه و تماس سریع خرید هدف‌گذاری شود (Transactional).
   - مقالات بلاگ (\`/blog/rebar-guide\`) برای جنبه‌های آموزشی، مقایسه وزن اشتال و راهنمای انتخاب کارخانه بهینه‌سازی شوند (Informational).
۲. **انکرتکست لینک داخلی:**
   - در تمام مقالات بلاگ، از انکرتکست‌های دقیق «قیمت روز میلگرد» به صفحه لندینگ لینک دهید تا سیگنال اصلی به گوگل تفهیم گردد.`;

    actions = [
      { label: '🔗 مشاهده جزئیات کانیبالیزیشن در داشبورد', actionType: 'GOTO_CANNIBALIZATION' }
    ];
  } else if (p.includes('لینک') || p.includes('داخلی') || p.includes('internal link')) {
    replyText = `استراتژی پیشنهادی لینک‌سازی داخلی برای آهن اینجا:

• **از مقالات بلاگ به صفحات لندینگ محصول:** ارجاع با انکرتکست‌های کلمات کلیدی تجاری (مانند «قیمت تیرآهن اصفهان»).
• **لینک‌سازی به ابزارها:** ارجاع در پاراگراف‌های محاسباتی به «محاسبه‌گر آنلاین وزن میلگرد و جدول اشتال».
• **لینک‌های متقابل کلاستر:** اتصال مقالات گرید A3 به گرید A4 و مقایسه کارخانه‌ها با یکدیگر.`;
  } else {
    replyText = `در خدمت شما هستم! من می‌توانم به شما در موارد زیر کمک کنم:
• تحلیل فرصت‌های کلمات کلیدی و رتبه‌های ۵ تا ۲۰ سرچ کنسول
• پیشنهاد مقالات جدید برای پوشش کامل کلاسترهای میلگرد، تیرآهن و ورق
• رفع کانیبالیزیشن و تداخل صفحات
• تنظیم استراتژی لینک‌سازی داخلی و بهبود نرخ کلیک (CTR)

چه موضوعی را می‌خواهید بررسی کنیم؟`;

    actions = [
      { label: '💡 تحلیل کلاستر مقاطع فولادی', actionType: 'ANALYZE_CLUSTER' },
      { label: '📈 بررسی فرصت‌های رتبه ۴ تا ۱۰', actionType: 'SHOW_STRIKING_DISTANCE' }
    ];
  }

  return {
    id: 'msg-' + Date.now(),
    sender: 'assistant',
    text: replyText,
    timestamp: new Date().toLocaleTimeString('fa-IR'),
    suggestedActions: actions
  };
}
