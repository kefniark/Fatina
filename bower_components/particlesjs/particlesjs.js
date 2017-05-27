! function(t) {
    "use strict";
    var e = function(t) {
        function e(e) {
            t.call(this), this._time = 0, this._bg = new createjs.Shape, this.addChild(this._bg), this._emitter = new a(e), this.addChild(this._emitter.container), this.on("tick", this.enterFrameHandler, this)
        }
        return __extends(e, t), e.prototype.enterFrameHandler = function(t) {
            this._emitter.emit(window.innerWidth * Math.random(), window.innerHeight / 2 * (Math.random() - .1) + 1 * window.innerHeight / 10), this._emitter.update();
            var e = 5 * Math.sin(-1 * Date.now() / 400 * Math.PI / 180) + 100,
                i = createjs.Graphics.getHSL(e, 10, 6),
                a = createjs.Graphics.getHSL(e + 120, 30, 40);
                //a = createjs.Graphics.getHSL(e + 90, 90, 30);
                //a = createjs.Graphics.getHSL(e + 90, 90, 60);
            this._bg.graphics.clear().beginLinearGradientFill([i, a], [0, 0], 0, 0, 0, window.innerHeight).drawRect(0, 0, window.innerWidth, window.innerHeight)
        }, e
    }(createjs.Container);
    t.ParticleContainer = e;
    var i = function() {
            function t() {
                this.vy = 0, this.x = 0, this.latestY = 0, this.latestX = 0, this.y = 0, this.vx = 0
            }
            return t.prototype.update = function() {
                var t = this.latestX - this.x,
                    e = this.latestY - this.y,
                    i = .2 * Math.sqrt(t * t + e * e),
                    a = Math.atan2(e, t);
                this.vx += Math.cos(a) * i, this.vy += Math.sin(a) * i, this.vx *= .3, this.vy *= .3, this.x += this.vx, this.y += this.vy
            }, t
        }(),
        a = function(t) {
            function e(e) {
                t.call(this), this.PRE_CACHE_PARTICLES = 10, this.numParticles = e, this.container = new createjs.Container, this._particleActive = [], this._particlePool = [];
                for (var i = 0; i < this.PRE_CACHE_PARTICLES; i++) this._particlePool.push(new r)
            }
            return __extends(e, t), e.prototype.emit = function(t, e) {
                for (var i = 0; i < this.numParticles; i++) this.getNewParticle(t, e)
            }, e.prototype.update = function() {
                t.prototype.update.call(this);
                for (var e = 0; e < this._particleActive.length; e++) {
                    var i = this._particleActive[e];
                    i.getIsDead() ? this.removeParticle(i) : i.update()
                }
            }, e.prototype.getNewParticle = function(t, e) {
                var i = this.fromPool();
                return i.resetParameters(t, e), this._particleActive.push(i), this.container.addChild(i), i
            }, e.prototype.removeParticle = function(t) {
                this.container.removeChild(t);
                var e = this._particleActive.indexOf(t);
                e > -1 && this._particleActive.splice(e, 1), this.toPool(t)
            }, e.prototype.getActiveParticles = function() {
                return this._particleActive
            }, e.prototype.fromPool = function() {
                return this._particlePool.length > 0 ? this._particlePool.shift() : new r
            }, e.prototype.toPool = function(t) {
                this._particlePool.push(t)
            }, e
        }(i),
        r = function(t) {
            function e() {
                t.call(this), this.MAX_SIZE = 30;
                var e = Math.random() * Math.random() * Math.random() * Math.random() * this.MAX_SIZE + 2;
                this.size = e;
                var i = createjs.Graphics.getHSL(0, 0, 20 + 50 * Math.random());
                this.graphics.clear(), Math.random() < .4 ? this.graphics.beginRadialGradientFill([i, "#000000"], [0, 1], 0, 0, 0, 0, 0, this.size) : Math.random() < .1 ? this.graphics.setStrokeStyle(1).beginStroke(createjs.Graphics.getRGB(255, 255, 255)) : Math.random() < .1 ? this.graphics.setStrokeStyle(1.5).beginStroke(createjs.Graphics.getRGB(255, 255, 255)) : this.graphics.beginFill(i), this.graphics.drawCircle(0, 0, this.size), this.graphics.endFill(), this.compositeOperation = "lighter", this.mouseEnabled = !1;
                var a = 2;
                this.cache(-this.size - a, -this.size - a, 2 * this.size + 2 * a, 2 * this.size + 2 * a), this._destroy = !0
            }
            return __extends(e, t), e.prototype.resetParameters = function(t, e) {
                this.x = t, this.y = e, this.vx = .1 * (Math.random() - .5), this.vy = 2 * (Math.random() - .5), this.life = Math.random() * Math.random() * 400 + 40, this.vSize = 0 * Math.random(), this.baseAlpha = .7, this._destroy = !1, this._count = 0, this.alpha = 1, this.scaleX = this.scaleY = 1
            }, e.prototype.update = function() {
                this.vy -= 0, this.vx *= .1, this.vy *= .1, this.x += this.vx, this.y += this.vy, this._count++;
                var t = 1 - this._count / this.life,
                    e = 1 - this._count / this.life * this.vSize;
                this.alpha = .3 * Math.random() + this.baseAlpha * t, this.scaleX = this.scaleY = e, this.life < this._count && (this._destroy = !0, this.parent.removeChild(this))
            }, e.prototype.getIsDead = function() {
                return this._destroy
            }, e
        }(createjs.Shape)
}(project || (project = {}));
var project;
! function(t) {
    "use strict";
    var e = function() {
        function e(e) {
            var i = this;
            this.stageBase = new createjs.Stage("canvasBase");
            var a = new t.ParticleContainer(e);
            this.stageBase.addChild(a), createjs.Ticker.setFPS(60), createjs.Ticker.timingMode = createjs.Ticker.RAF, createjs.Ticker.on("tick", this.handleTick, this);
            var r = new createjs.Stage("canvasOverlay");
            this.stageOverlay = r, this.spotLightContainer = new t.SpotLightContainer, r.addChild(this.spotLightContainer), this.stageCalcInside = new createjs.Stage(document.createElement("canvas")), this.stageCalcInside.autoClear = !1;
            var s = new t.CrossGraphicsContainer;
            this.stageCalcInside.addChild(s), this.buildUi(), this.handleResize(), window.addEventListener("resize", function() {
                i.handleResize()
            }), setTimeout(function() {
                i.handleResize()
            }, 100)
        }
        return e.prototype.buildUi = function() {}, e.prototype.handleTick = function() {
            this.spotLightContainer.drawContents(innerWidth, innerHeight), this.stageBase.update();
            var t = this.stageCalcInside.canvas.getContext("2d");
            t.fillStyle = "rgba(0, 0, 0, " + .35 * Math.random() + ")", t.fillRect(0, 0, this.stageCalcInside.canvas.width, this.stageCalcInside.canvas.height), this.stageCalcInside.update(), this.stageOverlay.update();
            var e = this.stageOverlay.canvas.getContext("2d");
            e.globalCompositeOperation = "lighter", e.drawImage(this.stageCalcInside.canvas, 0, 0)
        }, e.prototype.handleResize = function() {
            clockmaker.StageHelper.highDPI(this.stageBase, innerWidth, innerHeight), clockmaker.StageHelper.highDPI(this.stageOverlay, innerWidth, innerHeight), clockmaker.StageHelper.highDPI(this.stageCalcInside, innerWidth, innerHeight)
        }, e
    }();
    t.MainBase = e
}(project || (project = {}));
var project;
! function(t) {
    "use strict";
    var e = 1;
    window.addEventListener("DOMContentLoaded", function() {
        new t.Main(e)
    });
    var i = function(t) {
        function e(e) {
            t.call(this, e), this.buildUi()
        }
        return __extends(e, t), e.prototype.buildUi = function() {}, e.prototype.handleResize = function() {
            t.prototype.handleResize.call(this)
        }, e
    }(t.MainBase);
    t.Main = i
}(project || (project = {}));
