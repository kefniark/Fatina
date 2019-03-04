(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fatina", [], factory);
	else if(typeof exports === 'object')
		exports["Fatina"] = factory();
	else
		root["Fatina"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/easing/easing.ts":
/*!******************************!*\
  !*** ./src/easing/easing.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * List of easing method
 *
 * Mostly based on http://easings.net/
 */
// tslint:disable:no-parameter-reassignment
const PI = Math.PI;
const PI_OVER_TWO = Math.PI / 2;
const BACK = 1.70158;
const e = {};
// Linear
e.linear = (t) => {
    return t;
};
// Quad
e.inQuad = (t) => {
    return t * t;
};
e.outQuad = (t) => {
    return 2 * t - t * t;
};
e.inOutQuad = (t) => {
    if (t < 0.5) {
        return 2 * t * t;
    }
    else {
        return 2 * (2 * t - t * t) - 1;
    }
};
// Cubic
e.inCubic = (t) => {
    return t * t * t;
};
e.outCubic = (t) => {
    return 3 * t - 3 * t * t + t * t * t;
};
e.inOutCubic = (t) => {
    if (t < 0.5) {
        return 4 * t * t * t;
    }
    else {
        return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
    }
};
// Quart
e.inQuart = (t) => {
    return t * t * t * t;
};
e.outQuart = (t) => {
    const t2 = t * t;
    return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
};
e.inOutQuart = (t) => {
    if (t < 0.5) {
        return 8 * t * t * t * t;
    }
    else {
        const t2 = t * t;
        return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
    }
};
// Sine
e.inSine = (t) => {
    if (t === 1) {
        return 1;
    }
    return 1 - Math.cos(PI_OVER_TWO * t);
};
e.outSine = (t) => {
    return Math.sin(PI_OVER_TWO * t);
};
e.inOutSine = (t) => {
    if (t < 0.5) {
        return (1 - Math.cos(PI * t)) / 2;
    }
    else {
        return (1 + Math.sin(PI * (t - 0.5))) / 2;
    }
};
// Circular
e.inCirc = (t) => {
    return 1 - Math.sqrt(1 - Math.pow(t, 2));
};
e.outCirc = (t) => {
    return Math.sqrt(1 - Math.pow(1 - t, 2));
};
e.inOutCirc = (t) => {
    if (t < 0.5) {
        return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
    }
    else {
        return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
    }
};
// Quint
e.inQuint = (t) => {
    return t * t * t * t * t;
};
e.outQuint = (t) => {
    return --t * t * t * t * t + 1;
};
e.InOutQuint = (t) => {
    t *= 2;
    if (t < 1) {
        return 0.5 * t * t * t * t * t;
    }
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
};
// Exponential
e.inExponential = (t) => {
    if (t === 1) {
        return 1;
    }
    return t === 0 ? 0 : Math.pow(1024, t - 1);
};
e.outExponential = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};
e.inOutExponential = (t) => {
    if (t === 0) {
        return 0;
    }
    if (t === 1) {
        return 1;
    }
    t *= 2;
    if (t < 1) {
        return 0.5 * Math.pow(1024, t - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
};
// Elastic
e.inElastic = (t) => {
    if (t === 0) {
        return 0;
    }
    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
};
e.outElastic = (t) => {
    if (t === 1) {
        return 1;
    }
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
};
e.inOutElastic = (t) => {
    if (t === 0) {
        return 0;
    }
    if (t === 1) {
        return 1;
    }
    t *= 2;
    if (t < 1) {
        return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
};
// Back
e.inBack = (t) => {
    const s = BACK;
    return t === 1 ? 1 : t * t * ((s + 1) * t - s);
};
e.outBack = (t) => {
    const s = BACK;
    return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1;
};
e.inOutBack = (t) => {
    const s = BACK * 1.525;
    t *= 2;
    if (t < 1) {
        return 0.5 * (t * t * ((s + 1) * t - s));
    }
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
};
// Bounce
e.outBounce = (t) => {
    if (t < (1 / 2.75)) {
        return 7.5625 * t * t;
    }
    else if (t < (2 / 2.75)) {
        return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
    }
    else if (t < (2.5 / 2.75)) {
        return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
    }
    else {
        return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
    }
};
e.inBounce = (t) => {
    return 1 - e.outBounce(1 - t);
};
e.inOutBounce = (t) => {
    if (t < 0.5) {
        return e.inBounce(t * 2) * 0.5;
    }
    return e.outBounce(t * 2 - 1) * 0.5 + 0.5;
};
exports.easeNames = e;


/***/ }),

/***/ "./src/fatina.ts":
/*!***********************!*\
  !*** ./src/fatina.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ticker_1 = __webpack_require__(/*! ./ticker */ "./src/ticker.ts");
const delay_1 = __webpack_require__(/*! ./tweens/delay */ "./src/tweens/delay.ts");
const sequence_1 = __webpack_require__(/*! ./tweens/sequence */ "./src/tweens/sequence.ts");
const tween_1 = __webpack_require__(/*! ./tweens/tween */ "./src/tweens/tween.ts");
/**
 * This part manage the auto-update loop if necessary (browser only)
 */
let lastFrame;
let requestFrame;
let cancelFrame;
if (typeof (window) !== 'undefined') {
    requestFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    cancelFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
}
/**
 * Main class exposed as fatina library
 *
 * @export
 * @class Fatina
 */
class Fatina {
    constructor() {
        // plugins
        this.plugin = {};
        this.loadedPlugins = [];
        this.eventCreated = [];
        // settings
        this.settings = {
            logLevel: 0 /* None */,
            safe: true,
            smooth: false,
            maxFrameDt: 50,
            maxFrameNumber: 40,
            maxDt: 500 // 500ms of animation
        };
        // properties
        this.time = 0;
        this.dt = 0;
        this.lastTime = 0;
        this.initialized = false;
    }
    get elapsed() {
        return this.manager.elapsed;
    }
    get mainTicker() {
        if (!this.initialized) {
            this.init();
        }
        return this.manager;
    }
    /**
     * Method used when Fatina is used for the first time.
     * Can take few ms. (pool initialization & object creation)
     *
     * @export
     * @param {boolean} [disableAutoTick]
     * @returns {boolean}
     */
    init(disableAutoTick) {
        if (this.initialized) {
            return false;
        }
        if (!this.manager) {
            this.manager = new ticker_1.Ticker();
            this.manager.start();
        }
        if (typeof (window) !== 'undefined' && !disableAutoTick) {
            lastFrame = requestFrame(this.updateLoop.bind(this));
        }
        this.initialized = true;
        return true;
    }
    /**
     * Used to change the timescale of the whole game
     *
     * @export
     * @param {number} scale
     */
    setTimescale(scale) {
        this.init();
        this.manager.setTimescale(scale);
    }
    /**
     * This method pause the update loop (update are not called anymore)
     *
     * @export
     */
    pause() {
        this.init();
        this.manager.pause();
    }
    /**
     * This method resume the update loop (works only if the game was paused before)
     *
     * @export
     */
    resume() {
        this.init();
        this.manager.resume();
    }
    /**
     * This method kill the main ticker, the pool of tween and stop any requestAnimationFrame
     *
     * @export
     */
    destroy() {
        if (this.manager) {
            this.manager.kill();
        }
        if (lastFrame) {
            cancelFrame(lastFrame);
        }
        this.initialized = false;
    }
    /**
     * Method used to tick all the child (tween or sequence)
     * This takes cares of recycling the old tween/sequence
     *
     * @export
     * @param {number} timestamp
     * @returns {*}
     */
    update(timestamp) {
        if (!this.initialized || !this.manager) {
            return;
        }
        this.manager.tick(timestamp);
        this.time += timestamp;
    }
    /**
     * Helper to create a tween (use the tween pool)
     *
     * @export
     * @param {*} obj
     * @returns {ITween}
     */
    tween(obj) {
        const t = new tween_1.Tween(obj);
        this.addContext(t);
        return t;
    }
    /**
     * Helper to create a Sequence (use the sequence pool)
     *
     * @export
     * @param {(Tween[] | Sequence[])} [list]
     * @returns {ISequence}
     */
    sequence(list) {
        const s = new sequence_1.Sequence(list);
        this.addContext(s);
        return s;
    }
    /**
     * Helper to create a Delay
     *
     * @export
     * @param {number} duration
     * @returns {IPlayable}
     */
    delay(duration) {
        const d = new delay_1.Delay(duration);
        this.addContext(d);
        return d;
    }
    /**
     * Helper used to replace usage of normal js setTimeout() by a tween
     * https://www.w3schools.com/jsref/met_win_settimeout.asp
     *
     * @export
     * @param {() => void} fn
     * @param {number} duration
     * @returns {IPlayable}
     */
    setTimeout(fn, duration) {
        const timeout = new delay_1.Delay(duration).onComplete(fn);
        this.addContext(timeout);
        return timeout.start();
    }
    /**
     * Helper used to replace usage of normal js setInterval() by a tween
     * https://www.w3schools.com/jsref/met_win_setinterval.asp
     *
     * @export
     * @param {() => void} fn
     * @param {number} duration
     * @returns {IPlayable}
     */
    setInterval(fn, duration) {
        const interval = new delay_1.Delay(duration).onRestart(fn).setLoop(-1);
        this.addContext(interval);
        return interval.start();
    }
    /**
     * Private method to set common data to every object (the parent ticker, safe mode, verbose mode)
     *
     * @param {(IPlayable | ITween | ISequence)} obj
     */
    addContext(obj) {
        if (!this.initialized) {
            this.init();
        }
        obj.setParent(this.manager);
        if (this.settings.logLevel !== 0 /* None */ || !this.settings.safe) {
            obj.setSettings(this.settings);
        }
        this.emitCreated(obj);
    }
    /**
     * Create or Get a ticker with a defined name
     * This ticker is a child of the main ticker
     *
     * @export
     * @param {string} name
     * @returns {ITicker}
     */
    ticker() {
        if (!this.initialized) {
            this.init();
        }
        const tick = new ticker_1.Ticker();
        const handler = tick.tick.bind(tick);
        tick.setParent(this.manager, handler);
        this.manager.addTick(handler);
        tick.start();
        this.emitCreated(tick);
        return tick;
    }
    updateLoop(timestamp) {
        this.dt += timestamp - this.lastTime;
        if (this.dt > this.settings.maxDt) {
            console.warn(`dt too high ${Math.round(this.dt)}ms. , Capped to ${this.settings.maxDt}ms.`);
            this.dt = this.settings.maxDt;
        }
        if (!this.settings.smooth) {
            // use directly the delta time
            this.update(this.dt);
            this.dt = 0;
        }
        else {
            // split high dt in multiple smaller .update()
            let frame = 0;
            while (this.dt > 0 && frame < this.settings.maxFrameNumber) {
                const currentDt = Math.min(this.dt, this.settings.maxFrameDt);
                this.update(currentDt);
                this.dt -= currentDt;
                frame++;
            }
        }
        this.lastTime = timestamp;
        lastFrame = requestFrame(this.updateLoop.bind(this));
    }
    /**
     * Initialize a plugin by passing fatina object to it
     *
     * @export
     * @param {IPlugin} newPlugin
     */
    loadPlugin(newPlugin) {
        newPlugin.init(this);
        this.loadedPlugins.push(newPlugin);
        this.info(2 /* Debug */, 'Plugin Loaded', newPlugin.name);
    }
    info(level, message, data) {
        if (level > this.settings.logLevel) {
            return;
        }
        if (data) {
            console.log(message, data);
        }
        else {
            console.log(message);
        }
    }
    emit(func, control) {
        if (!this.settings.safe) {
            return func(control);
        }
        try {
            func(control);
        }
        catch (e) {
            console.warn(e);
        }
    }
    emitCreated(control) {
        for (const event of this.eventCreated) {
            this.emit(event, control);
        }
    }
    /**
     * Add a listener method on tween/sequence creation
     *
     * @export
     * @param {(control: IControl) => void} cb
     */
    addListenerCreated(cb) {
        this.eventCreated.push(cb);
    }
    /**
     * Remove a listener method on tween/sequence creation
     *
     * @export
     * @param {(control: IControl) => void} cb
     */
    removeListenerCreated(cb) {
        const index = this.eventCreated.indexOf(cb);
        if (index !== -1) {
            this.eventCreated.splice(index, 1);
        }
    }
    /**
     * This method is used to change the log level
     *
     * @export
     * @param {Log} level
     */
    setLog(level) {
        this.settings.logLevel = level;
    }
    /**
     * This method is used to enable / disable the callback try/catch
     *
     * @export
     * @param {boolean} isSafe
     */
    setSafe(isSafe) {
        this.settings.safe = isSafe;
    }
}
exports.Fatina = Fatina;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const fatina_1 = __webpack_require__(/*! ./fatina */ "./src/fatina.ts");
module.exports = new fatina_1.Fatina();


/***/ }),

