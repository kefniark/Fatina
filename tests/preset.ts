import * as test from 'tape';
import { Test } from 'tape';
import { Fatina } from '../src/fatina';

const fatina = new Fatina();
fatina.init(false);

function getSprite() {
	return {
		position: { x: 0, y: 0 },
		scale: { x: 0, y: 0 },
		alpha: 1
	};
}

test('[Fatina.Preset] Wobble', (t: Test) => {
	const obj = getSprite();

	fatina.wobble(obj, { duration: 500 }).start();
	fatina.update(1000);
	t.equal(obj.position.x, 0);
	t.equal(obj.position.y, 0);

	t.end();
});

test('[Fatina.Preset] Scale', (t: Test) => {
	const obj = getSprite();

	fatina.scale(obj, { duration: 500 }).start();
	fatina.update(1000);
	t.equal(obj.position.x, 0);
	t.equal(obj.position.y, 0);

	t.end();
});

test('[Fatina.Preset] Pulse', (t: Test) => {
	const obj = getSprite();

	fatina.pulse(obj, { duration: 500 }).start();
	fatina.update(1000);
	t.equal(obj.position.x, 0);
	t.equal(obj.position.y, 0);

	t.end();
});

test('[Fatina.Preset] Sonar', (t: Test) => {
	const obj = getSprite();

	fatina.sonar(obj, { duration: 500 }).start();
	fatina.update(1000);
	t.equal(obj.position.x, 0);
	t.equal(obj.position.y, 0);

	t.end();
});

test('[Fatina.Preset] Shake', (t: Test) => {
	const obj = {
		position: { x: 0, y: 0 },
		alpha: 1
	};

	fatina.shake(obj, { duration: 500 }).start();
	fatina.update(1000);
	t.equal(obj.position.x, 0);
	t.equal(obj.position.y, 0);

	t.end();
});
