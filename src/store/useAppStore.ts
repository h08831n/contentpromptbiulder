import { useState, useEffect } from 'react';
import {
  SEOProject,
  BrandIdentity,
  WebsiteProfile,
  CompiledPromptResult,
  LanguageCode,
  ContentPlanRow,
  GSCMetricsSummary,
  GA4MetricsSummary,
  KeywordGapItem,
  ContentGapItem,
  CannibalizationItem,
  ContentDecayItem,
  SEOTaskItem,
  IndustryEntityItem
} from '../types';
import { PRESET_TEMPLATES } from '../data/presets';
import { compileMasterSEOPrompt } from '../engine/promptCompiler';
import { generateAutoContentPlanRow } from '../engine/autoContentIntelligence';
import { STEEL_INDUSTRY_ENTITIES } from '../data/industryKnowledgeBase';
import {
  detectKeywordGaps,
  detectContentGaps,
  detectCannibalization,
  detectContentDecay,
  generateSEOTasks
} from '../engine/seoOpportunityEngine';
import { DEFAULT_SHEETS_CONFIG, GoogleSheetsConfig } from '../engine/sheetsEngine';

const STORAGE_KEY = 'seo_master_builder_store_v4_ahaninja_matrix';

const DEFAULT_BRAND: BrandIdentity = {
  id: 'brand-ahan-inja',
  name: 'آهن اینجا (AhanInja)',
  legalName: 'شرکت توسعه تجارت فولاد و آهن اینجا (سهامی خاص)',
  industry: 'Steel',
  website: 'https://ahaninja.com',
  brandVoice: 'Authoritative',
  businessDescription: 'سامانه جامع و تخصصی استعلام لحظه‌ای قیمت، تامین و توزیع بدون واسطه انواع مقاطع فولادی (میلگرد آجدار و کلاف، تیرآهن IPE و هاش سنگین، انواع ورق سیاه ST37/ST52، روغنی و گالوانیزه، قوطی و پروفیل، لوله مانیسمان و صنعتی، نبشی و ناودانی) با انبارهای مجهز در شادآباد تهران و اصفهان.',
  usp: 'استعلام مستقیم قیمت درب کارخانه بدون واسطه، ارائه سرتیفیکیت و برگه آنالیز شیمیایی و متالورژی آزمایشگاهی، تضمین باسکول و بارگیری فوری با صدور فاکتور رسمی مالیاتی و امکان خرید اعتباری (LC)',
  brandPositioning: 'دستیار هوشمند و مرجع معتمد تامین آهن‌آلات برای پیمانکاران، مهندسان عمران، انبوه‌سازان و صنایع تولیدی در سراسر کشور',
  productsServices: [
    'میلگرد آجدار A2, A3, A4 (اصفهان، نیشابور، بناب، میانه، فایکو)',
    'تیرآهن معمولی IPE، هاش سبک HEA، هاش سنگین HEB و زنبوری',
    'ورق سیاه ST37 و ST52 مبارکه و اکسین، ورق روغنی و گالوانیزه',
    'قوطی و پروفیل ساختمانی و صنعتی و زد (Z)',
    'لوله مانیسمان بدون درز رده ۴۰ و ۸۰، لوله داربستی و صنعتی',
    'نبشی بال مساوی و نامساوی و ناودانی سنگین UNP',
    'خدمات برشکاری CNC، رول به شیت، فرمینگ و گالوانیزاسیون'
  ],
  targetAudienceDefaults: 'مهندسین محاسب و ناظر عمران، پیمانکاران پروژه‌های ساختمانی و صنعتی، انبوه‌سازان، مدیران خرید کارخانجات و خریداران عمده و خرد بازار آهن در سراسر ایران',
  forbiddenClaims: ['ارزان‌ترین آهن جهان', 'تنها تولیدکننده بی‌رقیب خاورمیانه', 'تضمین سود قطعی سرمایه‌گذاری'],
  forbiddenTerms: ['جنس درجه سه و ضایعاتی', 'آهن قراضه ارزان', 'میلگرد بدون استاندارد', 'فروش غیررسمی بدون کد رهگیری'],
  preferredTerms: [
    { original: 'جنس بدون فاکتور', preferred: 'عرضه رسمی با فاکتور معتبر و ارزش افزوده قانونی' },
    { original: 'آهن ارزان بازار', preferred: 'خرید مستقیم از کارخانه با نرخ مصوب رقابتی' },
    { original: 'تخمین سرانگشتی وزن', preferred: 'محاسبه دقیق مهندسی بر اساس جدول اشتال' },
    { original: 'خرید چکی', preferred: 'فروش اعتباری با ضمانت‌نامه بانکی (LC)' }
  ],
  knowledgeBase: {
    expertise: 'بیش از ۲۰ سال تجربه میدانی در تامین پروژه‌های بزرگ ملی، آزمایشگاه متالورژی آزمون کشش و خمش میلگرد و تسلط کامل بر بورس کالای ایران',
    certifications: ['گواهینامه مدیریت کیفیت ISO 9001:2015', 'عضویت رسمی در اتحادیه آهن و فولاد', 'نماد اعتماد الکترونیکی ۵ ستاره کسب‌وکارهای دیجیتال'],
    editorialGuidelines: 'همیشه نام کارخانه‌ها را به صورت دقیق (مانند ذوب آهن اصفهان، فولاد مبارکه یا فولاد خراسان) بنویسید. تمامی اوزان باید بر اساس جدول اشتال استاندارد DIN و استاندارد ملی ۳۱۳۲ ایران ذکر شوند.'
  },
  createdAt: new Date().toISOString()
};

