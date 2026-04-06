/**
 * Rovás Konverter - Fő export modul
 * Spec: 1.1 - Kétirányú konverter, latin ↔ rovás
 * Spec: 7.1 - Fő interfész
 * Spec: 10. - Fájlstruktúra (index.ts: Fő export)
 */
// Fő konverziós függvények
// Spec: 7.1
export { latinToRovas } from './converters/latin-to-rovas.js';
export { rovasToLatin } from './converters/rovas-to-latin.js';
export { numberToRovas, rovasToNumber, arabicStringToRovas } from './converters/numbers.js';
// Segédfüggvények
// Spec: 7.2
export { getVowelHarmony, selectK } from './converters/vowel-harmony.js';
export { DEFAULT_CONFIG, DEEP_VOWELS, HIGH_VOWELS, DEEP_K, HIGH_K } from './config.js';
// Táblázatok (opcionális export, haladó használatra)
export { LATIN_TO_ROVAS } from './tables/letters.js';
export { NUMBER_VALUES, ROVAS_TO_NUMBER } from './tables/numbers.js';
export { ROVAS_TO_LATIN, ROVAS_LIGATURES_TO_LATIN } from './tables/inverse.js';
//# sourceMappingURL=index.js.map