import { IndustryEntityItem, KnowledgeGraphRelationship } from '../types';
import { STEEL_REBAR_STAHL_TABLE, STEEL_FACTORIES_IRAN, STEEL_FORMULAS } from './steelData';

export const STEEL_INDUSTRY_ENTITIES: IndustryEntityItem[] = [
  // Products
  {
    id: 'prod-rebar',
    nameFa: 'میلگرد آجدار و ساده',
    nameEn: 'Rebar / Deformed Steel Bar',
    type: 'Product',
    industry: 'Steel',
    attributes: {
      grades: ['A1 (ساده)', 'A2 (آج ۳۴۰)', 'A3 (آج ۴۰۰)', 'A4 (آج ۵۰۰)'],
      standards: ['ISIRI 3132', 'ASTM A615', 'DIN 488', 'BS 4449'],
      branchLength: '۱۲ متر (شاخه) و کلاف',
      mainSizes: [8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32]
    },
    descriptionFa: 'مقاطع فولادی دایره‌ای شکل آجدار یا ساده مورد استفاده در بتن مسلح جهت افزایش مقاومت کششی سازه‌های ساختمانی و پل‌ها.',
    relatedEntityIds: ['mfg-esco', 'mfg-ksr', 'mfg-zafar', 'mfg-kavir', 'mfg-faico', 'tool-rebar-calc'],
    targetKeywords: ['قیمت میلگرد', 'خرید میلگرد', 'وزن میلگرد', 'جدول اشتال میلگرد', 'میلگرد اصفهان', 'میلگرد بناب'],
    recommendedInternalUrl: 'https://ahaninja.com/prices/rebar'
  },
  {
    id: 'prod-beam',
    nameFa: 'تیرآهن IPE و هاش سنگین IPB',
    nameEn: 'I-Beam (IPE) & H-Beam (IPB/HEA/HEB)',
    type: 'Product',
    industry: 'Steel',
    attributes: {
      types: ['IPE معمولی', 'IPB هاش سنگین HEB', 'IPBv هاش سبک HEA', 'CPE زنبوری'],
      standards: ['DIN 1025', 'EN 10025'],
      branchLength: '۱۲ متر',
      mainSizes: [12, 14, 16, 18, 20, 22, 24, 27, 30]
    },
    descriptionFa: 'پروفیل‌های ساختمانی بال‌دار با مقطع I و H به عنوان اعضای باربر اصلی ستون‌ها و تیرهای سازه‌های اسکلت فلزی.',
    relatedEntityIds: ['mfg-esco', 'mfg-faico'],
    targetKeywords: ['قیمت تیرآهن', 'قیمت هاش', 'تیرآهن ذوب آهن', 'تیرآهن ۱۴ اصفهان'],
    recommendedInternalUrl: 'https://ahaninja.com/prices/beam'
  },
  {
    id: 'prod-sheet',
    nameFa: 'انواع ورق فولادی (سیاه، روغنی، گالوانیزه)',
    nameEn: 'Steel Plates & Sheets (Hot Rolled, Cold Rolled, Galvanized)',
    type: 'Product',
    industry: 'Steel',
    attributes: {
      grades: ['ST37 ساختمانی', 'ST52 صنعتی', 'A516 مخزنی', 'DX51D گالوانیزه'],
      thicknessRange: '۰.۳ میلی‌متر تا ۱۰۰ میلی‌متر',
      dimensions: ['رول', 'شیت ۱×۲', 'شیت ۱.۲۵×۲.۵', 'شیت ۱.۵×۶', 'شیت ۲×۶']
    },
    descriptionFa: 'ورق‌های نورد گرم (سیاه) و نورد سرد (روغنی و گالوانیزه) جهت صنایع تانکرسازی، ماشین‌آلات، سازه‌های صنعتی و ساخت لوله و پروفیل.',
    relatedEntityIds: ['mfg-msc', 'mfg-oxin', 'tool-sheet-calc'],
    targetKeywords: ['قیمت ورق سیاه', 'قیمت ورق آهن', 'ورق مبارکه', 'ورق اکسین اهواز'],
    recommendedInternalUrl: 'https://ahaninja.com/prices/sheet'
  },
  {
    id: 'prod-profile',
    nameFa: 'قوطی و پروفیل ساختمانی و صنعتی',
    nameEn: 'Square & Rectangular Hollow Sections (SHS/RHS)',
    type: 'Product',
    industry: 'Steel',
    attributes: {
      thicknesses: ['۲ میلی‌متر', '۲.۵ میلی‌متر', '۳ میلی‌متر', '۴ میلی‌متر'],
      sizes: ['۲۰×۲۰', '۴۰×۴۰', '۴۰×۸۰', '۶۰×۶۰', '۹۰×۹۰', '۱۰۰×۱۰۰', 'پروفیل زد Z']
    },
    descriptionFa: 'پروفیل‌های توخالی مربعی و مستطیلی ساخته شده از ورق نورد سرد و گرم برای ساخت درب و پنجره، سوله، داربست و نماسازی.',
    relatedEntityIds: ['mfg-msc', 'tool-profile-calc'],
    targetKeywords: ['قیمت قوطی پروفیل', 'قیمت پروفیل زد', 'قوطی ۲ میل', 'پروفیل سبک'],
    recommendedInternalUrl: 'https://ahaninja.com/prices/profile'
  },

  // Manufacturers
  {
    id: 'mfg-esco',
    nameFa: 'شرکت سهامی ذوب آهن اصفهان',
    nameEn: 'Esfahan Steel Company (ESCO)',
    type: 'Manufacturer',
    industry: 'Steel',
    brandCode: 'ESCO',
    attributes: {
      location: 'اصفهان، زرین‌شهر',
      keyProducts: ['میلگرد آجدار', 'تیرآهن IPE', 'هاش HEA/HEB', 'ریل راه‌آهن'],
      weightAccuracy: 'انطباق ۱۰۰٪ با بالاترین بازه جدول اشتال DIN',
      stampMark: 'حک آرم ESCO برجسته روی شاخه‌ها'
    },
    descriptionFa: 'بزرگترین و قدیمی‌ترین کارخانه تولیدکننده مقاطع طویل ساختمانی و ریل در ایران با تکنولوژی کوره بلند.',
    relatedEntityIds: ['prod-rebar', 'prod-beam'],
    targetKeywords: ['میلگرد ذوب آهن اصفهان', 'تیرآهن اصفهان', 'مارک ESCO', 'علامت اختصاری ذوب آهن'],
    recommendedInternalUrl: 'https://ahaninja.com/prices/rebar/esco'
  },
  {
    id: 'mfg-ksr',
    nameFa: 'مجتمع فولاد خراسان (نیشابور)',
    nameEn: 'Khorasan Steel Complex (Nishabur)',
    type: 'Manufacturer',
    industry: 'Steel',
    brandCode: 'KSR',
    attributes: {
      location: 'خراسان رضوی، نیشابور',
      keyProducts: ['میلگرد آجدار A3', 'شمش فولادی', 'نبشی و ناودانی'],
      stampMark: 'KSR CO'
    },
    descriptionFa: 'بزرگترین مجتمع فولادی شرق ایران با تولید میلگردهای سنگین و مرغوب مطابق استاندارد ملی ۳۱۳۲.',
    relatedEntityIds: ['prod-rebar'],
    targetKeywords: ['میلگرد نیشابور', 'فولاد خراسان', 'مارک KSR', 'قیمت میلگرد نیشابور مشهد']
  },
  {
    id: 'mfg-zafar',
    nameFa: 'مجتمع فولاد ظفر بناب',
    nameEn: 'Zafar Bonab Steel Complex',
    type: 'Manufacturer',
    industry: 'Steel',
    brandCode: 'ZAFAR',
    attributes: {
      location: 'آذربایجان شرقی، بناب',
      keyProducts: ['میلگرد آجدار A2 و A3', 'تیرآهن', 'نبشی و ناودانی'],
      stampMark: 'ZAFAR'
    },
    descriptionFa: 'یکی از محبوب‌ترین کارخانجات تولید میلگرد با وزن اقتصادی و کیفیت استاندارد ویژه پروژه‌های شمال غرب و مرکز.',
    relatedEntityIds: ['prod-rebar'],
    targetKeywords: ['میلگرد ظفر بناب', 'قیمت میلگرد بناب', 'علامت ZAFAR']
  },
  {
    id: 'mfg-kavir',
    nameFa: 'مجتمع فولاد کویر کاشان',
    nameEn: 'Kavir Steel Complex (Kashan)',
    type: 'Manufacturer',
    industry: 'Steel',
    brandCode: 'KAVIR',
    attributes: {
      location: 'اصفهان، کاشان',
      keyProducts: ['میلگرد شاخه و کلاف A4 (آج ۵۰۰)', 'میلگرد حرارتی', 'فولادهای آلیاژی'],
      stampMark: 'KAVIR'
    },
    descriptionFa: 'پیشگام تولید میلگردهای فوق‌مقاوم A4 با جوش‌پذیری بالا و استانداردهای صادراتی اروپایی.',
    relatedEntityIds: ['prod-rebar'],
    targetKeywords: ['میلگرد کویر کاشان', 'میلگرد A4', 'کلاف کویر کاشان']
  },
  {
    id: 'mfg-msc',
    nameFa: 'شرکت فولاد مبارکه اصفهان',
    nameEn: 'Mobarakeh Steel Company (MSC)',
    type: 'Manufacturer',
    industry: 'Steel',
    brandCode: 'MSC',
    attributes: {
      location: 'اصفهان، مبارکه',
      keyProducts: ['ورق سیاه ST37', 'ورق ST52', 'ورق روغنی', 'ورق گالوانیزه', 'ورق رنگی'],
      stampMark: 'MSC'
    },
    descriptionFa: 'بزرگترین تولیدکننده فولاد در خاورمیانه و مرجع تامین ورق‌های تخت برای صنایع لوله‌سازی و خودروسازی.',
    relatedEntityIds: ['prod-sheet', 'prod-profile'],
    targetKeywords: ['ورق سیاه مبارکه', 'ورق ST37 فولاد مبارکه', 'ورق روغنی مبارکه']
  },
  {
    id: 'mfg-oxin',
    nameFa: 'شرکت فولاد اکسین خوزستان',
    nameEn: 'Oxin Steel Company (Ahvaz)',
    type: 'Manufacturer',
    industry: 'Steel',
    brandCode: 'OXIN',
    attributes: {
      location: 'خوزستان، اهواز',
      keyProducts: ['ورق سیاه عریض تا ۴.۵ متر', 'ورق مخازن تحت فشار A516', 'ورق ضدسایش هاردوکس'],
      stampMark: 'OXIN'
    },
    descriptionFa: 'تنها تولیدکننده ورق‌های عریض آلیاژی سنگین مورد استفاده در پروژه‌های نفت، گاز، پتروشیمی و صنایع دریایی در ایران.',
    relatedEntityIds: ['prod-sheet'],
    targetKeywords: ['ورق اکسین اهواز', 'ورق A516 اکسین', 'ورق عریض خوزستان']
  },

  // Calculator Tools
  {
    id: 'tool-rebar-calc',
    nameFa: 'محاسبه‌گر وزن میلگرد و جدول اشتال',
    type: 'CalculatorTool',
    industry: 'Steel',
    attributes: {
      formula: 'Weight (kg) = (D² / 162) × 12',
      inputs: ['سایز میلگرد (قطر D به میلی‌متر)', 'تعداد شاخه']
    },
    descriptionFa: 'ابزار دقیق مهندسی جهت تخمین سریع تناژ بار میلگرد و تطبیق با وزن باسکول کارخانه.',
    relatedEntityIds: ['prod-rebar'],
    targetKeywords: ['محاسبه وزن میلگرد', 'فرمول وزن میلگرد', 'تخمین تناژ میلگرد'],
    recommendedInternalUrl: 'https://ahaninja.com/tools/steel-weight-calculator'
  },
  {
    id: 'tool-sheet-calc',
    nameFa: 'محاسبه‌گر وزن ورق آهن',
    type: 'CalculatorTool',
    industry: 'Steel',
    attributes: {
      formula: 'Weight (kg) = L(m) × W(m) × T(mm) × 7.85'
    },
    descriptionFa: 'ابزار آنلاین محاسبه وزن انواع ورق سیاه، روغنی و گالوانیزه بر اساس ضخامت و ابعاد شیت.',
    relatedEntityIds: ['prod-sheet'],
    targetKeywords: ['محاسبه وزن ورق', 'فرمول وزن ورق آهن', 'چگالی فولاد']
  }
];