/***/ "./src/ticker.ts":
/*!***********************!*\
  !*** ./src/ticker.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main Fatina Ticker
 * Parent of all the normal tween and sequence
 *
 * @export
 * @class Ticker
 * @extends {EventList}
 * @implements {ITicker}
 */
class Ticker {
    constructor() {
        this.state = 0 /* Idle */;
        this.timescale = 1;
        this.elapsed = 0;
        this.duration = 0;
        this.ticks = new Set();
        this.newTicks = new Set();
        this.dt = 0;
    }
    setParent(parent, tick) {
        this.tickCb = tick;
        this.parent = parent;
    }
    /**
     * Method used to change the timescale
     *
     * @param {number} scale
     *
     * @memberOf Ticker
     */
    setTimescale(scale) {
        this.timescale = scale;
    }
    /**
     * Method used by the child to be updated
     *
     * @param {(dt: number) => void} cb
     *
     * @memberOf Ticker
     */
    addTick(cb) {
        this.newTicks.add(cb);
    }
    /**
     * Method used by the child to not receive update anymore
     *
     * @param {(dt: number) => void} cb
     *
     * @memberOf Ticker
     */
    removeTick(cb) {
        if (!this.ticks.delete(cb)) {
            this.newTicks.delete(cb);
        }
    }
    /**
     * Method used to tick all the child (tick listeners)
     *
     * @param {number} dt
     * @returns
     *
     * @memberOf Ticker
     */
    tick(dt) {
        if (this.state !== 1 /* Run */) {
            return;
        }
        this.dt = dt * this.timescale;
        if (this.newTicks.size > 0) {
            this.newTicks.forEach((tick) => this.ticks.add(tick));
            this.newTicks.clear();
        }
        this.ticks.forEach((tick) => tick(this.dt));
        this.elapsed += this.dt;
    }
    start() {
        if (this.state === 0 /* Idle */) {
            this.state = 1 /* Run */;
        }
    }
    pause() {
        if (this.state === 1 /* Run */) {
            this.state = 2 /* Pause */;
        }
    }
    resume() {
        if (this.state === 2 /* Pause */) {
            this.state = 1 /* Run */;
        }
    }
    kill() {
        if (this.state >= 3) {
            return;
        }
        if (this.parent && this.tickCb) {
            this.parent.removeTick(this.tickCb);
        }
        this.state = 4 /* Killed */;
    }
    skip() { }
    reset() {
        this.state = 0 /* Idle */;
    }
    get isIdle() {
        return this.state === 0 /* Idle */;
    }
    get isRunning() {
        return this.state === 1 /* Run */;
    }
    get isFinished() {
        return this.state >= 3;
    }
    get isPaused() {
        return this.state === 2 /* Pause */;
    }
}
exports.Ticker = Ticker;


