// [Fatina]  Build: 3.0.0-beta.3 - Saturday, April 6th, 2019, 7:44:30 PM  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fatinaPreset", [], factory);
	else if(typeof exports === 'object')
		exports["fatinaPreset"] = factory();
	else
		root["fatinaPreset"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/preset/index.ts");
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
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const PI = Math.PI;
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const PI_OVER_TWO = Math.PI / 2;
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const BACK = 1.70158;
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
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
e.inOutQuint = (t) => {
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

/***/ "./src/plugins/helper.ts":
/*!*******************************!*\
  !*** ./src/plugins/helper.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get Root object
 *
 * @ignore
 * @private
 * @param {*} obj
 * @param {string} property
 * @returns
 */
function getRoot(obj, property) {
    const path = property.split('.');
    let ret = obj;
    for (let i = 0; i < path.length - 1; i++) {
        ret = ret[path[i]];
    }
    return ret;
}
exports.getRoot = getRoot;
/**
 * Get Object Property
 *
 * @ignore
 * @private
 * @param {string} property
 * @returns
 */
function getProp(property) {
    const path = property.split('.');
    return path[path.length - 1];
}
exports.getProp = getProp;
/**
 * Get Object Property object
 *
 * @ignore
 * @private
 * @param {string} property
 * @param {*} value
 * @returns
 */
function getData(property, value) {
    const data = {};
    data[getProp(property)] = value;
    return data;
}
exports.getData = getData;


/***/ }),

/***/ "./src/plugins/preset/index.ts":
/*!*************************************!*\
  !*** ./src/plugins/preset/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preset_1 = __webpack_require__(/*! ./preset */ "./src/plugins/preset/preset.ts");
function get() {
    return new FatinaPluginPreset();
}
exports.get = get;
class FatinaPluginPreset {
    constructor() {
        this.name = 'fatina-plugin-preset';
        this.initialized = false;
    }
    init(fatina) {
        if (this.initialized || !fatina || fatina.plugin === null) {
            throw new Error('Cannot initialize ' + this.name);
        }
        const plugin = fatina;
        plugin.pulse = (obj, settings) => preset_1.pulsePreset(fatina, obj, settings);
        plugin.scale = (obj, settings) => preset_1.scalePreset(fatina, obj, settings);
        plugin.wobble = (obj, settings) => preset_1.wobblePreset(fatina, obj, settings);
        plugin.sonar = (obj, settings) => preset_1.sonarPreset(fatina, obj, settings);
        plugin.shake = (obj, settings) => preset_1.shakePreset(fatina, obj, settings);
        this.initialized = true;
    }
}
exports.FatinaPluginPreset = FatinaPluginPreset;


/***/ }),

/***/ "./src/plugins/preset/preset.ts":
/*!**************************************!*\
  !*** ./src/plugins/preset/preset.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const easing_1 = __webpack_require__(/*! ../../easing/easing */ "./src/easing/easing.ts");
const helper_1 = __webpack_require__(/*! ../helper */ "./src/plugins/helper.ts");
/**
 * Sonar Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {ISonarPresetParams} [settings]
 * @returns
 */
