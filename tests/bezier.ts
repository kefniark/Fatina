import * as test from 'tape';
import { Test } from 'tape';
import { Fatina } from '../src/fatina';
import { get, IFatinaPluginBezier } from '../src/plugins/bezier';

const src = new Fatina();
src.init(false);
src.loadPlugin(get());
const fatina = src as IFatinaPluginBezier;

test('[Fatina.Bezier] Test Curve', (t: Test) => {
	const obj = {
		position: { x: 0, y: 0 },
		rotation: 0
	};
	fatina.curve(obj, {
		ctr1: { x: 5, y: 10 },
		ctr2: { x: 10, y: 10 },
		to: { x: 20, y: 0 },
		duration: 25
	}).start();

	fatina.update(25);
	t.equal(obj.position.x, 20);
	t.equal(obj.position.y, 0);
	t.end();
});

test('[Fatina.Bezier] Test Arc', (t: Test) => {
	const obj = {
		position: { x: 0, y: 0 },
		rotation: 0
	};
	fatina.arc(obj, {
		ctr1: { x: 5, y: 10 },
		to: { x: 20, y: 0 },
		duration: 25
	}).start();

	fatina.update(25);
	t.equal(obj.position.x, 20);
	t.equal(obj.position.y, 0);
	t.end();
});

test('[Fatina.Bezier] Test Path', (t: Test) => {
	const obj = {
		position: { x: 0, y: 0 },
		rotation: 0
	};
	fatina.path(obj, {
		points: [
			{ x: 5, y: 10 },
			{ x: 50, y: 50 },
			{ x: 20, y: 0 }
		],
		method: 'catmull',
		duration: 100
	}).start();
	fatina.update(100);
	t.equal(obj.position.x, 20);
	t.equal(obj.position.y, 0);
	t.end();
});