/***/ }),

/***/ "./src/tweens/baseTween.ts":
/*!*********************************!*\
  !*** ./src/tweens/baseTween.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Shared behaviors between different types of tweens and sequence
 * Used mostly to manage:
 *  - events
 *  - state
 *  - loop and restart
 *
 * @export
 * @abstract
 * @class BaseTween
 */
class BaseTween {
    constructor() {
        // events
        this.events = {};
        // public properties
        this.elapsed = 0;
        this.duration = 0;
        this.timescale = 1;
        this.state = 0 /* Idle */;
        this.first = true;
    }
    get isIdle() {
        return this.state === 0 /* Idle */;
    }
    get isRunning() {
        return this.state === 1 /* Run */;
    }
    get isFinished() {
        return this.state >= 3;
    }
    get isPaused() {
        return this.state === 2 /* Pause */;
    }
    /**
     * Method used to start a tween
     *
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    start() {
        if (this.state !== 0 /* Idle */) {
            return this;
        }
        if (this.first) {
            this.validate();
        }
        else {
            this.check();
        }
        this.state = 1 /* Run */;
        this.parent.addTick(this.tickCb);
        if (this.first) {
            this.emitEvent(this.events.start);
            this.first = false;
        }
        return this;
    }
    /**
     * Reset a tween to be reusable (with start)
     *
     * @memberOf BaseTween
     */
    recycle() {
        this.reset(true);
        this.first = true;
    }
    /**
     * To Reset a Tween already finished (example looping sequence)
     *
     * @memberOf BaseTween
     */
    reset(skipParent) {
        this.state = 0 /* Idle */;
        if (!skipParent) {
            this.removeParent();
        }
        if (this.loop) {
            this.loop.value = this.loop.original;
        }
        this.loopInit();
        this.emitEvent(this.events.restart);
    }
    /**
     * To immediately Reset a tween without stopping/restarting it
     * This is faster than calling manually Reset() & Start() & Tick()
     *
     * @param {number} dtRemains
     *
     * @memberOf BaseTween
     */
    resetAndStart(dtRemains) {
        this.loopInit();
        this.emitEvent(this.events.restart);
        this.state = 1 /* Run */;
        if (dtRemains > 0) {
            this.tickCb(dtRemains);
        }
    }
    /**
     * Method used to define the ticker of this tween
     * When Fatina.Tween is used, the main ticker is automatically defined as parent
     *
     * @param {ITicker} ticker
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    setParent(ticker) {
        this.removeParent();
        this.parent = ticker;
        return this;
    }
    /**
     * Method used to change the timescale of the tween
     *
     * @param {number} scale
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    setTimescale(scale) {
        this.timescale = scale;
        return this;
    }
    /**
     * Method used to pause a tween or a sequence (only work if the tween runs)
     *
     * @returns {void}
     *
     * @memberOf BaseTween
     */
    pause() {
        if (this.state !== 1 /* Run */) {
            this.info(1 /* Info */, 'Cannot pause this tween ', this.state);
            return;
        }
        this.state = 2 /* Pause */;
        this.removeParent();
    }
    /**
     * Method used to resume a tween or a sequence (only work if the tween is paused)
     *
     * @returns {void}
     *
     * @memberOf BaseTween
     */
    resume() {
        if (this.state !== 2 /* Pause */) {
            this.info(1 /* Info */, 'Cannot resume this tween ', this.state);
            return;
        }
        this.state = 1 /* Run */;
        this.parent.addTick(this.tickCb);
    }
    /**
     * Method used to Skip this tween or sequence and directly finish it
     *
     * @param {boolean} [finalValue]
     * @returns {void}
     * @memberOf BaseTween
     */
    skip(finalValue) {
        if (this.state >= 3) {
            this.info(1 /* Info */, 'Cannot skip this tween ', this.state);
            return;
        }
        if (this.state === 0 /* Idle */) {
            this.emitEvent(this.events.start);
        }
        if (finalValue) {
            const duration = this.yo ? (this.yo.value * this.duration) : 0;
            this.tickCb(this.duration - this.elapsed + duration);
            return;
        }
        this.elapsed = this.duration;
        this.complete();
    }
    /**
     * Method used to Stop/Kill a tween or a sequence
     *
     * @returns {void}
     *
     * @memberOf BaseTween
     */
    kill() {
        if (this.state === 4 /* Killed */) {
            this.info(1 /* Info */, 'Cannot kill this tween ', this.state);
            return;
        }
        this.state = 4 /* Killed */;
        this.removeParent();
        this.emitEvent(this.events.kill);
    }
    /**
     * Method used to define how many time the tween has to loop
     * Extra: if -1 the tween will loop forever
     *
     * @param {number} loop
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    setLoop(loop) {
        if (!this.loop) {
            this.loop = { original: 1, value: 1 };
        }
        this.loop.original = Math.round(loop);
        this.loop.value = this.loop.original;
        return this;
    }
    setSettings(settings) {
        if (this.settings) {
            Object.assign(this.settings, settings);
        }
        else {
            this.settings = settings;
        }
        return this;
    }
    complete() {
        if (this.state >= 3) {
            this.info(1 /* Info */, 'Cannot complete this tween ', this.state);
            return;
        }
        this.state = 3 /* Finished */;
        this.removeParent();
        this.emitEvent(this.events.complete);
    }
    removeParent() {
        if (this.parent) {
            this.parent.removeTick(this.tickCb);
        }
    }
    check() { }
    validate() { }
    loopInit() {
        this.elapsed = 0;
    }
    info(level, message, data) {
        if (!this.settings || level > this.settings.logLevel) {
            return;
        }
        console.log(message, data);
    }
    emit(func, args) {
        if (this.settings && !this.settings.safe) {
            return func.apply(this, args);
        }
        try {
            func.apply(this, args);
        }
        catch (e) {
            console.warn(e);
        }
    }
    emitEvent(listeners, args) {
        if (!listeners) {
            return;
        }
        if (listeners instanceof Array) {
            for (const listener of listeners) {
                this.emit(listener, args);
            }
        }
        else {
            this.emit(listeners, args);
        }
    }
    /**
     *  Callback called when the tween started
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onStart(cb) {
        return this.onEvent('start', cb);
    }
    /**
     * Callback called when the tween restart (loop)
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onRestart(cb) {
        return this.onEvent('restart', cb);
    }
    /**
     * Callback called when the tween is updated
     *
     * @param {(dt: number, progress: number) => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onUpdate(cb) {
        return this.onEvent('update', cb);
    }
    /**
     * Callback called when the tween is manually killed
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onKilled(cb) {
        return this.onEvent('kill', cb);
    }
    /**
     * Callback called when the tween is finished
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onComplete(cb) {
        return this.onEvent('complete', cb);
    }
    onEvent(name, cb) {
        if (!this.events[name]) {
            this.events[name] = cb;
        }
        else if (this.events[name] instanceof Array) {
            this.events[name].push(cb);
        }
        else {
            this.events[name] = [this.events[name], cb];
        }
        return this;
    }
}
exports.BaseTween = BaseTween;


/***/ }),

