# Rovás Konverter — Spec-Driven Development Specifikáció

> **Verzió**: 1.2  
> **Dátum**: 2026-04-03  
> **Szerző**: Claude (Anthropic) — Attila megbízásából  
> **Referencia**: Rovás Alapítvány korszerű egységes jelkészlete, rovas.info betűalkalmazási szabályai, Unicode Old Hungarian (U+10C80–U+10CFF)  
> **Célplatform**: TypeScript/JavaScript library (webes és CLI használatra)  
> **Metodológia**: SDD (Spec-Driven Development)
>
> **Változásnapló v1.1**: Y ligatúra kódpont javítva (3.3); bogárjelek kiemelve a scope-ból → v2.0 tervezett funkció; számkonverzió millió-bejegyzés törölve (rekurzió kezeli)  
> **Változásnapló v1.2**: Vegyes hangrendű K-választás pontosítva konkrét algoritmussal és példákkal (4.4.3); bugsigns.ts kiemelve a fájlstruktúrából (10. fejezet)

---

## 1. Projekt áttekintés

### 1.1 Cél

Kétirányú konverter, amely a latin betűs magyar szöveget székely-magyar rovásírásra (Unicode Old Hungarian karakterekre) alakítja és vissza. A rendszer a Rovás Alapítvány korszerű egységes jelkészletét követi, és a rovas.info betűalkalmazási szabályait alkalmazza.

### 1.2 Scope

- **Latin → Rovás** konverzió (elsődleges)
- **Rovás → Latin** konverzió (másodlagos)
- Számok konverziója mindkét irányban
- Opcionális hangrendiség-alapú K-választás
- Unicode Old Hungarian kódpontok használata (modern, szabványos megoldás)

### 1.3 Kívül esik a scope-on

- Kísérőjelek (bogárjelek) támogatása — **v2.0-ra tervezve** (a szabályrendszer dokumentálva van a 13. fejezetben, de a v1.x implementáció nem tartalmazza)
- Összerovás (ligatúrák vizuális összevonása glyph szinten — ez a font feladata)
- Zárt Ë automatikus felismerése (csak manuális jelölés támogatott)
- Font készítés/renderelés
- PDF generálás
- Szövegszerkesztő UI (az egy külön projekt)

---

## 2. Alapfogalmak és terminológia

| Fogalom | Leírás |
|---------|--------|
| **Rovás** | Székely-magyar rovásírás, a magyar nyelv történeti írásrendszere |
| **Bogárjel / Kísérőjel** | Többkarakteres összerovás, amely gyakori szótagokat vagy betűkapcsolatokat egyetlen jelben egyesít (pl. ANT, ENT, AMB) |
| **Hangrendiség** | A magyar nyelv magánhangzó-harmóniája: mély (a, á, o, ó, u, ú) vs. magas (e, é, i, í, ö, ő, ü, ű) hangrendű szavak |
| **Mély K** | A „kapocs" alakú K rovásjel, mély hangrendű szavakban használatos |
| **Magas K** | A „rombusz/négyszög" alakú K rovásjel, magas hangrendű szavakban használatos |
| **Elválasztójel** | A `\|` karakter, amelyet a felhasználó kézzel szúr be szóösszetételeknél a kétjegyű mássalhangzók hibás felismerésének megelőzésére |
| **RTL** | Right-to-left, jobbról balra haladó írásirány |
| **Unicode Old Hungarian** | Az Unicode 8.0 szabványban (U+10C80–U+10CFF) definiált rovás karakterblokk |

---

## 3. Unicode Old Hungarian karaktertábla

### 3.1 Magánhangzók

| Latin | Rovás név | Unicode kódpont (kis) | Unicode kódpont (nagy) |
|-------|-----------|----------------------|----------------------|
| a | A | U+10CC0 | U+10C80 |
| á | AA (Á) | U+10CC1 | U+10C81 |
| e | E (nyílt) | U+10CC8 | U+10C88 |
| ë | E (zárt, Ë) | U+10CC9 | U+10C89 |
| é | É | U+10CCA | U+10C8A |
| i | I | U+10CCE | U+10C8E |
| í | II (Í) | U+10CCF | U+10C8F |
| o | O | U+10CD6 | U+10C96 |
| ó | OO (Ó) | U+10CD7 | U+10C97 |
| ö | Ö (ÖÜ) | U+10CD8 | U+10C98 |
| ő | ŐŰ (Ő) | U+10CD9 | U+10C99 |
| u | U | U+10CDE | U+10C9E |
| ú | UU (Ú) | U+10CDF | U+10C9F |
| ü | Ü | U+10CE0 | U+10CA0 |
| ű | ŰŐ (Ű) | U+10CE1 | U+10CA1 |

### 3.2 Mássalhangzók

