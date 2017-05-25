import * as test from 'tape';
import { easeNames, easeTypes } from '../src/easing/easing';

test('Ftina -> Easing', function (t: any) {
	for (let name in easeNames) {
		if (!easeNames.hasOwnProperty(name)) {
			continue;
		}

		let ease = easeNames[name];
		t.equal(0, ease(0), 'Check ' + name + ' start at 0');
		t.equal(1, ease(1), 'Check ' + name + ' finish at 1');
	}

	t.equal(Object.keys(easeNames).length, easeTypes.length, 'check same amount of tween is exposed in both array');
	t.end();
});