/***/ "./src/tweens/callback.ts":
/*!********************************!*\
  !*** ./src/tweens/callback.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/tweens/baseTween.ts");
/**
 * Fake tween used to append or join callback in a sequence
 *
 * @export
 * @class Callback
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
class Callback extends baseTween_1.BaseTween {
    constructor(cb) {
        super();
        this.callback = cb;
        this.tickCb = this.tick.bind(this);
    }
    tick(dt) {
        this.elapsed += dt;
        this.duration = 0;
        this.callback();
        this.emitEvent(this.events.update, [dt, 1]);
        this.complete();
    }
}
exports.Callback = Callback;


/***/ }),

/***/ "./src/tweens/delay.ts":
/*!*****************************!*\
  !*** ./src/tweens/delay.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/tweens/baseTween.ts");
/**
 * Fake tween used to delay other tweens in a sequence
 *
 * @export
 * @class Delay
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
class Delay extends baseTween_1.BaseTween {
    constructor(duration) {
        super();
        this.remains = 0;
        this.duration = duration;
        this.tickCb = this.tick.bind(this);
    }
    tick(dt) {
        this.remains = dt * this.timescale;
        while (this.remains > 0) {
            this.elapsed += this.remains;
            const progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
            if (this.events.update) {
                this.emitEvent(this.events.update, [this.remains, progress]);
            }
            if (this.elapsed < this.duration) {
                return;
            }
            this.remains = this.elapsed - this.duration;
            if (this.loop) {
                this.loop.value--;
                if (this.loop.value !== 0) {
                    this.resetAndStart(0);
                    continue;
                }
            }
            this.complete();
            return;
        }
    }
}
exports.Delay = Delay;


/***/ }),

