import { Brand, WebsiteProfile } from '../types';

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-steel-1',
    name: 'آهن اینجا',
    legalName: 'شرکت تجارت فولاد آریا پویان',
    website: 'https://ahaninja.com',
    industry: 'Steel',
    businessDescription: 'مرجع تخصصی استعلام قیمت لحظه‌ای آهن‌آلات، میلگرد، تیرآهن، لوله و ورق‌های فولادی و مشاوره مهندسی خرید پروژه‌های عمرانی در سراسر کشور.',
    productsServices: [
      { id: 'p1', name: 'میلگرد اصفهان و نیشابور', description: 'تأمین مستقیم انواع میلگرد آجدار A3 و A4 از کارخانجات معتبر', category: 'میلگرد' },
      { id: 'p2', name: 'تیرآهن و هاش سنگین', description: 'فروش تیرآهن IPE و هاش اروپایی با ارائه برگه آنالیز آزمایشگاهی', category: 'تیرآهن' },
      { id: 'p3', name: 'ورق سیاه و روغنی', description: 'انواع ورق فولادی مبارکه و کاویان با ضخامت‌های متنوع', category: 'ورق فولادی' },
      { id: 'p4', name: 'مشاوره و صدور پیش‌فاکتور رسمی', description: 'مشاوره فنی رایگان و محاسبه دقیق تناژ و وزن آهن‌آلات سازه', category: 'خدمات' }
    ],
    targetAudience: 'مهندسان عمران، پیمانکاران ساختمانی، خریداران عمده مصالح، انبوه‌سازان و مدیران تدارکات پروژه‌های صنعتی',
    brandPositioning: 'سریع‌ترین و شفاف‌ترین مرجع تأمین مستقیم مقاطع فولادی با تضمین کیفیت و برگه سرتیفیکیت کارخانه',
    usp: 'تحویل در محل پروژه با بارنامه رسمی، امکان مرجوعی در صورت مغایرت آنالیز، و تسویه اعتباری برای پروژه‌های بزرگ',
    brandValues: ['شفافیت در قیمت‌گذاری', 'تعهد به زمان تحویل', 'تضمین اصالت بار', 'مشاوره تخصصی و مهندسی'],
    brandVoice: 'Expert',
    forbiddenClaims: ['ارزان‌ترین قیمت جهان بدون سند', 'تضمین سود قطعی ساخت‌وساز', 'ادعای مالکیت انحصاری تمامی ذوب‌آهن‌های کشور'],
    preferredTerms: ['قیمت مصوب', 'برگه آنالیز آزمایشگاهی', 'مقاطع استاندارد ملی', 'تأمین مستقیم از درب کارخانه'],
    forbiddenTerms: ['جنس درجه سه', 'بار بدون فاکتور', 'آهن غیراستاندارد'],
    competitors: ['آهن آنلاین', 'آهن‌مکان', 'فولاد حامیران', 'پیام تجارت'],
    mainLocations: ['تهران - بازار آهن شادآباد', 'اصفهان', 'مشهد', 'تبریز', 'بندرعباس'],
    socialProfiles: [
      { id: 'sp1', platform: 'Telegram', url: 'https://t.me/ahaninja_daily' },
      { id: 'sp2', platform: 'Instagram', url: 'https://instagram.com/ahaninja' },
      { id: 'sp3', platform: 'LinkedIn', url: 'https://linkedin.com/company/ahaninja' }
    ],
    contactInfo: {
      phone: '021-88997766',
      email: 'sales@ahaninja.com',
      address: 'تهران، بزرگراه فتح، مجتمع تجارت آهن شادآباد، بلوک ۴'
    },
    knowledgeBase: {
      aboutBrand: 'آهن اینجا از سال ۱۳۸۸ به عنوان تأمین‌کننده مقاطع فولادی و مشاور پروژه‌های ساختمانی فعالیت می‌کند.',
      companyHistory: 'بیش از ۱۵ سال تجربه مستمر در حوزه تجارت فولاد و تأمین بیش از ۵۰۰ هزار تن مقاطع برای پروژه‌های ملی.',
      expertise: 'آنالیز متالورژی مقاطع، شناخت جدول اشتال، بهینه‌سازی پرت میلگرد و محاسبات وزن میلگرد.',
      industriesServed: 'ساختمان‌سازی، پل‌سازی، صنایع نفت و گاز، سوله‌سازی، خطوط انتقال انرژی.',
      certifications: ['گواهینامه ایزو ۹۰۰۱ مدیریت کیفیت', 'عضویت در اتحادیه صنف آهن و فولاد کشور'],
      awards: ['تندیس برترین تأمین‌کننده صنایع ساختمانی سال ۱۴۰۲'],
      editorialGuidelines: 'محتوا باید به شدت داده‌محور، مهندسی و مستند به استانداردهای ISIRI و ASTM باشد. از کلی‌گویی و بزرگ‌نمایی پرهیز شود.',
      contentRules: ['ذکر وزن واقعی مقاطع بر اساس جدول اشتال', 'ارجاع به کارخانجات مبدا', 'لحن کارشناسی و لحن محترمانه B2B']
    },
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-08-10T14:30:00Z'
  },
  {
    id: 'brand-saas-2',
    name: 'تک‌نوین | TechNovin',
    legalName: 'نوآوران داده‌پرداز پایا',
    website: 'https://technovin.io',
    industry: 'SaaS',
    businessDescription: 'پلتفرم ابری اتوماسیون بازاریابی، مدیریت لیدها و تحلیل داده‌های کسب‌وکار مبتنی بر هوش مصنوعی برای استارتاپ‌ها و شرکت‌های مدرن.',
    productsServices: [
      { id: 'tp1', name: 'CRM ابری تک‌نوین', description: 'سامانه یکپارچه مدیریت ارتباط با مشتریان و خط فروش', category: 'نرم‌افزار' },
      { id: 'tp2', name: 'موتور هوش مصنوعی پیش‌بینی فروش', description: 'الگوریتم‌های پیشرفته پیش‌بینی ریزش و فرصت‌های خرید مجدد', category: 'هوش مصنوعی' },
      { id: 'tp3', name: 'سرویس پیام‌رسانی خودکار و اومنی‌چنل', description: 'ارسال هوشمند ایمیل، پیامک و وب‌هوک بر اساس رفتار کاربر', category: 'اتوماسیون' }
    ],
    targetAudience: 'بنیان‌گذاران استارتاپ، مدیران ارشد بازاریابی (CMO)، سرپرستان تیم‌های فروش و توسعه‌دهندگان',
    brandPositioning: 'هوشمندترین و مدرن‌ترین زیرساخت رشد درآمد و مدیریت سرنخ در خاورمیانه',
    usp: 'راه‌اندازی در کمتر از ۵ دقیقه با APIهای مدرن، اتصال بومی به سامانه‌های پرداخت و پشتیبانی ۲۴ ساعته',
    brandValues: ['نوآوری مستمر', 'امنیت داده‌های سازمانی', 'سادگی در تجربه کاربری', 'رویکرد نتیجه‌محور'],
    brandVoice: 'Technical',
    forbiddenClaims: ['افزایش ۱۰۰۰ درصدی فروش در یک شب', 'جایگزینی کامل منابع انسانی'],
    preferredTerms: ['اتوماسیون هوشمند', 'پایپ‌لاین فروش', 'نرخ تبدیل لید', 'هوش تجاری'],
    forbiddenTerms: ['جادوی فروش', 'سیستم هک رشد معجزه‌آسا'],
    competitors: ['دیدار CRM', 'پارس‌ویتایگر', 'پیام‌گستر', 'HubSpot'],
    mainLocations: ['تهران - پارک علم و فناوری', 'دبی - Hub71'],
    socialProfiles: [
      { id: 'tsp1', platform: 'LinkedIn', url: 'https://linkedin.com/company/technovin-io' },
      { id: 'tsp2', platform: 'Twitter/X', url: 'https://x.com/technovin_io' },
      { id: 'tsp3', platform: 'GitHub', url: 'https://github.com/technovin' }
    ],
    contactInfo: {
      phone: '021-91008877',
      email: 'hi@technovin.io',
      address: 'تهران، بزرگراه شیخ فضل‌الله، برج فناوری نوآوران'
    },
    knowledgeBase: {
      aboutBrand: 'تک‌نوین توسط گروهی از فارغ‌التحصیلان دانشگاه شریف و کهنه‌کاران صنعت SaaS در سال ۱۳۹۹ پایه‌گذاری شد.',
      companyHistory: 'پوشش بیش از ۱۲۰۰ شرکت فعال و پردازش ماهانه بیش از ۵۰ میلیون رویداد فروش.',
      expertise: 'توسعه معماری Microservices، یادگیری ماشین در فروش، بهینه‌سازی CAC و LTV.',
      industriesServed: 'فین‌تک، سلامت، تجارت الکترونیک، آموزش آنلاین، گردشگری.',
      certifications: ['گواهینامه دانش‌بنیان نوع ۱', 'ایزو ۲۷۰۰۱ امنیت اطلاعات'],
      awards: ['استارتاپ برتر سال در الکامپ استارز'],
      editorialGuidelines: 'محتوا باید همراه با بنچ‌مارک‌های واقعی، مثال‌های عملی کد/API و نمودارهای مقایسه‌ای باشد.',
      contentRules: ['ارائه چک‌لیست اجرایی در انتهای مقالات', 'مقایسه منصفانه فیچرها', 'لحن مدرن و فنی']
    },
    createdAt: '2026-02-15T09:00:00Z',
    updatedAt: '2026-07-20T11:00:00Z'
  },
  {
    id: 'brand-health-3',
    name: 'هلس‌پلاس | HealthPlus',
    legalName: 'کلینیک و داروخانه تخصصی سلامت نوین',
    website: 'https://healthplus.clinic',
    industry: 'Healthcare',
    businessDescription: 'مرکز جامع پزشکی، تغذیه و سلامت خانواده با نظارت مستقیم پزشکان فوق تخصص و مقالات علمی بازبینی‌شده.',
    productsServices: [
      { id: 'hp1', name: 'ویزیت آنلاین پزشک متخصص', description: 'مشاوره آنلاین ویدئویی با فوق‌تخصص‌های قلب، گوارش و غدد', category: 'خدمات درمانی' },
      { id: 'hp2', name: 'رژیم آنلاین اختصاصی و بالینی', description: 'تنظیم برنامه تغذیه شخصی‌سازی‌شده توسط متخصصین رژیم‌درمانی', category: 'تغذیه' },
      { id: 'hp3', name: 'چکاپ سلامت در منزل', description: 'نمونه‌گیری و آزمایش‌های دوره‌ای خون در محل بدون نیاز به مراجعه حضوری', category: 'آزمایشگاه' }
    ],
    targetAudience: 'افراد پیگیر سلامتی، بیماران دارای شرایط خاص (دیابت، تیروئید)، مادران و خانواده‌ها',
    brandPositioning: 'معتبرترین مرجع سلامت مبتنی بر شواهد علمی (EBM) و بازبینی‌شده توسط هیئت علمی پزشکان',
    usp: 'تمام محتواها توسط پزشک دارای نظام‌پزشکی تأیید می‌شود و منابع مقالات مستقیم از PubMed و WHO است.',
    brandValues: ['صداقت پزشکی', 'حفظ محرمانگی بیمار', 'استناد به شواهد علمی', 'دسترسی عادلانه به سلامت'],
    brandVoice: 'Authoritative',
    forbiddenClaims: ['درمان قطعی سرطان با داروی گیاهی', 'لاغری ۱۰ کیلو در ۳ روز', 'جایگزینی داروهای تجویز شده پزشک'],
    preferredTerms: ['بر اساس پژوهش‌های بالینی', 'تحت نظر پزشک متخصص', 'مطالعات دوسوکور', 'شواهد علمی'],
    forbiddenTerms: ['معجزه درمانی', 'راز پنهان طب سنتی', 'داروی صددرصد تضمینی'],
    competitors: ['دکترتو', 'اسنپ دکتر', 'پذیرش ۲۴', 'سلامت‌نیوز'],
    mainLocations: ['تهران', 'شیراز', 'مشهد', 'اصفهان'],
    socialProfiles: [
      { id: 'hsp1', platform: 'Instagram', url: 'https://instagram.com/healthplus.clinic' },
      { id: 'hsp2', platform: 'Aparat', url: 'https://aparat.com/healthplus' }
    ],
    contactInfo: {
      phone: '021-22334455',
      email: 'info@healthplus.clinic',
      address: 'تهران، خیابان ولیعصر، بالاتر از توانیر، ساختمان پزشکان سلامت'
    },
    knowledgeBase: {
      aboutBrand: 'مرکز سلامت هلس‌پلاس با هدف مبارزه با اطلاعات نادرست پزشکی در وب فارسی راه‌اندازی شد.',
      companyHistory: '۱۰ سال خدمت‌رسانی درمانی و انتشار بیش از ۳۰۰۰ مقاله پزشکی داوری شده.',
      expertise: 'تغذیه بالینی، طب پیشگیری، فارماکولوژی و راهنماهای طبابت بالینی.',
      industriesServed: 'خدمات درمانی، بهداشت فردی، داروخانه‌ای و مکمل‌های مجاز.',
      certifications: ['پروانه رسمی وزارت بهداشت، درمان و آموزش پزشکی', 'تأییدیه کمیته اخلاق در پژوهش'],
      awards: ['نشان تعالی در ترویج سواد سلامت سلامت دیجیتال'],
      editorialGuidelines: 'رعایت پروتکل YMYL گوگل و درج سلب مسئولیت پزشکی (Medical Disclaimer) در ابتدای مقالات اجباری است.',
      contentRules: ['ذکر نام پزشک نویسنده و پزشک بازبین', 'ارجاع به مقالات معتبر PubMed و UpToDate', 'لحن امین، همدلانه و دقیق']
    },
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  }
];

