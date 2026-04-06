/**
 * Rovás Konverter - Írásjelek tábla
 * Spec: 3.5, 4.7
 */
/**
 * Latin írásjelek → Rovás megfelelők
 * Spec: 4.7 - Írásjelek konverziója
 */
export declare const PUNCTUATION_TO_ROVAS: Record<string, string>;
/**
 * Rovás írásjelek → Latin megfelelők (inverz)
 * Spec: 5.4 - Írásjelek visszafejtése
 */
export declare const ROVAS_TO_PUNCTUATION: Record<string, string>;
/**
 * Idézőjel kontextus-kezelés
 * Spec: 4.7 - "A `"` karakter kontextusfüggő: ha utána alfanumerikus karakter jön,
 * akkor nyitó idézőjel (→ ⹂), egyébként záró."
 *
 * A kontextusfüggő idézőjel konverzió a konverter logikájában történik.
 */
export declare const OPENING_QUOTE_LATIN = "\"";
export declare const OPENING_QUOTE_ROVAS = "\u2E42";
export declare const CLOSING_QUOTE_LATIN = "\"";
//# sourceMappingURL=punctuation.d.ts.map