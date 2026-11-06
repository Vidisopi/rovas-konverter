import test from 'node:test';
import assert from 'node:assert/strict';
import { latinToRovas, rovasToLatin, BUG_SIGNS } from '../rovas-konverter/index.js';

const { amb, enc, and, unk, emp, ent, entShaped, us } = BUG_SIGNS;
const traditional = { homorganicMode: 'traditional' };
const cluster = { homorganicMode: 'cluster' };

test('a közönséges betűk nem a bogárjelek kódpontjain állnak', () => {
  assert.equal(latinToRovas('t'), '\u{10CE6}');
  assert.notEqual(latinToRovas('t'), ent.lower);
  assert.equal(latinToRovas('e'), '\u{10CC9}');
  assert.notEqual(latinToRovas('e'), and.lower);
  assert.equal(latinToRovas('ly'), '\u{10CD7}');
  assert.notEqual(latinToRovas('ly'), unk.lower);
  assert.equal(latinToRovas('ű'), '\u{10CEC}');
  assert.notEqual(latinToRovas('ű'), emp.lower);
  assert.equal(latinToRovas('ü'), '\u{10CED}');
  assert.equal(latinToRovas('ö'), '\u{10CDE}');
  assert.equal(latinToRovas('ő'), '\u{10CDF}');
  assert.equal(latinToRovas('ë'), '\u{10CCA}');
  assert.equal(rovasToLatin('\u{10CCA}'), 'e');
  assert.equal(rovasToLatin('\u{10CDD}'), 'ö');
  assert.equal(rovasToLatin('\u{10CE3}'), 'r');
  assert.equal(rovasToLatin('\u{10CE9}'), '\u{10CE9}');
});

test('a magyar körbejár, és az x/y ligatúra a megfelelő betűkből áll', () => {
  assert.equal(rovasToLatin(latinToRovas('magyar')), 'magyar');
  assert.equal(latinToRovas('magyar'), '\u{10CD8}\u{10CC0}\u{10CCE}\u{10CC0}\u{10CE2}');
  assert.equal(latinToRovas('x'), '\u{10CD3}\u200D\u{10CE5}');
  assert.equal(latinToRovas('y'), '\u{10CD0}\u200D\u{10CD2}');
  assert.equal(rovasToLatin(latinToRovas('x')), 'x');
  assert.equal(rovasToLatin(latinToRovas('y')), 'y');
  assert.equal(rovasToLatin(latinToRovas('dz')), 'dz');
  assert.equal(rovasToLatin(latinToRovas('dzs')), 'dzs');
  assert.equal(rovasToLatin(latinToRovas('q')), 'q');
  assert.equal(latinToRovas('a\u0301'), latinToRovas('á'));
});

test('a K hangrendje és a nagybetűje a Unicode EK/AK párt használja', () => {
  assert.equal(latinToRovas('kép', { useVowelHarmonyK: true }).startsWith('\u{10CD3}'), true);
  assert.equal(latinToRovas('kár', { useVowelHarmonyK: true }).startsWith('\u{10CD4}'), true);
  assert.equal(
    latinToRovas('Kár', { useVowelHarmonyK: true, useCapitals: true }).startsWith('\u{10C94}'),
    true,
  );
  assert.equal(
    latinToRovas('Kép', { useVowelHarmonyK: true, useCapitals: true }).startsWith('\u{10C93}'),
    true,
  );
  assert.equal(rovasToLatin(latinToRovas('kirakat', { useVowelHarmonyK: true })), 'kirakat');
});

test('alapból nincs bogárjel-helyettesítés, a meglévő jel mássalhangzó-kapcsolat', () => {
  assert.equal(latinToRovas('antal'), latinToRovas('a') + latinToRovas('n') + latinToRovas('t') + latinToRovas('al'));
  assert.equal(latinToRovas('tprus'), latinToRovas('tprus'));
  assert.equal(rovasToLatin(ent.lower), 'nt');
  assert.equal(rovasToLatin(ent.upper), 'Nt');
  assert.equal(rovasToLatin(amb.lower), 'mb');
  assert.equal(rovasToLatin(enc.lower), 'nc');
  assert.equal(rovasToLatin(and.lower), 'nd');
  assert.equal(rovasToLatin(unk.lower), 'nk');
  assert.equal(rovasToLatin(emp.lower), 'mp');
  assert.equal(rovasToLatin(entShaped.lower), entShaped.lower);
  assert.equal(rovasToLatin(us.lower), us.lower);
  assert.notEqual(ent.lower, entShaped.lower);
});

test('a hagyományos név csak a kimondott szótagot cseréli, a puszta nt-t nem', () => {
  assert.equal(latinToRovas('antal', traditional), ent.lower + latinToRovas('al'));
  assert.equal(latinToRovas('szent', traditional), latinToRovas('sz') + ent.lower);
  assert.equal(latinToRovas('bambusz', traditional), latinToRovas('b') + amb.lower + latinToRovas('usz'));
  assert.equal(latinToRovas('munkás', traditional), latinToRovas('m') + unk.lower + latinToRovas('ás'));
  assert.equal(latinToRovas('ember', traditional), latinToRovas('ember'));
  assert.equal(latinToRovas('enciklopédia', traditional).startsWith(enc.lower), true);
  assert.equal(latinToRovas('andrás', traditional).startsWith(and.lower), true);
  assert.equal(latinToRovas('szempilla', traditional).includes(emp.lower), true);
  assert.equal(latinToRovas('mint', traditional), latinToRovas('m') + ent.lower);
  assert.equal(latinToRovas('nt', traditional), latinToRovas('nt'));
  assert.equal(latinToRovas('mb', traditional), latinToRovas('mb'));
  assert.equal(latinToRovas('ünk', traditional), latinToRovas('ünk'));
  assert.equal(latinToRovas('ant tal', traditional), ent.lower + ' ' + latinToRovas('tal'));
  assert.equal(latinToRovas('an|tal', traditional), latinToRovas('antal'));
  assert.equal(latinToRovas('ponty', traditional), latinToRovas('ponty'));
});

