// [Fatina]  Build: 3.0.0-beta.3 - Saturday, April 6th, 2019, 7:44:30 PM  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fatinaBezier", [], factory);
	else if(typeof exports === 'object')
		exports["fatinaBezier"] = factory();
	else
		root["fatinaBezier"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/bezier/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugins/bezier/index.ts":
/*!*************************************!*\
  !*** ./src/plugins/bezier/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const interpolation_1 = __webpack_require__(/*! ./interpolation */ "./src/plugins/bezier/interpolation.ts");
function get() {
    return new FatinaPluginBezier();
}
exports.get = get;
class FatinaPluginBezier {
    constructor() {
        this.name = 'fatina-plugin-bezier';
        this.initialized = false;
    }
    init(fatina) {
        if (this.initialized || !fatina || fatina.plugin === null) {
            throw new Error('Cannot initialize ' + this.name);
        }
        const plugin = fatina;
        plugin.curve = (obj, settings) => interpolation_1.curve(fatina, obj, settings);
        plugin.arc = (obj, settings) => interpolation_1.arc(fatina, obj, settings);
        plugin.path = (obj, settings) => interpolation_1.path(fatina, obj, settings);
        this.initialized = true;
    }
}
exports.FatinaPluginBezier = FatinaPluginBezier;


/***/ }),

/***/ "./src/plugins/bezier/interpolation.ts":
/*!*********************************************!*\
  !*** ./src/plugins/bezier/interpolation.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __webpack_require__(/*! ../helper */ "./src/plugins/helper.ts");
const e = {};
/***
 * Cubic interpolation (2 control point)
 * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 *
 * @param {number} t
 * @param {number} start
 * @param {number[]} ctr
 * @param {number} dest
 */
e.cubic = (t, start, ctr, dest) => {
    const t2 = 1 - t;
    return t2 * t2 * t2 * start + t * (3 * t2 * t2 * ctr[0] + t * (3 * t2 * ctr[1] + t * dest));
};
/***
 * Quadratic interpolation (1 control point)
 *
 * @param {number} t
 * @param {number} start
 * @param {number[]} ctr
 * @param {number} dest
 */
e.quadratic = (t, start, ctr, dest) => {
    const t2 = 1 - t;
    return t2 * t2 * start + t * (2 * t2 * ctr[0] + t * dest);
};
/***
 * Catmull interpolation (2 control point)
 * unlike bezier, control points are before and after, not between start and dest
 * ctr[0] -> start -> dest -> ctr[1]
 * https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
 *
 * @param {number} t
 * @param {number} start
 * @param {number[]} ctr
 * @param {number} dest
 */
