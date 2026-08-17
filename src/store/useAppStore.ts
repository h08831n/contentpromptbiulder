import { useState, useEffect } from 'react';
import {
  SEOProject,
  BrandIdentity,
  WebsiteProfile,
  CompiledPromptResult,
  LanguageCode
} from '../types';
import { PRESET_TEMPLATES, SEO_PRESETS } from '../data/presets';
import { compileMasterSEOPrompt } from '../engine/promptCompiler';

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
      'تنش تسلیم فولاد (Yield Strength)',
      'آج دوکی و یکنواخت',
      'بندیل میلگرد و تعداد شاخه',
      'برگه آنالیز سرتیفیکیت کوپالن',
      'کرایه حمل تریلی آهن و باسکول'
    ],
    entities: [
      'ذوب آهن اصفهان (ESCO)',
      'فولاد خراسان (نیشابور)',
      'مجتمع فولاد ظفر بناب',
      'فولاد کویر کاشان',
      'آیین‌نامه بتن ایران (آبا)',
      'جدول اشتال مهندسی (Stahl Table)'
    ],
    negativeKeywords: ['میلگرد بستر ارزان دست دوم دیوار', 'ضایعات آهن قراضه', 'فروش اقساطی بدون کارمزد']
  },
  serp: {
    serpFeatures: ['Featured Snippet', 'People Also Ask', 'Table Rich Result', 'Image Pack'],
    targetZeroClick: true,
    featuredSnippetGoal: 'Table',
    competitors: [
      {
        id: 'comp-1',
        urlOrTitle: 'آهن‌مکان / دانشنامه خرید میلگرد',
        strengths: 'جدول کامل سایزبندی و وزن',
        weaknesses: 'عدم توضیح درباره هزینه‌های باسکول، باربری و نحوه استعلام پیش‌فاکتور رسمی با فاکتور معتبر',
        wordCountEstimate: 2200
      },
      {
        id: 'comp-2',
        urlOrTitle: 'مرکز آهن / نکات مهم خرید میلگرد',
        strengths: 'گرافیک و ویدیوهای معرفی',
        weaknesses: 'متن کلی‌گویی دارد و فرمول‌های محاسبه تجربی و نکات بازرسی پای کار را ارائه نکرده است',
        wordCountEstimate: 1800
      }
    ],
    paaQuestions: [
      'بهترین کارخانه تولیدکننده میلگرد در ایران کدام است؟',
      'چگونه وزن یک شاخه میلگرد ۱۲ متری را بدون ترازو و با فرمول حساب کنیم؟',
      'تفاوت میلگرد A3 و A4 در پروژه‌های ساختمانی چیست؟',
      'هر بندیل میلگرد چند شاخه و چند تن است و چطور تحویل گرفته می‌شود؟'
    ]
  },
  topicalAuthority: {
    contentRole: 'Pillar (محتوای جامع مرجع)',
    parentPillarUrl: 'https://ahaninja.com/blog/rebar-buying-guide',
    cannibalizationSafeguards: 'تمرکز این مقاله دقیقاً بر فرآیند انتخاب، استانداردهای فنی و خرید میلگرد است و نباید با صفحات جدول قیمت روزانه میلگرد هم‌پوشانی محتوایی داشته باشد.',
    uniqueInformationGain: 'ارائه جدول مقایسه وزنی ۴ کارخانه برتر (اصفهان، بناب، نیشابور، کاشان) به همراه فرمول تجربی محاسبه وزن و فرم نمونه چک‌لیست بازرسی محموله در پای کار',
    freshnessSignals: true
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
  },
  internalLinking: {
    enabled: true,
    strategy: 'Strict Manual URLs',
    manualLinks: [
      {
        id: 'link-1',
        targetUrl: 'https://ahaninja.com/prices/rebar',
        suggestedAnchor: 'قیمت روز میلگرد',
        anchorStrategy: 'Exact Match',
        relevanceNote: 'ارجاع در بخش استعلام قیمت لحظه‌ای کارخانجات در آهن اینجا'
      },
      {
        id: 'link-2',
        targetUrl: 'https://ahaninja.com/tools/steel-weight-calculator',
        suggestedAnchor: 'محاسبه آنلاین وزن میلگرد',
        anchorStrategy: 'Partial / Phrase Match',
        relevanceNote: 'ارجاع در بخش فرمول محاسبه وزن شاخه'
      },
      {
        id: 'link-3',
        targetUrl: 'https://ahaninja.com/prices/beam',
        suggestedAnchor: 'قیمت تیرآهن',
        anchorStrategy: 'Exact Match',
        relevanceNote: 'ارجاع در بخش مقایسه سبد خرید سازه فلزی و بتنی'
      }
    ],
    maxInternalLinks: 5
  },
  externalCitations: [
    {
      id: 'ext-1',
      sourceName: 'سازمان ملی استاندارد ایران (استاندارد ملی ISIRI 3132)',
      sourceUrl: 'http://standard.isiri.gov.ir',
      citationType: 'Government / Standard'
    },
    {
      id: 'ext-2',
      sourceName: 'مقررات ملی ساختمان ایران (مبحث نهم - طرح و اجرای ساختمان‌های بتن آرمه)',
      sourceUrl: 'https://inbr.ir',
      citationType: 'Government / Standard'
    }
  ],
  visualElements: [
    'تصویر شاخص با پرامپت DALL-E',
    'جدول مقایسه یا مشخصات فنی',
    'اینفوگرافیک / فلوچارت متنی',
    'باکس نکته کلیدی / هشدار طلایی',
    'چک‌لیست تعاملی مارک‌داون'
  ],
  schemaAndEEAT: {
    schemaTypes: ['Article', 'FAQPage', 'HowTo', 'BreadcrumbList'],
    authorName: 'مهندس محمدرضا سلیمانی',
    authorTitle: 'کارشناس ارشد متالورژی و مشاور ارشد تامین فولاد در آهن اینجا',
    authorBio: 'با بیش از ۱۴ سال سابقه در کنترل کیفیت کارخانجات ذوب، نظارت پروژه‌های عمرانی و تحلیل زنجیره تامین فولاد در ایران.',
    authorLinkedInOrUrl: 'https://linkedin.com/in/reza-soleimani-steel',
    includeExpertReviewBadge: true,
    factCheckingSources: 'استاندارد ملی ۳۱۳۲ ایران، جدول اشتال و آنالیز متالوگرافی آزمایشگاه همکار استاندارد',
    geoOptimizedForAI: true
  },
  ctrAndCTA: {
    metaTitleVariants: [
      'راهنمای خرید میلگرد و تیرآهن؛ ۵ نکته حیاتی قبل از سفارش در آهن اینجا (۱۴۰۴)',
      'چگونه میلگرد استاندارد بخریم؟ راهنمای کامل استعلام قیمت و جدول وزن کارخانه‌ها',
      'راهنمای خرید میلگرد ذوب آهن و بناب + فرمول محاسبه وزن هر شاخه'
    ],
    metaDescription: 'راهنمای جامع خرید میلگرد از آهن اینجا: آموزش محاسبه وزن هر شاخه، بررسی تفاوت میلگرد A3 و A2، تشخیص اصالت کالا و استعلام مستقیم قیمت از کارخانه با فاکتور رسمی.',
    urlSlug: 'rebar-buying-guide',
    ctaType: 'Contact / Phone Call',
    ctaHeadline: 'نیاز به استعلام فوری قیمت و دریافت پیش‌فاکتور رسمی دارید؟',
    ctaButtonText: 'مشاوره رایگان و استعلام قیمت با کارشناسان آهن اینجا',
    ctaPlacement: 'Mid-Content + End',
    localCityOrProvince: 'سراسر ایران (تحویل در انبار تهران و اصفهان یا درب کارخانه)'
  },
  customDirectives: 'لطفاً در تمامی بخش‌ها مثال‌های عددی ملموس از پروژه‌های ساختمانی معمولی در ایران ذکر شود.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Global Store State Holder
