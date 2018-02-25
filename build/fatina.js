(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fatina", [], factory);
	else if(typeof exports === 'object')
		exports["Fatina"] = factory();
	else
		root["Fatina"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/fatina/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fatina/core/enum/log.ts":
/*!*************************************!*\
  !*** ./src/fatina/core/enum/log.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Log;
(function (Log) {
    Log[Log["None"] = 0] = "None";
    Log[Log["Info"] = 1] = "Info";
    Log[Log["Debug"] = 2] = "Debug";
})(Log = exports.Log || (exports.Log = {}));


/***/ }),

/***/ "./src/fatina/core/enum/state.ts":
/*!***************************************!*\
  !*** ./src/fatina/core/enum/state.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["Idle"] = 0] = "Idle";
    State[State["Run"] = 1] = "Run";
    State[State["Pause"] = 2] = "Pause";
    State[State["Finished"] = 3] = "Finished";
    State[State["Killed"] = 4] = "Killed";
})(State = exports.State || (exports.State = {}));


/***/ }),

/***/ "./src/fatina/easing/easing.ts":
/*!*************************************!*\
  !*** ./src/fatina/easing/easing.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const easingType_1 = __webpack_require__(/*! ./easingType */ "./src/fatina/easing/easingType.ts");
const PI = Math.PI;
const PI_OVER_TWO = Math.PI / 2;
const BACK = 1.70158;
const easingByName = {};
easingByName[easingType_1.EasingType.Linear] = (t) => {
    return t;
};
easingByName[easingType_1.EasingType.InQuad] = (t) => {
    return t * t;
};
easingByName[easingType_1.EasingType.OutQuad] = (t) => {
    return 2 * t - t * t;
};
easingByName[easingType_1.EasingType.InOutQuad] = (t) => {
    if (t < 0.5) {
        return 2 * t * t;
    }
    else {
        return 2 * (2 * t - t * t) - 1;
    }
};
easingByName[easingType_1.EasingType.InCubic] = (t) => {
    return t * t * t;
};
easingByName[easingType_1.EasingType.OutCubic] = (t) => {
    return 3 * t - 3 * t * t + t * t * t;
};
easingByName[easingType_1.EasingType.InOutCubic] = (t) => {
    if (t < 0.5) {
        return 4 * t * t * t;
    }
    else {
        return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
    }
};
easingByName[easingType_1.EasingType.InQuart] = (t) => {
    return t * t * t * t;
};
easingByName[easingType_1.EasingType.OutQuart] = (t) => {
    const t2 = t * t;
    return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
};
easingByName[easingType_1.EasingType.InOutQuart] = (t) => {
    if (t < 0.5) {
        return 8 * t * t * t * t;
    }
    else {
        const t2 = t * t;
        return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
    }
};
easingByName[easingType_1.EasingType.InSine] = (t) => {
    if (t === 1) {
        return 1;
    }
    return 1 - Math.cos(PI_OVER_TWO * t);
};
easingByName[easingType_1.EasingType.OutSine] = (t) => {
    return Math.sin(PI_OVER_TWO * t);
};
easingByName[easingType_1.EasingType.InOutSine] = (t) => {
    if (t < 0.5) {
        return (1 - Math.cos(PI * t)) / 2;
    }
    else {
        return (1 + Math.sin(PI * (t - 0.5))) / 2;
    }
};
easingByName[easingType_1.EasingType.InCirc] = (t) => {
    return 1 - Math.sqrt(1 - Math.pow(t, 2));
};
easingByName[easingType_1.EasingType.OutCirc] = (t) => {
    return Math.sqrt(1 - Math.pow(1 - t, 2));
};
easingByName[easingType_1.EasingType.InOutCirc] = (t) => {
    if (t < 0.5) {
        return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
    }
    else {
        return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
    }
};
easingByName[easingType_1.EasingType.InQuint] = (t) => {
    return t * t * t * t * t;
};
easingByName[easingType_1.EasingType.OutQuint] = (t) => {
    return --t * t * t * t * t + 1;
};
easingByName[easingType_1.EasingType.InOutQuint] = (t) => {
    t *= 2;
    if (t < 1) {
        return 0.5 * t * t * t * t * t;
    }
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
};
easingByName[easingType_1.EasingType.InExponential] = (t) => {
    if (t === 1) {
        return 1;
    }
    return t === 0 ? 0 : Math.pow(1024, t - 1);
};
easingByName[easingType_1.EasingType.OutExponential] = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};
easingByName[easingType_1.EasingType.InOutExponential] = (t) => {
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
easingByName[easingType_1.EasingType.InElastic] = (t) => {
    if (t === 0) {
        return 0;
    }
    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
};
easingByName[easingType_1.EasingType.OutElastic] = (t) => {
    if (t === 1) {
        return 1;
    }
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
};
easingByName[easingType_1.EasingType.InOutElastic] = (t) => {
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
easingByName[easingType_1.EasingType.InBack] = (t) => {
    const s = BACK;
    return t === 1 ? 1 : t * t * ((s + 1) * t - s);
};
easingByName[easingType_1.EasingType.OutBack] = (t) => {
    const s = BACK;
    return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1;
};
easingByName[easingType_1.EasingType.InOutBack] = (t) => {
    const s = BACK * 1.525;
    t *= 2;
    if (t < 1) {
        return 0.5 * (t * t * ((s + 1) * t - s));
    }
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
};
easingByName[easingType_1.EasingType.OutBounce] = (t) => {
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
easingByName[easingType_1.EasingType.InBounce] = (t) => {
    return 1 - easingByName[easingType_1.EasingType.OutBounce](1 - t);
};
easingByName[easingType_1.EasingType.InOutBounce] = (t) => {
    if (t < 0.5) {
        return easingByName[easingType_1.EasingType.InBounce](t * 2) * 0.5;
    }
    return easingByName[easingType_1.EasingType.OutBounce](t * 2 - 1) * 0.5 + 0.5;
};
exports.easeNames = easingByName;


/***/ }),

/***/ "./src/fatina/easing/easingType.ts":
/*!*****************************************!*\
  !*** ./src/fatina/easing/easingType.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EasingType;
(function (EasingType) {
    EasingType["Linear"] = "linear";
    EasingType["InQuad"] = "inQuad";
    EasingType["OutQuad"] = "outQuad";
    EasingType["InOutQuad"] = "inOutQuad";
    EasingType["InCubic"] = "inCubic";
    EasingType["OutCubic"] = "outCubic";
    EasingType["InOutCubic"] = "inOutCubic";
    EasingType["InQuart"] = "inQuart";
    EasingType["OutQuart"] = "outQuart";
    EasingType["InOutQuart"] = "inOutQuart";
    EasingType["InSine"] = "inSine";
    EasingType["OutSine"] = "outSine";
    EasingType["InOutSine"] = "inOutSine";
    EasingType["InCirc"] = "inCirc";
    EasingType["OutCirc"] = "outCirc";
    EasingType["InOutCirc"] = "inOutCirc";
    EasingType["InQuint"] = "inQuint";
    EasingType["OutQuint"] = "outQuint";
    EasingType["InOutQuint"] = "inOutQuint";
    EasingType["InExponential"] = "inExponential";
    EasingType["OutExponential"] = "outExponential";
    EasingType["InOutExponential"] = "inOutExponential";
    EasingType["InElastic"] = "inElastic";
    EasingType["OutElastic"] = "outElastic";
    EasingType["InOutElastic"] = "inOutElastic";
    EasingType["InBack"] = "inBack";
    EasingType["OutBack"] = "outBack";
    EasingType["InOutBack"] = "inOutBack";
    EasingType["InBounce"] = "inBounce";
    EasingType["OutBounce"] = "outBounce";
    EasingType["InOutBounce"] = "inOutBounce";
})(EasingType = exports.EasingType || (exports.EasingType = {}));


/***/ }),

