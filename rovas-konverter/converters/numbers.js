/**
 * Rovás Konverter - Szám ↔ Rovás szám konverter
 * Spec: 4.6, 5.3, 7.1
 */
import { NUMBER_VALUES, ROVAS_TO_NUMBER, ROVAS_DIGIT_SET } from '../tables/numbers.js';
/**
 * Maximum támogatott szám (9 jegyű)
 * Spec: 9.3 - Szélsőséges esetek: "max. 9 jegyű, azaz max 999 999 999"
 */
export const MAX_SUPPORTED_NUMBER = 999_999_999;
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
export function numberToRovas(num) {
    // Spec: 4.6.1 Speciális esetek
    if (!Number.isFinite(num) || num <= 0)
        return ''; // 0 és negatív: üres kimenet
    if (num > MAX_SUPPORTED_NUMBER) {
        // 9 jegynél több: csonkítás mod (MAX+1)
        // Spec: 9.3 - "Első 9 jegy konvertálva"
        num = num % (MAX_SUPPORTED_NUMBER + 1);
        if (num <= 0)
            return '';
    }
    return _convertNumber(Math.floor(num));
}
/**
 * Rekurzív számkonverzió
 * Spec: 4.6.1 - Algoritmus
 *
 * A rekurzió a SZORZÓRA vonatkozik (ha a szorzó maga is > egy helyiértékre bontható):
 * - 2000 = 2×1000 → _convertNumber(2) + M
 * - 2 = 2×1 → II (de 1-es helyiértéknél NEM rekurzív: csak N-szeres ismétlés)
 *
 * Az 1-es helyiértéknél egyszerű ismétlés (N darab I jel), nem rekurzió.
 * Ez megakadályozza a végtelen rekurziót.
 */
function _convertNumber(num) {
    if (num <= 0)
        return '';
    let result = '';
    for (const [value, glyph] of NUMBER_VALUES) {
        if (num >= value) {
            const multiplier = Math.floor(num / value);
            if (value === 1) {
                // Az 1-es helyiértéknél: N darab I jel (nem rekurzív)
                // Spec: 4.6.1 PÉLDA: 2×1 → II
                result += glyph.repeat(multiplier);
            }
            else if (multiplier > 1) {
                // Spec: 4.6.1 lépés 2: "Ha szorzó > 1: REKURZÍV hívás a szorzóra + az adott helyiérték jele"
                // A szorzóra rekurzívan hívjuk (pl. szorzó=4 → IIII, szorzó=2000 → II+M)
                result += _convertNumber(multiplier) + glyph;
            }
            else {
                // Spec: 4.6.1 lépés 3: "Ha szorzó = 1: az adott helyiérték jele"
                result += glyph;
            }
            num = num % value;
        }
    }
    return result;
}
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
export function rovasToNumber(rovasNum) {
    // Rovás karakterek kinyerése (surrogate pair-tudatos)
    const chars = [...rovasNum].filter(c => ROVAS_DIGIT_SET.has(c));
    if (chars.length === 0)
        return 0;
    // Értékek sorozata
    const values = chars.map(c => ROVAS_TO_NUMBER[c]);
    let total = 0;
    let i = 0;
    while (i < values.length) {
        const currentValue = values[i];
        // Előretekintés: ha a következő jel NAGYOBB, akkor az aktuális szorzó
        // Spec: 5.3 - "Ha egy kisebb jel nagyobb jel ELŐTT áll → szorzóként értelmezzük"
        // Pl. II + C = 2×100 = 200: az I-k (1) a C (100) előtt → szorzó
        if (i + 1 < values.length) {
            const nextValue = values[i + 1];
            if (currentValue < nextValue) {
                // Összegyűjtjük a szorzókat (pl. III + M → 3×1000)
                let multiplierTotal = 0;
                while (i < values.length && values[i] < nextValue) {
                    multiplierTotal += values[i];
                    i++;
                }
                // Most i-nél a nagyobb értékű jel áll
                if (i < values.length) {
                    total += multiplierTotal * values[i];
                    i++;
                }
                else {
                    total += multiplierTotal;
                }
                continue;
            }
        }
        total += currentValue;
        i++;
    }
    return total;
}
/**
 * Arab számjegy string → rovás számjegyek konverzió (szövegből)
 * Spec: 4.6.2 - Számfelismerés a szövegben
 *
 * @param numStr - Arab számjegyekből álló string (pl. "2026")
 * @returns Rovás számjegy-sorozat
 */
export function arabicStringToRovas(numStr) {
    // Vezető nullák figyelmen kívül hagyandók (Spec: 4.6.1 Speciális esetek)
    const num = parseInt(numStr, 10);
    if (isNaN(num))
        return numStr; // Ha nem szám, változatlanul hagyja
    return numberToRovas(num);
}
//# sourceMappingURL=numbers.js.map