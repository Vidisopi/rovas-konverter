/**
 * Rovás Konverter - Latin → Rovás konverter
 * Spec: 4.1 – 4.11
 */
import { DEFAULT_CONFIG, CHARS_TO_REMOVE } from '../config.js';
import { LATIN_TO_ROVAS, LATIN_TO_ROVAS_UPPER } from '../tables/letters.js';
import { PUNCTUATION_TO_ROVAS, OPENING_QUOTE_ROVAS } from '../tables/punctuation.js';
import { arabicStringToRovas } from './numbers.js';
import { selectK, extractWordForK } from './vowel-harmony.js';
import { ARABIC_DIGITS } from '../utils/text-parser.js';
/**
 * Latin → Rovás konverzió
 * Spec: 4.1 - Általános feldolgozási algoritmus
 * Spec: 7.1 - latinToRovas API
 *
 * @param text - Latin betűs magyar szöveg (UTF-8)
 * @param config - Konfigurációs opciók (Spec: 6.)
 * @returns Unicode Old Hungarian karaktersorozat
 */
export function latinToRovas(text, config) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    // Spec: 4.1 lépés 1-2 - Kisbetűsítés, de az eredeti nagybetűket nyilvántartjuk
    // a useCapitals módhoz
    const originalText = text;
    const lowerText = text.toLowerCase();
    let result = '';
    let i = 0;
    while (i < lowerText.length) {
        // === Szám felismerés ===
        // Spec: 4.6.2 - Számfelismerés a szövegben
        if (ARABIC_DIGITS.has(lowerText[i])) {
            let numStr = '';
            while (i < lowerText.length && ARABIC_DIGITS.has(lowerText[i])) {
                numStr += lowerText[i];
                i++;
            }
            result += arabicStringToRovas(numStr);
            continue;
        }
        // === Elválasztójel ===
        // Spec: 4.5 - "A `|` karakter nem kerül a kimenetre"
        if (lowerText[i] === '|') {
            i++;
            continue;
        }
        // === Törlendő karakterek ===
        // Spec: 4.9
        if (CHARS_TO_REMOVE.has(originalText[i])) {
            i++;
            continue;
        }
        // === Szóköz és egyéb whitespace ===
        if (/\s/.test(lowerText[i])) {
            result += lowerText[i];
            i++;
            continue;
        }
        // === Idézőjel kontextusfüggő kezelése ===
        // Spec: 4.7 - "ha utána alfanumerikus karakter jön, akkor nyitó idézőjel (→ ⹂)"
        if (originalText[i] === '"') {
            const nextChar = i + 1 < lowerText.length ? lowerText[i + 1] : '';
            if (/[a-záéíóöőúüűàâäèêëîïôœùûüÿa-z0-9]/i.test(nextChar)) {
                result += OPENING_QUOTE_ROVAS;
            }
            else {
                result += '"'; // Záró idézőjel: változatlan
            }
            i++;
            continue;
        }
        // === Nyitó idézőjel speciális HTML entitás ===
        // „ karakter (U+201E) → ⹂
        if (originalText[i] === '„') {
            result += PUNCTUATION_TO_ROVAS['„'] || '„';
            i++;
            continue;
        }
        // === Írásjelek ===
        // Spec: 4.7 - Írásjelek konverziója
        if (originalText[i] in PUNCTUATION_TO_ROVAS) {
            result += PUNCTUATION_TO_ROVAS[originalText[i]];
            i++;
            continue;
        }
        // Változatlan írásjelek (Spec: 4.7)
        if (/[.!:;\-]/.test(originalText[i])) {
            result += originalText[i];
            i++;
            continue;
        }
        // === Mohó egyeztetés - leghosszabb egyezés keresése ===
        // Spec: 4.2 - Feldolgozási prioritás (mohó egyeztetés)
        // Az elválasztójel figyelembevételével: ha '|' van közte, megszakítja a kettős betűt
        // 3 karakteres kulcsok (elválasztójellel megszakítva, ha szükséges)
        // Spec: 4.5 - A | szétválasztja a kétjegyű mássalhangzókat
        const chunk3 = getCharsIgnoringSeparator(lowerText, i, 3);
        if (chunk3.chars.length === 3 && chunk3.chars in LATIN_TO_ROVAS && !chunk3.hasSeparatorBefore2) {
            const convertedChar = handleChar(chunk3.chars, lowerText, i, cfg, originalText);
            result += convertedChar;
            i += chunk3.advance;
            continue;
        }
        // 2 karakteres kulcsok
        const chunk2 = getCharsIgnoringSeparator(lowerText, i, 2);
        if (chunk2.chars.length === 2 && chunk2.chars in LATIN_TO_ROVAS && !chunk2.hasSeparatorBefore2) {
            const convertedChar = handleChar(chunk2.chars, lowerText, i, cfg, originalText);
            result += convertedChar;
            i += chunk2.advance;
            continue;
        }
        // 1 karakteres kulcsok
        const char1 = lowerText[i];
        if (char1 in LATIN_TO_ROVAS) {
            const convertedChar = handleChar(char1, lowerText, i, cfg, originalText);
            result += convertedChar;
            i++;
            continue;
        }
        // Ismeretlen karakter: változatlanul hagyja (nem törlendő, de nincs rovás megfelelője)
        // A CHARS_TO_REMOVE már kezelte a törlendőket
        result += originalText[i];
        i++;
    }
    return result;
}
/**
 * Karaktert konvertál rovásra, figyelembe véve a konfigurációt
 * Spec: 4.4 - K betű hangrendiség alapján
 * Spec: 4.8 - Nagybetű-kezelés
 */
