/**
 * Rovás → latin tábla a Unicode 17 Old Hungarian nevek szerint.
 * A bogárjelek nincsenek itt: az olvasatuk a konfigurációtól függ.
 */
export const ROVAS_TO_LATIN = {
    // Magánhangzók
    '\u{10CC0}': 'a',
    '\u{10CC1}': 'á',
    '\u{10CC9}': 'e',
    '\u{10CCA}': 'e', // CLOSE E: a zárt/nyílt különbség a latin oldalon elvész
    '\u{10CCB}': 'é',
    '\u{10CD0}': 'i',
    '\u{10CD1}': 'í',
    '\u{10CDB}': 'o',
    '\u{10CDC}': 'ó',
    '\u{10CDD}': 'ö', // NIKOLSBURG OE
    '\u{10CDE}': 'ö', // RUDIMENTA OE
    '\u{10CDF}': 'ő', // OEE
    '\u{10CEA}': 'u',
    '\u{10CEB}': 'ú',
    '\u{10CED}': 'ü', // RUDIMENTA UE
    '\u{10CEC}': 'ű', // NIKOLSBURG UE, Forrai ű
    // Mássalhangzók
    '\u{10CC2}': 'b',
    '\u{10CC4}': 'c',
    '\u{10CC6}': 'cs',
    '\u{10CC7}': 'd',
    '\u{10CCC}': 'f',
    '\u{10CCD}': 'g',
    '\u{10CCE}': 'gy',
    '\u{10CCF}': 'h',
    '\u{10CD2}': 'j',
    '\u{10CD3}': 'k', // EK
    '\u{10CD4}': 'k', // AK
    '\u{10CD6}': 'l',
    '\u{10CD7}': 'ly',
    '\u{10CD8}': 'm',
    '\u{10CD9}': 'n',
    '\u{10CDA}': 'ny',
    '\u{10CE0}': 'p',
    '\u{10CE2}': 'r',
    '\u{10CE3}': 'r', // SHORT ER: az r alakváltozata
    '\u{10CE4}': 's',
    '\u{10CE5}': 'sz',
    '\u{10CE6}': 't',
    '\u{10CE8}': 'ty',
    '\u{10CEE}': 'v',
    '\u{10CEF}': 'z',
    '\u{10CF0}': 'zs',
    // Nagybetűk
    '\u{10C80}': 'A',
    '\u{10C81}': 'Á',
    '\u{10C89}': 'E',
    '\u{10C8A}': 'E',
    '\u{10C8B}': 'É',
    '\u{10C90}': 'I',
    '\u{10C91}': 'Í',
    '\u{10C9B}': 'O',
    '\u{10C9C}': 'Ó',
    '\u{10C9D}': 'Ö',
    '\u{10C9E}': 'Ö',
    '\u{10C9F}': 'Ő',
    '\u{10CAA}': 'U',
    '\u{10CAB}': 'Ú',
    '\u{10CAD}': 'Ü',
    '\u{10CAC}': 'Ű',
    '\u{10C82}': 'B',
    '\u{10C84}': 'C',
    '\u{10C86}': 'Cs',
    '\u{10C87}': 'D',
    '\u{10C8C}': 'F',
    '\u{10C8D}': 'G',
    '\u{10C8E}': 'Gy',
    '\u{10C8F}': 'H',
    '\u{10C92}': 'J',
    '\u{10C93}': 'K',
    '\u{10C94}': 'K',
    '\u{10C96}': 'L',
    '\u{10C97}': 'Ly',
    '\u{10C98}': 'M',
    '\u{10C99}': 'N',
    '\u{10C9A}': 'Ny',
    '\u{10CA0}': 'P',
    '\u{10CA2}': 'R',
    '\u{10CA3}': 'R',
    '\u{10CA4}': 'S',
    '\u{10CA5}': 'Sz',
    '\u{10CA6}': 'T',
    '\u{10CA8}': 'Ty',
    '\u{10CAE}': 'V',
    '\u{10CAF}': 'Z',
    '\u{10CB0}': 'Zs',
};

/**
 * ZWJ-s idegenbetű-ligatúrák. Ezek nem bogárjelek:
 * az n+ZWJ+t sor nem az ENT karakter.
 */
export const ROVAS_LIGATURES_TO_LATIN = {
    '\u{10CC7}\u200D\u{10CF0}': 'dzs',
    '\u{10CC7}\u200D\u{10CEF}': 'dz',
    '\u{10CD3}\u200D\u{10CEE}': 'q',
    '\u{10CEE}\u200D\u{10CEE}': 'w',
    '\u{10CD3}\u200D\u{10CE5}': 'x',
    '\u{10CD0}\u200D\u{10CD2}': 'y',
    '\u{10C87}\u200D\u{10CB0}': 'Dzs',
    '\u{10C87}\u200D\u{10CAF}': 'Dz',
    '\u{10C93}\u200D\u{10CAE}': 'Q',
    '\u{10CAE}\u200D\u{10CAE}': 'W',
    '\u{10C93}\u200D\u{10CA5}': 'X',
    '\u{10C90}\u200D\u{10C92}': 'Y',
};
