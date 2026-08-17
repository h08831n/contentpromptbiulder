export type EntityType =
  | 'Manufacturer'
  | 'Product'
  | 'Specification'
  | 'Standard'
  | 'FactoryBrandCode'
  | 'CityMarket'
  | 'IndustryTerm'
  | 'CalculatorTool';

export interface IndustryEntityItem {
  id: string;
  nameFa: string;
  nameEn?: string;
  type: EntityType;
  category?: EntityType | string;
  industry: string; // e.g. "Steel", "Construction"
  brandCode?: string; // e.g. "ESCO", "KSR", "ZAFAR"
  attributes: Record<string, any>;
  properties?: Record<string, any>;
  descriptionFa: string;
  description?: string;
  relatedEntityIds: string[];
  targetKeywords: string[];
  keywords?: string[];
  recommendedInternalUrl?: string;
}

export interface KnowledgeGraphRelationship {
  sourceId: string;
  targetId: string;
  relationType: 'produces' | 'standardized_by' | 'located_in' | 'categorized_as' | 'calculated_with';
  labelFa: string;
}
