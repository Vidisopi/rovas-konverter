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
export const ROVAS_TO_LATIN = {
    // === Magánhangzók (kisbetűs rovás) ===
    // Spec: 3.1 táblázat
    '\u{10CC0}': 'a', // A
    '\u{10CC1}': 'á', // AA
    '\u{10CC8}': 'e', // E (nyílt)
    '\u{10CC9}': 'e', // E (zárt) → 'e' (Spec: 5.2 - megkülönböztetés elvész)
    '\u{10CCA}': 'é', // É
    '\u{10CCE}': 'i', // I
    '\u{10CCF}': 'í', // II
    '\u{10CD6}': 'o', // O
    '\u{10CD7}': 'ó', // OO
    '\u{10CD8}': 'ö', // Ö
    '\u{10CD9}': 'ő', // ŐŰ
    '\u{10CDE}': 'u', // U
    '\u{10CDF}': 'ú', // UU
    '\u{10CE0}': 'ü', // Ü
    '\u{10CE1}': 'ű', // ŰŐ
    // === Mássalhangzók (kisbetűs rovás) ===
    // Spec: 3.2 táblázat
    '\u{10CC2}': 'b', // eB
    '\u{10CC4}': 'c', // eC
    '\u{10CC6}': 'cs', // eCS
    '\u{10CC7}': 'd', // eD
    '\u{10CCB}': 'f', // eF
    '\u{10CCC}': 'g', // eG
    '\u{10CCD}': 'gy', // eGY
    '\u{10CD0}': 'h', // eH
    '\u{10CD1}': 'j', // eJ
    '\u{10CD2}': 'k', // eK (magas K) → 'k' (Spec: 5.2)
    '\u{10CD3}': 'k', // aK (mély K) → 'k' (Spec: 5.2 - hangrendiség info elvész)
    '\u{10CD4}': 'l', // eL
    '\u{10CD5}': 'ly', // eLY
    '\u{10CDA}': 'm', // eM
    '\u{10CDB}': 'n', // eN
    '\u{10CDC}': 'ny', // eNY
    '\u{10CDD}': 'p', // eP
    '\u{10CE2}': 'r', // eR
    '\u{10CE4}': 's', // eS
    '\u{10CE6}': 'sz', // eSZ
    '\u{10CE7}': 't', // eT
    '\u{10CE8}': 'ty', // eTY
    '\u{10CEE}': 'v', // eV
    '\u{10CEF}': 'z', // eZ
    '\u{10CF0}': 'zs', // eZS
    // === Nagybetűs rovás kódpontok → latin nagybetű ===
    // Spec: 5.2 - "Nagybetűs rovás kódpontok → latin nagybetű"
    '\u{10C80}': 'A', // A (nagy)
    '\u{10C81}': 'Á', // AA (nagy)
    '\u{10C88}': 'E', // E nyílt (nagy)
    '\u{10C89}': 'E', // E zárt (nagy)
    '\u{10C8A}': 'É', // É (nagy)
    '\u{10C8E}': 'I', // I (nagy)
    '\u{10C8F}': 'Í', // II (nagy)
    '\u{10C96}': 'O', // O (nagy)
    '\u{10C97}': 'Ó', // OO (nagy)
    '\u{10C98}': 'Ö', // Ö (nagy)
    '\u{10C99}': 'Ő', // ŐŰ (nagy)
    '\u{10C9E}': 'U', // U (nagy)
    '\u{10C9F}': 'Ú', // UU (nagy)
    '\u{10CA0}': 'Ü', // Ü (nagy)
    '\u{10CA1}': 'Ű', // ŰŐ (nagy)
    '\u{10C82}': 'B', // eB (nagy)
    '\u{10C84}': 'C', // eC (nagy)
    '\u{10C86}': 'Cs', // eCS (nagy)
    '\u{10C87}': 'D', // eD (nagy)
    '\u{10C8B}': 'F', // eF (nagy)
    '\u{10C8C}': 'G', // eG (nagy)
    '\u{10C8D}': 'Gy', // eGY (nagy)
    '\u{10C90}': 'H', // eH (nagy)
    '\u{10C91}': 'J', // eJ (nagy)
    '\u{10C92}': 'K', // eK magas (nagy)
    '\u{10C93}': 'K', // aK mély (nagy)
    '\u{10C94}': 'L', // eL (nagy)
    '\u{10C95}': 'Ly', // eLY (nagy)
    '\u{10C9A}': 'M', // eM (nagy)
    '\u{10C9B}': 'N', // eN (nagy)
    '\u{10C9C}': 'Ny', // eNY (nagy)
    '\u{10C9D}': 'P', // eP (nagy)
    '\u{10CA2}': 'R', // eR (nagy)
    '\u{10CA4}': 'S', // eS (nagy)
    '\u{10CA6}': 'Sz', // eSZ (nagy)
    '\u{10CA7}': 'T', // eT (nagy)
    '\u{10CA8}': 'Ty', // eTY (nagy)
    '\u{10CAE}': 'V', // eV (nagy)
    '\u{10CAF}': 'Z', // eZ (nagy)
    '\u{10CB0}': 'Zs', // eZS (nagy)
};
/**
 * ZWJ ligatúrák → latin megfelelők
 * Spec: 3.3, 5.2
 * Ezeket a ZWJ-t tartalmazó kódpont-sorozatokat ELŐBB kell keresni,
 * mint az egyszerű kódpontokat.
 */
export const ROVAS_LIGATURES_TO_LATIN = {
    // Idegen betű ligatúrák - Spec: 3.3
    '\u{10CC7}\u200D\u{10CF0}': 'dzs', // DZS (D+ZWJ+ZS)
    '\u{10CC7}\u200D\u{10CEF}': 'dz', // DZ (D+ZWJ+Z)
    '\u{10CD3}\u200D\u{10CEE}': 'q', // Q (K+ZWJ+V)
    '\u{10CEE}\u200D\u{10CEE}': 'w', // W (V+ZWJ+V)
    '\u{10CD3}\u200D\u{10CE6}': 'x', // X (K+ZWJ+SZ)
    '\u{10CCE}\u200D\u{10CD1}': 'y', // Y (I+ZWJ+J)
    // Nagybetűs változatok (ha léteznek)
    '\u{10C87}\u200D\u{10CB0}': 'Dzs', // DZS nagy
    '\u{10C87}\u200D\u{10CAF}': 'Dz', // DZ nagy
};
//# sourceMappingURL=inverse.js.map