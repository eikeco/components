import { normaliseValidators } from '../../../src/lib/validator';

describe('Validate > Integration > normalise-validators > required', () => {
    //validation model construction
  	it('should return the correct validation model for data-val required', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<input
			id="group1"
            name="group1"
            data-val="true"
            data-val-required="Required error message"
			type="text">`;
		const input = document.querySelector('#group1');
		expect(normaliseValidators(input)).toEqual([
			{ 
                type: 'required',
                message: 'Required error message'
            }
		]);
    });

    it('should return the correct validation model for HTML5 required', async () => {
        expect.assertions(1);
        document.body.innerHTML = `<input
			id="group1"
            name="group1"
            required
			type="text">`;
		const input = document.querySelector('#group1');
		expect(normaliseValidators(input)).toEqual([
			{ 
                type: 'required'
            }
		]);
    });
});