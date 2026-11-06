/**
 * Rovás Konverter - Fő export modul
 * Spec: 1.1 - Kétirányú konverter, latin ↔ rovás
 * Spec: 7.1 - Fő interfész
 * Spec: 10. - Fájlstruktúra (index.ts: Fő export)
 */
export { latinToRovas } from './converters/latin-to-rovas.js';
export { rovasToLatin } from './converters/rovas-to-latin.js';
export { numberToRovas, rovasToNumber, arabicStringToRovas } from './converters/numbers.js';
export type { RovasNumberOptions, ThousandsMode } from './converters/numbers.js';
export { getVowelHarmony, selectK } from './converters/vowel-harmony.js';
export type { RovasConverterConfig } from './config.js';
export { DEFAULT_CONFIG, DEEP_VOWELS, HIGH_VOWELS, DEEP_K, HIGH_K, DEEP_K_UPPER, HIGH_K_UPPER } from './config.js';
export { LATIN_TO_ROVAS } from './tables/letters.js';
export { NUMBER_VALUES, ROVAS_TO_NUMBER } from './tables/numbers.js';
export { ROVAS_TO_LATIN, ROVAS_LIGATURES_TO_LATIN } from './tables/inverse.js';
export { BUG_SIGNS } from './tables/bugsigns.js';
//# sourceMappingURL=index.d.ts.map