| Latin | Rovás név | Unicode kódpont (kis) | Unicode kódpont (nagy) |
|-------|-----------|----------------------|----------------------|
| b | eB | U+10CC2 | U+10C82 |
| c | eC | U+10CC4 | U+10C84 |
| cs | eCS | U+10CC6 | U+10C86 |
| d | eD | U+10CC7 | U+10C87 |
| f | eF | U+10CCB | U+10C8B |
| g | eG | U+10CCC | U+10C8C |
| gy | eGY | U+10CCD | U+10C8D |
| h | eH | U+10CD0 | U+10C90 |
| j | eJ | U+10CD1 | U+10C91 |
| k (magas) | eK | U+10CD2 | U+10C92 |
| k (mély) | aK | U+10CD3 | U+10C93 |
| l | eL | U+10CD4 | U+10C94 |
| ly | eLY | U+10CD5 | U+10C95 |
| m | eM | U+10CDA | U+10C9A |
| n | eN | U+10CDB | U+10C9B |
| ny | eNY | U+10CDC | U+10C9C |
| p | eP | U+10CDD | U+10C9D |
| r | eR | U+10CE2 | U+10CA2 |
| s | eS | U+10CE4 | U+10CA4 |
| sz | eSZ | U+10CE6 | U+10CA6 |
| t | eT | U+10CE7 | U+10CA7 |
| ty | eTY | U+10CE8 | U+10CA8 |
| v | eV | U+10CEE | U+10CAE |
| z | eZ | U+10CEF | U+10CAF |
| zs | eZS | U+10CF0 | U+10CB0 |

### 3.3 Idegen betűk (ligatúrák, Unicode ZWJ-vel)

A korszerű rovás ábécében ezek önálló jelként léteznek, Unicode-ban ligatúraként (Zero Width Joiner, U+200D):

| Latin | Feloldás | Unicode sorozat |
|-------|----------|----------------|
| dz | D + Z ligatúra | U+10CC7 + U+200D + U+10CEF |
| dzs | D + ZS ligatúra | U+10CC7 + U+200D + U+10CF0 |
| q | K + V ligatúra | U+10CD3 + U+200D + U+10CEE |
| w | V + V ligatúra | U+10CEE + U+200D + U+10CEE |
| x | K + SZ ligatúra | U+10CD3 + U+200D + U+10CE6 |
| y | I + J ligatúra | U+10CCE + U+200D + U+10CD1 |

### 3.4 Rovás számjegyek

| Érték | Unicode kódpont |
|-------|----------------|
| 1 | U+10CFA |
| 5 | U+10CFB |
| 10 | U+10CFC |
| 50 | U+10CFD |
| 100 | U+10CFE |
| 1000 | U+10CFF |

### 3.5 Rovás írásjelek

| Jel | Unicode kódpont | Leírás |
|-----|----------------|--------|
| ⹁ | U+2E41 | Tükrözött vessző |
| ⹂ | U+2E42 | Tükrözött idézőjel |

### 3.6 Bogárjelek (kísérőjelek) — v2.0

> **Megjegyzés**: A bogárjelek (kísérőjelek) a v1.x scope-ján kívül esnek. A teljes bogárjel-táblázat, szabályrendszer és Unicode kódpont-hozzárendelés a **13. fejezetben** (Tervezett funkciók — v2.0) található. Az implementáció a v2.0 fejlesztési ciklusban történik, miután a Unicode szabvány N4268 ajánlása alapján a pontos kódpont-validáció megtörtént.

---

## 4. Konverziós szabályok — Latin → Rovás

### 4.1 Általános feldolgozási algoritmus

```
BEMENET: latin betűs magyar szöveg (UTF-8 string)
KIMENET: Unicode Old Hungarian karaktersorozat

1. A szöveget kisbetűsítjük (a rovásban alapvetően nincs kis/nagy megkülönböztetés)
2. KIVÉTEL: mondat eleji / tulajdonnév eleji nagybetűt opcionálisan Unicode nagybetűs rovás karakterrel jelöljük
3. A szöveget karakterenként (balról jobbra) dolgozzuk fel
4. Minden pozíción a LEGHOSSZABB EGYEZÉST keressük az átírási táblázatban
5. Ha nincs egyezés a táblázatban: számot, idézőjelet, vagy változatlan karaktert adunk a kimenethez
6. A kimenetet az írásiránynak megfelelően (RTL) formázzuk
```

### 4.2 Feldolgozási prioritás (mohó egyeztetés)

A feldolgozásnál a leghosszabb egyezést kell keresni. A táblázat elemeit a kulcs hossza szerint csökkenő sorrendben kell vizsgálni:

**3 karakteres kulcsok:**
`ccs`, `ggy`, `lly`, `nny`, `ssz`, `tty`, `zzs`, `dzs`

**2 karakteres kulcsok:**
`cs`, `gy`, `ly`, `ny`, `sz`, `ty`, `zs`, `dz`, `qu`

**1 karakteres kulcsok:**
Minden egyes magánhangzó és mássalhangzó.
Idegen betűk: `q`, `w`, `x`, `y`

> **v2.0 megjegyzés**: Ha a bogárjelek bekapcsolásra kerülnek (v2.0), a prioritási lánc a bogárjel-kulcsokkal bővül (5→4→3→2 karakteres bogárjel-kulcsok a normál kulcsok ELŐTT). Lásd: 13. fejezet.

### 4.3 Betű-konverziós tábla

#### 4.3.1 Hosszú kettős betűk (3 latin karakter → kettőzött rovás jel)

