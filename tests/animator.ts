import * as test from 'tape';
import { Test } from 'tape';
import * as animator from '../src/fatina-plugin-animator/index';
import { IPluginAnimator } from '../src/fatina-plugin-animator/index';
import * as fatina from '../src/fatina/index';

fatina.Init(false);
fatina.LoadPlugin(animator.Get());

const animatorPlugin = fatina.plugin as IPluginAnimator;

function GetSprite(id: string): any {
	return { name: id, position: { x: 0, y: 0 }, alpha: 1 };
}

test('[Fatina.Animator] Test Init', (t: Test) => {
	const fatinaObj: any = {
		plugin: {}
	};
	const plugin = animator.Get();

	plugin.Init(fatinaObj);

	t.notEqual((plugin as any).TickerManager, undefined);
	t.notEqual((plugin as any).AnimatorManager, undefined);
	t.throws(() => plugin.Init(fatinaObj), 'Check the plugin cant be init twice');

	t.end();
});

test ('[Fatina.Animator] Register new animations', (t: Test) => {
	// Register animations
	animatorPlugin.AnimatorManager
		.Register('move', (obj: any, params: any) => fatina.Tween(obj, ['x']).To({ x: 2 }, 500))
		.Register('jump', (obj: any, params: any) => {
			return fatina.Sequence()
				.Append(fatina.Tween(obj.position, ['y']).SetRelative(true).To({y: 5}, 200).SetEasing('inQuad'))
				.Append(fatina.Tween(obj.position, ['y']).To({y: 0}, 200).SetEasing('outQuad'));
			})
		.Register('blink', (obj: any, params: any) => {
			return fatina.Tween(obj, ['alpha']).To({alpha: 0}, 100).Yoyo(3).SetEasing('inOutSine');
		}, 'alpha')
		.Register('fade', (obj: any, params: any) => {
			return fatina.Tween(obj, ['alpha']).To({alpha: params}, 250).SetEasing('outQuad');
		}, 'alpha');

	t.equal(animatorPlugin.AnimatorManager.Animations.length, 4, 'check all the animations are registered');
	t.equal(animatorPlugin.AnimatorManager.Labels.length, 1, 'check there is one label registered');

	t.end();
});

test('[Fatina.Animator] Use animation', (t: Test) => {
	let started = 0;
	let updated = 0;
	let killed = 0;
	let completed = 0;

	// overwrite the previous move animation
	animatorPlugin.AnimatorManager.Register('move', (obj: any, params: any) => {
		return fatina.Tween(obj.position, ['x']).SetRelative(true).To({ x: params }, 500)
			.OnStart(() => started++)
			.OnUpdate(() => updated++)
			.OnKilled(() => killed++)
			.OnComplete(() => completed++);
	});

	// Use that on a sprite
	const sprite: any = GetSprite('testAnimation');
	const anim = animatorPlugin.AnimatorManager.AddAnimatorTo(sprite)
		.AddAnimation('moveRight', 'move', { group: 'move' }, 5)
		.AddAnimation('moveLeft', 'move', { group: 'move' }, -5)
		.AddAnimation('blink', 'blink', { finalValue: true})
		.AddAnimation('blinkSkipable', 'blink');

	// Use it
	anim.Play('moveLeft');
	fatina.Update(100);

	sprite.Animator.Play('moveRight');
	fatina.Update(100);

	sprite.Animator.Stop();
	sprite.Animator.Play('moveLeft');

	fatina.Update(100);

	sprite.Animator.Play('moveLeft');

	fatina.Update(100);

	sprite.Animator.Stop();
	sprite.Animator.Play('moveLeft');

	fatina.Update(600);

	t.equal(started, 5, 'check 4 move tween were started');
	t.equal(killed, 0, 'check no tween were killed');
	t.equal(completed, 5, 'check the were all completed');
	t.equal(sprite.position.x, -7, 'check the final position');

	anim.StopAll();
	t.end();
});

test('[Fatina.Animator] Test final values', (t: Test) => {
	const sprite: any = GetSprite('testFinalValues');
	const anim = animatorPlugin.AnimatorManager.AddAnimatorTo(sprite)
		.AddAnimation('blink', 'blink')
		.AddAnimation('fadeIn', 'fade', { finalValue: true}, 1)
		.AddAnimation('fadeOut', 'fade', { finalValue: true}, 0);

	anim.Play('fadeOut');
	fatina.Update(50);
	anim.Play('fadeIn');
	fatina.Update(50);
	anim.Stop();

	t.equal(sprite.alpha, 1);

	anim.Play('blink');
	fatina.Update(50);
	anim.Stop();

	t.equal(sprite.alpha, 0.5);

	t.end();
});