function handleChar(latinKey, lowerText, position, cfg, originalText) {
    // K betű különleges kezelése (hangrendiség)
    // Spec: 4.4
    if (latinKey === 'k' && cfg.useVowelHarmonyK) {
        const { word, kPosInWord } = extractWordForK(lowerText, position);
        const kChar = selectK(word, kPosInWord);
        return applyCapitalization(kChar, latinKey, position, cfg, originalText);
    }
    // Idegen betű decompose mód
    // Spec: 6. - foreignLetterMode: 'decompose'
    if (cfg.foreignLetterMode === 'decompose') {
        const decomposed = getDecomposed(latinKey);
        if (decomposed !== null) {
            return applyCapitalization(decomposed, latinKey, position, cfg, originalText);
        }
    }
    const rovasChar = LATIN_TO_ROVAS[latinKey];
    if (!rovasChar)
        return latinKey;
    return applyCapitalization(rovasChar, latinKey, position, cfg, originalText);
}
/**
 * Idegen betűk feloldása (decompose mód)
 * Spec: 6. - foreignLetterMode: 'decompose'
 * Spec: 4.3.4 - "Q→KV, W→VV, X→KSZ, Y→I"
 */
function getDecomposed(latinKey) {
    const decompositions = {
        'q': LATIN_TO_ROVAS['k'] + LATIN_TO_ROVAS['v'], // K + V
        'qu': LATIN_TO_ROVAS['k'] + LATIN_TO_ROVAS['v'], // K + V
        'w': LATIN_TO_ROVAS['v'] + LATIN_TO_ROVAS['v'], // V + V
        'x': LATIN_TO_ROVAS['k'] + LATIN_TO_ROVAS['sz'], // K + SZ
        'y': LATIN_TO_ROVAS['i'], // I
    };
    return decompositions[latinKey] ?? null;
}
/**
 * Nagybetű alkalmazása a rovás kimenetre
 * Spec: 4.8 - Nagybetű-kezelés
 */
function applyCapitalization(rovasChar, latinKey, position, cfg, originalText) {
    if (!cfg.useCapitals)
        return rovasChar;
    // Megvizsgáljuk, hogy az eredeti szövegben nagybetű áll-e ezen a pozíción
    const origChar = originalText[position];
    if (!origChar)
        return rovasChar;
    const isUpperCase = origChar !== origChar.toLowerCase() && origChar === origChar.toUpperCase();
    if (!isUpperCase)
        return rovasChar;
    // Megkeressük a nagybetűs rovás kódpontot
    const baseKey = latinKey.length === 1 ? latinKey : latinKey; // pl. 'cs', 'gy'
    const upperRovas = LATIN_TO_ROVAS_UPPER[baseKey];
    if (upperRovas)
        return upperRovas;
    return rovasChar; // Ha nincs nagybetűs változat, marad a kisbetűs
}
/**
 * Elválasztójellel megszakított karakter-kinyerés
 * Spec: 4.5 - "A `|` miatt a 'g' és 'y' NEM alkotnak 'gy' kettős betűt"
 *
 * @param text - Kisbetűs szöveg
 * @param start - Kezdőpozíció
 * @param count - Kívánt karakterszám
 * @returns Karakterek (elválasztójel átugrásával), hasSeparatorBefore2 jelző, tényleges advance
 */
function getCharsIgnoringSeparator(text, start, count) {
    let chars = '';
    let hasSeparatorBefore2 = false;
    let advance = 0;
    let charCount = 0;
    let i = start;
    while (i < text.length && charCount < count) {
        const c = text[i];
        if (c === '|') {
            // Elválasztójel: ha már van karakter az első után, ez megszakít
            if (charCount >= 1) {
                // Az elválasztójel után a következő karakterek NEM alkothatnak kettős betűt az előzőkkel
                hasSeparatorBefore2 = true;
                // Az elválasztójel önmagában 1 advance, de nem ad karaktert
                // Ettől a ponttól a chars nem fog egyezni semmivel - visszaadjuk amit összegyűjtöttünk
                break;
            }
            i++;
            advance++;
            continue;
        }
        chars += c;
        charCount++;
        advance++;
        i++;
    }
    return { chars, hasSeparatorBefore2, advance };
}
/**
 * Elválasztójel-kezelés pontosabb változata
 * A hasSeparatorBefore2 csak akkor true, ha az ELSŐ és MÁSODIK karakter KÖZÖTT van |
 * Spec: 4.5 - "meg|yógyul" → g és y nem alkotnak gy-t
 */
function _hasSeparatorBetween(text, start) {
    // Ellenőrzi, hogy a start pozíció utáni karakter(ek) között van-e |
    let i = start;
    let charSeen = 0;
    while (i < text.length && charSeen < 2) {
        if (text[i] === '|') {
            if (charSeen === 1)
                return true; // | az 1. és 2. karakter között
        }
        else {
            charSeen++;
        }
        i++;
    }
    return false;
}
// Export segédfüggvények (Spec: 7.2)
export { latinToRovas as default };
//# sourceMappingURL=latin-to-rovas.js.map