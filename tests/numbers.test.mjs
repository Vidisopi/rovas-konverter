import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_SUPPORTED_NUMBER,
  numberToRovas,
  rovasToNumber,
  arabicStringToRovas,
} from '../rovas-konverter/converters/numbers.js';
import { latinToRovas, rovasToLatin } from '../rovas-konverter/index.js';

const R = { I: '\u{10CFA}', V: '\u{10CFB}', X: '\u{10CFC}',
  L: '\u{10CFD}', C: '\u{10CFE}', M: '\u{10CFF}' };
const rovas = logical => [...logical].map(c => R[c]).join('');

test('a kis számok és a meglévő szorzatos alakok változatlanok', () => {
  assert.equal(numberToRovas(2026), rovas('IIMIIXVI'));
  assert.equal(numberToRovas(1253), rovas('MIICLIII'));
  assert.equal(rovasToNumber(rovas('IIMIIXVI')), 2026);
  assert.equal(rovasToNumber(rovas('CC')), 200); // additív, nem ezres
});

test('az ezres szorzólánc kezeli a milliót és a milliárdot', () => {
  assert.equal(numberToRovas(1_000_000), rovas('MM'));
  assert.equal(numberToRovas(1_000_001), rovas('MMI'));
  assert.equal(numberToRovas(2_500_000), rovas('IIMVCM'));
  assert.equal(numberToRovas(1_000_000_000), rovas('MMM'));
  for (const [logical, expected] of [
    ['MM', 1_000_000], ['MMI', 1_000_001], ['IIMVCM', 2_500_000],
    ['IMM', 1_000_000], // a választható explicit egyes szorzó is
    ['MIM', 1_001_000], ['MMM', 1_000_000_000],
  ]) assert.equal(rovasToNumber(rovas(logical)), expected);
});

test('körbe-körbe konverzió nagy számokra', () => {
  for (const n of [999_999, 1_000_000, 1_000_001, 1_001_000,
    1_234_567, 1_999_999, 2_500_000, 12_345_678, 999_999_999,
    1_000_000_000, 1_000_000_000_000, MAX_SUPPORTED_NUMBER]) {
    assert.equal(rovasToNumber(numberToRovas(n)), n, String(n));
  }
});

test('nincs csendes modulo-csonkítás a tartomány felett', () => {
  assert.equal(numberToRovas(0), '');
  assert.throws(() => numberToRovas(Number.MAX_SAFE_INTEGER + 1), RangeError);
  assert.throws(() => rovasToNumber(rovas('MMMMMMMMMMMMMMMM')), RangeError);
});

test('a vezető ezresjelek olvasása kapcsolható', () => {
  const mm = rovas('MM');
  assert.equal(rovasToNumber(mm), 1_000_000);
  assert.equal(rovasToNumber(mm, { thousandsMode: 'multiplicative' }), 1_000_000);
  assert.equal(rovasToNumber(mm, { thousandsMode: 'additive' }), 2_000);
  assert.equal(rovasToNumber(rovas('MMM'), { thousandsMode: 'additive' }), 3_000);
  assert.equal(rovasToNumber(rovas('IIM'), { thousandsMode: 'additive' }), 2_000);
  assert.equal(rovasToNumber(rovas('IIX'), { thousandsMode: 'additive' }), 20);
  assert.equal(rovasToNumber(rovas('CC'), { thousandsMode: 'additive' }), 200);
  assert.throws(() => rovasToNumber(mm, { thousandsMode: 'ismeretlen' }), RangeError);
});

test('additív módban explicit I jelöli a beágyazott ezresszorzatot', () => {
  const options = { thousandsMode: 'additive' };
  assert.equal(numberToRovas(1_000_000, options), rovas('IMM'));
  assert.equal(numberToRovas(1_000_001, options), rovas('IMMI'));
  assert.equal(numberToRovas(1_000_000_000, options), rovas('IMMM'));
  assert.equal(numberToRovas(1_000_000), rovas('MM'));
  assert.equal(numberToRovas(1_000_000_000), rovas('MMM'));
  assert.equal(arabicStringToRovas('1000000', options), rovas('IMM'));
  for (const n of [2_000, 20_000, 200_000, 1_000_000, 1_000_001,
    1_001_000, 1_234_567, 1_999_999, 2_500_000, 12_345_678,
    999_999_999, 1_000_000_000, MAX_SUPPORTED_NUMBER]) {
    assert.equal(rovasToNumber(numberToRovas(n, options), options), n, String(n));
  }
});

test('a magas szintű konverterek továbbítják a thousandsMode beállítást', () => {
  const options = { thousandsMode: 'additive' };
  assert.equal(latinToRovas('1000000', options), rovas('IMM'));
  assert.equal(rovasToLatin(rovas('MM')), '1000000');
  assert.equal(rovasToLatin(rovas('MM'), options), '2000');
  assert.equal(rovasToLatin(latinToRovas('12345678', options), options), '12345678');
  assert.equal(rovasToLatin(latinToRovas('1000000000', options), options), '1000000000');
  assert.equal(latinToRovas('2026', { thousandsMode: 'multiplicative' }), rovas('IIMIIXVI'));
});