test('[Fatina.Animator] Test Animator label', (t: Test) => {
	const sprite: any = GetSprite('testAnimatorLabel');
	const anim = animatorPlugin.AnimatorManager.AddAnimatorTo(sprite)
		.AddAnimation('moveRight', 'move', { group: 'move' }, 5)
		.AddAnimation('moveLeft', 'move', { group: 'move' }, -5)
		.AddAnimation('fadeIn', 'fade', { finalValue: true, group: 'alpha' }, 1)
		.AddAnimation('fadeOut', 'fade', { finalValue: true, group: 'alpha' }, 0);

	anim.Play('fadeOut');
	anim.Play('moveRight');
	fatina.Update(125);

	t.equal(sprite.alpha, 0.25);
	t.equal(sprite.position.x, 1.25);

	anim.Pause('alpha');
	fatina.Update(125);

	t.equal(sprite.alpha, 0.25);
	t.equal(sprite.position.x, 2.5);

	anim.Resume('alpha');
	fatina.Update(25);
	anim.PauseAll();
	fatina.Update(100);
	anim.ResumeAll();
	fatina.Update(100);

	t.equal(sprite.alpha, 0);
	t.equal(sprite.position.x, 3.75);

	anim.Destroy();

	t.end();
});

test('[Fatina.Animator] Test TickManager label', (t: Test) => {
	const sprite1: any = GetSprite('testLabel');
	const sprite2: any = GetSprite('testLabel');
	const anim1 = animatorPlugin.AnimatorManager.AddAnimatorTo(sprite1)
		.AddAnimation('moveRight', 'move', { group: 'move' }, 5)
		.AddAnimation('moveLeft', 'move', { group: 'move' }, -5)
		.AddAnimation('fadeIn', 'fade', { finalValue: true, group: 'alpha' }, 1)
		.AddAnimation('fadeOut', 'fade', { finalValue: true, group: 'alpha' }, 0);
	const anim2 = animatorPlugin.AnimatorManager.AddAnimatorTo(sprite2)
		.AddAnimation('moveRight', 'move', { group: 'move' }, 5)
		.AddAnimation('moveLeft', 'move', { group: 'move' }, -5)
		.AddAnimation('fadeIn', 'fade', { finalValue: true, group: 'alpha' }, 1)
		.AddAnimation('fadeOut', 'fade', { finalValue: true, group: 'alpha' }, 0);

	anim1.Play('fadeOut');
	anim1.Play('moveLeft');
	anim2.Play('fadeOut');
	anim2.Play('moveRight');

	fatina.Update(50);

	animatorPlugin.TickerManager.PauseAll('alpha');

	fatina.Update(50);

	t.equal(sprite1.alpha, 0.64);
	t.equal(sprite2.alpha, 0.64);
	t.equal(sprite1.position.x, -1);
	t.equal(sprite2.position.x, 1);

	animatorPlugin.TickerManager.ResumeAll('alpha');
	fatina.Update(50);

	t.equal(sprite1.alpha, 0.36);
	t.equal(sprite2.alpha, 0.36);
	t.equal(sprite1.position.x, -1.5);
	t.equal(sprite2.position.x, 1.5);

	animatorPlugin.TickerManager.KillAll('alpha');
	fatina.Update(50);

	t.equal(sprite1.alpha, 0.36);
	t.equal(sprite2.alpha, 0.36);
	t.equal(sprite1.position.x, -2);
	t.equal(sprite2.position.x, 2);

	t.end();
});

test('[Fatina.Animator] Test Double Animation', (t: Test) => {
	let started = 0;
	let updated = 0;
	let killed = 0;
	let completed = 0;

	animatorPlugin.AnimatorManager.Register('move', (obj: any, params: any) => {
		return fatina.Tween(obj.position, ['x']).SetRelative(true).To({ x: params }, 500)
			.OnStart(() => started++)
			.OnUpdate(() => updated++)
			.OnKilled(() => killed++)
			.OnComplete(() => completed++);
	});

	const sprite1: any = GetSprite('testDouble');
	const anim1 = animatorPlugin.AnimatorManager.AddAnimatorTo(sprite1)
		.AddAnimation('moveRight', 'move', { group: 'move' }, 5)
		.AddAnimation('moveLeft', 'move', { group: 'move' }, -5);

	anim1.Play('moveLeft');
	fatina.Update(50);
	anim1.Play('moveLeft');
	fatina.Update(500);
	fatina.Update(1);

	t.equal(started, 2);
	t.equal(killed, 0);
	t.equal(updated, 2);
	t.equal(completed, 2);
	t.equal(sprite1.position.x, -5.5, 'check the final position');

	t.end();
});
