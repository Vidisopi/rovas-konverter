/**
 * Rovás Konverter - Szám ↔ Rovás szám konverter
 * Spec: 4.6, 5.3, 7.1
 */
import { NUMBER_VALUES, ROVAS_TO_NUMBER, ROVAS_DIGIT_SET } from '../tables/numbers.js';
export const MAX_SUPPORTED_NUMBER = 999_999_999;
/**
 * Szám → Rovás szám konverzió
 * Spec: 4.6.1
 */
export function numberToRovas(num) {
    if (!Number.isFinite(num) || num <= 0)
        return '';
    if (num > MAX_SUPPORTED_NUMBER) {
        num = num % (MAX_SUPPORTED_NUMBER + 1);
        if (num <= 0)
            return '';
    }
    return _convertNumber(Math.floor(num));
}
function _convertNumber(num) {
    if (num <= 0)
        return '';
    let result = '';
    for (const [value, glyph] of NUMBER_VALUES) {
        if (num >= value) {
            const multiplier = Math.floor(num / value);
            if (value === 1) {
                result += glyph.repeat(multiplier);
            }
            else if (multiplier > 1) {
                result += _convertNumber(multiplier) + glyph;
            }
            else {
                result += glyph;
            }
            num = num % value;
        }
    }
    return result;
}
/**
 * Rovás szám → arab szám konverzió
 * Spec: 5.3
 *
 * Visszafejtési szabály (jobbról balra):
 * - Minden jel vagy helyi érték (önálló), vagy szorzó (a tőle jobbra lévő helyi értékhez).
 * - Szorzó: vals[j] < helyi (szigorúan kisebb).
 * - Egyenlő érték szorzóként kezelendő, HA előtte kisebb elem áll
 *   (azaz ő maga is szorzó-blokkban van), különben önálló token.
 */
export function rovasToNumber(rovasNum) {
    const chars = [...rovasNum].filter(c => ROVAS_DIGIT_SET.has(c));
    if (chars.length === 0)
        return 0;
    const values = chars.map(c => ROVAS_TO_NUMBER[c]);
    return _parseRovasValues(values);
}
function _parseRovasValues(values) {
    if (values.length === 0)
        return 0;
    if (values.length === 1)
        return values[0];
    let total = 0;
    let i = values.length - 1;
    while (i >= 0) {
        const helyi = values[i];
        // Szorzókat gyűjtjük jobbról balra
        let j = i - 1;
        const multiplierVals = [];
        while (j >= 0) {
            if (values[j] < helyi) {
                // Szigorúan kisebb → biztosan szorzó
                multiplierVals.unshift(values[j]);
                j--;
            }
            else if (values[j] === helyi) {
                // Egyenlő: szorzó, HA előtte van kisebb elem (szorzóblokk része)
                if (j > 0 && values[j - 1] < values[j]) {
                    multiplierVals.unshift(values[j]);
                    j--;
                }
                else {
                    break; // Önálló token
                }
            }
            else {
                break; // Nagyobb → előző token
            }
        }
        const multiplier = multiplierVals.length > 0
            ? _parseRovasValues(multiplierVals)
            : 1;
        total += multiplier * helyi;
        i = j;
    }
    return total;
}
/**
 * Arab számjegy string → rovás számjegyek konverzió
 * Spec: 4.6.2
 */
export function arabicStringToRovas(numStr) {
    const num = parseInt(numStr, 10);
    if (isNaN(num))
        return numStr;
    return numberToRovas(num);
}
//# sourceMappingURL=numbers.js.map