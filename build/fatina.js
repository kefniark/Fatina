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
	var ticker_1 = __webpack_require__(7);
	var pooling_1 = __webpack_require__(8);
	var tickerManager;
	var pooling;
	var initialized = false;
	var requestFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var cancelFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	var lastFrame;
	var time = 0;
	function updateLoop(timestamp) {
	    var dt = timestamp - time;
	    if (tickerManager) {
	        tickerManager.Tick(dt);
	    }
	    time = timestamp;
	    lastFrame = requestFrame(updateLoop);
	}
	function Init(disableAutoTick) {
	    if (initialized) {
	        return;
	    }
	    if (!tickerManager) {
	        tickerManager = new ticker_1.Ticker();
	        tickerManager.Start();
	    }
	    if (!disableAutoTick) {
	        lastFrame = requestFrame(updateLoop);
	    }
	    pooling = new pooling_1.Pooling(2500);
	    initialized = true;
	}
	exports.Init = Init;
	function Update(timestamp) {
	    if (!initialized || !tickerManager) {
	        return;
	    }
	    tickerManager.Tick(timestamp);
	}
	exports.Update = Update;
	function Deinit() {
	    if (lastFrame) {
	        cancelFrame(lastFrame);
	    }
	    if (tickerManager) {
	        tickerManager.Kill();
	        tickerManager = undefined;
	    }
	    initialized = false;
	}
	exports.Deinit = Deinit;
	function Ticker() {
	    return tickerManager;
	}
	exports.Ticker = Ticker;
	function Tween(obj, properties) {
	    if (!initialized) {
	        Init();
	    }
	    var tween = pooling.PopTween();
	    tween.Init(obj, properties);
	    tween.SetParent(tickerManager);
	    return tween;
	}
	exports.Tween = Tween;
	function Sequence() {
	    if (!initialized) {
	        Init();
	    }
	    return new sequence_1.Sequence().SetParent(tickerManager);
	}
	exports.Sequence = Sequence;


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
	var delay_1 = __webpack_require__(6);
	var tweenType_1 = __webpack_require__(5);
	var Sequence = (function (_super) {
	    __extends(Sequence, _super);
	    function Sequence() {
	        var _this = _super.call(this) || this;
	        _this.eventTick = [];
	        _this.eventStepStart = [];
	        _this.eventStepEnd = [];
	        _this.tweens = [];
	        _this.sequenceIndex = 0;
	        _this.tickCb = function (dt) {
	            var localDt = dt * _this.timescale;
	            _this.elapsed += localDt;
	            _this.Tick(localDt);
	        };
	        return _this;
	    }
	    Object.defineProperty(Sequence.prototype, "Type", {
	        get: function () {
	            return tweenType_1.TweenType.Sequence;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Sequence.prototype, "CurrentTween", {
	        get: function () {
	            return this.currentTween;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Sequence.prototype.Validate = function () {
	    };
	    Sequence.prototype.LoopInit = function () {
	        this.sequenceIndex = 0;
	        for (var _i = 0, _a = this.tweens; _i < _a.length; _i++) {
	            var tweenArray = _a[_i];
	            for (var _b = 0, tweenArray_1 = tweenArray; _b < tweenArray_1.length; _b++) {
	                var tween = tweenArray_1[_b];
	                tween.Reset(true);
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
	    Sequence.prototype.Tick = function (dt, remains) {
	        if (!this.currentTween) {
	            this.currentTween = this.tweens[this.sequenceIndex];
	            if (this.currentTween) {
	                for (var _i = 0, _a = this.currentTween; _i < _a.length; _i++) {
	                    var tween = _a[_i];
	                    tween.Start();
	                }
	                for (var i = 0; i < this.eventStepStart.length; i++) {
	                    this.eventStepStart[i](this.currentTween[0]);
	                }
	            }
	        }
	        for (var i = this.eventTick.length - 1; i >= 0; i--) {
	            this.eventTick[i](dt);
	        }
	        if (remains !== true) {
	            _super.prototype.Updated.call(this, dt, 0);
	        }
	        if (this.currentTween) {
	            if (this.currentTween.some(function (x) { return !x.IsCompleted(); })) {
	                return;
	            }
	            var first = this.currentTween[0];
	            var remainsDt = first.Elapsed - first.Duration;
	            for (var i = 0; i < this.eventStepEnd.length; i++) {
	                this.eventStepEnd[i](this.currentTween[0]);
	            }
	            this.currentTween = undefined;
	            this.sequenceIndex++;
	            if (remainsDt > 0.01) {
	                this.Tick(remainsDt, true);
	                return;
	            }
	        }
	        if (!this.currentTween && this.tweens.length === this.sequenceIndex) {
	            this.loop--;
	            if (this.loop === 0) {
	                this.Complete();
	            }
	            else {
	                this.ResetAndStart();
	            }
	        }
	    };
	    Sequence.prototype.Append = function (tween) {
	        tween.SetParent(this);
	        this.tweens.push([tween]);
	        return this;
	    };
	    Sequence.prototype.AppendCallback = function (cb) {
	        var playable = new callback_1.Callback(cb);
	        playable.SetParent(this);
	        this.tweens.push([playable]);
	        return this;
	    };
	    Sequence.prototype.AppendInterval = function (duration) {
	        var playable = new delay_1.Delay(duration);
	        playable.SetParent(this);
	        this.tweens.push([playable]);
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
	    Sequence.prototype.Kill = function () {
	        _super.prototype.Kill.call(this);
	        for (var _i = 0, _a = this.tweens; _i < _a.length; _i++) {
	            var tweenArray = _a[_i];
	            for (var _b = 0, tweenArray_2 = tweenArray; _b < tweenArray_2.length; _b++) {
	                var tween = tweenArray_2[_b];
	                if (tween.IsKilled() || tween.IsCompleted()) {
	                    continue;
	                }
	                tween.Kill();
	            }
	        }
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
	    Sequence.prototype.OnStart = function (cb) {
	        _super.prototype.OnStart.call(this, cb);
	        return this;
	    };
	    Sequence.prototype.OnUpdate = function (cb) {
	        _super.prototype.OnUpdate.call(this, cb);
	        return this;
	    };
	    Sequence.prototype.OnKilled = function (cb) {
	        _super.prototype.OnKilled.call(this, cb);
	        return this;
	    };
	    Sequence.prototype.OnComplete = function (cb) {
	        _super.prototype.OnComplete.call(this, cb);
	        return this;
	    };
	    Sequence.prototype.OnStepStart = function (cb) {
	        this.eventStepStart.push(cb);
	        return this;
	    };
	    Sequence.prototype.OnStepEnd = function (cb) {
	        this.eventStepEnd.push(cb);
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
	        this.eventStart = [];
	        this.eventUpdate = [];
	        this.eventKill = [];
	        this.eventComplete = [];
	        this.firstStart = true;
	    }
	    Object.defineProperty(BaseTween.prototype, "Elapsed", {
	        get: function () {
	            return this.elapsed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseTween.prototype, "Duration", {
	        get: function () {
	            return this.duration;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseTween.prototype.SetParent = function (ticker) {
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.parent = ticker;
	    };
	    BaseTween.prototype.IsRunning = function () {
	        return this.state === state_1.State.Run;
	    };
	    BaseTween.prototype.IsCompleted = function () {
	        return this.state === state_1.State.Finished;
	    };
	    BaseTween.prototype.IsKilled = function () {
	        return this.state === state_1.State.Killed;
	    };
	    BaseTween.prototype.Start = function () {
	        if (this.state !== state_1.State.Idle) {
	            console.warn('cant start this tween, already in state', this.state);
	            return;
	        }
	        if (this.firstStart) {
	            this.Validate();
	        }
	        this.state = state_1.State.Run;
	        this.parent.AddTickListener(this.tickCb);
	        if (this.firstStart) {
	            this.Started();
	            this.firstStart = false;
	        }
	    };
	    BaseTween.prototype.Reset = function (resetloop) {
	        this.state = state_1.State.Idle;
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        if (resetloop === true) {
	            this.loop = 1;
	        }
	        this.LoopInit();
	    };
	    BaseTween.prototype.ResetAndStart = function (resetloop) {
	        if (resetloop === true) {
	            this.loop = 1;
	        }
	        this.LoopInit();
	        this.state = state_1.State.Run;
	    };
	    BaseTween.prototype.Pause = function () {
	        if (this.state !== state_1.State.Run) {
	            console.warn('cant pause this tween, already in state', this.state);
	            return;
	        }
	        this.state = state_1.State.Pause;
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	    };
	    BaseTween.prototype.Resume = function () {
	        if (this.state !== state_1.State.Pause) {
	            console.warn('cant resume this tween, already in state', this.state);
	            return;
	        }
	        this.state = state_1.State.Run;
	        this.parent.AddTickListener(this.tickCb);
	    };
	    BaseTween.prototype.Kill = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant kill this tween, already in state', this.state);
	            return;
	        }
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.state = state_1.State.Killed;
	        this.Killed();
	    };
	    BaseTween.prototype.Complete = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            console.warn('cant complete this tween, already in state', this.state);
	            return;
	        }
	        if (this.parent) {
	            this.parent.RemoveTickListener(this.tickCb);
	        }
	        this.state = state_1.State.Finished;
	        this.Completed();
	    };
	    BaseTween.prototype.Started = function () {
	        for (var i = 0; i < this.eventStart.length; i++) {
	            this.eventStart[i]();
	        }
	        this.eventStart = [];
	    };
	    BaseTween.prototype.Updated = function (dt, progress) {
	        for (var i = 0; i < this.eventUpdate.length; i++) {
	            this.eventUpdate[i](dt, progress);
	        }
	    };
	    BaseTween.prototype.Killed = function () {
	        for (var i = 0; i < this.eventKill.length; i++) {
	            this.eventKill[i]();
	        }
	        this.eventKill = [];
	    };
	    BaseTween.prototype.Completed = function () {
	        for (var i = 0; i < this.eventComplete.length; i++) {
	            this.eventComplete[i]();
	        }
	        this.eventComplete = [];
	    };
	    BaseTween.prototype.OnStart = function (cb) {
	        this.eventStart.push(cb);
	    };
	    BaseTween.prototype.OnUpdate = function (cb) {
	        this.eventUpdate.push(cb);
	    };
	    BaseTween.prototype.OnKilled = function (cb) {
	        this.eventKill.push(cb);
	    };
	    BaseTween.prototype.OnComplete = function (cb) {
	        this.eventComplete.push(cb);
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
	var tweenType_1 = __webpack_require__(5);
	var Callback = (function (_super) {
	    __extends(Callback, _super);
	    function Callback(cb) {
	        var _this = _super.call(this) || this;
	        _this.tickCb = function (dt) {
	            _this.elapsed += dt;
	            _this.duration = 0;
	            cb();
	            _this.Updated(dt, 1);
	            _this.Complete();
	        };
	        return _this;
	    }
	    Object.defineProperty(Callback.prototype, "Type", {
	        get: function () {
	            return tweenType_1.TweenType.Callback;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Callback.prototype.Validate = function () { };
	    Callback.prototype.LoopInit = function () {
	        this.elapsed = 0;
	    };
	    return Callback;
	}(baseTween_1.BaseTween));
	exports.Callback = Callback;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TweenType;
	(function (TweenType) {
	    TweenType[TweenType["Ticker"] = 0] = "Ticker";
	    TweenType[TweenType["Sequence"] = 1] = "Sequence";
	    TweenType[TweenType["Tween"] = 2] = "Tween";
	    TweenType[TweenType["Callback"] = 3] = "Callback";
	    TweenType[TweenType["Delay"] = 4] = "Delay";
	    TweenType[TweenType["None"] = 5] = "None";
	})(TweenType = exports.TweenType || (exports.TweenType = {}));


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
	var tweenType_1 = __webpack_require__(5);
	var Delay = (function (_super) {
	    __extends(Delay, _super);
	    function Delay(duration) {
	        var _this = _super.call(this) || this;
	        _this.duration = duration;
	        _this.tickCb = function (dt) {
	            _this.elapsed += dt;
	            var progress = Math.max(Math.min(_this.elapsed / _this.duration, 1), 0);
	            _super.prototype.Updated.call(_this, dt, progress);
	            if (_this.elapsed >= _this.duration) {
	                _this.Complete();
	            }
	        };
	        return _this;
	    }
	    Object.defineProperty(Delay.prototype, "Type", {
	        get: function () {
	            return tweenType_1.TweenType.Delay;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Delay.prototype.Validate = function () { };
	    Delay.prototype.LoopInit = function () {
	        this.elapsed = 0;
	    };
	    return Delay;
	}(baseTween_1.BaseTween));
	exports.Delay = Delay;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var state_1 = __webpack_require__(3);
	var tweenType_1 = __webpack_require__(5);
	var Ticker = (function () {
	    function Ticker() {
	        this.state = state_1.State.Idle;
	        this.timescale = 1;
	        this.elapsed = 0;
	        this.eventTick = [];
	    }
	    Object.defineProperty(Ticker.prototype, "Type", {
	        get: function () {
	            return tweenType_1.TweenType.Ticker;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Ticker.prototype, "Elapsed", {
	        get: function () {
	            return this.elapsed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Ticker.prototype, "Duration", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Ticker.prototype.AddTickListener = function (cb) {
	        this.eventTick.unshift(cb);
	    };
	    Ticker.prototype.RemoveTickListener = function (cb) {
	        var index = this.eventTick.indexOf(cb);
	        if (index !== -1) {
	            this.eventTick.splice(index, 1);
	        }
	    };
	    Ticker.prototype.Tick = function (dt) {
	        if (this.state !== state_1.State.Run) {
	            return;
	        }
	        var localDt = dt * this.timescale;
	        for (var i = this.eventTick.length - 1; i >= 0; i--) {
	            this.eventTick[i](localDt);
	        }
	        this.elapsed += localDt;
	    };
	    Ticker.prototype.IsCompleted = function () {
	        return this.state === state_1.State.Finished;
	    };
	    Ticker.prototype.IsRunning = function () {
	        return this.state === state_1.State.Run;
	    };
	    Ticker.prototype.IsKilled = function () {
	        return this.state === state_1.State.Killed;
	    };
	    Ticker.prototype.Start = function () {
	        if (this.state !== state_1.State.Idle) {
	            return;
	        }
	        this.state = state_1.State.Run;
	    };
	    Ticker.prototype.Pause = function () {
	        if (this.state !== state_1.State.Run) {
	            return;
	        }
	        this.state = state_1.State.Pause;
	    };
	    Ticker.prototype.Resume = function () {
	        if (this.state !== state_1.State.Pause) {
	            return;
	        }
	        this.state = state_1.State.Run;
	    };
	    Ticker.prototype.Kill = function () {
	        if (this.state === state_1.State.Killed || this.state === state_1.State.Finished) {
	            return;
	        }
	        this.state = state_1.State.Killed;
	    };
	    Ticker.prototype.Reset = function () {
	        this.state = state_1.State.Idle;
	    };
	    return Ticker;
	}());
	exports.Ticker = Ticker;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var tween_1 = __webpack_require__(9);
	var Pooling = (function () {
	    function Pooling(size) {
	        this.tweens = [];
	        for (var i = 0; i < size; i++) {
	            this.CreateTween();
	        }
	    }
	    Pooling.prototype.CreateTween = function () {
	        return new tween_1.Tween(null, []);
	    };
	    Pooling.prototype.PopTween = function () {
	        if (this.tweens.length === 0) {
	            this.tweens.push(this.CreateTween());
	        }
	        return this.tweens.pop();
	    };
	    Pooling.prototype.PushTween = function (tween) {
	        if (tween === undefined) {
	            return;
	        }
	        this.tweens.push(tween);
	    };
	    return Pooling;
	}());
	exports.Pooling = Pooling;


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
	var baseTween_1 = __webpack_require__(2);
	var easingType_1 = __webpack_require__(10);
	var easing_1 = __webpack_require__(11);
	var sequence_1 = __webpack_require__(1);
	var tweenType_1 = __webpack_require__(5);
	var Tween = (function (_super) {
	    __extends(Tween, _super);
	    function Tween(object, properties) {
	        var _this = _super.call(this) || this;
	        _this.relative = false;
	        _this.object = object;
	        _this.properties = properties;
	        _this.tickCb = function (dt) {
	            var localDt = dt * _this.timescale;
	            _this.elapsed += localDt;
	            var progress = Math.max(Math.min(_this.elapsed / _this.duration, 1), 0);
	            _this.Update(localDt, progress);
	            if (_this.elapsed >= _this.duration) {
	                _this.loop--;
	                if (_this.loop === 0) {
	                    _this.Complete();
	                }
	                else {
	                    _this.ResetAndStart();
	                }
	            }
	        };
	        return _this;
	    }
	    Object.defineProperty(Tween.prototype, "Type", {
	        get: function () {
	            return tweenType_1.TweenType.Tween;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Tween.prototype.Init = function (object, properties) {
	        this.object = object;
	        this.properties = properties;
	    };
	    Tween.prototype.Validate = function () {
	        if (!this.object) {
	            throw new Error('Cant Tween a undefined object');
	        }
	        for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
	            var prop = _a[_i];
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
	        if (!this.from) {
	            this.from = {};
	            for (var _b = 0, _c = this.properties; _b < _c.length; _b++) {
	                var prop = _c[_b];
	                this.from[prop] = this.object[prop];
	            }
	        }
	        else {
	            for (var _d = 0, _e = this.properties; _d < _e.length; _d++) {
	                var prop = _e[_d];
	                this.object[prop] = this.from[prop];
	            }
	        }
	        if (this.relative) {
	            for (var _f = 0, _g = this.properties; _f < _g.length; _f++) {
	                var prop = _g[_f];
	                this.to[prop] = this.object[prop] + this.to[prop];
	            }
	        }
	    };
	    Tween.prototype.LoopInit = function () {
	        this.elapsed = 0;
	        if (this.from) {
	            for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
	                var prop = _a[_i];
	                this.object[prop] = this.from[prop];
	            }
	        }
	    };
	    Tween.prototype.Update = function (dt, progress) {
	        var val = this.ease(progress);
	        for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
	            var prop = _a[_i];
	            this.object[prop] = this.from[prop] + (this.to[prop] - this.from[prop]) * val;
	        }
	        _super.prototype.Updated.call(this, dt, progress);
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
	    Tween.prototype.ToSequence = function () {
	        if (!this.parent) {
	            throw new Error('Cant convert to a sequence, parent ticker not defined');
	        }
	        return new sequence_1.Sequence().SetParent(this.parent).Append(this);
	    };
	    Tween.prototype.Easing = function (type, args) {
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
	    Tween.prototype.SetEasing = function (type, args) {
	        this.ease = this.Easing(type, args);
	        return this;
	    };
	    Tween.prototype.OnStart = function (cb) {
	        _super.prototype.OnStart.call(this, cb);
	        return this;
	    };
	    Tween.prototype.OnUpdate = function (cb) {
	        _super.prototype.OnUpdate.call(this, cb);
	        return this;
	    };
	    Tween.prototype.OnKilled = function (cb) {
	        _super.prototype.OnKilled.call(this, cb);
	        return this;
	    };
	    Tween.prototype.OnComplete = function (cb) {
	        _super.prototype.OnComplete.call(this, cb);
	        return this;
	    };
	    return Tween;
	}(baseTween_1.BaseTween));
	exports.Tween = Tween;


/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var easingType_1 = __webpack_require__(10);
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


/***/ })
/******/ ])
});
;
//# sourceMappingURL=fatina.js.map