e.catmull = (t, start, ctr, dest) => {
    const t2 = t * t;
    const t3 = t * t * t;
    const f1 = -0.5 * t3 + t2 - 0.5 * t;
    const f2 = 1.5 * t3 - 2.5 * t2 + 1.0;
    const f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
    const f4 = 0.5 * t3 - 0.5 * t2;
    return ctr[0] * f1 + start * f2 + dest * f3 + ctr[1] * f4;
};
function curve(fatina, obj, settings) {
    const defaults = {
        posX: 'position.x',
        posY: 'position.y',
        rot: 'rotation',
        rotAdd: Math.PI / 2,
        autoRotate: true,
        from: { x: 0, y: 0 },
        ctr1: { x: 0, y: 0 },
        ctr2: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
        duration: 2000,
        method: "cubic" /* Cubic */
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const root = helper_1.getRoot(obj, pa.posX);
    const method = e[pa.method];
    const ctrlX = [pa.ctr1.x, pa.ctr2.x];
    const ctrlY = [pa.ctr1.y, pa.ctr2.y];
    let last = { x: 0, y: 0 };
    return fatina.tween({})
        .to({}, pa.duration)
        .onStart(() => {
        if (pa.from.x === 0 && pa.from.y === 0) {
            pa.from = { x: root[helper_1.getProp(pa.posX)], y: root[helper_1.getProp(pa.posY)] };
        }
    })
        .onUpdate((_dt, progress) => {
        root[helper_1.getProp(pa.posX)] = method(progress, pa.from.x, ctrlX, pa.to.x);
        root[helper_1.getProp(pa.posY)] = method(progress, pa.from.y, ctrlY, pa.to.y);
        if (pa.autoRotate) {
            const current = { x: root[helper_1.getProp(pa.posX)] - last.x, y: root[helper_1.getProp(pa.posY)] - last.y };
            obj[pa.rot] = Math.atan2(current.y, current.x) + pa.rotAdd;
            last = { x: root[helper_1.getProp(pa.posX)], y: root[helper_1.getProp(pa.posY)] };
        }
    })
        .onKilled(() => {
        root[helper_1.getProp(pa.posX)] = pa.to.x;
        root[helper_1.getProp(pa.posY)] = pa.to.y;
    });
}
exports.curve = curve;
function path(fatina, obj, settings) {
    const defaults = {
        posX: 'position.x',
        posY: 'position.y',
        points: [],
        duration: 2000,
        method: "catmull" /* Catmull */
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const root = helper_1.getRoot(obj, pa.posX);
    const from = { x: root[helper_1.getProp(pa.posX)], y: root[helper_1.getProp(pa.posY)] };
    let dist = 0;
    for (let j = 0; j < pa.points.length; j++) {
        const a = (j === 0) ? from : pa.points[j - 1];
        const b = pa.points[j];
        dist += distance(a, b);
    }
    const sequence = fatina.sequence();
    for (let i = 0; i < pa.points.length; i++) {
        const ptStart = (i < 1) ? from : pa.points[i - 1];
        const ptTo = pa.points[i];
        const dur = pa.duration * distance(ptStart, ptTo) / dist;
        switch (pa.method) {
            case "linear" /* Linear */:
                sequence.append(fatina.tween(root).to({ x: pa.points[i].x, y: pa.points[i].y }, dur));
                break;
            case "catmull" /* Catmull */:
                sequence.append(curve(fatina, obj, {
                    ctr1: (i < 2) ? from : pa.points[i - 2],
                    ctr2: (i >= pa.points.length - 1) ? pa.points[pa.points.length - 1] : pa.points[i + 1],
                    from: ptStart,
                    to: ptTo,
                    method: "catmull" /* Catmull */,
                    duration: dur
                }));
                break;
        }
    }
    sequence.onKilled(() => {
        root[helper_1.getProp(pa.posX)] = pa.points[pa.points.length - 1].x;
        root[helper_1.getProp(pa.posY)] = pa.points[pa.points.length - 1].y;
    });
    return sequence;
}
exports.path = path;
function arc(fatina, obj, settings) {
    const defaults = {
        posX: 'position.x',
        posY: 'position.y',
        rot: 'rotation',
        rotAdd: Math.PI / 2,
        autoRotate: true,
        ctr1: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
        duration: 2000
    };
    const pa = Object.assign({}, defaults, (settings || {}));
    const root = helper_1.getRoot(obj, pa.posX);
    const from = { x: root[helper_1.getProp(pa.posX)], y: root[helper_1.getProp(pa.posY)] };
    const circle = circle3Points(from, pa.ctr1, pa.to);
    const center = { x: circle.x, y: circle.y };
    let last = { x: 0, y: 0 };
    const a = getAngle(center, from);
    const b = getAngle(center, pa.ctr1);
    let c = getAngle(center, pa.to);
    const rot = getAbs(b) > getAbs(a);
    const inBetween = between(a, b, c);
    if (!inBetween) {
        c += (rot) ? Math.PI * 2 : -Math.PI * 2;
    }
    return fatina.tween({})
        .to({}, pa.duration)
        .onUpdate((_dt, progress) => {
        const ang = (c - a) * progress + a;
        root[helper_1.getProp(pa.posX)] = circle.x + circle.r * Math.cos(ang);
        root[helper_1.getProp(pa.posY)] = circle.y + circle.r * Math.sin(ang);
        if (pa.autoRotate) {
            const current = { x: root[helper_1.getProp(pa.posX)] - last.x, y: root[helper_1.getProp(pa.posY)] - last.y };
            obj[pa.rot] = Math.atan2(current.y, current.x) + pa.rotAdd;
            last = { x: root[helper_1.getProp(pa.posX)], y: root[helper_1.getProp(pa.posY)] };
        }
    })
        .onKilled(() => {
        root[helper_1.getProp(pa.posX)] = pa.to.x;
        root[helper_1.getProp(pa.posY)] = pa.to.y;
    });
}
exports.arc = arc;
//
// Helpers
//
function distance(a, b) {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}
function getAngle(a, b) {
    const point = { x: b.x - a.x, y: b.y - a.y };
    return Math.atan2(point.y, point.x);
}
function getAbs(angle) {
    return (angle + 2 * Math.PI) % (Math.PI * 2);
}
function between(a, b, c) {
    return (b > a && c > b) || (b > c && a > b);
}
/**
 * Based on http://paulbourke.net/geometry/circlesphere/
 *
 * @param {IVector2} a
 * @param {IVector2} b
 * @param {IVector2} c
 * @returns {ICircle}
 */
function circle3Points(a, b, c) {
    const d1 = { x: b.y - a.y, y: a.x - b.x };
    const d2 = { x: c.y - a.y, y: a.x - c.x };
    const k = d2.x * d1.y - d2.y * d1.x;
    const s1 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const s2 = { x: (a.x + c.x) / 2, y: (a.y + c.y) / 2 };
    const l = d1.x * (s2.y - s1.y) - d1.y * (s2.x - s1.x);
    const m = l / k;
    const center = { x: s2.x + m * d2.x, y: s2.y + m * d2.y };
    const dx = center.x - a.x;
    const dy = center.y - a.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return { x: center.x, y: center.y, r: radius };
}


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


/***/ })

/******/ });
});
//# sourceMappingURL=fatinaBezier.js.map 