const DEFAULT_WEBSITE: WebsiteProfile = {
  id: 'web-ahan-inja',
  domain: 'ahaninja.com',
  siteName: 'آهن اینجا',
  niche: 'آهن، فولاد و متالورژی ساختمانی و صنعتی',
  defaultLanguage: 'fa',
  primaryTargetCountry: 'Iran',
  existingUrls: [
    { url: 'https://ahaninja.com/prices/rebar', title: 'قیمت روز میلگرد تمامی کارخانه‌ها', mainKeyword: 'قیمت روز میلگرد' },
    { url: 'https://ahaninja.com/prices/beam', title: 'قیمت روز تیرآهن IPE و هاش', mainKeyword: 'قیمت تیرآهن' },
    { url: 'https://ahaninja.com/prices/sheet', title: 'قیمت انواع ورق سیاه، روغنی و گالوانیزه', mainKeyword: 'قیمت ورق سیاه' },
    { url: 'https://ahaninja.com/prices/profile', title: 'قیمت قوطی و پروفیل ساختمانی', mainKeyword: 'قیمت قوطی پروفیل' },
    { url: 'https://ahaninja.com/tools/steel-weight-calculator', title: 'محاسبه‌گر آنلاین وزن میلگرد و جدول اشتال', mainKeyword: 'محاسبه وزن میلگرد' },
    { url: 'https://ahaninja.com/blog/rebar-buying-guide', title: 'راهنمای جامع خرید میلگرد و تیرآهن', mainKeyword: 'راهنمای خرید میلگرد' },
    { url: 'https://ahaninja.com/blog/steel-market-analysis', title: 'تحلیل هفتگی و پیش‌بینی روند بازار آهن', mainKeyword: 'تحلیل بازار آهن' }
  ],
  permalinkStructure: '/blog/%postname%/',
  hasSitemap: true
};

