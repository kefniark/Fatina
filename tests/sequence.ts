import * as test from 'tape';
import { Sequence } from '../src/tweens/sequence';
import { Tween } from '../src/tweens/tween';
import { TweenManager } from '../src/tweenManager';

test('Ftina -> Create a basic Sequence', function (t: any) {
	let ticker = new TweenManager();
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
			// console.log(' > Step Start ', stepStart, tween);
			if (start === 0 || complete > 0) {
				t.fail('OnStep() - event order issue');
			}
			stepStart++;
		})
		.OnStepStart((tween) => {
			// console.log(' > Step End ', stepEnd, tween);
			if (start === 0 || complete > 0) {
				t.fail('OnStep() - event order issue');
			}
			stepEnd++;
		})
		.OnUpdate((dt) => {
			update++;
			duration += dt;
			// console.log('sequence update', update, dt)
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

	t.equal(1, start, 'check OnStart was trigger once');
	t.equal(10, stepStart, 'check OnStepStart was trigger the right amount of time');
	t.equal(10, stepEnd, 'check OnStepEnd was trigger the right amount of time');
	// t.equal(6, duration, 'check OnUpdate was trigger the right amount of time');
	t.equal(1, complete, 'check OnComplete was trigger once');
	t.equal(4, cb, 'check AppendCallback was the right amount of time');

	t.end();
});

test('Ftina -> Test Lagging Tick', function (t: any) {
	let ticker = new TweenManager();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let complete = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 5))
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 5))
		.OnComplete(() => complete++)

	sequence.Start();

	ticker.Tick(6);
	ticker.Tick(4);

	t.equal(1, complete, 'check the remains of the first tick was propagated to the second tween')
	t.end();
});

test('Ftina -> Test Prepend', function (t: any) {
	let ticker = new TweenManager();
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
		.OnComplete(() => complete++)

	sequence.Start();

	ticker.Tick(5);

	t.equal(1, complete, 'check both tween are executed')
	t.end();
});

test('Ftina -> Test Join', function (t: any) {
	let ticker = new TweenManager();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let duration = 0;
	let complete = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 1.5))
		.Prepend(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 2))
		.Join(new Tween(obj, [ 'alpha' ]).To({ alpha: 0 }, 2).OnStart(() => {
			let current = (sequence as Sequence).CurrentTween;
			if (current) {
				t.equal(2, current.length, 'check 2 tween are running at the same time');
			}
		}))
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 2))
		.OnUpdate((dt) => duration += dt)
		.OnComplete(() => complete++)

	sequence.Start();

	for (let i = 0; i < 50; i++) {
		ticker.Tick(0.2);
	}

	// t.equal(6, duration, 'check OnUpdate was trigger the right amount of time');
	t.equal(1, complete, 'check both tween are executed')

	t.end();
});

test('Ftina -> Sequence loop', function (t: any) {
	let ticker = new TweenManager();
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };

	let start = 0;
	let step = 0;
	let complete = 0;
	let sequence = new Sequence()
		.SetParent(ticker)
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 44, y: 44 }, 4))
		.Append(new Tween(obj, [ 'x', 'y' ]).To({ x: 0, y: 0 }, 4))
		.OnStart(() => start += 1)
		.OnStepStart(() => step += 1)
		.OnComplete(() => complete += 1)
		.SetLoop(3);

	sequence.Start();

	for (let i = 0; i < 50; i++) {
		ticker.Tick(1);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(6, step, 'check OnStepStart was emitted 2 x 3 times');
	t.equal(1, complete, 'check OnComplete was emitted once');
	t.end();
});

test('Ftina -> Sequence of Sequence', function (t: any) {
	t.end();
});

test('Ftina -> Sequence timescale', function (t: any) {
	t.end();
});

test('Ftina -> Test Tween Kill', function (t: any) {
	t.end();
});
