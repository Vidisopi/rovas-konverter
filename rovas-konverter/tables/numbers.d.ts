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
export declare const NUMBER_VALUES: [number, string][];
/**
 * Rovás számjegy → arab szám inverz tábla
 * Spec: 5.3 - Számok visszafejtése
 */
export declare const ROVAS_TO_NUMBER: Record<string, number>;
/**
 * Rovás számjegyek halmaza (gyors felismeréshez)
 * Spec: 3.4
 */
export declare const ROVAS_DIGIT_SET: Set<string>;
//# sourceMappingURL=numbers.d.ts.map