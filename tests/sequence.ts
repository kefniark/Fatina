import * as test from 'tape';
import { Sequence } from '../src/fatina/tweens/sequence';
import { Tween } from '../src/fatina/tweens/tween';
import { Ticker } from '../src/fatina/ticker';
import { State } from '../src/fatina/core/enum/state';

test('[Fatina.Sequence] Create a basic Sequence', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let start = 0;
	let stepStart = 0;
	let stepEnd = 0;
	let update = 0;
	let complete = 0;
	let duration = 0;
	let cb = 0;

	let sequence = new Sequence()
		.SetParent(ticker)
		.PrependInterval(1)
		.PrependCallback(() => {})
		.AppendInterval(1)
		.AppendCallback(() => cb++)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 2))
		.AppendCallback(() => cb++)
		.AppendInterval(1)
		.AppendCallback(() => cb++)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 2))
		.AppendCallback(() => cb++)
		.OnStart(() => {
			if (update > 0 || stepStart > 0 || complete > 0) {
				t.fail('OnStart() - event order issue');
			}
			start++;
		})
		.OnStepStart((tween) => {
			if (start === 0 || complete > 0) {
				t.fail('OnStep() - event order issue');
			}
			stepStart++;
		})
		.OnStepStart((tween) => {
			if (start === 0 || complete > 0) {
				t.fail('OnStep() - event order issue');
			}
			stepEnd++;
		})
		.OnUpdate((dt) => {
			update++;
			duration += dt;
		})
		.OnComplete(() => {
			if (start === 0 || stepStart === 0 || stepEnd === 0 || update === 0) {
				t.fail('OnComplete() - event order issue');
			}
			complete++;
		});

	sequence.Start();

	for (let i = 0; i < 10; i++) {
		ticker.Tick(1);
	}

	t.equal(10, sequence.Count);
	t.equal(1, start, 'check OnStart was trigger once');
	t.equal(10, stepStart, 'check OnStepStart was trigger the right amount of time');
	t.equal(10, stepEnd, 'check OnStepEnd was trigger the right amount of time');
	// t.equal(6, duration, 'check OnUpdate was trigger the right amount of time');
	t.equal(1, complete, 'check OnComplete was trigger once');
	t.equal(4, cb, 'check AppendCallback was the right amount of time');

	t.end();
});

test('[Fatina.Sequence] Test Lagging Tick', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let complete = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 5))
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 5))
		.OnComplete(() => complete++);

	sequence.Start();

	ticker.Tick(6);
	ticker.Tick(4);

	t.equal(1, complete, 'check the remains of the first tick was propagated to the second tween');
	t.end();
});

test('[Fatina.Sequence] Test Prepend', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let first = true;
	let complete = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 2).OnComplete(() => {
			if (first) {
				t.fail('append tween should be executed second');
			}
		}))
		.Prepend(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 2).OnComplete(() => {
			if (!first) {
				t.fail('prepend tween should be executed first');
			}
			first = false;
		}))
		.OnComplete(() => complete++);

	sequence.Start();

	ticker.Tick(5);

	t.equal(1, complete, 'check both tween are executed');
	t.end();
});

test('[Fatina.Sequence] Test Join', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let duration = 0;
	let complete = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.Join(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 1.5))
		.Prepend(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 2))
		.Join(new Tween(obj, [ 'alpha' ]).To({ alpha: 0 }, 2).OnStart(() => {
			let current = (sequence as Sequence).currentTween;
			if (current) {
				t.equal(2, current.length, 'check 2 tween are running at the same time');
			}
		}))
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 2))
		.OnUpdate((dt) => duration += dt)
		.OnComplete(() => complete++);

	sequence.Start();

	for (let i = 0; i < 50; i++) {
		ticker.Tick(0.2);
	}

	// t.equal(6, duration, 'check OnUpdate was trigger the right amount of time');
	t.equal(1, complete, 'check both tween are executed');

	sequence.Default();
	t.equal(0, sequence.elapsed, 'check the sequence elapsed after Default');
	t.equal(0, sequence.duration, 'check the sequence duration after Default');

	t.end();
});

test('[Fatina.Sequence] Sequence loop', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let start = 0;
	let step = 0;
	let stepEnd = 0;
	let complete = 0;
	let sequenceCb = 0;
	let restart = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.PrependInterval(1)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 4))
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 4))
		.AppendCallback(() => sequenceCb++)
		.OnRestart(() => {})
		.OnRestart(() => restart += 1)
		.OnStart(() => start += 1)
		.OnStepStart(() => step += 1)
		.OnStepEnd(() => {})
		.OnStepEnd(() => stepEnd += 1)
		.OnComplete(() => complete += 1)
		.SetLoop(3);

	sequence.Start();

	for (let i = 0; i < 100; i++) {
		ticker.Tick(0.5);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(12, step, 'check OnStepStart was emitted 2 x 3 times');
	t.equal(12, stepEnd, 'check OnStepEnd was emitted 2 x 3 times');
	t.equal(3, sequenceCb, 'check that an appended callback is called 3 times');
	t.equal(2, restart, 'check OnRestart was emitted 2 times');
	t.equal(1, complete, 'check OnComplete was emitted once');
	t.end();
});