/***/ "./src/fatina/index.ts":
/*!*****************************!*\
  !*** ./src/fatina/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __webpack_require__(/*! ./core/enum/log */ "./src/fatina/core/enum/log.ts");
const easingType_1 = __webpack_require__(/*! ./easing/easingType */ "./src/fatina/easing/easingType.ts");
exports.Easing = easingType_1.EasingType;
const ticker_1 = __webpack_require__(/*! ./ticker */ "./src/fatina/ticker.ts");
const delay_1 = __webpack_require__(/*! ./tweens/delay */ "./src/fatina/tweens/delay.ts");
const sequence_1 = __webpack_require__(/*! ./tweens/sequence */ "./src/fatina/tweens/sequence.ts");
const tween_1 = __webpack_require__(/*! ./tweens/tween */ "./src/fatina/tweens/tween.ts");
let tickerManager;
let initialized = false;
let isFirstUpdate = true;
let lastFrame;
let lastTime = 0;
const settings = { logLevel: log_1.Log.None, safe: true };
const eventCreated = [];
const loadedPlugins = [];
exports.plugin = {};
exports.time = 0;
function Elapsed() {
    return tickerManager.elapsed;
}
exports.Elapsed = Elapsed;
function MainTicker() {
    if (!initialized) {
        Init();
    }
    return tickerManager;
}
exports.MainTicker = MainTicker;
function AddListenerCreated(cb) {
    eventCreated.push(cb);
}
exports.AddListenerCreated = AddListenerCreated;
function RemoveListenerCreated(cb) {
    const index = eventCreated.indexOf(cb);
    if (index !== -1) {
        eventCreated.splice(index, 1);
    }
}
exports.RemoveListenerCreated = RemoveListenerCreated;
function Init(disableAutoTick) {
    if (initialized) {
        return false;
    }
    if (!tickerManager) {
        tickerManager = new ticker_1.Ticker();
        tickerManager.Start();
    }
    if (typeof (window) !== 'undefined' && !disableAutoTick) {
        lastFrame = requestFrame(updateLoop);
    }
    initialized = true;
    return true;
}
exports.Init = Init;
function SetTimescale(scale) {
    if (!initialized) {
        Init();
    }
    tickerManager.SetTimescale(scale);
}
exports.SetTimescale = SetTimescale;
function Pause() {
    if (!initialized) {
        Init();
    }
    tickerManager.Pause();
}
exports.Pause = Pause;
function Resume() {
    if (!initialized) {
        Init();
    }
    tickerManager.Resume();
}
exports.Resume = Resume;
function SetLog(level) {
    settings.logLevel = level;
}
exports.SetLog = SetLog;
function SetSafe(isSafe) {
    settings.safe = isSafe;
}
exports.SetSafe = SetSafe;
function Destroy() {
    if (tickerManager) {
        tickerManager.Kill();
    }
    if (lastFrame) {
        cancelFrame(lastFrame);
    }
    initialized = false;
}
exports.Destroy = Destroy;
function Update(timestamp) {
    if (!initialized || !tickerManager) {
        return;
    }
    tickerManager.Tick(timestamp);
    exports.time += timestamp;
}
exports.Update = Update;
function Tween(obj, properties) {
    const t = new tween_1.Tween(obj, properties);
    AddContext(t);
    Info(log_1.Log.Debug, '[Fatina.Manager] Tween Instantiated', t);
    return t;
}
exports.Tween = Tween;
function Sequence(list) {
    const s = new sequence_1.Sequence(list);
    AddContext(s);
    Info(log_1.Log.Debug, '[Fatina.Manager] Sequence Instantiated', s);
    return s;
}
exports.Sequence = Sequence;
function Delay(duration) {
    const d = new delay_1.Delay(duration);
    AddContext(d);
    Info(log_1.Log.Debug, '[Fatina.Manager] Sequence Instantiated', d);
    return d;
}
exports.Delay = Delay;
function SetTimeout(fn, duration) {
    const timeout = new delay_1.Delay(duration).OnComplete(fn);
    AddContext(timeout);
    Info(log_1.Log.Debug, '[Fatina.Manager] SetTimeout Instantiated', timeout);
    return timeout.Start();
}
exports.SetTimeout = SetTimeout;
function SetInterval(fn, duration) {
    const interval = new delay_1.Delay(duration).OnRestart(fn).SetLoop(-1);
    AddContext(interval);
    Info(log_1.Log.Debug, '[Fatina.Manager] SetInterval Instantiated', interval);
    return interval.Start();
}
exports.SetInterval = SetInterval;
function AddContext(obj) {
    if (!initialized) {
        Init();
    }
    obj.SetParent(tickerManager);
    if (settings.logLevel !== log_1.Log.None || !settings.safe) {
        obj.SetSettings(settings);
    }
    EmitCreated(obj);
}
function Ticker() {
    if (!initialized) {
        Init();
    }
    const tick = new ticker_1.Ticker();
    const handler = tick.Tick.bind(tick);
    tick.SetParent(tickerManager, handler);
    tickerManager.AddTickListener(handler);
    tick.Start();
    EmitCreated(tick);
    Info(log_1.Log.Debug, '[Fatina.Manager] Ticker Instantiated', tick);
    return tick;
}
exports.Ticker = Ticker;
function LoadPlugin(newPlugin) {
    newPlugin.Init(this);
    loadedPlugins.push(newPlugin);
    Info(log_1.Log.Debug, '[Fatina.Manager] Plugin Loaded', newPlugin.name);
}
exports.LoadPlugin = LoadPlugin;
function Info(level, message, data) {
    if (level > settings.logLevel) {
        return;
    }
    if (data) {
        console.log(message, data);
    }
    else {
        console.log(message);
    }
}
function Emit(func, control) {
    if (!settings.safe) {
        return func(control);
    }
    try {
        func(control);
    }
    catch (e) {
        console.warn(e);
    }
}
function EmitCreated(control) {
    for (let i = 0; i < eventCreated.length; i++) {
        Emit(eventCreated[i], control);
    }
}
let requestFrame;
let cancelFrame;
if (typeof (window) !== 'undefined') {
    requestFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    cancelFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
}
function updateLoop(timestamp) {
    let dt = timestamp - lastTime;
    if (isFirstUpdate) {
        dt = 1;
        isFirstUpdate = false;
    }
    if (dt > 350) {
        console.warn('[Fatina] Delta between two update was too high ' + Math.round(dt) + 'ms. , Capped to 350ms.');
        dt = 350;
    }
    Update(dt);
    lastTime = timestamp;
    lastFrame = requestFrame(updateLoop);
}


