/**
 * Rovás Konverter - Unicode segédfüggvények
 * Spec: 12.1 - Unicode kezelés
 */
/**
 * Zero Width Joiner karakter
 * Spec: 3.3, 12.1
 */
export declare const ZWJ = "\u200D";
/**
 * Unicode Old Hungarian blokk határai
 * Spec: 12.1 - U+10C80–U+10CFF
 */
export declare const OLD_HUNGARIAN_START = 68736;
export declare const OLD_HUNGARIAN_END = 68863;
/**
 * Megvizsgálja, hogy egy kódpont Unicode Old Hungarian karaktere-e
 * Spec: 12.1
 */
export declare function isOldHungarianCodePoint(cp: number): boolean;
/**
 * Megvizsgálja, hogy egy string tartalmaz-e rovás karaktert
 * Spec: 12.1
 */
export declare function containsRovas(text: string): boolean;
/**
 * String → kódpont tömb konverzió (surrogate pair-tudatos)
 * Spec: 12.1 - "JavaScriptben surrogate pair-ekként jelennek meg"
 */
export declare function toCodePoints(text: string): number[];
/**
 * String → karakter tömb konverzió (surrogate pair-tudatos)
 * ES6 spread operator automatikusan kezeli a surrogate pair-eket
 * Spec: 12.1
 */
export declare function toChars(text: string): string[];
/**
 * Két kódpont közé ZWJ-t szúr be (ligatúra létrehozás)
 * Spec: 3.3
 */
export declare function joinWithZWJ(char1: string, char2: string): string;
/**
 * Hexadecimális kódpont string → Unicode karakter
 * Segédfüggvény debug/tesztelési célra
 */
export declare function fromHex(hex: string): string;
/**
 * Unicode karakter → hexadecimális kódpont reprezentáció
 * Segédfüggvény debug/tesztelési célra
 */
export declare function toHex(char: string): string;
//# sourceMappingURL=unicode.d.ts.map