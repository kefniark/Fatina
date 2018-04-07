import * as test from 'tape';
import { Test } from 'tape';
import { Log } from '../src/core/enum/log';
import { State } from '../src/core/enum/state';
import { Ticker } from '../src/ticker';
import { Sequence } from '../src/tweens/sequence';
import { Tween } from '../src/tweens/tween';

test('[Fatina.Sequence] Create a basic Sequence', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let start = 0;
	let stepStart = 0;
	let stepEnd = 0;
	let update = 0;
	let complete = 0;
	let cb = 0;

	const sequence = new Sequence()
		.setParent(ticker)
		.prependInterval(1)
		.prependCallback(() => {})
		.appendInterval(1)
		.appendCallback(() => cb++)
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 2))
		.appendCallback(() => cb++)
		.appendInterval(1)
		.appendCallback(() => cb++)
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 0, y: 0 }, 2))
		.appendCallback(() => cb++)
		.onStart(() => {
			if (update > 0 || stepStart > 0 || complete > 0) {
				t.fail('OnStart() - event order issue');
			}
			start++;
		})
		.onStepStart(() => {
			if (start === 0 || complete > 0) {
				t.fail('OnStep() - event order issue');
			}
			stepStart++;
		})
		.onStepStart(() => {
			if (start === 0 || complete > 0) {
				t.fail('OnStep() - event order issue');
			}
			stepEnd++;
		})
		.onUpdate(() => {
			update++;
		})
		.onComplete(() => {
			if (start === 0 || stepStart === 0 || stepEnd === 0 || update === 0) {
				t.fail('OnComplete() - event order issue');
			}
			complete++;
		});

	sequence.start();

	for (let i = 0; i < 10; i++) {
		ticker.tick(1);
	}

	t.equal(10, sequence.count);
	t.equal(1, start, 'check OnStart was trigger once');
	t.equal(10, stepStart, 'check OnStepStart was trigger the right amount of time');
	t.equal(10, stepEnd, 'check OnStepEnd was trigger the right amount of time');
	// t.equal(6, duration, 'check OnUpdate was trigger the right amount of time');
	t.equal(1, complete, 'check OnComplete was trigger once');
	t.equal(4, cb, 'check AppendCallback was the right amount of time');

	t.end();
});

test('[Fatina.Sequence] Test Lagging Tick', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let complete = 0;
	const sequence = new Sequence()
		.setParent(ticker)
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 5))
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 0, y: 0 }, 5))
		.onComplete(() => complete++);

	sequence.start();

	ticker.tick(6);
	ticker.tick(4);

	t.equal(1, complete, 'check the remains of the first tick was propagated to the second tween');
	t.end();
});

test('[Fatina.Sequence] Test Constructor', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let complete = 0;
	const sequence = new Sequence([
		new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 5),
		new Tween(obj, [ 'x', 'y' ]).to({ x: 0, y: 0 }, 5)
	]).setParent(ticker).onComplete(() => complete++);

	sequence.start();

	ticker.tick(6);
	ticker.tick(4);

	t.equal(1, complete, 'check the remains of the first tick was propagated to the second tween');
	t.end();
});

test('[Fatina.Sequence] Test Prepend', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let first = true;
	let complete = 0;
	const sequence = new Sequence()
		.setParent(ticker)
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 2).onComplete(() => {
			if (first) {
				t.fail('append tween should be executed second');
			}
		}))
		.prepend(new Tween(obj, [ 'x', 'y' ]).to({ x: 0, y: 0 }, 2).onComplete(() => {
			if (!first) {
				t.fail('prepend tween should be executed first');
			}
			first = false;
		}))
		.onComplete(() => complete++);

	sequence.start();

	ticker.tick(5);

	t.equal(1, complete, 'check both tween are executed');
	t.end();
});

test('[Fatina.Sequence] Test Join', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let duration = 0;
	let complete = 0;
	const sequence = new Sequence()
		.setParent(ticker)
		.join(new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 1.5))
		.prepend(new Tween(obj, [ 'x', 'y' ]).to({ x: 0, y: 0 }, 2))
		.join(new Tween(obj, [ 'alpha' ]).to({ alpha: 0 }, 2).onStart(() => {
			const current = (sequence as Sequence).ct;
			if (current) {
				t.equal(2, current.length, 'check 2 tween are running at the same time');
			}
		}))
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 2))
		.onUpdate((dt) => duration += dt)
		.onComplete(() => complete++);

	sequence.start();

	for (let i = 0; i < 50; i++) {
		ticker.tick(0.2);
	}

	t.equal(1, complete, 'check both tween are executed');

	t.end();
});