/***/ }),

/***/ "./src/fatina/ticker.ts":
/*!******************************!*\
  !*** ./src/fatina/ticker.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(/*! ./core/enum/state */ "./src/fatina/core/enum/state.ts");
class Ticker {
    constructor() {
        this.state = state_1.State.Idle;
        this.timescale = 1;
        this.elapsed = 0;
        this.duration = 0;
        this.update = 0;
        this.ticks = new Set();
    }
    SetParent(parent, tick) {
        this.tick = tick;
        this.parent = parent;
    }
    SetTimescale(scale) {
        this.timescale = scale;
    }
    AddTickListener(cb) {
        this.ticks.add(cb);
    }
    RemoveTickListener(cb) {
        this.ticks.delete(cb);
    }
    Tick(dt) {
        if (this.state !== state_1.State.Run) {
            return;
        }
        const localDt = dt * this.timescale;
        for (const tick of this.ticks) {
            tick(localDt);
        }
        this.elapsed += localDt;
        this.update++;
    }
    Start() {
        if (this.state === state_1.State.Idle) {
            this.state = state_1.State.Run;
        }
    }
    Pause() {
        if (this.state === state_1.State.Run) {
            this.state = state_1.State.Pause;
        }
    }
    Resume() {
        if (this.state === state_1.State.Pause) {
            this.state = state_1.State.Run;
        }
    }
    Kill() {
        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
            return;
        }
        if (this.parent && this.tick) {
            this.parent.RemoveTickListener(this.tick);
        }
        this.state = state_1.State.Killed;
    }
    Skip() {
        throw new Error('The main ticker cannot be skipped');
    }
    Reset() {
        this.state = state_1.State.Idle;
    }
    IsIdle() {
        return this.state === state_1.State.Idle;
    }
    IsRunning() {
        return this.state === state_1.State.Run;
    }
    IsFinished() {
        return this.state === state_1.State.Killed || this.state === state_1.State.Finished;
    }
    IsPaused() {
        return this.state === state_1.State.Pause;
    }
}
exports.Ticker = Ticker;


