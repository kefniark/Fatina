(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FatinaPluginAnimator", [], factory);
	else if(typeof exports === 'object')
		exports["FatinaPluginAnimator"] = factory();
	else
		root["FatinaPluginAnimator"] = factory();
})(this, function() {
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var animatorManager_1 = __webpack_require__(1);
var tickerManager_1 = __webpack_require__(3);
function Get() {
    return new FatinaPluginAnimator();
}
exports.Get = Get;
var FatinaPluginAnimator = (function () {
    function FatinaPluginAnimator() {
        this.name = 'fatina-plugin-animator';
        this.init = false;
    }
    Object.defineProperty(FatinaPluginAnimator.prototype, "TickerManager", {
        get: function () {
            return this.fatina.plugin.TickerManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FatinaPluginAnimator.prototype, "AnimatorManager", {
        get: function () {
            return this.fatina.plugin.AnimatorManager;
        },
        enumerable: true,
        configurable: true
    });
    FatinaPluginAnimator.prototype.Init = function (fatina) {
        if (this.init) {
            throw new Error('Try to init the plugin twice : ' + name);
        }
        if (fatina === undefined || fatina === null || fatina.plugin === null) {
            throw new Error('Try to init the plugin without fatina : ' + name);
        }
        this.fatina = fatina;
        this.init = true;
        fatina.plugin.AnimatorManager = new animatorManager_1.AnimatorManager(this);
        fatina.plugin.TickerManager = new tickerManager_1.TickerManager(this);
    };
    return FatinaPluginAnimator;
}());
exports.FatinaPluginAnimator = FatinaPluginAnimator;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var animator_1 = __webpack_require__(2);
var AnimatorManager = (function () {
    function AnimatorManager(plugin) {
        this.animations = {};
        this.tickerMap = {};
        this.plugin = plugin;
    }
    Object.defineProperty(AnimatorManager.prototype, "Animations", {
        get: function () {
            return Object.keys(this.animations);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatorManager.prototype, "Labels", {
        get: function () {
            var _this = this;
            return Object.keys(this.tickerMap).map(function (x) { return _this.tickerMap[x]; }).filter(function (piece, index, self) { return self.indexOf(piece) === index; });
        },
        enumerable: true,
        configurable: true
    });
    AnimatorManager.prototype.Register = function (name, onCreate, tickerName) {
        if (this.animations[name] && this.tickerMap[name]) {
            delete this.tickerMap[name];
        }
        this.animations[name] = onCreate;
        if (tickerName) {
            this.tickerMap[name] = tickerName;
        }
        return this;
    };
    AnimatorManager.prototype.Instantiate = function (name, object, params) {
        if (!(name in this.animations)) {
            throw new Error('this animation doesnt exist ' + name);
        }
        var tween = this.animations[name](object, params);
        if (this.tickerMap[name]) {
            tween.SetParent(this.plugin.TickerManager.Get(this.tickerMap[name]));
        }
        return tween;
    };
    AnimatorManager.prototype.AddAnimatorTo = function (obj) {
        if (!obj.Animator) {
            obj.Animator = new animator_1.Animator(obj, this);
        }
        return obj.Animator;
    };
    return AnimatorManager;
}());
exports.AnimatorManager = AnimatorManager;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animator = (function () {
    function Animator(obj, animatorManager) {
        this.animations = {};
        this.current = {};
        this.groups = ['default'];
        this.currentAnimName = {};
        this.animGroupMap = {};
        this.animTransitionMap = {};
        this.animFinalValueMap = {};
        this.animUnstoppableMap = {};
        this.eventStart = {};
        this.eventOnceStart = {};
        this.eventComplete = {};
        this.eventOnceComplete = {};
        this.object = obj;
        this.animatorManager = animatorManager;
    }
    Animator.prototype.AddAnimation = function (name, animationName, options, params) {
        var anim = this.animatorManager.Instantiate(animationName, this.object, params);
        return this.AddCustomAnimation(name, options || {}, anim);
    };
    Animator.prototype.AddCustomAnimation = function (name, options, tween) {
        var _this = this;
        var anim = tween;
        anim.OnStart(function () {
            _this.EmitEvent(_this.eventStart[name]);
            if (name in _this.eventOnceStart) {
                _this.EmitEvent(_this.eventOnceStart[name]);
                _this.eventOnceStart[name] = [];
            }
        });
        anim.OnKilled(function () {
            anim.Recycle();
            _this.EmitEvent(_this.eventComplete[name]);
            if (name in _this.eventOnceComplete) {
                _this.EmitEvent(_this.eventOnceComplete[name]);
                _this.eventOnceComplete[name] = [];
            }
        });
        anim.OnComplete(function () {
            anim.Recycle();
            _this.EmitEvent(_this.eventComplete[name]);
            if (name in _this.eventOnceComplete) {
                _this.EmitEvent(_this.eventOnceComplete[name]);
                _this.eventOnceComplete[name] = [];
            }
            if (name in _this.animTransitionMap) {
                _this.Play(_this.animTransitionMap[name]);
            }
        });
        this.animations[name] = anim;
        this.animFinalValueMap[name] = options ? !!options.finalValue : false;
        this.animUnstoppableMap[name] = options ? !!options.unstoppable : false;
        this.animGroupMap[name] = (options && options.group) ? options.group : 'default';
        if (options && options.next) {
            this.animTransitionMap[name] = options.next;
        }
        if (this.groups.indexOf(this.animGroupMap[name]) === -1) {
            this.groups.push(this.animGroupMap[name]);
        }
        return this;
    };
    Animator.prototype.Emit = function (func, args) {
        try {
            func.apply(this, args);
        }
        catch (e) {
            console.warn(e);
        }
    };
    Animator.prototype.EmitEvent = function (listeners, args) {
        if (!listeners) {
            return;
        }
        for (var i = 0; i < listeners.length; i++) {
            this.Emit(listeners[i], args);
        }
    };
    Animator.prototype.OnStartAll = function (name, cb) {
        if (name in this.eventStart) {
            this.eventStart[name].push(cb);
        }
        else {
            this.eventStart[name] = [cb];
        }
        return this;
    };
    Animator.prototype.OnStart = function (name, cb) {
        if (name in this.eventOnceStart) {
            this.eventOnceStart[name].push(cb);
        }
        else {
            this.eventOnceStart[name] = [cb];
        }
        return this;
    };
    Animator.prototype.OnCompleteAll = function (name, cb) {
        if (name in this.eventComplete) {
            this.eventComplete[name].push(cb);
        }
        else {
            this.eventComplete[name] = [cb];
        }
        return this;
    };
    Animator.prototype.OnComplete = function (name, cb) {
        if (name in this.eventOnceComplete) {
            this.eventOnceComplete[name].push(cb);
        }
        else {
            this.eventOnceComplete[name] = [cb];
        }
        return this;
    };
    Animator.prototype.Play = function (name, onComplete) {
        if (!(name in this.animations)) {
            throw new Error('this animation doesnt exist ' + name);
        }
        var layerName = this.animGroupMap[name];
        var current = this.current[layerName];
        if (current && current.IsRunning() && this.animUnstoppableMap[this.currentAnimName[layerName]]) {
            console.log('This animation already run and is unstoppable', this.currentAnimName[layerName], '->', name);
            return;
        }
        if (current && (current.IsRunning() || current.IsPaused())) {
            var currentAnimName = this.currentAnimName[layerName];
            current.Skip(this.animFinalValueMap[currentAnimName]);
            this.current[layerName] = undefined;
        }
        current = this.animations[name];
        this.current[layerName] = current;
        this.currentAnimName[layerName] = name;
        if (onComplete) {
            this.OnComplete(name, onComplete);
        }
        current.Start();
        return;
    };
    Animator.prototype.Pause = function (group) {
        var layerName = !group ? 'default' : group;
        var current = this.current[layerName];
        if (current && current.IsRunning()) {
            current.Pause();
        }
    };
    Animator.prototype.PauseAll = function () {
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var layerId = _a[_i];
            this.Pause(layerId);
        }
    };
    Animator.prototype.Resume = function (group) {
        var layerName = !group ? 'default' : group;
        var current = this.current[layerName];
        if (current && current.IsPaused()) {
            current.Resume();
        }
    };
    Animator.prototype.ResumeAll = function () {
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var layerId = _a[_i];
            this.Resume(layerId);
        }
    };
    Animator.prototype.Stop = function (group) {
        var layerName = !group ? 'default' : group;
        var current = this.current[layerName];
        if (current && !current.IsFinished()) {
            var currentAnimName = this.currentAnimName[layerName];
            current.Skip(this.animFinalValueMap[currentAnimName]);
            this.current[layerName] = undefined;
        }
    };
    Animator.prototype.StopAll = function () {
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var layerId = _a[_i];
            this.Stop(layerId);
        }
    };
    Animator.prototype.Destroy = function () {
        for (var _i = 0, _a = this.groups; _i < _a.length; _i++) {
            var layerId = _a[_i];
            var current = this.current[layerId];
            if (current && !current.IsFinished()) {
                current.Kill();
            }
        }
        this.animations = {};
        this.animGroupMap = {};
        this.animFinalValueMap = {};
        this.animUnstoppableMap = {};
        this.current = {};
        this.currentAnimName = {};
        delete this.object.Animator;
    };
    return Animator;
}());
exports.Animator = Animator;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TickerManager = (function () {
    function TickerManager(plugin) {
        this.tickers = {};
        this.plugin = plugin;
    }
    TickerManager.prototype.Get = function (name) {
        if (this.tickers[name]) {
            return this.tickers[name];
        }
        this.tickers[name] = this.plugin.fatina.Ticker();
        return this.tickers[name];
    };
    TickerManager.prototype.PauseAll = function (name) {
        if (this.tickers[name]) {
            this.tickers[name].Pause();
        }
    };
    TickerManager.prototype.ResumeAll = function (name) {
        if (this.tickers[name]) {
            this.tickers[name].Resume();
        }
    };
    TickerManager.prototype.KillAll = function (name) {
        if (this.tickers[name]) {
            this.tickers[name].Kill();
            delete this.tickers[name];
        }
    };
    return TickerManager;
}());
exports.TickerManager = TickerManager;


/***/ })
/******/ ]);
});
//# sourceMappingURL=fatina-plugin-animator.js.map