function sonarPreset(fatina, obj, settings) {
    const defaults = {
        alpha: 'alpha',
        scaleX: 'scale.x',
        scaleY: 'scale.y',
        amplitude: 4,
        duration: 2000
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const rs = helper_1.getRoot(obj, pa.scaleX);
    const ra = helper_1.getRoot(obj, pa.alpha);
    const sx = helper_1.getProp(pa.scaleX);
    const sy = helper_1.getProp(pa.scaleY);
    const alpha = helper_1.getProp(pa.alpha);
    const src = { x: rs[sx], y: rs[sy] };
    const p = easing_1.easeNames["outCubic" /* OutCubic */];
    return fatina.tween({})
        .to({}, pa.duration)
        .onUpdate((_dt, progress) => {
        ra[alpha] = 1 - easing_1.easeNames["inSine" /* InSine */](progress);
        rs[sx] = src.x + pa.amplitude * p(progress);
        rs[sy] = src.y + pa.amplitude * p(progress);
    })
        .onKilled(() => {
        ra[alpha] = 1;
        rs[sx] = src.x;
        rs[sy] = src.y;
    });
}
exports.sonarPreset = sonarPreset;
/**
 * Pulse Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IPulsePresetParams} [settings]
 * @returns
 */
function pulsePreset(fatina, obj, settings) {
    const defaults = {
        alpha: 'alpha',
        duration: 2000
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const rootAlpha = helper_1.getRoot(obj, pa.alpha);
    return fatina.tween(rootAlpha)
        .to(helper_1.getData(pa.alpha, 0), pa.duration / 2)
        .setEasing("inOutQuad" /* InOutQuad */)
        .toSequence()
        .append(fatina.tween(rootAlpha)
        .to(helper_1.getData(pa.alpha, 1), pa.duration / 2)
        .setEasing("inOutQuad" /* InOutQuad */))
        .onKilled(() => rootAlpha[helper_1.getProp(pa.alpha)] = 1);
}
exports.pulsePreset = pulsePreset;
/**
 * Scale Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IScalePresetParams} [settings]
 * @returns
 */
function scalePreset(fatina, obj, settings) {
    const defaults = {
        scaleX: 'scale.x',
        scaleY: 'scale.y',
        amplitude: 0.5,
        duration: 2000,
        bounce: 5,
        friction: 2,
        sinX: 0
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const root = helper_1.getRoot(obj, pa.scaleX);
    const x = helper_1.getProp(pa.scaleX);
    const y = helper_1.getProp(pa.scaleY);
    const src = { x: root[x], y: root[y] };
    return fatina.tween({}).to({}, pa.duration)
        .setEasing("inOutCubic" /* InOutCubic */)
        .onUpdate((_dt, progress) => {
        const friction = Math.pow(1 - progress, pa.friction);
        const p = (progress * pa.bounce) % pa.duration;
        root[x] = src.x + Math.sin(pa.sinX + p * Math.PI * 2) * pa.amplitude * friction;
        root[y] = src.y + Math.sin(p * Math.PI * 2) * pa.amplitude * friction;
    })
        .onKilled(() => {
        root[x] = src.x;
        root[y] = src.y;
    });
}
exports.scalePreset = scalePreset;
/**
 * Wobble Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IScalePresetParams} [settings]
 * @returns
 */
function wobblePreset(fatina, obj, settings) {
    const defaults = { sinX: Math.PI };
    return scalePreset(fatina, obj, Object.assign({}, defaults, (settings || {})));
}
exports.wobblePreset = wobblePreset;
/**
 * Shake Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IShakePresetParams} [settings]
 * @returns
 */
function shakePreset(fatina, obj, settings) {
    const defaults = {
        posX: 'position.x',
        posY: 'position.y',
        amplitude: 1.5,
        duration: 2000,
        bounce: 10,
        friction: 2
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const root = helper_1.getRoot(obj, pa.posX);
    const x = helper_1.getProp(pa.posX);
    const y = helper_1.getProp(pa.posY);
    const src = { x: root[x], y: root[y] };
    const rnd = { x: 0.5 + Math.random(), y: 0.5 + Math.random() };
    return fatina.tween({})
        .to({}, pa.duration)
        .onUpdate((_dt, progress) => {
        const friction = Math.pow(1 - progress, pa.friction);
        const p = (progress * pa.bounce) % pa.duration;
        root[x] = src.x + Math.sin(Math.PI + (p + rnd.x) * Math.PI * 2) * pa.amplitude * friction;
        root[y] = src.y + Math.sin((p + rnd.y) * Math.PI * 2) * pa.amplitude * friction;
    })
        .onKilled(() => {
        root[x] = src.x;
        root[y] = src.y;
    });
}
exports.shakePreset = shakePreset;


/***/ })

/******/ });
});
//# sourceMappingURL=fatinaPreset.js.map 