interface GlobalState {
  projects: SEOProject[];
  currentProjectId: string;
  brands: BrandIdentity[];
  websites: WebsiteProfile[];
  activeStep: number;
  activeView: 'wizard' | 'dashboard';
  language: LanguageCode;
  isPromptPreviewOpen: boolean;
  isBrandModalOpen: boolean;
  isPresetsModalOpen: boolean;
  generatedPromptResult: CompiledPromptResult | null;
  notification: string | null;
}

const STORAGE_KEY = 'seo_master_builder_store_v3_ahaninja';

function loadInitialState(): GlobalState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        projects: parsed.projects?.length ? parsed.projects : [DEFAULT_PROJECT],
        currentProjectId: parsed.currentProjectId || DEFAULT_PROJECT.id,
        brands: parsed.brands?.length ? parsed.brands : [DEFAULT_BRAND],
        websites: parsed.websites?.length ? parsed.websites : [DEFAULT_WEBSITE],
        activeStep: parsed.activeStep || 1,
        activeView: parsed.activeView || 'wizard',
        language: parsed.language || 'fa',
        isPromptPreviewOpen: false,
        isBrandModalOpen: false,
        isPresetsModalOpen: false,
        generatedPromptResult: null,
        notification: null
      };
    }
  } catch (e) {
    console.error('Failed to load saved state from localStorage:', e);
  }

  return {
    projects: [DEFAULT_PROJECT],
    currentProjectId: DEFAULT_PROJECT.id,
    brands: [DEFAULT_BRAND],
    websites: [DEFAULT_WEBSITE],
    activeStep: 1,
    activeView: 'wizard',
    language: 'fa',
    isPromptPreviewOpen: false,
    isBrandModalOpen: false,
    isPresetsModalOpen: false,
    generatedPromptResult: null,
    notification: null
  };
}

let state: GlobalState = loadInitialState();
const listeners = new Set<() => void>();