const DEFAULT_PROJECT: SEOProject = {
  id: 'proj-steel-rebar-guide',
  articleTitle: 'راهنمای جامع خرید میلگرد و تیرآهن از آهن اینجا؛ نکات طلایی پیش از ثبت سفارش در بازار آهن ۱۴۰۴',
  topic: 'راهنمای خرید میلگرد، جدول وزن استاندارد کارخانه‌ها، تفاوت گریدهای فولادی و نحوه استعلام قیمت بدون واسطه',
  brandId: 'brand-ahan-inja',
  websiteId: 'web-ahan-inja',
  contentType: 'مقاله وبسایت',
  contentGoal: 'Rank on Google (Organic Traffic)',
  primaryKeyword: 'راهنمای خرید میلگرد',
  searchIntent: {
    intent: 'Informational',
    funnelStage: 'MOFU (بررسی و ارزیابی)',
    userPainPoint: 'سردرگمی خریداران در تشخیص میلگرد استاندارد از نامرغوب، عدم آشنایی با وزن هر شاخه در کارخانه‌های مختلف و هزینه‌های پنهان باربری و باسکول',
    primaryQuestion: 'چگونه بهترین میلگرد را با وزن استاندارد، فاکتور رسمی و کمترین قیمت تمام‌شده از آهن اینجا تهیه کنیم؟',
    expectedOutcome: 'کاربر بتواند گرید A3 یا A4 مورد نیاز سازه خود را تعیین کرده، وزن هر شاخه را محاسبه کند و مستقیماً پیش‌فاکتور رسمی استعلام بگیرد.'
  },
  keywords: {
    primaryKeyword: 'راهنمای خرید میلگرد',
    targetDensity: '1.8% - 2.2%',
    secondaryKeywords: [
      'جدول وزن میلگرد تمام سایزها',
      'تفاوت میلگرد A2 و A3',
      'استعلام قیمت روز میلگرد آهن اینجا',
      'خرید مستقیم میلگرد از کارخانه',
      'روش تشخیص میلگرد اصل از تقلبی'
    ],
    longTailKeywords: [
      'نکات مهم پیش از خرید میلگرد اصفهان و ظفر بناب',
      'فرمول سریع محاسبه وزن هر شاخه میلگرد ۱۶ و ۱۴',
      'نحوه خرید میلگرد با پیش‌فاکتور رسمی برای شرکت‌های پیمانکاری'
    ],
    lsiKeywords: [
      'استاندارد ملی ISIRI 3132',
      'تنش تسلیم و مقاومت کششی میلگرد',
      'آج دوکی و یکنواخت',
      'بندیل میلگرد و ظرفیت تریلی',
      'برگه آنالیز آزمایشگاهی و سرتیفیکیت',
      'باسکول مبدا و مقصد'
    ],
    forbiddenKeywords: ['میلگرد قراضه و غیراستاندارد', 'خرید آهن بدون فاکتور معتبر', 'ارزان‌ترین میلگرد خاورمیانه']
  },
  contentStructure: {
    targetWordCount: 3000,
    readingTimeMinutes: 12,
    h1Title: 'راهنمای جامع خرید میلگرد و تیرآهن از آهن اینجا؛ تحلیل فنی و جدول وزن اشتال کارخانجات',
    headings: [
      { id: 'h2-1', level: 'H2', text: 'میلگرد چیست و چرا انتخاب گرید استاندارد برای اسکلت بتنی حیاتی است؟', intent: 'تعریف فنی و معرفی انواع گرید A2, A3, A4' },
      { id: 'h2-2', level: 'H2', text: 'جدول مقایسه وزن هر شاخه میلگرد کارخانجات برتر ایران با جدول اشتال مرجع', intent: 'ارائه جدول دقیق اشتال و مقایسه اصفهان، بناب، نیشابور و کاشان' },
      { id: 'h2-3', level: 'H2', text: 'فرمول سریع کارگاهی محاسبه وزن میلگرد (فرمول ۱۶۲) به زبان ساده', intent: 'آموزش فرمول D²/162 و ارائه مثال‌های کاربردی سایز ۱۴ و ۱۶' },
      { id: 'h2-4', level: 'H2', text: '۵ نکته کلیدی در تشخیص اصالت میلگرد و بررسی علائم اختصاری کارخانه‌ها', intent: 'معرفی مارک‌های ESCO, KSR, ZAFAR, KAVIR و پلاک بندیل' },
      { id: 'h2-5', level: 'H2', text: 'بررسی هزینه‌های جانبی: کرایه حمل تریلی، هزینه باسکول و ارزش افزوده', intent: 'شفاف‌سازی هزینه‌های باربری و راهنمای بهینه‌سازی مسافت بارگیری' },
      { id: 'h2-6', level: 'H2', text: 'مراحل گام‌به‌گام استعلام قیمت، صدور پیش‌فاکتور رسمی و خرید از آهن اینجا', intent: 'هدایت کاربر به قیف فروش و ثبت سفارش تلفنی یا آنلاین' },
      { id: 'h2-7', level: 'H2', text: 'سؤالات متداول خریداران و پیمانکاران در خرید مقاطع فولادی', intent: 'پاسخ به سوالات پرتکرار و رفع ابهامات فنی و مالیاتی' }
    ],
    faqs: [
      { id: 'faq-1', question: 'تفاوت میلگرد A2، A3 و A4 چیست و برای کدام بخش سازه استفاده می‌شوند؟', answer: 'میلگرد A2 با تنش تسلیم ۳۴۰ مگاپاسکال بیشتر برای خاموت‌ها و اتصالات استفاده می‌شود؛ در حالی که A3 با تنش تسلیم ۴۰۰ مگاپاسکال به عنوان آرماتور طولی تیر و ستون کاربرد دارد و نباید جوشکاری شود. میلگرد A4 با تنش ۵۰۰ مگاپاسکال مقاومت بالاتر با وزن بهینه‌تر ایجاد می‌کند.' },
      { id: 'faq-2', question: 'چگونه وزن بار میلگرد را قبل و بعد از تخلیه کنترل کنیم؟', answer: 'تمامی محموله‌های ارسالی از آهن اینجا همراه با برگه باسکول دیجیتال و سرتیفیکیت کارخانه ارسال شده و پس از توزین روی باسکول استاندارد تخلیه تطبیق داده می‌شوند.' },
      { id: 'faq-3', question: 'آیا خرید میلگرد از آهن اینجا شامل فاکتور رسمی ارزش افزوده می‌شود؟', answer: 'بله، تمامی معاملات در آهن اینجا با صدور فاکتور رسمی معتبر سامانه مودیان و احتساب ۱۰ درصد مالیات بر ارزش افزوده قانونی انجام می‌گیرد.' },
      { id: 'faq-4', question: 'حداقل سفارش برای ارسال مستقیم از درب کارخانه چقدر است؟', answer: 'برای ارسال مستقیم از کارخانه حداقل یک تریلی (حدود ۲۲ تا ۲۴ تن) نیاز است. برای مقادیر کمتر، بارگیری از نزدیک‌ترین انبار آهن اینجا در شادآباد تهران یا اصفهان انجام می‌شود.' }
    ]
  },
  linkingStrategy: {
    internalLinks: [
      { id: 'il-1', targetUrl: 'https://ahaninja.com/prices/rebar', anchorText: 'قیمت روز میلگرد', contextRequirement: 'در بخش استعلام آنلاین نرخ کارخانجات' },
      { id: 'il-2', targetUrl: 'https://ahaninja.com/tools/steel-weight-calculator', anchorText: 'محاسبه آنلاین وزن میلگرد و جدول اشتال', contextRequirement: 'در بخش فرمول محاسبه وزن شاخه' },
      { id: 'il-3', targetUrl: 'https://ahaninja.com/prices/beam', anchorText: 'قیمت روز تیرآهن و هاش', contextRequirement: 'در بخش مقایسه سازه اسکلت فلزی و بتنی' },
      { id: 'il-4', targetUrl: 'https://ahaninja.com/blog/steel-market-analysis', anchorText: 'تحلیل هفتگی بازار آهن', contextRequirement: 'در بخش زمان‌بندی مناسب خرید عمده' }
    ],
    externalLinks: [
      { id: 'el-1', targetUrl: 'http://standard.isiri.gov.ir', sourceName: 'سازمان ملی استاندارد ایران (استاندارد ۳۱۳۲)', citationContext: 'در بخش الزامات فنی استاندارد مقاومت کششی' },
      { id: 'el-2', targetUrl: 'https://inbr.ir', sourceName: 'دفتر مقررات ملی ساختمان (مبحث نهم)', citationContext: 'در بخش ضوابط طراحی سازه‌های بتن آرمه' }
    ]
  },
  aiImagePrompts: [
    {
      id: 'img-1',
      title: 'تصویر شاخص هدر مقاله (Featured Hero)',
      type: 'Hero Banner',
      promptEn: 'Cinematic ultra-realistic 8K photograph of modern industrial steel distribution warehouse in Tehran, stacked bundles of deformed construction rebar (Grade A3) with authentic steel mill blue tags, overhead yellow gantry crane, dramatic golden hour natural skylight rays shining through steel beam structure, high depth of field, architectural photography style, 16:9 ratio.',
      promptFa: 'نمای سینمایی از انبار مدرن توزیع میلگرد و بندیل‌های فولادی با نورپردازی طبیعی سوله و برچسب‌های مشخصات کارخانه',
      aspectRatio: '16:9',
      style: 'Photorealistic',
      negativePrompt: 'blurry, cartoon, 3d render, distorted, low quality, rust, broken rebar',
      altTextFa: 'نمای انبار مقاطع فولادی و بندیل‌های میلگرد استاندارد در بنگاه آهن اینجا',
      captionFa: 'انبار مرکزی تامین و بارگیری انواع میلگرد و مقاطع فولادی ساختمانی در آهن اینجا'
    }
  ],
  socialPrompts: {
    telegram: {
      enabled: true,
      channelName: 'کانال رسمی اطلاع‌رسانی قیمت آهن اینجا',
      tone: 'خبری، تحلیلی و فوری',
      includePriceAlert: true,
      customHashtags: ['#قیمت_میلگرد', '#بازار_آهن', '#آهن_اینجا', '#جدول_اشتال']
    },
    instagram: {
      enabled: true,
      postFormat: 'اسلایدری (Carousel)',
      visualHook: 'مقایسه تصویری وزن میلگرد اصفهان با استاندارد اشتال + فرمول محاسبه سریع در کارگاه',
      targetEngagement: 'سیو (Save) و اشتراک‌گذاری بین مهندسان پروژه'
    },
    linkedin: {
      enabled: true,
      angle: 'تحلیل مهندسی و مدیریت زنجیره تامین در پروژه‌های عمرانی',
      targetAudience: 'مدیران عامل شرکت‌های پیمانکاری، مهندسان مشاور و سرپرستان کارگاه'
    }
  },
  conversionSetup: {
    primaryCTA: {
      type: 'Contact / Phone Call',
      placement: 'End of Article + Sticky Floating Widget',
      headline: 'استعلام فوری قیمت امروز و دریافت پیش‌فاکتور رسمی از کارشناسان آهن اینجا',
      buttonText: 'دریافت مشاوره تخصصی و پیش‌فاکتور (۰۲۱-XXXXXXXX)',
      targetActionUrl: 'tel:02100000000'
    },
    secondaryCTA: {
      type: 'Price Inquiry',
      placement: 'After Stahl Weight Table',
      headline: 'می‌خواهید وزن بار پروژه خود را بر اساس جدول اشتال محاسبه کنید؟',
      buttonText: 'ورود به محاسبه‌گر آنلاین وزن آهن‌آلات',
      targetActionUrl: 'https://ahaninja.com/tools/steel-weight-calculator'
    },
    leadMagnetOffer: 'دانلود فایل PDF جدول کامل اشتال مهندسی و مشخصات میلگرد کارخانجات ایران'
  },
  eeatConfig: {
    authorName: 'مهندس محمدرضا سلیمانی',
    authorRole: 'کارشناس ارشد متالورژی و مشاور ارشد زنجیره تامین مقاطع ساختمانی در آهن اینجا',
    authorBio: 'با بیش از ۱۴ سال سابقه بازرسی کنترل کیفیت در کارخانجات ذوب آهن و مشاور تخصصی تامین آهن‌آلات بیش از ۵۰ پروژه انبوه‌سازی در کشور.',
    editorialReviewedBy: 'واحد کنترل کیفیت فنی و بازرگانی آهن اینجا',
    primaryFactSources: 'استاندارد ملی ۳۱۳۲ ایران، جدول اشتال مهندسی DIN و برگه‌های آنالیز متالوگرافی آزمایشگاه‌های همکار استاندارد',
    lastFactCheckedDate: new Date().toISOString().split('T')[0]
  },
  advancedTechnical: {
    metaTitle: 'راهنمای خرید میلگرد و تیرآهن | جدول وزن استاندارد و استعلام قیمت | آهن اینجا',
    metaDescription: 'راهنمای جامع خرید میلگرد و تیرآهن از آهن اینجا: بررسی مشخصات فنی کارخانجات برتر ایران، جدول دقیق وزن اشتال، نحوه محاسبه سریع و استعلام قیمت روز با فاکتور رسمی.',
    canonicalUrl: 'https://ahaninja.com/blog/rebar-buying-guide',
    targetLanguage: 'fa',
    readingLevel: 'Intermediate (متوسط)',
    schemaTypes: ['Article', 'FAQPage', 'HowTo', 'BreadcrumbList', 'Organization'],
    openGraphCard: {
      title: 'راهنمای جامع خرید میلگرد و تیرآهن؛ جدول وزن و استعلام قیمت',
      description: 'نکات طلایی خرید میلگرد استاندارد با صدور فاکتور رسمی از آهن اینجا',
      type: 'article'
    }
  },
  aiOptimization: {
    targetModel: 'Google Gemini 2.5 Pro / 3.7 Flash',
    outputFormat: 'Clean Markdown',
    temperature: 0.3,
    antiSlopStrictness: 'Maximum',
    enableEntitySalience: true,
    preventHallucinations: true,
    enforceCustomTables: true
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Initial 5 Curated Steel Content Plan Rows for AhanInja
const INITIAL_CONTENT_PLAN_ROWS: ContentPlanRow[] = [
  generateAutoContentPlanRow('راهنمای جامع خرید میلگرد برای ساختمان و اسکلت بتنی', DEFAULT_BRAND, DEFAULT_WEBSITE),
  generateAutoContentPlanRow('جدول وزن میلگرد کارخانجات ایران و فرمول محاسبه اشتال', DEFAULT_BRAND, DEFAULT_WEBSITE),
  generateAutoContentPlanRow('تفاوت ورق سیاه ST37 و ST52 مبارکه و اکسین اهواز', DEFAULT_BRAND, DEFAULT_WEBSITE),
  generateAutoContentPlanRow('راهنمای خرید تیرآهن IPE و تفاوت آن با هاش HEA و HEB', DEFAULT_BRAND, DEFAULT_WEBSITE),
  generateAutoContentPlanRow('نحوه تشخیص اصالت میلگرد و جدول علائم اختصاری کارخانه‌ها', DEFAULT_BRAND, DEFAULT_WEBSITE)
];

const INITIAL_KEYWORD_GAPS = detectKeywordGaps(INITIAL_CONTENT_PLAN_ROWS, false);
const INITIAL_CONTENT_GAPS = detectContentGaps();
const INITIAL_CANNIBALIZATIONS = detectCannibalization();
const INITIAL_DECAYS = detectContentDecay();
const INITIAL_TASKS = generateSEOTasks(
  INITIAL_KEYWORD_GAPS,
  INITIAL_CONTENT_GAPS,
  INITIAL_CANNIBALIZATIONS,
  INITIAL_DECAYS
);

export type AppView =
  | 'content-plan'
  | 'seo-dashboard'
  | 'audit-suite'
  | 'wizard'
  | 'task-center'
  | 'roadmap'
  | 'copilot'
  | 'knowledge-graph'
  | 'integrations';

export interface BulkQueueStatus {
  isProcessing: boolean;
  total: number;
  completed: number;
  processing: number;
  failed: number;
  pending: number;
}

interface AppState {
  projects: SEOProject[];
  currentProjectId: string;
  currentBrandId: string;
  currentWebsiteId: string;
  brands: BrandIdentity[];
  websites: WebsiteProfile[];
  contentPlan: ContentPlanRow[];
  activeContentRowId: string | null;
  gscSummary: GSCMetricsSummary;
  ga4Summary: GA4MetricsSummary;
  sheetsConfig: GoogleSheetsConfig;
  keywordGaps: KeywordGapItem[];
  contentGaps: ContentGapItem[];
  cannibalizations: CannibalizationItem[];
  contentDecays: ContentDecayItem[];
  seoTasks: SEOTaskItem[];
  knowledgeGraphEntities: IndustryEntityItem[];
  activeStep: number;
  activeView: AppView;
  language: LanguageCode;
  mode: 'production' | 'demo';
  bulkQueue: BulkQueueStatus;
  isPromptPreviewOpen: boolean;
  isBrandModalOpen: boolean;
  isPresetsModalOpen: boolean;
  isExcelImportModalOpen: boolean;
  isSheetsSyncModalOpen: boolean;
  isRowDetailDrawerOpen: boolean;
  generatedPromptResult: CompiledPromptResult | null;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const initialGSC: GSCMetricsSummary = {
  clicks: 48200,
  impressions: 1240000,
  ctr: 3.89,
  avgPosition: 9.4,
  clicksDiffPercent: 18.5,
  impressionsDiffPercent: 24.2,
  dateRange: '28d',
  isConnected: false,
  propertyUrl: 'https://ahaninja.com'
};

const initialGA4: GA4MetricsSummary = {
  organicUsers: 34200,
  sessions: 52100,
  engagementRate: 64.8,
  conversions: 840,
  conversionRate: 1.61,
  revenue: 0,
  dateRange: '28d',
  isConnected: false,
  propertyId: 'GA4-AHANINJA-PROD'
};

function loadInitialState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects || [DEFAULT_PROJECT],
        currentProjectId: parsed.currentProjectId || DEFAULT_PROJECT.id,
        currentBrandId: parsed.currentBrandId || DEFAULT_BRAND.id,
        currentWebsiteId: parsed.currentWebsiteId || DEFAULT_WEBSITE.id,
        brands: parsed.brands || [DEFAULT_BRAND],
        websites: parsed.websites || [DEFAULT_WEBSITE],
        contentPlan: parsed.contentPlan && parsed.contentPlan.length > 0 ? parsed.contentPlan : INITIAL_CONTENT_PLAN_ROWS,
        activeContentRowId: parsed.activeContentRowId || null,
        gscSummary: parsed.gscSummary || initialGSC,
        ga4Summary: parsed.ga4Summary || initialGA4,
        sheetsConfig: parsed.sheetsConfig || DEFAULT_SHEETS_CONFIG,
        keywordGaps: parsed.keywordGaps || INITIAL_KEYWORD_GAPS,
        contentGaps: parsed.contentGaps || INITIAL_CONTENT_GAPS,
        cannibalizations: parsed.cannibalizations || INITIAL_CANNIBALIZATIONS,
        contentDecays: parsed.contentDecays || INITIAL_DECAYS,
        seoTasks: parsed.seoTasks || INITIAL_TASKS,
        knowledgeGraphEntities: parsed.knowledgeGraphEntities || STEEL_INDUSTRY_ENTITIES,
        activeStep: parsed.activeStep || 1,
        activeView: parsed.activeView || 'content-plan',
        language: parsed.language || 'fa',
        mode: parsed.mode || 'production',
        bulkQueue: { isProcessing: false, total: 0, completed: 0, processing: 0, failed: 0, pending: 0 },
        isPromptPreviewOpen: false,
        isBrandModalOpen: false,
        isPresetsModalOpen: false,
        isExcelImportModalOpen: false,
        isSheetsSyncModalOpen: false,
        isRowDetailDrawerOpen: false,
        generatedPromptResult: null,
        notification: null
      };
    }
  } catch (err) {
    console.error('Error loading stored state:', err);
  }

  return {
    projects: [DEFAULT_PROJECT],
    currentProjectId: DEFAULT_PROJECT.id,
    currentBrandId: DEFAULT_BRAND.id,
    currentWebsiteId: DEFAULT_WEBSITE.id,
    brands: [DEFAULT_BRAND],
    websites: [DEFAULT_WEBSITE],
    contentPlan: INITIAL_CONTENT_PLAN_ROWS,
    activeContentRowId: null,
    gscSummary: initialGSC,
    ga4Summary: initialGA4,
    sheetsConfig: DEFAULT_SHEETS_CONFIG,
    keywordGaps: INITIAL_KEYWORD_GAPS,
    contentGaps: INITIAL_CONTENT_GAPS,
    cannibalizations: INITIAL_CANNIBALIZATIONS,
    contentDecays: INITIAL_DECAYS,
    seoTasks: INITIAL_TASKS,
    knowledgeGraphEntities: STEEL_INDUSTRY_ENTITIES,
    activeStep: 1,
    activeView: 'content-plan',
    language: 'fa',
    mode: 'production',
    bulkQueue: { isProcessing: false, total: 0, completed: 0, processing: 0, failed: 0, pending: 0 },
    isPromptPreviewOpen: false,
    isBrandModalOpen: false,
    isPresetsModalOpen: false,
    isExcelImportModalOpen: false,
    isSheetsSyncModalOpen: false,
    isRowDetailDrawerOpen: false,
    generatedPromptResult: null,
    notification: null
  };
}

