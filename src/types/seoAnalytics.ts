export interface GSCQueryItem {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  associatedPages: string[];
}

export interface GSCPageItem {
  pageUrl: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: string[];
}

export interface GSCMetricsSummary {
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  clicksDiffPercent: number;
  impressionsDiffPercent: number;
  dateRange: '7d' | '28d' | '3m' | '6m' | '12m';
  lastSyncedAt?: string;
  isConnected: boolean;
  propertyUrl?: string;
}

export interface GA4MetricsSummary {
  organicUsers: number;
  sessions: number;
  engagementRate: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  dateRange: '7d' | '28d' | '3m' | '6m' | '12m';
  lastSyncedAt?: string;
  isConnected: boolean;
  propertyId?: string;
}

export interface KeywordGapItem {
  id: string;
  query: string;
  impressions: number;
  clicks: number;
  currentPosition: number;
  opportunityType:
    | 'High Impression Low CTR'
    | 'Striking Distance (Pos 4-10)'
    | 'Second Page (Pos 11-20)'
    | 'Zero Clicks High Demand'
    | 'Missing Dedicated Page'
    | 'Emerging Trend';
  targetUrl?: string;
  recommendedAction: 'Update existing page' | 'Create new targeted content' | 'Optimize CTR & Meta' | 'Build Internal Links';
  estimatedTrafficGain: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface ContentGapItem {
  id: string;
  topic: string;
  searchDemand: number;
  suggestedTitle: string;
  primaryKeyword: string;
  searchIntent: string;
  competitorCovering: string[];
  status: 'Opportunity Identified' | 'Content Project Created' | 'Dismissed';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface CannibalizationItem {
  id: string;
  query: string;
  conflictingUrls: {
    url: string;
    clicks: number;
    impressions: number;
    position: number;
    title?: string;
  }[];
  severity: 'High' | 'Medium' | 'Low';
  recommendedAction: 'Merge & 301 Redirect' | 'Re-target secondary keyword' | 'De-optimize one page' | 'Differentiate search intent';
  notes: string;
}

export interface ContentDecayItem {
  id: string;
  pageUrl: string;
  title: string;
  previousClicks: number;
  currentClicks: number;
  clicksLoss: number;
  percentageLoss: number;
  previousPosition: number;
  currentPosition: number;
  status: 'Critical Decay' | 'Moderate Drop' | 'Under Observation';
  recommendedAction: 'Content Refresh & Update' | 'Add Fresh Data & Information Gain' | 'Rebuild internal links';
}

export type SEOTaskCategory =
  | 'Update Page'
  | 'Create Content'
  | 'Fix Cannibalization'
  | 'CTR Optimization'
  | 'Internal Link'
  | 'Technical'
  | 'KEYWORD_GAP'
  | 'CONTENT_GAP'
  | 'CANNIBALIZATION'
  | 'CONTENT_DECAY'
  | 'INTERNAL_LINKING'
  | 'TECHNICAL';

export type SEOTaskStatus = 'Todo' | 'In Progress' | 'Done' | 'Ignored' | 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface SEOTaskItem {
  id: string;
  title: string;
  description?: string;
  category: SEOTaskCategory;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: SEOTaskStatus;
  associatedUrl?: string;
  associatedKeyword?: string;
  associatedContentPlanId?: string;
  estimatedImpact?: string;
  suggestedAction?: string;
  createdAt: string;
  dueDate?: string;
}

export interface SEOHealthScoreBreakdown {
  overallScore: number; // 0-100
  technicalScore: number;
  contentQualityScore: number;
  searchIntentAlignment: number;
  topicalCoverageScore: number;
  internalLinkingScore: number;
  ctrPerformanceScore: number;
  freshnessScore: number;
  conversionScore: number;
  insights: {
    strengths: string[];
    criticalIssues: string[];
    growthOpportunities: string[];
  };
}
