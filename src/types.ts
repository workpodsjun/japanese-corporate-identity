export type OfficialSource = "nta" | "gbizinfo" | "fixture";

export type Confidence = "high" | "medium" | "low" | "requires_manual_review";

export type CorporateRecord = {
  corporateNumber?: string;
  name: string;
  nameEn?: string;
  address?: string;
  prefectureName?: string;
  cityName?: string;
  streetNumber?: string;
  companyUrl?: string;
  closeCause?: string | null;
  source: OfficialSource;
};

export type IdentityInput = {
  name?: string;
  domain?: string;
  corporateNumber?: string;
  address?: string;
};

export type IdentitySignal = {
  name: string;
  weight: number;
  matched: boolean;
  detail?: string;
};

export type IdentityScore = {
  score: number;
  confidence: Confidence;
  signals: IdentitySignal[];
  requiresManualReview: boolean;
};

export type OfficialSourceRequest = {
  apiKey?: string;
  fetchImpl?: typeof fetch;
};