/***/ "./src/tweens/sequence.ts":
/*!********************************!*\
  !*** ./src/tweens/sequence.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/tweens/baseTween.ts");
const callback_1 = __webpack_require__(/*! ./callback */ "./src/tweens/callback.ts");
const delay_1 = __webpack_require__(/*! ./delay */ "./src/tweens/delay.ts");
/**
 * Sequence: used to animate other tweens or sequence
 * Can play them sequentially or in parallel
 *
 * @export
 * @class Sequence
 * @extends {BaseTween}
 * @implements {ISequence}
 * @implements {ITicker}
 * @implements {IPlayable}
 */
class Sequence extends baseTween_1.BaseTween {
    constructor(tweens) {
        super();
        this.evtTick = new Set();
        this.tweens = [];
        this.index = 0;
        this.remains = 0;
        this.tickCb = this.tick.bind(this);
        if (tweens) {
            this.tweens = new Array(tweens.length);
            for (let i = 0; i < tweens.length; i++) {
                tweens[i].setParent(this);
                this.tweens[i] = [tweens[i]];
            }
        }
    }
    get count() {
        return this.tweens.length;
    }
    loopInit() {
        this.index = 0;
        for (const tweenArray of this.tweens) {
            for (const tween of tweenArray) {
                tween.reset();
            }
        }
    }
    addTick(cb) {
        this.evtTick.add(cb);
    }
    removeTick(cb) {
        this.evtTick.delete(cb);
    }
    tick(dt) {
        if (this.state >= 3) {
            return;
        }
        this.remains = dt * this.timescale;
        this.elapsed += this.remains;
        this.localTick(this.remains);
    }
    localTick(dt, remains) {
        // If no current tween, take the first one and start it
        if (!this.cur) {
            this.nextTween();
        }
        if (this.cur) {
            // Tick every listener
            this.evtTick.forEach(function (tick) { tick(dt); });
            // Dont emit update event for remains dt
            if (remains !== true && this.events.update) {
                this.emitEvent(this.events.update, [dt, 0]);
            }
        }
        this.remains = dt;
        // Current tween over
        if (this.cur) {
            for (const current of this.cur) {
                if (current.state !== 3 /* Finished */) {
                    return;
                }
            }
            this.remains = this.cur[0].elapsed - this.cur[0].duration;
            if (this.events.stepEnd) {
                this.emitEvent(this.events.stepEnd, this.cur[0]);
            }
            this.cur = undefined;
            this.index++;
            if (this.remains > 0.01) {
                this.localTick(this.remains, true);
                return;
            }
        }
        // Complete
        if (!this.cur && this.tweens.length === this.index) {
            if (this.loop) {
                this.loop.value--;
                if (this.loop.value !== 0) {
                    this.resetAndStart(this.remains);
                    return;
                }
            }
            this.complete();
        }
    }
    nextTween() {
        this.cur = this.tweens[this.index];
        if (!this.cur) {
            return;
        }
        for (const tween of this.cur) {
            tween.start();
        }
        if (this.events.stepStart) {
            this.emitEvent(this.events.stepStart, this.cur[0]);
        }
    }
    append(tween) {
        tween.setParent(this);
        this.tweens[this.tweens.length] = [tween];
        return this;
    }
    appendCallback(cb) {
        const playable = new callback_1.Callback(cb);
        playable.setParent(this);
        this.tweens[this.tweens.length] = [playable];
        return this;
    }
    appendInterval(duration) {
        const playable = new delay_1.Delay(duration);
        playable.setParent(this);
        this.tweens[this.tweens.length] = [playable];
        return this;
    }
    prepend(tween) {
        tween.setParent(this);
        this.tweens.unshift([tween]);
        return this;
    }
    prependCallback(cb) {
        const playable = new callback_1.Callback(cb);
        playable.setParent(this);
        this.tweens.unshift([playable]);
        return this;
    }
    prependInterval(duration) {
        const playable = new delay_1.Delay(duration);
        playable.setParent(this);
        this.tweens.unshift([playable]);
        return this;
    }
    skip(finalValue) {
        if (this.state >= 3) {
            this.info(1 /* Info */, 'Cannot skip this tween ', this.state);
            return;
        }
        for (const tweenArray of this.tweens) {
            for (const tween of tweenArray) {
                if (tween.elapsed === 0) {
                    this.emitEvent(this.events.stepStart, tween);
                }
                tween.skip(finalValue);
                this.emitEvent(this.events.stepEnd, tween);
            }
        }
        super.skip();
    }
    kill() {
        if (this.state === 4 /* Killed */) {
            this.info(1 /* Info */, 'Cannot kill this tween ', this.state);
            return;
        }
        for (const tweenArray of this.tweens) {
            for (const tween of tweenArray) {
                tween.kill();
            }
        }
        super.kill();
    }
    join(tween) {
        if (this.tweens.length === 0) {
            return this.append(tween);
        }
        tween.setParent(this);
        this.tweens[this.tweens.length - 1].push(tween);
        return this;
    }
    onStepStart(cb) {
        return this.onEvent('stepStart', cb);
    }
    onStepEnd(cb) {
        return this.onEvent('stepEnd', cb);
    }
}
exports.Sequence = Sequence;


