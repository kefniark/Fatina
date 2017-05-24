import * as test from 'tape';
import { Tweener } from '../src/tweens/tweener';
import { TweenManager } from '../src/tweenManager';
import { ITweener } from '../src/core/interfaces/ITweener';

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
	}

	ticker.Tick(11);
	t.equal(finished, 20, 'check all OnComplete event where emitted');

	t.end();
});

test('Ftina -> Test loop', function (t: any) {
	t.end();
});
