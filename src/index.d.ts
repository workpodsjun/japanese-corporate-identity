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

export function toNtaFullWidth(value: string): string;
export function normalizeCompanyName(value: string): string;
export function extractDomain(value?: string): string | undefined;
export function normalizeAddress(value?: string): string | undefined;
export function isActiveNtaCloseCause(closeCause?: string | null): boolean;
export function isCorporateNumberFormat(value?: string): boolean;
export function scoreIdentityMatch(input: IdentityInput, candidate: CorporateRecord): IdentityScore;
export function rankCandidates(input: IdentityInput, candidates: CorporateRecord[]): Array<CorporateRecord & IdentityScore>;
export function buildNtaNameSearchUrl(name: string, apiKey: string): URL;
export function buildNtaNumberUrl(corporateNumber: string, apiKey: string): URL;
export function buildGBizInfoNumberUrl(corporateNumber: string): URL;
export function createNtaClient(options?: OfficialSourceRequest): {
  searchByName(name: string): Promise<string>;
  verifyByNumber(corporateNumber: string): Promise<string>;
};
export function createGBizInfoClient(options?: OfficialSourceRequest): {
  lookupByNumber(corporateNumber: string): Promise<unknown>;
};
