/**
 * Rovás Konverter Konfiguráció
 * Spec: 6. fejezet - Konfigurációs opciók
 */
/** Alapértelmezett konfiguráció - Spec: 6. fejezet */
export const DEFAULT_CONFIG = {
    useVowelHarmonyK: false, // Alapértelmezés: csak magas K (EK)
    useCapitals: false, // Alapértelmezés: kisbetűs rovás
    direction: 'rtl', // Alapértelmezés: jobbról balra
    foreignLetterMode: 'ligature', // Alapértelmezés: ligatúrák használata
    thousandsMode: 'multiplicative', // Alapértelmezés: MM = 1000 × 1000
    // Homorgán nazálisok (AMB, ENC, AND, UNK, EMP, ENT).
    // off: nincs latin → rovás helyettesítés; a meglévő jel mássalhangzó-kapcsolatként olvasandó.
    // traditional: amb, enc, and, unk, emp/omp, ent/ant/int → a kódolt jel (a magánhangzó a jelbe olvad).
    // cluster: mb, nc, nd, nk, mp, nt → a kódolt jel (a magánhangzó külön betű marad).
    homorganicMode: 'off',
    entVowel: 'e', // traditional módban az ENT visszafejtése: ent / ant / int
    empReading: 'emp', // traditional módban emp vagy a vitatott omp
    // Az ENT-SHAPED SIGN nem az ENT. preserve: a karakter megmarad.
    entShapedReading: 'preserve',
    useUsSign: false, // az US olvasata vitatott; kikapcsolva a karakter megmarad
};
/**
 * Mély hangrendű magánhangzók - Spec: 4.4.1
 */
export const DEEP_VOWELS = new Set(['a', 'á', 'o', 'ó', 'u', 'ú']);
/**
 * Magas hangrendű magánhangzók - Spec: 4.4.1
 */
export const HIGH_VOWELS = new Set(['e', 'é', 'ë', 'i', 'í', 'ö', 'ő', 'ü', 'ű']);
/**
 * Mély K (AK, kapocs). Unicode: U+10CD4 / nagy U+10C94
 */
export const DEEP_K = '\u{10CD4}';
export const DEEP_K_UPPER = '\u{10C94}';
/**
 * Magas K (EK, rombusz). Unicode: U+10CD3 / nagy U+10C93
 */
export const HIGH_K = '\u{10CD3}';
export const HIGH_K_UPPER = '\u{10C93}';
/**
 * Alapértelmezett K (magas K) - Spec: 4.4
 */
export const DEFAULT_K = HIGH_K;
/** ZWJ karakter (Zero Width Joiner) - Spec: 3.3 */
export const ZWJ = '\u200D';
/** Spec: 4.9 - Törlendő karakterek */
export const CHARS_TO_REMOVE = new Set([
    '#', '&', '@', 'ä', 'Ä', '§', 'đ', 'Đ', '€', '÷', '×', 'ł', 'Ł',
    '$', 'ß', '¤', 'ˇ', '˘', '°', '˛', '˙', '´', '˝', '¨', '¸',
    '<', '>'
]);