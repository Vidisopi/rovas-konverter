# 𐳢 Rovás Konverter

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](https://opensource.org/licenses/MIT)
[![Élő demó](https://img.shields.io/badge/demó-élő-brightgreen)](https://vidisopi.github.io/rovas-konverter/)
[![Unicode](https://img.shields.io/badge/Unicode-Old%20Hungarian%20U%2B10C80-blue)](https://www.unicode.org/charts/PDF/U10C80.pdf)
[![SPEC](https://img.shields.io/badge/SPEC-v1.4-purple)](./SPEC.md)

Kétirányú konverter a latin betűs magyar szöveg és a **székely–magyar rovásírás** Unicode karakterei között.

**[→ Élő demó](https://vidisopi.github.io/rovas-konverter/)**

---

## Mi ez?

A székely–magyar rovásírás a magyar nyelv történeti, jobbról balra haladó írásrendszere. A modern számítógépes használatában a Unicode **Old Hungarian** blokkja (`U+10C80`–`U+10CFF`) a szabványos kódtér. Ez a projekt a latin betűs magyar szöveg és a rovás Unicode-jelek közötti átírást végzi a Rovás Alapítvány korszerű jelkészlete, a [rovas.info](https://rovas.info) betűalkalmazási szabályai és a [SPEC.md](./SPEC.md) alapján.

A számoknál a hagyományos jelek (1, 5, 10, 50, 100, 1000) szorzó–összeadó rendszerét használjuk. Az egymillió és a nagyobb értékek a modern Vér Csaba / Friedrich Klára-konvenció szerint az ezresjel ismétlésével írhatók; a vezető `𐳿𐳿` alak olvasása kapcsolható.

---

## Főbb képességek

- ✅ **Latin → rovás** (elsődleges irány)
- ✅ **Rovás → latin** (visszafejtés)
- ✅ **Számkonverzió** mindkét irányban, milliótól felfelé is
- ✅ **`thousandsMode` kapcsoló** – alapértelmezés: `𐳿𐳿 = 1 000 000`; választható additív olvasat: `𐳿𐳿 = 2000`
- ✅ **Hangrendiség szerinti K-választás** – mély (*aK*) és magas (*eK*)
- ✅ **Nagybetűk** – Unicode Old Hungarian nagybetűs kódpontokkal
- ✅ **Kettős és hármas betűk** – `cs`, `gy`, `ly`, `ny`, `sz`, `ty`, `zs`, `dz`, `dzs` és hosszú alakjaik
- ✅ **Idegen betűk** – `q`, `w`, `x`, `y` ligatúraként vagy feloldva
- ✅ **Elválasztójel** – a `|` megakadályozza a téves kettősbetű-felismerést szóösszetételeknél
- ✅ **Írásjelek** – tükrözött vessző, fordított idézőjel, fordított kérdőjel
- ✅ **Bogárjelek** – a hat homorgán nazális, az ENT-alakú jel és az US külön Unicode-karakter; alapból nincs automatikus behelyettesítés
- ✅ Függőség nélküli ES-modul, böngészőben és Node.js-ben is használható

---

## Élő demó

Próbáld ki: **https://vidisopi.github.io/rovas-konverter/**

A webes felületen kapcsolható:

- Hangrendiség (K)
- Nagybetűk
- **Ezresjelek szorzása (MM = 1 millió)** – alapértelmezetten bekapcsolva
- Idegen betűk: ligatúra / feloldás
- Homorgán nazális bogárjelek: ki / hagyományos név / mássalhangzó-kapcsolat
- ENT magánhangzója, EMP olvasata, ENT-alakú jel, US jel
- Irányváltás latin ↔ rovás között

Ellenőrzött példák (a jelenlegi kóddal futtatva):

| Latin | Rovás | Megjegyzés |
|-------|-------|------------|
| `magyar` | 𐳘𐳀𐳎𐳀𐳢 | EM + A + EGY + A + ER |
| `cs` | 𐳆 | egyetlen ECS |
| `kirakat` | 𐳓𐳐𐳢𐳀𐳓𐳀𐳦 | alapértelmezett EK |
| `kirakat` + hangrendiség | 𐳓𐳐𐳢𐳀𐳔𐳀𐳦 | a második K AK |
| `2026` | 𐳺𐳺𐳿𐳺𐳺𐳼𐳻𐳺 | rovásszám |
| `1 000 000` | 𐳿𐳿 | multiplikatív alapértelmezés |
| `1 000 000` additív írással | 𐳺𐳿𐳿 | explicit egyes a beágyazott ezresszorzat előtt |
| `antal` | betűnként | bogárjel kikapcsolva; a `t` az ET (U+10CE6), nem az ENT |
| `antal`, hagyományos név | 𐳧𐳀𐳖 | ENT + A + L; visszafelé `ental`, ha az ENT magánhangzója `e` |
| `antal`, mássalhangzó-kapcsolat | 𐳀𐳧𐳀𐳖 | A + ENT + A + L; visszafelé `antal` |

> **Font szükséges.** A jelek helyes megjelenítéséhez telepítsd a [Noto Sans Old Hungarian](https://fonts.google.com/noto/specimen/Noto+Sans+Old+Hungarian) vagy az [OldHungarian](https://oldhungarian.eu) betűtípust. A demó a Noto Sans Old Hungarian webfontot tölti be.

---

## Telepítés

A jelenlegi nyilvános tároló kész ES-modult szállít a `rovas-konverter/` mappában; **nincs `package.json`**, ezért nincs `npm install` / `npm run build` lépés.

```bash
git clone https://github.com/Vidisopi/rovas-konverter.git
cd rovas-konverter
```

Böngészőben nyisd meg az `index.html` fájlt, vagy szolgáld ki a mappát egyszerű HTTP-szerverrel. Node.js alatt közvetlenül importálható a modul.

Tesztelés:

```bash
node --test
```

---

## Használat

### ES-modul (böngésző / Node.js)

```javascript
import {
  latinToRovas,
  rovasToLatin,
  numberToRovas,
  rovasToNumber,
} from './rovas-konverter/index.js';

// Alap átírás
latinToRovas('magyar');
// → '𐳚𐳀𐳍𐳀𐳢'

// Beállításokkal
latinToRovas('kirakat', {
  useVowelHarmonyK: true, // mély / magas K
  useCapitals: false,
});
// → '𐳒𐳎𐳢𐳀𐳓𐳀𐳧'

// Visszafejtés
rovasToLatin('𐳚𐳀𐳍𐳀𐳢');
// → 'magyar'

// Számok – alapértelmezett multiplikatív mód
numberToRovas(2026);        // → '𐳺𐳺𐳿𐳺𐳺𐳼𐳻𐳺'
numberToRovas(1_000_000);   // → '𐳿𐳿'
numberToRovas(1_000_000_000); // → '𐳿𐳿𐳿'
rovasToNumber('𐳿𐳿');       // → 1000000

// Additív mód: a vezető MM = 2000, az írás explicit I-t tesz a millió elé
numberToRovas(1_000_000, { thousandsMode: 'additive' });
// → '𐳺𐳿𐳿'
rovasToNumber('𐳿𐳿', { thousandsMode: 'additive' });
// → 2000
rovasToNumber('𐳺𐳿𐳿', { thousandsMode: 'additive' });
// → 1000000
```

A túl nagy, pontatlan JavaScript-egész `RangeError` hibát dob; csendes modulo-csonkítás nincs.

---

## API-referencia

### `latinToRovas(text, config?)`

Latin betűs magyar szöveget Unicode Old Hungarian jelsorrá alakít.

| Paraméter | Típus | Leírás |
|-----------|-------|--------|
| `text` | `string` | Latin betűs bemenet |
| `config` | `Partial<RovasConverterConfig>` | Opcionális beállítások |

**Visszatérés:** `string` – rovás Unicode-sorozat

### `rovasToLatin(text, config?)`

Unicode Old Hungarian jelsort latin betűs szöveggé alakít. A számjegyek olvasásához továbbítja a `thousandsMode` beállítást.

| Paraméter | Típus | Leírás |
|-----------|-------|--------|
| `text` | `string` | Rovás Unicode-bemenet |
| `config` | `RovasNumberOptions` | Opcionális számolvasási mód |

**Visszatérés:** `string` – latin betűs szöveg

### `numberToRovas(num, options?)`

Egész számot rovásszám-sorozattá alakít.

| Paraméter | Típus | Leírás |
|-----------|-------|--------|
| `num` | `number` | Egész szám (`0`–`Number.MAX_SAFE_INTEGER`) |
| `options` | `RovasNumberOptions` | Opcionális `thousandsMode` |

**Visszatérés:** `string` – rovásszám-sorozat. A `0` üres string; a túl nagy bemenet `RangeError`.

### `rovasToNumber(rovasNum, options?)`

Rovásszám-sorozatot egész számmá alakít.

| Paraméter | Típus | Leírás |
|-----------|-------|--------|
| `rovasNum` | `string` | Rovás számjegyek |
| `options` | `RovasNumberOptions` | Opcionális `thousandsMode` |

**Visszatérés:** `number`

### Konfiguráció

```typescript
type ThousandsMode = 'multiplicative' | 'additive';

interface RovasNumberOptions {
  thousandsMode?: ThousandsMode; // alapértelmezés: 'multiplicative'
}

interface RovasConverterConfig {
  useVowelHarmonyK: boolean;       // alapértelmezés: false
  useCapitals: boolean;            // alapértelmezés: false
  direction: 'rtl' | 'ltr';       // alapértelmezés: 'rtl'
  foreignLetterMode: 'ligature' | 'decompose'; // alapértelmezés: 'ligature'
  thousandsMode: ThousandsMode;    // alapértelmezés: 'multiplicative'
  homorganicMode: 'off' | 'traditional' | 'cluster'; // alapértelmezés: 'off'
  entVowel: 'e' | 'a' | 'i';       // alapértelmezés: 'e'
  empReading: 'emp' | 'omp';       // alapértelmezés: 'emp'
  entShapedReading: 'preserve' | 'tprus' | 'temperius'; // alapértelmezés: 'preserve'
  useUsSign: boolean;              // alapértelmezés: false
}
```

`rovasToLatin` ugyanazt a konfigurációt fogadja. A `thousandsMode` mellett a bogárjel-olvasatot is ez vezérli.

---

## Bogárjelek

A bogárjel és az összerovás nem ugyanaz. Az [Everson–Szelp N4268R](https://www.unicode.org/L2/L2012/12168r-n4268r-oldhungarian.pdf) 5. fejezete hat homorgán nazálist külön betűként ír le (AMB, ENC, AND, UNK, EMP, ENT): egy zárhangot vagy zár-réshangot és az azt megelőző, azonos képzéshelyű nazálist jelölnek, és **nem produktív ligatúrák**. A 6. fejezet összerovásai (például n+c, n+d, n+ek, n+t) választhatók, és ZWJ-vel vagy OpenType-pal kérhetők a betűtípustól. Az n+ZWJ+t sor ezért nem cserélhető fel az ENT karakterrel.

A hatályos kódpontok a [Unicode 17 névjegyzékéből](https://www.unicode.org/Public/17.0.0/charts/nameslist/n_10C80.html):

| Jel | Kisbetű | Nagybetű | Alap visszafejtés |
|-----|---------|----------|-------------------|
| AMB | U+10CC3 | U+10C83 | `mb` |
| ENC | U+10CC5 | U+10C85 | `nc` |
| AND | U+10CC8 | U+10C88 | `nd` |
| UNK | U+10CD5 | U+10C95 | `nk` |
| EMP | U+10CE1 | U+10CA1 | `mp` |
| ENT | U+10CE7 | U+10CA7 | `nt` |
| ENT-SHAPED SIGN | U+10CF1 | U+10CB1 | a karakter megmarad |
| US | U+10CF2 | U+10CB2 | a karakter megmarad |

Az ENT névjegyzéki megjegyzése: „also used for ant and int”. Az ENT-SHAPED SIGN nem ez a jel. A régi szakirodalom tprusnak nevezte; a névjegyzék és az N4268R szerint a nikolsburgi glossza a *temperius* rövidítése. A hangérték bizonytalan. [Friedrich Klára](https://www.rovasirasforrai.hu/Rovasiras/Csudabogarak.htm) több olvasatot vitat, köztük az EMP/OMP, az US és a TPRUS értékét; ezt a vitát a konverter nem dönti el helyettünk.

Alapértelmezés:

- A latin `antal`, `szent`, `tprus`, `us` betűnként megy át. A `t` az ET (U+10CE6).
- Ha a bemenet már tartalmazza a hat nazális jelet, a visszafejtés a mássalhangzó-kapcsolat (`mb`, `nc`, `nd`, `nk`, `mp`, `nt`), magánhangzó hozzátoldása nélkül.
- Az ENT-alakú jel és az US változatlan marad.

Bekapcsolható:

- `homorganicMode: 'traditional'` – `amb`, `enc`, `and`, `unk`, `emp`, `ent`, valamint az ENT `ant` és `int` használata. A magánhangzó a jelbe olvad, ezért `antal` visszafelé `ental`, hacsak `entVowel: 'a'`.
- `homorganicMode: 'cluster'` – `mb`, `nc`, `nd`, `nk`, `mp`, `nt`. A magánhangzó külön betű marad, de az `ember` és a `domb` is bogárjelet kap.
- `empReading: 'omp'` – csak traditional módban, Friedrich vitatott olvasata.
- `entShapedReading: 'tprus'` vagy `'temperius'` – az ENT-alakú jel, nem az ENT.
- `useUsSign: true` – az `us` pár, kivéve ha a `s` a `sz` kettős betű része (`plusz` változatlan).

A szóközt, írásjelet és a `|` elválasztót a helyettesítés nem lépi át. A `ünk` nincs az UNK-ra kötve: erre a források nem adnak egyértelmű szabályt.

## Számírás

A Unicode csak az alábbi hat számjelet kódolja:

| Érték | Jel | Kódpont |
|------:|-----|---------|
| 1 | 𐳺 | U+10CFA |
| 5 | 𐳻 | U+10CFB |
| 10 | 𐳼 | U+10CFC |
| 50 | 𐳽 | U+10CFD |
| 100 | 𐳾 | U+10CFE |
| 1000 | 𐳿 | U+10CFF |

A rendszer **szorzó–összeadó**: a kisebb értékű jelek a tőlük jobbra álló nagyobb helyiérték szorzói. A README-ben az `I`, `V`, `X`, `L`, `C`, `M` betűk a fenti hat jel **logikai rövidítései**, nem római számok.

### Alapértelmezett multiplikatív mód

- `1 253` → `M II C L III` → `𐳿𐳺𐳺𐳾𐳽𐳺𐳺𐳺`
- `2 026` → `II M II X V I` → `𐳺𐳺𐳿𐳺𐳺𐳼𐳻𐳺`
- `1 000 000` → `1000 × 1000` → `MM` → `𐳿𐳿`
- `1 000 000 000` → `1000 × 1000 × 1000` → `MMM` → `𐳿𐳿𐳿`
- `2 500 000` → `II M V C M` → `𐳺𐳺𐳿𐳻𐳾𐳿`

### Kapcsolható additív mód

`thousandsMode: 'additive'` esetén a **teljes számsort alkotó, vezető ezresfutam** összeadandó:

- `𐳿𐳿` → `2000`
- `𐳿𐳿𐳿` → `3000`

Az író ezért a beágyazott ezresszorzat elé explicit egyest tesz:

- `numberToRovas(1_000_000, { thousandsMode: 'additive' })` → `IMM` → `𐳺𐳿𐳿`
- `1 000 000 000` → `IMMM` → `𐳺𐳿𐳿𐳿`

Az `IMM` mindkét olvasási módban `1 000 000`. A többi szorzóblokk változatlan: `IIM = 2000`, `IIX = 20`. Ha a vezető ezresfutam után kisebb maradék áll, a meglévő szorzószabály érvényesül: additív módban is `MMI = 1 000 001`.

### Források

1. [Unicode Old Hungarian táblázat](https://www.unicode.org/charts/PDF/U10C80.pdf) – a hatályos hat számjel.
2. [Friedrich Klára: A magyar számrovásról](https://www.rovasirasforrai.hu/Rovasiras/A-magyar-szamrovasrol_rovid-osszefoglalo.htm) – Vér Csaba javaslatát ajánlja a millió és a nagyobb számok ezresjel-láncával; a szerző jelzi, hogy régészeti lelet ezt egyelőre nem támasztja alá.
3. [Everson–Szelp N4268R](https://www.unicode.org/wg2/docs/n4268.pdf) – multiplikatív–additív rendszer, erős jobbról-balra irányultság; a külön milliós jelek kódolását elhalasztja.
4. [Rumi Tamás N4225](https://www.unicode.org/wg2/docs/n4225.pdf) – előzetes javaslat külön nagy számjelekre; **nem elfogadott Unicode-szabvány**.
5. [Rovás Infó: Rovásszámok 1–2199](https://rovas.info/2012/12/rovasszamok-1-2199/) – összeadásos és szorzatos alakok párhuzamos használata.

---

## Korlátok

- Nincs Unicode-kódolt külön milliós vagy 500-as számjel; a projekt a meglévő `U+10CFF` láncot használja.
- Az additív mód a kért vezető ezresfutam olvasatát kapcsolja, nem univerzális történeti parser minden iskolához.
- A nulla üres kimenet; negatív számok nem támogatottak.
- `Number.MAX_SAFE_INTEGER` felett `RangeError`.
- A v1.4 előtt kiadott rovásszöveg más kódpontokat használt: a betűtábla kihagyta a közbeszúrt jeleket, ezért például a `t` az ENT (U+10CE7), az `e` az AND (U+10CC8) kódpontjára esett. Az ilyen régi kimenet az új táblával nem jár vissza ugyanarra a latin szóra.
- A bogárjelek automatikus beillesztése nincs bekapcsolva. A hat nazális jel visszafejtése alapból mássalhangzó-kapcsolat; a név eleji magánhangzó, az `omp`, a `tprus`, a `temperius` és az `us` csak kérésre érvényes.
- Az ENT `ent` / `ant` / `int` értéke egy karakter, a visszafejtés egy magánhangzót tud kiírni.
- Az ECH (U+10CE9) olvasata vitatott (`ty` vagy `/x/`), ezért a konverter nem írja át.
- A történeti összerovások (N4268R 6. fejezet) nincsenek automatikusan ZWJ-vel beszúrva; a `q`, `w`, `x`, `y`, `dz`, `dzs` ligatúrái a meglévő idegenbetű-szabály szerint készülnek.
- A zárt ë automatikus felismerése nincs; csak manuális `ë` / `Ë` jelölés. A zárt és a nyílt E visszafelé egyaránt `e`.
- A webes demó a tároló aktuális GitHub Pages állapotát mutatja; a helyi `index.html` tartalmazza a `thousandsMode` kapcsolót és a bogárjel-beállításokat.

---

## Unicode-referencia

| Kategória | Példa | Tartomány |
|-----------|-------|-----------|
| Nagybetűk | 𐲀 𐲂 𐲆 | U+10C80–U+10CB2 |
| Kisbetűk | 𐳀 𐳂 𐳆 | U+10CC0–U+10CF2 |
| Számjelek | 𐳺 𐳻 𐳼 𐳽 𐳾 𐳿 | U+10CFA–U+10CFF |

Ajánlott betűtípusok:

- [Noto Sans Old Hungarian](https://fonts.google.com/noto/specimen/Noto+Sans+Old+Hungarian) – Google, ajánlott
- [OldHungarian](https://oldhungarian.eu) – oldhungarian.eu, CC-BY-SA 3.0

---

## Projektstruktúra

```
rovas-konverter/
├── rovas-konverter/              # Kész ES-modul (böngésző / Node)
│   ├── index.js
│   ├── config.js
│   ├── converters/
│   │   ├── latin-to-rovas.js
│   │   ├── rovas-to-latin.js
│   │   ├── numbers.js            # szám ↔ rovás, thousandsMode
│   │   └── vowel-harmony.js
│   ├── tables/
│   └── utils/
├── tests/
│   ├── numbers.test.mjs
│   └── bugsigns.test.mjs
├── index.html                    # Webes demó
├── SPEC.md                       # Teljes specifikáció (magyar)
├── README.md
└── LICENSE
```

A SPEC-ben említett `src/` / `dist/` forrásfa a fejlesztési terv része; a nyilvános tároló a lefordított `rovas-konverter/` modult szállítja.

---

## Specifikáció

A teljes szabályrendszer a [SPEC.md](./SPEC.md) fájlban van (magyar, v1.4):

- Unicode-kódpont táblázatok
- Kettősbetű-prioritás és mohó egyeztetés
- Hangrendiségi K-választás
- Számkonverzió és `thousandsMode`
- Írásjelek és elválasztójel
- bogárjelek és a betűkódpontok (v1.4)

---

## Tesztek

```bash
node --test
```

A tesztek ellenőrzik a számírást (`thousandsMode`, `RangeError`, körbejárás) és a bogárjeleket: a betűk nem esnek a bogárjel-kódpontokra, alapból nincs helyettesítés, a hagyományos név és a mássalhangzó-kapcsolat külön viselkedik, az ENT és az ENT-alakú jel nem keveredik, az n+ZWJ+t nem ENT, az `omp` / `tprus` / `temperius` / `us` csak a kapcsolóval él, és a `sz` nem törik el.

---

## Ütemterv

- [x] v1.0 – Latin ↔ rovás alapkonverzió
- [x] v1.0 – Rovásszámok
- [x] v1.0 – Hangrendiségi K-választás
- [x] v1.0 – Webes demó (GitHub Pages)
- [x] v1.1 / v1.3 – `rovasToNumber` javítása ≥ 1 000 000 esetén; `thousandsMode` kapcsoló
- [x] v1.4 – Unicode-helyes betűkódpontok; bogárjelek külön karakterként, vitás olvasat csak kérésre
- [ ] v2.0 – PWA
- [ ] v2.0 – Android APK

---

## Közreműködés

Örömmel fogadunk fejlesztéseket:

1. Forkold a tárolót.
2. Hozz létre ágat: `git checkout -b feature/a-te-funkciod`
3. Kövesd a [SPEC.md](./SPEC.md) szabályait.
4. Adj teszteket az új működéshez.
5. Nyiss pull requestet.

**Fontos:** a konverziós szabályok módosítását a SPEC megfelelő szakaszára kell hivatkozni. A specifikációtól eltérő változás előtt a SPEC-et kell frissíteni.

---

## Hivatkozások

1. Rovás Alapítvány – korszerű egységes székely–magyar rovás jelsor
2. [rovas.info](https://rovas.info) – betűalkalmazási szabályok (K, QWXY, DZ/DZS)
3. [Unicode Old Hungarian táblázat](https://www.unicode.org/charts/PDF/U10C80.pdf)
4. [Everson–Szelp N4268R](https://www.unicode.org/L2/L2012/12168r-n4268r-oldhungarian.pdf) – konszolidált Unicode-javaslat; a homorgán nazálisok és a ligatúrák szétválasztása
5. [Rumi N4225](https://www.unicode.org/wg2/docs/n4225.pdf) – nem elfogadott nagyszámjel-javaslat
6. [Friedrich Klára a számrovásról](https://www.rovasirasforrai.hu/Rovasiras/A-magyar-szamrovasrol_rovid-osszefoglalo.htm)
7. [oldhungarian.eu](https://oldhungarian.eu) – betűtípus és ligatúra-dokumentáció
8. [Unicode 17 Old Hungarian névjegyzék](https://www.unicode.org/Public/17.0.0/charts/nameslist/n_10C80.html) – hatályos karakternevek, az ENT és az ENT-SHAPED SIGN megjegyzései
9. [Friedrich Klára: Csudabogarak?](https://www.rovasirasforrai.hu/Rovasiras/Csudabogarak.htm) – vitatott EMP/OMP, US és TPRUS olvasatok

---

## Licenc

[MIT](./LICENSE) © 2026 Vidisopi

A projektet Grok Bot AI-asszisztensek segítségével fejlesztjük.
