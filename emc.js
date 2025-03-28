// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */

/**
 * @type {EMC}
 */
export const emc = {
    base: 'xp-as',
    map: {
        // '0.0': {
            
        // }
    },
    enhPropKey: 'xpAs',
    importEnh: async () => {
        const { XpAs } = 
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./xp-as.js'));
        return XpAs;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);