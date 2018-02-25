import * as test from 'tape';
import { Test } from 'tape';
import * as fatina from '../src/fatina/index';

fatina.Init(false);

test('[Fatina.Manager] Update manually', (t: Test) => {
	const previousTime = fatina.time;
	fatina.Update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time was properly updated');
	t.equal(previousTime + 1, fatina.Elapsed(), 'Check the fatina elapsed time was properly updated');

	t.end();
});

test('[Fatina.Manager] Set timescale', (t: Test) => {
	const previousTime = fatina.time;
	const previousElapsed = fatina.Elapsed();

	fatina.SetTimescale(0.5);
	fatina.Update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time was properly updated without timescale');
	t.equal(previousElapsed + 0.5, fatina.Elapsed(), 'Check the fatina elapsed time was properly updated with the timescale');
	fatina.SetTimescale(1);

	t.end();
});

test('[Fatina.Manager] Pause / Resume', (t: Test) => {
	const previousTime = fatina.time;
	const previousElapsed = fatina.Elapsed();

	fatina.Pause();
	fatina.Update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time is still updated');
	t.equal(previousElapsed, fatina.Elapsed(), 'Check the fatina elapsed time is paused');

	fatina.Resume();
	fatina.Update(1);

	t.equal(previousTime + 2, fatina.time, 'Check the global time is still updated');
	t.equal(previousElapsed + 1, fatina.Elapsed(), 'Check the fatina elapsed time is updated and was properly resumed');

	t.end();
});

