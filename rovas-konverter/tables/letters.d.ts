/**
 * Rovás Konverter - Latin → Rovás konverziós tábla
 * Spec: 3.1, 3.2, 3.3, 4.2, 4.3, 8.1
 */
/**
 * Fő konverziós tábla: latin → rovás Unicode
 * Spec: 8.1 - Konverziós táblák
 *
 * Feldolgozási prioritás (mohó egyeztetés):
 * 3 karakteres → 2 karakteres → 1 karakteres
 * Spec: 4.2
 */
export declare const LATIN_TO_ROVAS: Record<string, string>;
/**
 * Nagybetűs rovás kódpontok táblázata
 * Spec: 4.8 - Nagybetű-kezelés
 * Spec: 3.1, 3.2 - Unicode kódpontok (nagy)
 */
export declare const LATIN_TO_ROVAS_UPPER: Record<string, string>;
//# sourceMappingURL=letters.d.ts.map