| Latin | Rovás kimenet | Megjegyzés |
|-------|--------------|------------|
| ccs | CS + CS | Két eCS jel egymás után |
| ggy | GY + GY | Két eGY jel egymás után |
| lly | LY + LY | Két eLY jel egymás után |
| nny | NY + NY | Két eNY jel egymás után |
| ssz | SZ + SZ | Két eSZ jel egymás után |
| tty | TY + TY | Két eTY jel egymás után |
| zzs | ZS + ZS | Két eZS jel egymás után |

#### 4.3.2 Kettős betűk (2 latin karakter → 1 rovás jel)

| Latin | Rovás jel |
|-------|----------|
| cs | eCS |
| gy | eGY |
| ly | eLY |
| ny | eNY |
| sz | eSZ |
| ty | eTY |
| zs | eZS |
| dz | DZ (ligatúra) |

#### 4.3.3 Hármas betű

| Latin | Rovás jel |
|-------|----------|
| dzs | DZS (ligatúra) |

#### 4.3.4 Idegen betűk

| Latin | Rovás kimenet | Alternatív | Megjegyzés |
|-------|--------------|-----------|------------|
| q (önálló) | Q ligatúra (K+V) | — | Ha a „q" nem „qu" részeként áll |
| qu | K + V | — | A „qu" betűkapcsolat = KV |
| w | W ligatúra (V+V) | — | Önálló W jel, megőrzi az eredeti betűt |
| x | X ligatúra (K+SZ) | — | Önálló X jel |
| y (önálló) | Y ligatúra (I+J) | I | Ha nem kettős betű része (gy, ly, ny, ty). Nevek átírásánál a Y jel használandó |

**Speciális Y szabály**: Az `y` betű csak akkor kapja az Y ligatúra-jelet, ha NEM egy kettős betű részeként szerepel. Ha `gy`, `ly`, `ny` vagy `ty` részeként áll, a kettős betű szabálya érvényes.

#### 4.3.5 Egykarakteres betűk

Minden magyar magánhangzó és mássalhangzó, ami nem szerepel feljebb, 1:1 arányban konvertálódik a megfelelő rovás jelre (lásd: 3.1 és 3.2 táblázat).

### 4.4 K betű — hangrendiség-alapú választás

**Ez a funkció opcionális (bekapcsolható konfiguráció).** Ha ki van kapcsolva, mindig a magas K (rombusz, eK) használandó.

#### 4.4.1 Magánhangzók besorolása

| Hangrend | Magánhangzók |
|----------|-------------|
| Mély | a, á, o, ó, u, ú |
| Magas | e, é, i, í, ö, ő, ü, ű |

**Megjegyzés**: Az `i` és `í` magas hangrendűnek számít a K-választás szempontjából (a rovas.info ajánlása szerint).

#### 4.4.2 Algoritmus

```
BEMENET: szó amely tartalmaz „k" betűt
KIMENET: a „k" betű rovás megfelelője (magas K vagy mély K)

1. Azonosítjuk a szót, amelyben a „k" áll
2. Összegyűjtjük a szóban található magánhangzókat
3. Meghatározzuk a szó hangrendjét:
   a. Ha MINDEN magánhangzó mély → mély K
   b. Ha MINDEN magánhangzó magas → magas K
   c. Ha vegyes → a K-hoz legközelebb eső magánhangzó(k) dönt(enek)
   d. Ha nincs magánhangzó a szóban → magas K (alapértelmezés)
4. A megfelelő K jelet adjuk a kimenethez
```

#### 4.4.3 Vegyes hangrendű szavak kezelése

Ha a szóban mély és magas magánhangzók is vannak, a K-hoz legközelebb álló magánhangzó dönti el a hangrendet. A keresés mindkét irányban történik (előre és hátra), és a karaktertávolság alapján a legközelebbi magánhangzó nyer.

```
ALGORITMUS:
1. A K pozíciójától balra keresünk magánhangzót → leftVowel (távolság: leftDist)
2. A K pozíciójától jobbra keresünk magánhangzót → rightVowel (távolság: rightDist)
3. Ha csak egy irányban van magánhangzó → az dönt
4. Ha mindkét irányban van:
   a. Ha leftDist < rightDist → leftVowel dönt
   b. Ha rightDist < leftDist → rightVowel dönt
   c. Ha leftDist == rightDist → leftVowel dönt (balra prioritás)
5. Ha nincs magánhangzó a szóban → magas K (alapértelmezés)
```

**Konkrét példák:**

| Szó | K pozíció | Közelebbi magánhangzó | Eredmény |
|-----|-----------|----------------------|----------|
| `kirakat` | 1. K (k**i**rakat) | i (magas, 1 táv.) | **magas K** |
| `kirakat` | 2. K (kira**k**at) | a (mély, 1 táv. mindkét irányból, de azonos → bal dönt: a) | **mély K** |
| `kávé` | K (**k**ávé) | á (mély, 1 táv.) | **mély K** |
| `kéz` | K (**k**éz) | é (magas, 1 táv.) | **magas K** |
| `kerékpár` | 2. K (keré**k**pár) | é (magas, 1 táv. balra) vs á (mély, 2 táv. jobbra) → é nyer | **magas K** |

