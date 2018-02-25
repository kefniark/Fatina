import * as test from 'tape';
import { Test } from 'tape';
import { Log } from '../src/fatina/core/enum/log';
import { State } from '../src/fatina/core/enum/state';
import { ITween } from '../src/fatina/core/interfaces/ITween';
import { Easing } from '../src/fatina/index';
import { Ticker } from '../src/fatina/ticker';
import { Tween } from '../src/fatina/tweens/tween';

test('[Fatina.Tween] Get tween data', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x', 'y' ];
	const dest = { x: 44, y: 44 };

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.To(dest, 10)
		.SetParent(ticker);

	tween.Start();

	t.notOk(tween.state === State.Finished, 'Tween is not completed yet');
	t.equal(0, tween.elapsed, 'Elapsed is correct at the beginning');
	t.equal(10, tween.duration, 'Duration');

	ticker.Tick(1);

	t.equal(1, tween.elapsed, 'Elapsed is correct at the middle');

	for (let i = 0; i < 12; i++) {
		ticker.Tick(1);
	}

	t.ok(tween.state === State.Finished, 'Tween is completed now');
	t.equal(10, tween.elapsed, 'Elapsed match duration at the end');
	t.end();
});

test('[Fatina.Tween] Create a basic tween', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x', 'y' ];
	const dest = { x: 44, y: 44 };

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.To(dest, 10)
		.SetParent(ticker);

	// Test a first update before start
	ticker.Tick(1);
	t.equal(obj.x, 22, 'check the object is not ticked if not started');

	// Start & tick
	tween.Start();
	ticker.Tick(1);
	t.notEqual(obj.x, 22, 'check the object moved');

	// Tick to the end
	ticker.Tick(9);
	t.equal(obj.x, 44, 'check the object reach the end');

	ticker.Tick(1);
	t.equal(obj.name, 'nano', 'check the other properties are not modified');
	t.equal(obj.alpha, 1, 'check the other properties are not modified');

	t.end();
});

test('[Fatina.Tween] Test Tween From property', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x', 'y' ];
	const dest = { x: 44, y: 44 };

	let startx = 0;
	let starty = 0;
	const ticker = new Ticker();
	ticker.Start();
	new Tween(obj, properties)
		.From({x: 1, y: 2})
		.To(dest, 5)
		.SetParent(ticker)
		.OnStart(() => {
			startx = obj.x;
			starty = obj.y;
		})
		.Start();

	ticker.Tick(6);

	t.equal(startx, 1, 'From X property was properly used');
	t.equal(starty, 2, 'From Y property was properly used');
	t.equal(obj.x, dest.x, 'Still reach the normal destination');

	t.end();
});

test('[Fatina.Tween] Test Tween Relative property', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x', 'y' ];
	const dest = { x: 44, y: 44 };

	let startx = 0;
	let starty = 0;

	const ticker = new Ticker();
	ticker.Start();

	new Tween(obj, properties)
		.SetRelative(true)
		.To(dest, 5)
		.SetParent(ticker)
		.OnStart(() => {
			startx = obj.x;
			starty = obj.y;
		})
		.Start();

	ticker.Tick(6);

	t.equal(startx, 22, 'Relative didnt changed the from property');
	t.equal(obj.x, 66, 'Destination X use relative');
	t.equal(obj.y, 2, 'Destination Y use relative');

	t.end();
});

test('[Fatina.Tween] Test Tween with a undefined object', (t: Test) => {
	const obj: any = undefined;
	const properties = [ 'x', 'y' ];
	const dest = { x: 44, y: 44 };

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.To(dest, 5)
		.SetParent(ticker);

	t.throws(() => tween.Start(), 'Check Start explode');
	t.end();
});

test('[Fatina.Tween] Test Tween with a undefined property', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'tuna' ];
	const dest = { tuna: 44 };

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.To(dest, 5)
		.SetParent(ticker);

	t.throws(() => tween.Start(), 'Check Start explode');
	t.end();
});

