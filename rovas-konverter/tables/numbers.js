/**
 * Rovás Konverter - Számjegy konverziós tábla
 * Spec: 3.4, 4.6, 8.1
 */
/**
 * Rovás számjegy tábla - csökkenő érték sorrendben
 * Spec: 8.1 - NUMBER_VALUES tábla
 * Spec: 4.6 - Számok konverziója
 *
 * Az algoritmus additív (nem pozicionális), csökkenő sorrendben dolgozza fel
 * a helyiértékeket. A rekurzió automatikusan kezeli a nagy szorzókat.
 */
export const NUMBER_VALUES = [
    [1000, '\u{10CFF}'], // M (U+10CFF)
    [100, '\u{10CFE}'], // C (U+10CFE)
    [50, '\u{10CFD}'], // L (U+10CFD)
    [10, '\u{10CFC}'], // X (U+10CFC)
    [5, '\u{10CFB}'], // V (U+10CFB)
    [1, '\u{10CFA}'], // I (U+10CFA)
];
/**
 * Rovás számjegy → arab szám inverz tábla
 * Spec: 5.3 - Számok visszafejtése
 */
export const ROVAS_TO_NUMBER = {
    '\u{10CFF}': 1000, // M
    '\u{10CFE}': 100, // C
    '\u{10CFD}': 50, // L
    '\u{10CFC}': 10, // X
    '\u{10CFB}': 5, // V
    '\u{10CFA}': 1, // I
};
/**
 * Rovás számjegyek halmaza (gyors felismeréshez)
 * Spec: 3.4
 */
export const ROVAS_DIGIT_SET = new Set(Object.keys(ROVAS_TO_NUMBER));
//# sourceMappingURL=numbers.js.map