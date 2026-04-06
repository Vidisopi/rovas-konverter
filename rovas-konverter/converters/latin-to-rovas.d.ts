/**
 * Rovás Konverter - Latin → Rovás konverter
 * Spec: 4.1 – 4.11
 */
import { RovasConverterConfig } from '../config.js';
/**
 * Latin → Rovás konverzió
 * Spec: 4.1 - Általános feldolgozási algoritmus
 * Spec: 7.1 - latinToRovas API
 *
 * @param text - Latin betűs magyar szöveg (UTF-8)
 * @param config - Konfigurációs opciók (Spec: 6.)
 * @returns Unicode Old Hungarian karaktersorozat
 */
export declare function latinToRovas(text: string, config?: Partial<RovasConverterConfig>): string;
export { latinToRovas as default };
//# sourceMappingURL=latin-to-rovas.d.ts.map