test('[Fatina.Tween] Test mix of concurrent running and paused tween', (t: Test) => {
	const properties = [ 'x', 'y' ];
	const dest = { x: 44, y: 44 };
	const ticker = new Ticker();
	ticker.Start();

	let started = 0;
	let updated = 0;
	let finished = 0;
	const paused: ITween[] = [];

	for (let i = 0; i < 10; i++) {
		const obj = { name: 'alice' + i, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, alpha: 1 };
		new Tween(obj, properties)
			.To(dest, 10)
			.SetParent(ticker)
			.OnStart(() => started++)
			.OnUpdate((dt, progress) => updated++)
			.OnComplete(() => finished++)
			.Start();

		const obj2 = { name: 'bob' + i, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, alpha: 1 };
		const tween = new Tween(obj2, properties)
			.To(dest, 10)
			.SetParent(ticker)
			.OnStart(() => started++)
			.OnUpdate((dt, progress) => updated++)
			.OnComplete(() => finished++);
		tween.Start();
		tween.Start();
		tween.Pause();
		tween.Pause();
		paused.push(tween);
	}

	let elapsed = 0;
	let iterate = 0;
	for (let i = 0; i < 20; i++) {
		const dt = Math.random() * 0.2 + 0.8;
		elapsed += dt;
		if (iterate === 0 && elapsed >= 10) {
			iterate = i + 1;
		}
		ticker.Tick(dt);
	}

	t.equal(started, 20, 'check all OnStart event where emitted');
	t.equal(updated, 10 * iterate, 'check all OnUpdate event where emitted by running tween');
	t.equal(finished, 10, 'check all OnComplete event where emitted by running tween');

	// Resume pause tween
	for (const pause of paused) {
		pause.Resume();
		pause.Resume();
	}

	ticker.Tick(11);
	t.equal(finished, 20, 'check all OnComplete event where emitted');

	t.end();
});

test('[Fatina.Tween] Test Tween loop', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x' ];

	let start = 0;
	let complete = 0;
	let elapsed = 0;

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.From({ x: 0 })
		.To({ x: 44 }, 5)
		.SetParent(ticker)
		.SetLoop(3)
		.OnStart(() => start += 1)
		.OnUpdate((dt) => elapsed += dt)
		.OnComplete(() => complete += 1);

	tween.Start();

	for (let i = 0; i < 20; i++) {
		ticker.Tick(1);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(1, complete, 'check onComplete was emitted once');
	t.equal(15, elapsed, 'check the tween was looped 3 times');

	t.end();
});

test('[Fatina.Tween] Test Tween infinite loop', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x' ];

	let start = 0;
	let complete = 0;
	let elapsed = 0;

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.From({ x: 0 })
		.To({ x: 44 }, 10)
		.SetParent(ticker)
		.SetLoop(-1)
		.OnStart(() => start += 1)
		.OnUpdate((dt) => elapsed += dt)
		.OnComplete(() => complete += 1);

	tween.Start();

	for (let i = 0; i < 25; i++) {
		ticker.Tick(1);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(0, complete, 'check onComplete was never reached');
	t.equal(25, elapsed, 'check all the onUpdate were emitted');
	t.equal(22, obj.x, 'check the object is at the right position');

	t.end();
});

