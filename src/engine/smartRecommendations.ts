import { SEOProject, SmartRecommendation } from '../types';

export function getSmartRecommendations(project: SEOProject): SmartRecommendation[] {
  const recommendations: SmartRecommendation[] = [];

  // Recommendation 1: Transactional / Commercial Intent CTA Optimization
  if (project.searchIntent.intent === 'Commercial' || project.searchIntent.intent === 'Transactional') {
    if (project.ctrAndCTA.ctaType !== 'Purchase' && project.ctrAndCTA.ctaType !== 'Contact / Phone Call') {
      recommendations.push({
        id: 'rec-cta-commercial',
        title: 'تنظیم فراخوان اقدام مستقیم (Direct CTA)',
        description: 'با توجه به اینکه قصد جستجو تجاری/خرید است، توصیه می‌شود نوع CTA را روی "استعلام قیمت" یا "تماس مستقیم با واحد فروش" تنظیم کنید.',
        impact: 'High',
        category: 'Conversion'
      });
    }
  }

  // Recommendation 2: Zero-Click & Featured Snippet Strategy
  if (project.searchIntent.intent === 'Informational' && !project.serp.targetZeroClick) {
    recommendations.push({
      id: 'rec-zero-click',
      title: 'فعال‌سازی شکار رتبه صفر (Featured Snippet)',
      description: 'در مقالات اطلاعاتی، اضافه کردن یک پاسخ مستقیم ۴۰ تا ۶۰ کلمه‌ای در ابتدای متن شانس برنده شدن پاسخ برجسته گوگل را دوچندان می‌کند.',
      impact: 'High',
      category: 'SERP'
    });
  }

  // Recommendation 3: Comparison Table for High-Value Industrial/Commercial Queries
  if (project.contentType === 'مقاله وبسایت' || project.contentType === 'محصول فروشگاهی' || project.contentType === 'معرفی بهترین مشاغل') {
    if (!project.styleAndTone.structureTemplates.requireComparisonTable) {
      recommendations.push({
        id: 'rec-table',
        title: 'الزام جدول مقایسه‌ای مارک‌داون',
        description: 'موتورهای جستجو به مقالاتی که مشخصات، وزن، قیمت و تفاوت‌ها را در قالب جدول ساختاریافته ارائه می‌دهند اتوریتی بالاتری اختصاص می‌دهند.',
        impact: 'Medium',
        category: 'Layout'
      });
    }
  }

  // Recommendation 4: GEO & AI Search Overviews
  if (!project.schemaAndEEAT.geoOptimizedForAI) {
    recommendations.push({
      id: 'rec-geo-ai',
      title: 'بهینه‌سازی برای موتورهای هوش مصنوعی (GEO)',
      description: 'فعال‌سازی بهینه‌سازی GEO باعث می‌شود ساختار پاسخ‌ها به نحوی چیده شود که توسط SearchGPT، Perplexity و Google AI Overviews به عنوان منبع نقل قول شود.',
      impact: 'High',
      category: 'AI SEO'
    });
  }

  // Recommendation 5: FAQ Page Schema for PAA
  if (project.serp.paaQuestions.length > 0 && !project.schemaAndEEAT.schemaTypes.includes('FAQPage')) {
    recommendations.push({
      id: 'rec-faq-schema',
      title: 'افزودن اسکیما FAQPage برای سوالات متداول',
      description: 'با اضافه کردن اسکیما FAQ، سوالات متداول کاربران در نتایج سرپ همراه با آکاردئون نمایش داده خواهد شد.',
      impact: 'Medium',
      category: 'Schema'
    });
  }

  // Recommendation 6: Anchor text diversity
  if (project.internalLinking.manualLinks.some(l => l.anchorStrategy === 'Exact Match') && project.internalLinking.manualLinks.length > 3) {
    recommendations.push({
      id: 'rec-anchor-diversity',
      title: 'تنوع‌بخشی به انکرتکست‌های لینک داخلی',
      description: 'استفاده صرف از Exact Match ممکن است الگوهای غیرطبیعی ایجاد کند؛ توصیه می‌شود از ترکیب Partial Match و LSI استفاده کنید.',
      impact: 'Medium',
      category: 'Linking'
    });
  }

  return recommendations;
}
