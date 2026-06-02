export type {
  Confidence,
  CorporateRecord,
  IdentityInput,
  IdentityScore,
  IdentitySignal,
  OfficialSource,
  OfficialSourceRequest,
} from "./types.ts";
export {
  extractDomain,
  normalizeAddress,
  normalizeCompanyName,
  toNtaFullWidth,
} from "./normalize.ts";
export {
  isActiveNtaCloseCause,
  isCorporateNumberFormat,
  rankCandidates,
  scoreIdentityMatch,
} from "./scoring.ts";
export {
  buildGBizInfoNumberUrl,
  buildNtaNameSearchUrl,
  buildNtaNumberUrl,
  createGBizInfoClient,
  createNtaClient,
} from "./official_sources.ts";
