import * as XLSX from 'xlsx';
import { ContentPlanRow, BrandIdentity, WebsiteProfile } from '../types';
import { generateAutoContentPlanRow } from './autoContentIntelligence';

export const EXCEL_COLUMNS_MAP: { field: keyof ContentPlanRow | string; label: string }[] = [
  { field: 'id', label: 'شناسه ردیف' },
  { field: 'title', label: 'عنوان مقاله (اصلی)' },
  { field: 'status', label: 'وضعیت تولید' },
  { field: 'brandName', label: 'برند' },
  { field: 'author', label: 'نویسنده' },
  { field: 'contentType', label: 'نوع محتوا' },
  { field: 'productType', label: 'نوع محصول / دسته‌بندی' },
  { field: 'topic', label: 'موضوع' },
  { field: 'primaryKeyword', label: 'کلمه کلیدی اصلی' },
  { field: 'secondaryKeywords', label: 'کلمات کلیدی فرعی' },
  { field: 'lsiKeywords', label: 'کلمات LSI و معنایی' },
  { field: 'entities', label: 'انتیتی‌های مرتبط' },
  { field: 'searchIntent', label: 'هدف جستجو (Search Intent)' },
  { field: 'funnelStage', label: 'مرحله قیف بازاریابی' },
  { field: 'wordCount', label: 'تعداد کلمات پیشنهادی' },
  { field: 'seoTitle', label: 'عنوان سئو (Title Tag)' },
  { field: 'metaDescription', label: 'توضیحات متا (Meta Description)' },
  { field: 'urlSlug', label: 'اسلاگ آدرس (URL Slug)' },
  { field: 'h1', label: 'هدینگ اصلی (H1)' },
  { field: 'h2', label: 'هدینگ‌های H2' },
  { field: 'h3', label: 'هدینگ‌های فرعی H3' },
  { field: 'faq', label: 'سؤالات متداول (FAQ)' },
  { field: 'anchorText', label: 'انکرتکست پیشنهادی' },
  { field: 'internalLinks', label: 'لینک‌های داخلی' },
  { field: 'externalLinks', label: 'منابع و مراجع خارجی' },
  { field: 'ctaHeadline', label: 'عنوان فراخوان به اقدام (CTA)' },
  { field: 'ctaButton', label: 'متن دکمه CTA' },
  { field: 'schema', label: 'انواع استراکچرد دیتا (Schema)' },
  { field: 'authorBio', label: 'رزومه و تخصص نویسنده (EEAT)' },
  { field: 'uniqueInformationGain', label: 'ارزش افزوده و تمایز محتوایی' },
  { field: 'contentDescription', label: 'توضیحات و زاویه دید استراتژیک' },
  { field: 'imagePromptHero', label: 'پرامپت انگلیسی تصویر شاخص (Hero)' },
  { field: 'imagePromptInfographic', label: 'پرامپت انگلیسی اینفوگرافیک' },
  { field: 'imagePromptMacro', label: 'پرامپت انگلیسی ماکرو آج و علامت اختصاری' },
  { field: 'imagePromptLoading', label: 'پرامپت انگلیسی بارگیری و انبار' },
  { field: 'imageAltText', label: 'متن جایگزین تصویر (Alt Text)' },
  { field: 'imageCaption', label: 'کپشن تصویر شاخص' },
  { field: 'socialTelegram', label: 'متن پست تلگرام' },
  { field: 'socialInstagram', label: 'کپشن پست اینستاگرام' },
  { field: 'socialLinkedIn', label: 'متن پست تخصصی لینکدین' },
  { field: 'priority', label: 'اولویت اقدام' },
  { field: 'seoScore', label: 'امتیاز سئو' },
  { field: 'trafficPotential', label: 'پتانسیل ترافیک' },
  { field: 'businessPotential', label: 'پتانسیل فروش و تبدیل' },
  { field: 'publicationDate', label: 'تاریخ انتشار پیشنهادی' },
  { field: 'lastUpdated', label: 'آخرین بروزرسانی' }
];

