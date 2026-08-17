import { PresetTemplate } from '../types';

export interface WizardStepDef {
  stepNumber: number;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  category: string;
}

export const WIZARD_STEPS: WizardStepDef[] = [
  { stepNumber: 1, titleFa: 'هویت و دانش برند', titleEn: 'Brand Identity', descriptionFa: 'مشخصات برند، لحن، محصولات و خطوط قرمز', category: 'Brand' },
  { stepNumber: 2, titleFa: 'پروفایل وبسایت و مخزن لینک‌ها', titleEn: 'Website & URLs', descriptionFa: 'دامنه، معماری سایت و لینک‌های موجود', category: 'Website' },
  { stepNumber: 3, titleFa: 'اطلاعات محتوا و مخاطب', titleEn: 'Content & Audience', descriptionFa: 'عنوان، موضوع، نوع محتوا و پرسونای هدف', category: 'Content' },
  { stepNumber: 4, titleFa: 'قصد جستجو و فانل', titleEn: 'Search Intent', descriptionFa: 'قصد جستجو، مرحله فانل و صورت‌مسئله کاربر', category: 'Intent' },
  { stepNumber: 5, titleFa: 'ماتریس استراتژی کلمات کلیدی', titleEn: 'Keyword Strategy', descriptionFa: 'کلمات اصلی، فرعی، لانگ‌تیل، LSI و انتیتی', category: 'Keywords' },
  { stepNumber: 6, titleFa: 'هوش نتایج و رقبا (SERP)', titleEn: 'SERP & Competitors', descriptionFa: 'فیچرهای سرپ، رتبه صفر و آنالیز رقبا', category: 'SERP' },
  { stepNumber: 7, titleFa: 'شکاف محتوا و اتوریتی', titleEn: 'Gaps & Topical Authority', descriptionFa: 'ارزش افزوده نو، کلاستر و هم‌نوع‌خواری', category: 'Strategy' },
  { stepNumber: 8, titleFa: 'لحن، سبک و معماری متن', titleEn: 'Tone, Style & Layout', descriptionFa: 'لحن، زاویه دید، طول متن و جدول‌بندی', category: 'Style' },
  { stepNumber: 9, titleFa: 'لینک‌سازی و المان‌های بصری', titleEn: 'Links & Visuals', descriptionFa: 'لینک داخلی، منابع خارجی و چندرسانه‌ای', category: 'Links' },
  { stepNumber: 10, titleFa: 'اسکیما، EEAT و هوش مصنوعی', titleEn: 'Schema, EEAT & GEO', descriptionFa: 'داده‌های ساختاریافته، اعتبار نویسنده و GEO', category: 'Schema' },
  { stepNumber: 11, titleFa: 'بهینه‌سازی CTR و فراخوان CTA', titleEn: 'CTR, CTA & Advanced', descriptionFa: 'متاتایتل، اسلاگ، CTA و لوکال سئو', category: 'Advanced' },
  { stepNumber: 12, titleFa: 'کامپایل پرامپت مستر سئو', titleEn: 'Compile Master Prompt', descriptionFa: 'گزارش کیفی و تولید پرامپت نهایی', category: 'Compile' }
];

