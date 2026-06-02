import { extractDomain, normalizeAddress, normalizeCompanyName } from "./normalize.js";
export function isActiveNtaCloseCause(closeCause) {
    return closeCause == null || closeCause === "" || closeCause === "0";
}
export function isCorporateNumberFormat(value) {
    return typeof value === "string" && /^[0-9]{13}$/.test(value);
}
export function scoreIdentityMatch(input, candidate) {
    const signals = [];
    const inputName = input.name ? normalizeCompanyName(input.name) : undefined;
    const candidateName = normalizeCompanyName(candidate.name);
    const candidateNameEn = candidate.nameEn ? normalizeCompanyName(candidate.nameEn) : undefined;
    const nameMatched = !!inputName && (inputName === candidateName || inputName === candidateNameEn || candidateName.includes(inputName));
    signals.push({
        name: "normalized_name",
        weight: 35,
        matched: nameMatched,
        detail: inputName ? `${inputName} <> ${candidateName}` : "input name missing"
    });
    const inputDomain = extractDomain(input.domain);
    const candidateDomain = extractDomain(candidate.companyUrl);
    const domainMatched = !!inputDomain && !!candidateDomain && inputDomain === candidateDomain;
    signals.push({
        name: "domain",
        weight: 30,
        matched: domainMatched,
        detail: inputDomain && candidateDomain ? `${inputDomain} <> ${candidateDomain}` : "domain missing"
    });
    const numberMatched = !!input.corporateNumber && isCorporateNumberFormat(input.corporateNumber) && input.corporateNumber === candidate.corporateNumber;
    signals.push({
        name: "corporate_number",
        weight: 25,
        matched: numberMatched,
        detail: input.corporateNumber ? input.corporateNumber : "input corporate number missing"
    });
    const inputAddress = normalizeAddress(input.address);
    const candidateAddress = normalizeAddress(candidate.address ?? [
        candidate.prefectureName,
        candidate.cityName,
        candidate.streetNumber
    ].filter(Boolean).join(""));
    const addressMatched = !!inputAddress && !!candidateAddress && candidateAddress.startsWith(inputAddress);
    signals.push({
        name: "address_prefix",
        weight: 10,
        matched: addressMatched,
        detail: inputAddress && candidateAddress ? `${inputAddress} <> ${candidateAddress}` : "address missing"
    });
    const active = isActiveNtaCloseCause(candidate.closeCause);
    signals.push({
        name: "active_status",
        weight: active ? 0 : -25,
        matched: active,
        detail: active ? "active or unknown" : `closeCause=${candidate.closeCause}`
    });
    const score = Math.max(0, Math.min(100, signals.reduce((sum, signal)=>sum + (signal.matched ? signal.weight : 0), 0)));
    const confidence = !active || score < 35 ? "requires_manual_review" : score >= 80 ? "high" : score >= 55 ? "medium" : "low";
    return {
        score,
        confidence,
        signals,
        requiresManualReview: confidence === "requires_manual_review" || confidence === "low"
    };
}
export function rankCandidates(input, candidates) {
    return candidates.map((candidate)=>({
            ...candidate,
            ...scoreIdentityMatch(input, candidate)
        })).sort((a, b)=>b.score - a.score);
}
