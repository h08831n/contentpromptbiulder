import {
  ContentPlanRow,
  BrandIdentity,
  WebsiteProfile,
  AIImagePromptItem,
  SearchIntentType,
  FunnelStage,
  PriorityLevel,
  PotentialLevel
} from '../types';
import { STEEL_INDUSTRY_ENTITIES, STEEL_FACTORIES_IRAN, STEEL_REBAR_STAHL_TABLE } from '../data/industryKnowledgeBase';
import { generateImagePrompts } from './aiImagePromptEngine';
import { generateSocialBroadcast } from './socialBroadcastEngine';

interface KeywordCandidate {
  keyword: string;
  relevance: number;
}

export function analyzeTopicClassification(title: string): {
  intent: SearchIntentType;
  funnelStage: FunnelStage;
  contentType: string;
  productType: string;
  topicCategory: string;
} {
  const t = title.toLowerCase();

  // Product detection
  let productType = 'مقاطع فولادی عمومی';
  if (t.includes('میلگرد') || t.includes('آجدار') || t.includes('کلاف')) productType = 'میلگرد آجدار';
  else if (t.includes('تیرآهن') || t.includes('هاش') || t.includes('ipe') || t.includes('heb')) productType = 'تیرآهن و هاش';
  else if (t.includes('ورق') || t.includes('st37') || t.includes('st52') || t.includes('گالوانیزه') || t.includes('روغنی')) productType = 'انواع ورق فولادی';
  else if (t.includes('پروفیل') || t.includes('قوطی') || t.includes('زد') || t.includes('z')) productType = 'قوطی و پروفیل';
  else if (t.includes('نبشی') || t.includes('ناودانی')) productType = 'نبشی و ناودانی';
  else if (t.includes('لوله') || t.includes('مانیسمان')) productType = 'لوله و اتصالات';

  // Intent & Funnel detection
  let intent: SearchIntentType = 'Informational';
  let funnelStage: FunnelStage = 'TOFU (آگاهی)';
  let contentType = 'مقاله وبسایت';
  let topicCategory = 'دانشنامه و راهنما';

  if (t.includes('قیمت') || t.includes('نرخ') || t.includes('خرید') || t.includes('فروش') || t.includes('استعلام') || t.includes('امروز')) {
    intent = 'Transactional';
    funnelStage = 'BOFU (تصمیم‌گیری و خرید)';
    contentType = 'صفحه لندینگ';
    topicCategory = 'قیمت و بازار';
  } else if (t.includes('بهترین') || t.includes('مقایسه') || t.includes('راهنما') || t.includes('تفاوت') || t.includes('کدام')) {
    intent = 'Comparison';
    funnelStage = 'MOFU (بررسی و ارزیابی)';
    contentType = 'راهنمای گام‌به‌گام (How-To)';
    topicCategory = 'راهنمای خرید و مقایسه';
  } else if (t.includes('چیست') || t.includes('فرمول') || t.includes('محاسبه') || t.includes('آموزش') || t.includes('استاندارد') || t.includes('وزن')) {
    intent = 'Informational';
    funnelStage = 'TOFU (آگاهی)';
    contentType = 'پیلار پیج (Pillar Page)';
    topicCategory = 'آموزش فنی و متالورژی';
  }

  return { intent, funnelStage, contentType, productType, topicCategory };
}