/***/ }),

/***/ "./src/fatina/tweens/baseTween.ts":
/*!****************************************!*\
  !*** ./src/fatina/tweens/baseTween.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __webpack_require__(/*! ../core/enum/log */ "./src/fatina/core/enum/log.ts");
const state_1 = __webpack_require__(/*! ../core/enum/state */ "./src/fatina/core/enum/state.ts");
class BaseTween {
    constructor() {
        this.elapsed = 0;
        this.duration = 0;
        this.timescale = 1;
        this.state = state_1.State.Idle;
        this.firstStart = true;
    }
    Start() {
        if (this.state !== state_1.State.Idle) {
            return this;
        }
        if (this.firstStart) {
            this.Validate();
        }
        else {
            this.CheckPosition();
        }
        this.state = state_1.State.Run;
        this.parent.AddTickListener(this.tickCb);
        if (this.firstStart) {
            this.EmitEvent(this.eventStart);
            this.firstStart = false;
        }
        return this;
    }
    Reset(skipParent) {
        this.state = state_1.State.Idle;
        if (!skipParent) {
            this.RemoveParentListener();
        }
        if (this.loop) {
            this.loop.value = this.loop.original;
        }
        this.LoopInit();
        this.EmitEvent(this.eventRestart);
    }
    ResetAndStart(dtRemains) {
        this.LoopInit();
        this.EmitEvent(this.eventRestart);
        this.state = state_1.State.Run;
        if (dtRemains > 0) {
            this.tickCb(dtRemains);
        }
    }
    SetParent(ticker) {
        this.RemoveParentListener();
        this.parent = ticker;
        return this;
    }
    SetTimescale(scale) {
        this.timescale = scale;
        return this;
    }
    Pause() {
        if (this.state !== state_1.State.Run) {
            this.Info(log_1.Log.Info, 'Cannot pause this tween ', this.state);
            return;
        }
        this.state = state_1.State.Pause;
        this.RemoveParentListener();
    }
    Resume() {
        if (this.state !== state_1.State.Pause) {
            this.Info(log_1.Log.Info, 'Cannot resume this tween ', this.state);
            return;
        }
        this.state = state_1.State.Run;
        this.parent.AddTickListener(this.tickCb);
    }
    Skip(finalValue) {
        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
            this.Info(log_1.Log.Info, 'Cannot skip this tween ', this.state);
            return;
        }
        if (this.state === state_1.State.Idle) {
            this.EmitEvent(this.eventStart);
        }
        if (finalValue) {
            const duration = this.yoyo ? (this.yoyo.value * this.duration) : 0;
            this.tickCb(this.duration - this.elapsed + duration);
            return;
        }
        this.elapsed = this.duration;
        this.Complete();
    }
    Kill() {
        if (this.state === state_1.State.Killed) {
            this.Info(log_1.Log.Info, 'Cannot kill this tween ', this.state);
            return;
        }
        this.state = state_1.State.Killed;
        this.RemoveParentListener();
        this.EmitEvent(this.eventKill);
    }
    SetLoop(loop) {
        if (!this.loop) {
            this.loop = { original: 1, value: 1 };
        }
        this.loop.original = Math.round(loop);
        this.loop.value = this.loop.original;
        return this;
    }
    SetSettings(settings) {
        this.settings = settings;
        return this;
    }
    IsIdle() {
        return this.state === state_1.State.Idle;
    }
    IsRunning() {
        return this.state === state_1.State.Run;
    }
    IsFinished() {
        return this.state === state_1.State.Killed || this.state === state_1.State.Finished;
    }
    IsPaused() {
        return this.state === state_1.State.Pause;
    }
    Complete() {
        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
            this.Info(log_1.Log.Info, 'Cannot complete this tween ', this.state);
            return;
        }
        this.state = state_1.State.Finished;
        this.RemoveParentListener();
        this.EmitEvent(this.eventComplete);
    }
    RemoveParentListener() {
        if (this.parent) {
            this.parent.RemoveTickListener(this.tickCb);
        }
    }
    CheckPosition() { }
    Validate() { }
    LoopInit() {
        this.elapsed = 0;
    }
    Info(level, message, data) {
        if (!this.settings || level > this.settings.logLevel) {
            return;
        }
        if (data) {
            console.log(message, data);
        }
        else {
            console.log(message);
        }
    }
    Emit(func, args) {
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
    EmitEvent(listeners, args) {
        if (!listeners) {
            return;
        }
        for (let i = 0; i < listeners.length; i++) {
            this.Emit(listeners[i], args);
        }
    }
    OnStart(cb) {
        if (!this.eventStart) {
            this.eventStart = new Array(0);
        }
        this.eventStart[this.eventStart.length] = cb;
        this.Info(log_1.Log.Debug, 'onStart');
        return this;
    }
    OnRestart(cb) {
        if (!this.eventRestart) {
            this.eventRestart = new Array(0);
        }
        this.eventRestart[this.eventRestart.length] = cb;
        this.Info(log_1.Log.Debug, 'onRestart');
        return this;
    }
    OnUpdate(cb) {
        if (!this.eventUpdate) {
            this.eventUpdate = new Array(0);
        }
        this.eventUpdate[this.eventUpdate.length] = cb;
        return this;
    }
    OnKilled(cb) {
        if (!this.eventKill) {
            this.eventKill = new Array(0);
        }
        this.eventKill[this.eventKill.length] = cb;
        this.Info(log_1.Log.Debug, 'onKilled');
        return this;
    }
    OnComplete(cb) {
        if (!this.eventComplete) {
            this.eventComplete = new Array(0);
        }
        this.eventComplete[this.eventComplete.length] = cb;
        this.Info(log_1.Log.Debug, 'onComplete');
        return this;
    }
}
exports.BaseTween = BaseTween;


