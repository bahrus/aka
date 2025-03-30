// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/xp-as/types' */;
/** @import {EnhancementInfo} from './ts-refs/trans-render/be/types' */

/**
 * @implements {Actions}
 * 
 */
class XpAs extends BE {
    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement>}
     */
    static config = {
    };


    props = new EventTarget();

    /**
     * @type {MutationObserver | undefined}
     */
    #mutationObserver;

    /**
     * @type {Map<string, string>}
     * @description A set of properties to watch for changes. This is used to determine which attributes to observe for mutations.
     */
    #propsToWatch = new Map();

    /**
     * @type {string}
     */
    #base;

    /**
     * 
     * @param {Element} el 
     * @param {EnhancementInfo} enhancementInfo 
     */
    async attach(el, enhancementInfo){
        await super.attach(el, enhancementInfo);
        this.#base = /** @type {string} */ (enhancementInfo.mountCnfg.base);
        this.#mutationObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                    const attrName = mutation.attributeName;
                    if(attrName !== null){
                        this.#processAttr(attrName);
                    }
                    
                }
            }
        });
        const attrs = el.getAttributeNames();
        for (const attrName of attrs) {
            this.#processAttr(attrName);
        }
        this.#mutationObserver.observe(el, {
            attributes: true, 
        });
    }

    /**
     * 
     * @param {string} attrName 
     */
    #processAttr(attrName) {
        const baseLen = this.#base.length;
        if(attrName.length !== baseLen && attrName.startsWith(this.#base)){
            //const len = attrName.length;
            const propName = attrName.substring(baseLen + 1); // remove 'xp-as-' and '-from'
            const secondaryAttrName = this.enhancedElement.getAttribute(attrName);
            if(secondaryAttrName === null) throw 500; // no secondary attribute to watch
            this.#propsToWatch.set(secondaryAttrName, propName);
            this.#propagateAttr(secondaryAttrName);
        }else{
            
            if(this.#propsToWatch.has(attrName)){
                this.#propagateAttr(attrName);
            }
        }
    }

    #tryParse(val){
        try {
            return JSON.parse(val);
        } catch (e) {
            // fallback to returning the raw value if parsing fails
            return val;
        }
    }

    /**
     * 
     * @param {string} attrName 
     */
    #propagateAttr(attrName) {
        const rawVal = this.enhancedElement.getAttribute(attrName);
        const value = rawVal === null ? rawVal : this.#tryParse(rawVal);
        const propName = this.#propsToWatch.get(attrName);
        if(propName === undefined) throw 500; // no property to set
        this.props[propName] = value;
        this.props.dispatchEvent(new Event(propName));
    }

    /**
     * 
     * @param {Element} el 
     */
    async detach(el){
        super.detach(el);
        if(this.#mutationObserver){
            this.#mutationObserver.disconnect();
            this.#mutationObserver = undefined;
        }
    }
}

await XpAs.bootUp();
export {XpAs};