export const STEEL_KNOWLEDGE_GRAPH_RELATIONS: KnowledgeGraphRelationship[] = [
  { sourceId: 'mfg-esco', targetId: 'prod-rebar', relationType: 'produces', labelFa: 'تولیدکننده مرجع میلگرد آجدار' },
  { sourceId: 'mfg-esco', targetId: 'prod-beam', relationType: 'produces', labelFa: 'تولیدکننده انحصاری تیرآهن و هاش' },
  { sourceId: 'mfg-ksr', targetId: 'prod-rebar', relationType: 'produces', labelFa: 'تولیدکننده میلگرد نیشابور' },
  { sourceId: 'mfg-zafar', targetId: 'prod-rebar', relationType: 'produces', labelFa: 'تولیدکننده میلگرد بناب' },
  { sourceId: 'mfg-kavir', targetId: 'prod-rebar', relationType: 'produces', labelFa: 'تولیدکننده میلگرد A4 کاشان' },
  { sourceId: 'mfg-msc', targetId: 'prod-sheet', relationType: 'produces', labelFa: 'تولیدکننده ورق سیاه و روغنی' },
  { sourceId: 'mfg-oxin', targetId: 'prod-sheet', relationType: 'produces', labelFa: 'تولیدکننده ورق‌های عریض آلیاژی' },
  { sourceId: 'prod-rebar', targetId: 'tool-rebar-calc', relationType: 'calculated_with', labelFa: 'محاسبه با فرمول اشتال' },
  { sourceId: 'prod-sheet', targetId: 'tool-sheet-calc', relationType: 'calculated_with', labelFa: 'محاسبه با چگالی ۷.۸۵' }
];

export { STEEL_REBAR_STAHL_TABLE, STEEL_FACTORIES_IRAN, STEEL_FORMULAS };