/***/ }),

/***/ "./src/fatina/tweens/callback.ts":
/*!***************************************!*\
  !*** ./src/fatina/tweens/callback.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/fatina/tweens/baseTween.ts");
class Callback extends baseTween_1.BaseTween {
    constructor(cb) {
        super();
        this.callback = cb;
        this.tickCb = this.Tick.bind(this);
    }
    Tick(dt) {
        this.elapsed += dt;
        this.duration = 0;
        this.callback();
        this.EmitEvent(this.eventUpdate, [dt, 1]);
        this.Complete();
    }
}
exports.Callback = Callback;


/***/ }),

/***/ "./src/fatina/tweens/delay.ts":
/*!************************************!*\
  !*** ./src/fatina/tweens/delay.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/fatina/tweens/baseTween.ts");
class Delay extends baseTween_1.BaseTween {
    constructor(duration) {
        super();
        this.duration = duration;
        this.tickCb = this.Tick.bind(this);
    }
    Tick(dt) {
        this.remainsDt = dt * this.timescale;
        while (this.remainsDt > 0) {
            this.elapsed += this.remainsDt;
            const progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
            this.EmitEvent(this.eventUpdate, [this.remainsDt, progress]);
            if (this.elapsed < this.duration) {
                return;
            }
            this.remainsDt = this.elapsed - this.duration;
            if (this.loop) {
                this.loop.value--;
                if (this.loop.value !== 0) {
                    this.ResetAndStart(0);
                    continue;
                }
            }
            this.Complete();
            return;
        }
    }
}
exports.Delay = Delay;


/***/ }),

