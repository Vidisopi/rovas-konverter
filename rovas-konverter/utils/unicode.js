/**
 * Rovás Konverter - Unicode segédfüggvények
 * Spec: 12.1 - Unicode kezelés
 */
/**
 * Zero Width Joiner karakter
 * Spec: 3.3, 12.1
 */
export const ZWJ = '\u200D';
/**
 * Unicode Old Hungarian blokk határai
 * Spec: 12.1 - U+10C80–U+10CFF
 */
export const OLD_HUNGARIAN_START = 0x10C80;
export const OLD_HUNGARIAN_END = 0x10CFF;
/**
 * Megvizsgálja, hogy egy kódpont Unicode Old Hungarian karaktere-e
 * Spec: 12.1
 */
export function isOldHungarianCodePoint(cp) {
    return cp >= OLD_HUNGARIAN_START && cp <= OLD_HUNGARIAN_END;
}
/**
 * Megvizsgálja, hogy egy string tartalmaz-e rovás karaktert
 * Spec: 12.1
 */
export function containsRovas(text) {
    for (const char of text) {
        const cp = char.codePointAt(0);
        if (cp !== undefined && isOldHungarianCodePoint(cp)) {
            return true;
        }
    }
    return false;
}
/**
 * String → kódpont tömb konverzió (surrogate pair-tudatos)
 * Spec: 12.1 - "JavaScriptben surrogate pair-ekként jelennek meg"
 */
export function toCodePoints(text) {
    const result = [];
    for (const char of text) {
        const cp = char.codePointAt(0);
        if (cp !== undefined) {
            result.push(cp);
        }
    }
    return result;
}
/**
 * String → karakter tömb konverzió (surrogate pair-tudatos)
 * ES6 spread operator automatikusan kezeli a surrogate pair-eket
 * Spec: 12.1
 */
export function toChars(text) {
    return [...text];
}
/**
 * Két kódpont közé ZWJ-t szúr be (ligatúra létrehozás)
 * Spec: 3.3
 */
export function joinWithZWJ(char1, char2) {
    return char1 + ZWJ + char2;
}
/**
 * Hexadecimális kódpont string → Unicode karakter
 * Segédfüggvény debug/tesztelési célra
 */
export function fromHex(hex) {
    return String.fromCodePoint(parseInt(hex, 16));
}
/**
 * Unicode karakter → hexadecimális kódpont reprezentáció
 * Segédfüggvény debug/tesztelési célra
 */
export function toHex(char) {
    const cp = char.codePointAt(0);
    if (cp === undefined)
        return '';
    return 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');
}
//# sourceMappingURL=unicode.js.map