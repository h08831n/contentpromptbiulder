export type LanguageCode = 'fa' | 'en' | 'ar' | 'es' | 'ru';

export type IndustryType =
  | 'Steel'
  | 'Construction'
  | 'E-commerce'
  | 'Technology'
  | 'SaaS'
  | 'Healthcare'
  | 'Finance'
  | 'Education'
  | 'Travel'
  | 'Real Estate'
  | 'Food'
  | 'Fashion'
  | 'Manufacturing'
  | 'Services'
  | 'Automotive'
  | 'Legal'
  | 'Other';

export type BrandVoice =
  | 'Professional'
  | 'Authoritative'
  | 'Conversational'
  | 'Academic'
  | 'Friendly'
  | 'Sales-Oriented'
  | 'Technical'
  | 'Journalistic'
  | 'Expert';

export interface BrandIdentity {
  id: string;
  name: string;
  legalName?: string;
  industry: IndustryType;
  website: string;
  brandVoice: BrandVoice;
  businessDescription: string;
  usp: string; // Unique Selling Proposition
  brandPositioning: string;
  productsServices: any[];
  targetAudienceDefaults?: string;
  targetAudience?: string;
  brandValues?: string[];
  forbiddenClaims: string[];
  forbiddenTerms: string[];
  preferredTerms: any[];
  competitors?: string[];
  mainLocations?: string[];
  socialProfiles?: any[];
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  knowledgeBase: {
    aboutBrand?: string;
    companyHistory?: string;
    expertise?: string;
    industriesServed?: string;
    certifications?: string[];
    awards?: string[];
    editorialGuidelines?: string;
    contentRules?: string[];
  };
  createdAt: string;
  updatedAt?: string;
}

export type Brand = BrandIdentity;

export interface WebsiteProfile {
  id: string;
  brandId?: string;
  name?: string;
  siteName?: string;
  domain: string;
  url?: string;
  language?: LanguageCode;
  niche?: string;
  country?: string;
  currency?: string;
  mainCategory?: string;
  websiteType?: string;
  defaultLanguage?: LanguageCode;
  primaryTargetCountry?: string;
  sitemapUrl?: string;
  existingUrls: { id?: string; url: string; title: string; mainKeyword?: string; category?: string }[];
  permalinkStructure?: string;
  hasSitemap?: boolean;
  createdAt?: string;
}

export type ContentType =
  | 'مقاله وبسایت'
  | 'رپورتاژ تبلیغاتی'
  | 'محصول فروشگاهی'
  | 'معرفی بهترین مشاغل'
  | 'افیلیت دیجیکالا'
  | 'صفحه لندینگ'
  | 'پیلار پیج (Pillar Page)'
  | 'راهنمای گام‌به‌گام (How-To)';

export type ContentGoal =
  | 'Rank on Google (Organic Traffic)'
  | 'Lead Generation & Form Submissions'
  | 'Direct Sales & Conversions'
  | 'Topical Authority Building'
  | 'PR & Brand Awareness'
  | 'Affiliate Click-Throughs';

export type SearchIntentType =
  | 'Informational'
  | 'Commercial'
  | 'Transactional'
  | 'Navigational'
  | 'Comparison'
  | 'Problem Solving'
  | 'Local';

export type FunnelStage = 'TOFU (آگاهی)' | 'MOFU (بررسی و ارزیابی)' | 'BOFU (تصمیم‌گیری و خرید)';

export interface SearchIntentConfig {
  intent: SearchIntentType;
  funnelStage: FunnelStage;
  userPainPoint: string;
  primaryQuestion: string;
  expectedOutcome: string;
}

export interface KeywordMatrix {
  primaryKeyword: string;
  targetDensity: string; // e.g. "1.5% - 2.5%"
  secondaryKeywords: string[];
  longTailKeywords: string[];
  lsiKeywords: string[];
  entities?: string[];
  negativeKeywords?: string[];
  forbiddenKeywords?: string[];
}

export interface CompetitorAnalysisItem {
  id: string;
  urlOrTitle: string;
  strengths: string;
  weaknesses: string;
  wordCountEstimate?: number;
}

export interface SERPConfig {
  serpFeatures: string[]; // e.g. "Featured Snippet", "People Also Ask", "Video Pack", "Local Pack"
  targetZeroClick: boolean;
  featuredSnippetGoal: 'Definition' | 'Table' | 'Bulleted List' | 'Step-by-Step' | 'None';
  competitors: CompetitorAnalysisItem[];
  paaQuestions: string[]; // People Also Ask
}

export interface TopicalAuthorityConfig {
  contentRole: 'Pillar (محتوای جامع مرجع)' | 'Cluster / Supporting (محتوای پشتیبان کلاستر)' | 'Standalone (مقاله مستقل)';
  parentPillarUrl?: string;
  cannibalizationSafeguards: string;
  uniqueInformationGain: string; // New data, proprietary analysis, original checklist
  freshnessSignals: boolean;
}

export type PointOfView = 'First Person Singular (من)' | 'First Person Plural (ما/تیم)' | 'Second Person (شما)' | 'Third Person (او/آنها/بی‌طرف)';
export type ReadingLevel = 'عامه‌فهم و ساده' | 'متوسط و کاربردی' | 'تخصصی و کارشناسی' | 'آکادمیک و فنی';