/***/ "./src/fatina/tweens/sequence.ts":
/*!***************************************!*\
  !*** ./src/fatina/tweens/sequence.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __webpack_require__(/*! ../core/enum/log */ "./src/fatina/core/enum/log.ts");
const state_1 = __webpack_require__(/*! ../core/enum/state */ "./src/fatina/core/enum/state.ts");
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/fatina/tweens/baseTween.ts");
const callback_1 = __webpack_require__(/*! ./callback */ "./src/fatina/tweens/callback.ts");
const delay_1 = __webpack_require__(/*! ./delay */ "./src/fatina/tweens/delay.ts");
class Sequence extends baseTween_1.BaseTween {
    constructor(tweens) {
        super();
        this.eventTick = [];
        this.tweens = [];
        this.sequenceIndex = 0;
        this.tickCb = this.Tick.bind(this);
        if (tweens) {
            this.tweens = new Array(tweens.length);
            for (let i = 0; i < tweens.length; i++) {
                tweens[i].SetParent(this);
                this.tweens[i] = [tweens[i]];
            }
        }
    }
    get Count() {
        return this.tweens.length;
    }
    LoopInit() {
        this.sequenceIndex = 0;
        for (let i = 0; i < this.tweens.length; i++) {
            const tweenArray = this.tweens[i];
            for (let j = 0; j < tweenArray.length; j++) {
                tweenArray[j].Reset();
            }
        }
    }
    AddTickListener(cb) {
        this.eventTick.unshift(cb);
    }
    RemoveTickListener(cb) {
        const index = this.eventTick.indexOf(cb);
        if (index !== -1) {
            this.eventTick.splice(index, 1);
        }
    }
    Tick(dt) {
        if (this.state === state_1.State.Finished || this.state === state_1.State.Killed) {
            return;
        }
        const localDt = dt * this.timescale;
        this.elapsed += localDt;
        this.LocalTick(localDt);
    }
    LocalTick(dt, remains) {
        if (!this.currentTween) {
            this.NextTween();
        }
        if (this.currentTween) {
            for (let i = this.eventTick.length - 1; i >= 0; i--) {
                this.eventTick[i](dt);
            }
            if (remains !== true) {
                this.EmitEvent(this.eventUpdate, [dt, 0]);
            }
        }
        let remainsDt = dt;
        if (this.currentTween) {
            for (let i = 0; i < this.currentTween.length; i++) {
                if (this.currentTween[i].state !== state_1.State.Finished) {
                    return;
                }
            }
            const first = this.currentTween[0];
            remainsDt = first.elapsed - first.duration;
            this.EmitEvent(this.eventStepEnd, [this.currentTween[0]]);
            this.Info(log_1.Log.Debug, 'OnStepEnd', this.eventStepEnd);
            this.currentTween = undefined;
            this.sequenceIndex++;
            if (remainsDt > 0.01) {
                this.LocalTick(remainsDt, true);
                return;
            }
        }
        if (!this.currentTween && this.tweens.length === this.sequenceIndex) {
            if (this.loop) {
                this.loop.value--;
                if (this.loop.value !== 0) {
                    this.ResetAndStart(remainsDt);
                    return;
                }
            }
            this.Complete();
        }
    }
    NextTween() {
        this.currentTween = this.tweens[this.sequenceIndex];
        if (this.currentTween) {
            for (let i = 0; i < this.currentTween.length; i++) {
                const tween = this.currentTween[i];
                tween.Start();
            }
            this.EmitEvent(this.eventStepStart, [this.currentTween[0]]);
            this.Info(log_1.Log.Debug, 'OnStepStart', this.eventStepStart);
        }
    }
    Append(tween) {
        tween.SetParent(this);
        this.tweens[this.tweens.length] = [tween];
        return this;
    }
    AppendCallback(cb) {
        const playable = new callback_1.Callback(cb);
        playable.SetParent(this);
        this.tweens[this.tweens.length] = [playable];
        return this;
    }
    AppendInterval(duration) {
        const playable = new delay_1.Delay(duration);
        playable.SetParent(this);
        this.tweens[this.tweens.length] = [playable];
        return this;
    }
    Prepend(tween) {
        tween.SetParent(this);
        this.tweens.unshift([tween]);
        return this;
    }
    PrependCallback(cb) {
        const playable = new callback_1.Callback(cb);
        playable.SetParent(this);
        this.tweens.unshift([playable]);
        return this;
    }
    PrependInterval(duration) {
        const playable = new delay_1.Delay(duration);
        playable.SetParent(this);
        this.tweens.unshift([playable]);
        return this;
    }
    Skip(finalValue) {
        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
            this.Info(log_1.Log.Info, 'Cannot skip this tween ', this.state);
            return;
        }
        for (let i = 0; i < this.tweens.length; i++) {
            const tweenArray = this.tweens[i];
            for (let j = 0; j < tweenArray.length; j++) {
                const tween = tweenArray[j];
                if (tween.elapsed === 0) {
                    this.EmitEvent(this.eventStepStart, [tween]);
                    this.Info(log_1.Log.Debug, 'OnStepStart', this.eventStepStart);
                }
                tween.Skip(finalValue);
                this.EmitEvent(this.eventStepEnd, [tween]);
                this.Info(log_1.Log.Debug, 'OnStepEnd', this.eventStepEnd);
            }
        }
        super.Skip();
    }
    Kill() {
        if (this.state === state_1.State.Killed) {
            this.Info(log_1.Log.Info, 'Cannot kill this tween ', this.state);
            return;
        }
        for (let i = 0; i < this.tweens.length; i++) {
            const tweenArray = this.tweens[i];
            for (let j = 0; j < tweenArray.length; j++) {
                tweenArray[j].Kill();
            }
        }
        super.Kill();
    }
    Join(tween) {
        if (this.tweens.length === 0) {
            return this.Append(tween);
        }
        tween.SetParent(this);
        this.tweens[this.tweens.length - 1].push(tween);
        return this;
    }
    OnStepStart(cb) {
        if (!this.eventStepStart) {
            this.eventStepStart = new Array(0);
        }
        this.eventStepStart[this.eventStepStart.length] = cb;
        return this;
    }
    OnStepEnd(cb) {
        if (!this.eventStepEnd) {
            this.eventStepEnd = new Array(0);
        }
        this.eventStepEnd[this.eventStepEnd.length] = cb;
        return this;
    }
}
exports.Sequence = Sequence;


