/**
 * Rovás Konverter - Szám ↔ Rovás szám konverter
 * Spec: 4.6, 5.3, 7.1
 */
/**
 * Maximum támogatott szám (9 jegyű)
 * Spec: 9.3 - Szélsőséges esetek: "max. 9 jegyű, azaz max 999 999 999"
 */
export declare const MAX_SUPPORTED_NUMBER = 999999999;
/**
 * Szám → Rovás szám konverzió
 * Spec: 4.6.1 - Algoritmus
 * Spec: 7.1 - numberToRovas API
 *
 * A rovás számrendszer additív (nem pozicionális).
 * A rekurzió automatikusan kezeli a nagy szorzókat.
 *
 * PÉLDA (Spec: 4.6.1):
 *   42 → 4×10 + 2×1 → (IIII)(X)(II)
 *   1253 → 1×1000 + 2×100 + 1×50 + 3×1 → M + II×C + L + III
 *   2026 → 2×1000 + 2×10 + 5 + 1 → II+M+II+X+V+I
 *
 * @param num - Konvertálandó szám (egész, 0–999 999 999)
 * @returns Rovás számjegy-sorozat Unicode stringként
 */
export declare function numberToRovas(num: number): string;
/**
 * Rovás szám → arab szám konverzió
 * Spec: 5.3 - Számok visszafejtése
 * Spec: 7.1 - rovasToNumber API
 *
 * Ha egy kisebb jel nagyobb jel ELŐTT áll → szorzóként értelmezzük
 * Spec: 5.3 - "Ha egy kisebb jel nagyobb jel ELŐTT áll → szorzóként értelmezzük (pl. II + C = 2×100 = 200)"
 *
 * @param rovasNum - Rovás számjegy-sorozat Unicode stringként
 * @returns Arab szám
 */
export declare function rovasToNumber(rovasNum: string): number;
/**
 * Arab számjegy string → rovás számjegyek konverzió (szövegből)
 * Spec: 4.6.2 - Számfelismerés a szövegben
 *
 * @param numStr - Arab számjegyekből álló string (pl. "2026")
 * @returns Rovás számjegy-sorozat
 */
export declare function arabicStringToRovas(numStr: string): string;
//# sourceMappingURL=numbers.d.ts.map