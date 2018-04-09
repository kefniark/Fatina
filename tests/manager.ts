import * as test from 'tape';
import { Test } from 'tape';
import { Fatina } from '../src/fatina';

const fatina = new Fatina();
fatina.init(false);

test('[Fatina.Manager] Update manually', (t: Test) => {
	const previousTime = fatina.time;
	fatina.update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time was properly updated');
	t.equal(previousTime + 1, fatina.elapsed, 'Check the fatina elapsed time was properly updated');

	t.end();
});

test('[Fatina.Manager] Set timescale', (t: Test) => {
	const previousTime = fatina.time;
	const previousElapsed = fatina.elapsed;

	fatina.setTimescale(0.5);
	fatina.update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time was properly updated without timescale');
	t.equal(previousElapsed + 0.5, fatina.elapsed, 'Check the fatina elapsed time was properly updated with the timescale');
	fatina.setTimescale(1);

	t.end();
});

test('[Fatina.Manager] Pause / Resume', (t: Test) => {
	const previousTime = fatina.time;
	const previousElapsed = fatina.elapsed;

	fatina.pause();
	fatina.update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time is still updated');
	t.equal(previousElapsed, fatina.elapsed, 'Check the fatina elapsed time is paused');

	fatina.resume();
	fatina.update(1);

	t.equal(previousTime + 2, fatina.time, 'Check the global time is still updated');
	t.equal(previousElapsed + 1, fatina.elapsed, 'Check the fatina elapsed time is updated and was properly resumed');

	t.end();
});