test('a hagyományos visszafejtés az ENT magánhangzóját konfigurálja', () => {
  assert.equal(rovasToLatin(latinToRovas('szent', traditional), traditional), 'szent');
  assert.equal(rovasToLatin(latinToRovas('antal', traditional), traditional), 'ental');
  const ant = { ...traditional, entVowel: 'a' };
  assert.equal(rovasToLatin(latinToRovas('antal', ant), ant), 'antal');
  const int = { ...traditional, entVowel: 'i' };
  assert.equal(rovasToLatin(ent.lower, int), 'int');
  assert.equal(latinToRovas('Antal', { ...traditional, useCapitals: true }), ent.upper + latinToRovas('al'));
  assert.equal(rovasToLatin(ent.upper, traditional), 'Ent');
});

test('a mássalhangzó-kapcsolat megtartja a magánhangzót, és az ember mb-jét is jelöli', () => {
  assert.equal(
    latinToRovas('bambusz', cluster),
    latinToRovas('ba') + amb.lower + latinToRovas('usz'),
  );
  assert.equal(
    latinToRovas('ember', cluster),
    latinToRovas('e') + amb.lower + latinToRovas('er'),
  );
  assert.equal(
    latinToRovas('szent', cluster),
    latinToRovas('sze') + ent.lower,
  );
  assert.equal(rovasToLatin(latinToRovas('antal', cluster), cluster), 'antal');
  assert.equal(rovasToLatin(latinToRovas('szent', cluster), cluster), 'szent');
  assert.equal(latinToRovas('ncs', cluster), latinToRovas('ncs'));
  assert.equal(latinToRovas('ponty', cluster), latinToRovas('ponty'));
});

test('az n+ZWJ+t összerovás nem ENT, és a számírás nem változik', () => {
  const joined = '\u{10CD9}\u200D\u{10CE6}';
  assert.equal(rovasToLatin(joined), 'n\u200Dt');
  assert.notEqual(rovasToLatin(joined, traditional), 'ent');
  assert.equal(latinToRovas('nt'), latinToRovas('n') + latinToRovas('t'));
  assert.equal(latinToRovas('1000000 antal', { ...cluster, thousandsMode: 'additive' }).startsWith('\u{10CFA}\u{10CFF}\u{10CFF}'), true);
  assert.equal(rovasToLatin('\u{10CFF}\u{10CFF}', { thousandsMode: 'additive', homorganicMode: 'traditional' }), '2000');
});

test('az ENT-alakú jel és az US csak a választott olvasattal jár', () => {
  assert.equal(latinToRovas('tprus'), latinToRovas('t') + latinToRovas('prus'));
  assert.equal(latinToRovas('temperius').includes(entShaped.lower), false);
  const tprus = { entShapedReading: 'tprus' };
  assert.equal(latinToRovas('tprus', tprus), entShaped.lower);
  assert.equal(rovasToLatin(entShaped.lower, tprus), 'tprus');
  assert.equal(rovasToLatin(entShaped.upper, tprus), 'Tprus');
  assert.notEqual(latinToRovas('tprus', tprus), ent.lower);
  const temperius = { entShapedReading: 'temperius', useCapitals: true };
  assert.equal(latinToRovas('Temperius', temperius), entShaped.upper);
  assert.equal(rovasToLatin(entShaped.lower, temperius), 'temperius');
  assert.equal(latinToRovas('tpru', tprus), latinToRovas('tpru'));
  assert.equal(latinToRovas('plusz', { useUsSign: true }), latinToRovas('plusz'));
  assert.equal(latinToRovas('augusztus', { useUsSign: true }).includes('\u{10CE5}'), true);
  assert.equal(latinToRovas('jézus', { useUsSign: true }).endsWith(us.lower), true);
  assert.equal(rovasToLatin(us.lower, { useUsSign: true }), 'us');
  assert.equal(rovasToLatin(us.upper, { useUsSign: true }), 'Us');
});

test('az EMP vitatott omp olvasata nem az alapértelmezés', () => {
  const omp = { homorganicMode: 'traditional', empReading: 'omp' };
  assert.equal(latinToRovas('emp', omp), latinToRovas('emp'));
  assert.equal(latinToRovas('omp', omp), emp.lower);
  assert.equal(rovasToLatin(emp.lower, omp), 'omp');
  assert.equal(rovasToLatin(emp.lower, traditional), 'emp');
});

test('az ismeretlen bogárjel-kapcsoló hibát dob, a többi betű megmarad', () => {
  assert.throws(() => latinToRovas('a', { homorganicMode: 'mind' }), RangeError);
  assert.throws(() => rovasToLatin('a', { entShapedReading: 'tpru' }), RangeError);
  assert.throws(() => latinToRovas('a', { entVowel: 'o' }), RangeError);
  assert.throws(() => latinToRovas('a', { empReading: 'amb' }), RangeError);
  assert.equal(rovasToLatin(latinToRovas('község')), 'község');
  assert.equal(latinToRovas('ccs'), '\u{10CC6}\u{10CC6}');
  assert.equal(rovasToLatin('\u{10CC6}\u{10CC6}'), 'cscs');
  assert.equal(latinToRovas('Q', { useCapitals: true }), '\u{10C93}\u200D\u{10CAE}');
  assert.equal(rovasToLatin('\u{10C93}\u200D\u{10CAE}'), 'Q');
});