test('[Fatina.Tween] Test Tween timescale', (t: Test) => {
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	const properties = [ 'x' ];

	let start = 0;
	let complete = 0;
	let elapsed = 0;
	let update = 0;

	const ticker = new Ticker();
	ticker.Start();

	const tween = new Tween(obj, properties)
		.From({ x: 0 })
		.To({ x: 44 }, 5)
		.SetParent(ticker)
		.SetTimescale(0.5)
		.OnStart(() => start += 1)
		.OnUpdate((dt) => {
			update += 1;
			elapsed += dt;
		})
		.OnComplete(() => complete += 1);

	t.ok(tween.IsIdle());
	tween.Start();
	t.notOk(tween.IsIdle());

	for (let i = 0; i < 25; i++) {
		ticker.Tick(1);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(1, complete, 'check onComplete was emitted once');
	t.equal(5, elapsed, 'check elapsed time on this tween is the right one');
	t.equal(10, update, 'check that the speed was half the normal speed');

	t.end();
});

test('[Fatina.Tween] Test Tween without parent', (t: Test) => {
	const tween = new Tween({}, []).To({}, 5);

	t.throws(() => tween.Start(), 'Check Start explode');
	t.end();
});

test('[Fatina.Tween] Test Tween without to', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();
	let complete = false;
	const tween = new Tween({}, []).SetParent(ticker).OnComplete(() => complete = true);

	t.doesNotThrow(() => tween.Start(), 'Check Start does not explode');
	t.notOk(complete, 'Check this tween is not finished yet');
	ticker.Tick(0.000000001);
	t.ok(complete, 'Check this tween immediately finished');
	t.end();
});

test('[Fatina.Tween] Test Tween Easing', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();
	t.doesNotThrow(() => new Tween({}, []).To({}, 5).SetParent(ticker).SetEasing(Easing.OutQuad).Start(), 'easing by type');
	t.doesNotThrow(() => new Tween({}, []).To({}, 5).SetParent(ticker).SetEasing('inOutQuad').Start(), 'easing by name');
	t.throws(() => new Tween({}, []).To({}, 5).SetParent(ticker).SetEasing('tuna').Start(), 'easing which doesnt exist');
	t.end();
});

test('[Fatina.Tween] Test Tween Kill', (t: Test) => {
	let complete = 0;
	let killed = 0;

	const ticker = new Ticker();
	ticker.Start();
	const tween = new Tween({ x: 22 }, [ 'x' ])
		.To({ x: 44 }, 5)
		.SetParent(ticker)
		.OnComplete(() => complete += 1)
		.OnKilled(() => killed += 1);

	tween.Start();
	ticker.Tick(1);
	t.ok(tween.state === State.Run);
	t.notOk(tween.state === State.Killed);
	tween.Kill();

	t.notOk(tween.state === State.Run);
	t.ok(tween.state === State.Killed);
	t.notOk(tween.state === State.Finished);
	tween.Kill();
	(tween as any).Tick(1);

	t.equal(1, killed);
	t.equal(0, complete);

	t.end();
});

test('[Fatina.Tween] Test Tween Kill', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();
	const sequence = new Tween({}, []).To({}, 2).SetParent(ticker).ToSequence().PrependInterval(1).AppendInterval(1);

	let start = 0;
	let update = 0;
	sequence.OnStepStart(() => start++);
	sequence.OnUpdate(() => update++);
	sequence.Start();

	for (let i = 0; i < 10; i++) {
		ticker.Tick(1);
	}

	t.equal(3, start, 'check that the sequence has 3 steps');
	t.equal(4, update, 'check the duration');

	t.throws(() => new Tween({}, []).To({}, 2).ToSequence().Start(), 'check that we cant use toSequence without ticker');

	t.end();
});

test('[Fatina.Tween] Test Tween with broken callback', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = { x: 22 };
	new Tween(obj, [ 'x' ])
		.To({ x: 44 }, 2)
		.SetParent(ticker)
		.OnStart(() => {
			throw new Error('Test Random User Exception');
		})
		.OnUpdate(() => {
			throw new Error('Test Random User Exception');
		})
		.OnComplete(() => {
			throw new Error('Test Random User Exception');
		})
		.Start();

	ticker.Tick(2);
	t.equal(44, obj.x, 'tween finished properly');
	t.end();
});

test('[Fatina.Tween] Test Skip', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	let complete = 0;
	const tween = new Tween({}, [])
		.To({}, 2)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(1);
	t.equal(1, tween.elapsed, 'check this tween is started');

	tween.Skip();
	t.equal(2, tween.elapsed, 'check this tween is over');
	t.equal(1, complete, 'check the onComplete callback is emitted');

	t.end();
});

