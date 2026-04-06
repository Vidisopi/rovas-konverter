/**
 * Rovás Konverter - Rovás → Latin konverter
 * Spec: 5.1 – 5.4
 */
import { ROVAS_TO_LATIN, ROVAS_LIGATURES_TO_LATIN } from '../tables/inverse.js';
import { ROVAS_TO_PUNCTUATION } from '../tables/punctuation.js';
import { ROVAS_DIGIT_SET } from '../tables/numbers.js';
import { rovasToNumber } from './numbers.js';
/**
 * ZWJ karakter
 * Spec: 3.3, 5.2
 */
const ZWJ = '\u200D';
/**
 * Rovás → Latin konverzió
 * Spec: 5.1 - Általános feldolgozási algoritmus
 * Spec: 7.1 - rovasToLatin API
 *
 * @param text - Unicode Old Hungarian karaktersorozat
 * @returns Latin betűs magyar szöveg
 */
export function rovasToLatin(text) {
    let result = '';
    // Surrogate pair-tudatos feldolgozás
    // Spec: 12.1 - "JavaScriptben surrogate pair-ekként jelennek meg"
    const chars = [...text]; // ES6 spread: helyesen kezeli a surrogate pair-eket
    let i = 0;
    while (i < chars.length) {
        // === ZWJ ligatúrák keresése (3 karakter sorozat: char + ZWJ + char) ===
        // Spec: 5.2 - "ligatúráknál ZWJ-t (U+200D) keresünk a kódpontok között"
        if (i + 2 < chars.length && chars[i + 1] === ZWJ) {
            const ligature3 = chars[i] + chars[i + 1] + chars[i + 2];
            if (ligature3 in ROVAS_LIGATURES_TO_LATIN) {
                result += ROVAS_LIGATURES_TO_LATIN[ligature3];
                i += 3;
                continue;
            }
        }
        const char = chars[i];
        // === Rovás számjegyek ===
        // Spec: 5.3 - Számok visszafejtése
        // Összegyűjtjük az egymást követő rovás számjegyeket
        if (ROVAS_DIGIT_SET.has(char)) {
            let numChars = '';
            while (i < chars.length && ROVAS_DIGIT_SET.has(chars[i])) {
                numChars += chars[i];
                i++;
            }
            const num = rovasToNumber(numChars);
            result += num.toString();
            continue;
        }
        // === Rovás írásjelek ===
        // Spec: 5.4 - Írásjelek visszafejtése
        if (char in ROVAS_TO_PUNCTUATION) {
            result += ROVAS_TO_PUNCTUATION[char];
            i++;
            continue;
        }
        // === Rovás betűk → latin ===
        // Spec: 5.1 lépés 3 - "Minden Unicode kódpontra a latin megfelelőt keressük"
        if (char in ROVAS_TO_LATIN) {
            result += ROVAS_TO_LATIN[char];
            i++;
            continue;
        }
        // === Ismeretlen / egyéb karakter: változatlanul hagyja ===
        // (whitespace, latin betűk, egyéb Unicode)
        result += char;
        i++;
    }
    return result;
}
export default rovasToLatin;
//# sourceMappingURL=rovas-to-latin.js.map