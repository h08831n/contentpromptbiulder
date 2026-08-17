export interface SteelRebarStandard {
  size: number;
  nominalWeightPerMeter: number; // kg/m (DIN / Stahl)
  twelveMeterWeight: number; // kg for 12m branch
  standardGrade: 'A2 (آج ۳۴۰)' | 'A3 (آج ۴۰۰)' | 'A4 (آج ۵۰۰)';
  tensileYieldMpa: number;
  tensileUltimateMpa: number;
  topIranianMills: string[];
}

export const STEEL_REBAR_STAHL_TABLE: SteelRebarStandard[] = [
  {
    size: 8,
    nominalWeightPerMeter: 0.395,
    twelveMeterWeight: 4.74,
    standardGrade: 'A2 (آج ۳۴۰)',
    tensileYieldMpa: 340,
    tensileUltimateMpa: 500,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد خراسان', 'ظفر بناب', 'فایکو']
  },
  {
    size: 10,
    nominalWeightPerMeter: 0.617,
    twelveMeterWeight: 7.40,
    standardGrade: 'A2 (آج ۳۴۰)',
    tensileYieldMpa: 340,
    tensileUltimateMpa: 500,
    topIranianMills: ['ذوب آهن اصفهان', 'کویر کاشان', 'راد همدان', 'میانه']
  },
  {
    size: 12,
    nominalWeightPerMeter: 0.888,
    twelveMeterWeight: 10.66,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد نیشابور', 'ظفر بناب', 'آناهیتا گیلان']
  },
  {
    size: 14,
    nominalWeightPerMeter: 1.208,
    twelveMeterWeight: 14.50,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فایکو', 'کویر کاشان', 'سرمد ابرکوه']
  },
  {
    size: 16,
    nominalWeightPerMeter: 1.578,
    twelveMeterWeight: 18.94,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد خراسان', 'میانه', 'ظفر بناب', 'راد همدان']
  },
  {
    size: 18,
    nominalWeightPerMeter: 1.998,
    twelveMeterWeight: 23.98,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد بافق', 'کویر کاشان', 'فایکو']
  },
  {
    size: 20,
    nominalWeightPerMeter: 2.466,
    twelveMeterWeight: 29.59,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد نیشابور', 'ظفر بناب', 'کویر کاشان']
  },
  {
    size: 22,
    nominalWeightPerMeter: 2.984,
    twelveMeterWeight: 35.81,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'کویر کاشان', 'فولاد خراسان']
  },
  {
    size: 25,
    nominalWeightPerMeter: 3.853,
    twelveMeterWeight: 46.24,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد خراسان', 'فایکو', 'کویر کاشان']
  },
  {
    size: 28,
    nominalWeightPerMeter: 4.834,
    twelveMeterWeight: 58.01,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'کویر کاشان']
  },
  {
    size: 32,
    nominalWeightPerMeter: 6.313,
    twelveMeterWeight: 75.76,
    standardGrade: 'A3 (آج ۴۰۰)',
    tensileYieldMpa: 400,
    tensileUltimateMpa: 600,
    topIranianMills: ['ذوب آهن اصفهان', 'فولاد خراسان', 'کویر کاشان']
  }
];

export const STEEL_FACTORIES_IRAN = [
  {
    name: 'ذوب آهن اصفهان (ESCO)',
    city: 'اصفهان',
    rebarMarking: 'ESCO',
    specialty: 'میلگرد شاخه سنگین مطابق جدول اشتال دقیق، تیرآهن IPE و هاش IPB',
    weightStandard: 'دقیقاً منطبق بر جدول اشتال (سنگین‌ترین و باکیفیت‌ترین)'
  },
  {
    name: 'فولاد خراسان (نیشابور)',
    city: 'نیشابور، خراسان رضوی',
    rebarMarking: 'KSR',
    specialty: 'میلگرد آجدار A3 مرجع پروژه‌های شرق و شمال شرق کشور',
    weightStandard: 'نزدیک به وزن اشتال استاندارد'
  },
  {
    name: 'مجتمع فولاد ظفر بناب',
    city: 'بناب، آذربایجان شرقی',
    rebarMarking: 'ZAFAR',
    specialty: 'میلگرد با وزن اقتصادی و کیفیت استاندارد مناسب انبوه‌سازی',
    weightStandard: 'وزن سبک‌تر و اقتصادی‌تر'
  },
  {
    name: 'فولاد کویر کاشان',
    city: 'کاشان، اصفهان',
    rebarMarking: 'KAVIR',
    specialty: 'تولیدکننده تخصصی میلگردهای گرید A4 (آج ۵۰۰) با قابلیت جوش‌پذیری بالا',
    weightStandard: 'بسیار دقیق و صادراتی'
  },
  {
    name: 'فولاد البرز ایرانیان (فایکو)',
    city: 'ساری، مازندران',
    rebarMarking: 'FAICO',
    specialty: 'تولیدکننده بزرگ مقاطع ساختمانی، تیرآهن، نبشی، ناودانی و میلگرد',
    weightStandard: 'وزن استاندارد استاندارد'
  },
  {
    name: 'فولاد مبارکه اصفهان',
    city: 'اصفهان',
    rebarMarking: 'MSC',
    specialty: 'تولیدکننده برتر انواع ورق سیاه ST37 و ST52، روغنی، گالوانیزه و اسیدشویی',
    weightStandard: 'مرجع ملی استاندارد ورق در خاورمیانه'
  },
  {
    name: 'فولاد اکسین خوزستان',
    city: 'اهواز',
    rebarMarking: 'OXIN',
    specialty: 'ورق‌های عریض صنعتی، مخازن تحت فشار، خطوط لوله نفت و گاز و سازه‌های دریایی',
    weightStandard: 'گرید آلیاژی A516 و ST52 فوق‌سنگین'
  }
];

export const STEEL_FORMULAS = [
  {
    name: 'فرمول محاسبه وزن یک شاخه میلگرد ۱۲ متری',
    formula: 'Weight (kg) = (D² / 162) × 12',
    description: 'در این فرمول D سایز میلگرد به میلی‌متر است. مثال برای میلگرد ۱۶: (16² / 162) × 12 = 18.96 کیلوگرم'
  },
  {
    name: 'فرمول محاسبه وزن ورق فولادی (شیت)',
    formula: 'Weight (kg) = طول (m) × عرض (m) × ضخامت (mm) × 7.85',
    description: 'چگالی استاندارد فولاد برابر ۷.۸۵ گرم بر سانتی‌متر مکعب در نظر گرفته می‌شود.'
  },
  {
    name: 'فرمول محاسبه وزن قوطی و پروفیل',
    formula: 'Weight (kg) = (مجموع دو ضلع × 2) × ضخامت (mm) × طول (m) × 0.00785',
    description: 'مثال: پروفیل ۴۰×۴۰ با ضخامت ۲ میلی‌متر و شاخه ۶ متری'
  }
];
