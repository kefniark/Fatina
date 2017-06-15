(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Fatina", [], factory);
	else if(typeof exports === 'object')
		exports["Fatina"] = factory();
	else
		root["Fatina"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var sequence_1 = __webpack_require__(1);
	var tween_1 = __webpack_require__(6);
	var ticker_1 = __webpack_require__(9);
	var tickerManager;
	var initialized = false;
	var isFirstUpdate = true;
	var lastFrame;
	var lastTime = 0;
	var tickers = {};
	exports.time = 0;
	function Elapsed() {
	    return tickerManager.elapsed;
	}
	exports.Elapsed = Elapsed;
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
	    tickerManager.SetTimescale(scale);
	}
	exports.SetTimescale = SetTimescale;
	function Pause() {
	    tickerManager.Pause();
	}
	exports.Pause = Pause;
	function Resume() {
	    tickerManager.Resume();
	}
	exports.Resume = Resume;
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
	    if (!initialized) {
	        Init();
	    }
	    return new tween_1.Tween(obj, properties).SetParent(tickerManager);
	}
	exports.Tween = Tween;
	function Sequence() {
	    if (!initialized) {
	        Init();
	    }
	    return new sequence_1.Sequence().SetParent(tickerManager);
	}
	exports.Sequence = Sequence;
	function Ticker(name) {
	    if (!initialized) {
	        Init();
	    }
	    if (!(name in tickers)) {
	        var tick = new ticker_1.Ticker();
	        var handler = tick.Tick.bind(tick);
	        tick.SetParent(tickerManager, handler);
	        tickerManager.AddTickListener(handler);
	        tick.Start();
	        tickers[name] = tick;
	    }
	    return tickers[name];
	}
	exports.Ticker = Ticker;
	var requestFrame;
	var cancelFrame;
	if (typeof (window) !== 'undefined') {
	    requestFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	    cancelFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	}
	function updateLoop(timestamp) {
	    var dt = timestamp - lastTime;
	    if (isFirstUpdate) {
	        dt = 1;
	        isFirstUpdate = false;
	    }
	    if (dt > 500) {
	        console.warn('[Fatina] Delta between two update was too high ' + Math.round(dt) + 'ms. , Capped to 500ms.');
	        dt = 500;
	    }
	    Update(dt);
	    lastTime = timestamp;
	    lastFrame = requestFrame(updateLoop);
	}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var baseTween_1 = __webpack_require__(2);
	var callback_1 = __webpack_require__(4);
	var delay_1 = __webpack_require__(5);
	var state_1 = __webpack_require__(3);
	var Sequence = (function (_super) {
	    __extends(Sequence, _super);
	    function Sequence() {
	        var _this = _super.call(this) || this;
	        _this.eventTick = [];
	        _this.tweens = [];
	        _this.sequenceIndex = 0;
	        _this.tickCb = _this.Tick.bind(_this);
	        return _this;
	    }
	    Sequence.prototype.Start = function () {
	        _super.prototype.Start.call(this);
	        return this;
	    };
	    Sequence.prototype.LoopInit = function () {
	        this.sequenceIndex = 0;
	        for (var i = 0; i < this.tweens.length; i++) {
	            var tweenArray = this.tweens[i];
	            for (var j = 0; j < tweenArray.length; j++) {
	                var tween = tweenArray[j];
	                tween.Reset();
	            }
	        }
	    };
	    Sequence.prototype.SetParent = function (ticker) {
	        _super.prototype.SetParent.call(this, ticker);
	        return this;
	    };
	    Sequence.prototype.AddTickListener = function (cb) {
	        this.eventTick.unshift(cb);
	    };
	    Sequence.prototype.RemoveTickListener = function (cb) {
	        var index = this.eventTick.indexOf(cb);
	        if (index !== -1) {
	            this.eventTick.splice(index, 1);
	        }
	    };
	    Sequence.prototype.Tick = function (dt) {
	        if (this.state === state_1.State.Finished || this.state === state_1.State.Killed) {
	            return;
	        }
	        var localDt = dt * this.timescale;
	        this.elapsed += localDt;
	        this.LocalTick(localDt);
	    };
	    Sequence.prototype.LocalTick = function (dt, remains) {
	        if (!this.currentTween) {
	            this.NextTween();
	        }
	        if (this.currentTween) {
	            for (var i = this.eventTick.length - 1; i >= 0; i--) {
	                this.eventTick[i](dt);
	            }
	            if (remains !== true) {
	                this.EmitEvent(this.eventUpdate, [dt, 0]);
	            }
	        }
	        var remainsDt = dt;
	        if (this.currentTween) {
	            for (var i = 0; i < this.currentTween.length; i++) {
	                if (this.currentTween[i].state !== state_1.State.Finished) {
	                    return;
	                }
	            }
	            var first = this.currentTween[0];
	            remainsDt = first.elapsed - first.duration;
	            this.EmitEvent(this.eventStepEnd, [this.currentTween[0]]);
	            this.currentTween = undefined;
	            this.sequenceIndex++;
	            if (remainsDt > 0.01) {
	                this.LocalTick(remainsDt, true);
	                return;
	            }
	        }
	        if (!this.currentTween && this.tweens.length === this.sequenceIndex) {
	            this.loop--;
	            if (this.loop === 0) {
	                this.Complete();
	            }
	            else {
	                this.ResetAndStart(remainsDt);
	            }
	        }
	    };
	    Sequence.prototype.NextTween = function () {
	        this.currentTween = this.tweens[this.sequenceIndex];
	        if (this.currentTween) {
	            for (var i = 0; i < this.currentTween.length; i++) {
	                var tween = this.currentTween[i];
	                tween.Start();
	            }
	            this.EmitEvent(this.eventStepStart, [this.currentTween[0]]);
	        }
	    };
	    Sequence.prototype.Append = function (tween) {
	        tween.SetParent(this);
	        this.tweens[this.tweens.length] = [tween];
	        return this;
	    };
	    Sequence.prototype.AppendCallback = function (cb) {
	        var playable = new callback_1.Callback(cb);
	        playable.SetParent(this);
	        this.tweens[this.tweens.length] = [playable];
	        return this;
	    };
	    Sequence.prototype.AppendInterval = function (duration) {
	        var playable = new delay_1.Delay(duration);
	        playable.SetParent(this);
	        this.tweens[this.tweens.length] = [playable];
	        return this;
	    };
	    Sequence.prototype.Prepend = function (tween) {
	        tween.SetParent(this);
	        this.tweens.unshift([tween]);
	        return this;
	    };
	    Sequence.prototype.PrependCallback = function (cb) {
	        var playable = new callback_1.Callback(cb);
	        playable.SetParent(this);
	        this.tweens.unshift([playable]);
	        return this;
	    };
	    Sequence.prototype.PrependInterval = function (duration) {
	        var playable = new delay_1.Delay(duration);
	        playable.SetParent(this);
	        this.tweens.unshift([playable]);
	        return this;
	    };
	    Sequence.prototype.Skip = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant skip this tween', this.state);
	            return;
	        }
	        for (var i = 0; i < this.tweens.length; i++) {
	            var tweenArray = this.tweens[i];
	            for (var j = 0; j < tweenArray.length; j++) {
	                var tween = tweenArray[j];
	                if (tween.state === state_1.State.Killed || tween.state === state_1.State.Finished) {
	                    continue;
	                }
	                if (tween.elapsed === 0) {
	                    this.EmitEvent(this.eventStepStart, [tween]);
	                }
	                tween.Skip();
	                this.EmitEvent(this.eventStepEnd, [tween]);
	            }
	        }
	        _super.prototype.Skip.call(this);
	    };
	    Sequence.prototype.Kill = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant kill this tween', this.state);
	            return;
	        }
	        for (var i = 0; i < this.tweens.length; i++) {
	            var tweenArray = this.tweens[i];
	            for (var j = 0; j < tweenArray.length; j++) {
	                var tween = tweenArray[j];
	                if (tween.state === state_1.State.Killed || tween.state === state_1.State.Finished) {
	                    continue;
	                }
	                tween.Kill();
	            }
	        }
	        _super.prototype.Kill.call(this);
	    };
	    Sequence.prototype.Join = function (tween) {
	        if (this.tweens.length === 0) {
	            return this.Append(tween);
	        }
	        tween.SetParent(this);
	        this.tweens[this.tweens.length - 1].push(tween);
	        return this;
	    };
	    Sequence.prototype.SetTimescale = function (scale) {
	        this.timescale = scale;
	        return this;
	    };
	    Sequence.prototype.SetLoop = function (loop) {
	        this.loop = Math.round(loop);
	        return this;
	    };
	    Sequence.prototype.Default = function () {
	        _super.prototype.Default.call(this);
	        this.tweens.length = 0;
	        this.currentTween = undefined;
	        this.sequenceIndex = 0;
	    };
	    Sequence.prototype.OnStart = function (cb) {
	        if (!this.eventStart) {
	            this.eventStart = new Array(0);
	        }
	        this.eventStart[this.eventStart.length] = cb;
	        return this;
	    };
	    Sequence.prototype.OnUpdate = function (cb) {
	        if (!this.eventUpdate) {
	            this.eventUpdate = new Array(0);
	        }
	        this.eventUpdate[this.eventUpdate.length] = cb;
	        return this;
	    };
	    Sequence.prototype.OnKilled = function (cb) {
	        if (!this.eventKill) {
	            this.eventKill = new Array(0);
	        }
	        this.eventKill[this.eventKill.length] = cb;
	        return this;
	    };
	    Sequence.prototype.OnComplete = function (cb) {
	        if (!this.eventComplete) {
	            this.eventComplete = new Array(0);
	        }
	        this.eventComplete[this.eventComplete.length] = cb;
	        return this;
	    };
	    Sequence.prototype.OnStepStart = function (cb) {
	        if (!this.eventStepStart) {
	            this.eventStepStart = new Array(0);
	        }
	        this.eventStepStart[this.eventStepStart.length] = cb;
	        return this;
	    };
	    Sequence.prototype.OnStepEnd = function (cb) {
	        if (!this.eventStepEnd) {
	            this.eventStepEnd = new Array(0);
	        }
	        this.eventStepEnd[this.eventStepEnd.length] = cb;
	        return this;
	    };
	    return Sequence;
	}(baseTween_1.BaseTween));
	exports.Sequence = Sequence;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var state_1 = __webpack_require__(3);
	var BaseTween = (function () {
	    function BaseTween() {
	        this.elapsed = 0;
	        this.duration = 0;
	        this.timescale = 1;
	        this.loop = 1;
	        this.state = state_1.State.Idle;
	        this.firstStart = true;
	    }
	    BaseTween.prototype.Start = function () {
	        if (this.state !== state_1.State.Idle) {
	            console.warn('cant start this tween', this.state);
	            return;
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
	    };
	    BaseTween.prototype.Reset = function () {
	        this.state = state_1.State.Idle;
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.loop = 1;
	        this.LoopInit();
	    };
	    BaseTween.prototype.ResetAndStart = function (dtRemains) {
	        this.LoopInit();
	        this.state = state_1.State.Run;
	        if (dtRemains > 0) {
	            this.tickCb(dtRemains);
	        }
	    };
	    BaseTween.prototype.Pause = function () {
	        if (this.state !== state_1.State.Run) {
	            console.warn('cant pause this tween', this.state);
	            return;
	        }
	        this.state = state_1.State.Pause;
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	    };
	    BaseTween.prototype.Resume = function () {
	        if (this.state !== state_1.State.Pause) {
	            console.warn('cant resume this tween', this.state);
	            return;
	        }
	        this.state = state_1.State.Run;
	        this.parent.AddTickListener(this.tickCb);
	    };
	    BaseTween.prototype.Skip = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant skip this tween', this.state);
	            return;
	        }
	        if (this.state === state_1.State.Idle) {
	            this.EmitEvent(this.eventStart);
	        }
	        this.elapsed = this.duration;
	        this.Complete();
	    };
	    BaseTween.prototype.Complete = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant complete this tween', this.state);
	            return;
	        }
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.state = state_1.State.Finished;
	        this.EmitEvent(this.eventComplete);
	    };
	    BaseTween.prototype.Kill = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant kill this tween', this.state);
	            return;
	        }
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.state = state_1.State.Killed;
	        this.EmitEvent(this.eventKill);
	    };
	    BaseTween.prototype.CheckPosition = function () { };
	    BaseTween.prototype.Validate = function () { };
	    BaseTween.prototype.LoopInit = function () {
	        this.elapsed = 0;
	    };
	    BaseTween.prototype.SetParent = function (ticker) {
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.parent = ticker;
	    };
	    BaseTween.prototype.Default = function () {
	        this.elapsed = 0;
	        this.duration = 0;
	        this.timescale = 1;
	        this.loop = 1;
	        this.firstStart = true;
	        this.state = state_1.State.Idle;
	    };
	    BaseTween.prototype.Emit = function (func, args) {
	        try {
	            func.apply(this, args);
	        }
	        catch (e) {
	            console.warn(e);
	        }
	    };
	    BaseTween.prototype.EmitEvent = function (listeners, args) {
	        if (!listeners) {
	            return;
	        }
	        for (var i = 0; i < listeners.length; i++) {
	            this.Emit(listeners[i], args);
	        }
	    };
	    return BaseTween;
	}());
	exports.BaseTween = BaseTween;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var baseTween_1 = __webpack_require__(2);
	var Callback = (function (_super) {
	    __extends(Callback, _super);
	    function Callback(cb) {
	        var _this = _super.call(this) || this;
	        _this.callback = cb;
	        _this.tickCb = _this.Tick.bind(_this);
	        return _this;
	    }
	    Callback.prototype.Tick = function (dt) {
	        this.elapsed += dt;
	        this.duration = 0;
	        this.callback();
	        this.EmitEvent(this.eventUpdate, [dt, 1]);
	        this.Complete();
	    };
	    return Callback;
	}(baseTween_1.BaseTween));
	exports.Callback = Callback;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var baseTween_1 = __webpack_require__(2);
	var Delay = (function (_super) {
	    __extends(Delay, _super);
	    function Delay(duration) {
	        var _this = _super.call(this) || this;
	        _this.duration = duration;
	        _this.tickCb = _this.Tick.bind(_this);
	        return _this;
	    }
	    Delay.prototype.Tick = function (dt) {
	        this.elapsed += dt;
	        var progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
	        this.EmitEvent(this.eventUpdate, [dt, progress]);
	        if (this.elapsed >= this.duration) {
	            this.Complete();
	        }
	    };
	    return Delay;
	}(baseTween_1.BaseTween));
	exports.Delay = Delay;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var baseTween_1 = __webpack_require__(2);
	var easing_1 = __webpack_require__(7);
	var sequence_1 = __webpack_require__(1);
	var state_1 = __webpack_require__(3);
	var easingType_1 = __webpack_require__(8);
	var Tween = (function (_super) {
	    __extends(Tween, _super);
	    function Tween(object, properties) {
	        var _this = _super.call(this) || this;
	        _this.relative = false;
	        _this.object = object;
	        _this.properties = properties;
	        _this.tickCb = _this.Tick.bind(_this);
	        return _this;
	    }
	    Tween.prototype.Init = function (object, properties) {
	        this.object = object;
	        this.properties = properties;
	    };
	    Tween.prototype.Start = function () {
	        _super.prototype.Start.call(this);
	        return this;
	    };
	    Tween.prototype.Validate = function () {
	        if (!this.object) {
	            throw new Error('Cant Tween a undefined object');
	        }
	        for (var i = 0; i < this.properties.length; i++) {
	            var prop = this.properties[i];
	            if (!(prop in this.object)) {
	                throw new Error('Cant Tween an unknown property' + prop);
	            }
	        }
	        if (!this.parent) {
	            throw new Error('Cant Start a tween without ticker');
	        }
	        if (!this.ease) {
	            this.ease = easing_1.easeTypes[easingType_1.EasingType.Linear];
	        }
	        this.CheckPosition();
	    };
	    Tween.prototype.CheckPosition = function () {
	        if (!this.currentFrom) {
	            this.currentFrom = {};
	        }
	        if (!this.currentTo) {
	            this.currentTo = {};
	        }
	        for (var i = 0; i < this.properties.length; i++) {
	            var prop = this.properties[i];
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
	    };
	    Tween.prototype.Tick = function (dt) {
	        if (this.state === state_1.State.Finished || this.state === state_1.State.Killed) {
	            return;
	        }
	        this.remainsDt = dt * this.timescale;
	        while (this.remainsDt > 0) {
	            this.elapsed += this.remainsDt;
	            var progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
	            var val = this.ease(progress);
	            for (var i = 0; i < this.properties.length; i++) {
	                var prop = this.properties[i];
	                this.object[prop] = this.currentFrom[prop] + (this.currentTo[prop] - this.currentFrom[prop]) * val;
	            }
	            this.EmitEvent(this.eventUpdate, [this.remainsDt, progress]);
	            if (this.elapsed < this.duration) {
	                return;
	            }
	            this.remainsDt = this.elapsed - this.duration;
	            this.loop--;
	            if (this.loop === 0) {
	                this.Complete();
	                return;
	            }
	            this.CheckPosition();
	            this.ResetAndStart(0);
	        }
	    };
	    Tween.prototype.SetParent = function (ticker) {
	        _super.prototype.SetParent.call(this, ticker);
	        return this;
	    };
	    Tween.prototype.From = function (from) {
	        this.from = from;
	        return this;
	    };
	    Tween.prototype.To = function (to, duration) {
	        this.to = to;
	        this.duration = duration;
	        return this;
	    };
	    Tween.prototype.SetLoop = function (loop) {
	        this.loop = Math.round(loop);
	        return this;
	    };
	    Tween.prototype.SetRelative = function (relative) {
	        this.relative = relative;
	        return this;
	    };
	    Tween.prototype.SetTimescale = function (scale) {
	        this.timescale = scale;
	        return this;
	    };
	    Tween.prototype.Modify = function (diff, updateTo) {
	        for (var i = 0; i < this.properties.length; i++) {
	            var prop = this.properties[i];
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
	    };
	    Tween.prototype.ToSequence = function () {
	        if (!this.parent) {
	            throw new Error('Cant convert to a sequence, parent ticker not defined');
	        }
	        return new sequence_1.Sequence().SetParent(this.parent).Append(this);
	    };
	    Tween.prototype.Easing = function (type) {
	        var name = type;
	        var isNumber = !isNaN(parseFloat(name));
	        if (isNumber) {
	            var index = parseInt(name, 10);
	            if (index in easing_1.easeTypes) {
	                return easing_1.easeTypes[index];
	            }
	        }
	        if (name in easing_1.easeNames) {
	            return easing_1.easeNames[name];
	        }
	        throw new Error('Unknown ease method ' + type);
	    };
	    Tween.prototype.SetEasing = function (type) {
	        this.ease = this.Easing(type);
	        return this;
	    };
	    Tween.prototype.LoopInit = function () {
	        this.elapsed = 0;
	    };
	    Tween.prototype.Default = function () {
	        _super.prototype.Default.call(this);
	        this.object = undefined;
	        this.properties.length = 0;
	        this.from = undefined;
	        this.to = undefined;
	        this.currentFrom = undefined;
	        this.currentTo = undefined;
	        this.relative = false;
	    };
	    Tween.prototype.OnStart = function (cb) {
	        if (!this.eventStart) {
	            this.eventStart = new Array(0);
	        }
	        this.eventStart[this.eventStart.length] = cb;
	        return this;
	    };
	    Tween.prototype.OnUpdate = function (cb) {
	        if (!this.eventUpdate) {
	            this.eventUpdate = new Array(0);
	        }
	        this.eventUpdate[this.eventUpdate.length] = cb;
	        return this;
	    };
	    Tween.prototype.OnKilled = function (cb) {
	        if (!this.eventKill) {
	            this.eventKill = new Array(0);
	        }
	        this.eventKill[this.eventKill.length] = cb;
	        return this;
	    };
	    Tween.prototype.OnComplete = function (cb) {
	        if (!this.eventComplete) {
	            this.eventComplete = new Array(0);
	        }
	        this.eventComplete[this.eventComplete.length] = cb;
	        return this;
	    };
	    return Tween;
	}(baseTween_1.BaseTween));
	exports.Tween = Tween;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var easingType_1 = __webpack_require__(8);
	var PI = Math.PI;
	var PI_OVER_TWO = Math.PI / 2;
	var BACK = 1.70158;
	var easingByType = [];
	var easingByName = {};
	easingByType[easingType_1.EasingType.Linear] = easingByName['linear'] = function (t) {
	    return t;
	};
	easingByType[easingType_1.EasingType.InQuad] = easingByName['inQuad'] = function (t) {
	    return t * t;
	};
	easingByType[easingType_1.EasingType.OutQuad] = easingByName['outQuad'] = function (t) {
	    return 2 * t - t * t;
	};
	easingByType[easingType_1.EasingType.InOutQuad] = easingByName['inOutQuad'] = function (t) {
	    if (t < 0.5) {
	        return 2 * t * t;
	    }
	    else {
	        return 2 * (2 * t - t * t) - 1;
	    }
	};
	easingByType[easingType_1.EasingType.InCubic] = easingByName['inCubic'] = function (t) {
	    return t * t * t;
	};
	easingByType[easingType_1.EasingType.OutCubic] = easingByName['outCubic'] = function (t) {
	    return 3 * t - 3 * t * t + t * t * t;
	};
	easingByType[easingType_1.EasingType.InOutCubic] = easingByName['inOutCubic'] = function (t) {
	    if (t < 0.5) {
	        return 4 * t * t * t;
	    }
	    else {
	        return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
	    }
	};
	easingByType[easingType_1.EasingType.InQuart] = easingByName['inQuart'] = function (t) {
	    return t * t * t * t;
	};
	easingByType[easingType_1.EasingType.OutQuart] = easingByName['outQuart'] = function (t) {
	    var t2 = t * t;
	    return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
	};
	easingByType[easingType_1.EasingType.InOutQuart] = easingByName['inOutQuart'] = function (t) {
	    if (t < 0.5) {
	        return 8 * t * t * t * t;
	    }
	    else {
	        var t2 = t * t;
	        return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
	    }
	};
	easingByType[easingType_1.EasingType.InSine] = easingByName['inSine'] = function (t) {
	    if (t === 1) {
	        return 1;
	    }
	    return 1 - Math.cos(PI_OVER_TWO * t);
	};
	easingByType[easingType_1.EasingType.OutSine] = easingByName['outSine'] = function (t) {
	    return Math.sin(PI_OVER_TWO * t);
	};
	easingByType[easingType_1.EasingType.InOutSine] = easingByName['inOutSine'] = function (t) {
	    if (t < 0.5) {
	        return (1 - Math.cos(PI * t)) / 2;
	    }
	    else {
	        return (1 + Math.sin(PI * (t - 0.5))) / 2;
	    }
	};
	easingByType[easingType_1.EasingType.InCirc] = easingByName['inCirc'] = function (t) {
	    return 1 - Math.sqrt(1 - Math.pow(t, 2));
	};
	easingByType[easingType_1.EasingType.OutCirc] = easingByName['outCirc'] = function (t) {
	    return Math.sqrt(1 - Math.pow(1 - t, 2));
	};
	easingByType[easingType_1.EasingType.InOutCirc] = easingByName['inOutCirc'] = function (t) {
	    if (t < 0.5) {
	        return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
	    }
	    else {
	        return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
	    }
	};
	easingByType[easingType_1.EasingType.InQuint] = easingByName['inQuint'] = function (t) {
	    return t * t * t * t * t;
	};
	easingByType[easingType_1.EasingType.OutQuint] = easingByName['outQuint'] = function (t) {
	    return --t * t * t * t * t + 1;
	};
	easingByType[easingType_1.EasingType.InOutQuint] = easingByName['inOutQuint'] = function (t) {
	    if ((t *= 2) < 1) {
	        return 0.5 * t * t * t * t * t;
	    }
	    return 0.5 * ((t -= 2) * t * t * t * t + 2);
	};
	easingByType[easingType_1.EasingType.InExponential] = easingByName['inExponential'] = function (t) {
	    if (t === 1) {
	        return 1;
	    }
	    return t === 0 ? 0 : Math.pow(1024, t - 1);
	};
	easingByType[easingType_1.EasingType.OutExponential] = easingByName['outExponential'] = function (t) {
	    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
	};
	easingByType[easingType_1.EasingType.InOutExponential] = easingByName['inOutExponential'] = function (t) {
	    if (t === 0) {
	        return 0;
	    }
	    if (t === 1) {
	        return 1;
	    }
	    if ((t *= 2) < 1) {
	        return 0.5 * Math.pow(1024, t - 1);
	    }
	    return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
	};
	easingByType[easingType_1.EasingType.InElastic] = easingByName['inElastic'] = function (t) {
	    if (t === 0) {
	        return 0;
	    }
	    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
	};
	easingByType[easingType_1.EasingType.OutElastic] = easingByName['outElastic'] = function (t) {
	    if (t === 1) {
	        return 1;
	    }
	    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
	};
	easingByType[easingType_1.EasingType.InOutElastic] = easingByName['inOutElastic'] = function (t) {
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
	easingByType[easingType_1.EasingType.InBack] = easingByName['inBack'] = function (t) {
	    var s = BACK;
	    return t === 1 ? 1 : t * t * ((s + 1) * t - s);
	};
	easingByType[easingType_1.EasingType.OutBack] = easingByName['outBack'] = function (t) {
	    var s = BACK;
	    return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1;
	};
	easingByType[easingType_1.EasingType.InOutBack] = easingByName['inOutBack'] = function (t) {
	    var s = BACK * 1.525;
	    if ((t *= 2) < 1) {
	        return 0.5 * (t * t * ((s + 1) * t - s));
	    }
	    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
	};
	easingByType[easingType_1.EasingType.OutBounce] = easingByName['outBounce'] = function (t) {
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
	easingByType[easingType_1.EasingType.InBounce] = easingByName['inBounce'] = function (t) {
	    return 1 - easingByType[easingType_1.EasingType.OutBounce](1 - t);
	};
	easingByType[easingType_1.EasingType.InOutBounce] = easingByName['inOutBounce'] = function (t) {
	    if (t < 0.5) {
	        return easingByType[easingType_1.EasingType.InBounce](t * 2) * 0.5;
	    }
	    return easingByType[easingType_1.EasingType.OutBounce](t * 2 - 1) * 0.5 + 0.5;
	};
	exports.easeTypes = easingByType;
	exports.easeNames = easingByName;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var EasingType;
	(function (EasingType) {
	    EasingType[EasingType["Linear"] = 0] = "Linear";
	    EasingType[EasingType["InQuad"] = 1] = "InQuad";
	    EasingType[EasingType["OutQuad"] = 2] = "OutQuad";
	    EasingType[EasingType["InOutQuad"] = 3] = "InOutQuad";
	    EasingType[EasingType["InCubic"] = 4] = "InCubic";
	    EasingType[EasingType["OutCubic"] = 5] = "OutCubic";
	    EasingType[EasingType["InOutCubic"] = 6] = "InOutCubic";
	    EasingType[EasingType["InQuart"] = 7] = "InQuart";
	    EasingType[EasingType["OutQuart"] = 8] = "OutQuart";
	    EasingType[EasingType["InOutQuart"] = 9] = "InOutQuart";
	    EasingType[EasingType["InSine"] = 10] = "InSine";
	    EasingType[EasingType["OutSine"] = 11] = "OutSine";
	    EasingType[EasingType["InOutSine"] = 12] = "InOutSine";
	    EasingType[EasingType["InCirc"] = 13] = "InCirc";
	    EasingType[EasingType["OutCirc"] = 14] = "OutCirc";
	    EasingType[EasingType["InOutCirc"] = 15] = "InOutCirc";
	    EasingType[EasingType["InQuint"] = 16] = "InQuint";
	    EasingType[EasingType["OutQuint"] = 17] = "OutQuint";
	    EasingType[EasingType["InOutQuint"] = 18] = "InOutQuint";
	    EasingType[EasingType["InExponential"] = 19] = "InExponential";
	    EasingType[EasingType["OutExponential"] = 20] = "OutExponential";
	    EasingType[EasingType["InOutExponential"] = 21] = "InOutExponential";
	    EasingType[EasingType["InElastic"] = 22] = "InElastic";
	    EasingType[EasingType["OutElastic"] = 23] = "OutElastic";
	    EasingType[EasingType["InOutElastic"] = 24] = "InOutElastic";
	    EasingType[EasingType["InBack"] = 25] = "InBack";
	    EasingType[EasingType["OutBack"] = 26] = "OutBack";
	    EasingType[EasingType["InOutBack"] = 27] = "InOutBack";
	    EasingType[EasingType["InBounce"] = 28] = "InBounce";
	    EasingType[EasingType["OutBounce"] = 29] = "OutBounce";
	    EasingType[EasingType["InOutBounce"] = 30] = "InOutBounce";
	})(EasingType = exports.EasingType || (exports.EasingType = {}));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var state_1 = __webpack_require__(3);
	var eventList_1 = __webpack_require__(10);
	var Ticker = (function (_super) {
	    __extends(Ticker, _super);
	    function Ticker() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.state = state_1.State.Idle;
	        _this.timescale = 1;
	        _this.elapsed = 0;
	        _this.duration = 0;
	        _this.update = 0;
	        _this.eventToAdd = [];
	        _this.eventToRemove = [];
	        return _this;
	    }
	    Ticker.prototype.SetParent = function (parent, tick) {
	        this.tick = tick;
	        this.parent = parent;
	    };
	    Ticker.prototype.SetTimescale = function (scale) {
	        this.timescale = scale;
	    };
	    Ticker.prototype.AddTickListener = function (cb) {
	        this.eventToAdd.push(cb);
	    };
	    Ticker.prototype.RemoveTickListener = function (cb) {
	        this.eventToRemove.push(cb);
	    };
	    Ticker.prototype.UpdateListener = function () {
	        if (this.eventToAdd.length > 0) {
	            for (var i = 0; i < this.eventToAdd.length; i++) {
	                this.Add(this.eventToAdd[i]);
	            }
	            this.eventToAdd = [];
	        }
	        if (this.eventToRemove.length > 0) {
	            for (var i = 0; i < this.eventToRemove.length; i++) {
	                this.Remove(this.eventToRemove[i]);
	            }
	            this.eventToRemove = [];
	        }
	    };
	    Ticker.prototype.Tick = function (dt) {
	        if (this.state !== state_1.State.Run) {
	            return;
	        }
	        this.UpdateListener();
	        var localDt = dt * this.timescale;
	        for (var tick = this.first; tick; tick = tick.node_next) {
	            tick(localDt);
	        }
	        this.elapsed += localDt;
	        this.update++;
	        this.UpdateListener();
	    };
	    Ticker.prototype.Start = function () {
	        if (this.state === state_1.State.Idle) {
	            this.state = state_1.State.Run;
	        }
	    };
	    Ticker.prototype.Pause = function () {
	        if (this.state === state_1.State.Run) {
	            this.state = state_1.State.Pause;
	        }
	    };
	    Ticker.prototype.Resume = function () {
	        if (this.state === state_1.State.Pause) {
	            this.state = state_1.State.Run;
	        }
	    };
	    Ticker.prototype.Kill = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            return;
	        }
	        if (this.parent && this.tick) {
	            this.parent.RemoveTickListener(this.tick);
	        }
	        this.state = state_1.State.Killed;
	    };
	    Ticker.prototype.Skip = function () {
	        throw new Error('The main ticker cannot be skipped');
	    };
	    Ticker.prototype.Reset = function () {
	        this.state = state_1.State.Idle;
	    };
	    return Ticker;
	}(eventList_1.EventList));
	exports.Ticker = Ticker;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var EventList = (function () {
	    function EventList() {
	        this.length = 0;
	    }
	    EventList.prototype.Add = function (obj) {
	        var newNode = this.GetNode(obj, this.last, undefined, this);
	        if (this.first === undefined) {
	            this.first = newNode;
	            this.last = newNode;
	        }
	        else if (this.last !== undefined) {
	            this.last.node_next = newNode;
	            this.last = newNode;
	        }
	        this.length += 1;
	    };
	    EventList.prototype.Remove = function (obj) {
	        var node = obj;
	        if (node === undefined) {
	            console.log('Trying to remove an object which is not a node');
	            return;
	        }
	        if (node.node_list !== this) {
	            return;
	        }
	        if (node.node_next === undefined) {
	            this.last = node.node_previous;
	        }
	        else {
	            node.node_next.node_previous = node.node_previous;
	        }
	        if (node.node_previous === undefined) {
	            this.first = node.node_next;
	        }
	        else {
	            node.node_previous.node_next = node.node_next;
	        }
	        node.node_valid = false;
	        node.node_previous = undefined;
	        node.node_next = undefined;
	        node.node_list = undefined;
	        this.length -= 1;
	    };
	    EventList.prototype.GetNode = function (obj, previous, next, list) {
	        var node = obj;
	        if (!node.node_valid) {
	            node.node_valid = true;
	            node.node_previous = previous;
	            node.node_next = next;
	            node.node_list = list;
	        }
	        return node;
	    };
	    return EventList;
	}());
	exports.EventList = EventList;


/***/ })
/******/ ])
});
;
//# sourceMappingURL=fatina.js.map