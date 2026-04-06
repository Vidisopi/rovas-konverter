/**
 * Rovás Konverter Konfiguráció
 * Spec: 6. fejezet - Konfigurációs opciók
 */
/** Alapértelmezett konfiguráció - Spec: 6. fejezet */
export const DEFAULT_CONFIG = {
    useVowelHarmonyK: false, // Alapértelmezés: csak magas K (rombusz)
    useCapitals: false, // Alapértelmezés: kisbetűs rovás
    direction: 'rtl', // Alapértelmezés: jobbról balra
    foreignLetterMode: 'ligature', // Alapértelmezés: ligatúrák használata
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
 * Mély K (kapocs alakú) - Spec: 3.2 táblázat
 * Unicode: U+10CD3 (aK)
 */
export const DEEP_K = '\u{10CD3}';
/**
 * Magas K (rombusz alakú) - Spec: 3.2 táblázat
 * Unicode: U+10CD2 (eK)
 */
export const HIGH_K = '\u{10CD2}';
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
//# sourceMappingURL=config.js.map