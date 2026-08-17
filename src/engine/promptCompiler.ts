import { SEOProject, BrandIdentity, WebsiteProfile, CompiledPromptResult } from '../types';
import { validateSeoProject } from './validator';
import { generateAIImagePrompts } from './aiImagePromptEngine';
import { generateSocialBroadcastCopy } from './socialBroadcastEngine';
import { STEEL_FORMULAS } from '../data/steelData';

export function compileMasterSEOPrompt(
  project: SEOProject,
  brand?: BrandIdentity,
  website?: WebsiteProfile
): CompiledPromptResult {
  const sections: { title: string; content: string }[] = [];

  // Section 1: System Persona & Senior SEO Specialist Role
  const roleSection = `
[ROLE & CONTEXT DEFINITION]
You are an elite, world-class Senior SEO Content Strategist, Semantic Search Architect, and Editorial Director.
Your task is to write a definitive, comprehensive, and high-ranking article in Persian (Farsi) that completely satisfies Google's Helpful Content Guidelines, E-E-A-T principles, and Search Generative Experience (SGE / GEO).
You write strictly with authoritative, precise human craftsmanship, avoiding robotic AI clichés, repetitive fluff, and empty generalizations.
`.trim();
  sections.push({ title: '1. Role & Identity', content: roleSection });

  // Section 2: Project Core Specifications
  const projectSpecs = `
[ARTICLE BLUEPRINT & SPECS]
- Article Title (Target H1): ${project.articleTitle || project.topic}
- Core Topic / Niche: ${project.topic}
- Content Classification: ${project.contentType}
- Strategic Goal: ${project.contentGoal}
- Primary Focus Keyword: "${project.primaryKeyword}" (Density Target: ${project.keywords.targetDensity})
- Target Article Word Count: ${project.styleAndTone.articleLength}
- Target Audience Persona: ${brand?.targetAudienceDefaults || 'مهندسین عمران، انبوه‌سازان، خریداران عمده و خرد بازار آهن و متالورژی ساختمانی در ایران'}
`.trim();
  sections.push({ title: '2. Project Blueprint', content: projectSpecs });

  // Section 3: Brand Identity & Knowledge Base
  if (brand) {
    const brandSpecs = `
[BRAND IDENTITY & EDITORIAL GUIDELINES]
- Brand Name: ${brand.name} ${brand.legalName ? `(${brand.legalName})` : ''}
- Industry / Domain: ${brand.industry}
- Official Website: ${brand.website}
- Brand Voice & Tone: ${brand.brandVoice} (تطابق کامل با پرستیژ برند)
- Unique Selling Proposition (USP): ${brand.usp || 'استعلام مستقیم قیمت درب کارخانه بدون واسطه، تضمین باسکول و بارگیری فوری با فاکتور رسمی مالیاتی و برگه آنالیز شیمیایی'}
- Brand Positioning: ${brand.brandPositioning || 'مرجع پیشرو و قابل اعتماد در تامین آهن‌آلات و مقاطع فولادی'}
${brand.productsServices.length > 0 ? `- Core Products / Offerings: ${brand.productsServices.join(', ')}` : ''}
${brand.forbiddenClaims.length > 0 ? `- STRICTLY FORBIDDEN CLAIMS (ادعاهای ممنوعه): ${brand.forbiddenClaims.join(' | ')}` : ''}
${brand.forbiddenTerms.length > 0 ? `- STRICTLY FORBIDDEN WORDS (کلمات تحریم‌شده): ${brand.forbiddenTerms.join(', ')}` : ''}
${brand.preferredTerms.length > 0 ? `- TERMINOLOGY DICTIONARY (معادل‌های ترجیحی): ${brand.preferredTerms.map(p => `استفاده از "${p.preferred}" به جای "${p.original}"`).join(' | ')}` : ''}
${brand.knowledgeBase.expertise ? `- Brand Knowledge Base / Expertise: ${brand.knowledgeBase.expertise}` : ''}
`.trim();
    sections.push({ title: '3. Brand Knowledge Base', content: brandSpecs });
  }

  // Section 4: Search Intent & User Psychology
  const intentSection = `
[SEARCH INTENT & USER PSYCHOLOGY]
- Primary Search Intent: ${project.searchIntent.intent}
- Funnel Placement: ${project.searchIntent.funnelStage}
- Searcher's Core Pain Point: ${project.searchIntent.userPainPoint || 'نیاز به راهنمایی جامع و موثق جهت انتخاب و استعلام بدون ریسک'}
- Primary Question User Needs Answered: ${project.searchIntent.primaryQuestion || 'نحوه محاسبه، مقایسه برندها و بهترین روش خرید'}
- Desired User Action / Outcome: ${project.searchIntent.expectedOutcome || 'کسب آگاهی تخصصی، دانلود چک‌لیست و تماس با کارشناسان فروش'}
`.trim();
  sections.push({ title: '4. Search Intent & Funnel', content: intentSection });

  // Section 5: Semantic Keyword & Entity Matrix
  const keywordSection = `
[SEMANTIC KEYWORD & ENTITY MATRIX]
- Primary Keyword: "${project.primaryKeyword}" (باید در H1، پاراگراف اول، یکی از H2ها و جمع‌بندی بیاید)
- Target Density: ${project.keywords.targetDensity}
- Secondary / Supporting Keywords:
${project.keywords.secondaryKeywords.map((k, i) => `  ${i + 1}. "${k}"`).join('\n')}
- Long-Tail Search Queries (پرسش‌های لانگ‌تیل کاربران):
${project.keywords.longTailKeywords.map((k, i) => `  * ${k}`).join('\n')}
- LSI & Semantic Vocabulary (دایره واژگان مرتبط مفهومی):
  ${project.keywords.lsiKeywords.join(' • ')}
- Named Entities & Knowledge Graph Concepts (مفاهیم هستی‌شناسی):
  ${project.keywords.entities.join(' • ')}
${project.keywords.negativeKeywords.length > 0 ? `- Negative / Irrelevant Keywords to AVOID: ${project.keywords.negativeKeywords.join(', ')}` : ''}
`.trim();
  sections.push({ title: '5. Keywords & Entities', content: keywordSection });

  // Section 6: SERP Landscape & Competitor Gaps
  const serpSection = `
[SERP LANDSCAPE & ZERO-CLICK OPTIMIZATION]
- Targeted SERP Features: ${project.serp.serpFeatures.join(', ')}
${project.serp.targetZeroClick ? `- Target Zero-Click / Featured Snippet: بلی (نوع فرمت هدف: ${project.serp.featuredSnippetGoal})` : ''}
${project.serp.targetZeroClick ? `  * Direct Answer Rule: در ۴۰ الی ۶۰ کلمه اول پس از تیتر مرتبط، پاسخ صریح، شفاف و بدون حاشیه ارائه شود.` : ''}
${project.serp.competitors.length > 0 ? `- Competitors Identified in Top 3 SERP:
${project.serp.competitors.map(c => `  - رقیب/آدرس: ${c.urlOrTitle} | نقاط قوت: ${c.strengths} | نقاط ضعف جهت غلبه: ${c.weaknesses}`).join('\n')}` : ''}
${project.serp.paaQuestions.length > 0 ? `- "People Also Ask" Queries (باید در هدینگ‌ها یا بخش FAQ پاسخ داده شوند):
${project.serp.paaQuestions.map(q => `  ? ${q}`).join('\n')}` : ''}
`.trim();
  sections.push({ title: '6. SERP & Competitors', content: serpSection });

  // Section 7: Topical Authority & Unique Information Gain
  const topicalSection = `
[TOPICAL AUTHORITY & INFORMATION GAIN]
- Role in Topic Cluster: ${project.topicalAuthority.contentRole}
${project.topicalAuthority.parentPillarUrl ? `- Parent Pillar URL: ${project.topicalAuthority.parentPillarUrl}` : ''}
- Cannibalization Safeguards: ${project.topicalAuthority.cannibalizationSafeguards || 'تمرکز روی کلمه کلیدی اختصاصی و عدم هم‌پوشانی با سایر مقالات کلاستر'}
- Unique Information Gain (ارزش افزوده نو و داده‌های انحصاری): ${project.topicalAuthority.uniqueInformationGain || 'ارائه فرمول‌های دقیق محاسباتی وزن، جدول تجربی مقایسه کارخانجات و چک‌لیست بازرسی در پای کار'}
- Freshness Signals: شامل آخرین استانداردها، قیمت‌گذاری و تحولات سال جاری باشد.
`.trim();
  sections.push({ title: '7. Topical Authority', content: topicalSection });

  // Section 8: Tone, Structure & Layout Rules
  const styleSection = `
[TONE, STYLE & ARTICLE ARCHITECTURE]
- Tone of Voice: ${project.styleAndTone.tone}
- Point of View (زاویه دید): ${project.styleAndTone.pov}
- Reading Difficulty: ${project.styleAndTone.readingLevel}
- Intro Hook Style: ${project.styleAndTone.introHookStyle} (پاراگراف اول باید در همان خط اول قلاب ذهنی ایجاد کند و صورت مسئله را تعریف نماید)
- Mandatory Layout Elements to Generate:
  ${project.styleAndTone.structureTemplates.requireSummaryBox ? '✓ Quick Summary Box (باکس خلاصه مقاله در ابتدای متن)' : ''}
  ${project.styleAndTone.structureTemplates.requireComparisonTable ? '✓ Detailed Comparison Table (جدول جامع مقایسه‌ای با فرمت Markdown)' : ''}
  ${project.styleAndTone.structureTemplates.requireChecklist ? '✓ Actionable Checklist (چک‌لیست گام‌به‌گام اقدامات)' : ''}
  ${project.styleAndTone.structureTemplates.requireKeyTakeaways ? '✓ Key Takeaways (نکات کلیدی و درس‌آموخته‌ها در انتهای هر سکشن)' : ''}
  ${project.styleAndTone.structureTemplates.requireFAQ ? '✓ Comprehensive FAQ Section (حداقل ۵ پرسش و پاسخ متداول تخصصی)' : ''}
`.trim();
  sections.push({ title: '8. Tone & Architecture', content: styleSection });

  // Section 9: Linking & Visual Directives
  const linkSection = `
[INTERNAL / EXTERNAL LINKING & VISUALS]
- Internal Linking Strategy: ${project.internalLinking.strategy} (حداکثر ${project.internalLinking.maxInternalLinks} لینک در سراسر متن)
${project.internalLinking.manualLinks.length > 0 ? `- Mandatory Internal Links to Integrate Contextually:
${project.internalLinking.manualLinks.map(l => `  - URL: ${l.targetUrl} | انکرتکست پیشنهادی: [${l.suggestedAnchor}] (${l.anchorStrategy}) | کاربرد: ${l.relevanceNote}`).join('\n')}` : ''}
${project.externalCitations.length > 0 ? `- Authoritative External Citations to Reference:
${project.externalCitations.map(e => `  - منبع: ${e.sourceName} (${e.sourceUrl}) - نوع: ${e.citationType}`).join('\n')}` : ''}
- Visual Media Placeholders & Design Prompts:
${project.visualElements.map(v => `  * [IMAGE PLACEHOLDER: ${v}]: همراه با متن جایگزین بهینه (Alt Text) و توضیحات تصویر`).join('\n')}
`.trim();
  sections.push({ title: '9. Links & Media Directives', content: linkSection });

  // Section 10: Schema Markup, E-E-A-T & AI Engine Optimization (GEO)
  const schemaSection = `
[E-E-A-T CREDIBILITY & SCHEMA JSON-LD]
- Author Credibility: ${project.schemaAndEEAT.authorName} (${project.schemaAndEEAT.authorTitle})
- Author Experience Bio: ${project.schemaAndEEAT.authorBio || 'کارشناس ارشد متالورژی و مشاور ارشد بازار فولاد با بیش از ۱۰ سال سابقه تخصصی'}
- Fact-Checking Standard: ${project.schemaAndEEAT.factCheckingSources || 'استناد به استاندارد ملی ۳۱۳۲ ایران، جدول اشتال و آنالیز متالوگرافی آزمایشگاهی'}
- Schema Markup JSON-LD Required: تولید کدهای اسکیما استاندارد (${project.schemaAndEEAT.schemaTypes.join(', ')}) در قالب تگ script application/ld+json در پایان پاسخ.
- Generative Engine Optimization (GEO): بهینه‌سازی ساختار متن به صورت جملات فکت‌محور، بولت‌پوینت‌های شفاف و ساختارهای قابل استخراج توسط موتورهای هوش مصنوعی (SearchGPT, Perplexity, Gemini).
`.trim();
  sections.push({ title: '10. E-E-A-T & Schema JSON-LD', content: schemaSection });

  // Section 11: CTR Optimization, Meta & Call-to-Action
  const ctrSection = `
[CTR OPTIMIZATION & CALL-TO-ACTION]
- Recommended Meta Title Variants:
${project.ctrAndCTA.metaTitleVariants.map((m, i) => `  Option ${i + 1}: ${m}`).join('\n')}
- Meta Description Target (145-155 characters): ${project.ctrAndCTA.metaDescription}
- Optimized URL Slug: ${project.ctrAndCTA.urlSlug}
- CTA Goal: ${project.ctrAndCTA.ctaType}
- CTA Headline: "${project.ctrAndCTA.ctaHeadline}"
- CTA Button / Action Text: "${project.ctrAndCTA.ctaButtonText}"
- CTA Placement Strategy: ${project.ctrAndCTA.ctaPlacement}
${project.ctrAndCTA.localCityOrProvince ? `- Local Geo-Targeting: ${project.ctrAndCTA.localCityOrProvince}` : ''}
`.trim();
  sections.push({ title: '11. CTR & Conversion Strategy', content: ctrSection });

  // Section 12: Final Execution Instruction
  const executionSection = `
[EXECUTION INSTRUCTIONS FOR THE AI]
1. Begin directly with the Markdown formatted article, starting with the H1 title.
2. Maintain natural human flow in Persian, avoiding repetitive AI phrases (مانند "در دنیای پرشتاب امروز"، "به عنوان یک نتیجه‌گیری"، "لازم به ذکر است").
3. Use precise Markdown headings (# H1, ## H2, ### H3, #### H4).
4. Include all requested tables, summary boxes, checklists, and internal link placeholders with markdown links [انکر تکست](URL).
5. At the very end of the article, output the valid Schema.org JSON-LD code inside a markdown code block (\`\`\`json).
6. Proceed to write the entire complete, in-depth article now in fluent, engaging, and professional Persian.
`.trim();
  sections.push({ title: '12. Final Prompt Directives', content: executionSection });

  // Combine into single master prompt
  const fullPromptText = sections.map(s => `### ${s.title}\n\n${s.content}`).join('\n\n---\n\n');
  const wordCount = fullPromptText.split(/\s+/).length;
  const estimatedTokens = Math.round(wordCount * 1.35);
  const validation = validateSeoProject(project);

  // Generate Image Prompts & Social Copy
  const imagePrompts = generateAIImagePrompts(project, brand);
  const socialPrompts = generateSocialBroadcastCopy(project, brand);

  return {
    promptText: fullPromptText,
    compiledAt: new Date().toISOString(),
    metadata: {
      wordCount,
      estimatedTokens,
      sectionCount: sections.length,
      projectTitle: project.articleTitle || project.topic,
      contentType: project.contentType,
      qualityScore: validation.score
    },
    sections,
    imagePrompts,
    socialPrompts,
    steelCalculationsSnippet: STEEL_FORMULAS.map(f => `${f.name}: ${f.formula}`).join(' | ')
  };
}