/***/ }),

/***/ "./src/fatina/tweens/tween.ts":
/*!************************************!*\
  !*** ./src/fatina/tweens/tween.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(/*! ../core/enum/state */ "./src/fatina/core/enum/state.ts");
const easing_1 = __webpack_require__(/*! ../easing/easing */ "./src/fatina/easing/easing.ts");
const easingType_1 = __webpack_require__(/*! ../easing/easingType */ "./src/fatina/easing/easingType.ts");
const baseTween_1 = __webpack_require__(/*! ./baseTween */ "./src/fatina/tweens/baseTween.ts");
const sequence_1 = __webpack_require__(/*! ./sequence */ "./src/fatina/tweens/sequence.ts");
class Tween extends baseTween_1.BaseTween {
    constructor(object, properties) {
        super();
        this.steps = 0;
        this.relative = false;
        this.object = object;
        this.properties = properties;
        this.tickCb = this.Tick.bind(this);
    }
    Init(object, properties) {
        this.object = object;
        this.properties = properties;
    }
    Validate() {
        if (!this.object) {
            throw new Error('Cant Tween a undefined object');
        }
        for (let i = 0; i < this.properties.length; i++) {
            const prop = this.properties[i];
            if (!(prop in this.object)) {
                throw new Error('Cant Tween an unknown property' + prop);
            }
        }
        if (!this.parent) {
            throw new Error('Cant Start a tween without ticker');
        }
        if (!this.ease) {
            this.easeId = easingType_1.EasingType.Linear;
            this.ease = easing_1.easeNames[easingType_1.EasingType.Linear];
        }
        this.CheckPosition();
    }
    CheckPosition() {
        if (!this.currentFrom) {
            this.currentFrom = {};
        }
        if (!this.currentTo) {
            this.currentTo = {};
        }
        for (let i = 0; i < this.properties.length; i++) {
            const prop = this.properties[i];
            if (!this.from) {
                this.currentFrom[prop] = this.object[prop];
            }
            else {
                this.currentFrom[prop] = this.from[prop];
                this.object[prop] = this.from[prop];
            }
            if (this.relative) {
                this.currentTo[prop] = this.object[prop] + this.to[prop];
            }
            else {
                this.currentTo[prop] = this.to[prop];
            }
        }
    }
    Tick(dt) {
        if (this.state === state_1.State.Finished || this.state === state_1.State.Killed) {
            return;
        }
        this.remainsDt = dt * this.timescale;
        while (this.remainsDt > 0) {
            this.elapsed += this.remainsDt;
            const progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
            let val = this.ease(progress);
            if (this.yoyo && (this.yoyo.original - this.yoyo.value) % 2 === 1) {
                val = 1 - this.ease(1 - progress);
            }
            if (this.steps !== 0) {
                val = Math.round(val * this.steps) / this.steps;
            }
            if (this.object) {
                for (let i = 0; i < this.properties.length; i++) {
                    const prop = this.properties[i];
                    this.object[prop] = this.currentFrom[prop] + (this.currentTo[prop] - this.currentFrom[prop]) * val;
                }
            }
            this.EmitEvent(this.eventUpdate, [this.remainsDt, progress]);
            if (this.elapsed < this.duration) {
                return;
            }
            this.remainsDt = this.elapsed - this.duration;
            if (this.yoyo && this.yoyo.value > 0) {
                this.Reverse();
                this.ResetAndStart(0);
                this.yoyo.value--;
                continue;
            }
            if (this.loop) {
                this.loop.value--;
                if (this.loop.value !== 0) {
                    this.CheckPosition();
                    this.ResetAndStart(0);
                    continue;
                }
            }
            this.Complete();
            return;
        }
    }
    From(from) {
        this.from = from;
        return this;
    }
    To(to, duration) {
        this.to = to;
        this.duration = duration;
        return this;
    }
    SetRelative(relative) {
        this.relative = relative;
        return this;
    }
    Modify(diff, updateTo) {
        for (let i = 0; i < this.properties.length; i++) {
            const prop = this.properties[i];
            if (!diff.hasOwnProperty(prop)) {
                continue;
            }
            this.object[prop] += diff[prop];
            if (updateTo) {
                this.currentTo[prop] += diff[prop];
            }
            else {
                this.currentFrom[prop] += diff[prop];
            }
        }
    }
    Reset(skipParent) {
        if (this.yoyo) {
            if ((this.yoyo.original - this.yoyo.value) % 2 === 1) {
                let previous = this.currentFrom;
                this.currentFrom = this.currentTo;
                this.currentTo = previous;
                previous = this.from;
                this.from = this.to;
                this.to = previous;
                const elapsed = (1 - (this.elapsed / this.duration)) * this.duration;
                this.elapsed = Math.round(elapsed * 1000) / 1000;
            }
            this.yoyo.value = this.yoyo.original;
        }
        super.Reset(skipParent);
    }
    Reverse() {
        let previous = this.currentFrom;
        this.currentFrom = this.currentTo;
        this.currentTo = previous;
        previous = this.from;
        this.from = this.to;
        this.to = previous;
        const elapsed = (1 - (this.elapsed / this.duration)) * this.duration;
        this.elapsed = Math.round(elapsed * 1000) / 1000;
        if (this.state === state_1.State.Finished) {
            this.Reset(true);
            this.Start();
        }
    }
    Yoyo(time) {
        if (!this.yoyo) {
            this.yoyo = { original: 0, value: 0 };
        }
        this.yoyo.original = time;
        this.yoyo.value = time;
        return this;
    }
    SetSteps(steps) {
        this.steps = steps;
        return this;
    }
    ToSequence() {
        if (!this.parent) {
            throw new Error('Cant convert to a sequence, parent ticker not defined');
        }
        return new sequence_1.Sequence().SetParent(this.parent).Append(this);
    }
    Easing(type) {
        const name = type;
        if (name in easing_1.easeNames) {
            return easing_1.easeNames[name];
        }
        throw new Error('Unknown ease method ' + type);
    }
    SetEasing(type) {
        this.easeId = type;
        this.ease = this.Easing(type);
        return this;
    }
    LoopInit() {
        this.elapsed = 0;
    }
}
exports.Tween = Tween;


/***/ })

/******/ });
});
//# sourceMappingURL=fatina.js.map