/**
 * Rovás Konverter - Hangrendiség-elemző és K-választó
 * Spec: 4.4, 7.2, 8.2
 */
import { DEEP_VOWELS, HIGH_VOWELS, DEEP_K, HIGH_K } from '../config.js';
/**
 * Szó hangrendjének meghatározása
 * Spec: 7.2 - getVowelHarmony segédfüggvény
 * Spec: 4.4.1 - Magánhangzók besorolása
 *
 * @param word - A vizsgálandó szó (kisbetűs latin)
 * @returns 'deep' | 'high' | 'mixed' | 'none'
 */
export function getVowelHarmony(word) {
    const lowerWord = word.toLowerCase();
    let hasDeep = false;
    let hasHigh = false;
    for (const char of lowerWord) {
        if (DEEP_VOWELS.has(char)) {
            hasDeep = true;
        }
        else if (HIGH_VOWELS.has(char)) {
            hasHigh = true;
        }
    }
    if (!hasDeep && !hasHigh)
        return 'none';
    if (hasDeep && !hasHigh)
        return 'deep';
    if (!hasDeep && hasHigh)
        return 'high';
    return 'mixed';
}
/**
 * K jel kiválasztása hangrendiség alapján
 * Spec: 7.2 - selectK segédfüggvény
 * Spec: 4.4.2 - Algoritmus
 * Spec: 4.4.3 - Vegyes hangrendű szavak kezelése
 *
 * @param word - A szó kisbetűs latin formája (elválasztójelek nélkül)
 * @param kPosition - A 'k' betű pozíciója a szóban (0-alapú index)
 * @returns Unicode kódpont string (DEEP_K vagy HIGH_K)
 */
export function selectK(word, kPosition) {
    const harmony = getVowelHarmony(word);
    // Spec: 4.4.2 lépés 3a - Ha MINDEN magánhangzó mély → mély K
    if (harmony === 'deep')
        return DEEP_K;
    // Spec: 4.4.2 lépés 3b - Ha MINDEN magánhangzó magas → magas K
    if (harmony === 'high')
        return HIGH_K;
    // Spec: 4.4.2 lépés 3d - Ha nincs magánhangzó → magas K (alapértelmezés)
    if (harmony === 'none')
        return HIGH_K;
    // Spec: 4.4.2 lépés 3c, 4.4.3 - Vegyes hangrendű: legközelebbi magánhangzó dönt
    return selectKByProximity(word, kPosition);
}
/**
 * Legközelebbi magánhangzó alapján választ K-t (vegyes hangrendű szavakhoz)
 * Spec: 4.4.3 - Vegyes hangrendű szavak kezelése
 *
 * ALGORITMUS:
 * 1. K pozíciójától balra keresünk magánhangzót (leftVowel, leftDist)
 * 2. K pozíciójától jobbra keresünk magánhangzót (rightVowel, rightDist)
 * 3. Ha csak egy irányban → az dönt
 * 4. Ha mindkét irányban: kisebb távolság dönt, egyenlőnél bal prioritás
 * 5. Ha nincs magánhangzó → magas K
 */
function selectKByProximity(word, kPosition) {
    const lowerWord = word.toLowerCase();
    // Balra keresés
    let leftVowel = null;
    let leftDist = Infinity;
    for (let i = kPosition - 1; i >= 0; i--) {
        const char = lowerWord[i];
        if (DEEP_VOWELS.has(char) || HIGH_VOWELS.has(char)) {
            leftVowel = char;
            leftDist = kPosition - i;
            break;
        }
    }
    // Jobbra keresés
    let rightVowel = null;
    let rightDist = Infinity;
    for (let i = kPosition + 1; i < lowerWord.length; i++) {
        const char = lowerWord[i];
        if (DEEP_VOWELS.has(char) || HIGH_VOWELS.has(char)) {
            rightVowel = char;
            rightDist = i - kPosition;
            break;
        }
    }
    // Döntés
    let decidingVowel = null;
    if (leftVowel !== null && rightVowel === null) {
        // Spec: 4.4.3 lépés 3 - csak egy irányban van
        decidingVowel = leftVowel;
    }
    else if (leftVowel === null && rightVowel !== null) {
        // Spec: 4.4.3 lépés 3 - csak egy irányban van
        decidingVowel = rightVowel;
    }
    else if (leftVowel !== null && rightVowel !== null) {
        if (leftDist < rightDist) {
            // Spec: 4.4.3 lépés 4a - bal közelebb
            decidingVowel = leftVowel;
        }
        else if (rightDist < leftDist) {
            // Spec: 4.4.3 lépés 4b - jobb közelebb
            decidingVowel = rightVowel;
        }
        else {
            // Spec: 4.4.3 lépés 4c - egyenlő távolság → bal prioritás
            decidingVowel = leftVowel;
        }
    }
    // Spec: 4.4.3 lépés 5 - nincs magánhangzó → magas K
    if (decidingVowel === null)
        return HIGH_K;
    return DEEP_VOWELS.has(decidingVowel) ? DEEP_K : HIGH_K;
}
/**
 * Szó kinyerése a szövegből egy adott pozíció körül
 * Az elválasztójeleket figyelembe veszi szóhatárként
 * Spec: 4.4.2 lépés 1, 4.5
 *
 * @param text - A teljes kisbetűs szöveg
 * @param position - A K betű pozíciója a szövegben
 * @returns Az aktuális szó és a K pozíciója a szóban
 */
export function extractWordForK(text, position) {
    // Szóhatárok: whitespace, elválasztójel NEM szóhatár (feldolgozandó, nem vágóhatár)
    // A hangrendiség szempontjából a | jel az eredeti szót nem osztja szét,
    // csak a kettős betű felismerést akadályozza. Spec: 4.5
    // A K-választásnál a | jelet figyelmen kívül hagyjuk (csak a betűk számítanak)
    const WORD_BOUNDARY = /[\s,\.!?;:„"\-]/;
    let start = position;
    while (start > 0 && !WORD_BOUNDARY.test(text[start - 1])) {
        start--;
    }
    let end = position;
    while (end < text.length && !WORD_BOUNDARY.test(text[end])) {
        end++;
    }
    // A | karaktereket eltávolítjuk, de a pozíciót korrigálni kell
    const rawWord = text.slice(start, end);
    let word = '';
    let kPosInWord = 0;
    let originalOffset = 0;
    for (let i = 0; i < rawWord.length; i++) {
        if (rawWord[i] === '|') {
            // Elválasztójel: kihagyjuk, de az eltolást nem növeljük
            if (start + i < position) {
                originalOffset++;
            }
            continue;
        }
        if (start + i === position) {
            kPosInWord = word.length;
        }
        word += rawWord[i];
    }
    return { word, kPosInWord };
}
//# sourceMappingURL=vowel-harmony.js.map