export const SEO_PRESETS = [
  {
    id: 'preset-steel-purchase-guide',
    name: 'راهنمای جامع خرید میلگرد و تیرآهن (آهن اینجا)',
    description: 'استراتژی پیلار برای تولید محتوای فوق‌تخصصی متالورژی، جدول محاسبه وزن میلگرد، استعلام قیمت روز آهن اینجا و گواهی آنالیز کیفیت.',
    category: 'صنعتی و مهندسی',
    articleLength: '۳,۰۰۰ کلمه',
    contentType: 'مقاله وبسایت' as const,
    intent: 'Informational' as const
  },
  {
    id: 'preset-steel-market-analysis',
    name: 'تحلیل نوسانات بازار آهن و پیش‌بینی قیمت هفتگی (Market Intelligence)',
    description: 'تحلیل بنیادی و تکنیکال قیمت شمش، بورس کالا، نرخ ارز و نمودار تقاضای مقاطع فولادی در انبار آهن اینجا.',
    category: 'تحلیلی و خبری',
    articleLength: '۲,۲۰۰ کلمه',
    contentType: 'مقاله وبسایت' as const,
    intent: 'Informational' as const
  },
  {
    id: 'preset-advertorial-pr',
    name: 'رپورتاژ آگهی و برندینگ «آهن اینجا» در خبرگزاری‌های معتبر (PR)',
    description: 'قالب اختصاصی رپورتاژ با حفظ لحن ژورنالیستی و بی‌طرفانه جهت لینک‌سازی طبیعی به صفحات قیمت روز آهن اینجا.',
    category: 'رپورتاژ و روابط عمومی',
    articleLength: '۱,۵۰۰ کلمه',
    contentType: 'رپورتاژ تبلیغاتی' as const,
    intent: 'Commercial' as const
  },
  {
    id: 'preset-steel-sheet-guide',
    name: 'راهنمای خرید انواع ورق سیاه، روغنی و گالوانیزه (Industrial Sheets)',
    description: 'بررسی مشخصات فنی ورق ST37 و ST52 فولاد مبارکه و اکسین، فرمول محاسبه وزن شیت و برشکاری در آهن اینجا.',
    category: 'صنعتی و مهندسی',
    articleLength: '۲,۸۰۰ کلمه',
    contentType: 'مقاله وبسایت' as const,
    intent: 'Transactional' as const
  },
  {
    id: 'preset-best-businesses-listicle',
    name: 'معرفی برترین کارخانجات تولید میلگرد در ایران (Listicle & Comparison)',
    description: 'رتبه‌بندی مقایسه‌ای ذوب آهن اصفهان، ظفر بناب، فولاد نیشابور و کویر کاشان بر اساس کیفیت و وزن استاندارد اشتال.',
    category: 'لیستیکل و مقایسه',
    articleLength: '۳,۲۰۰ کلمه',
    contentType: 'معرفی بهترین مشاغل' as const,
    intent: 'Comparison' as const
  }
];

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'preset-steel-purchase-guide',
    name: 'راهنمای جامع خرید میلگرد و تیرآهن (آهن اینجا)',
    description: 'استراتژی پیلار برای تولید محتوای فوق‌تخصصی متالورژی، جدول محاسبه وزن میلگرد، استعلام قیمت روز و گواهی آنالیز کیفیت.',
    category: 'صنعتی و مهندسی',
    articleLength: '۳,۰۰۰ کلمه',
    contentType: 'مقاله وبسایت',
    intent: 'Informational',
    defaults: {
      topic: 'راهنمای خرید میلگرد و تیرآهن به همراه فرمول محاسبه وزن و استعلام قیمت روز از آهن اینجا',
      articleTitle: 'راهنمای جامع خرید میلگرد و تیرآهن از آهن اینجا؛ نکات طلایی پیش از ثبت سفارش در بازار آهن',
      contentType: 'مقاله وبسایت',
      primaryKeyword: 'راهنمای خرید میلگرد',
      searchIntent: {
        intent: 'Informational',
        funnelStage: 'MOFU (بررسی و ارزیابی)',
        userPainPoint: 'عدم اطمینان خریدار از استاندارد وزن کارخانه‌ها (اصفهان، ظفر بناب و نیشابور) و نحوه محاسبه هزینه نهایی باربری و استعلام بدون واسطه',
        primaryQuestion: 'چگونه بهترین میلگرد را متناسب با اسکلت ساختمان با کمترین قیمت و فاکتور رسمی از آهن اینجا تهیه کنیم؟',
        expectedOutcome: 'کاربر بتواند وزن هر شاخه را محاسبه کرده و فاکتور رسمی با برگه آنالیز سرتیفیکیت از آهن اینجا درخواست کند.'
      },
      keywords: {
        primaryKeyword: 'راهنمای خرید میلگرد',
        targetDensity: '1.8% - 2.2%',
        secondaryKeywords: ['جدول وزن میلگرد تمام سایزها', 'تفاوت میلگرد A3 و A2', 'استعلام قیمت روز میلگرد آهن اینجا', 'خرید مستقیم میلگرد از کارخانه'],
        longTailKeywords: ['نکات مهم پیش از خرید میلگرد اصفهان و بناب', 'چگونه میلگرد تقلبی را از اصل تشخیص دهیم؟', 'نحوه محاسبه کرایه بار تریلی میلگرد'],
        lsiKeywords: ['استاندارد ملی ۳۱۳۲', 'آلیاژ فولادی St37', 'تنش تسلیم', 'برگه آنالیز شیمیایی', 'بندیل و شاخه'],
        entities: ['ذوب آهن اصفهان', 'استاندارد ISIRI 3132', 'میلگرد آج ۴۰۰', 'نبشی و ناودانی'],
        negativeKeywords: ['میلگرد بستر ارزان دیوار', 'ضایعات آهن قراضه']
      },
      styleAndTone: {
        tone: 'Authoritative',
        pov: 'Second Person (شما)',
        readingLevel: 'تخصصی و کارشناسی',
        articleLength: '۲,۸۰۰ - ۳,۵۰۰ کلمه',
        useHumor: false,
        introHookStyle: 'Direct Problem Statement',
        structureTemplates: {
          requireFAQ: true,
          requireSummaryBox: true,
          requireComparisonTable: true,
          requireChecklist: true,
          requireKeyTakeaways: true
        }
      }
    }
  },
  {
    id: 'preset-advertorial-pr',
    name: 'رپورتاژ آگهی و برندینگ «آهن اینجا» در خبرگزاری‌های معتبر (PR)',
    description: 'قالب اختصاصی رپورتاژ تبلیغاتی با حفظ لحن ژورنالیستی و بی‌طرفانه جهت لینک‌سازی طبیعی به وبسایت آهن اینجا.',
    category: 'رپورتاژ و روابط عمومی',
    articleLength: '۱,۵۰۰ کلمه',
    contentType: 'رپورتاژ تبلیغاتی',
    intent: 'Commercial',
    defaults: {
      topic: 'معرفی دستاوردهای نوین سامانه «آهن اینجا» و نقش آن در شفافیت قیمت‌گذاری و حذف واسطه‌های بازار آهن',
      articleTitle: 'تحولی نو در بازار آهن و فولاد کشور؛ چگونه سامانه «آهن اینجا» هزینه پروژه‌های عمرانی را بهینه‌سازی کرد؟',
      contentType: 'رپورتاژ تبلیغاتی',
      primaryKeyword: 'استعلام قیمت آهن اینجا',
      searchIntent: {
        intent: 'Commercial',
        funnelStage: 'MOFU (بررسی و ارزیابی)',
        userPainPoint: 'نیاز پیمانکاران به سامانه‌ای معتبر برای استعلام شفاف قیمت درب کارخانه و خرید اعتباری با ضمانت‌نامه بانکی',
        primaryQuestion: 'کدام پلتفرم فولادی تضمین وزن باسکول، برگه آنالیز و ارسال فوری به تمام نقاط کشور را ارائه می‌دهد؟',
        expectedOutcome: 'آشنایی معتمدانه با پلتفرم آهن اینجا و کلیک روی لینک‌های صفحات قیمت میلگرد و تیرآهن.'
      }
    }
  }
];
