/**
 * Rovás Konverter - Inverz konverziós tábla (Rovás → Latin)
 * Spec: 5.1, 5.2
 *
 * Ez a tábla a 3.1–3.6 táblázatok inverze.
 * Minden Unicode rovás kódpontra pontosan egy latin megfelelő van.
 */
/**
 * Rovás kódpont → latin karakter/betűkapcsolat
 * Spec: 5.2 - Inverz karaktertábla
 */
export declare const ROVAS_TO_LATIN: Record<string, string>;
/**
 * ZWJ ligatúrák → latin megfelelők
 * Spec: 3.3, 5.2
 * Ezeket a ZWJ-t tartalmazó kódpont-sorozatokat ELŐBB kell keresni,
 * mint az egyszerű kódpontokat.
 */
export declare const ROVAS_LIGATURES_TO_LATIN: Record<string, string>;
//# sourceMappingURL=inverse.d.ts.map