test('[Fatina.Sequence] Sequence loop', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();
	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let start = 0;
	let step = 0;
	let stepEnd = 0;
	let complete = 0;
	let sequenceCb = 0;
	let restart = 0;
	const sequence = new Sequence()
		.setParent(ticker)
		.prependInterval(1)
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 44, y: 44 }, 4))
		.append(new Tween(obj, [ 'x', 'y' ]).to({ x: 0, y: 0 }, 4))
		.appendCallback(() => sequenceCb++)
		.onRestart(() => {})
		.onRestart(() => restart += 1)
		.onStart(() => start += 1)
		.onStepStart(() => step += 1)
		.onStepEnd(() => {})
		.onStepEnd(() => stepEnd += 1)
		.onComplete(() => complete += 1)
		.setLoop(3);

	sequence.start();

	for (let i = 0; i < 100; i++) {
		ticker.tick(0.5);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(12, step, 'check OnStepStart was emitted 2 x 3 times');
	t.equal(12, stepEnd, 'check OnStepEnd was emitted 2 x 3 times');
	t.equal(3, sequenceCb, 'check that an appended callback is called 3 times');
	t.equal(2, restart, 'check OnRestart was emitted 2 times');
	t.equal(1, complete, 'check OnComplete was emitted once');
	t.end();
});

test('[Fatina.Sequence] Sequence timescale & kill', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	let killed = 0;
	const tween = new Tween({}, []).setParent(ticker).to({}, 4).setTimescale(0.5);
	const sequence = tween.toSequence().setTimescale(0.5).onKilled(() => killed++);
	sequence.start();

	for (let i = 0; i < 6; i++) {
		ticker.tick(1);
	}

	t.equal(3, sequence.elapsed, 'check the time of this sequence is 0.5');
	t.equal(1.5, tween.elapsed, 'check the time of the tween is 0.25');

	sequence.kill();

	t.ok(sequence.state === State.Killed, 'check the sequence is marked as killed');
	t.ok(tween.state === State.Killed, 'check the tween is marked as killed');
	t.equal(1, killed, 'check the onKilled event is emitted');

	sequence.kill();
	(sequence as any).tick(1);

	t.equal(1, killed, 'check the onKilled event is emitted once');
	t.end();
});

test('[Fatina.Sequence] Test Sequence with broken callback', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	const obj = { x: 22 };
	const sequence = new Sequence()
		.setParent(ticker)
		.append(new Tween(obj, ['x']).setParent(ticker).to({ x: 44 }, 1))
		.onStepStart(() => {
			throw new Error('Test Random User Exception');
		})
		.onStepEnd(() => {
			throw new Error('Test Random User Exception');
		})
		.start();

	ticker.tick(2);
	t.equal(44, obj.x, 'tween finished properly');
	sequence.skip();
	t.end();
});

test('[Fatina.Sequence] Sequence of Sequence', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	const obj = { x: 0, y: 0 };
	let complete = 0;

	const sequence1 = new Sequence()
		.setParent(ticker)
		.append(new Tween(obj, [ 'x' ]).to({ x: 11 }, 1))
		.appendInterval(1)
		.append(new Tween(obj, [ 'x' ]).to({ x: 22 }, 1));

	const sequence2 = new Sequence()
		.setParent(ticker)
		.prependInterval(1)
		.append(new Tween(obj, [ 'y' ]).to({ y: 11 }, 1))
		.append(new Tween(obj, [ 'y' ]).to({ y: 22 }, 1));

	new Sequence()
		.setParent(ticker)
		.append(sequence1)
		.join(sequence2)
		.prependInterval(1)
		.onComplete(() => complete++)
		.start();

	ticker.tick(2);
	t.deepEqual({ x: 11, y: 0 }, obj, 'check the sequence1.tween1 is executed');

	ticker.tick(1);
	t.deepEqual({ x: 11, y: 11 }, obj, 'check the sequence2.tween1 is executed');

	ticker.tick(1);
	t.deepEqual({ x: 22, y: 22 }, obj, 'check the other tweens are executed in parallel');
	t.equal(1, complete, 'check the parent sequence event onComplete is emitted');

	t.end();
});

