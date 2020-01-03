import { TRIGGER_EVENTS, DATA_ATTRIBUTES, LISTENER_OPTIONS } from '../constants';
import { handler, composeAction } from '../shared';

export default __m => {
    const nodes = [].slice.call(document.querySelectorAll(`[${DATA_ATTRIBUTES.CLICK}]`));
    if (nodes.length === 0) return;
    
    for (let node of nodes){
        TRIGGER_EVENTS.forEach(ev => {
            node.addEventListener(ev, handler(composeAction({ node, action: 'click', event: 'Product Click' }), __m), LISTENER_OPTIONS);
        });
    }
};