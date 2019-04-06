import * as test from 'tape';
import { Test } from 'tape';
import { Fatina } from '../src/fatina';
import { get, IFatinaPluginPreset } from '../src/plugins/preset';

const src = new Fatina();
src.init(false);
src.loadPlugin(get());
const fatina = src as IFatinaPluginPreset;

function getSprite() {
	return {
		position: { x: 0, y: 0 },
		scale: { x: 0, y: 0 },
		alpha: 1
	};
}

test('[Fatina.Preset] Preset Kill', (t: Test) => {
	const tween1 = fatina.wobble(getSprite()).start();
	const tween2 = fatina.scale(getSprite()).start();
	const tween3 = fatina.pulse(getSprite()).start();
	const tween4 = fatina.sonar(getSprite()).start();
	const tween5 = fatina.shake(getSprite()).start();

	fatina.update(5);

	tween1.kill();
	tween2.kill();
	tween3.kill();
	tween4.kill();
	tween5.kill();

	t.end();
});

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
