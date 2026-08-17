import { AIImagePromptItem, ContentType, FunnelStage, LanguageCode, SearchIntentType } from './index';

export type PlanItemStatus =
  | 'Idea'
  | 'Planned'
  | 'Brief Ready'
  | 'Prompt Ready'
  | 'Writing'
  | 'In Progress'
  | 'Review'
  | 'Published'
  | 'Update Required';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type PotentialLevel = 'High' | 'Medium' | 'Low';

export interface ContentPlanRow {
  id: string;
  title: string; // عنوان مقاله (Source of Truth)
  status: PlanItemStatus;
  brandId: string;
  brandName: string;
  websiteId: string;
  author: string;
  contentType: ContentType | string;
  productType: string;
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  lsiKeywords: string[]; // Semantic / Related Keywords
  entities: string[];
  searchIntent: SearchIntentType | 'Mixed';
  funnelStage: FunnelStage;
  targetAudience: string;
  wordCount: number | string;
  seoTitle: string;
  seoTitleVariants: string[];
  metaDescription: string;
  metaDescriptionVariants: string[];
  urlSlug: string;
  h1: string;
  h2: string[];
  h3: string[];
  faq: { question: string; answer?: string }[];
  anchorText: string;
  internalLinks: { targetUrl: string; anchorText: string; note?: string }[];
  externalLinks: { sourceName: string; sourceUrl: string; citationType?: string }[];
  cta: {
    type: string;
    headline: string;
    buttonText: string;
    placement: string;
  };
  schema: string[];
  eeat: {
    authorName: string;
    authorBio: string;
    factCheckingSources: string;
    expertReviewed: boolean;
  };
  uniqueInformationGain: string;
  contentDescription: string; // توضیحات هدف، زاویه محتوا، مخاطب
  contentBrief: string;
  imagePrompts: AIImagePromptItem[];
  imageAltText: string;
  imageCaption: string;
  socialTelegram: string;
  socialInstagram: string;
  socialLinkedIn: string;
  socialX?: string;
  priority: PriorityLevel;
  seoScore: number;
  trafficPotential: PotentialLevel;
  businessPotential: PotentialLevel;
  publicationDate?: string;
  lastUpdated: string;
  createdAt: string;
  gscData?: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries?: { query: string; impressions: number; clicks: number; position: number }[];
    lastSynced?: string;
  };
  ga4Data?: {
    users: number;
    sessions: number;
    engagementRate: number;
    conversions: number;
    revenue?: number;
    lastSynced?: string;
  };
  recommendation?: string;
  isLockedFields?: Record<string, boolean>; // True if manually locked by user to prevent AI overwriting
  aiGenerationStatus?: 'idle' | 'pending' | 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  customColumns?: Record<string, string>;
}

export interface HeaderMappingConfig {
  sourceColumn: string;
  targetField: keyof ContentPlanRow | string;
  confidence: number;
}

export interface BatchProcessingQueueItem {
  id: string;
  rowId: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retries: number;
  error?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface BatchProcessProgress {
  total: number;
  completed: number;
  failed: number;
  inProgress: boolean;
  currentTitle?: string;
  estimatedTokens: number;
  estimatedCostUsd: number;
}
