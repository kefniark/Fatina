import * as test from 'tape';
import { easeNames, easeTypes } from '../src/fatina/easing/easing';

test('[Fatina.Easing]', function (t: any) {
	for (let name in easeNames) {
		if (!easeNames.hasOwnProperty(name)) {
			continue;
		}

		let ease = easeNames[name];
		t.equal(0, ease(0), 'Check ' + name + ' start at 0');
		t.equal(1, ease(1), 'Check ' + name + ' finish at 1');
		t.ok(ease(0.2, 'intermediate value 0.2'));
		t.ok(ease(0.5, 'intermediate value 0.5'));
		t.ok(ease(0.8, 'intermediate value 0.8'));
	}

	t.equal(Object.keys(easeNames).length, easeTypes.length, 'check same amount of tween is exposed in both array');
	t.end();
});
