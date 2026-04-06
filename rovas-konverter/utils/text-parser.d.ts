/**
 * Rovás Konverter - Szövegfeldolgozó segédfüggvények
 * Spec: 4.1, 4.5, 4.6.2, 7.2
 */
/**
 * Elválasztójel karakter
 * Spec: 4.5 - "A `|` karakter speciális elválasztójelként működik"
 */
export declare const SEPARATOR_CHAR = "|";
/**
 * Szám detekáláshoz arab számjegyek
 * Spec: 4.6.2 - Számfelismerés a szövegben
 */
export declare const ARABIC_DIGITS: Set<string>;
/**
 * Token típusok a szövegfeldolgozáshoz
 * Spec: 4.1 - Általános feldolgozási algoritmus
 */
export type TokenType = 'text' | 'number' | 'separator' | 'whitespace' | 'punctuation' | 'unknown';
export interface TextToken {
    type: TokenType;
    value: string;
    /** Szó kontextusa a hangrendiség-alapú K-választáshoz */
    wordContext?: string;
}
/**
 * A szöveget tokenekre bontja
 * Spec: 4.1, 4.6.2
 *
 * Egymás melletti arab számjegyeket egyetlen number tokenként kezeli.
 * Whitespace megőrződik.
 * Az elválasztójel | feldolgozandó (nem kerül a kimenetre, de szétválaszt).
 */
export declare function tokenizeText(text: string): TextToken[];
/**
 * Szó hangrendhez a szót (magánhangzóit) kinyeri a latin szövegből
 * Spec: 4.4.2 - A szót azonosítjuk
 */
export declare function extractWordBoundary(text: string, position: number): {
    start: number;
    end: number;
};
/**
 * A szóban lévő magánhangzókat kinyeri az elválasztójelek figyelembevételével
 * Spec: 4.4.2, 4.5
 */
export declare function extractVowelsFromWord(word: string): string[];
/**
 * Szöveg kisbetűsítése, megőrizve az eredeti string struktúrát
 * de visszaadva a kisbetűs verziót és az uppercase pozíciókat
 * Spec: 4.1 lépés 1-2, 4.8
 */
export declare function analyzeCase(text: string): {
    lowercase: string;
    uppercasePositions: Set<number>;
    allUpperWords: Set<number>;
};
//# sourceMappingURL=text-parser.d.ts.map