### 4.5 Elválasztójel (`|`) kezelése

A `|` karakter speciális elválasztójelként működik. A felhasználó kézzel szúrja be szóösszetételeknél, ahol a rendszer rosszul ismerné fel a kétjegyű mássalhangzókat.

**Példa**: `magyar` → egy szó, a `gy` egy kettős betű. De `meg|yógyul` → a `g` és `y` külön betűk.

**Szabály**: A `|` karakter nem kerül a kimenetre. Funkciója: szétválasztja a kétjegyű mássalhangzó alkotóelemeit, hogy azok önálló betűként legyenek kezelve.

```
BEMENET: "meg|yógyul"
FELDOLGOZÁS: m, e, g, |, y, ó, gy, u, l
  - A "|" miatt a "g" és "y" NEM alkotnak "gy" kettős betűt
  - Ezután a "gy" (yóGYul) viszont igen
KIMENET: eM, E, eG, Y(ligatúra), OO, eGY, U, eL
```

### 4.6 Számok konverziója

A rovás számrendszer additív (nem pozicionális), a következő jelekkel:

| Érték | Rovás jel |
|-------|----------|
| 1 | I (U+10CFA) |
| 5 | V (U+10CFB) |
| 10 | X (U+10CFC) |
| 50 | L (U+10CFD) |
| 100 | C (U+10CFE) |
| 1000 | M (U+10CFF) |

#### 4.6.1 Algoritmus (szám → rovás)

```
BEMENET: egész szám (max. 9 jegyű, azaz max 999 999 999)
KIMENET: rovás számjegy-sorozat

A helyiértékek csökkenő sorrendben:
  1000, 100, 50, 10, 5, 1

Minden helyiértékre:
  1. hányszor fér bele a számba az adott helyiérték (= szorzó)
  2. Ha szorzó > 1: REKURZÍV hívás a szorzóra + az adott helyiérték jele
  3. Ha szorzó = 1: az adott helyiérték jele
  4. A maradékkal folytatjuk

Megjegyzés: a rekurzió automatikusan kezeli a nagy számokat.
Pl. 2000000 → szorzó=2000 az 1000-es helyiértékre → rekurzív hívás(2000)
    → szorzó=2 az 1000-esre → II + M → tehát: II + M + M

PÉLDA: 42 → 4×10 + 2×1 → IIII×X + II → (4)(10)(2) rovás jelekre bontva
PÉLDA: 1253 → 1×1000 + 2×100 + 1×50 + 3×1 → M + II×C + L + III
```

**Speciális esetek:**
- Vezető nullák figyelmen kívül hagyandók
- 0 (nulla): üres kimenet (a rovás számrendszer nem ismeri a nullát)
- Negatív számok: nem támogatottak (a rovás számrendszer csak természetes számokat ismer)

#### 4.6.2 Számfelismerés a szövegben

A szövegben egymás melletti arab számjegyeket (0-9) egyetlen számnak kell tekinteni és egyben konvertálni.

```
BEMENET: "2026 tavaszán"
FELDOLGOZÁS: "2026" → szám → rovás számjegyek, " tavaszán" → betűk
```

### 4.7 Írásjelek konverziója

| Latin írásjel | Rovás megfelelő | Megjegyzés |
|--------------|----------------|------------|
| , | ⹁ (U+2E41) | Tükrözött vessző |
| „ (nyitó idézőjel) | ⹂ (U+2E42) | Tükrözött idézőjel |
| " (záró idézőjel) | " | Változatlan marad |
| ? | ⸮ (U+2E2E) | Tükrözött kérdőjel (alternatíva: változatlan) |
| . | . | Változatlan |
| ! | ! | Változatlan |
| : | : | Változatlan |
| ; | ; | Változatlan |
| - | - | Változatlan |

**Idézőjel-kontextus**: A `"` karakter kontextusfüggő: ha utána alfanumerikus karakter jön, akkor nyitó idézőjel (→ ⹂), egyébként záró.

### 4.8 Nagybetű-kezelés

A rovásírásban hagyományosan nincs kis- és nagybetű. A Unicode Old Hungarian tartalmaz nagybetűs kódpontokat is, ezért a következő szabály érvényes:

**Alapértelmezés**: Kisbetűs rovás jelek használata mindenhol.

**Opcionális mód**: Ha a nagybetű-jelölés be van kapcsolva:
- Mondat eleji nagybetű → a mondat első betűje a nagybetűs rovás kódponttal jelölve
- Tulajdonnevek → az első betű nagybetűs rovás kódponttal
- CSUPA NAGYBETŰS szó → minden betű nagybetűs rovás kódponttal

### 4.9 Törlendő karakterek

Az alábbi karaktereknek nincs rovás megfelelőjük, ezért a konverzió során figyelmen kívül hagyandók (törölendők a kimenetből):

```
# & @ ä Ä § đ Đ | € ÷ × ł Ł $ ß ¤ ˇ ˘ ° ˛ ˙ ´ ˝ ¨ ¸ < >
```

