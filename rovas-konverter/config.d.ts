/**
 * Rovás Konverter Konfiguráció
 * Spec: 6. fejezet - Konfigurációs opciók
 */
import { ThousandsMode } from './converters/numbers.js';
export interface RovasConverterConfig {
    /** Hangrendiség-alapú K-választás (mély vs magas K) */
    useVowelHarmonyK: boolean;
    /** Nagybetű-jelölés a rovás kimeneten */
    useCapitals: boolean;
    /** Írásirány */
    direction: 'rtl' | 'ltr';
    /** Ezresjelek olvasása és nagyszám-írása; alapértelmezés: multiplicative */
    thousandsMode: ThousandsMode;
    /** QWXY kezelési mód */
    foreignLetterMode: 'ligature' | 'decompose';
    /**
     * Homorgán nazális bogárjelek.
     * 'off': nincs automatikus behelyettesítés.
     * 'traditional': a Unicode-nevek és az ENT ant/int változata.
     * 'cluster': mb, nc, nd, nk, mp, nt; a magánhangzó külön betű.
     */
    homorganicMode: 'off' | 'traditional' | 'cluster';
    /** traditional módban az ENT visszaolvasott magánhangzója */
    entVowel: 'e' | 'a' | 'i';
    /** traditional módban az EMP Unicode-neve vagy Friedrich vitatott OMP olvasata */
    empReading: 'emp' | 'omp';
    /**
     * ENT-SHAPED SIGN. Nem az ENT.
     * 'preserve': nincs hanghelyettesítés.
     * 'tprus': a régi szakirodalmi név.
     * 'temperius': a rövidítés azonosítása (N4268R, Unicode-névjegyzék).
     */
    entShapedReading: 'preserve' | 'tprus' | 'temperius';
    /** US jel. Kikapcsolva a karakter változatlan marad. */
    useUsSign: boolean;
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
/** Mély K (AK), U+10CD4 */
export declare const DEEP_K = "\u{10CD4}";
/** Mély K nagybetű, U+10C94 */
export declare const DEEP_K_UPPER = "\u{10C94}";
/** Magas K (EK), U+10CD3 */
export declare const HIGH_K = "\u{10CD3}";
/** Magas K nagybetű, U+10C93 */
export declare const HIGH_K_UPPER = "\u{10C93}";
/** Alapértelmezett K (magas K) */
export declare const DEFAULT_K = "\u{10CD3}";
/** ZWJ karakter (Zero Width Joiner) - Spec: 3.3 */
export declare const ZWJ = "\u200D";
/** Spec: 4.9 - Törlendő karakterek */
export declare const CHARS_TO_REMOVE: Set<string>;