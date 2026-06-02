import { toNtaFullWidth } from "./normalize.js";
const NTA_BASE_URL = "https://api.houjin-bangou.nta.go.jp/4";
const GBIZINFO_BASE_URL = "https://info.gbiz.go.jp/hojin/v1/hojin";
export function buildNtaNameSearchUrl(name, apiKey) {
    const url = new URL(`${NTA_BASE_URL}/name`);
    url.searchParams.set("id", apiKey);
    url.searchParams.set("name", toNtaFullWidth(name));
    url.searchParams.set("type", "12");
    url.searchParams.set("mode", "2");
    url.searchParams.set("target", "1");
    url.searchParams.set("from", "2015-10-05");
    return url;
}
export function buildNtaNumberUrl(corporateNumber, apiKey) {
    const url = new URL(`${NTA_BASE_URL}/num`);
    url.searchParams.set("id", apiKey);
    url.searchParams.set("number", corporateNumber);
    url.searchParams.set("type", "12");
    url.searchParams.set("history", "0");
    return url;
}
export function buildGBizInfoNumberUrl(corporateNumber) {
    return new URL(`${GBIZINFO_BASE_URL}/${corporateNumber}`);
}
export function createNtaClient(options = {}) {
    const apiKey = options.apiKey ?? process.env.NTA_API_KEY;
    const fetchImpl = options.fetchImpl ?? fetch;
    if (!apiKey) {
        throw new Error("NTA_API_KEY is required for live NTA API calls");
    }
    return {
        async searchByName (name) {
            const response = await fetchImpl(buildNtaNameSearchUrl(name, apiKey));
            if (!response.ok) throw new Error(`NTA name search failed: ${response.status}`);
            return response.text();
        },
        async verifyByNumber (corporateNumber) {
            const response = await fetchImpl(buildNtaNumberUrl(corporateNumber, apiKey));
            if (!response.ok) throw new Error(`NTA number lookup failed: ${response.status}`);
            return response.text();
        }
    };
}
export function createGBizInfoClient(options = {}) {
    const apiToken = options.apiKey ?? process.env.GBIZINFO_API_TOKEN;
    const fetchImpl = options.fetchImpl ?? fetch;
    if (!apiToken) {
        throw new Error("GBIZINFO_API_TOKEN is required for live gBizINFO API calls");
    }
    return {
        async lookupByNumber (corporateNumber) {
            const response = await fetchImpl(buildGBizInfoNumberUrl(corporateNumber), {
                headers: {
                    Accept: "application/json",
                    "X-hojinInfo-api-token": apiToken
                }
            });
            if (!response.ok) throw new Error(`gBizINFO lookup failed: ${response.status}`);
            return response.json();
        }
    };
}
