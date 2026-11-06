/**
 * Bogárjelek: a Unicode Old Hungarian külön kódolt jelei.
 *
 * Nem azonosak a választható ZWJ/OpenType összerovásokkal
 * (N4268R 5–6. fejezet). A hat homorgán nazális hangértéke
 * nazális + azonos képzéshelyű zárhang/zár-réshang; a név eleji
 * magánhangzó nem minden előfordulásban része a jelnek.
 * Az ENT-SHAPED SIGN nem az ENT, és nem a „tprus” hangérték.
 */
export const BUG_SIGNS = {
    amb: { lower: '\u{10CC3}', upper: '\u{10C83}' },
    enc: { lower: '\u{10CC5}', upper: '\u{10C85}' },
    and: { lower: '\u{10CC8}', upper: '\u{10C88}' },
    unk: { lower: '\u{10CD5}', upper: '\u{10C95}' },
    emp: { lower: '\u{10CE1}', upper: '\u{10CA1}' },
    ent: { lower: '\u{10CE7}', upper: '\u{10CA7}' },
    entShaped: { lower: '\u{10CF1}', upper: '\u{10CB1}' },
    us: { lower: '\u{10CF2}', upper: '\u{10CB2}' },
};

const HOMORGANIC_MODES = new Set(['off', 'traditional', 'cluster']);
const ENT_VOWELS = new Set(['e', 'a', 'i']);
const EMP_READINGS = new Set(['emp', 'omp']);
const ENT_SHAPED_READINGS = new Set(['preserve', 'tprus', 'temperius']);

/**
 * A részleges konfigurációt kiegészíti, és elutasítja az ismeretlen
 * bogárjel-kapcsolókat. A thousandsMode ellenőrzése a számkonverterben marad.
 */
export function normalizeBugSignConfig(config = {}) {
    const homorganicMode = config.homorganicMode ?? 'off';
    if (!HOMORGANIC_MODES.has(homorganicMode)) {
        throw new RangeError("A homorganicMode értéke 'off', 'traditional' vagy 'cluster' lehet.");
    }
    const entVowel = config.entVowel ?? 'e';
    if (!ENT_VOWELS.has(entVowel)) {
        throw new RangeError("Az entVowel értéke 'e', 'a' vagy 'i' lehet.");
    }
    const empReading = config.empReading ?? 'emp';
    if (!EMP_READINGS.has(empReading)) {
        throw new RangeError("Az empReading értéke 'emp' vagy 'omp' lehet.");
    }
    const entShapedReading = config.entShapedReading ?? 'preserve';
    if (!ENT_SHAPED_READINGS.has(entShapedReading)) {
        throw new RangeError("Az entShapedReading értéke 'preserve', 'tprus' vagy 'temperius' lehet.");
    }
    return {
        ...config,
        homorganicMode,
        entVowel,
        empReading,
        entShapedReading,
        useUsSign: config.useUsSign === true,
    };
}

/**
 * Latin → rovás helyettesítések, hossz szerint csökkenő sorrendben.
 * A 'off' mód üres: a betűkapcsolat külön betű marad.
 */
export function activeForwardBugSigns(config) {
    const rules = [];
    if (config.homorganicMode === 'cluster') {
        rules.push(
            rule('mb', BUG_SIGNS.amb),
            rule('nc', BUG_SIGNS.enc),
            rule('nd', BUG_SIGNS.and),
            rule('nk', BUG_SIGNS.unk),
            rule('mp', BUG_SIGNS.emp),
            rule('nt', BUG_SIGNS.ent),
        );
    }
    else if (config.homorganicMode === 'traditional') {
        // A Unicode névjegyzék: az ENT „also used for ant and int”.
        // Az emp/omp közül csak a kiválasztott olvasat helyettesít,
        // különben a visszafejtés nem egyértelmű.
        const empKey = config.empReading === 'omp' ? 'omp' : 'emp';
        rules.push(
            rule('amb', BUG_SIGNS.amb),
            rule('enc', BUG_SIGNS.enc),
            rule('and', BUG_SIGNS.and),
            rule('unk', BUG_SIGNS.unk),
            rule(empKey, BUG_SIGNS.emp),
            rule('ent', BUG_SIGNS.ent),
            rule('ant', BUG_SIGNS.ent),
            rule('int', BUG_SIGNS.ent),
        );
    }
    if (config.entShapedReading === 'tprus') {
        rules.push(rule('tprus', BUG_SIGNS.entShaped));
    }
    else if (config.entShapedReading === 'temperius') {
        rules.push(rule('temperius', BUG_SIGNS.entShaped));
    }
    if (config.useUsSign) {
        rules.push(rule('us', BUG_SIGNS.us));
    }
    rules.sort((a, b) => b.latin.length - a.latin.length);
    return rules;
}

/**
 * Rovás → latin olvasat. A hat nazális jel 'off' és 'cluster' módban
 * mássalhangzó-kapcsolat (a magánhangzó nincs hozzáírva).
 * Az ENT-alakú jel és az US bizonytalan olvasata csak kérésre jelenik meg;
 * egyébként a karakter megmarad.
 */
export function bugSignReverseMap(config) {
    const map = new Map();
    const add = (sign, latin) => {
        map.set(sign.lower, latin);
        map.set(sign.upper, latin.charAt(0).toUpperCase() + latin.slice(1));
    };
    if (config.homorganicMode === 'traditional') {
        add(BUG_SIGNS.amb, 'amb');
        add(BUG_SIGNS.enc, 'enc');
        add(BUG_SIGNS.and, 'and');
        add(BUG_SIGNS.unk, 'unk');
        add(BUG_SIGNS.emp, config.empReading === 'omp' ? 'omp' : 'emp');
        add(BUG_SIGNS.ent, `${config.entVowel}nt`);
    }
    else {
        add(BUG_SIGNS.amb, 'mb');
        add(BUG_SIGNS.enc, 'nc');
        add(BUG_SIGNS.and, 'nd');
        add(BUG_SIGNS.unk, 'nk');
        add(BUG_SIGNS.emp, 'mp');
        add(BUG_SIGNS.ent, 'nt');
    }
    if (config.entShapedReading === 'tprus') {
        add(BUG_SIGNS.entShaped, 'tprus');
    }
    else if (config.entShapedReading === 'temperius') {
        add(BUG_SIGNS.entShaped, 'temperius');
    }
    if (config.useUsSign) {
        add(BUG_SIGNS.us, 'us');
    }
    return map;
}

function rule(latin, sign) {
    return { latin, lower: sign.lower, upper: sign.upper };
}
