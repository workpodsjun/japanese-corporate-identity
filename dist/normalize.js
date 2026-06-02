const LEGAL_ENTITY_TERMS = [
    "株式会社",
    "合同会社",
    "有限会社",
    "合名会社",
    "合資会社",
    "一般社団法人",
    "公益社団法人",
    "一般財団法人",
    "公益財団法人",
    "医療法人",
    "学校法人",
    "社会福祉法人",
    "宗教法人",
    "特定非営利活動法人",
    "NPO法人",
    "Co.,Ltd.",
    "Co.Ltd.",
    "Co Ltd",
    "Inc.",
    "LLC",
    "Ltd."
];
const SMALL_KANA_MAP = new Map([
    [
        "ァ",
        "ア"
    ],
    [
        "ィ",
        "イ"
    ],
    [
        "ゥ",
        "ウ"
    ],
    [
        "ェ",
        "エ"
    ],
    [
        "ォ",
        "オ"
    ],
    [
        "ッ",
        "ツ"
    ],
    [
        "ャ",
        "ヤ"
    ],
    [
        "ュ",
        "ユ"
    ],
    [
        "ョ",
        "ヨ"
    ]
]);
export function toNtaFullWidth(value) {
    return Array.from(value).map((char)=>{
        if (char === " ") return "　";
        const code = char.charCodeAt(0);
        if (code >= 0x21 && code <= 0x7e) {
            return String.fromCharCode(code + 0xfee0);
        }
        return char;
    }).join("");
}
export function normalizeCompanyName(value) {
    let normalized = value.normalize("NFKC");
    for (const term of LEGAL_ENTITY_TERMS){
        normalized = normalized.replaceAll(term.normalize("NFKC"), "");
    }
    normalized = normalized.replace(/[（(].*?[）)]/g, "");
    normalized = normalized.replace(/[・･]/g, "");
    normalized = normalized.replace(/[－‐−–—-]/g, "");
    normalized = normalized.replace(/[.,，．、]/g, "");
    normalized = normalized.replace(/\s+/g, "");
    normalized = Array.from(normalized).map((char)=>SMALL_KANA_MAP.get(char) ?? char).join("");
    return normalized.toLowerCase();
}
export function extractDomain(value) {
    if (!value) return undefined;
    const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
    try {
        const parsed = new URL(withScheme);
        return parsed.hostname.toLowerCase().replace(/^www\./, "");
    } catch  {
        return value.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]?.trim();
    }
}
export function normalizeAddress(value) {
    if (!value) return undefined;
    return value.normalize("NFKC").replace(/\s+/g, "").replace(/[－ー‐−–—-]/g, "-").toLowerCase();
}