test('[Fatina.Manager] Create tween', (t: Test) => {
	const obj = { x: 0 };
	const tween = fatina.Tween(obj, ['x']).To({ x: 1 }, 1);
	tween.Start();

	t.equal(0, obj.x, 'check the tween is not starting magically');

	fatina.Update(0.5);
	t.equal(0.5, obj.x, 'check the tween is halfway through');

	fatina.Update(0.5);
	t.equal(1, obj.x, 'check the tween is finished');
	t.equal(1, tween.elapsed, 'check the tween is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create sequence', (t: Test) => {
	const obj = { x: 0 };
	const sequence = fatina.Sequence();
	sequence.AppendInterval(1);
	sequence.Append(fatina.Tween(obj, ['x']).To({ x: 1 }, 1));
	sequence.Start();

	t.equal(0, obj.x, 'check the sequence is not starting magically');

	fatina.Update(2);
	t.equal(1, obj.x, 'check the sequence is finished');
	t.equal(2, sequence.elapsed, 'check the sequence is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create sequence 2', (t: Test) => {
	const obj = { x: 0 };
	const sequence = fatina.Sequence([
		fatina.Delay(1),
		fatina.Tween(obj, ['x']).To({ x: 1 }, 1)
	]).Start();

	t.equal(0, obj.x, 'check the sequence is not starting magically');

	fatina.Update(2);
	t.equal(1, obj.x, 'check the sequence is finished');
	t.equal(2, sequence.elapsed, 'check the sequence is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create Delay', (t: Test) => {
	let started = 0;
	let updated = 0;
	let killed = 0;
	let completed = 0;
	let elapsed = 0;

	const delay = fatina.Delay(20)
		.OnStart(() => {})
		.OnStart(() => started++)
		.OnUpdate(() => {})
		.OnUpdate((dt: number, progress: number) => {
			updated++;
			elapsed += dt;
		})
		.OnUpdate(() => {})
		.OnKilled(() => {})
		.OnKilled(() => killed++)
		.OnKilled(() => {})
		.OnComplete(() => {})
		.OnComplete(() => completed++)
		.OnComplete(() => {})
		.Start();
	fatina.Update(10);

	t.equal(1, started);
	t.equal(10, elapsed);
	t.equal(0, completed);

	fatina.Update(10);

	t.equal(1, started);
	t.equal(20, elapsed);
	t.equal(1, completed);

	delay.Skip();
	delay.Kill();

	fatina.Delay(1).SetLoop(2).Start();
	fatina.Update(5);

	t.end();
});

test('[Fatina.Manager] Use SetTimeout', (t: Test) => {
	let called = 0;
	fatina.SetTimeout(() => called++, 10);

	fatina.Update(6);
	t.equal(0, called);

	fatina.Update(6);
	t.equal(1, called);

	t.end();
});

test('[Fatina.Manager] Use SetInterval', (t: Test) => {
	let called = 0;
	fatina.SetInterval(() => called++, 2);

	fatina.Update(1);
	t.equal(0, called);

	fatina.Update(1);
	t.equal(1, called);

	fatina.Update(6);
	t.equal(4, called);

	t.end();
});

test('[Fatina.Manager] Ticker Helpers', (t: Test) => {
	const ticker = fatina.MainTicker();

	ticker.Start();

	t.ok(ticker.IsRunning());
	t.notOk(ticker.IsFinished());
	t.notOk(ticker.IsIdle());
	t.notOk(ticker.IsPaused());

	fatina.Pause();
	fatina.Pause();

	t.notOk(ticker.IsRunning());
	t.notOk(ticker.IsFinished());
	t.ok(ticker.IsPaused());

	fatina.Resume();
	fatina.Resume();

	t.end();
});

test('[Fatina.Manager] Ticker Helpers', (t: Test) => {
	let created = 0;

	fatina.AddListenerCreated((tween) => created++);
	fatina.Tween({}, []).To({}, 1);
	fatina.Sequence();
	fatina.Delay(1);
	fatina.Ticker();

	t.equal(created, 4);
	t.end();
});

test('[Fatina.Manager] Ticker Helpers', (t: Test) => {
	const ticker = fatina.MainTicker();

	ticker.Start();

	t.ok(ticker.IsRunning());
	t.notOk(ticker.IsFinished());
	t.notOk(ticker.IsIdle());
	t.notOk(ticker.IsPaused());

	fatina.Pause();
	fatina.Pause();

	t.notOk(ticker.IsRunning());
	t.notOk(ticker.IsFinished());
	t.ok(ticker.IsPaused());

	fatina.Resume();
	fatina.Resume();

	t.end();
});

test('[Fatina.Manager] Test Pooling', (t: Test) => {
	let start = 0;
	let complete = 0;
	for (let i = 0; i < 1024; i++) {
		const duration = Math.random() * 49 + 1;
		const obj = { x: 0, y: 0, z: 0 };
		const tween = fatina.Tween(obj, ['x']).To({ x: 1 }, duration);
		tween.OnStart(() => start++);
		tween.OnComplete(() => complete++);
		tween.Start();
		fatina.Update(1);
	}
	fatina.Update(50);

	t.equal(start, 1024);
	t.equal(complete, 1024);
	t.end();
});

test('[Fatina.Manager] Create ticker', (t: Test) => {
	const obj = { x: 0, y: 0, z: 0 };
	const gameTicker = fatina.Ticker();
	const uiTicker = fatina.Ticker();

	fatina.Tween(obj, ['x']).SetParent(gameTicker).To({x: 5}, 5).Start();
	fatina.Tween(obj, ['y']).SetParent(uiTicker).To({y: 5}, 5).Start();
	fatina.Tween(obj, ['z']).To({z: 5}, 5).Start();

	t.notEqual(undefined, gameTicker, 'check a ticker is properly created');

	fatina.Update(1);
	t.equal(1, obj.x, 'check the game ticker runs');
	t.equal(1, obj.y, 'check the ui ticker runs');
	t.equal(1, obj.z, 'check the main ticker runs');

	fatina.SetTimescale(2);
	gameTicker.SetTimescale(0.5);
	uiTicker.SetTimescale(0.25);

	uiTicker.AddTickListener(() => {});
	uiTicker.RemoveTickListener(() => {});
	uiTicker.RemoveTickListener(undefined as any);

	fatina.Update(1);
	t.equal(2, obj.x, 'check the game ticker runs');
	t.equal(1.5, obj.y, 'check the ui ticker runs');
	t.equal(3, obj.z, 'check the main ticker runs');

	fatina.SetTimescale(1);
	gameTicker.SetTimescale(1);

	gameTicker.Pause();
	uiTicker.Kill();
	fatina.Update(1);
	t.equal(2, obj.x, 'check the game ticker is paused');
	t.equal(1.5, obj.y, 'check the ui ticker is killed');

	gameTicker.Resume();
	fatina.Update(1);
	t.equal(3, obj.x, 'check the game ticker is resumed');

	gameTicker.Kill();
	gameTicker.Kill();
	fatina.Update(1);
	t.throws(() => gameTicker.Skip(), 'cannot skip ticker');
	gameTicker.Reset();

	fatina.Destroy();
	t.end();
});