export function exportContentPlanToExcel(rows: ContentPlanRow[], filename = 'AhanInja_SEO_Content_Plan.xlsx') {
  const data = rows.map(row => {
    return {
      'شناسه ردیف': row.id,
      'عنوان مقاله (اصلی)': row.title,
      'وضعیت تولید': row.status,
      'برند': row.brandName || 'آهن اینجا',
      'نویسنده': row.author,
      'نوع محتوا': row.contentType,
      'نوع محصول / دسته‌بندی': row.productType,
      'موضوع': row.topic,
      'کلمه کلیدی اصلی': row.primaryKeyword,
      'کلمات کلیدی فرعی': Array.isArray(row.secondaryKeywords) ? row.secondaryKeywords.join(' | ') : row.secondaryKeywords,
      'کلمات LSI و معنایی': Array.isArray(row.lsiKeywords) ? row.lsiKeywords.join(' | ') : row.lsiKeywords,
      'انتیتی‌های مرتبط': Array.isArray(row.entities) ? row.entities.join(' | ') : row.entities,
      'هدف جستجو (Search Intent)': row.searchIntent,
      'مرحله قیف بازاریابی': row.funnelStage,
      'تعداد کلمات پیشنهادی': row.wordCount,
      'عنوان سئو (Title Tag)': row.seoTitle,
      'توضیحات متا (Meta Description)': row.metaDescription,
      'اسلاگ آدرس (URL Slug)': row.urlSlug,
      'هدینگ اصلی (H1)': row.h1,
      'هدینگ‌های H2': Array.isArray(row.h2) ? row.h2.join(' --- ') : row.h2,
      'هدینگ‌های فرعی H3': Array.isArray(row.h3) ? row.h3.join(' --- ') : row.h3,
      'سؤالات متداول (FAQ)': Array.isArray(row.faq)
        ? row.faq.map(f => `سؤال: ${f.question}\nپاسخ: ${f.answer || ''}`).join('\n\n')
        : '',
      'انکرتکست پیشنهادی': row.anchorText,
      'لینک‌های داخلی': Array.isArray(row.internalLinks)
        ? row.internalLinks.map(l => `${l.anchorText} -> ${l.targetUrl}`).join(' | ')
        : '',
      'منابع و مراجع خارجی': Array.isArray(row.externalLinks)
        ? row.externalLinks.map(l => `${l.sourceName} (${l.sourceUrl})`).join(' | ')
        : '',
      'عنوان فراخوان به اقدام (CTA)': row.cta?.headline || '',
      'متن دکمه CTA': row.cta?.buttonText || '',
      'انواع استراکچرد دیتا (Schema)': Array.isArray(row.schema) ? row.schema.join(', ') : row.schema,
      'رزومه و تخصص نویسنده (EEAT)': row.eeat?.authorBio || '',
      'ارزش افزوده و تمایز محتوایی': row.uniqueInformationGain,
      'توضیحات و زاویه دید استراتژیک': row.contentDescription,
      'پرامپت انگلیسی تصویر شاخص (Hero)': row.imagePrompts?.[0]?.promptEn || '',
      'پرامپت انگلیسی اینفوگرافیک': row.imagePrompts?.[1]?.promptEn || '',
      'پرامپت انگلیسی ماکرو آج و علامت اختصاری': row.imagePrompts?.[2]?.promptEn || '',
      'پرامپت انگلیسی بارگیری و انبار': row.imagePrompts?.[3]?.promptEn || '',
      'متن جایگزین تصویر (Alt Text)': row.imageAltText,
      'کپشن تصویر شاخص': row.imageCaption,
      'متن پست تلگرام': row.socialTelegram,
      'کپشن پست اینستاگرام': row.socialInstagram,
      'متن پست تخصصی لینکدین': row.socialLinkedIn,
      'اولویت اقدام': row.priority,
      'امتیاز سئو': row.seoScore,
      'پتانسیل ترافیک': row.trafficPotential,
      'پتانسیل فروش و تبدیل': row.businessPotential,
      'تاریخ انتشار پیشنهادی': row.publicationDate || '',
      'آخرین بروزرسانی': row.lastUpdated
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SEO_Content_Plan');

  // Auto column widths
  const max_width = data.reduce((w, r) => {
    Object.keys(r).forEach(k => {
      w[k] = Math.max(w[k] || 15, String((r as any)[k] || '').length + 2);
    });
    return w;
  }, {} as Record<string, number>);

  worksheet['!cols'] = Object.keys(max_width).map(k => ({ wch: Math.min(max_width[k], 60) }));

  XLSX.writeFile(workbook, filename);
}

export function parseExcelOrCsvFile(
  file: File,
  brand: BrandIdentity,
  website: WebsiteProfile,
  autoCompleteWithAI: boolean = true
): Promise<{ rows: ContentPlanRow[]; totalParsed: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

        if (!rawJson || rawJson.length === 0) {
          resolve({ rows: [], totalParsed: 0 });
          return;
        }

        const parsedRows: ContentPlanRow[] = rawJson.map((raw, idx) => {
          // Detect title column dynamically
          const title =
            raw['عنوان مقاله (اصلی)'] ||
            raw['عنوان مقاله'] ||
            raw['عنوان'] ||
            raw['Title'] ||
            raw['title'] ||
            raw['موضوع'] ||
            raw['Topic'] ||
            raw['کلمه کلیدی اصلی'] ||
            `محتوای شماره ${idx + 1}`;

          const primaryKw =
            raw['کلمه کلیدی اصلی'] ||
            raw['کلمه کلیدی'] ||
            raw['Keyword'] ||
            raw['primaryKeyword'];

          if (autoCompleteWithAI) {
            return generateAutoContentPlanRow(title, brand, website, {
              primaryKeyword: primaryKw,
              priority: raw['اولویت اقدام'] || raw['Priority'],
              status: raw['وضعیت تولید'] || raw['Status'] || 'Brief Ready'
            });
          } else {
            // Manual fallback structure
            return {
              id: 'imp-' + Date.now() + '-' + idx,
              title: title,
              status: raw['وضعیت تولید'] || 'Planned',
              brandId: brand.id,
              brandName: brand.name,
              websiteId: website.id,
              author: raw['نویسنده'] || 'تیم تحریریه آهن اینجا',
              contentType: raw['نوع محتوا'] || 'مقاله وبسایت',
              productType: raw['نوع محصول / دسته‌بندی'] || 'مقاطع فولادی',
              topic: title,
              primaryKeyword: primaryKw || title,
              secondaryKeywords: raw['کلمات کلیدی فرعی'] ? String(raw['کلمات کلیدی فرعی']).split(/[|،,]/) : [],
              lsiKeywords: raw['کلمات LSI و معنایی'] ? String(raw['کلمات LSI و معنایی']).split(/[|،,]/) : [],
              entities: raw['انتیتی‌های مرتبط'] ? String(raw['انتیتی‌های مرتبط']).split(/[|،,]/) : [],
              searchIntent: raw['هدف جستجو (Search Intent)'] || 'Informational',
              funnelStage: raw['مرحله قیف بازاریابی'] || 'TOFU (آگاهی)',
              targetAudience: brand.targetAudienceDefaults,
              wordCount: raw['تعداد کلمات پیشنهادی'] || 2500,
              seoTitle: raw['عنوان سئو (Title Tag)'] || title,
              seoTitleVariants: [title],
              metaDescription: raw['توضیحات متا (Meta Description)'] || '',
              metaDescriptionVariants: [],
              urlSlug: raw['اسلاگ آدرس (URL Slug)'] || 'article-' + idx,
              h1: raw['هدینگ اصلی (H1)'] || title,
              h2: raw['هدینگ‌های H2'] ? String(raw['هدینگ‌های H2']).split('---') : [],
              h3: raw['هدینگ‌های فرعی H3'] ? String(raw['هدینگ‌های فرعی H3']).split('---') : [],
              faq: [],
              anchorText: primaryKw || title,
              internalLinks: [],
              externalLinks: [],
              cta: { type: 'Contact', headline: 'استعلام قیمت', buttonText: 'تماس با آهن اینجا', placement: 'End' },
              schema: ['Article'],
              eeat: { authorName: 'کارشناس متالورژی آهن اینجا', authorBio: '', factCheckingSources: '', expertReviewed: true },
              uniqueInformationGain: '',
              contentDescription: '',
              contentBrief: '',
              imagePrompts: [],
              imageAltText: title,
              imageCaption: title,
              socialTelegram: '',
              socialInstagram: '',
              socialLinkedIn: '',
              priority: 'High',
              seoScore: 85,
              trafficPotential: 'High',
              businessPotential: 'High',
              lastUpdated: new Date().toISOString(),
              createdAt: new Date().toISOString()
            };
          }
        });

        resolve({ rows: parsedRows, totalParsed: parsedRows.length });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
