import * as test from 'tape';
import { Tweener } from '../src/tweens/tweener';
import { TweenManager } from '../src/tweenManager';
import { ITweener } from '../src/core/interfaces/ITweener';

test('Ftina -> Get tween data', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x', 'y' ];
	let dest = { x: 44, y: 44 };

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
		.To(dest, 10)
		.SetParent(ticker);

	tween.Start();

	t.notOk(tween.IsCompleted(), 'Tween is not completed yet');
	t.equal(0, tween.Elapsed, 'Elapsed is correct at the beginning');
	t.equal(10, tween.Duration, 'Duration');

	ticker.Tick(1);

	t.equal(1, tween.Elapsed, 'Elapsed is correct at the middle');

	for (let i = 0; i < 12; i++) {
		ticker.Tick(1);
	}

	t.ok(tween.IsCompleted(), 'Tween is completed now');
	t.equal(10, tween.Elapsed, 'Elapsed match duration at the end');
	t.end();
});

test('Ftina -> Create a basic tween', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x', 'y' ];
	let dest = { x: 44, y: 44 };

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
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

test('Ftina -> Test Tweener From property', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x', 'y' ];
	let dest = { x: 44, y: 44 };

	let startx = 0;
	let starty = 0;
	let ticker = new TweenManager();
	new Tweener(obj, properties)
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

test('Ftina -> Test Tweener Relative property', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x', 'y' ];
	let dest = { x: 44, y: 44 };

	let startx = 0;
	let starty = 0;
	let ticker = new TweenManager();
	new Tweener(obj, properties)
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

test('Ftina -> Test Tweener with a undefined object', function (t: any) {
	let obj: any = undefined;
	let properties = [ 'x', 'y' ];
	let dest = { x: 44, y: 44 };

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
		.To(dest, 5)
		.SetParent(ticker);

	t.throws(() => tween.Start(), 'Check Start explode');
	t.end();
});

test('Ftina -> Test Tweener with a undefined property', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'tuna' ];
	let dest = { tuna: 44 };

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
		.To(dest, 5)
		.SetParent(ticker);

	t.throws(() => tween.Start(), 'Check Start explode');
	t.end();
});

test('Ftina -> Test mix of concurrent running and paused tween', function (t: any) {
	let properties = [ 'x', 'y' ];
	let dest = { x: 44, y: 44 };
	let ticker = new TweenManager();

	let started = 0;
	let updated = 0;
	let finished = 0;
	let paused: ITweener[] = [];

	for (let i = 0; i < 10; i++) {
		let obj = { name: 'alice' + i, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, alpha: 1 };
		new Tweener(obj, properties)
			.To(dest, 10)
			.SetParent(ticker)
			.OnStart(() => started++)
			.OnUpdate((dt, progress) => updated++)
			.OnComplete(() => finished++)
			.Start();

		let obj2 = { name: 'bob' + i, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, alpha: 1 };
		let tween = new Tweener(obj2, properties)
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
		let dt = Math.random() * 0.2 + 0.8;
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
	for (let pause of paused) {
		pause.Resume();
		pause.Resume();
	}

	ticker.Tick(11);
	t.equal(finished, 20, 'check all OnComplete event where emitted');

	t.end();
});

test('Ftina -> Test Tweener loop', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x' ];

	let start = 0;
	let complete = 0;
	let elapsed = 0;

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
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

test('Ftina -> Test Tweener infinite loop', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x' ];

	let start = 0;
	let complete = 0;
	let elapsed = 0;

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
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

test('Ftina -> Test Tweener timescale', function (t: any) {
	let obj = { name: 'nano', x: 22, y: -42, alpha: 1 };
	let properties = [ 'x' ];

	let start = 0;
	let complete = 0;
	let elapsed = 0;
	let update = 0;

	let ticker = new TweenManager();
	let tween = new Tweener(obj, properties)
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

	tween.Start();

	for (let i = 0; i < 25; i++) {
		ticker.Tick(1);
	}

	t.equal(1, start, 'check onStart was emitted once');
	t.equal(1, complete, 'check onComplete was emitted once');
	t.equal(5, elapsed, 'check elapsed time on this tween is the right one');
	t.equal(10, update, 'check that the speed was half the normal speed');

	t.end();
});

test('Ftina -> Test Tweener without parent', function (t: any) {
	let tween = new Tweener({}, []).To({}, 5);

	t.throws(() => tween.Start(), 'Check Start explode');
	t.end();
});

test('Ftina -> Test Tweener without to', function (t: any) {
	let ticker = new TweenManager();
	let complete = false;
	let tween = new Tweener({}, []).SetParent(ticker).OnComplete(() => complete = true);

	t.doesNotThrow(() => tween.Start(), 'Check Start does not explode');
	t.notOk(complete, 'Check this tween is not finished yet');
	ticker.Tick(0.000000001);
	t.ok(complete, 'Check this tween immediately finished');
	t.end();
});

test('Ftina -> Test Tweener Easing', function (t: any) {
	let ticker = new TweenManager();
	t.doesNotThrow(() => new Tweener({}, []).To({}, 5).SetParent(ticker).SetEasing(2).Start(), 'easing by type');
	t.doesNotThrow(() => new Tweener({}, []).To({}, 5).SetParent(ticker).SetEasing('inOutQuad').Start(), 'easing by name');
	t.throws(() => new Tweener({}, []).To({}, 5).SetParent(ticker).SetEasing('tuna').Start(), 'easing which doesnt exist');
	t.end();
});

test('Ftina -> Test Tweener Kill', function (t: any) {
	let complete = 0;
	let killed = 0;

	let ticker = new TweenManager();
	let tween = new Tweener({ x: 22 }, [ 'x' ])
		.To({ x: 44 }, 5)
		.SetParent(ticker)
		.OnComplete(() => complete += 1)
		.OnKilled(() => killed += 1);

	tween.Start();
	ticker.Tick(1);
	t.ok(tween.IsRunning());
	t.notOk(tween.IsKilled());
	tween.Kill();

	t.notOk(tween.IsRunning());
	t.ok(tween.IsKilled());
	t.notOk(tween.IsCompleted());
	tween.Kill();

	t.equal(1, killed)
	t.equal(0, complete)

	t.end();
});
