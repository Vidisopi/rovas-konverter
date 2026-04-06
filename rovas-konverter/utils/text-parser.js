/**
 * Rovás Konverter - Szövegfeldolgozó segédfüggvények
 * Spec: 4.1, 4.5, 4.6.2, 7.2
 */
/**
 * Elválasztójel karakter
 * Spec: 4.5 - "A `|` karakter speciális elválasztójelként működik"
 */
export const SEPARATOR_CHAR = '|';
/**
 * Szám detekáláshoz arab számjegyek
 * Spec: 4.6.2 - Számfelismerés a szövegben
 */
export const ARABIC_DIGITS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
/**
 * A szöveget tokenekre bontja
 * Spec: 4.1, 4.6.2
 *
 * Egymás melletti arab számjegyeket egyetlen number tokenként kezeli.
 * Whitespace megőrződik.
 * Az elválasztójel | feldolgozandó (nem kerül a kimenetre, de szétválaszt).
 */
export function tokenizeText(text) {
    const tokens = [];
    let i = 0;
    while (i < text.length) {
        const char = text[i];
        // Whitespace
        if (/\s/.test(char)) {
            let ws = '';
            while (i < text.length && /\s/.test(text[i])) {
                ws += text[i];
                i++;
            }
            tokens.push({ type: 'whitespace', value: ws });
            continue;
        }
        // Számok - egymás melletti arab számjegyeket egy tokenként kezeljük
        // Spec: 4.6.2
        if (ARABIC_DIGITS.has(char)) {
            let num = '';
            while (i < text.length && ARABIC_DIGITS.has(text[i])) {
                num += text[i];
                i++;
            }
            tokens.push({ type: 'number', value: num });
            continue;
        }
        // Elválasztójel
        // Spec: 4.5
        if (char === SEPARATOR_CHAR) {
            tokens.push({ type: 'separator', value: char });
            i++;
            continue;
        }
        // Betűk (text token)
        // A szöveg szó határokat a konverter logikája kezeli
        tokens.push({ type: 'text', value: char });
        i++;
    }
    return tokens;
}
/**
 * Szó hangrendhez a szót (magánhangzóit) kinyeri a latin szövegből
 * Spec: 4.4.2 - A szót azonosítjuk
 */
export function extractWordBoundary(text, position) {
    // Szóhatár: szóköz, írásjelm, vagy string vége/eleje
    const wordBoundaryRegex = /[\s,\.!?;:„"\-]/;
    let start = position;
    while (start > 0 && !wordBoundaryRegex.test(text[start - 1])) {
        start--;
    }
    let end = position;
    while (end < text.length && !wordBoundaryRegex.test(text[end])) {
        end++;
    }
    return { start, end };
}
/**
 * A szóban lévő magánhangzókat kinyeri az elválasztójelek figyelembevételével
 * Spec: 4.4.2, 4.5
 */
export function extractVowelsFromWord(word) {
    const VOWELS = new Set(['a', 'á', 'e', 'ë', 'é', 'i', 'í', 'o', 'ó', 'ö', 'ő', 'u', 'ú', 'ü', 'ű']);
    const result = [];
    for (const char of word.toLowerCase()) {
        if (char !== SEPARATOR_CHAR && VOWELS.has(char)) {
            result.push(char);
        }
    }
    return result;
}
/**
 * Szöveg kisbetűsítése, megőrizve az eredeti string struktúrát
 * de visszaadva a kisbetűs verziót és az uppercase pozíciókat
 * Spec: 4.1 lépés 1-2, 4.8
 */
export function analyzeCase(text) {
    const lowercase = text.toLowerCase();
    const uppercasePositions = new Set();
    const allUpperWords = new Set();
    // Első karakterek megjelölése nagybetűhöz
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== text[i].toLowerCase() && text[i] === text[i].toUpperCase()) {
            uppercasePositions.add(i);
        }
    }
    // CSUPA NAGYBETŰS szavak azonosítása
    const words = text.split(/\s+/);
    let pos = 0;
    for (const word of words) {
        if (word.length > 0 && word === word.toUpperCase() && /[A-ZÁÉÍÓÖŐÚÜŰ]/.test(word)) {
            allUpperWords.add(pos);
        }
        pos += word.length + 1; // +1 a szóközért (hozzávetőleges)
    }
    return { lowercase, uppercasePositions, allUpperWords };
}
//# sourceMappingURL=text-parser.js.map