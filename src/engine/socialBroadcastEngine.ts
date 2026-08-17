import { SEOProject, BrandIdentity, SocialBroadcastConfig } from '../types';

export function generateSocialBroadcastCopy(
  project: SEOProject,
  brand?: BrandIdentity
): SocialBroadcastConfig {
  const brandName = brand?.name || 'آهن اینجا (AhanInja)';
  const website = brand?.website || 'https://ahaninja.com';
  const keyword = project.primaryKeyword || 'میلگرد و آهن‌آلات';
  const title = project.articleTitle || 'راهنمای جامع خرید آهن‌آلات';
  const ctaPhone = '021-xxxx';

  const telegramPost = `
📌 **${title}**

📊 آیا می‌دانید چطور وزن دقیق هر شاخه میلگرد را پیش از خرید محاسبه کنید تا هزینه باربری اضافی یا بار سبک به شما تحویل داده نشود؟

🔍 **نکات کلیدی این مقاله تخصصی در وبسایت ${brandName}:**
▫️ تفاوت کاربردی میلگرد A2 (خم‌کاری) و A3 (سازه‌ای بتن‌آرمه)
▫️ فرمول سریع محاسبه وزن هر شاخه ۱۲ متری: $(D^2 / 162) \times 12$
▫️ نحوه تشخیص اصالت میلگرد کارخانجات اصفهان، بناب و نیشابور از روی علامت اختصاری
▫️ شرایط استعلام پیش‌فاکتور رسمی و خرید مستقیم با نرخ مصوب بورس کالا

🔗 **مطالعه متن کامل راهنما و دانلود جدول اشتال:**
🌐 ${website}/blog/${project.ctrAndCTA.urlSlug || 'rebar-buying-guide'}

☎️ **استعلام فوری قیمت و مشاوره با کارشناسان فروش:**
📞 ${ctaPhone}
🆔 @AhanInja_Official

#${keyword.replace(/\s+/g, '_')} #آهن_اینجا #قیمت_میلگرد #آهن_آلات #مهندسی_عمران #خرید_آهن
`.trim();

  const instagramCaption = `
🏗️ ۵ نکته طلایی که قبل از خرید ${keyword} باید بدانید! (ورق بزنید ➡️)

اسلاید ۱: عنوان راهنمای جامع خرید و استعلام بدون واسطه
اسلاید ۲: جدول وزن استاندارد اشتال در برابر وزن کارخانه‌ها
اسلاید ۳: چطور میلگرد اصل را از روی کد اختصاری حک‌شده بشناسیم؟
اسلاید ۴: فرمول طلایی محاسبه وزن هر شاخه در ۳۰ ثانیه
اسلاید ۵: استعلام پیش‌فاکتور رسمی با فاکتور معتبر از ${brandName}

💬 شما برای پروژه‌تان از کدام کارخانه میلگرد تهیه می‌کنید؟ نظرتان درباره کیفیت و وزن میلگرد اصفهان و بناب را در کامنت‌ها بنویسید 👇

🔗 لینک مقاله کامل و جدول محاسباتی در بیو پیج قرار گرفت.

#آهن_اینجا #${keyword.replace(/\s+/g, '_')} #قیمت_روز_آهن #ساختمان_سازی #تیرآهن #میلگرد_اصفهان #انبوه‌سازان
`.trim();

  const linkedInPost = `
تحلیل تخصصی زنجیره تامین فولاد و بهینه‌سازی بودجه پروژه‌های عمرانی:

در اجرای اسکلت‌های بتن‌آرمه و سازه‌های فلزی، انتخاب دقیق مقاطع فولادی با تلورانس وزنی استاندارد (منطبق بر آیین‌نامه بتن ایران و ISIRI 3132) نقشی حیاتی در حفظ ایمنی سازه و کاهش هزینه‌های مازاد دارد.

در مقاله جدید منتشر شده در «${brandName}»، به بررسی جامع موارد زیر پرداخته‌ایم:
1. تحلیل مقایسه‌ای مشخصات مکانیکی، تنش تسلیم و ازدیاد طول نسبی گریدهای فولادی
2. اعتبارسنجی برگه‌های آنالیز شیمیایی (Certificate) کوپالن در محموله‌های ارسالی
3. مکانیسم قیمت‌گذاری در بورس کالا و زمان‌بندی بهینه خرید برای شرکت‌های پیمانکاری

مشاهده و مطالعه نسخه کامل این گزارش تحلیلی:
${website}/blog/${project.ctrAndCTA.urlSlug || 'rebar-buying-guide'}

#CivilEngineering #SteelIndustry #StructuralDesign #ConstructionManagement #IranSteel #${keyword.replace(/\s+/g, '_')}
`.trim();

  const newsletterSnippet = `
سلام و احترام؛
اگر در حال برنامه‌ریزی برای خرید آهن‌آلات یا پیش‌بینی بودجه اسکلت پروژه خود هستید، راهنمای جدید «${title}» منتشر شد. در این راهنما جدول وزن استاندارد کارخانه‌ها، فرمول محاسباتی و نکات کنترل کیفیت در پای کار را برای شما گردآوری کرده‌ایم.
برای مطالعه کلیک کنید: ${website}/blog/${project.ctrAndCTA.urlSlug || 'rebar-buying-guide'}
`.trim();

  return {
    telegramPost,
    instagramCaption,
    linkedInPost,
    newsletterSnippet
  };
}

export const generateSocialBroadcast = generateSocialBroadcastCopy;