test('[Fatina.Tween] Test Reverse', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = {x: 0};
	let complete = 0;
	const tween = new Tween(obj, ['x'])
		.To({ x: 10}, 5)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(4);
	t.equal(8, obj.x, 'check the object position');
	t.equal(4, tween.elapsed, 'check this tween is started');

	tween.Reverse();
	t.equal(8, obj.x, 'check the object didnt moved');
	t.equal(1, tween.elapsed, 'check the elapsed value is fine');

	ticker.Tick(4);

	t.equal(0, obj.x, 'check the object went back to the original position');
	t.equal(5, tween.elapsed, 'check the elapsed value is fine');
	t.equal(1, complete, 'check the onComplete callback is emitted');

	tween.Reverse();
	ticker.Tick(5);

	t.equal(10, obj.x, 'check the object went back to the original destination');
	t.equal(5, tween.elapsed, 'check the elapsed value is fine');
	t.equal(2, complete, 'check the onComplete callback is emitted');

	t.end();
});

test('[Fatina.Tween] Test Yoyo', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = {x: 0};
	let complete = 0;
	new Tween(obj, ['x'])
		.To({ x: 10}, 5)
		.Yoyo(2)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(4);
	t.equal(8, obj.x, 'check the object position');

	ticker.Tick(4);
	t.equal(4, obj.x, 'check the object position');

	ticker.Tick(4);
	t.equal(4, obj.x, 'check the object position');
	t.equal(0, complete, 'check the onComplete callback is not emitted yet');

	ticker.Tick(4);
	t.equal(10, obj.x, 'check the object position');
	t.equal(1, complete, 'check the onComplete callback is emitted');

	t.end();
});

test('[Fatina.Tween] Test Yoyo 2', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = {x: 0};
	let complete = 0;
	let tween = new Tween(obj, ['x'])
		.SetRelative(true)
		.To({ x: 10}, 5)
		.Yoyo(1)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(10);
	t.ok(tween.IsFinished());
	t.equal(0, obj.x, 'check the object position');

	tween = new Tween(obj, ['x'])
		.SetRelative(true)
		.To({ x: 10}, 5)
		.Yoyo(1)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(2);
	tween.Skip(true);
	t.ok(tween.IsFinished());
	t.equal(0, obj.x, 'check the object position');

	tween = new Tween(obj, ['x'])
		.SetRelative(true)
		.To({ x: 10}, 5)
		.SetLoop(3)
		.SetLoop(2)
		.Yoyo(2)
		.Yoyo(1)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();
	ticker.Tick(7.5);
	tween.Reset();

	tween = new Tween(obj, ['x'])
		.SetRelative(true)
		.To({ x: 10}, 5)
		.SetLoop(3)
		.SetLoop(2)
		.Yoyo(2)
		.Yoyo(1)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();
	ticker.Tick(2.5);
	tween.Reset();

	t.end();
});

test('[Fatina.Tween] Test Modify', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	let complete = 0;
	const obj = { x: 0, y: 0 };
	const tween = new Tween(obj, ['x', 'y'])
		.To({ x: 1, y: 1 }, 2)
		.SetParent(ticker)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(1);
	t.equal(1, tween.elapsed, 'check this tween is started');
	tween.Modify({ x: 1 }, true);

	ticker.Tick(1);

	t.equal(2, tween.elapsed, 'check this tween is over');
	t.equal(2, obj.x, 'check the final position was updated');
	t.equal(1, complete, 'check the onComplete callback is emitted');

	(tween as any).Complete();
	t.equal(1, complete, 'check the onComplete callback is emitted');

	tween.Modify({ x: 1 }, false);

	t.end();
});