**Megjegyzés**: A `|` karakter elválasztójelként működik (lásd 4.5), nem törlendő, hanem feldolgozandó (de a kimenetre nem kerül).

### 4.10 Bogárjelek (kísérőjelek) — v2.0

> A bogárjelek kezelése a v2.0 fejlesztési ciklusban kerül implementálásra. A teljes szabályrendszer (kombinációk, prioritás, Unicode kódpontok) a **13. fejezetben** dokumentált. A v1.x implementáció a bogárjeleket NEM kezeli — a szövegben szereplő „ant", „ent", stb. betűkapcsolatokat a normál betűkonverziós szabályok szerint dolgozza fel.

### 4.11 Zárt Ë kezelése

A latin betűs magyar helyesírás nem jelöli a zárt ë hangot. A konverter a következőképpen kezeli:

- **Automatikus felismerés**: NEM támogatott (a specifikáció scope-ján kívül)
- **Manuális jelölés**: A felhasználó az `ë` vagy `Ë` karaktert használhatja a bemenetben → a rendszer az E (zárt) rovás jelet (U+10CC9) adja kimenetként
- Ha a bemenetben sima `e` áll → a nyílt E rovás jel (U+10CC8) kerül a kimenetre

---

## 5. Konverziós szabályok — Rovás → Latin

### 5.1 Általános feldolgozási algoritmus

```
BEMENET: Unicode Old Hungarian karaktersorozat
KIMENET: latin betűs magyar szöveg (UTF-8 string)

1. A rovás szöveget karakterenként (balról jobbra a Unicode stringben) dolgozzuk fel
2. Minden Unicode kódpontra (vagy kódpont-sorozatra) megkeressük a latin megfelelőt
3. Az inverz konverzió egyértelmű (1 rovás jel → 1 latin karakter/betűkapcsolat)
4. KIVÉVE: a ligatúráknál ZWJ-t (U+200D) keresünk a kódpontok között
```

### 5.2 Inverz karaktertábla

A 3.1–3.6 táblázatok inverze. Minden Unicode rovás kódpontra pontosan egy latin megfelelő van.

**Speciális esetek:**
- Mély K (U+10CD3) → `k` (a hangrendiség információja elvész, de ez a latin oldalon nem releváns)
- Magas K (U+10CD2) → `k`
- DZ ligatúra (D+ZWJ+Z) → `dz`
- DZS ligatúra (D+ZWJ+ZS) → `dzs`
- Q ligatúra (K+ZWJ+V) → `q`
- W ligatúra (V+ZWJ+V) → `w`
- X ligatúra (K+ZWJ+SZ) → `x`
- Y ligatúra (I+ZWJ+J) → `y`
- Zárt E (U+10CC9) → `e` (a zárt/nyílt megkülönböztetés elvész a latin oldalon)
- Nagybetűs rovás kódpontok → latin nagybetű

### 5.3 Számok visszafejtése

```
BEMENET: rovás számjegy-sorozat
KIMENET: arab szám (string)

1. A rovás számjegy-sorozatot balról jobbra olvassuk
2. A jeleket értéküknek megfelelően összegezzük
3. Ha egy kisebb jel nagyobb jel ELŐTT áll → szorzóként értelmezzük
   (pl. II + C = 2×100 = 200)
4. A végső összeg az arab szám

PÉLDA: M II×C L III → 1000 + 200 + 50 + 3 = 1253
```

### 5.4 Írásjelek visszafejtése

| Rovás írásjel | Latin megfelelő |
|--------------|----------------|
| ⹁ (U+2E41) | , |
| ⹂ (U+2E42) | „ |

---

## 6. Konfigurációs opciók

A konverter konfigurálható, a következő opciókkal:

```typescript
interface RovasConverterConfig {
  // Hangrendiség-alapú K-választás
  useVowelHarmonyK: boolean; // default: false (csak rombusz K)

  // Nagybetű-jelölés a rovás kimeneten
  useCapitals: boolean; // default: false

  // Írásirány
  direction: 'rtl' | 'ltr'; // default: 'rtl'

  // QWXY kezelési mód
  foreignLetterMode: 'ligature' | 'decompose';
  // 'ligature': önálló DZ, DZS, Q, W, X, Y ligatúra-jeleket használ
  // 'decompose': feloldja a betűkapcsolatokat (Q→KV, W→VV, X→KSZ, Y→I)
  // default: 'ligature'

  // v2.0-ban bővül:
  // useBugsigns: boolean; // Kísérőjelek (bogárjelek) használata
}
```

---

## 7. API terv

### 7.1 Fő interfész

```typescript
// Latin → Rovás konverzió
function latinToRovas(text: string, config?: Partial<RovasConverterConfig>): string;

// Rovás → Latin konverzió
function rovasToLatin(text: string): string;

// Szám → Rovás szám
function numberToRovas(num: number): string;

// Rovás szám → arab szám
function rovasToNumber(rovasNum: string): number;
```

### 7.2 Segédfüggvények