test('[Fatina.Manager] Create tween', (t: Test) => {
	const obj = { x: 0 };
	const tween = fatina.tween(obj).to({ x: 1 }, 1);
	tween.start();

	t.equal(0, obj.x, 'check the tween is not starting magically');

	fatina.update(0.5);
	t.equal(0.5, obj.x, 'check the tween is halfway through');

	fatina.update(0.5);
	t.equal(1, obj.x, 'check the tween is finished');
	t.equal(1, tween.elapsed, 'check the tween is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create sequence', (t: Test) => {
	const obj = { x: 0 };
	const sequence = fatina.sequence();
	sequence.appendInterval(1);
	sequence.append(fatina.tween(obj).to({ x: 1 }, 1));
	sequence.start();

	t.equal(0, obj.x, 'check the sequence is not starting magically');

	fatina.update(2);
	t.equal(1, obj.x, 'check the sequence is finished');
	t.equal(2, sequence.elapsed, 'check the sequence is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create sequence 2', (t: Test) => {
	const obj = { x: 0 };
	const sequence = fatina.sequence([
		fatina.delay(1),
		fatina.tween(obj).to({ x: 1 }, 1)
	]).start();

	t.equal(0, obj.x, 'check the sequence is not starting magically');

	fatina.update(2);
	t.equal(1, obj.x, 'check the sequence is finished');
	t.equal(2, sequence.elapsed, 'check the sequence is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create Delay', (t: Test) => {
	let started = 0;
	let killed = 0;
	let completed = 0;
	let elapsed = 0;

	const delay = fatina.delay(20)
		.onStart(() => {})
		.onStart(() => started++)
		.onUpdate(() => {})
		.onUpdate((dt: number) => {
			elapsed += dt;
		})
		.onUpdate(() => {})
		.onKilled(() => {})
		.onKilled(() => killed++)
		.onKilled(() => {})
		.onComplete(() => {})
		.onComplete(() => completed++)
		.onComplete(() => {})
		.start();
	fatina.update(10);

	t.equal(1, started);
	t.equal(10, elapsed);
	t.equal(0, completed);

	fatina.update(10);

	t.equal(1, started);
	t.equal(20, elapsed);
	t.equal(1, completed);

	delay.skip();
	delay.kill();

	fatina.delay(1).setLoop(2).start();
	fatina.update(5);

	t.end();
});

test('[Fatina.Manager] Use SetTimeout', (t: Test) => {
	let called = 0;
	fatina.setTimeout(() => called++, 10);

	fatina.update(6);
	t.equal(0, called);

	fatina.update(6);
	t.equal(1, called);

	t.end();
});

test('[Fatina.Manager] Use SetInterval', (t: Test) => {
	let called = 0;
	fatina.setInterval(() => called++, 2);

	fatina.update(1);
	t.equal(0, called);

	fatina.update(1);
	t.equal(1, called);

	fatina.update(6);
	t.equal(4, called);

	t.end();
});

test('[Fatina.Manager] Ticker Helpers', (t: Test) => {
	const ticker = fatina.mainTicker;

	ticker.start();

	t.ok(ticker.isRunning);
	t.notOk(ticker.isFinished);
	t.notOk(ticker.isIdle);
	t.notOk(ticker.isPaused);

	fatina.pause();
	fatina.pause();

	t.notOk(ticker.isRunning);
	t.notOk(ticker.isFinished);
	t.ok(ticker.isPaused);

	fatina.resume();
	fatina.resume();

	t.end();
});

test('[Fatina.Manager] Ticker Helpers', (t: Test) => {
	let created = 0;

	fatina.addListenerCreated(() => created++);
	fatina.tween({}).to({}, 1);
	fatina.sequence();
	fatina.delay(1);
	fatina.ticker();

	t.equal(created, 4);
	t.end();
});

test('[Fatina.Manager] Ticker Helpers', (t: Test) => {
	const ticker = fatina.mainTicker;

	ticker.start();

	t.ok(ticker.isRunning);
	t.notOk(ticker.isFinished);
	t.notOk(ticker.isIdle);
	t.notOk(ticker.isPaused);

	fatina.pause();
	fatina.pause();

	t.notOk(ticker.isRunning);
	t.notOk(ticker.isFinished);
	t.ok(ticker.isPaused);

	fatina.resume();
	fatina.resume();

	t.end();
});

test('[Fatina.Manager] Create cascade tween', (t: Test) => {
	const obj = { x: 0 };
	const tween = fatina.tween(obj)
		.to({ x: 500 }, 500)
		.onComplete(() => {
			fatina.tween(obj)
			.to({ x: 0 }, 500)
			.start();
		});
	tween.start();

	t.equal(0, obj.x, 'check the tween is not starting magically');

	fatina.update(50);
	t.equal(50, obj.x, 'check the tween is halfway through');

	fatina.update(500);
	t.equal(500, obj.x, 'check the tween is finished');

	fatina.update(500);
	t.equal(0, obj.x, 'check the second tween is finished');

	t.end();
});

test('[Fatina.Manager] Test Pooling', (t: Test) => {
	let start = 0;
	let complete = 0;
	for (let i = 0; i < 1024; i++) {
		const duration = Math.random() * 49 + 1;
		const obj = { x: 0, y: 0, z: 0 };
		const tween = fatina.tween(obj).to({ x: 1 }, duration);
		tween.onStart(() => start++);
		tween.onComplete(() => complete++);
		tween.start();
		fatina.update(1);
	}
	fatina.update(50);

	t.equal(start, 1024);
	t.equal(complete, 1024);
	t.end();
});

test('[Fatina.Manager] Create ticker', (t: Test) => {
	const obj = { x: 0, y: 0, z: 0 };
	const gameTicker = fatina.ticker();
	const uiTicker = fatina.ticker();

	fatina.tween(obj).setParent(gameTicker).to({ x: 5 }, 5).start();
	fatina.tween(obj).setParent(uiTicker).to({ y: 5 }, 5).start();
	fatina.tween(obj).to({ z: 5 }, 5).start();

	t.notEqual(undefined, gameTicker, 'check a ticker is properly created');

	fatina.update(1);
	t.equal(1, obj.x, 'check the game ticker runs');
	t.equal(1, obj.y, 'check the ui ticker runs');
	t.equal(1, obj.z, 'check the main ticker runs');

	fatina.setTimescale(2);
	gameTicker.setTimescale(0.5);
	uiTicker.setTimescale(0.25);

	uiTicker.addTick(() => {});
	uiTicker.removeTick(() => {});
	uiTicker.removeTick(undefined as any);

	fatina.update(1);
	t.equal(2, obj.x, 'check the game ticker runs');
	t.equal(1.5, obj.y, 'check the ui ticker runs');
	t.equal(3, obj.z, 'check the main ticker runs');

	fatina.setTimescale(1);
	gameTicker.setTimescale(1);

	gameTicker.pause();
	uiTicker.kill();
	fatina.update(1);
	t.equal(2, obj.x, 'check the game ticker is paused');
	t.equal(1.5, obj.y, 'check the ui ticker is killed');

	gameTicker.resume();
	fatina.update(1);
	t.equal(3, obj.x, 'check the game ticker is resumed');

	gameTicker.kill();
	gameTicker.kill();
	fatina.update(1);
	gameTicker.reset();

	fatina.destroy();
	t.end();
});