test('[Fatina.Tween] Test Steps', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj1 = { x: 0 };
	const obj2 = { x: 0 };
	const obj3 = { x: 0 };
	const tween1 = new Tween(obj1, ['x']).SetParent(ticker).To({ x: 10 }, 10).SetSteps(5).Start();
	const tween2 = new Tween(obj2, ['x']).SetParent(ticker).To({ x: 10 }, 10).SetSteps(10).Start();
	const tween3 = new Tween(obj3, ['x']).SetParent(ticker).To({ x: 10 }, 10).SetSteps(4).Start();

	ticker.Tick(1);
	t.equal(2, obj1.x);
	t.equal(1, obj2.x);
	t.equal(0, obj3.x);
	ticker.Tick(0.5);
	t.equal(2, obj1.x);
	t.equal(2, obj2.x);
	t.equal(2.5, obj3.x);
	ticker.Tick(1.5);
	t.equal(4, obj1.x);
	t.equal(3, obj2.x);
	t.equal(2.5, obj3.x);

	t.ok(tween1.IsRunning());
	t.ok(tween2.IsRunning());
	t.ok(tween3.IsRunning());

	ticker.Tick(1);
	t.equal(4, obj1.x);
	t.equal(4, obj2.x);
	t.equal(5, obj3.x);
	ticker.Tick(2);
	t.equal(6, obj1.x);
	t.equal(6, obj2.x);
	ticker.Tick(2);
	t.equal(8, obj1.x);

	tween3.Pause();
	ticker.Tick(2);
	t.equal(10, obj1.x);

	t.ok(tween1.IsFinished());
	t.ok(tween2.IsFinished());
	t.notOk(tween3.IsFinished());
	t.notOk(tween1.IsRunning());
	t.notOk(tween2.IsRunning());
	t.ok(tween3.IsPaused());

	t.end();
});

test('[Fatina.Tween] Looping relative tween', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = { x: 0 };

	new Tween(obj, [ 'x' ])
		.SetParent(ticker)
		.SetRelative(true)
		.To({ x: 1 }, 1)
		.SetEasing('inOutQuad')
		.SetLoop(-1)
		.Start();

	ticker.Tick(1);
	t.equal(1, obj.x, 'Check the object moved');

	ticker.Tick(40);
	t.equal(41, obj.x, 'Check the object moved 40 times');

	for (let i = 0; i < 4; i++) {
		ticker.Tick(0.2);
		ticker.Tick(0.2);
		ticker.Tick(0.2);
		ticker.Tick(0.2);
		ticker.Tick(0.2);
	}
	t.equal(45, obj.x, 'Check the object reached his destination');

	t.end();
});

test('[Fatina.Tween] Safe & Debug', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = { x: 0 };

	new Tween(obj, [ 'x' ])
		.SetParent(ticker)
		.To({ x: 1 }, 10)
		.SetEasing('inOutQuad')
		.SetSettings({logLevel: Log.Debug, safe: false})
		.OnComplete(() => {})
		.Start();

	ticker.Tick(10);

	t.end();
});

test('[Fatina.Tween] Tween destroyed object/properties', (t: Test) => {
	const ticker = new Ticker();
	ticker.Start();

	const obj = { x: 0, sub: { x: 0 } };

	const tween = new Tween(obj, [ 'x' ])
		.SetParent(ticker)
		.To({ x: 5 }, 5)
		.Start();
	const tween2 = new Tween(obj.sub, [ 'x' ])
		.SetParent(ticker)
		.To({ x: 5 }, 5)
		.Start();

	ticker.Tick(1);
	t.equal(1, obj.x, 'Check the object moved');

	delete obj.x;
	delete obj.sub;

	ticker.Tick(1);

	t.equal(2, obj.x, 'Check the object moved');

	obj.x = 'test' as any;
	ticker.Tick(1);
	t.equal(3, obj.x, 'Check the object moved');

	tween.Init(undefined, []);
	t.equal(3, obj.x, 'Check the object moved');

	tween.Reset();

	t.end();
});