```typescript
// Szó hangrendjének meghatározása
function getVowelHarmony(word: string): 'deep' | 'high' | 'mixed' | 'none';

// K jel kiválasztása hangrendiség alapján
function selectK(word: string, kPosition: number): string; // Unicode kódpont

// Szó szétbontása (elválasztójel figyelembevételével)
function splitWord(text: string): string[];
```

---

## 8. Adatszerkezetek

### 8.1 Konverziós táblák

```typescript
// Fő konverziós tábla: latin → rovás Unicode
// Kulcs: latin karakter/betűkapcsolat (kisbetűs)
// Érték: Unicode Old Hungarian kódpont(ok) stringként
const LATIN_TO_ROVAS: Record<string, string> = {
  // Hosszú kettős betűk
  'ccs': '\u{10CC6}\u{10CC6}',
  'ggy': '\u{10CCD}\u{10CCD}',
  'lly': '\u{10CD5}\u{10CD5}',
  'nny': '\u{10CDC}\u{10CDC}',
  'ssz': '\u{10CE6}\u{10CE6}',
  'tty': '\u{10CE8}\u{10CE8}',
  'zzs': '\u{10CF0}\u{10CF0}',

  // Hármas betű
  'dzs': '\u{10CC7}\u200D\u{10CF0}',

  // Kettős betűk
  'cs': '\u{10CC6}',
  'gy': '\u{10CCD}',
  'ly': '\u{10CD5}',
  'ny': '\u{10CDC}',
  'sz': '\u{10CE6}',
  'ty': '\u{10CE8}',
  'zs': '\u{10CF0}',
  'dz': '\u{10CC7}\u200D\u{10CEF}',

  // Idegen betűk
  'qu': '\u{10CD3}\u{10CEE}', // K + V (nem ligatúra)
  'q':  '\u{10CD3}\u200D\u{10CEE}', // Q ligatúra
  'w':  '\u{10CEE}\u200D\u{10CEE}', // W ligatúra
  'x':  '\u{10CD3}\u200D\u{10CE6}', // X ligatúra
  'y':  '\u{10CCE}\u200D\u{10CD1}', // Y ligatúra (ha nem kettős betű része)

  // Magánhangzók
  'a': '\u{10CC0}', 'á': '\u{10CC1}',
  'e': '\u{10CC8}', 'ë': '\u{10CC9}', 'é': '\u{10CCA}',
  'i': '\u{10CCE}', 'í': '\u{10CCF}',
  'o': '\u{10CD6}', 'ó': '\u{10CD7}',
  'ö': '\u{10CD8}', 'ő': '\u{10CD9}',
  'u': '\u{10CDE}', 'ú': '\u{10CDF}',
  'ü': '\u{10CE0}', 'ű': '\u{10CE1}',

  // Mássalhangzók
  'b': '\u{10CC2}', 'c': '\u{10CC4}', 'd': '\u{10CC7}',
  'f': '\u{10CCB}', 'g': '\u{10CCC}', 'h': '\u{10CD0}',
  'j': '\u{10CD1}', 'k': '\u{10CD2}', // alapértelmezés: magas K
  'l': '\u{10CD4}', 'm': '\u{10CDA}', 'n': '\u{10CDB}',
  'p': '\u{10CDD}', 'r': '\u{10CE2}', 's': '\u{10CE4}',
  't': '\u{10CE7}', 'v': '\u{10CEE}', 'z': '\u{10CEF}',

  // Írásjelek
  ',': '\u2E41',  // tükrözött vessző
};

// Bogárjelek tábla — v2.0-ban implementálandó
// Lásd: 13. fejezet (Tervezett funkciók)

// Számjegy tábla
// Megjegyzés: a millió (1000000) a rekurzív algoritmus által automatikusan
// kezelt: 1000000 = 1000 × 1000 → M × M. Nem kell külön bejegyzés.
const NUMBER_VALUES: [number, string][] = [
  [1000,    '\u{10CFF}'],           // M
  [100,     '\u{10CFE}'],           // C
  [50,      '\u{10CFD}'],           // L
  [10,      '\u{10CFC}'],           // X
  [5,       '\u{10CFB}'],           // V
  [1,       '\u{10CFA}'],           // I
];
```

### 8.2 Hangrendiség táblák

```typescript
const DEEP_VOWELS = new Set(['a', 'á', 'o', 'ó', 'u', 'ú']);
const HIGH_VOWELS = new Set(['e', 'é', 'ë', 'i', 'í', 'ö', 'ő', 'ü', 'ű']);

const DEEP_K = '\u{10CD3}'; // aK (mély/kapocs K)
const HIGH_K = '\u{10CD2}'; // eK (magas/rombusz K)
```

---

## 9. Tesztelési terv

### 9.1 Egységtesztek — Latin → Rovás

#### 9.1.1 Alap betűkonverzió

| Bemenet | Elvárt kimenet (leírás) |
|---------|------------------------|
| `"a"` | U+10CC0 |
| `"á"` | U+10CC1 |
| `"magyar"` | eM + A + eGY + Y(ligatúra) + A + eR |
| `"cs"` | eCS (egyetlen jel) |
| `"ccs"` | eCS + eCS |

#### 9.1.2 Szóösszetétel (elválasztójel)

