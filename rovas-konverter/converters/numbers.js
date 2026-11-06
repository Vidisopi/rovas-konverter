/**
 * Rovás Konverter - Szám ↔ Rovás szám konverter
 * Spec: 4.6, 5.3, 7.1
 */
import { NUMBER_VALUES, ROVAS_TO_NUMBER, ROVAS_DIGIT_SET } from '../tables/numbers.js';
export const MAX_SUPPORTED_NUMBER = Number.MAX_SAFE_INTEGER;
/**
 * Szám → Rovás szám konverzió
 * Spec: 4.6.1
 */
export function numberToRovas(num, options) {
    const thousandsMode = _validateThousandsMode(options);
    if (!Number.isFinite(num) || num <= 0)
        return '';
    num = Math.floor(num);
    if (!Number.isSafeInteger(num)) {
        throw new RangeError('A szám nem ábrázolható pontosan biztonságos JavaScript egészként.');
    }
    return _convertNumber(num, thousandsMode);
}
function _validateThousandsMode(options) {
    const thousandsMode = options?.thousandsMode ?? 'multiplicative';
    if (thousandsMode !== 'multiplicative' && thousandsMode !== 'additive') {
        throw new RangeError("A thousandsMode értéke 'multiplicative' vagy 'additive' lehet.");
    }
    return thousandsMode;
}
function _convertNumber(num, thousandsMode) {
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
                result += _convertNumber(multiplier, thousandsMode) + glyph;
            }
            else if (value === 1000 && thousandsMode === 'additive') {
                // Additív olvasatban a vezető MM = 2000, ezért a
                // beágyazott 1000-es szorzó egyesét kiírjuk: IMM.
                result += NUMBER_VALUES[NUMBER_VALUES.length - 1][1] + glyph;
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
 * - Alapértelmezésben az egymást követő ezres jelek szorzóláncot alkotnak:
 *   MM = 1000 × 1000, MMM = 1000 × 1000 × 1000.
 * - { thousandsMode: 'additive' } esetén a tiszta vezető ezresfutam
 *   additív: MM = 2000, MMM = 3000; a beágyazott IMM = 1 000 000.
 */
export function rovasToNumber(rovasNum, options) {
    const thousandsMode = _validateThousandsMode(options);
    const chars = [...rovasNum].filter(c => ROVAS_DIGIT_SET.has(c));
    if (chars.length === 0)
        return 0;
    const values = chars.map(c => ROVAS_TO_NUMBER[c]);
    if (thousandsMode === 'additive' && values.length > 1 && values.every(value => value === 1000)) {
        // A teljes, vezető ezresfutam összeadandó: MM = 2000, MMM = 3000.
        return values.length * 1000;
    }
    const value = _parseRovasValues(values, thousandsMode);
    if (!Number.isSafeInteger(value)) {
        throw new RangeError('A rovás szám értéke meghaladja a biztonságos JavaScript egész tartományt.');
    }
    return value;
}
function _parseRovasValues(values, thousandsMode) {
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
            else if (values[j] === helyi && helyi === 1000) {
                // Vér Csaba / Friedrich Klára modern javaslata:
                // 1000 × 1000 = 1 000 000; a lánc tovább folytatható.
                // Az azonos ezresekből álló futam a szorzóhoz tartozik, ha
                // a sor elején van, vagy kisebb szorzójelek előzik meg.
                let runStart = j;
                while (runStart > 0 && values[runStart - 1] === helyi) {
                    runStart--;
                }
                if (runStart === 0 || values[runStart - 1] < helyi) {
                    while (j >= runStart) {
                        multiplierVals.unshift(values[j]);
                        j--;
                    }
                }
                else {
                    break;
                }
            }
            else {
                break; // Nagyobb → előző token
            }
        }
        const multiplier = multiplierVals.length > 0
            ? _parseRovasValues(multiplierVals, thousandsMode)
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
export function arabicStringToRovas(numStr, options) {
    const num = parseInt(numStr, 10);
    if (isNaN(num))
        return numStr;
    return numberToRovas(num, options);
}
//# sourceMappingURL=numbers.js.map