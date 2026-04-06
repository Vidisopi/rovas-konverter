/**
 * Rovás Konverter - Hangrendiség-elemző és K-választó
 * Spec: 4.4, 7.2, 8.2
 */
/**
 * Szó hangrendjének típusa
 * Spec: 4.4.2 - getVowelHarmony visszatérési típus
 */
export type VowelHarmony = 'deep' | 'high' | 'mixed' | 'none';
/**
 * Szó hangrendjének meghatározása
 * Spec: 7.2 - getVowelHarmony segédfüggvény
 * Spec: 4.4.1 - Magánhangzók besorolása
 *
 * @param word - A vizsgálandó szó (kisbetűs latin)
 * @returns 'deep' | 'high' | 'mixed' | 'none'
 */
export declare function getVowelHarmony(word: string): VowelHarmony;
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
export declare function selectK(word: string, kPosition: number): string;
/**
 * Szó kinyerése a szövegből egy adott pozíció körül
 * Az elválasztójeleket figyelembe veszi szóhatárként
 * Spec: 4.4.2 lépés 1, 4.5
 *
 * @param text - A teljes kisbetűs szöveg
 * @param position - A K betű pozíciója a szövegben
 * @returns Az aktuális szó és a K pozíciója a szóban
 */
export declare function extractWordForK(text: string, position: number): {
    word: string;
    kPosInWord: number;
};
//# sourceMappingURL=vowel-harmony.d.ts.map