| Bemenet | Elvárt kimenet (leírás) |
|---------|------------------------|
| `"község"` | K + Ö + eZ + eSZ + É + eG |
| `"kulcs"` | K + U + eL + eCS |
| `"méhész"` | eM + É + eH + É + eSZ |
| `"mes\|gyéje"` | eM + E + eS + eG + Y(lig.) + É + eJ + E |

#### 9.1.3 Számkonverzió

| Bemenet | Elvárt kimenet (leírás) |
|---------|------------------------|
| `1` | I |
| `5` | V |
| `10` | X |
| `42` | IIII + X + II |
| `100` | C |
| `1253` | M + II + C + L + III |
| `2026` | II + M + X + X + V + I |

#### 9.1.4 Idegen betűk

| Bemenet | Elvárt kimenet (leírás) |
|---------|------------------------|
| `"queen"` | K + V + E + E + eN |
| `"wifi"` | W(lig.) + I + eF + I |
| `"extra"` | E + X(lig.) + eT + eR + A |
| `"Ybl"` | Y(lig.) + eB + eL |

#### 9.1.5 K hangrendiség (ha useVowelHarmonyK = true)

| Bemenet | Elvárt K típus |
|---------|---------------|
| `"kár"` | mély K |
| `"kép"` | magas K |
| `"kör"` | magas K |
| `"kor"` | mély K |
| `"kín"` | magas K |

#### 9.1.6 Bogárjelek — v2.0

> Bogárjel-tesztek a v2.0 fejlesztési ciklusban kerülnek hozzáadásra. Lásd: 13. fejezet.

### 9.2 Egységtesztek — Rovás → Latin

| Bemenet (Unicode) | Elvárt latin kimenet |
|-------------------|---------------------|
| U+10CC0 | `"a"` |
| U+10CC6 | `"cs"` |
| U+10CC7 + U+200D + U+10CF0 | `"dzs"` |
| U+10CFA + U+10CFA + U+10CFA | `"3"` (szám: III = 3) |

### 9.3 Szélsőséges esetek

| Eset | Bemenet | Elvárt viselkedés |
|------|---------|-------------------|
| Üres szöveg | `""` | `""` |
| Csak szóközök | `"   "` | `"   "` (megőrzött szóközök) |
| Csak számok | `"12345"` | Rovás számjegyek |
| Ismeretlen karakter | `"@#$"` | Törlés (üres kimenet) |
| Vegyes szöveg | `"2026 tavaszán"` | Szám konverzió + betű konverzió |
| Nagyon hosszú szám | `"123456789"` | Rovás számjegyek (9 jegyig) |
| 10+ jegyű szám | `"1234567890"` | Első 9 jegy konvertálva, a 10. figyelmen kívül hagyva |

---

## 10. Fájlstruktúra terv

