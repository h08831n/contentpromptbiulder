import { SEOProject, SEOValidationResult } from '../types';

export function validateSeoProject(project: SEOProject): SEOValidationResult {
  let score = 100;
  const warnings: string[] = [];
  const strengths: string[] = [];

  // 1. Primary Keyword checks
  if (!project.primaryKeyword || project.primaryKeyword.trim().length === 0) {
    score -= 20;
    warnings.push('کلمه کلیدی اصلی تعیین نشده است.');
  } else {
    strengths.push(`کلمه کلیدی اصلی مشخص است: "${project.primaryKeyword}"`);
  }

  // 2. Title check
  if (!project.articleTitle || project.articleTitle.trim().length < 15) {
    score -= 10;
    warnings.push('عنوان مقاله کوتاه است یا تعیین نشده است (حداقل ۱۵ کاراکتر توصیه می‌شود).');
  } else {
    strengths.push('عنوان هدف سئو به درستی تعیین شده است.');
  }

  // 3. Search intent
  if (!project.searchIntent.userPainPoint || project.searchIntent.userPainPoint.trim().length === 0) {
    score -= 8;
    warnings.push('نقطه درد مخاطب (User Pain Point) تکمیل نشده است.');
  } else {
    strengths.push('قصد جستجو و روانشناسی مخاطب به دقت مشخص شده است.');
  }

  // 4. Secondary keywords & Entities
  if (project.keywords.secondaryKeywords.length < 2) {
    score -= 8;
    warnings.push('تعداد کلمات کلیدی فرعی کم است (حداقل ۲ مورد ثبت کنید).');
  }
  if (project.keywords.entities.length === 0) {
    score -= 8;
    warnings.push('موجودیت‌های معنایی (Semantic Entities / Knowledge Graph) برای درک بهتر موتورهای هوش مصنوعی خالی است.');
  } else {
    strengths.push(`${project.keywords.entities.length} موجودیت معنایی و انتیتی تخصصی تعریف شده است.`);
  }

  // 5. Internal Links
  if (project.internalLinking.manualLinks.length === 0) {
    score -= 7;
    warnings.push('هیچ لینک داخلی مشخصی در مخزن لینک‌ها تعریف نشده است.');
  } else {
    strengths.push(`${project.internalLinking.manualLinks.length} لینک داخلی با انکرتکست مشخص پیکربندی شده است.`);
  }

  // 6. Schema & EEAT
  if (project.schemaAndEEAT.schemaTypes.length === 0) {
    score -= 7;
    warnings.push('هیچ نوع اسکیما دانه‌ای برای تولید کد JSON-LD انتخاب نشده است.');
  } else {
    strengths.push(`کدهای ساختاریافته Schema (${project.schemaAndEEAT.schemaTypes.join(' + ')}) فعال هستند.`);
  }

  // 7. Meta Description
  if (!project.ctrAndCTA.metaDescription || project.ctrAndCTA.metaDescription.length < 50) {
    score -= 6;
    warnings.push('متادیسکریپشن برای بهینه‌سازی نرخ کلیک (CTR) کوتاه یا خالی است.');
  }

  // 8. Visual & Layout
  if (project.visualElements.length === 0) {
    score -= 5;
    warnings.push('هیچ المان بصری یا پلِیس‌هولدر تصویری برای تقویت محتوا اضافه نشده است.');
  }

  score = Math.max(10, Math.min(100, score));

  let grade: SEOValidationResult['grade'] = 'A+ (فوق‌العاده)';
  if (score >= 90) grade = 'A+ (فوق‌العاده)';
  else if (score >= 80) grade = 'A (بسیار خوب)';
  else if (score >= 65) grade = 'B (خوب)';
  else if (score >= 50) grade = 'C (نیازمند تکمیل)';
  else grade = 'D (ناقص)';

  return {
    score,
    grade,
    warnings,
    strengths
  };
}
