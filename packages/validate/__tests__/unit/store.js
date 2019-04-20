import { createStore } from '../../src/lib/store';
import { ACTIONS } from '../../src/lib/constants';
let Store;
beforeAll(() => {
    Store = createStore();
});
//createStore
describe('Validate > Unit > Store > createStore', () => {
  	it('should create a store object with dispatch and get functions', async () => {
        expect(Store).not.toBeUndefined();
        expect(Store.dispatch).not.toBeUndefined();
        expect(typeof Store.dispatch == 'function').toEqual(true);
        expect(Store.getState).not.toBeUndefined();
        expect(typeof Store.getState == 'function').toEqual(true);
    });
})

//getState
describe('Validate > Unit > Store > getState', () => {
    it('should return the state object', async () => {
        expect(Store.getState()).toEqual({});
  });
});

//dispatch
describe('Validate > Unit > Store > dispatch', () => {
    it('should update state using reducers and nextState payload', async () => {
        const nextState = {
            newProp: true
        };
        Store.dispatch(ACTIONS.SET_INITIAL_STATE, nextState);
        expect(Store.getState()).toEqual(nextState);
    });
    it('should execute side effect functions', async () => {
        const nextState = { newProp: true };
        let flag = false;
        const sideEffect = () => {
            flag = true;
        };
        Store.dispatch(ACTIONS.SET_INITIAL_STATE, nextState, [sideEffect]);
        expect(flag).toEqual(true);
    });
})