```
rovas-konverter/
├── src/
│   ├── index.ts              # Fő export: latinToRovas, rovasToLatin
│   ├── config.ts             # RovasConverterConfig interfész és alapértékek
│   ├── tables/
│   │   ├── letters.ts        # LATIN_TO_ROVAS tábla
│   │   ├── numbers.ts        # NUMBER_VALUES tábla
│   │   ├── punctuation.ts    # Írásjelek tábla
│   │   └── inverse.ts        # Inverz tábla (automatikusan generált)
│   │   # v2.0: bugsigns.ts   # BUGSIGNS tábla (bogárjelek)
│   ├── converters/
│   │   ├── latin-to-rovas.ts # Latin → Rovás konverter
│   │   ├── rovas-to-latin.ts # Rovás → Latin konverter
│   │   ├── numbers.ts        # Szám ↔ Rovás szám konverter
│   │   └── vowel-harmony.ts  # Hangrendiség-elemző és K-választó
│   └── utils/
│       ├── text-parser.ts    # Szövegfeldolgozó (szóhatár, elválasztójel)
│       └── unicode.ts        # Unicode segédfüggvények
├── tests/
│   ├── latin-to-rovas.test.ts
│   ├── rovas-to-latin.test.ts
│   ├── numbers.test.ts
│   ├── vowel-harmony.test.ts
│   └── edge-cases.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 11. Hivatkozások

1. **Rovás Alapítvány** — Korszerű egységes székely-magyar rovás jelsor (PDF)
2. **Rovás Alapítvány** — Korszerű kiegészítő jelkészlet (PDF)
3. **rovas.info** — Betűalkalmazások: K és K (https://rovas.info/2011/10/betalkalmazasok-a-ket-k/)
4. **rovas.info** — Betűalkalmazások: QWXY (https://rovas.info/2011/10/betalkalmazasok-qwxy/)
5. **rovas.info** — Betűalkalmazások: DZ, DZS (https://rovas.info/2011/10/betalkalmazasok-dz-dzs/)
6. **rovas.info** — Latin Q-ra, rovás K (https://rovas.info/2014/09/latin-q-ra-rovas-k/)
7. **Unicode Standard 8.0** — Old Hungarian block (U+10C80–U+10CFF), https://www.unicode.org/charts/PDF/U10C80.pdf
8. **oldhungarian.eu** — Unicode kompatibilis rovásírás betűtípus és ligatúra-dokumentáció
9. **rovas.info** — Rovás kódolási segédlet / Guide to Rovas font encoding (https://rovas.info/2021/06/rovas-encoding/)
10. **Mészáros Arnold** — runes-2_0_class.js (rovas.magyarrovas.hu) — referencia implementáció a konverziós algoritmushoz

---

## 12. Megjegyzések az implementációhoz

### 12.1 Unicode kezelés

A rovás Unicode kódpontok a Supplementary Multilingual Plane-en (SMP) találhatók, a BMP-n kívül. Ez azt jelenti, hogy JavaScriptben surrogate pair-ekként jelennek meg. A `\u{10CC0}` szintaxis (ES6+) vagy `String.fromCodePoint()` használata kötelező.

### 12.2 RTL megjelenítés

A Unicode Old Hungarian karakterek beépített bidi (bidirectional) tulajdonsággal rendelkeznek (R = Right-to-Left). Egy helyesen implementált böngésző/szövegmegjelenítő automatikusan jobbról balra rendezi őket. A konverter NEM fordítja meg a string sorrendjét — a Unicode bidi algoritmus kezeli az irányt.

### 12.3 Font támogatás

A kimenet helyes megjelenítéséhez az alábbi fontok valamelyike szükséges:
- **Noto Sans Old Hungarian** (Google)
- **OldHungarian** (oldhungarian.eu, CC-BY-SA 3.0)
- Bármely font, amely támogatja az U+10C80–U+10CFF Unicode blokkot

---

## 13. Tervezett funkciók — v2.0 (Bogárjelek / Kísérőjelek)

> Ez a fejezet a v2.0 fejlesztési ciklus referencia-dokumentációja. A v1.x implementáció NEM tartalmazza ezeket a funkciókat. Az alábbi szabályrendszer és kódpont-hozzárendelések a Unicode szabvány N4268 ajánlása és a rovas.info kódolási segédlet alapján lettek összeállítva, de **az implementáció előtt a pontos Unicode kódpontokat validálni kell** a szabvány aktuális verziója alapján.

### 13.1 Bogárjelek karaktertáblája

| Latin kombináció | Rovás név | Unicode kódpont (kis) | Unicode kódpont (nagy) | Megjegyzés |
|-----------------|-----------|----------------------|----------------------|------------|
| amb | AMB | U+10CC3 | U+10C83 | |
| and | AND | U+10CE9 | U+10CA9 | |
| ant | ANT | U+10CEA | U+10CAA | |
| emp | EMP | U+10CEB | U+10CAB | |
| ent / int | ENT | U+10CEC | U+10CAC | Azonos jel |
| unk / ünk | UNK | U+10CED | U+10CAD | Azonos jel |
| us | US | U+10CE3 | U+10CA3 | |
| enc | ENC | U+10CC5 | U+10C85 | |
| nb | NB | U+10CE5 | U+10CA5 | |
| mb | MB | U+10CF2 | U+10CB2 | |
| ak | AK | U+10CD3 | U+10C93 | Azonos a mély K kódpontjával |

**Időjelek** (validáció szükséges):

| Latin kombináció | Rovás név | Kódpont (feltételezett) |
|-----------------|-----------|------------------------|
| tprus | TPRUS (ÉV) | U+10CF1 |
| tpru | TPRU (HÓNAP) | U+10CF3 |

### 13.2 Bogárjelek feldolgozási szabálya

Ha a `useBugsigns` konfiguráció aktív, a bogárjelek keresése a normál betűkonverzió ELŐTT történik. A feldolgozási prioritás:

**5 karakteres:** `tprus`
**4 karakteres:** `tpru`
**3 karakteres:** `and`, `ant`, `amb`, `emp`, `ent`, `int`, `unk`, `ünk`, `enc`
**2 karakteres:** `ak`, `mb`, `nb`, `us`

Ezek a kulcsok a normál kettős/hármas betűk (cs, gy, dzs stb.) ELŐTT keresendők.

### 13.3 Bogárjelek konfigurációs bővítés

```typescript
// v2.0 config bővítés
interface RovasConverterConfig {
  // ... v1.x opciók ...
  useBugsigns: boolean; // default: false — Kísérőjelek (bogárjelek) használata
}
```

### 13.4 Bogárjel tesztek

| Bemenet | Elvárt kimenet (leírás) |
|---------|------------------------|
| `"antal"` | ANT + A + eL |
| `"ember"` | E + eM + eB + E + eR (nincs bogárjel illeszkedés) |
| `"bambusz"` | eB + AMB + U + eSZ |
| `"munkás"` | eM + UNK + Á + eS |

### 13.5 Validációs feladat a v2.0 fejlesztés előtt

A DEV és AUD a következő forrásokat kell egyeztesse az implementáció előtt:
1. Unicode szabvány N4268 ajánlás — pontos kódpont-hozzárendelések
2. rovas.info kódolási segédlet (https://rovas.info/2021/06/rovas-encoding/)
3. oldhungarian.eu ligatúra-dokumentáció

Ha egy bogárjel kódpontja eltér a fenti táblázattól, az AUD jelzi és a SPEC frissítendő.