export const INITIAL_WEBSITES: WebsiteProfile[] = [
  {
    id: 'web-steel-1',
    brandId: 'brand-steel-1',
    name: 'سایت اصلی آهن اینجا',
    domain: 'ahaninja.com',
    url: 'https://ahaninja.com',
    language: 'fa',
    country: 'ایران',
    currency: 'تومان',
    mainCategory: 'فولاد و مصالح ساختمانی',
    websiteType: 'Corporate',
    sitemapUrl: 'https://ahaninja.com/sitemap_index.xml',
    existingUrls: [
      { id: 'u1', url: 'https://ahaninja.com/price/rebar', title: 'قیمت لحظه‌ای میلگرد تمام کارخانه‌ها', category: 'قیمت‌گذاری' },
      { id: 'u2', url: 'https://ahaninja.com/blog/rebar-weight-calculation', title: 'راهنمای فرمول محاسبه وزن میلگرد بر اساس جدول اشتال', category: 'آموزش سئو' },
      { id: 'u3', url: 'https://ahaninja.com/price/beam-ipe', title: 'قیمت تیرآهن اصفهان و فایکو', category: 'قیمت‌گذاری' },
      { id: 'u4', url: 'https://ahaninja.com/guide/steel-buying-tips', title: '۱۰ نکته حیاتی قبل از خرید آهن‌آلات ساختمانی', category: 'راهنمای خرید' }
    ],
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'web-saas-1',
    brandId: 'brand-saas-2',
    name: 'سایت تک‌نوین',
    domain: 'technovin.io',
    url: 'https://technovin.io',
    language: 'fa',
    country: 'ایران',
    currency: 'تومان / تتر',
    mainCategory: 'SaaS و ابزارهای هوش مصنوعی',
    websiteType: 'SaaS',
    sitemapUrl: 'https://technovin.io/sitemap.xml',
    existingUrls: [
      { id: 'u5', url: 'https://technovin.io/features/crm', title: 'امکانات نرم‌افزار CRM تک‌نوین', category: 'محصول' },
      { id: 'u6', url: 'https://technovin.io/blog/sales-pipeline-stages', title: 'مراحل ساخت پایپ‌لاین فروش حرفه‌ای در کسب‌وکارهای B2B', category: 'بلاگ' },
      { id: 'u7', url: 'https://technovin.io/pricing', title: 'پلن‌ها و تعرفه اشتراک ابری تک‌نوین', category: 'تعرفه' }
    ],
    createdAt: '2026-02-15T09:00:00Z'
  }
];
