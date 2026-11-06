/**
 * Rovás Konverter - Rovás → Latin konverter
 * Spec: 5.1 – 5.4
 */
/**
 * Rovás → Latin konverzió
 * Spec: 5.1 - Általános feldolgozási algoritmus
 * Spec: 7.1 - rovasToLatin API
 *
 * @param text - Unicode Old Hungarian karaktersorozat
 * @param config - Számolvasás (thousandsMode) és bogárjel-olvasat
 * @returns Latin betűs magyar szöveg
 */
import { RovasConverterConfig } from '../config.js';
export declare function rovasToLatin(text: string, config?: Partial<RovasConverterConfig>): string;
export default rovasToLatin;
//# sourceMappingURL=rovas-to-latin.d.ts.map