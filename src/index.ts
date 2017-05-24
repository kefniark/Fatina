import { Tweener } from './tweens/tweener';
import { Sequence as seq } from './tweens/sequence';
import { ITweener } from './core/interfaces/ITweener';
import { ITweenSequence } from './core/interfaces/ITweenSequence';
import { TweenManager } from './tweenManager';

// window within a browser, global within node
let root: any;
if (typeof(window) !== 'undefined') {
	root = window;
} else if (typeof(global) !== 'undefined') {
	root = global;
} else {
	root = this;
}

// Method to trigger automatic updates
let requestAnimFrame = (function(){
	return root.requestAnimationFrame ||
		root.webkitRequestAnimationFrame ||
		root.mozRequestAnimationFrame ||
		root.oRequestAnimationFrame ||
		root.msRequestAnimationFrame ||
		function(callback: any){
			root.setTimeout(callback, 1000 / 60);
		};
})();

// Update Loop (auto tick)
let manager = new TweenManager();
let time = 0;

function update(timestamp: number) {
	let dt = timestamp - time;
	manager.Tick(dt);
	time = timestamp;
	requestAnimationFrame(update);
}

requestAnimFrame(update);

// Helpers
export function Tween(obj: any, properties: string[]): ITweener {
	return new Tweener(obj, properties).SetParent(manager);
}

export function Sequence(): ITweenSequence {
	return new seq().SetParent(manager);
}