/***/ }),

/***/ "./src/tweens/tween.ts":
/*!*****************************!*\
  !*** ./src/tweens/tween.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const easing_1 = __webpack_require__(/*! ../easing/easing */ "./src/easing/easing.ts");
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/tweens/baseTween.ts");
const sequence_1 = __webpack_require__(/*! ./sequence */ "./src/tweens/sequence.ts");
/**
 * Tween: Used to animate values of an object
 *
 * @export
 * @class Tween
 * @extends {BaseTween}
 * @implements {ITween}
 */
class Tween extends baseTween_1.BaseTween {
    constructor(object) {
        super();
        this.prop = [];
        // options
        this.steps = 0;
        this.relative = false;
        // cache
        this.p = 0;
        this.v = 0;
        this.remains = 0;
        this.obj = object;
        this.tickCb = this.tick.bind(this);
    }
    /**
     * Used to define the object and the properties modified by this tween
     *
     * @param {*} object
     *
     * @memberOf Tween
     */
    init(object) {
        this.obj = object;
        this.prop.length = 0;
    }
    /**
     * Method used on start to check the values of this tween
     *
     * @protected
     *
     * @memberOf Tween
     */
    validate() {
        // Check the object
        if (!this.obj) {
            throw new Error('undefined object');
        }
        // Check this tween will be updated
        if (!this.parent) {
            throw new Error('no ticker');
        }
        // Easing
        if (!this.ease) {
            this.ease = easing_1.easeNames["linear" /* Linear */];
        }
        this.check();
    }
    /**
     * Method used to calculate currentFrom/currentTo based on the config
     *
     * @protected
     *
     * @memberOf Tween
     */
    check() {
        if (!this.cf) {
            this.cf = {};
        }
        if (!this.ct) {
            this.ct = {};
        }
        for (const prop of this.prop) {
            // From
            if (!this.f) {
                this.cf[prop] = this.obj[prop];
            }
            else {
                this.cf[prop] = this.f[prop];
                this.obj[prop] = this.f[prop];
            }
            // Relative
            if (this.relative) {
                this.ct[prop] = this.obj[prop] + this.t[prop];
            }
            else {
                this.ct[prop] = this.t[prop];
            }
        }
    }
    tick(dt) {
        if (this.state >= 3) {
            return;
        }
        this.remains = dt * this.timescale;
        while (this.remains > 0) {
            this.elapsed += this.remains;
            this.p = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
            this.v = this.ease(this.p);
            // Yoyo easing (need to be reversed)
            if (this.yo && (this.yo.original - this.yo.value) % 2 === 1) {
                this.v = 1 - this.ease(1 - this.p);
            }
            // Steps behaviour
            if (this.steps !== 0) {
                this.v = Math.round(this.v * this.steps) / this.steps;
            }
            // Update if the object still exist
            for (const prop of this.prop) {
                this.obj[prop] = this.cf[prop] + (this.ct[prop] - this.cf[prop]) * this.v;
            }
            if (this.events.update) {
                this.emitEvent(this.events.update, [this.remains, this.p]);
            }
            if (this.elapsed < this.duration) {
                return;
            }
            this.remains = this.elapsed - this.duration;
            // Yoyo effect ( A -> B -> A )
            if (this.yo && this.yo.value > 0) {
                this.reverse();
                this.resetAndStart(0);
                this.yo.value--;
                continue;
            }
            // Loop management
            if (this.loop) {
                this.loop.value--;
                if (this.loop.value !== 0) {
                    this.check();
                    this.resetAndStart(0);
                    continue;
                }
            }
            this.complete();
            return;
        }
    }
    /**
     * Method used to set the values at the beginning of the tween
     *
     * @param {*} from
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    from(from) {
        this.f = from;
        this.updateProp();
        return this;
    }
    /**
     * Method used to set the values at the end of the tween
     *
     * @param {*} to
     * @param {number} duration
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    to(to, duration) {
        this.t = to;
        this.duration = duration;
        this.updateProp();
        return this;
    }
    /**
     * Compute the properties
     *
     * @private
     */
    updateProp() {
        if (!this.obj) {
            return;
        }
        for (const index in this.t) {
            if (this.t.hasOwnProperty(index)) {
                this.prop.push(index);
            }
        }
        this.prop.filter((el, i, a) => i === a.indexOf(el));
    }
    /**
     * Method used to define if the tween as to work in relative or not
     *
     * @param {boolean} relative
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    setRelative(relative) {
        this.relative = relative;
        return this;
    }
    /**
     * To apply a modifier on a current tween
     *
     * @param {*} diff
     * @param {boolean} updateTo
     *
     * @memberOf Tween
     */
    modify(diff, updateTo) {
        for (const prop of this.prop) {
            if (!diff.hasOwnProperty(prop)) {
                continue;
            }
            this.obj[prop] += diff[prop];
            if (updateTo) {
                this.ct[prop] += diff[prop];
            }
            else {
                this.cf[prop] += diff[prop];
            }
        }
    }
    /**
     * Overwrite the Reset (just for yoyo)
     *
     * @param {boolean} [skipParent]
     * @memberOf Tween
     */
    reset(skipParent) {
        if (this.yo) {
            if ((this.yo.original - this.yo.value) % 2 === 1) {
                let previous = this.cf;
                this.cf = this.ct;
                this.ct = previous;
                previous = this.f;
                this.f = this.t;
                this.t = previous;
                const elapsed = (1 - (this.elapsed / this.duration)) * this.duration;
                this.elapsed = Math.round(elapsed * 1000) / 1000;
            }
            this.yo.value = this.yo.original;
        }
        super.reset(skipParent);
    }
    /**
     * Method used to reverse the tween
     *
     * @memberOf Tween
     */
    reverse() {
        let previous = this.cf;
        this.cf = this.ct;
        this.ct = previous;
        previous = this.f;
        this.f = this.t;
        this.t = previous;
        const elapsed = (1 - (this.elapsed / this.duration)) * this.duration;
        this.elapsed = Math.round(elapsed * 1000) / 1000;
        if (this.state === 3 /* Finished */) {
            this.reset(true);
            this.start();
        }
    }
    /**
     * Method used to reverse the tween N times at the end
     *
     * @param {number} time
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    yoyo(time) {
        if (!this.yo) {
            this.yo = { original: 0, value: 0 };
        }
        this.yo.original = time;
        this.yo.value = time;
        return this;
    }
    /**
     * Method used to Quantify the tween value to a certain amount of steps
     *
     * @param {number} steps
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    setSteps(steps) {
        this.steps = steps;
        return this;
    }
    /**
     * Method used to create a sequence with this tween as first value.
     * Usually used with .AppendInterval(1250) or .PrependInterval(160) to add a delay
     *
     * @returns {ISequence}
     *
     * @memberOf Tween
     */
    toSequence() {
        if (!this.parent) {
            throw new Error('parent ticker not defined');
        }
        return new sequence_1.Sequence().setParent(this.parent).append(this);
    }
    /**
     * Method used to set the type of easing for this tween
     *
     * @param {(EasingType | string)} type
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    setEasing(type) {
        if (!(type in easing_1.easeNames)) {
            throw new Error(`unknown easing method ${type}`);
        }
        this.ease = easing_1.easeNames[type];
        return this;
    }
    /**
     * Method used when the tween is reset (loop)
     *
     * @protected
     *
     * @memberOf Tween
     */
    loopInit() {
        this.elapsed = 0;
    }
}
exports.Tween = Tween;


/***/ })

/******/ });
});
//# sourceMappingURL=fatina.js.map