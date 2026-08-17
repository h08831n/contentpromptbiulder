import { SEOProject, BrandIdentity, AIImagePromptItem } from '../types';

export function generateAIImagePrompts(
  project: SEOProject,
  brand?: BrandIdentity
): AIImagePromptItem[] {
  const keyword = project.primaryKeyword || 'میلگرد و مقاطع فولادی';
  const topic = project.topic || project.articleTitle || 'خرید آهن و فولاد';
  const brandName = brand?.name || 'آهن اینجا';

  return [
    {
      id: 'img-hero-banner',
      title: 'تصویر شاخص و بنر هدر مقاله (Featured Hero Banner)',
      type: 'Hero Banner',
      aspectRatio: '16:9',
      style: 'Photorealistic',
      promptEn: `/imagine prompt: Cinematic commercial photograph of modern industrial steel distribution center in Iran, towering organized stacks of heavy construction steel rebars with distinct ribbed textures, clean bundles of steel beams with golden safety tags labeled in Persian, overhead crane in soft atmospheric sun rays entering from skylights, high-tech logistics warehouse, ultra-detailed 8k, shot on Hasselblad H6D-100c, 35mm lens, f/4, editorial architectural photography, clean and professional, ray tracing reflections on raw steel surfaces --ar 16:9 --style raw --v 6.1`,
      promptFa: `عکاسی صنعتی تبلیغاتی فوق‌العاده باکیفیت از انبار مدرن مقاطع فولادی با بندیل‌های منظم میلگرد آجدار و تیرآهن، نورپردازی ملایم آفتاب و جرثقیل سقفی در محیطی تمیز و حرفه‌ای`,
      negativePrompt: `blurry, low quality, cartoon, 3d render, distorted steel, rusty scrap, messy background, text watermark, oversaturated colors`,
      altTextFa: `${keyword} در انبار اختصاصی ${brandName} - راهنمای جامع انتخاب و استعلام قیمت روز`,
      captionFa: `نمای انبار و نگهداری استاندارد بندیل‌های میلگرد و مقاطع فولادی پیش از بارگیری و ارسال با برگه باسکول رسمی`
    },
    {
      id: 'img-technical-infographic',
      title: 'اینفوگرافیک و مقایسه فنی آج و گریدها (Technical Infographic & Chart)',
      type: 'Technical Infographic',
      aspectRatio: '4:3',
      style: 'Industrial 3D Diagram',
      promptEn: `/imagine prompt: Clean technical engineering diagram comparing steel rebar rib patterns and cross sections, showing A2 vs A3 vs A4 ribbed deformed bars, crisp metallic chrome and matte dark steel material, millimeter measuring caliper tool resting beside rebar, precise millimeter grid background, ISO engineering schematic aesthetics, high contrast, clean typography layout placeholder, minimalist studio lighting, 8k resolution, Unreal Engine 5 product render style --ar 4:3 --v 6.1`,
      promptFa: `دیاگرام فنی مهندسی و سه‌بعدی تمیز مقایسه آج و مشخصات مکانیکی گریدهای میلگرد A2 و A3 به همراه کولیس اندازه‌گیری و گرید خطوط مهندسی`,
      negativePrompt: `dark, grunge, messy, abstract art, unreadable diagrams, deformed geometry, sketch, low-poly`,
      altTextFa: `نمودار مقایسه آج و گرید میلگرد A2 و A3 بر اساس استاندارد ملی ۳۱۳۲`,
      captionFa: `بررسی تفاوت هندسه آج جناغی (A3) و آج مارپیچ (A2) و تاثیر آن در گیرداری با بتن`
    },
    {
      id: 'img-macro-texture',
      title: 'کلوزآپ ماکرو متالورژی و نشان اختصاری کارخانه (Macro Metallurgy & Stamp)',
      type: 'Macro Steel Texture',
      aspectRatio: '1:1',
      style: 'Cinematic Studio',
      promptEn: `/imagine prompt: Extreme macro photography of a hot-rolled structural steel rebar surface, showcasing intricate rib ridges, crisp metallic grain texture, embossed factory trademark lettering stamp on steel body, subtle steel blue and charcoal gray metallic tones, dramatic directional side lighting casting sharp micro-shadows, 100mm macro lens, f/2.8, shallow depth of field with creamy bokeh, photorealistic industrial metallurgy magazine quality --ar 1:1 --style raw --v 6.1`,
      promptFa: `شات کلوزآپ ماکرو متالورژی از بافت سطح میلگرد نورد گرم، خطوط برجسته آج و حک علامت اختصاری کارخانه با نورپردازی متالیک استودیویی`,
      negativePrompt: `blur, out of focus, plastic texture, cheap metal, rust powder, dirt, low resolution`,
      altTextFa: `نشان اختصاری کارخانه تولیدکننده روی میلگرد اصل جهت تشخیص کیفیت و استاندارد`,
      captionFa: `کنترل علامت حک‌شده کارخانه (مانند ESCO یا ZAFAR) روی بدنه میلگرد جهت راستی‌آزمایی اصالت کالا`
    },
    {
      id: 'img-warehouse-loading',
      title: 'عملیات بارگیری، کنترل کیفیت و باسکول (Inspection & Quality Control)',
      type: 'Warehouse & Loading',
      aspectRatio: '16:9',
      style: 'Photorealistic',
      promptEn: `/imagine prompt: Professional Persian civil engineer wearing a white safety hardhat, high-visibility vest, and safety glasses, holding a digital tablet with quality inspection checklist, standing near flatbed delivery truck loaded with bundled steel rebars, sunny morning at a modern logistics metal hub, depth of field focusing on quality control inspector, authentic corporate industrial documentary photography, shot on Sony A7R V, 50mm f/1.8 --ar 16:9 --v 6.1`,
      promptFa: `مهندس کنترل کیفیت با کلاه ایمنی و تبلت در حال بازرسی بارنامه، برگه آنالیز شیمیایی و باسکول تریلی حامل آهن‌آلات در محوطه بارگیری`,
      negativePrompt: `cluttered, safety violations, dramatic disaster, cartoon, fake workers, blurry face, bad anatomy`,
      altTextFa: `کنترل کیفیت، اندازه‌گیری سایز با کولیس و صدور برگه باسکول در ${brandName}`,
      captionFa: `فرآیند دقیق کنترل کیفیت، بررسی گواهی آنالیز کارخانه و توزین باسکول دیجیتال پیش از خروج بار`
    }
  ];
}