test('[Fatina.Sequence] Sequence Skip', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	const obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let tweenStart = 0;
	let tweenComplete = 0;
	let sequenceStepStart = 0;
	let sequenceStepComplete = 0;
	let complete = 0;

	const sequence = new Sequence()
		.setParent(ticker)
		.prependInterval(1)
		.append(new Tween(obj, [ 'x', 'y' ])
			.to({ x: 44, y: 44 }, 4)
			.onStart(() => tweenStart++)
			.onComplete(() => tweenComplete++)
		)
		.append(new Tween(obj, [ 'x', 'y' ])
			.to({ x: 0, y: 0 }, 4)
			.onStart(() => tweenStart++)
			.onComplete(() => tweenComplete++)
		)
		.onStepStart(() => sequenceStepStart++)
		.onStepEnd(() => sequenceStepComplete++)
		.onComplete(() => complete++)
		.start();

	ticker.tick(0.5);

	sequence.skip();

	// check the sequence is finished & all the events and subtweens are skipped too
	t.equal(2, tweenStart);
	t.equal(2, tweenComplete);
	t.equal(3, sequenceStepStart);
	t.equal(3, sequenceStepComplete);
	t.equal(1, complete);

	t.end();
});

test('[Fatina.Sequence] Sequence Looping relative tween', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	const obj = { x: 0, y: 0 };

	new Sequence()
		.setParent(ticker)
		.appendInterval(1)
		.append(
			new Tween(obj, [ 'x', 'y' ])
				.setRelative(true)
				.to({ x: 1, y: 0 }, 1)
				.setEasing('outQuad')
		)
		.append(
			new Tween(obj, [ 'x', 'y' ])
				.setRelative(true)
				.to({ x: 0, y: 1 }, 1)
				.setEasing('inOutQuad')
		)
		.append(
			new Tween(obj, [ 'x', 'y' ])
				.setRelative(true)
				.to({ x: -1, y: -1 }, 1)
				.setEasing('inQuad')
		)
		.setLoop(-1)
		.start();

	ticker.tick(4);
	t.deepEqual({ x: 0, y: 0 }, obj, 'Check the object is back at his original position : normal duration');

	ticker.tick(40);
	t.deepEqual({ x: 0, y: 0 }, obj, 'Check the object is back at his original position : long update duration');

	for (let i = 0; i < 4; i++) {
		ticker.tick(0.2);
		ticker.tick(0.2);
		ticker.tick(0.2);
		ticker.tick(0.2);
		ticker.tick(0.2);
	}
	t.deepEqual({ x: 0, y: 0 }, obj, 'Check the object is back at his original position : micro update duration');

	t.end();
});

test('[Fatina.Sequence] Test Sequence with broken callback', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	const obj = { x: 22 };
	new Sequence()
		.setParent(ticker)
		.setLoop(-1)
		.appendInterval(1)
		.append(new Tween(obj, ['x']).setParent(ticker).to({ x: 44 }, 1))
		.start();

	ticker.tick(3);
	ticker.tick(3);

	t.end();
});

test('[Fatina.Sequence] Test Reuse complexe sequence', (t: Test) => {
	const ticker = new Ticker();
	ticker.start();

	let start = 0;
	let complete = 0;
	let callback = 0;
	let callback2 = 0;
	const obj = { x: 22 };
	const sequence = new Tween(obj, ['x'])
		.setParent(ticker)
		.setRelative(true)
		.setEasing('outSine')
		.yoyo(1)
		.to({ x: 44 }, 5)
		.toSequence()
		.appendInterval(5)
		.join(
			new Sequence()
				.setParent(ticker)
				.appendInterval(5)
				.appendCallback(() => callback2++)
		)
		.appendCallback(() => callback++)
		.setSettings({ logLevel: Log.Debug, safe: false })
		.onStart(() => start++)
		.onComplete(() => complete++)
		.start();

	ticker.tick(16);

	t.equal(callback, 1);
	t.equal(callback2, 1);

	(sequence as any).recycle();
	sequence.start();
	ticker.tick(16);

	t.equal(callback, 2);
	t.equal(callback2, 2);

	ticker.tick(10);
	(sequence as any).skip(true);

	t.end();
});
