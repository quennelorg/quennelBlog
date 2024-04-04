import { describe, it, expect } from '@jest/globals';
import { decrypt, encrypt } from '../util/crypto';
describe('crypto', function () {
	it('should test crypto string', function () {
		const word = 'dasdd';
		const test = encrypt(word);
		const answer = decrypt(test);
		expect(answer).toStrictEqual(word);
	});
	it('should test crypto obj', function () {
		const word = { d: 'asd' };
		const test = encrypt(word);
		const answer = decrypt(test);
		expect(answer).toStrictEqual(JSON.stringify(word));
	});
});
