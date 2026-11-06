/**
 * Rovás Konverter - Latin → Rovás konverziós tábla
 * Unicode 17 Old Hungarian nevek (U+10C80–U+10CF2).
 * A bogárjelek nincsenek ebben a táblában: külön kódolt karakterek,
 * és csak a bogárjel-kapcsolók helyettesítik őket.
 */
/**
 * Fő konverziós tábla: latin → rovás Unicode
 * Feldolgozási prioritás (mohó egyeztetés):
 * 3 karakteres → 2 karakteres → 1 karakteres
 */
export const LATIN_TO_ROVAS = {
    // Hosszú kettős betűk (3 latin karakter → kettőzött rovás jel)
    'ccs': '\u{10CC6}\u{10CC6}', // ECS + ECS
    'ggy': '\u{10CCE}\u{10CCE}', // EGY + EGY
    'lly': '\u{10CD7}\u{10CD7}', // ELY + ELY
    'nny': '\u{10CDA}\u{10CDA}', // ENY + ENY
    'ssz': '\u{10CE5}\u{10CE5}', // ESZ + ESZ
    'tty': '\u{10CE8}\u{10CE8}', // ETY + ETY
    'zzs': '\u{10CF0}\u{10CF0}', // EZS + EZS
    // Hármas betű
    'dzs': '\u{10CC7}\u200D\u{10CF0}', // ED + ZWJ + EZS
    // Kettős betűk
    'cs': '\u{10CC6}', // ECS
    'gy': '\u{10CCE}', // EGY
    'ly': '\u{10CD7}', // ELY
    'ny': '\u{10CDA}', // ENY
    'sz': '\u{10CE5}', // ESZ
    'ty': '\u{10CE8}', // ETY
    'zs': '\u{10CF0}', // EZS
    'dz': '\u{10CC7}\u200D\u{10CEF}', // ED + ZWJ + EZ
    // Idegen betűk – 2 karakteres
    // N4268R: a q a kv összerovása, ek-val (nem ak-val)
    'qu': '\u{10CD3}\u{10CEE}', // EK + EV, ZWJ nélkül
    // Magánhangzók
    'a': '\u{10CC0}', // A
    'á': '\u{10CC1}', // AA
    'e': '\u{10CC9}', // E (nyílt)
    'ë': '\u{10CCA}', // CLOSE E (zárt)
    'é': '\u{10CCB}', // EE
    'i': '\u{10CD0}', // I
    'í': '\u{10CD1}', // II
    'o': '\u{10CDB}', // O
    'ó': '\u{10CDC}', // OO
    // ö: RUDIMENTA OE. A NIKOLSBURG OE egyenrangú történeti változat,
    // a mai felhasználói csoport a Rudimenta-alakot részesíti előnyben (N4268R 10.).
    'ö': '\u{10CDE}',
    'ő': '\u{10CDF}', // OEE (N4268R 8.: az OEE az ő)
    'u': '\u{10CEA}', // U
    'ú': '\u{10CEB}', // UU
    // Forrai-helyesírás a névjegyzék szerint: RUDIMENTA UE = ü, NIKOLSBURG UE = ű.
    // Nincs külön UEE kódpont.
    'ü': '\u{10CED}',
    'ű': '\u{10CEC}',
    // Mássalhangzók
    'b': '\u{10CC2}', // EB
    'c': '\u{10CC4}', // EC
    'd': '\u{10CC7}', // ED
    'f': '\u{10CCC}', // EF
    'g': '\u{10CCD}', // EG
    'h': '\u{10CCF}', // EH
    'j': '\u{10CD2}', // EJ
    'k': '\u{10CD3}', // EK, magas K; a mély K az AK (U+10CD4)
    'l': '\u{10CD6}', // EL
    'm': '\u{10CD8}', // EM
    'n': '\u{10CD9}', // EN
    'p': '\u{10CE0}', // EP
    'r': '\u{10CE2}', // ER
    's': '\u{10CE4}', // ES
    't': '\u{10CE6}', // ET; az ENT külön karakter (U+10CE7)
    'v': '\u{10CEE}', // EV
    'z': '\u{10CEF}', // EZ
    // Idegen betűk
    'q': '\u{10CD3}\u200D\u{10CEE}', // EK + ZWJ + EV
    'w': '\u{10CEE}\u200D\u{10CEE}', // EV + ZWJ + EV
    'x': '\u{10CD3}\u200D\u{10CE5}', // EK + ZWJ + ESZ
    'y': '\u{10CD0}\u200D\u{10CD2}', // I + ZWJ + EJ
    // Írásjelek
    ',': '\u2E41',
};

/**
 * Nagybetűs rovás kódpontok.
 * A nagy K hangrendtől függ: az EK és az AK külön ág a konverterben.
 */
export const LATIN_TO_ROVAS_UPPER = {
    'a': '\u{10C80}',
    'á': '\u{10C81}',
    'e': '\u{10C89}',
    'ë': '\u{10C8A}',
    'é': '\u{10C8B}',
    'i': '\u{10C90}',
    'í': '\u{10C91}',
    'o': '\u{10C9B}',
    'ó': '\u{10C9C}',
    'ö': '\u{10C9E}',
    'ő': '\u{10C9F}',
    'u': '\u{10CAA}',
    'ú': '\u{10CAB}',
    'ü': '\u{10CAD}',
    'ű': '\u{10CAC}',
    'b': '\u{10C82}',
    'c': '\u{10C84}',
    'cs': '\u{10C86}',
    'd': '\u{10C87}',
    'f': '\u{10C8C}',
    'g': '\u{10C8D}',
    'gy': '\u{10C8E}',
    'h': '\u{10C8F}',
    'j': '\u{10C92}',
    'k': '\u{10C93}', // EK; a mély nagy K U+10C94
    'l': '\u{10C96}',
    'ly': '\u{10C97}',
    'm': '\u{10C98}',
    'n': '\u{10C99}',
    'ny': '\u{10C9A}',
    'p': '\u{10CA0}',
    'r': '\u{10CA2}',
    's': '\u{10CA4}',
    'sz': '\u{10CA5}',
    't': '\u{10CA6}',
    'ty': '\u{10CA8}',
    'v': '\u{10CAE}',
    'z': '\u{10CAF}',
    'zs': '\u{10CB0}',
    'dz': '\u{10C87}\u200D\u{10CAF}',
    'dzs': '\u{10C87}\u200D\u{10CB0}',
    'q': '\u{10C93}\u200D\u{10CAE}',
    'qu': '\u{10C93}\u{10CAE}',
    'w': '\u{10CAE}\u200D\u{10CAE}',
    'x': '\u{10C93}\u200D\u{10CA5}',
    'y': '\u{10C90}\u200D\u{10C92}',
};
