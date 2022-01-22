var C=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var Y=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var _=e=>C(e,"__esModule",{value:!0});var U=(e,t)=>{for(var i in t)C(e,i,{get:t[i],enumerable:!0})},V=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Y(t))!N.call(e,s)&&(i||s!=="default")&&C(e,s,{get:()=>t[s],enumerable:!(n=z(t,s))||n.enumerable});return e};var $=(e=>(t,i)=>e&&e.get(t)||(i=V(_({}),t,1),e&&e.set(t,i),i))(typeof WeakMap!="undefined"?new WeakMap:0);var G={};U(G,{EasingType:()=>P,default:()=>W});var B=Math.PI,F=Math.PI/2,M=1.70158,r={};r.linear=e=>e;r.inQuad=e=>e*e;r.outQuad=e=>2*e-e*e;r.inOutQuad=e=>e<.5?2*e*e:2*(2*e-e*e)-1;r.inCubic=e=>e*e*e;r.outCubic=e=>3*e-3*e*e+e*e*e;r.inOutCubic=e=>e<.5?4*e*e*e:4*(3*e-3*e*e+e*e*e)-3;r.inQuart=e=>e*e*e*e;r.outQuart=e=>{let t=e*e;return 4*e-6*t+4*t*e-t*t};r.inOutQuart=e=>{if(e<.5)return 8*e*e*e*e;{let t=e*e;return 8*(4*e-6*t+4*t*e-t*t)-7}};r.inSine=e=>e===1?1:1-Math.cos(F*e);r.outSine=e=>Math.sin(F*e);r.inOutSine=e=>e<.5?(1-Math.cos(B*e))/2:(1+Math.sin(B*(e-.5)))/2;r.inCirc=e=>1-Math.sqrt(1-Math.pow(e,2));r.outCirc=e=>Math.sqrt(1-Math.pow(1-e,2));r.inOutCirc=e=>e<.5?(1-Math.sqrt(1-4*e*e))/2:(1+Math.sqrt(-3+8*e-4*e*e))/2;r.inQuint=e=>e*e*e*e*e;r.outQuint=e=>--e*e*e*e*e+1;r.InOutQuint=e=>(e*=2,e<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2));r.inExponential=e=>e===1?1:e===0?0:Math.pow(1024,e-1);r.outExponential=e=>e===1?1:1-Math.pow(2,-10*e);r.inOutExponential=e=>e===0?0:e===1?1:(e*=2,e<1?.5*Math.pow(1024,e-1):.5*(-Math.pow(2,-10*(e-1))+2));r.inElastic=e=>e===0?0:-Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI);r.outElastic=e=>e===1?1:Math.pow(2,-10*e)*Math.sin((e-.1)*5*Math.PI)+1;r.inOutElastic=e=>e===0?0:e===1?1:(e*=2,e<1?-.5*Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI):.5*Math.pow(2,-10*(e-1))*Math.sin((e-1.1)*5*Math.PI)+1);r.inBack=e=>{let t=M;return e===0?0:e===1?1:e*e*((t+1)*e-t)};r.outBack=e=>{let t=M;return e===0?0:--e*e*((t+1)*e+t)+1};r.inOutBack=e=>{let t=M*1.525;return e*=2,e===0?0:e<1?.5*(e*e*((t+1)*e-t)):.5*((e-=2)*e*((t+1)*e+t)+2)};r.outBounce=e=>e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375;r.inBounce=e=>1-r.outBounce(1-e);r.inOutBounce=e=>e<.5?r.inBounce(e*2)*.5:r.outBounce(e*2-1)*.5+.5;var f=r;function k(e,t){let i=t.split("."),n=e;for(let s=0;s<i.length-1;s++)n=n[i[s]];return n}function c(e){let t=e.split(".");return t[t.length-1]}function L(e,t){let i={};return i[c(e)]=t,i}function A(e,t,i){let s={...{alpha:"alpha",scaleX:"scale.x",scaleY:"scale.y",amplitude:4,duration:2e3},...i||{}},o=k(t,s.scaleX),l=k(t,s.alpha),h=c(s.scaleX),u=c(s.scaleY),v=c(s.alpha),d={x:o[h],y:o[u]},m=f["outCubic"];return e.tween({}).to({},s.duration).onUpdate((I,w)=>{l[v]=1-f["inSine"](w),o[h]=d.x+s.amplitude*m(w),o[u]=d.y+s.amplitude*m(w)}).onKilled(()=>{l[v]=1,o[h]=d.x,o[u]=d.y})}function R(e,t,i){let s={...{alpha:"alpha",duration:2e3},...i||{}},o=k(t,s.alpha);return e.tween(o).to(L(s.alpha,0),s.duration/2).setEasing("inOutQuad").toSequence().append(e.tween(o).to(L(s.alpha,1),s.duration/2).setEasing("inOutQuad")).onKilled(()=>o[c(s.alpha)]=1)}function O(e,t,i){let s={...{scaleX:"scale.x",scaleY:"scale.y",amplitude:.5,duration:2e3,bounce:5,friction:2,sinX:0},...i||{}},o=k(t,s.scaleX),l=c(s.scaleX),h=c(s.scaleY),u={x:o[l],y:o[h]};return e.tween({}).to({},s.duration).setEasing("inOutCubic").onUpdate((v,d)=>{let m=Math.pow(1-d,s.friction),I=d*s.bounce%s.duration;o[l]=u.x+Math.sin(s.sinX+I*Math.PI*2)*s.amplitude*m,o[h]=u.y+Math.sin(I*Math.PI*2)*s.amplitude*m}).onKilled(()=>{o[l]=u.x,o[h]=u.y})}function X(e,t,i){return O(e,t,{...{sinX:Math.PI},...i||{}})}function D(e,t,i){let s={...{posX:"position.x",posY:"position.y",amplitude:1.5,duration:2e3,bounce:10,friction:2},...i||{}},o=k(t,s.posX),l=c(s.posX),h=c(s.posY),u={x:o[l],y:o[h]},v={x:.5+Math.random(),y:.5+Math.random()};return e.tween({}).to({},s.duration).onUpdate((d,m)=>{let I=Math.pow(1-m,s.friction),w=m*s.bounce%s.duration;o[l]=u.x+Math.sin(Math.PI+(w+v.x)*Math.PI*2)*s.amplitude*I,o[h]=u.y+Math.sin((w+v.y)*Math.PI*2)*s.amplitude*I}).onKilled(()=>{o[l]=u.x,o[h]=u.y})}var x=class{state=0;timescale=1;elapsed=0;duration=0;tickCb;ticks=new Set;newTicks=new Set;parent;dt=0;setParent(t,i){this.tickCb=i,this.parent=t}setTimescale(t){this.timescale=t}addTick(t){this.newTicks.add(t)}removeTick(t){this.ticks.delete(t)||this.newTicks.delete(t)}tick(t){this.state===1&&(this.dt=t*this.timescale,this.newTicks.size>0&&(this.newTicks.forEach(i=>this.ticks.add(i)),this.newTicks.clear()),this.ticks.forEach(i=>i(this.dt)),this.elapsed+=this.dt)}start(){this.state===0&&(this.state=1)}pause(){this.state===1&&(this.state=2)}resume(){this.state===2&&(this.state=1)}kill(){this.state>=3||(this.parent&&this.tickCb&&this.parent.removeTick(this.tickCb),this.state=4)}skip(){}reset(){this.state=0}get isIdle(){return this.state===0}get isRunning(){return this.state===1}get isFinished(){return this.state>=3}get isPaused(){return this.state===2}};var p=class{events={};elapsed=0;duration=0;timescale=1;state=0;loop;yo;parent;tickCb;first=!0;settings;get isIdle(){return this.state===0}get isRunning(){return this.state===1}get isFinished(){return this.state>=3}get isPaused(){return this.state===2}start(){return this.state!==0?this:(this.first?this.validate():this.check(),this.state=1,this.parent.addTick(this.tickCb),this.first&&(this.emitEvent(this.events.start),this.first=!1),this)}reset(t){this.state=0,t||this.removeParent(),this.loop&&(this.loop.value=this.loop.original),this.loopInit(),this.emitEvent(this.events.restart)}resetAndStart(t){this.loopInit(),this.emitEvent(this.events.restart),this.state=1,t>0&&this.tickCb(t)}setParent(t){return this.removeParent(),this.parent=t,this}setTimescale(t){return this.timescale=t,this}pause(){if(this.state!==1){this.info(1,"Cannot pause this tween ",this.state);return}this.state=2,this.removeParent()}resume(){if(this.state!==2){this.info(1,"Cannot resume this tween ",this.state);return}this.state=1,this.parent.addTick(this.tickCb)}skip(t){if(this.state>=3){this.info(1,"Cannot skip this tween ",this.state);return}if(this.state===0&&this.emitEvent(this.events.start),t){let i=this.yo?this.yo.value*this.duration:0;this.tickCb(this.duration-this.elapsed+i);return}this.elapsed=this.duration,this.complete()}kill(){if(this.state===4){this.info(1,"Cannot kill this tween ",this.state);return}this.state=4,this.removeParent(),this.emitEvent(this.events.kill)}setLoop(t){return this.loop||(this.loop={original:1,value:1}),this.loop.original=Math.round(t),this.loop.value=this.loop.original,this}setSettings(t){return this.settings?Object.assign(this.settings,t):this.settings=t,this}complete(){if(this.state>=3){this.info(1,"Cannot complete this tween ",this.state);return}this.state=3,this.removeParent(),this.emitEvent(this.events.complete)}removeParent(){this.parent&&this.parent.removeTick(this.tickCb)}check(){}validate(){}loopInit(){this.elapsed=0}info(t,i,n){!this.settings||t>this.settings.logLevel||console.log(i,n)}emit(t,i){if(this.settings&&!this.settings.safe)return t.apply(this,i);try{t.apply(this,i)}catch(n){console.warn(n)}}emitEvent(t,i){if(!!t)if(t instanceof Array)for(let n of t)this.emit(n,i);else this.emit(t,i)}onStart(t){return this.onEvent("start",t)}onRestart(t){return this.onEvent("restart",t)}onUpdate(t){return this.onEvent("update",t)}onKilled(t){return this.onEvent("kill",t)}onComplete(t){return this.onEvent("complete",t)}onEvent(t,i){return this.events[t]?this.events[t]instanceof Array?this.events[t].push(i):this.events[t]=[this.events[t],i]:this.events[t]=i,this}};var b=class extends p{remains=0;constructor(t){super();this.duration=t,this.tickCb=this.tick.bind(this)}tick(t){for(this.remains=t*this.timescale;this.remains>0;){this.elapsed+=this.remains;let i=Math.max(Math.min(this.elapsed/this.duration,1),0);if(this.events.update&&this.emitEvent(this.events.update,[this.remains,i]),this.elapsed<this.duration)return;if(this.remains=this.elapsed-this.duration,this.loop&&(this.loop.value--,this.loop.value!==0)){this.resetAndStart(0);continue}this.complete();return}}};var T=class extends p{callback;constructor(t){super();this.callback=t,this.tickCb=this.tick.bind(this)}tick(t){this.elapsed+=t,this.duration=0,this.callback(),this.emitEvent(this.events.update,[t,1]),this.complete()}};var y=class extends p{evtTick=new Set;tweens=[];index=0;cur;remains=0;get count(){return this.tweens.length}constructor(t){super();if(this.tickCb=this.tick.bind(this),t){this.tweens=new Array(t.length);for(let i=0;i<t.length;i++)t[i].setParent(this),this.tweens[i]=[t[i]]}}loopInit(){this.index=0;for(let t of this.tweens)for(let i of t)i.reset()}addTick(t){this.evtTick.add(t)}removeTick(t){this.evtTick.delete(t)}tick(t){this.state>=3||(this.remains=t*this.timescale,this.elapsed+=this.remains,this.localTick(this.remains))}localTick(t,i){if(this.cur||this.nextTween(),this.cur&&(this.evtTick.forEach(function(n){n(t)}),i!==!0&&this.events.update&&this.emitEvent(this.events.update,[t,0])),this.remains=t,this.cur){for(let n of this.cur)if(n.state!==3)return;if(this.remains=this.cur[0].elapsed-this.cur[0].duration,this.events.stepEnd&&this.emitEvent(this.events.stepEnd,this.cur[0]),this.cur=void 0,this.index++,this.remains>.01){this.localTick(this.remains,!0);return}}if(!this.cur&&this.tweens.length===this.index){if(this.loop&&(this.loop.value--,this.loop.value!==0)){this.resetAndStart(this.remains);return}this.complete()}}nextTween(){if(this.cur=this.tweens[this.index],!!this.cur){for(let t of this.cur)t.start();this.events.stepStart&&this.emitEvent(this.events.stepStart,this.cur[0])}}append(t){return t.setParent(this),this.tweens[this.tweens.length]=[t],this}appendCallback(t){let i=new T(t);return i.setParent(this),this.tweens[this.tweens.length]=[i],this}appendInterval(t){let i=new b(t);return i.setParent(this),this.tweens[this.tweens.length]=[i],this}prepend(t){return t.setParent(this),this.tweens.unshift([t]),this}prependCallback(t){let i=new T(t);return i.setParent(this),this.tweens.unshift([i]),this}prependInterval(t){let i=new b(t);return i.setParent(this),this.tweens.unshift([i]),this}skip(t){if(this.state>=3){this.info(1,"Cannot skip this tween ",this.state);return}for(let i of this.tweens)for(let n of i)n.elapsed===0&&this.emitEvent(this.events.stepStart,n),n.skip(t),this.emitEvent(this.events.stepEnd,n);super.skip()}kill(){if(this.state===4){this.info(1,"Cannot kill this tween ",this.state);return}for(let t of this.tweens)for(let i of t)i.kill();super.kill()}join(t){return this.tweens.length===0?this.append(t):(t.setParent(this),this.tweens[this.tweens.length-1].push(t),this)}onStepStart(t){return this.onEvent("stepStart",t)}onStepEnd(t){return this.onEvent("stepEnd",t)}};var P=(a=>(a.Linear="linear",a.InQuad="inQuad",a.OutQuad="outQuad",a.InOutQuad="inOutQuad",a.InCubic="inCubic",a.OutCubic="outCubic",a.InOutCubic="inOutCubic",a.InQuart="inQuart",a.OutQuart="outQuart",a.InOutQuart="inOutQuart",a.InSine="inSine",a.OutSine="outSine",a.InOutSine="inOutSine",a.InCirc="inCirc",a.OutCirc="outCirc",a.InOutCirc="inOutCirc",a.InQuint="inQuint",a.OutQuint="outQuint",a.InOutQuint="inOutQuint",a.InExponential="inExponential",a.OutExponential="outExponential",a.InOutExponential="inOutExponential",a.InElastic="inElastic",a.OutElastic="outElastic",a.InOutElastic="inOutElastic",a.InBack="inBack",a.OutBack="outBack",a.InOutBack="inOutBack",a.InBounce="inBounce",a.OutBounce="outBounce",a.InOutBounce="inOutBounce",a))(P||{});var E=class extends p{obj;prop=[];f;t;cf;ct;steps=0;relative=!1;ease;p=0;v=0;remains=0;constructor(t){super();this.obj=t,this.tickCb=this.tick.bind(this)}init(t){this.obj=t,this.prop.length=0}validate(){if(!this.obj)throw new Error("undefined object");if(!this.parent)throw new Error("no ticker");this.ease||(this.ease=f["linear"]),this.check()}check(){this.cf||(this.cf={}),this.ct||(this.ct={});for(let t of this.prop)this.f?(this.cf[t]=this.f[t],this.obj[t]=this.f[t]):this.cf[t]=this.obj[t],this.relative?this.ct[t]=this.obj[t]+this.t[t]:this.ct[t]=this.t[t]}tick(t){if(!(this.state>=3))for(this.remains=t*this.timescale;this.remains>0;){this.elapsed+=this.remains,this.p=Math.max(Math.min(this.elapsed/this.duration,1),0),this.v=this.ease(this.p),this.yo&&(this.yo.original-this.yo.value)%2===1&&(this.v=1-this.ease(1-this.p)),this.steps!==0&&(this.v=Math.round(this.v*this.steps)/this.steps);for(let i of this.prop)this.obj[i]=this.cf[i]+(this.ct[i]-this.cf[i])*this.v;if(this.events.update&&this.emitEvent(this.events.update,[this.remains,this.p]),this.elapsed<this.duration)return;if(this.remains=this.elapsed-this.duration,this.yo&&this.yo.value!==0){this.reverse(),this.resetAndStart(0),this.yo.value--;continue}if(this.loop&&(this.loop.value--,this.loop.value!==0)){this.check(),this.resetAndStart(0);continue}this.complete();return}}from(t){return this.f=t,this.updateProp(),this}to(t,i){return this.t=t,this.duration=i,this.updateProp(),this}updateProp(){if(!!this.obj){for(let t in this.t)this.t.hasOwnProperty(t)&&this.prop.push(t);this.prop.filter((t,i,n)=>i===n.indexOf(t))}}setRelative(t){return this.relative=t,this}modify(t,i){for(let n of this.prop)!t.hasOwnProperty(n)||(this.obj[n]+=t[n],i?this.ct[n]+=t[n]:this.cf[n]+=t[n])}reset(t){if(this.yo){if((this.yo.original-this.yo.value)%2===1){let i=this.cf;this.cf=this.ct,this.ct=i,i=this.f,this.f=this.t,this.t=i;let n=(1-this.elapsed/this.duration)*this.duration;this.elapsed=Math.round(n*1e3)/1e3}this.yo.value=this.yo.original}super.reset(t)}reverse(){let t=this.cf;this.cf=this.ct,this.ct=t,t=this.f,this.f=this.t,this.t=t;let i=(1-this.elapsed/this.duration)*this.duration;this.elapsed=Math.round(i*1e3)/1e3,this.state===3&&(this.reset(!0),this.start())}yoyo(t){return this.yo||(this.yo={original:0,value:0}),this.yo.original=t,this.yo.value=t,this}setSteps(t){return this.steps=t,this}toSequence(){if(!this.parent)throw new Error("parent ticker not defined");return new y().setParent(this.parent).append(this)}setEasing(t){if(!(t in f))throw new Error(`unknown easing method ${t}`);return this.ease=f[t],this}loopInit(){this.elapsed=0}};var g,S,j;typeof window!="undefined"&&(S=window.requestAnimationFrame,j=window.cancelAnimationFrame);var Q=class{plugin={};loadedPlugins=[];eventCreated=[];settings={logLevel:0,safe:!0,smooth:!1,maxFrameDt:50,maxFrameNumber:40,maxDt:500};version="[AIV]{version}[/AIV]";time=0;dt=0;lastTime=0;initialized=!1;manager;defaultTicker;get mainTicker(){return this.initialized||this.init(),this.manager}get elapsed(){return this.manager.elapsed}pulse=(t,i)=>R(this,t,i);scale=(t,i)=>O(this,t,i);wobble=(t,i)=>X(this,t,i);sonar=(t,i)=>A(this,t,i);shake=(t,i)=>D(this,t,i);init(t){return this.initialized?!1:(this.manager||(this.manager=new x,this.manager.start(),this.defaultTicker=this.manager),typeof window!="undefined"&&!t&&(console.log(" %c Fatina - Tweening library for games ("+this.version+") https://github.com/kefniark/Fatina ","background: #222; color: #9fbff4; padding: 5px"),this.lastTime=-1,document.readyState!=="loading"?g=S(this.updateLoop.bind(this)):document.addEventListener("DOMContentLoaded",()=>{g=S(this.updateLoop.bind(this))})),this.initialized=!0,!0)}setTimescale(t){this.init(),this.manager.setTimescale(t)}setDefaultTicker(t){this.defaultTicker=t}pause(){this.init(),this.manager.pause()}resume(){this.init(),this.manager.resume()}destroy(){this.manager&&this.manager.kill(),g&&j(g),this.initialized=!1}update(t){!this.initialized||!this.manager||(this.manager.tick(t),this.time+=t)}tween(t){let i=new E(t);return this.addContext(i),i}sequence(t){let i=new y(t);return this.addContext(i),i}delay(t){let i=new b(t);return this.addContext(i),i}setTimeout(t,i){let n=new b(i).onComplete(t);return this.addContext(n),n.start()}setInterval(t,i){let n=new b(i).onRestart(t).setLoop(-1);return this.addContext(n),n.start()}addContext(t){this.initialized||this.init(),t.setParent(this.defaultTicker),(this.settings.logLevel!==0||!this.settings.safe)&&t.setSettings(this.settings),this.emitCreated(t)}ticker(){this.initialized||this.init();let t=new x,i=t.tick.bind(t);return t.setParent(this.manager,i),this.manager.addTick(i),t.start(),this.emitCreated(t),t}updateLoop(t){if(this.dt=this.lastTime<0?16:this.dt+t-this.lastTime,this.dt>this.settings.maxDt&&(console.warn(`dt too high ${Math.round(this.dt)}ms. , Capped to ${this.settings.maxDt}ms.`),this.dt=this.settings.maxDt),!this.settings.smooth)this.update(this.dt),this.dt=0;else{let i=0;for(;this.dt>0&&i<this.settings.maxFrameNumber;){let n=Math.min(this.dt,this.settings.maxFrameDt);this.update(n),this.dt-=n,i++}}this.lastTime=t,g=S(this.updateLoop.bind(this))}loadPlugin(t){t.init(this),this.loadedPlugins.push(t),this.info(2,"Plugin Loaded",t.name)}info(t,i,n){t>this.settings.logLevel||(n?console.log(i,n):console.log(i))}emit(t,i){if(!this.settings.safe)return t(i);try{t(i)}catch(n){console.warn(n)}}emitCreated(t){for(let i of this.eventCreated)this.emit(i,t)}addListenerCreated(t){this.eventCreated.push(t)}removeListenerCreated(t){let i=this.eventCreated.indexOf(t);i!==-1&&this.eventCreated.splice(i,1)}setLog(t){this.settings.logLevel=t}setSafe(t){this.settings.safe=t}};var W=new Q;module.exports=$(G);0&&(module.exports={EasingType});