let globalState: AppState = loadInitialState();
const listeners = new Set<() => void>();

function notify() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projects: globalState.projects,
        currentProjectId: globalState.currentProjectId,
        brands: globalState.brands,
        websites: globalState.websites,
        contentPlan: globalState.contentPlan,
        activeContentRowId: globalState.activeContentRowId,
        gscSummary: globalState.gscSummary,
        ga4Summary: globalState.ga4Summary,
        sheetsConfig: globalState.sheetsConfig,
        keywordGaps: globalState.keywordGaps,
        contentGaps: globalState.contentGaps,
        cannibalizations: globalState.cannibalizations,
        contentDecays: globalState.contentDecays,
        seoTasks: globalState.seoTasks,
        knowledgeGraphEntities: globalState.knowledgeGraphEntities,
        activeStep: globalState.activeStep,
        activeView: globalState.activeView,
        language: globalState.language
      })
    );
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  listeners.forEach(l => l());
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(globalState);

  useEffect(() => {
    const handler = () => setState({ ...globalState });
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const currentProject =
    state.projects.find(p => p.id === state.currentProjectId) || state.projects[0] || DEFAULT_PROJECT;

  const currentBrand =
    state.brands.find(b => b.id === currentProject.brandId) || state.brands[0] || DEFAULT_BRAND;

  const currentWebsite =
    state.websites.find(w => w.id === currentProject.websiteId) || state.websites[0] || DEFAULT_WEBSITE;

  const activeContentRow =
    state.contentPlan.find(r => r.id === state.activeContentRowId) || null;

  // View Navigation
  const setActiveView = (view: AppView) => {
    globalState.activeView = view;
    notify();
  };

  const setActiveStep = (step: number) => {
    globalState.activeStep = Math.max(1, Math.min(12, step));
    notify();
  };

  const nextStep = () => {
    if (globalState.activeStep < 12) {
      globalState.activeStep += 1;
      notify();
    }
  };

  const prevStep = () => {
    if (globalState.activeStep > 1) {
      globalState.activeStep -= 1;
      notify();
    }
  };

  // Notifications
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    globalState.notification = { message, type };
    notify();
    setTimeout(() => {
      if (globalState.notification?.message === message) {
        globalState.notification = null;
        notify();
      }
    }, 4500);
  };

  const clearNotification = () => {
    globalState.notification = null;
    notify();
  };

  // Content Plan Matrix Actions (The 50-column Source of Truth)
  const addContentPlanRow = (title: string) => {
    const newRow = generateAutoContentPlanRow(title, currentBrand, currentWebsite);
    globalState.contentPlan = [newRow, ...globalState.contentPlan];
    showNotification(`محتوای جدید «${title}» با ۵۰ فیلد هوشمند به جدول اضافه شد.`, 'success');
    notify();
    return newRow;
  };

  const updateContentPlanRow = (id: string, updates: Partial<ContentPlanRow>) => {
    globalState.contentPlan = globalState.contentPlan.map(r => {
      if (r.id === id) {
        return {
          ...r,
          ...updates,
          lastUpdated: new Date().toISOString()
        };
      }
      return r;
    });
    notify();
  };

  const deleteContentPlanRow = (id: string) => {
    globalState.contentPlan = globalState.contentPlan.filter(r => r.id !== id);
    if (globalState.activeContentRowId === id) {
      globalState.activeContentRowId = null;
      globalState.isRowDetailDrawerOpen = false;
    }
    showNotification('ردیف محتوا حذف شد.', 'info');
    notify();
  };

  const toggleFieldLock = (rowId: string, fieldName: string) => {
    globalState.contentPlan = globalState.contentPlan.map(r => {
      if (r.id === rowId) {
        const locked = { ...(r.isLockedFields || {}) };
        locked[fieldName] = !locked[fieldName];
        return { ...r, isLockedFields: locked };
      }
      return r;
    });
    notify();
  };

  const batchGenerateRows = async (ids: string[]) => {
    showNotification(`تولید و تکمیل هوشمند ${ids.length} ردیف آغاز شد...`, 'info');
    globalState.contentPlan = globalState.contentPlan.map(r => {
      if (ids.includes(r.id)) {
        return generateAutoContentPlanRow(r.title, currentBrand, currentWebsite, r);
      }
      return r;
    });
    showNotification(`تمامی ${ids.length} ردیف با موفقیت بهینه‌سازی و تولید شدند.`, 'success');
    notify();
  };

  const importContentPlanRows = (rows: ContentPlanRow[]) => {
    globalState.contentPlan = [...rows, ...globalState.contentPlan];
    showNotification(`${rows.length} عنوان محتوا با موفقیت از اکسل وارد و پردازش شد.`, 'success');
    notify();
  };

  const setActiveContentRowId = (id: string | null) => {
    globalState.activeContentRowId = id;
    globalState.isRowDetailDrawerOpen = id !== null;
    notify();
  };

  // Convert a ContentPlanRow into full active project for Wizard and 1-click Prompt generation
  const loadRowIntoWizard = (row: ContentPlanRow) => {
    const updatedProj: SEOProject = {
      ...currentProject,
      id: 'proj-' + row.id,
      articleTitle: row.title,
      topic: row.topic || row.title,
      primaryKeyword: row.primaryKeyword,
      keywords: {
        ...currentProject.keywords,
        primaryKeyword: row.primaryKeyword,
        secondaryKeywords: row.secondaryKeywords,
        lsiKeywords: row.lsiKeywords
      },
      contentStructure: {
        ...currentProject.contentStructure,
        targetWordCount: typeof row.wordCount === 'number' ? row.wordCount : 3000,
        h1Title: row.h1,
        headings: row.h2.map((h, i) => ({ id: `h2-${i}`, level: 'H2', text: h, intent: 'پوشش هدف جستجو' })),
        faqs: row.faq.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer || '' }))
      },
      aiImagePrompts: row.imagePrompts && row.imagePrompts.length > 0 ? row.imagePrompts : currentProject.aiImagePrompts
    };

    globalState.projects = [updatedProj, ...globalState.projects.filter(p => p.id !== updatedProj.id)];
    globalState.currentProjectId = updatedProj.id;
    globalState.activeView = 'wizard';
    showNotification(`محتوای «${row.title}» در ویزارد ۱۲ مرحله‌ای بارگذاری شد.`, 'success');
    notify();
  };

  // Integration & SEO Analytics Toggles
  const toggleIntegration = (type: 'gsc' | 'ga4' | 'sheets', connected: boolean) => {
    if (type === 'gsc') {
      globalState.gscSummary = { ...globalState.gscSummary, isConnected: connected, lastSyncedAt: new Date().toISOString() };
    } else if (type === 'ga4') {
      globalState.ga4Summary = { ...globalState.ga4Summary, isConnected: connected, lastSyncedAt: new Date().toISOString() };
    } else if (type === 'sheets') {
      globalState.sheetsConfig = { ...globalState.sheetsConfig, isConnected: connected, lastSyncedAt: new Date().toISOString() };
    }
    showNotification(`وضعیت اتصال سرویس ${type.toUpperCase()} تغییر یافت.`, 'info');
    notify();
  };

  const updateTaskStatus = (taskId: string, status: SEOTaskItem['status']) => {
    globalState.seoTasks = globalState.seoTasks.map(t => (t.id === taskId ? { ...t, status } : t));
    notify();
  };

  const addCustomTask = (task: Omit<SEOTaskItem, 'id' | 'createdAt'>) => {
    const newTask: SEOTaskItem = {
      ...task,
      id: 'task-custom-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    globalState.seoTasks = [newTask, ...globalState.seoTasks];
    showNotification('تسک جدید سئو ثبت شد.', 'success');
    notify();
  };

  // Modals Toggles
  const setExcelImportModalOpen = (open: boolean) => {
    globalState.isExcelImportModalOpen = open;
    notify();
  };

  const setSheetsSyncModalOpen = (open: boolean) => {
    globalState.isSheetsSyncModalOpen = open;
    notify();
  };

  const setRowDetailDrawerOpen = (open: boolean) => {
    globalState.isRowDetailDrawerOpen = open;
    if (!open) globalState.activeContentRowId = null;
    notify();
  };

  const setPromptPreviewOpen = (open: boolean) => {
    globalState.isPromptPreviewOpen = open;
    notify();
  };

  const setBrandModalOpen = (open: boolean) => {
    globalState.isBrandModalOpen = open;
    notify();
  };

  const setPresetsModalOpen = (open: boolean) => {
    globalState.isPresetsModalOpen = open;
    notify();
  };

  const addBrand = (brand: BrandIdentity) => {
    globalState.brands = [brand, ...globalState.brands];
    globalState.currentBrandId = brand.id;
    showNotification(`برند «${brand.name}» با موفقیت افزوده شد.`, 'success');
    notify();
  };

  const deleteBrand = (brandId: string) => {
    if (globalState.brands.length <= 1) {
      showNotification('حداقل یک برند باید در سیستم باقی بماند.', 'error');
      return;
    }
    globalState.brands = globalState.brands.filter(b => b.id !== brandId);
    if (globalState.currentBrandId === brandId) {
      globalState.currentBrandId = globalState.brands[0].id;
    }
    showNotification('برند حذف شد.', 'info');
    notify();
  };

  const selectProject = (projectId: string) => {
    globalState.currentProjectId = projectId;
    notify();
  };

  const createProject = (title?: string) => {
    const newProj: SEOProject = {
      ...DEFAULT_PROJECT,
      id: 'proj-' + Date.now(),
      articleTitle: title || 'پروژه جدید سئو',
      topic: title || 'موضوع مقاله سئو',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    globalState.projects = [newProj, ...globalState.projects];
    globalState.currentProjectId = newProj.id;
    showNotification('پروژه جدید سئو با موفقیت ایجاد شد.', 'success');
    notify();
    return newProj;
  };

  const deleteProject = (projectId: string) => {
    if (globalState.projects.length <= 1) {
      showNotification('حداقل یک پروژه باید در سیستم باقی بماند.', 'error');
      return;
    }
    globalState.projects = globalState.projects.filter(p => p.id !== projectId);
    if (globalState.currentProjectId === projectId) {
      globalState.currentProjectId = globalState.projects[0].id;
    }
    showNotification('پروژه با موفقیت حذف شد.', 'info');
    notify();
  };

  const cloneProject = (projectId: string) => {
    const target = globalState.projects.find(p => p.id === projectId) || currentProject;
    const cloned: SEOProject = {
      ...target,
      id: 'proj-' + Date.now(),
      articleTitle: `${target.articleTitle} (کپی)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    globalState.projects = [cloned, ...globalState.projects];
    globalState.currentProjectId = cloned.id;
    showNotification('پروژه سئو با موفقیت تکثیر شد.', 'success');
    notify();
  };

  const updateBrand = (brandId: string, updates: Partial<BrandIdentity>) => {
    globalState.brands = globalState.brands.map(b => {
      if (b.id === brandId) {
        return { ...b, ...updates, updatedAt: new Date().toISOString() };
      }
      return b;
    });
    notify();
  };

  const selectBrand = (brandId: string) => {
    globalState.currentBrandId = brandId;
    notify();
  };

  const updateWebsite = (websiteId: string, updates: Partial<WebsiteProfile>) => {
    globalState.websites = globalState.websites.map(w => {
      if (w.id === websiteId) {
        return { ...w, ...updates };
      }
      return w;
    });
    notify();
  };

  const selectWebsite = (websiteId: string) => {
    globalState.currentWebsiteId = websiteId;
    notify();
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESET_TEMPLATES.find(p => p.id === presetId);
    if (preset) {
      const updated: SEOProject = {
        ...currentProject,
        articleTitle: preset.nameFa || preset.name,
        topic: preset.nameFa || preset.name,
        contentType: preset.contentType as any,
        primaryKeyword: preset.primaryKeyword || currentProject.primaryKeyword,
        keywords: {
          ...currentProject.keywords,
          primaryKeyword: preset.primaryKeyword || currentProject.keywords.primaryKeyword,
          secondaryKeywords: preset.secondaryKeywords || currentProject.keywords.secondaryKeywords
        },
        styleAndTone: {
          ...currentProject.styleAndTone,
          articleLength: preset.articleLength || currentProject.styleAndTone.articleLength
        }
      };
      globalState.projects = globalState.projects.map(p => (p.id === currentProject.id ? updated : p));
      showNotification(`الگوی «${preset.nameFa || preset.name}» با موفقیت اعمال شد.`, 'success');
      notify();
    }
  };

  const updateCurrentProject = (updates: Partial<SEOProject>) => {
    globalState.projects = globalState.projects.map(p => {
      if (p.id === currentProject.id) {
        return { ...p, ...updates, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    notify();
  };

  const setMode = (mode: 'production' | 'demo') => {
    globalState.mode = mode;
    showNotification(
      mode === 'production'
        ? 'حالت پروداکشن (Production Mode) فعال شد. داده‌ها مستقیماً از موتور و پایگاه دانش استخراج می‌شوند.'
        : 'حالت نمایشی (Demo Mode) فعال شد.',
      'info'
    );
    notify();
  };

  const processBulkQueue = async (titles: string[]) => {
    if (!titles.length) return;
    const total = titles.length;
    globalState.bulkQueue = {
      isProcessing: true,
      total,
      completed: 0,
      processing: Math.min(8, total),
      failed: 0,
      pending: Math.max(0, total - 8)
    };
    notify();

    const createdRows: ContentPlanRow[] = [];
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      try {
        const row = generateAutoContentPlanRow(title, currentBrand, currentWebsite);
        createdRows.push(row);
        globalState.bulkQueue = {
          isProcessing: true,
          total,
          completed: i + 1,
          processing: Math.min(8, total - i - 1),
          failed: globalState.bulkQueue.failed,
          pending: Math.max(0, total - (i + 1) - Math.min(8, total - i - 1))
        };
        notify();
        // small yielding delay for UI responsive rendering
        if (i % 5 === 0) await new Promise(r => setTimeout(r, 20));
      } catch (err) {
        globalState.bulkQueue.failed += 1;
        notify();
      }
    }

    globalState.contentPlan = [...createdRows, ...globalState.contentPlan];
    globalState.bulkQueue = {
      isProcessing: false,
      total,
      completed: createdRows.length,
      processing: 0,
      failed: globalState.bulkQueue.failed,
      pending: 0
    };
    showNotification(`صف پردازش دسته‌ای به پایان رسید (${createdRows.length} ردیف اضافه شد).`, 'success');
    notify();
  };

  const convertGapToTask = (gap: any) => {
    const newTask: SEOTaskItem = {
      id: 'task-gap-' + Date.now(),
      title: `بهینه‌سازی کلمه در آستانه رتبه ۱: «${gap.query || gap.suggestedTopic}»`,
      description: `این کلمه کلیدی با ایمپرشن بالا (${(gap.impressions || gap.searchVolume || 0).toLocaleString()}) نیازمند بروزرسانی محتوا یا ایجاد مقاله جدید است.`,
      category: 'CONTENT',
      priority: (gap.priority || 'High') as any,
      status: 'TODO',
      associatedUrl: gap.targetUrl,
      associatedKeyword: gap.query || gap.primaryKeyword,
      createdAt: new Date().toISOString()
    };
    globalState.seoTasks = [newTask, ...globalState.seoTasks];
    showNotification(`فرصت سئو به تسک «${newTask.title}» تبدیل شد.`, 'success');
    notify();
  };

  const convertCannibalizationToTask = (cann: CannibalizationItem) => {
    const newTask: SEOTaskItem = {
      id: 'task-cann-' + Date.now(),
      title: `رفع هم‌پوشانی (Cannibalization) برای کلمه «${cann.query}»`,
      description: `دو صفحه ${cann.urlA} و ${cann.urlB} روی این کلمه رقابت دارند. اقدام پیشنهادی: ${cann.recommendedAction}`,
      category: 'TECHNICAL',
      priority: cann.severity === 'Critical' ? 'High' : 'Medium',
      status: 'TODO',
      associatedUrl: cann.urlA,
      associatedKeyword: cann.query,
      createdAt: new Date().toISOString()
    };
    globalState.seoTasks = [newTask, ...globalState.seoTasks];
    showNotification(`تسک رفع کانیبالیزیشن با موفقیت ثبت شد.`, 'success');
    notify();
  };

  const convertDecayToTask = (decay: ContentDecayItem) => {
    const newTask: SEOTaskItem = {
      id: 'task-decay-' + Date.now(),
      title: `نوسازی صفحه افت کرده (Content Decay): «${decay.url}»`,
      description: `افت کلیک ${decay.clickDeclinePercent}% و افت جایگاه از ${decay.previousPosition} به ${decay.currentPosition}. اقدام: ${decay.recommendedAction}`,
      category: 'CONTENT',
      priority: decay.decayScore > 75 ? 'High' : 'Medium',
      status: 'TODO',
      associatedUrl: decay.url,
      createdAt: new Date().toISOString()
    };
    globalState.seoTasks = [newTask, ...globalState.seoTasks];
    showNotification(`تسک نوسازی محتوای زوال‌یافته ثبت شد.`, 'success');
    notify();
  };

  const compilePrompt = () => {
    const res = compileMasterSEOPrompt(currentProject, currentBrand, currentWebsite);
    globalState.generatedPromptResult = res;
    notify();
    return res;
  };

  return {
    // State
    projects: state.projects,
    currentProject,
    currentBrand,
    currentWebsite,
    brands: state.brands,
    websites: state.websites,
    contentPlan: state.contentPlan,
    activeContentRowId: state.activeContentRowId,
    activeContentRow,
    gscSummary: state.gscSummary,
    ga4Summary: state.ga4Summary,
    sheetsConfig: state.sheetsConfig,
    keywordGaps: state.keywordGaps,
    contentGaps: state.contentGaps,
    cannibalizations: state.cannibalizations,
    contentDecays: state.contentDecays,
    seoTasks: state.seoTasks,
    knowledgeGraphEntities: state.knowledgeGraphEntities,
    activeStep: state.activeStep,
    activeView: state.activeView,
    language: state.language,
    mode: state.mode,
    bulkQueue: state.bulkQueue,
    isPromptPreviewOpen: state.isPromptPreviewOpen,
    isBrandModalOpen: state.isBrandModalOpen,
    isPresetsModalOpen: state.isPresetsModalOpen,
    isExcelImportModalOpen: state.isExcelImportModalOpen,
    isSheetsSyncModalOpen: state.isSheetsSyncModalOpen,
    isRowDetailDrawerOpen: state.isRowDetailDrawerOpen,
    generatedPromptResult: state.generatedPromptResult,
    notification: state.notification,

    // Actions
    setActiveView,
    setActiveStep,
    setMode,
    processBulkQueue,
    convertGapToTask,
    convertCannibalizationToTask,
    convertDecayToTask,
    nextStep,
    prevStep,
    showNotification,
    clearNotification,
    addContentPlanRow,
    updateContentPlanRow,
    deleteContentPlanRow,
    toggleFieldLock,
    batchGenerateRows,
    importContentPlanRows,
    setActiveContentRowId,
    loadRowIntoWizard,
    toggleIntegration,
    updateTaskStatus,
    addCustomTask,
    setExcelImportModalOpen,
    setSheetsSyncModalOpen,
    setRowDetailDrawerOpen,
    setPromptPreviewOpen,
    setBrandModalOpen,
    setPresetsModalOpen,
    applyPreset,
    addBrand,
    updateBrand,
    deleteBrand,
    selectBrand,
    updateWebsite,
    selectWebsite,
    selectProject,
    createProject,
    deleteProject,
    cloneProject,
    updateCurrentProject,
    compilePrompt
  };
}
