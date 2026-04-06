# 𐳢 Rovás Konverter

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://vidisopi.github.io/rovas-konverter/)
[![Unicode](https://img.shields.io/badge/Unicode-Old%20Hungarian%20U%2B10C80-blue)](https://www.unicode.org/charts/PDF/U10C80.pdf)
[![SPEC](https://img.shields.io/badge/SPEC-v1.2-purple)](./SPEC.md)

A bidirectional converter between Latin-script Hungarian and **Old Hungarian (Székely-Magyar Rovás)** Unicode characters.

**[→ Live Demo](https://vidisopi.github.io/rovas-konverter/)**

---

## Features

- ✅ **Latin → Rovás** conversion (primary)
- ✅ **Rovás → Latin** conversion (secondary)
- ✅ **Number conversion** — additively encoded rovás numerals (both directions)
- ✅ **Vowel harmony K-selection** — automatically chooses between deep (*aK*) and high (*eK*) variants
- ✅ **Capital letter support** — Unicode Old Hungarian uppercase codepoints
- ✅ **Digraph handling** — `cs`, `gy`, `ly`, `ny`, `sz`, `ty`, `zs`, `dz`, `dzs` and their doubled forms
- ✅ **Foreign letter ligatures** — `q`, `w`, `x`, `y` as ZWJ ligatures or decomposed
- ✅ **Separator character** — `|` prevents false digraph detection in compound words
- ✅ **Punctuation mapping** — mirrored comma, reversed quotation mark, etc.
- ✅ Pure TypeScript library — zero runtime dependencies
- ✅ ES Module compatible

---

## Demo

Try it live: **https://vidisopi.github.io/rovas-konverter/**

Example conversions:

| Latin | Rovás | Notes |
|-------|-------|-------|
| `magyar` | 𐳚𐳀𐳍𐳀𐳢 | Basic conversion |
| `cs` | 𐳆 | Single digraph glyph |
| `kirakat` | 𐳒𐳎𐳢𐳀𐳓𐳀𐳧 | Mixed vowel harmony K |
| `2026` | 𐳺𐳺𐳿𐳺𐳺𐳼𐳻𐳺 | Rovás numerals |

> **Font required:** To display rovás characters correctly, install [Noto Sans Old Hungarian](https://fonts.google.com/noto/specimen/Noto+Sans+Old+Hungarian) or [OldHungarian](https://oldhungarian.eu).

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Vidisopi/rovas-konverter.git
cd rovas-konverter

# Install dependencies
npm install

# Build
npm run build
```

---

## Usage

### As an ES Module (browser / Node.js)

```javascript
import { latinToRovas, rovasToLatin, numberToRovas } from './dist/index.js';

// Basic conversion
latinToRovas('magyar');           // → '𐳚𐳀𐳍𐳀𐳢'

// With options
latinToRovas('kirakat', {
  useVowelHarmonyK: true,         // deep/high K selection
  useCapitals: true,              // uppercase rovás codepoints
});

// Reverse conversion
rovasToLatin('𐳚𐳀𐳍𐳀𐳢');          // → 'magyar'

// Number conversion
numberToRovas(2026);              // → rovás numeral string
```

---

## API Reference

### `latinToRovas(text, config?)`

Converts Latin-script Hungarian text to Unicode Old Hungarian characters.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Input text in Latin script |
| `config` | `Partial<RovasConverterConfig>` | Optional configuration |

**Returns:** `string` — Unicode Old Hungarian character sequence

### `rovasToLatin(text)`

Converts Unicode Old Hungarian characters back to Latin script.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Input rovás Unicode string |

**Returns:** `string` — Latin-script Hungarian text

### `numberToRovas(num)`

Converts an integer to the additive rovás numeral system.

| Parameter | Type | Description |
|-----------|------|-------------|
| `num` | `number` | Integer (0–999,999,999) |

**Returns:** `string` — Rovás numeral sequence

### `rovasToNumber(rovasNum)`

Converts a rovás numeral sequence back to an integer.

| Parameter | Type | Description |
|-----------|------|-------------|
| `rovasNum` | `string` | Rovás numeral Unicode string |

**Returns:** `number` — Integer value

> ⚠️ **Known limitation:** Reliable for values up to **999,999**. Numbers of 1,000,000 and above are generated correctly by `numberToRovas()`, but the reverse conversion (`rovasToNumber`) may return incorrect results due to multi-level multiplier nesting. Fix planned for v1.1.

### Configuration

```typescript
interface RovasConverterConfig {
  useVowelHarmonyK: boolean;      // default: false — use deep/high K variants
  useCapitals: boolean;           // default: false — uppercase rovás codepoints
  direction: 'rtl' | 'ltr';      // default: 'rtl'
  foreignLetterMode:
    'ligature' | 'decompose';     // default: 'ligature'
}
```

---

## Unicode Reference

This library uses the **Unicode Old Hungarian** block (`U+10C80–U+10CFF`), standardized in Unicode 8.0.

| Category | Example | Codepoint range |
|----------|---------|-----------------|
| Uppercase letters | 𐲀 𐲂 𐲆 | U+10C80–U+10CB2 |
| Lowercase letters | 𐳀 𐳂 𐳆 | U+10CC0–U+10CF2 |
| Numerals | 𐳺 𐳻 𐳼 | U+10CFA–U+10CFF |

### Font support

- [Noto Sans Old Hungarian](https://fonts.google.com/noto/specimen/Noto+Sans+Old+Hungarian) — Google, recommended
- [OldHungarian](https://oldhungarian.eu) — oldhungarian.eu, CC-BY-SA 3.0

---

## Project Structure

```
rovas-konverter/
├── src/
│   ├── index.ts                  # Main exports
│   ├── config.ts                 # Config interface & defaults
│   ├── tables/
│   │   ├── letters.ts            # LATIN_TO_ROVAS mapping table
│   │   ├── numbers.ts            # Numeral values
│   │   ├── punctuation.ts        # Punctuation mappings
│   │   └── inverse.ts            # Rovás → Latin reverse table
│   ├── converters/
│   │   ├── latin-to-rovas.ts     # Core conversion engine
│   │   ├── rovas-to-latin.ts     # Reverse conversion
│   │   ├── numbers.ts            # Numeral conversion
│   │   └── vowel-harmony.ts      # Vowel harmony & K-selection
│   └── utils/
│       ├── text-parser.ts        # Word boundary & separator handling
│       └── unicode.ts            # Unicode utilities
├── tests/                        # Unit tests (SPEC v1.2 test cases)
├── dist/                         # Compiled JS output
├── index.html                    # Web demo (GitHub Pages)
├── SPEC.md                       # Full specification (v1.2)
└── README.md
```

---

## Specification

The conversion rules are fully documented in [SPEC.md](./SPEC.md) (Hungarian, v1.2), including:

- Complete Unicode codepoint tables
- Digraph priority and greedy matching algorithm
- Vowel harmony K-selection with proximity algorithm
- Number conversion (additive system)
- Punctuation mapping
- Separator character (`|`) handling
- Planned v2.0 features (ligature signs / *bogárjelek*)

---

## Roadmap

- [x] v1.0 — Core Latin ↔ Rovás conversion
- [x] v1.0 — Rovás numerals
- [x] v1.0 — Vowel harmony K-selection
- [x] v1.0 — Web demo (GitHub Pages)
- [ ] v1.1 — Fix `rovasToNumber` for numbers ≥ 1,000,000
- [ ] v2.0 — Ligature signs (*bogárjelek*) support
- [ ] v2.0 — PWA (installable web app)
- [ ] v2.0 — Android APK

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following the [SPEC.md](./SPEC.md) rules
4. Add tests for new functionality
5. Submit a pull request

**Important:** Any change to conversion rules must reference the corresponding SPEC section. Changes that deviate from the specification require a SPEC update first.

---

## References

1. Rovás Alapítvány — Modern unified Old Hungarian character set
2. [rovas.info](https://rovas.info) — Letter application rules (K variants, QWXY, DZ/DZS)
3. [Unicode Standard 8.0](https://www.unicode.org/charts/PDF/U10C80.pdf) — Old Hungarian block
4. [oldhungarian.eu](https://oldhungarian.eu) — Font and ligature documentation

---

## License

[MIT](./LICENSE) © 2026 Vidisopi
