/**
 * Rovás Konverter - Írásjelek tábla
 * Spec: 3.5, 4.7
 */
/**
 * Latin írásjelek → Rovás megfelelők
 * Spec: 4.7 - Írásjelek konverziója
 */
export const PUNCTUATION_TO_ROVAS = {
    ',': '\u2E41', // Tükrözött vessző (U+2E41)
    '„': '\u2E42', // Tükrözött idézőjel (U+2E42) - nyitó idézőjel
    '?': '\u2E2E', // Tükrözött kérdőjel (U+2E2E)
    // A következő jelek változatlanok maradnak (Spec: 4.7):
    // '"', '.', '!', ':', ';', '-'
};
/**
 * Rovás írásjelek → Latin megfelelők (inverz)
 * Spec: 5.4 - Írásjelek visszafejtése
 */
export const ROVAS_TO_PUNCTUATION = {
    '\u2E41': ',', // Tükrözött vessző → ,
    '\u2E42': '„', // Tükrözött idézőjel → „
};
/**
 * Idézőjel kontextus-kezelés
 * Spec: 4.7 - "A `"` karakter kontextusfüggő: ha utána alfanumerikus karakter jön,
 * akkor nyitó idézőjel (→ ⹂), egyébként záró."
 *
 * A kontextusfüggő idézőjel konverzió a konverter logikájában történik.
 */
export const OPENING_QUOTE_LATIN = '"'; // ASCII dupla idézőjel
export const OPENING_QUOTE_ROVAS = '\u2E42'; // ⹂
export const CLOSING_QUOTE_LATIN = '"'; // Záró marad változatlan
//# sourceMappingURL=punctuation.js.map