export interface StyleAndToneConfig {
  tone: BrandVoice;
  pov: PointOfView;
  readingLevel: ReadingLevel;
  articleLength: string; // e.g. "2,500 - 3,500 کلمه"
  useHumor: boolean;
  introHookStyle: 'Storytelling' | 'Shocking Statistic' | 'Direct Problem Statement' | 'Question-Based';
  structureTemplates: {
    requireFAQ: boolean;
    requireSummaryBox: boolean;
    requireComparisonTable: boolean;
    requireChecklist: boolean;
    requireKeyTakeaways: boolean;
  };
}

export type AnchorStrategy = 'Exact Match' | 'Partial / Phrase Match' | 'Branded' | 'Generic / Natural' | 'Compound';

export interface InternalLinkItem {
  id: string;
  targetUrl: string;
  suggestedAnchor: string;
  anchorStrategy: AnchorStrategy;
  relevanceNote: string;
}

export interface ExternalCitationItem {
  id: string;
  sourceName: string;
  sourceUrl: string;
  citationType: 'Authoritative Study / ISO' | 'Government / Standard' | 'Industry Report' | 'Wiki / Encyclopedic';
}

export type VisualElementType =
  | 'تصویر شاخص با پرامپت DALL-E'
  | 'جدول مقایسه یا مشخصات فنی'
  | 'اینفوگرافیک / فلوچارت متنی'
  | 'باکس نکته کلیدی / هشدار طلایی'
  | 'ویدیو امبد یا پادکست فرضی'
  | 'چک‌لیست تعاملی مارک‌داون'
  | 'ماشین‌حساب / ابزار تعاملی';

export interface InternalLinkingConfig {
  enabled: boolean;
  strategy: 'Strict Manual URLs' | 'Semantic Recommended Placeholders' | 'Hybrid';
  manualLinks: InternalLinkItem[];
  maxInternalLinks: number;
}

export interface SchemaAndEEATConfig {
  schemaTypes: ('Article' | 'FAQPage' | 'HowTo' | 'Product' | 'Review' | 'Organization' | 'BreadcrumbList')[];
  authorName: string;
  authorTitle: string;
  authorBio: string;
  authorLinkedInOrUrl?: string;
  includeExpertReviewBadge: boolean;
  factCheckingSources: string;
  geoOptimizedForAI: boolean; // GEO (Generative Engine Optimization for SearchGPT/Perplexity/Gemini)
}

export type CTAType = 'Purchase' | 'Contact / Phone Call' | 'Form Fill / Lead' | 'Newsletter' | 'Download Guide' | 'Internal Deep Dive' | 'Soft';

export interface CTRAndCTAConfig {
  metaTitleVariants: string[];
  metaDescription: string;
  urlSlug: string;
  ctaType: CTAType;
  ctaHeadline: string;
  ctaButtonText: string;
  ctaPlacement: 'End of Article' | 'Mid-Content + End' | 'Sticky Box' | 'Contextual Inline';
  localCityOrProvince?: string;
}

export interface PresetTemplate {
  id: string;
  name: string;
  nameFa?: string;
  description: string;
  category: string;
  articleLength: string;
  contentType: ContentType | string;
  intent: SearchIntentType | string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  defaults?: any;
}

export interface SEOProject {
  id: string;
  articleTitle: string;
  topic: string;
  brandId: string;
  websiteId: string;
  contentType: ContentType;
  contentGoal: ContentGoal;
  primaryKeyword: string;
  searchIntent: SearchIntentConfig;
  keywords: KeywordMatrix;
  serp?: SERPConfig;
  topicalAuthority?: TopicalAuthorityConfig;
  styleAndTone?: StyleAndToneConfig;
  internalLinking?: InternalLinkingConfig;
  externalCitations?: ExternalCitationItem[];
  visualElements?: VisualElementType[];
  schemaAndEEAT?: SchemaAndEEATConfig;
  ctrAndCTA?: CTRAndCTAConfig;
  customDirectives?: string;
  aiImagePrompts?: AIImagePromptItem[];
  contentStructure?: any;
  linkingStrategy?: any;
  socialPrompts?: any;
  advancedTechnical?: any;
  aiOptimization?: any;
  eeatConfig?: any;
  secondaryCTA?: any;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface AIImagePromptItem {
  id: string;
  title: string;
  type: 'Hero Banner' | 'Technical Infographic' | 'Macro Steel Texture' | 'Warehouse & Loading' | 'Comparison Flowchart' | 'Custom';
  promptEn: string;
  promptFa: string;
  aspectRatio: '16:9' | '1:1' | '4:3' | '9:16';
  style: 'Photorealistic' | 'Industrial 3D Diagram' | 'Minimalist Vector' | 'Cinematic Studio';
  negativePrompt: string;
  altTextFa: string;
  captionFa: string;
}

export interface SocialBroadcastConfig {
  telegramPost: string;
  instagramCaption: string;
  linkedInPost: string;
  newsletterSnippet: string;
}

export interface CompiledPromptResult {
  promptText: string;
  compiledAt: string;
  metadata: {
    wordCount: number;
    estimatedTokens: number;
    sectionCount: number;
    projectTitle: string;
    contentType: string;
    qualityScore: number;
  };
  sections: { title: string; content: string }[];
  imagePrompts: AIImagePromptItem[];
  socialPrompts: SocialBroadcastConfig;
  steelCalculationsSnippet?: string;
}

export interface SEOValidationResult {
  score: number;
  grade: 'A+ (فوق‌العاده)' | 'A (بسیار خوب)' | 'B (خوب)' | 'C (نیازمند تکمیل)' | 'D (ناقص)';
  warnings: string[];
  strengths: string[];
}

export interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: string;
}

export * from './contentPlan';
export * from './seoAnalytics';
export * from './knowledgeGraph';
