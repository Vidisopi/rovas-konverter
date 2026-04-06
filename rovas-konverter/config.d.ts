/**
 * Rovás Konverter Konfiguráció
 * Spec: 6. fejezet - Konfigurációs opciók
 */
export interface RovasConverterConfig {
    /** Hangrendiség-alapú K-választás (mély vs magas K) */
    useVowelHarmonyK: boolean;
    /** Nagybetű-jelölés a rovás kimeneten */
    useCapitals: boolean;
    /** Írásirány */
    direction: 'rtl' | 'ltr';
    /** QWXY kezelési mód */
    foreignLetterMode: 'ligature' | 'decompose';
}
/** Alapértelmezett konfiguráció - Spec: 6. fejezet */
export declare const DEFAULT_CONFIG: RovasConverterConfig;
/**
 * Mély hangrendű magánhangzók - Spec: 4.4.1
 */
export declare const DEEP_VOWELS: Set<string>;
/**
 * Magas hangrendű magánhangzók - Spec: 4.4.1
 */
export declare const HIGH_VOWELS: Set<string>;
/**
 * Mély K (kapocs alakú) - Spec: 3.2 táblázat
 * Unicode: U+10CD3 (aK)
 */
export declare const DEEP_K = "\uD803\uDCD3";
/**
 * Magas K (rombusz alakú) - Spec: 3.2 táblázat
 * Unicode: U+10CD2 (eK)
 */
export declare const HIGH_K = "\uD803\uDCD2";
/**
 * Alapértelmezett K (magas K) - Spec: 4.4
 */
export declare const DEFAULT_K = "\uD803\uDCD2";
/** ZWJ karakter (Zero Width Joiner) - Spec: 3.3 */
export declare const ZWJ = "\u200D";
/** Spec: 4.9 - Törlendő karakterek */
export declare const CHARS_TO_REMOVE: Set<string>;
//# sourceMappingURL=config.d.ts.map