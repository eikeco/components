import {
	isCheckable,
    isFile,
    isSelect,
    isSubmitButton,
    hasNameValue,
    isRequired,
    groupIsHidden,
    hasValue,
    groupValueReducer
} from '../../../src/lib/validator/utils';

describe('Validate > Unit > Utils > isCheckable', () => {
    it('should return true if the field is of type radio', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="radio" id="radio" name="radio" />
        </form>`;
        const field = document.getElementById('radio');
        expect(isCheckable(field)).toEqual(true);
    });
    it('should return true if the field is of type checkbox', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" id="checkbox" name="checkbox" />
        </form>`;
        const field = document.getElementById('checkbox');
        expect(isCheckable(field)).toEqual(true);
    });
    it('should return false if the field is not of type radio or checkbox', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="text" id="text" name="text" />
        </form>`;
        const field = document.getElementById('text');
        expect(isCheckable(field)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > isFile', () => {
    it('should return true if the field is of type file', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="file" id="file" name="file" />
        </form>`;
        const field = document.getElementById('file');
        expect(isFile(field)).toEqual(true);
    });
    it('should return false if the field is not of type file', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" id="checkbox" name="checkbox" />
        </form>`;
        const field = document.getElementById('checkbox');
        expect(isFile(field)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > isSelect', () => {
    it('should return true if the field is a select', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <select id="select" name="select">
                <option></option>
            </select>
        </form>`;
        const field = document.getElementById('select');
        expect(isSelect(field)).toEqual(true);
    });
    it('should return false if the field is not a select', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" id="checkbox" name="checkbox" />
        </form>`;
        const field = document.getElementById('checkbox');
        expect(isSelect(field)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > isSubmitButton', () => {
    it('should return true if the node is a button with type of submit', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <button id="btn" type="submit">Submit</button>
        </form>`;
        const node = document.getElementById('btn');
        expect(isSubmitButton(node)).toEqual(true);
    });
    it('should return true if the node is a button', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <button id="btn">Submit</button>
        </form>`;
        const node = document.getElementById('btn');
        expect(isSubmitButton(node)).toEqual(true);
    });
    it('should return false if the node is not a button and not of type submit', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" id="checkbox" name="checkbox" />
        </form>`;
        const field = document.getElementById('checkbox');
        expect(isSubmitButton(field)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > hasNameValue', () => {
    it('should return true if the node has name and value attributes', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input id="field" name="field" value="" />
        </form>`;
        const node = document.getElementById('field');
        expect(hasNameValue(node)).toEqual(true);
    });
    it('should return false if the node has no name attribute', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input id="field" value="" />
        </form>`;
        const node = document.getElementById('field');
        expect(hasNameValue(node)).toEqual(false);
    });
    it('should return false if the node has no value attribute', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input id="field" name="field" />
        </form>`;
        const node = document.getElementById('field');
        expect(hasNameValue(node)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > isRequired', () => {
    it('should return true if the group has a required validator', async () => {
        expect.assertions(1);
        const group = {
            validators: [{ type: 'required', essage: 'Required error message' }]
        };
        expect(isRequired(group)).toEqual(true);
    });
    it('should return false if the group does not contain a required validator', async () => {
        expect.assertions(1);
        const group = {
            validators: [{ type: 'range', essage: 'Range error message', params: { min: "2", max: "8" } }]
        };
        expect(isRequired(group)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > groupIsHidden', () => {
    it('should return true if the array of fields contains one with type of hidden', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="fields" id="field-1" />
            <input name="fields" id="field-2" type="hidden" />
        </form>`;
        const fields = Array.from(document.querySelectorAll('input'));
        
        expect(groupIsHidden(fields)).toEqual(true);
    });
    it('should return false if the array of fields contains no nodes with type of hidden', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="fields" id="field-1" />
            <input name="fields" id="field-2" />
        </form>`;
        const fields = Array.from(document.querySelectorAll('input'));
        
        expect(groupIsHidden(fields)).toEqual(false);
    });
});

describe('Validate > Unit > Utils > hasValue', () => {
    it('should return true if the field has a non-empty value', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="field" id="field" value="Has value" />
        </form>`;
        const field = document.getElementById('field');
        
        expect(hasValue(field)).toEqual(true);
    });
    it('should return false if the field has an empty value', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="field" id="field" value="" />
        </form>`;
        const field = document.getElementById('field');
        
        expect(hasValue(field)).toEqual(false);
    });
    it('should return false if the field has no value attribute', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="field" id="field" />
        </form>`;
        const field = document.getElementById('field');
        
        expect(hasValue(field)).toEqual(false);
    });
});

//groupValueReducer
describe('Validate > Unit > Utils > groupValueReducer', () => {
    it('should return the String value given an input with a value', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="field" id="field" value="Test value" />
        </form>`;
        const field = document.querySelector('#field');
        expect(groupValueReducer('', field)).toEqual('Test value');
    });
    it('should return an empty String given an input without a value and an initial empty string', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input name="field" id="field" value="" />
        </form>`;
        const field = document.querySelector('#field');
        expect(groupValueReducer('', field)).toEqual('');
    });
    it('should return an Array containing a String value given a checkable input with a value', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" name="field" id="field" value="Test value" checked />
        </form>`;
        const field = document.querySelector('#field');
        expect(groupValueReducer('', field)).toEqual(['Test value']);
    });
    it('should return an Array containing a String value given a checkable input with a value and an initial Array', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" name="field" id="field" value="Test value" checked />
        </form>`;
        const field = document.querySelector('#field');
        expect(groupValueReducer([], field)).toEqual(['Test value']);
    });
    it('should return an empty String given a checkable input that is not checked and an initial empty string', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<form>
            <input type="checkbox" name="field" id="field" value="Test value" />
        </form>`;
        const field = document.querySelector('#field');
        expect(groupValueReducer('', field)).toEqual('');
    });
});


// resolveGetParams

// DOMNodesFromCommaList

// escapeAttributeValue

// getStatePrefix

//appendStatePrefix

//extractValueFromGroup

//fetch