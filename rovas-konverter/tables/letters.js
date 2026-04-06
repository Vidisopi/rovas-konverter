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
export const LATIN_TO_ROVAS = {
    // === 3 karakteres kulcsok (hosszú kettős betűk) ===
    // Spec: 4.3.1 - Hosszú kettős betűk (3 latin karakter → kettőzött rovás jel)
    'ccs': '\u{10CC6}\u{10CC6}', // eCS + eCS
    'ggy': '\u{10CCD}\u{10CCD}', // eGY + eGY
    'lly': '\u{10CD5}\u{10CD5}', // eLY + eLY
    'nny': '\u{10CDC}\u{10CDC}', // eNY + eNY
    'ssz': '\u{10CE6}\u{10CE6}', // eSZ + eSZ
    'tty': '\u{10CE8}\u{10CE8}', // eTY + eTY
    'zzs': '\u{10CF0}\u{10CF0}', // eZS + eZS
    // === Hármas betű ===
    // Spec: 4.3.3 - DZS ligatúra
    'dzs': '\u{10CC7}\u200D\u{10CF0}', // D + ZWJ + ZS
    // === 2 karakteres kulcsok (kettős betűk) ===
    // Spec: 4.3.2 - Kettős betűk (2 latin karakter → 1 rovás jel)
    'cs': '\u{10CC6}', // eCS
    'gy': '\u{10CCD}', // eGY
    'ly': '\u{10CD5}', // eLY
    'ny': '\u{10CDC}', // eNY
    'sz': '\u{10CE6}', // eSZ
    'ty': '\u{10CE8}', // eTY
    'zs': '\u{10CF0}', // eZS
    'dz': '\u{10CC7}\u200D\u{10CEF}', // D + ZWJ + Z
    // === Idegen betűk - 2 karakteres ===
    // Spec: 4.3.4 - Idegen betűk
    'qu': '\u{10CD3}\u{10CEE}', // K + V (nem ligatúra, Spec: 8.1)
    // === Magánhangzók (1 karakteres) ===
    // Spec: 3.1 táblázat
    'a': '\u{10CC0}', // A
    'á': '\u{10CC1}', // AA
    'e': '\u{10CC8}', // E (nyílt)
    'ë': '\u{10CC9}', // E (zárt) - Spec: 4.11
    'é': '\u{10CCA}', // É
    'i': '\u{10CCE}', // I
    'í': '\u{10CCF}', // II
    'o': '\u{10CD6}', // O
    'ó': '\u{10CD7}', // OO
    'ö': '\u{10CD8}', // Ö
    'ő': '\u{10CD9}', // ŐŰ
    'u': '\u{10CDE}', // U
    'ú': '\u{10CDF}', // UU
    'ü': '\u{10CE0}', // Ü
    'ű': '\u{10CE1}', // ŰŐ
    // === Mássalhangzók (1 karakteres) ===
    // Spec: 3.2 táblázat
    'b': '\u{10CC2}', // eB
    'c': '\u{10CC4}', // eC
    'd': '\u{10CC7}', // eD
    'f': '\u{10CCB}', // eF
    'g': '\u{10CCC}', // eG
    'h': '\u{10CD0}', // eH
    'j': '\u{10CD1}', // eJ
    'k': '\u{10CD2}', // alapértelmezés: magas K (eK) - Spec: 4.4
    'l': '\u{10CD4}', // eL
    'm': '\u{10CDA}', // eM
    'n': '\u{10CDB}', // eN
    'p': '\u{10CDD}', // eP
    'r': '\u{10CE2}', // eR
    's': '\u{10CE4}', // eS
    't': '\u{10CE7}', // eT
    'v': '\u{10CEE}', // eV
    'z': '\u{10CEF}', // eZ
    // === Idegen betűk (1 karakteres) ===
    // Spec: 4.3.4 - Idegen betűk
    'q': '\u{10CD3}\u200D\u{10CEE}', // Q ligatúra (K+ZWJ+V)
    'w': '\u{10CEE}\u200D\u{10CEE}', // W ligatúra (V+ZWJ+V)
    'x': '\u{10CD3}\u200D\u{10CE6}', // X ligatúra (K+ZWJ+SZ)
    'y': '\u{10CCE}\u200D\u{10CD1}', // Y ligatúra (I+ZWJ+J) - ha nem kettős betű része
    // === Írásjelek ===
    // Spec: 4.7 - Írásjelek konverziója
    ',': '\u2E41', // Tükrözött vessző (U+2E41)
};
/**
 * Nagybetűs rovás kódpontok táblázata
 * Spec: 4.8 - Nagybetű-kezelés
 * Spec: 3.1, 3.2 - Unicode kódpontok (nagy)
 */
export const LATIN_TO_ROVAS_UPPER = {
    // Magánhangzók - nagybetűs rovás kódpontok
    'a': '\u{10C80}', // A (nagy)
    'á': '\u{10C81}', // AA (nagy)
    'e': '\u{10C88}', // E nyílt (nagy)
    'ë': '\u{10C89}', // E zárt (nagy)
    'é': '\u{10C8A}', // É (nagy)
    'i': '\u{10C8E}', // I (nagy)
    'í': '\u{10C8F}', // II (nagy)
    'o': '\u{10C96}', // O (nagy)
    'ó': '\u{10C97}', // OO (nagy)
    'ö': '\u{10C98}', // Ö (nagy)
    'ő': '\u{10C99}', // ŐŰ (nagy)
    'u': '\u{10C9E}', // U (nagy)
    'ú': '\u{10C9F}', // UU (nagy)
    'ü': '\u{10CA0}', // Ü (nagy)
    'ű': '\u{10CA1}', // ŰŐ (nagy)
    // Mássalhangzók - nagybetűs rovás kódpontok
    'b': '\u{10C82}', // eB (nagy)
    'c': '\u{10C84}', // eC (nagy)
    'cs': '\u{10C86}', // eCS (nagy)
    'd': '\u{10C87}', // eD (nagy)
    'f': '\u{10C8B}', // eF (nagy)
    'g': '\u{10C8C}', // eG (nagy)
    'gy': '\u{10C8D}', // eGY (nagy)
    'h': '\u{10C90}', // eH (nagy)
    'j': '\u{10C91}', // eJ (nagy)
    'k': '\u{10C92}', // eK magas (nagy)
    'l': '\u{10C94}', // eL (nagy)
    'ly': '\u{10C95}', // eLY (nagy)
    'm': '\u{10C9A}', // eM (nagy)
    'n': '\u{10C9B}', // eN (nagy)
    'ny': '\u{10C9C}', // eNY (nagy)
    'p': '\u{10C9D}', // eP (nagy)
    'r': '\u{10CA2}', // eR (nagy)
    's': '\u{10CA4}', // eS (nagy)
    'sz': '\u{10CA6}', // eSZ (nagy)
    't': '\u{10CA7}', // eT (nagy)
    'ty': '\u{10CA8}', // eTY (nagy)
    'v': '\u{10CAE}', // eV (nagy)
    'z': '\u{10CAF}', // eZ (nagy)
    'zs': '\u{10CB0}', // eZS (nagy)
};
//# sourceMappingURL=letters.js.map