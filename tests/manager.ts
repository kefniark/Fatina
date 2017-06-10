import * as test from 'tape';
let fatina = require('../src/fatina/index');

fatina.Init(false, 2);

test('[Fatina.Manager] Update manually', function (t: any) {
	let previousTime = fatina.time;
	fatina.Update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time was properly updated');
	t.equal(previousTime + 1, fatina.Elapsed(), 'Check the fatina elapsed time was properly updated');

	t.end();
});

test('[Fatina.Manager] Set timescale', function (t: any) {
	let previousTime = fatina.time;
	let previousElapsed = fatina.Elapsed();

	fatina.SetTimescale(0.5);
	fatina.Update(1);

	t.equal(previousTime + 1, fatina.time, 'Check the global time was properly updated without timescale');
	t.equal(previousElapsed + 0.5, fatina.Elapsed(), 'Check the fatina elapsed time was properly updated with the timescale');
	fatina.SetTimescale(1);

	t.end();
});

test('[Fatina.Manager] Pause / Resume', function (t: any) {
	let previousTime = fatina.time;
	let previousElapsed = fatina.Elapsed();

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

test('[Fatina.Manager] Create tween', function (t: any) {
	let obj = { x: 0 };
	let tween = fatina.Tween(obj, ['x']).To({ x: 1 }, 1);
	tween.Start();

	t.equal(0, obj.x, 'check the tween is not starting magically');

	fatina.Update(0.5);
	t.equal(0.5, obj.x, 'check the tween is halfway through');

	fatina.Update(0.5);
	t.equal(1, obj.x, 'check the tween is finished');
	t.equal(1, tween.elapsed, 'check the tween is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create sequence', function (t: any) {
	let obj = { x: 0 };
	let sequence = fatina.Sequence();
	sequence.AppendInterval(1);
	sequence.Append(fatina.Tween(obj, ['x']).To({ x: 1 }, 1));
	sequence.Start();

	t.equal(0, obj.x, 'check the sequence is not starting magically');

	fatina.Update(2);
	t.equal(1, obj.x, 'check the sequence is finished');
	t.equal(2, sequence.elapsed, 'check the sequence is still there with final values');

	t.end();
});

test('[Fatina.Manager] Create ticker', function (t: any) {
	let obj = { x: 0, y: 0, z: 0 };
	let gameTicker = fatina.Ticker('game');
	let uiTicker = fatina.Ticker('ui');

	fatina.Tween(obj, ['x']).SetParent(gameTicker).To({x: 5}, 5).Start();
	fatina.Tween(obj, ['y']).SetParent(uiTicker).To({y: 5}, 5).Start();
	fatina.Tween(obj, ['z']).To({z: 5}, 5).Start();

	t.notEqual(undefined, gameTicker, 'check a ticker is properly created');
	t.equal(gameTicker, fatina.Ticker('game'), 'check the same ticker is returned when the same name is used twice');

	fatina.Update(1);
	t.equal(1, obj.x, 'check the game ticker runs');
	t.equal(1, obj.y, 'check the ui ticker runs');
	t.equal(1, obj.z, 'check the main ticker runs');

	fatina.SetTimescale(2);
	gameTicker.SetTimescale(0.5);
	uiTicker.SetTimescale(0.25);

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
	t.equal(1.5, obj.y, 'check the ui ticker is killed')

	gameTicker.Resume();
	fatina.Update(1);
	t.equal(3, obj.x, 'check the game ticker is resumed');

	fatina.Destroy();

	t.end();
});