export function generatePrimaryKeyword(title: string): string {
  // Strip common filler words
  let cleaned = title
    .replace(/[؛،()\[\]+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Check common high-volume patterns
  const rebarMatches = ['قیمت میلگرد امروز', 'راهنمای خرید میلگرد', 'قیمت میلگرد', 'وزن میلگرد', 'میلگرد اصفهان', 'میلگرد بناب', 'تفاوت میلگرد a2 و a3'];
  for (const m of rebarMatches) {
    if (cleaned.includes(m)) return m;
  }

  const beamMatches = ['قیمت تیرآهن', 'قیمت هاش', 'تیرآهن اصفهان', 'راهنمای خرید تیرآهن', 'تیرآهن ۱۴'];
  for (const m of beamMatches) {
    if (cleaned.includes(m)) return m;
  }

  const sheetMatches = ['قیمت ورق سیاه', 'قیمت ورق آهن', 'ورق مبارکه', 'محاسبه وزن ورق'];
  for (const m of sheetMatches) {
    if (cleaned.includes(m)) return m;
  }

  // Extract up to first 4 meaningful words
  const words = cleaned.split(' ').filter(w => w.length > 2 && !['برای', 'های', 'است', 'شدن', 'ترین'].includes(w));
  return words.slice(0, 4).join(' ') || title;
}

export function generateSecondaryAndLSIKeywords(
  primaryKeyword: string,
  productType: string
): {
  secondary: string[];
  lsi: string[];
  entities: string[];
} {
  if (productType.includes('میلگرد')) {
    return {
      secondary: [
        `جدول وزن ${primaryKeyword}`,
        'تفاوت میلگرد A2 و A3 و A4',
        'استعلام قیمت روز میلگرد آهن اینجا',
        'خرید مستقیم میلگرد از کارخانه',
        'نحوه تشخیص میلگرد اصل از تقلبی',
        'فرمول محاسبه وزن هر شاخه ۱۲ متری'
      ],
      lsi: [
        'استاندارد ملی ISIRI 3132',
        'تنش تسلیم فولاد (Yield Strength)',
        'آج دوکی و یکنواخت جناقی',
        'بندیل میلگرد و تعداد شاخه در تریلی',
        'برگه آنالیز و سرتیفیکیت آزمایشگاهی',
        'کرایه حمل تریلی آهن و هزینه باسکول',
        'آزمون کشش و خمش سرد'
      ],
      entities: [
        'ذوب آهن اصفهان (ESCO)',
        'فولاد خراسان (نیشابور - KSR)',
        'مجتمع فولاد ظفر بناب (ZAFAR)',
        'فولاد کویر کاشان (KAVIR)',
        'آیین‌نامه بتن ایران (آبا)',
        'جدول اشتال مهندسی (Stahl Table)'
      ]
    };
  }

  if (productType.includes('تیرآهن') || productType.includes('هاش')) {
    return {
      secondary: [
        'جدول وزن تیرآهن IPE و هاش',
        'تفاوت تیرآهن ذوب آهن و فایکو',
        'قیمت تیرآهن ۱۴ و ۱۶ و ۱۸',
        'راهنمای خرید هاش سبک و سنگین',
        'نحوه بارگیری و تحویل تیرآهن از بنگاه'
      ],
      lsi: [
        'استاندارد DIN 1025 آلمان',
        'ممان اینرسی و اساس مقطع',
        'جان و بال تیرآهن',
        'هاش HEA و HEB',
        'تیرآهن لانه زنبوری CPE',
        'اسکلت فلزی و ستون‌گذاری'
      ],
      entities: [
        'ذوب آهن اصفهان',
        'فولاد البرز ایرانیان (فایکو)',
        'فولاد ناب تبریز',
        'مبحث دهم مقررات ملی ساختمان'
      ]
    };
  }

  if (productType.includes('ورق')) {
    return {
      secondary: [
        'قیمت روز ورق سیاه ST37 و ST52',
        'فرمول محاسبه وزن ورق آهن',
        'تفاوت ورق نورد گرم و روغنی',
        'خرید رول و شیت ورق از کارخانه',
        'برشکاری و رول به شیت در انبار'
      ],
      lsi: [
        'چگالی استاندارد فولاد ۷.۸۵',
        'تست کشش و ضربه چارپی',
        'ضخامت سنجی التراسونیک',
        'روغن‌زدایی و اسیدشویی',
        'مخازن تحت فشار A516'
      ],
      entities: [
        'فولاد مبارکه اصفهان (MSC)',
        'فولاد اکسین خوزستان (OXIN)',
        'فولاد کاویان اهواز',
        'فولاد گیلان'
      ]
    };
  }

  return {
    secondary: [
      `راهنمای جامع خرید ${primaryKeyword}`,
      `قیمت روز ${primaryKeyword} در بازار آهن`,
      `مشخصات فنی و جدول استاندارد ${primaryKeyword}`,
      'نکات طلایی قبل از خرید تناژ بالا'
    ],
    lsi: [
      'استاندارد ملی کیفیت',
      'فاکتور رسمی و ارزش افزوده',
      'باسکول و تحویل پای کار',
      'گواهی کیفیت و سرتیفیکیت'
    ],
    entities: [
      'آهن اینجا (AhanInja)',
      'بورس کالای ایران',
      'اتحادیه صنف آهن و فولاد',
      'استاندارد ملی ISIRI'
    ]
  };
}

export function generateSEOTitleVariants(title: string, primaryKeyword: string, brandName: string): {
  recommended: string;
  variants: string[];
} {
  const shortBrand = brandName.includes('(') ? brandName.split('(')[0].trim() : brandName;
  const currentYear = '۱۴۰۴';

  const variants = [
    `${title}؛ بررسی قیمت روز و جدول وزن استاندارد کارخانه‌ها | ${shortBrand}`,
    `${primaryKeyword}؛ راهنمای جامع خرید مستقیم از کارخانه + فاکتور رسمی (${currentYear})`,
    `قیمت و راهنمای خرید ${primaryKeyword} + جدول مقایسه وزن کارخانجات | ${shortBrand}`,
    `همه چیز درباره ${primaryKeyword}؛ از مشخصات فنی تا نحوه استعلام فوری قیمت`,
    `${primaryKeyword} چیست؟ تحلیل فنی، نحوه تشخیص اصالت و استعلام قیمت در ${shortBrand}`
  ];

  return {
    recommended: variants[0],
    variants
  };
}

export function generateMetaDescriptionVariants(primaryKeyword: string, brandName: string): {
  recommended: string;
  variants: string[];
} {
  const shortBrand = brandName.includes('(') ? brandName.split('(')[0].trim() : brandName;
  const variants = [
    `راهنمای جامع خرید ${primaryKeyword} از ${shortBrand}: استعلام لحظه‌ای قیمت کارخانجات، بررسی مشخصات فنی و جدول وزن اشتال، تضمین باسکول و صدور فاکتور رسمی با تحویل فوری.`,
    `بررسی کامل ${primaryKeyword} به همراه آموزش محاسبه وزن، معرفی برترین کارخانه‌های ایران، تفاوت گریدها و نحوه سفارش با کمترین کرایه حمل در سامانه ${shortBrand}.`,
    `پیش از خرید ${primaryKeyword} این راهنما را بخوانید: تحلیل فنی، روش تشخیص اصالت کالا، استعلام قیمت درب کارخانه و مشاوره تخصصی خرید عمده در ${shortBrand}.`
  ];

  return {
    recommended: variants[0],
    variants
  };
}

export function generateUrlSlug(primaryKeyword: string): string {
  // Convert Persian keyword to a clean semantic slug
  const map: Record<string, string> = {
    'میلگرد': 'rebar',
    'قیمت': 'price',
    'تیرآهن': 'beam',
    'ورق': 'steel-sheet',
    'پروفیل': 'steel-profile',
    'قوطی': 'box-profile',
    'خرید': 'buy',
    'راهنما': 'guide',
    'جدول': 'table',
    'وزن': 'weight',
    'اشتال': 'stahl',
    'اصفهان': 'esfahan',
    'بناب': 'bonab',
    'نیشابور': 'khorasan',
    'امروز': 'today',
    'ساختمان': 'building'
  };

  const words = primaryKeyword.split(' ');
  const slugParts = words
    .map(w => map[w] || '')
    .filter(Boolean);

  if (slugParts.length >= 2) {
    return slugParts.join('-');
  }

  // Fallback transliteration
  return 'guide-' + Math.random().toString(36).substring(2, 8);
}

export function generateHeadingsStructure(
  primaryKeyword: string,
  productType: string
): {
  h1: string;
  h2: string[];
  h3: string[];
} {
  const h1 = `راهنمای کامل خرید و استعلام قیمت ${primaryKeyword}؛ مشخصات فنی و نکات طلایی کارگاهی`;

  const h2 = [
    `${primaryKeyword} چیست و چه کاربردی در پروژه‌های ساختمانی و صنعتی دارد؟`,
    `بررسی مشخصات فنی، استانداردها و تفاوت گریدهای ${productType}`,
    `جدول مقایسه وزن و مشخصات کارخانجات برتر تولیدکننده در ایران`,
    `فرمول سریع محاسبه وزن هر شاخه و مقایسه با جدول اشتال مرجع`,
    `۵ نکته حیاتی جهت تشخیص اصالت و بررسی علائم اختصاری حک‌شده`,
    `مراحل گام‌به‌گام استعلام قیمت، دریافت پیش‌فاکتور رسمی و ثبت سفارش از آهن اینجا`,
    `سؤالات متداول در خصوص خرید و تحویل بار ${primaryKeyword}`
  ];

  const h3 = [
    'تفاوت گریدهای فولادی A2، A3 و A4 از نظر مقاومت و خمش‌پذیری',
    'بررسی مشخصات فنی محصولات ذوب آهن اصفهان (ESCO)',
    'بررسی مشخصات فنی مجتمع فولاد خراسان و ظفر بناب',
    'نحوه کنترل باسکول، تحویل پای کار و ترخیص بارنامه رسمی'
  ];

  return { h1, h2, h3 };
}

export function generateFAQList(primaryKeyword: string): { question: string; answer: string }[] {
  return [
    {
      question: `چگونه بهترین کارخانه تولیدکننده ${primaryKeyword} را متناسب با محل پروژه انتخاب کنیم؟`,
      answer: `انتخاب کارخانه باید با در نظر گرفتن فاصله جغرافیایی پروژه تا کارخانه جهت بهینه‌سازی هزینه کرایه حمل تریلی، الزامات آیین‌نامه محاسباتی سازه و وزن هر شاخه مطابق جدول اشتال انجام شود.`
    },
    {
      question: `چگونه وزن بار خریداری‌شده را با باسکول مبدا و مقصد کنترل کنیم؟`,
      answer: `تمامی بارهای ارسالی از آهن اینجا همراه با برگه باسکول دیجیتال رسمی کارخانه و پلاک بندیل صادر می‌شوند و خریدار می‌تواند بار را روی باسکول استاندارد تخلیه مطابقت دهد.`
    },
    {
      question: `آیا امکان خرید ${primaryKeyword} با صدور فاکتور رسمی ارزش افزوده وجود دارد؟`,
      answer: `بله، آهن اینجا کلیه سفارش‌های اشخاص حقیقی و حقوقی و شرکت‌های پیمانکاری را با صدور فاکتور رسمی معتبر سامانه مودیان و احتساب مالیات بر ارزش افزوده قانونی عرضه می‌نماید.`
    },
    {
      question: `حداقل تناژ سفارش برای ارسال مستقیم از درب کارخانه چقدر است؟`,
      answer: `حداقل تناژ برای ارسال مستقیم از کارخانه یک ظرفیت تریلی کامل (حدود ۲۲ الی ۲۴ تن) است. برای سفارش‌های خرد و زیر یک ظرفیت، بارگیری از نزدیک‌ترین بنگاه شادآباد تهران یا اصفهان انجام می‌شود.`
    }
  ];
}

export function generateInternalLinks(productType: string): { targetUrl: string; anchorText: string; note: string }[] {
  return [
    {
      targetUrl: 'https://ahaninja.com/prices/rebar',
      anchorText: 'قیمت روز میلگرد',
      note: 'ارجاع در بخش استعلام لحظه‌ای نرخ کارخانجات'
    },
    {
      targetUrl: 'https://ahaninja.com/tools/steel-weight-calculator',
      anchorText: 'محاسبه آنلاین وزن میلگرد و جدول اشتال',
      note: 'ارجاع در بخش فرمول محاسبه وزن شاخه'
    },
    {
      targetUrl: 'https://ahaninja.com/prices/beam',
      anchorText: 'قیمت روز تیرآهن IPE',
      note: 'ارجاع در بخش مقایسه هزینه‌های اسکلت بتنی و فلزی'
    },
    {
      targetUrl: 'https://ahaninja.com/blog/steel-market-analysis',
      anchorText: 'تحلیل هفتگی بازار آهن',
      note: 'ارجاع در بخش زمان مناسب خرید مقاطع فولادی'
    }
  ];
}

export function generateEEATAndSchema(brand: BrandIdentity): {
  schema: string[];
  eeat: { authorName: string; authorBio: string; factCheckingSources: string; expertReviewed: boolean };
} {
  return {
    schema: ['Article', 'FAQPage', 'HowTo', 'BreadcrumbList', 'Organization'],
    eeat: {
      authorName: 'مهندس محمدرضا سلیمانی',
      authorBio: 'کارشناس ارشد متالورژی و مشاور ارشد زنجیره تامین مقاطع ساختمانی در آهن اینجا با بیش از ۱۴ سال سابقه کنترل کیفیت در کارخانجات ذوب.',
      factCheckingSources: 'استاندارد ملی ۳۱۳۲ ایران، جدول اشتال مهندسی DIN و برگه‌های آنالیز متالوگرافی آزمایشگاه‌های همکار استاندارد',
      expertReviewed: true
    }
  };
}

/**
 * MASTER AUTO-FILL ENGINE
 * Transforms just a single title into a full 50+ column ContentPlanRow
 */
export function generateAutoContentPlanRow(
  rawTitle: string,
  brand: BrandIdentity,
  website: WebsiteProfile,
  existingRow?: Partial<ContentPlanRow>
): ContentPlanRow {
  const title = rawTitle.trim() || 'قیمت میلگرد امروز و راهنمای خرید مقاطع فولادی';
  const classification = analyzeTopicClassification(title);
  const primaryKeyword = existingRow?.primaryKeyword || generatePrimaryKeyword(title);
  const { secondary, lsi, entities } = generateSecondaryAndLSIKeywords(primaryKeyword, classification.productType);
  const seoTitles = generateSEOTitleVariants(title, primaryKeyword, brand.name);
  const metaDescriptions = generateMetaDescriptionVariants(primaryKeyword, brand.name);
  const slug = generateUrlSlug(primaryKeyword);
  const headings = generateHeadingsStructure(primaryKeyword, classification.productType);
  const faqs = generateFAQList(primaryKeyword);
  const internalLinks = generateInternalLinks(classification.productType);
  const eeatSchema = generateEEATAndSchema(brand);

  // Dynamic Word Count
  let wordCount: number = 2800;
  if (classification.intent === 'Informational') wordCount = 3200;
  else if (classification.intent === 'Comparison') wordCount = 3500;
  else if (classification.intent === 'Transactional') wordCount = 2400;

  // Image Prompts
  const imagePrompts: AIImagePromptItem[] = [
    {
      id: 'img-hero-' + Date.now(),
      title: 'تصویر شاخص هدر (Featured Hero)',
      type: 'Hero Banner',
      promptEn: `Cinematic ultra-realistic 8K photograph of modern industrial steel distribution warehouse in Tehran, stacked bundles of deformed construction rebar (Grade A3) with authentic steel mill blue tags, overhead yellow gantry crane, dramatic golden hour natural skylight rays shining through steel beam structure, high depth of field, architectural photography style, 16:9 ratio.`,
      promptFa: 'نمای سینمایی از انبار مدرن توزیع میلگرد و بندیل‌های فولادی با نورپردازی طبیعی سوله و برچسب‌های مشخصات کارخانه',
      aspectRatio: '16:9',
      style: 'Photorealistic',
      negativePrompt: 'blurry, cartoon, 3d render, distorted, low quality, rust, broken rebar',
      altTextFa: `نمای انبار مقاطع فولادی و بندیل‌های میلگرد استاندارد در بنگاه آهن اینجا`,
      captionFa: `انبار مرکزی تامین و بارگیری انواع میلگرد و مقاطع فولادی ساختمانی در آهن اینجا`
    },
    {
      id: 'img-infographic-' + Date.now(),
      title: 'اینفوگرافیک مقایسه وزن اشتال کارخانجات',
      type: 'Technical Infographic',
      promptEn: `Clean minimalist isometric technical infographic vector diagram displaying steel rebar weight comparison table, nominal DIN Stahl weights, labeled sizes 8mm to 32mm, yield strength 400 MPa badge, polished slate blue and steel dark tones, high contrast typography, precise engineering diagram aesthetic.`,
      promptFa: 'اینفوگرافیک نمودار مقایسه وزن هر شاخه میلگرد با جدول استاندارد اشتال',
      aspectRatio: '1:1',
      style: 'Industrial 3D Diagram',
      negativePrompt: 'illegible text, cluttered, ugly artifacts, bad contrast',
      altTextFa: `جدول اینفوگرافیک مقایسه وزن شاخه میلگرد کارخانجات ایران با استاندارد اشتال`,
      captionFa: `نمودار مقایسه وزن اسمی و تجربی میلگرد کارخانجات برتر فولاد کشور`
    },
    {
      id: 'img-stamp-' + Date.now(),
      title: 'نمای ماکرو از آج و علائم اختصاری حک‌شده',
      type: 'Macro Steel Texture',
      promptEn: `Extreme macro close-up photograph of high quality A3 deformed steel rebar ribbed surface, prominent stamped factory trademark initials "ESCO" embossed on steel ribbing, crisp metallic texture with subtle cold steel specular highlights, macro lens f/2.8 focus, engineering material inspection style.`,
      promptFa: 'کلوزآپ ماکرو از آج میلگرد و علامت اختصاری برجسته کارخانه جهت تشخیص اصالت بار',
      aspectRatio: '4:3',
      style: 'Cinematic Studio',
      negativePrompt: 'smooth bar, paint, plastic, noisy grain, blur',
      altTextFa: `علامت اختصاری حک‌شده روی میلگرد استاندارد جهت تشخیص اصالت محصول`,
      captionFa: `نحوه بررسی علامت اختصاری و اصالت میلگرد پیش از تخلیه در کارگاه`
    },
    {
      id: 'img-warehouse-' + Date.now(),
      title: 'بسته‌بندی بندیل و بارگیری تریلی در بنگاه',
      type: 'Warehouse & Loading',
      promptEn: `Documentary photograph of professional logistics workers wearing safety helmets inspecting heavy flatbed truck trailer being loaded with 12-meter steel rebar bundles by industrial crane, certified digital weighing scale station in background, clean industrial shipyard setting.`,
      promptFa: 'بارگیری بندیل‌های میلگرد ۱۲ متری روی تریلی با جرثقیل و نظارت کارشناس کنترل کیفیت',
      aspectRatio: '16:9',
      style: 'Photorealistic',
      negativePrompt: 'accidents, unorganized, dark, low resolution',
      altTextFa: `فرآیند بارگیری و توزین دقیق محموله میلگرد با باسکول استاندارد در آهن اینجا`,
      captionFa: `بارگیری و ارسال سریع محموله فولادی به سراسر کشور با فاکتور رسمی`
    }
  ];

  // Social Broadcast Snippets
  const socialTelegram = `📢 **استعلام لحظه‌ای و راهنمای جامع خرید ${primaryKeyword}**

🔹 **بررسی اوزان و گریدهای استاندارد کارخانه‌ها:**
✅ تطابق ۱۰۰٪ اوزان شاخه‌ها با جدول اشتال
✅ عرضه گریدهای A2، A3 و A4 کارخانجات ذوب آهن اصفهان، نیشابور، ظفر بناب و کویر کاشان
✅ صدور فاکتور رسمی مالیاتی + ارائه سرتیفیکیت و برگه آنالیز آزمایشگاهی

📌 **محاسبه آنلاین وزن هر شاخه و استعلام فوری پیش‌فاکتور:**
🔗 ahaninja.com/prices/rebar

📞 **تماس مستقیم با واحد کارشناسی فروش آهن اینجا:**
☎️ ۰۲۱-XXXXXXXX
🆔 @ahaninja_support

#قیمت_میلگرد #بازار_آهن #آهن_اینجا #خرید_فولاد #جدول_اشتال`;

  const socialInstagram = `💡 قبل از خرید ${primaryKeyword}، حواست به این ۵ نکته باشه! 🏗️

ورق بزنید 👉
توی این پست یاد می‌گیری:
۱. چطور با یه فرمول ساده، وزن هر شاخه رو سرِ کارگاه حساب کنی 📏
۲. تفاوت میلگرد اصفهان و بناب چیه و کدوم برات به‌صرفه‌تره؟ 🏢
۳. از روی کد حک‌شده روی بدنه میلگرد، چطور اصالت بار رو تشخیص بدی؟ 🔍

💬 شما معمولاً برای پروژه‌تون از کدوم کارخونه میلگرد می‌خرید؟ برامون کامنت بذارید تا قیمت امروز درب کارخونه رو دایرکت بفرستیم!

📞 استعلام فوری و دریافت پیش‌فاکتور رسمی:
🌐 ahaninja.com
☎️ ۰۲۱-XXXXXXXX

#میلگرد #قیمت_آهن #آهن_اینجا #مهندسی_عمران #سازه_بتنی #ساختمان_سازی #جدول_وزن`;

  const socialLinkedIn = `تامین بهینه مقاطع فولادی در پروژه‌های عمرانی؛ اهمیت تطابق وزن شاخه با جدول اشتال و استعلام شفاف پیش‌فاکتور

در مدیریت پروژه‌های انبوه‌سازی و اسکلت بتنی، تلرانس وزنی میلگردهای کارخانجات مختلف تأثیر مستقیمی بر بهای تمام‌شده و برآوردهای مهندسی متره دارد. در این مقاله جامع در وبسایت «آهن اینجا»، موارد زیر به تفصیل تحلیل شده است:

• مقایسه عملکردی میلگردهای گرید A3 و A4 در تنش تسلیم و رفتار شکل‌پذیر
• آنالیز اقتصادی اختلاف وزن میلگرد کارخانجات سنگین (نظیر ذوب آهن اصفهان) و سبک/اقتصادی
• سازوکار بازرسی محموله در محل پروژه، آزمون‌های متالوگرافی و ترخیص فاکتور رسمی

مطالعه متن کامل و دسترسی به ماشین‌حساب محاسبه وزن آنلاین:
https://ahaninja.com/blog/${slug}

#مهندسی_سازه #مدیریت_پروژه #صنعت_فولاد #زنجیره_تامین #آهن_اینجا`;

  const contentDescription = `مقاله مرجع و پیلار با رویکرد B2B و B2C جهت راهنمایی خریداران و مهندسان عمران برای انتخاب بهترین گرید و سایز ${primaryKeyword}، محاسبه وزن با فرمول اشتال، تحلیل هزینه‌های باسکول و باربری و استعلام مستقیم پیش‌فاکتور رسمی از آهن اینجا.`;

  const contentBrief = `مقدمه و هوک بر اساس دغدغه هزینه‌های پنهان خرید آهن -> جدول اشتال و مقایسه کارخانه‌ها -> فرمول کارگاهی محاسبه وزن -> روش تشخیص اصالت و علامت اختصاری -> فرآیند استعلام قیمت و دریافت فاکتور رسمی -> بخش سؤالات متداول.`;

  const uniqueInformationGain = `ارائه جدول مقایسه وزنی ۴ کارخانه برتر (اصفهان، بناب، نیشابور، کاشان) به همراه فرمول تجربی محاسبه وزن و فرم نمونه چک‌لیست بازرسی محموله در پای کار.`;

  // Preserve locked fields if any
  const locked = existingRow?.isLockedFields || {};

  const rowId = existingRow?.id || 'row-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

  const mergedRow: ContentPlanRow = {
    id: rowId,
    title: locked.title && existingRow?.title ? existingRow.title : title,
    status: existingRow?.status || 'Brief Ready',
    brandId: brand.id,
    brandName: brand.name,
    websiteId: website.id,
    author: locked.author && existingRow?.author ? existingRow.author : 'تیم تحریریه تخصصی آهن اینجا',
    contentType: locked.contentType && existingRow?.contentType ? existingRow.contentType : classification.contentType,
    productType: locked.productType && existingRow?.productType ? existingRow.productType : classification.productType,
    topic: locked.topic && existingRow?.topic ? existingRow.topic : title,
    primaryKeyword: locked.primaryKeyword && existingRow?.primaryKeyword ? existingRow.primaryKeyword : primaryKeyword,
    secondaryKeywords: locked.secondaryKeywords && existingRow?.secondaryKeywords ? existingRow.secondaryKeywords : secondary,
    lsiKeywords: locked.lsiKeywords && existingRow?.lsiKeywords ? existingRow.lsiKeywords : lsi,
    entities: locked.entities && existingRow?.entities ? existingRow.entities : entities,
    searchIntent: locked.searchIntent && existingRow?.searchIntent ? existingRow.searchIntent : classification.intent,
    funnelStage: locked.funnelStage && existingRow?.funnelStage ? existingRow.funnelStage : classification.funnelStage,
    targetAudience: locked.targetAudience && existingRow?.targetAudience ? existingRow.targetAudience : brand.targetAudienceDefaults,
    wordCount: locked.wordCount && existingRow?.wordCount ? existingRow.wordCount : wordCount,
    seoTitle: locked.seoTitle && existingRow?.seoTitle ? existingRow.seoTitle : seoTitles.recommended,
    seoTitleVariants: seoTitles.variants,
    metaDescription: locked.metaDescription && existingRow?.metaDescription ? existingRow.metaDescription : metaDescriptions.recommended,
    metaDescriptionVariants: metaDescriptions.variants,
    urlSlug: locked.urlSlug && existingRow?.urlSlug ? existingRow.urlSlug : slug,
    h1: locked.h1 && existingRow?.h1 ? existingRow.h1 : headings.h1,
    h2: locked.h2 && existingRow?.h2 ? existingRow.h2 : headings.h2,
    h3: locked.h3 && existingRow?.h3 ? existingRow.h3 : headings.h3,
    faq: locked.faq && existingRow?.faq ? existingRow.faq : faqs,
    anchorText: locked.anchorText && existingRow?.anchorText ? existingRow.anchorText : primaryKeyword,
    internalLinks: locked.internalLinks && existingRow?.internalLinks ? existingRow.internalLinks : internalLinks,
    externalLinks: [
      {
        sourceName: 'سازمان ملی استاندارد ایران (استاندارد ملی ISIRI 3132)',
        sourceUrl: 'http://standard.isiri.gov.ir',
        citationType: 'Government / Standard'
      },
      {
        sourceName: 'دفتر مقررات ملی ساختمان (مبحث نهم - طرح و اجرای ساختمان‌های بتن آرمه)',
        sourceUrl: 'https://inbr.ir',
        citationType: 'Government / Standard'
      }
    ],
    cta: {
      type: 'Contact / Phone Call',
      headline: 'نیاز به استعلام فوری قیمت و دریافت پیش‌فاکتور رسمی دارید؟',
      buttonText: 'مشاوره رایگان و استعلام قیمت با کارشناسان آهن اینجا',
      placement: 'Mid-Content + End'
    },
    schema: eeatSchema.schema,
    eeat: eeatSchema.eeat,
    uniqueInformationGain: locked.uniqueInformationGain && existingRow?.uniqueInformationGain ? existingRow.uniqueInformationGain : uniqueInformationGain,
    contentDescription: locked.contentDescription && existingRow?.contentDescription ? existingRow.contentDescription : contentDescription,
    contentBrief: locked.contentBrief && existingRow?.contentBrief ? existingRow.contentBrief : contentBrief,
    imagePrompts: locked.imagePrompts && existingRow?.imagePrompts ? existingRow.imagePrompts : imagePrompts,
    imageAltText: locked.imageAltText && existingRow?.imageAltText ? existingRow.imageAltText : imagePrompts[0].altTextFa,
    imageCaption: locked.imageCaption && existingRow?.imageCaption ? existingRow.imageCaption : imagePrompts[0].captionFa,
    socialTelegram: locked.socialTelegram && existingRow?.socialTelegram ? existingRow.socialTelegram : socialTelegram,
    socialInstagram: locked.socialInstagram && existingRow?.socialInstagram ? existingRow.socialInstagram : socialInstagram,
    socialLinkedIn: locked.socialLinkedIn && existingRow?.socialLinkedIn ? existingRow.socialLinkedIn : socialLinkedIn,
    priority: (classification.intent === 'Transactional' ? 'Critical' : classification.intent === 'Comparison' ? 'High' : 'Medium') as PriorityLevel,
    seoScore: 94,
    trafficPotential: 'High' as PotentialLevel,
    businessPotential: 'High' as PotentialLevel,
    publicationDate: existingRow?.publicationDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    lastUpdated: new Date().toISOString(),
    createdAt: existingRow?.createdAt || new Date().toISOString(),
    gscData: existingRow?.gscData,
    ga4Data: existingRow?.ga4Data,
    recommendation: 'تولید محتوا و پرامپت آماده است. جهت انتشار در سایت و شبکه‌های اجتماعی اقدام فرمایید.',
    isLockedFields: locked,
    aiGenerationStatus: 'completed'
  };

  return mergedRow;
}