function notify() {
  try {
    const toPersist = {
      projects: state.projects,
      currentProjectId: state.currentProjectId,
      brands: state.brands,
      websites: state.websites,
      activeStep: state.activeStep,
      activeView: state.activeView,
      language: state.language
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
  listeners.forEach(l => l());
}

export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const currentProject = state.projects.find(p => p.id === state.currentProjectId) || state.projects[0] || DEFAULT_PROJECT;
  const currentBrand = state.brands.find(b => b.id === currentProject.brandId) || state.brands[0] || DEFAULT_BRAND;
  const currentWebsite = state.websites.find(w => w.id === currentProject.websiteId) || state.websites[0] || DEFAULT_WEBSITE;

  const setActiveStep = (step: number) => {
    state.activeStep = Math.max(1, Math.min(12, step));
    notify();
  };

  const nextStep = () => {
    setActiveStep(state.activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(state.activeStep - 1);
  };

  const setActiveView = (view: 'wizard' | 'dashboard') => {
    state.activeView = view;
    notify();
  };

  const setLanguage = (lang: LanguageCode) => {
    state.language = lang;
    notify();
  };

  const setPromptPreviewOpen = (open: boolean) => {
    state.isPromptPreviewOpen = open;
    notify();
  };

  const setBrandModalOpen = (open: boolean) => {
    state.isBrandModalOpen = open;
    notify();
  };

  const setPresetsModalOpen = (open: boolean) => {
    state.isPresetsModalOpen = open;
    notify();
  };

  const showNotification = (msg: string) => {
    state.notification = msg;
    notify();
  };

  const clearNotification = () => {
    state.notification = null;
    notify();
  };

  const updateCurrentProject = (updater: Partial<SEOProject> | ((prev: SEOProject) => Partial<SEOProject>)) => {
    state.projects = state.projects.map(p => {
      if (p.id === currentProject.id) {
        const changes = typeof updater === 'function' ? updater(p) : updater;
        return { ...p, ...changes, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    notify();
  };

  const selectProject = (id: string) => {
    state.currentProjectId = id;
    notify();
  };

  const createProject = (title = 'پروژه جدید سئو', brandId?: string, websiteId?: string) => {
    const newProj: SEOProject = {
      ...DEFAULT_PROJECT,
      id: 'proj-' + Date.now(),
      articleTitle: title,
      topic: title,
      brandId: brandId || state.brands[0]?.id || DEFAULT_BRAND.id,
      websiteId: websiteId || state.websites[0]?.id || DEFAULT_WEBSITE.id,
      primaryKeyword: title.slice(0, 30),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.projects = [newProj, ...state.projects];
    state.currentProjectId = newProj.id;
    state.activeStep = 1;
    notify();
    return newProj;
  };

  const deleteProject = (id: string) => {
    if (state.projects.length <= 1) return;
    state.projects = state.projects.filter(p => p.id !== id);
    if (state.currentProjectId === id) {
      state.currentProjectId = state.projects[0].id;
    }
    notify();
  };

  const cloneProject = (id: string) => {
    const target = state.projects.find(p => p.id === id);
    if (!target) return;
    const cloned: SEOProject = {
      ...target,
      id: 'proj-' + Date.now(),
      articleTitle: `${target.articleTitle} (کپی)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.projects = [cloned, ...state.projects];
    state.currentProjectId = cloned.id;
    notify();
    showNotification('پروژه با موفقیت تکثیر شد.');
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESET_TEMPLATES.find(p => p.id === presetId);
    if (!preset) return;
    updateCurrentProject(prev => ({
      ...preset.defaults,
      articleTitle: preset.defaults.articleTitle || prev.articleTitle,
      topic: preset.defaults.topic || prev.topic,
      contentType: preset.contentType || prev.contentType,
      primaryKeyword: preset.defaults.primaryKeyword || prev.primaryKeyword
    }));
  };

  const addBrand = (brand: BrandIdentity) => {
    state.brands = [...state.brands, brand];
    notify();
  };

  const updateBrand = (id: string, updates: Partial<BrandIdentity>) => {
    state.brands = state.brands.map(b => b.id === id ? { ...b, ...updates } : b);
    notify();
  };

  const deleteBrand = (id: string) => {
    if (state.brands.length <= 1) return;
    state.brands = state.brands.filter(b => b.id !== id);
    notify();
  };

  const selectBrand = (id: string) => {
    updateCurrentProject({ brandId: id });
  };

  const compilePrompt = () => {
    const res = compileMasterSEOPrompt(currentProject, currentBrand, currentWebsite);
    state.generatedPromptResult = res;
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
    activeStep: state.activeStep,
    activeView: state.activeView,
    language: state.language,
    isPromptPreviewOpen: state.isPromptPreviewOpen,
    isBrandModalOpen: state.isBrandModalOpen,
    isPresetsModalOpen: state.isPresetsModalOpen,
    generatedPromptResult: state.generatedPromptResult,
    notification: state.notification,

    // Actions
    setActiveStep,
    nextStep,
    prevStep,
    setActiveView,
    setLanguage,
    setPromptPreviewOpen,
    setBrandModalOpen,
    setPresetsModalOpen,
    showNotification,
    clearNotification,
    updateCurrentProject,
    selectProject,
    createProject,
    deleteProject,
    cloneProject,
    applyPreset,
    addBrand,
    updateBrand,
    deleteBrand,
    selectBrand,
    compilePrompt
  };
}