test('[Fatina.Sequence] Sequence timescale & kill', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();

	let killed = 0;
	let tween = new Tween({}, []).SetParent(ticker).To({}, 4).SetTimescale(0.5);
	let sequence = tween.ToSequence().SetTimescale(0.5).OnKilled(() => killed++);
	sequence.Start();

	for (let i = 0; i < 6; i++) {
		ticker.Tick(1);
	}

	t.equal(3, sequence.elapsed, 'check the time of this sequence is 0.5');
	t.equal(1.5, tween.elapsed, 'check the time of the tween is 0.25');

	sequence.Kill();

	t.ok(sequence.state === State.Killed, 'check the sequence is marked as killed');
	t.ok(tween.state === State.Killed, 'check the tween is marked as killed');
	t.equal(1, killed, 'check the onKilled event is emitted');

	sequence.Kill();
	t.equal(1, killed, 'check the onKilled event is emitted once');
	t.end();
});

test('[Fatina.Sequence] Test Sequence with broken callback', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();

	let obj = { x: 22 };
	let sequence = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, ['x']).SetParent(ticker).To({ x: 44}, 1))
		.OnStepStart((step) => {
			throw new Error('Test Random User Exception');
		})
		.OnStepEnd((step) => {
			throw new Error('Test Random User Exception');
		})
		.Start();

	ticker.Tick(2);
	t.equal(44, obj.x, 'tween finished properly');
	sequence.Skip();
	t.end();
});

test('[Fatina.Sequence] Sequence of Sequence', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();

	let obj = { x: 0, y: 0 };
	let complete = 0;

	let sequence1 = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, [ 'x' ]).To({ x: 11 }, 1))
		.AppendInterval(1)
		.Append(new Tween(obj, [ 'x' ]).To({ x: 22 }, 1));

	let sequence2 = new Sequence()
		.SetParent(ticker)
		.PrependInterval(1)
		.Append(new Tween(obj, [ 'y' ]).To({ y: 11 }, 1))
		.Append(new Tween(obj, [ 'y' ]).To({ y: 22 }, 1));

	new Sequence()
		.SetParent(ticker)
		.Append(sequence1)
		.Join(sequence2)
		.PrependInterval(1)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(2);
	t.deepEqual({ x: 11, y: 0 }, obj, 'check the sequence1.tween1 is executed');

	ticker.Tick(1);
	t.deepEqual({ x: 11, y: 11 }, obj, 'check the sequence2.tween1 is executed');

	ticker.Tick(1);
	t.deepEqual({ x: 22, y: 22 }, obj, 'check the other tweens are executed in parallel');
	t.equal(1, complete, 'check the parent sequence event onComplete is emitted');

	t.end();
});

test('[Fatina.Sequence] Sequence Skip', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();

	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let tweenStart = 0;
	let tweenComplete = 0;
	let sequenceStepStart = 0;
	let sequenceStepComplete = 0;
	let complete = 0;

	let sequence = new Sequence()
		.SetParent(ticker)
		.PrependInterval(1)
		.Append(new Tween(obj, [ 'x', 'y' ])
			.To({ x: 44, y: 44 }, 4)
			.OnStart(() => tweenStart++)
			.OnComplete(() => tweenComplete++)
		)
		.Append(new Tween(obj, [ 'x', 'y' ])
			.To({ x: 0, y: 0 }, 4)
			.OnStart(() => tweenStart++)
			.OnComplete(() => tweenComplete++)
		)
		.OnStepStart(() => sequenceStepStart++)
		.OnStepEnd(() => sequenceStepComplete++)
		.OnComplete(() => complete++)
		.Start();

	ticker.Tick(0.5);

	sequence.Skip();

	// check the sequence is finished & all the events and subtweens are skipped too
	t.equal(2, tweenStart);
	t.equal(2, tweenComplete);
	t.equal(3, sequenceStepStart);
	t.equal(3, sequenceStepComplete);
	t.equal(1, complete);

	t.end();
});

test('[Fatina.Sequence] Sequence Looping relative tween', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();

	let obj = { x: 0, y: 0 };

	new Sequence()
		.SetParent(ticker)
		.AppendInterval(1)
		.Append(
			new Tween(obj, [ 'x', 'y' ])
				.SetRelative(true)
				.To({ x: 1, y: 0 }, 1)
				.SetEasing('outQuad')
		)
		.Append(
			new Tween(obj, [ 'x', 'y' ])
				.SetRelative(true)
				.To({ x: 0, y: 1 }, 1)
				.SetEasing('inOutQuad')
		)
		.Append(
			new Tween(obj, [ 'x', 'y' ])
				.SetRelative(true)
				.To({ x: -1, y: -1 }, 1)
				.SetEasing('inQuad')
		)
		.SetLoop(-1)
		.Start();

	ticker.Tick(4);
	t.deepEqual({ x: 0, y: 0 }, obj, 'Check the object is back at his original position : normal duration');

	ticker.Tick(40);
	t.deepEqual({ x: 0, y: 0 }, obj, 'Check the object is back at his original position : long update duration');

	for (let i = 0; i < 4; i++) {
		ticker.Tick(0.2);
		ticker.Tick(0.2);
		ticker.Tick(0.2);
		ticker.Tick(0.2);
		ticker.Tick(0.2);
	}
	t.deepEqual({ x: 0, y: 0 }, obj, 'Check the object is back at his original position : micro update duration');

	t.end();
});

test('[Fatina.Sequence] Test Sequence with broken callback', function (t: any) {
	let ticker = new Ticker();
	ticker.Start();

	let obj = { x: 22 };
	new Sequence()
		.SetParent(ticker)
		.SetLoop(-1)
		.AppendInterval(1)
		.Append(new Tween(obj, ['x']).SetParent(ticker).To({ x: 44}, 1))
		.Start();

	ticker.Tick(3);
	ticker.Tick(3);

	t.end();
});
