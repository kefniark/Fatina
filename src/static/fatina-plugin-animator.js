(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FatinaPluginAnimator", [], factory);
	else if(typeof exports === 'object')
		exports["FatinaPluginAnimator"] = factory();
	else
		root["FatinaPluginAnimator"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animator/animator.ts":
/*!**********************************!*\
  !*** ./src/animator/animator.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Animator component applied on a object.
 * This store a list of animations and manage them for that object
 *
 * @export
 * @class Animator
 */
class Animator {
    constructor(obj, animatorManager) {
        // public properties
        this.animations = {};
        this.current = {};
        this.groups = ['default'];
        this.currentAnimName = {};
        this.animGroupMap = {};
        this.animTransitionMap = {};
        this.animFinalValueMap = {};
        this.animUnstoppableMap = {};
        // events
        this.eventStart = {};
        this.eventOnceStart = {};
        this.eventComplete = {};
        this.eventOnceComplete = {};
        this.object = obj;
        this.animatorManager = animatorManager;
    }
    /**
     * Add a new Animation to this object
     *
     * @param {string} name
     * @param {string} animationName
     * @param {(IAnimationParams | any)} [options]
     * @param {*} [params]
     * @returns {Animator}
     * @memberOf Animator
     */
    addAnimation(name, animationName, options, params) {
        const anim = this.animatorManager.instantiate(animationName, this.object, params);
        return this.addCustomAnimation(name, options || {}, anim);
    }
    /**
     * Add a new Tween to this object
     *
     * @param {string} name
     * @param {(IAnimationParams | any)} options
     * @param {IControl} tween
     * @returns {Animator}
     * @memberOf Animator
     */
    addCustomAnimation(name, options, tween) {
        const anim = tween;
        anim.onStart(() => {
            this.emitEvent(this.eventStart[name]);
            if (name in this.eventOnceStart) {
                this.emitEvent(this.eventOnceStart[name]);
                this.eventOnceStart[name] = [];
            }
        });
        anim.onKilled(() => {
            anim.recycle();
            this.emitEvent(this.eventComplete[name]);
            if (name in this.eventOnceComplete) {
                this.emitEvent(this.eventOnceComplete[name]);
                this.eventOnceComplete[name] = [];
            }
        });
        anim.onComplete(() => {
            anim.recycle();
            this.emitEvent(this.eventComplete[name]);
            if (name in this.eventOnceComplete) {
                this.emitEvent(this.eventOnceComplete[name]);
                this.eventOnceComplete[name] = [];
            }
            if (name in this.animTransitionMap) {
                this.play(this.animTransitionMap[name]);
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
    }
    emit(func, args) {
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
        for (let i = 0; i < listeners.length; i++) {
            this.emit(listeners[i], args);
        }
    }
    onStartAll(name, cb) {
        if (name in this.eventStart) {
            this.eventStart[name].push(cb);
        }
        else {
            this.eventStart[name] = [cb];
        }
        return this;
    }
    onStart(name, cb) {
        if (name in this.eventOnceStart) {
            this.eventOnceStart[name].push(cb);
        }
        else {
            this.eventOnceStart[name] = [cb];
        }
        return this;
    }
    onCompleteAll(name, cb) {
        if (name in this.eventComplete) {
            this.eventComplete[name].push(cb);
        }
        else {
            this.eventComplete[name] = [cb];
        }
        return this;
    }
    onComplete(name, cb) {
        if (name in this.eventOnceComplete) {
            this.eventOnceComplete[name].push(cb);
        }
        else {
            this.eventOnceComplete[name] = [cb];
        }
        return this;
    }
    /**
     * Method used to play an animation
     *
     * @param {string} name
     * @param {() => void} [onComplete]
     * @returns {void}
     *
     * @memberOf Animator
     */
    play(name, onComplete) {
        if (!(name in this.animations)) {
            throw new Error('this animation doesnt exist ' + name);
        }
        const layerName = this.animGroupMap[name];
        let current = this.current[layerName];
        // Block any unstoppable running anim
        if (current && current.isRunning && this.animUnstoppableMap[this.currentAnimName[layerName]]) {
            console.log('This animation already run and is unstoppable', this.currentAnimName[layerName], '->', name);
            return;
        }
        // Stop any previous animation on this layer
        if (current && (current.isRunning || current.isPaused)) {
            const currentAnimName = this.currentAnimName[layerName];
            current.skip(this.animFinalValueMap[currentAnimName]);
            this.current[layerName] = undefined;
        }
        // Start the right animation
        current = this.animations[name];
        this.current[layerName] = current;
        this.currentAnimName[layerName] = name;
        if (onComplete) {
            this.onComplete(name, onComplete);
        }
        current.start();
        return;
    }
    pause(group) {
        const layerName = !group ? 'default' : group;
        const current = this.current[layerName];
        if (current && current.isRunning) {
            current.pause();
        }
    }
    pauseAll() {
        for (const layerId of this.groups) {
            this.pause(layerId);
        }
    }
    resume(group) {
        const layerName = !group ? 'default' : group;
        const current = this.current[layerName];
        if (current && current.isPaused) {
            current.resume();
        }
    }
    resumeAll() {
        for (const layerId of this.groups) {
            this.resume(layerId);
        }
    }
    stop(group) {
        const layerName = !group ? 'default' : group;
        const current = this.current[layerName];
        if (current && !current.isFinished) {
            const currentAnimName = this.currentAnimName[layerName];
            current.skip(this.animFinalValueMap[currentAnimName]);
            this.current[layerName] = undefined;
        }
    }
    stopAll() {
        for (const layerId of this.groups) {
            this.stop(layerId);
        }
    }
    /**
     * Used to destroy this animation and stop all the tweens
     *
     * @memberOf Animator
     */
    destroy() {
        for (const layerId of this.groups) {
            const current = this.current[layerId];
            if (current && !current.isFinished) {
                current.kill();
            }
        }
        this.animations = {};
        this.animGroupMap = {};
        this.animFinalValueMap = {};
        this.animUnstoppableMap = {};
        this.current = {};
        this.currentAnimName = {};
        delete this.object.animator;
    }
}
exports.Animator = Animator;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const animatorManager_1 = __webpack_require__(/*! ./manager/animatorManager */ "./src/manager/animatorManager.ts");
const tickerManager_1 = __webpack_require__(/*! ./manager/tickerManager */ "./src/manager/tickerManager.ts");
function get() {
    return new FatinaPluginAnimator();
}
exports.get = get;
class FatinaPluginAnimator {
    constructor() {
        this.name = 'fatina-plugin-animator';
        this.initialized = false;
    }
    get tickerManager() {
        return this.fatina.plugin.tickerManager;
    }
    get animatorManager() {
        return this.fatina.plugin.animatorManager;
    }
    init(fatina) {
        if (this.initialized) {
            throw new Error('Try to init the plugin twice : ' + name);
        }
        if (fatina === undefined || fatina === null || fatina.plugin === null) {
            throw new Error('Try to init the plugin without fatina : ' + name);
        }
        this.fatina = fatina;
        this.initialized = true;
        fatina.plugin.animatorManager = new animatorManager_1.AnimatorManager(this);
        fatina.plugin.tickerManager = new tickerManager_1.TickerManager(this);
    }
}
exports.FatinaPluginAnimator = FatinaPluginAnimator;


/***/ }),

/***/ "./src/manager/animatorManager.ts":
/*!****************************************!*\
  !*** ./src/manager/animatorManager.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const animator_1 = __webpack_require__(/*! ../animator/animator */ "./src/animator/animator.ts");
/**
 * This manager is there to store shared animations and instantiate them
 *
 * @export
 * @class AnimatorManager
 */
class AnimatorManager {
    constructor(plugin) {
        this.anims = {};
        this.tickerMap = {};
        this.plugin = plugin;
    }
    get animations() {
        return Object.keys(this.anims);
    }
    get labels() {
        return Object.keys(this.tickerMap).map((x) => this.tickerMap[x]).filter((piece, index, self) => self.indexOf(piece) === index);
    }
    /**
     * Method used to register a new animation
     *
     * @param {string} name
     * @param {(object: any, params?: any) => IControl} onCreate
     * @param {string} [tickerName]
     * @returns {AnimatorManager}
     *
     * @memberOf AnimatorManager
     */
    register(name, onCreate, tickerName) {
        if (this.anims[name] && this.tickerMap[name]) {
            delete this.tickerMap[name];
        }
        this.anims[name] = onCreate;
        if (tickerName) {
            this.tickerMap[name] = tickerName;
        }
        return this;
    }
    instantiate(name, object, params) {
        if (!(name in this.anims)) {
            throw new Error('this animation doesnt exist ' + name);
        }
        const tween = this.anims[name](object, params);
        if (this.tickerMap[name]) {
            tween.setParent(this.plugin.tickerManager.get(this.tickerMap[name]));
        }
        return tween;
    }
    /**
     * Method used to add a component animator to any object
     *
     * @param {*} obj
     * @returns {Animator}
     *
     * @memberOf AnimatorManager
     */
    addAnimatorTo(obj) {
        if (!obj.animator) {
            obj.animator = new animator_1.Animator(obj, this);
        }
        return obj.animator;
    }
}
exports.AnimatorManager = AnimatorManager;


/***/ }),

/***/ "./src/manager/tickerManager.ts":
/*!**************************************!*\
  !*** ./src/manager/tickerManager.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This manager is just there to keep reference to ticker by name
 *
 * @export
 * @class TickerManager
 */
class TickerManager {
    constructor(plugin) {
        this.tickers = {};
        this.plugin = plugin;
    }
    get(name) {
        if (this.tickers[name]) {
            return this.tickers[name];
        }
        this.tickers[name] = this.plugin.fatina.ticker();
        return this.tickers[name];
    }
    pauseAll(name) {
        if (this.tickers[name]) {
            this.tickers[name].pause();
        }
    }
    resumeAll(name) {
        if (this.tickers[name]) {
            this.tickers[name].resume();
        }
    }
    killAll(name) {
        if (this.tickers[name]) {
            this.tickers[name].kill();
            delete this.tickers[name];
        }
    }
}
exports.TickerManager = TickerManager;


/***/ })

/******/ });
});
//# sourceMappingURL=fatina-plugin-animator.js.map