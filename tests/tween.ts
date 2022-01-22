import * as test from 'tape'
import { Test } from 'tape'
import { Log } from '../src/core/enum/log'
import { State } from '../src/core/enum/state'
import { ITween } from '../src/core/interfaces/ITween'
import { EasingType as Easing } from '../src/easing/easingType'
import { Ticker } from '../src/ticker'
import { Tween } from '../src/tweens/tween'

test('[Fatina.Tween] Get tween data', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }
  const dest = { x: 44, y: 44, nano: 1 }

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj).to(dest, 10).setParent(ticker)

  tween.start()

  t.notOk(tween.state === State.Finished, 'Tween is not completed yet')
  t.equal(0, tween.elapsed, 'Elapsed is correct at the beginning')
  t.equal(10, tween.duration, 'Duration')

  ticker.tick(1)

  t.equal(1, tween.elapsed, 'Elapsed is correct at the middle')

  for (let i = 0; i < 12; i++) {
    ticker.tick(1)
  }

  t.ok(tween.state === State.Finished, 'Tween is completed now')
  t.equal(10, tween.elapsed, 'Elapsed match duration at the end')
  t.end()
})

test('[Fatina.Tween] Create a basic tween', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }
  const dest = { x: 44, y: 44 }

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj).to(dest, 10).setParent(ticker)

  // Test a first update before start
  ticker.tick(1)
  t.equal(obj.x, 22, 'check the object is not ticked if not started')

  // Start & tick
  tween.start()
  ticker.tick(1)
  t.notEqual(obj.x, 22, 'check the object moved')

  // Tick to the end
  ticker.tick(9)
  t.equal(obj.x, 44, 'check the object reach the end')

  ticker.tick(1)
  t.equal(obj.name, 'nano', 'check the other properties are not modified')
  t.equal(obj.alpha, 1, 'check the other properties are not modified')

  t.end()
})

test('[Fatina.Tween] Create a basic tween with strange dest', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }

  // tslint:disable-next-line:no-construct
  const src = new String('Src') as any
  src.x = 22
  src.y = -42

  // tslint:disable-next-line:no-construct
  const dest = new String('Dest') as any
  dest.x = 44
  dest.y = 44

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj).from(src).to(dest, 10).setParent(ticker)

  // Test a first update before start
  ticker.tick(1)
  t.equal(obj.x, 22, 'check the object is not ticked if not started')

  // Start & tick
  tween.start()
  ticker.tick(1)
  t.notEqual(obj.x, 22, 'check the object moved')

  // Tick to the end
  ticker.tick(9)
  t.equal(obj.x, 44, 'check the object reach the end')

  ticker.tick(1)
  t.equal(obj.name, 'nano', 'check the other properties are not modified')
  t.equal(obj.alpha, 1, 'check the other properties are not modified')

  t.end()
})

test('[Fatina.Tween] Test Tween From property', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }
  const dest = { x: 44, y: 44 }

  let startx = 0
  let starty = 0
  const ticker = new Ticker()
  ticker.start()
  new Tween(obj)
    .from({ x: 1, y: 2 })
    .to(dest, 5)
    .setParent(ticker)
    .onStart(() => {
      startx = obj.x
      starty = obj.y
    })
    .start()

  ticker.tick(6)

  t.equal(startx, 1, 'From X property was properly used')
  t.equal(starty, 2, 'From Y property was properly used')
  t.equal(obj.x, dest.x, 'Still reach the normal destination')

  t.end()
})

test('[Fatina.Tween] Test Tween Relative property', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }
  const dest = { x: 44, y: 44 }

  let startx = 0

  const ticker = new Ticker()
  ticker.start()

  new Tween(obj)
    .setRelative(true)
    .to(dest, 5)
    .setParent(ticker)
    .onStart(() => {
      startx = obj.x
    })
    .start()

  ticker.tick(6)

  t.equal(startx, 22, 'Relative didnt changed the from property')
  t.equal(obj.x, 66, 'Destination X use relative')
  t.equal(obj.y, 2, 'Destination Y use relative')

  t.end()
})

test('[Fatina.Tween] Test Tween with a undefined object', (t: Test) => {
  const obj: any = undefined
  const dest = { x: 44, y: 44 }

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj).to(dest, 5).setParent(ticker)

  t.throws(() => tween.start(), 'Check Start explode')
  t.end()
})

test('[Fatina.Tween] Test Tween with a undefined property', (t: Test) => {
  const obj: any = { x: 1, y: 4 }
  const dest = { x: 44, y: 44, z: 2 }

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj).to(dest, 5).setParent(ticker)

  t.doesNotThrow(() => tween.start(), 'Check Start not explode')
  t.end()
})

test('[Fatina.Tween] Test mix of concurrent running and paused tween', (t: Test) => {
  const dest = { x: 44, y: 44 }
  const ticker = new Ticker()
  ticker.start()

  let started = 0
  let updated = 0
  let finished = 0
  const paused: ITween[] = []

  for (let i = 0; i < 10; i++) {
    const obj = { name: 'alice' + i, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, alpha: 1 }
    new Tween(obj)
      .to(dest, 10)
      .setParent(ticker)
      .onStart(() => started++)
      .onUpdate(() => updated++)
      .onComplete(() => finished++)
      .start()

    const obj2 = { name: 'bob' + i, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50, alpha: 1 }
    const tween = new Tween(obj2)
      .to(dest, 10)
      .setParent(ticker)
      .onStart(() => started++)
      .onUpdate(() => updated++)
      .onComplete(() => finished++)
    tween.start()
    tween.start()
    tween.pause()
    tween.pause()
    paused.push(tween)
  }

  let elapsed = 0
  let iterate = 0
  for (let i = 0; i < 20; i++) {
    const dt = Math.random() * 0.2 + 0.8
    elapsed += dt
    if (iterate === 0 && elapsed >= 10) {
      iterate = i + 1
    }
    ticker.tick(dt)
  }

  t.equal(started, 20, 'check all OnStart event where emitted')
  t.equal(updated, 10 * iterate, 'check all OnUpdate event where emitted by running tween')
  t.equal(finished, 10, 'check all OnComplete event where emitted by running tween')

  // Resume pause tween
  for (const pause of paused) {
    pause.resume()
    pause.resume()
  }

  ticker.tick(11)
  t.equal(finished, 20, 'check all OnComplete event where emitted')

  t.end()
})

test('[Fatina.Tween] Test Tween loop', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }

  let start = 0
  let complete = 0
  let elapsed = 0

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj)
    .from({ x: 0 })
    .to({ x: 44 }, 5)
    .setParent(ticker)
    .setLoop(3)
    .onStart(() => (start += 1))
    .onUpdate((dt) => (elapsed += dt))
    .onComplete(() => (complete += 1))

  tween.start()

  for (let i = 0; i < 20; i++) {
    ticker.tick(1)
  }

  t.equal(1, start, 'check onStart was emitted once')
  t.equal(1, complete, 'check onComplete was emitted once')
  t.equal(15, elapsed, 'check the tween was looped 3 times')

  t.end()
})

test('[Fatina.Tween] Test Tween infinite loop', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }

  let start = 0
  let complete = 0
  let elapsed = 0

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj)
    .from({ x: 0 })
    .to({ x: 44 }, 10)
    .setParent(ticker)
    .setLoop(-1)
    .onStart(() => (start += 1))
    .onUpdate((dt) => (elapsed += dt))
    .onComplete(() => (complete += 1))

  tween.start()

  for (let i = 0; i < 25; i++) {
    ticker.tick(1)
  }

  t.equal(1, start, 'check onStart was emitted once')
  t.equal(0, complete, 'check onComplete was never reached')
  t.equal(25, elapsed, 'check all the onUpdate were emitted')
  t.equal(22, obj.x, 'check the object is at the right position')

  t.end()
})

test('[Fatina.Tween] Test Tween timescale', (t: Test) => {
  const obj = { name: 'nano', x: 22, y: -42, alpha: 1 }

  let start = 0
  let complete = 0
  let elapsed = 0
  let update = 0

  const ticker = new Ticker()
  ticker.start()

  const tween = new Tween(obj)
    .from({ x: 0 })
    .to({ x: 44 }, 5)
    .setParent(ticker)
    .setTimescale(0.5)
    .onStart(() => (start += 1))
    .onUpdate((dt) => {
      update += 1
      elapsed += dt
    })
    .onComplete(() => (complete += 1))

  t.ok(tween.isIdle)
  tween.start()
  t.notOk(tween.isIdle)

  for (let i = 0; i < 25; i++) {
    ticker.tick(1)
  }

  t.equal(1, start, 'check onStart was emitted once')
  t.equal(1, complete, 'check onComplete was emitted once')
  t.equal(5, elapsed, 'check elapsed time on this tween is the right one')
  t.equal(10, update, 'check that the speed was half the normal speed')

  t.end()
})

test('[Fatina.Tween] Test Tween without parent', (t: Test) => {
  const tween = new Tween({}).to({}, 5)

  t.throws(() => tween.start(), 'Check Start explode')
  t.end()
})

test('[Fatina.Tween] Test Tween without to', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()
  let complete = false
  const tween = new Tween({}).setParent(ticker).onComplete(() => (complete = true))

  t.doesNotThrow(() => tween.start(), 'Check Start does not explode')
  t.notOk(complete, 'Check this tween is not finished yet')
  ticker.tick(0.000000001)
  t.ok(complete, 'Check this tween immediately finished')
  t.end()
})

test('[Fatina.Tween] Test Tween Easing', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()
  t.doesNotThrow(() => new Tween({}).to({}, 5).setParent(ticker).setEasing(Easing.OutQuad).start(), 'easing by type')
  t.doesNotThrow(() => new Tween({}).to({}, 5).setParent(ticker).setEasing('inOutQuad').start(), 'easing by name')
  t.throws(() => new Tween({}).to({}, 5).setParent(ticker).setEasing('tuna').start(), 'easing which doesnt exist')
  t.end()
})

test('[Fatina.Tween] Test Tween Kill', (t: Test) => {
  let complete = 0
  let killed = 0

  const ticker = new Ticker()
  ticker.start()
  const tween = new Tween({ x: 22 })
    .to({ x: 44 }, 5)
    .setParent(ticker)
    .onComplete(() => (complete += 1))
    .onKilled(() => (killed += 1))

  tween.start()
  ticker.tick(1)
  t.ok(tween.state === State.Run)
  t.notOk(tween.state === State.Killed)
  tween.kill()

  t.notOk(tween.state === State.Run)
  t.ok(tween.state === State.Killed)
  t.notOk(tween.state === State.Finished)
  tween.kill()
  ;(tween as any).tick(1)

  t.equal(1, killed)
  t.equal(0, complete)

  t.end()
})

test('[Fatina.Tween] Test Tween Kill', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()
  const sequence = new Tween({}).to({}, 2).setParent(ticker).toSequence().prependInterval(1).appendInterval(1)

  let start = 0
  let update = 0
  sequence.onStepStart(() => start++)
  sequence.onUpdate(() => update++)
  sequence.start()

  for (let i = 0; i < 10; i++) {
    ticker.tick(1)
  }

  t.equal(3, start, 'check that the sequence has 3 steps')
  t.equal(4, update, 'check the duration')

  t.throws(() => new Tween({}).to({}, 2).toSequence().start(), 'check that we cant use toSequence without ticker')

  t.end()
})

test('[Fatina.Tween] Test Tween with broken callback', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 22 }
  new Tween(obj)
    .to({ x: 44 }, 2)
    .setParent(ticker)
    .onStart(() => {
      throw new Error('Test Random User Exception')
    })
    .onUpdate(() => {
      throw new Error('Test Random User Exception')
    })
    .onComplete(() => {
      throw new Error('Test Random User Exception')
    })
    .start()

  ticker.tick(2)
  t.equal(44, obj.x, 'tween finished properly')
  t.end()
})

test('[Fatina.Tween] Test Skip', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  let complete = 0
  const tween = new Tween({})
    .to({}, 2)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(1)
  t.equal(1, tween.elapsed, 'check this tween is started')

  tween.skip()
  t.equal(2, tween.elapsed, 'check this tween is over')
  t.equal(1, complete, 'check the onComplete callback is emitted')

  t.end()
})

test('[Fatina.Tween] Test Reverse', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0 }
  let complete = 0
  const tween = new Tween(obj)
    .to({ x: 10 }, 5)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(4)
  t.equal(8, obj.x, 'check the object position')
  t.equal(4, tween.elapsed, 'check this tween is started')

  tween.reverse()
  t.equal(8, obj.x, 'check the object didnt moved')
  t.equal(1, tween.elapsed, 'check the elapsed value is fine')

  ticker.tick(4)

  t.equal(0, obj.x, 'check the object went back to the original position')
  t.equal(5, tween.elapsed, 'check the elapsed value is fine')
  t.equal(1, complete, 'check the onComplete callback is emitted')

  tween.reverse()
  ticker.tick(5)

  t.equal(10, obj.x, 'check the object went back to the original destination')
  t.equal(5, tween.elapsed, 'check the elapsed value is fine')
  t.equal(2, complete, 'check the onComplete callback is emitted')

  t.end()
})

test('[Fatina.Tween] Test Yoyo', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0 }
  let complete = 0
  new Tween(obj)
    .to({ x: 10 }, 5)
    .yoyo(2)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(4)
  t.equal(8, obj.x, 'check the object position')

  ticker.tick(4)
  t.equal(4, obj.x, 'check the object position')

  ticker.tick(4)
  t.equal(4, obj.x, 'check the object position')
  t.equal(0, complete, 'check the onComplete callback is not emitted yet')

  ticker.tick(4)
  t.equal(10, obj.x, 'check the object position')
  t.equal(1, complete, 'check the onComplete callback is emitted')

  t.end()
})

test('[Fatina.Tween] Test Yoyo 2', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0 }
  let complete = 0
  let tween = new Tween(obj)
    .setRelative(true)
    .to({ x: 10 }, 5)
    .yoyo(1)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(10)
  t.ok(tween.isFinished)
  t.equal(0, obj.x, 'check the object position')

  tween = new Tween(obj)
    .setRelative(true)
    .to({ x: 10 }, 5)
    .yoyo(1)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(2)
  tween.skip(true)
  t.ok(tween.isFinished)
  t.equal(0, obj.x, 'check the object position')

  tween = new Tween(obj)
    .setRelative(true)
    .to({ x: 10 }, 5)
    .setLoop(3)
    .setLoop(2)
    .yoyo(2)
    .yoyo(1)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()
  ticker.tick(7.5)
  tween.reset()

  tween = new Tween(obj)
    .setRelative(true)
    .to({ x: 10 }, 5)
    .setLoop(3)
    .setLoop(2)
    .yoyo(2)
    .yoyo(1)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()
  ticker.tick(2.5)
  tween.reset()

  t.end()
})

test('[Fatina.Tween] Test Yoyo Infinite', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0 }
  let complete = 0
  const tween = new Tween(obj)
    .setRelative(true)
    .to({ x: 10 }, 5)
    .yoyo(-1)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(2.5)
  t.equal(obj.x, 5)
  ticker.tick(10000)
  t.equal(obj.x, 5)

  t.ok(!tween.isFinished)

  t.end()
})

test('[Fatina.Tween] Test Modify', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  let complete = 0
  const obj = { x: 0, y: 0 }
  const tween = new Tween(obj)
    .to({ x: 1, y: 1 }, 2)
    .setParent(ticker)
    .onComplete(() => complete++)
    .start()

  ticker.tick(1)
  t.equal(1, tween.elapsed, 'check this tween is started')
  tween.modify({ x: 1 }, true)

  ticker.tick(1)

  t.equal(2, tween.elapsed, 'check this tween is over')
  t.equal(2, obj.x, 'check the final position was updated')
  t.equal(1, complete, 'check the onComplete callback is emitted')
  ;(tween as any).complete()
  t.equal(1, complete, 'check the onComplete callback is emitted')

  tween.modify({ x: 1 }, false)

  t.end()
})

test('[Fatina.Tween] Test Steps', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj1 = { x: 0 }
  const obj2 = { x: 0 }
  const obj3 = { x: 0 }
  const tween1 = new Tween(obj1).setParent(ticker).to({ x: 10 }, 10).setSteps(5).start()
  const tween2 = new Tween(obj2).setParent(ticker).to({ x: 10 }, 10).setSteps(10).start()
  const tween3 = new Tween(obj3).setParent(ticker).to({ x: 10 }, 10).setSteps(4).start()

  ticker.tick(1)
  t.equal(2, obj1.x)
  t.equal(1, obj2.x)
  t.equal(0, obj3.x)
  ticker.tick(0.5)
  t.equal(2, obj1.x)
  t.equal(2, obj2.x)
  t.equal(2.5, obj3.x)
  ticker.tick(1.5)
  t.equal(4, obj1.x)
  t.equal(3, obj2.x)
  t.equal(2.5, obj3.x)

  t.ok(tween1.isRunning)
  t.ok(tween2.isRunning)
  t.ok(tween3.isRunning)

  ticker.tick(1)
  t.equal(4, obj1.x)
  t.equal(4, obj2.x)
  t.equal(5, obj3.x)
  ticker.tick(2)
  t.equal(6, obj1.x)
  t.equal(6, obj2.x)
  ticker.tick(2)
  t.equal(8, obj1.x)

  tween3.pause()
  ticker.tick(2)
  t.equal(10, obj1.x)

  t.ok(tween1.isFinished)
  t.ok(tween2.isFinished)
  t.notOk(tween3.isFinished)
  t.notOk(tween1.isRunning)
  t.notOk(tween2.isRunning)
  t.ok(tween3.isPaused)

  t.end()
})

test('[Fatina.Tween] Looping relative tween', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0 }

  new Tween(obj).setParent(ticker).setRelative(true).to({ x: 1 }, 1).setEasing('inOutQuad').setLoop(-1).start()

  ticker.tick(1)
  t.equal(1, obj.x, 'Check the object moved')

  ticker.tick(40)
  t.equal(41, obj.x, 'Check the object moved 40 times')

  for (let i = 0; i < 4; i++) {
    ticker.tick(0.2)
    ticker.tick(0.2)
    ticker.tick(0.2)
    ticker.tick(0.2)
    ticker.tick(0.2)
  }
  t.equal(45, obj.x, 'Check the object reached his destination')

  t.end()
})

test('[Fatina.Tween] Safe & Debug', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0 }

  new Tween(obj)
    .setParent(ticker)
    .to({ x: 1 }, 10)
    .setEasing('inOutQuad')
    .setSettings({ logLevel: Log.Debug, safe: false } as any)
    .onComplete(() => {})
    .start()

  ticker.tick(10)

  t.end()
})

test('[Fatina.Tween] Tween destroyed object/properties', (t: Test) => {
  const ticker = new Ticker()
  ticker.start()

  const obj = { x: 0, sub: { x: 0 } }

  const tween = new Tween(obj).setParent(ticker).to({ x: 5 }, 5).start()
  new Tween(obj.sub).setParent(ticker).to({ x: 5 }, 5).start()

  ticker.tick(1)
  t.equal(1, obj.x, 'Check the object moved')

  delete (obj as any).x
  delete (obj as any).sub

  ticker.tick(1)

  t.equal(2, obj.x, 'Check the object moved')

  obj.x = 'test' as any
  ticker.tick(1)
  t.equal(3, obj.x, 'Check the object moved')

  tween.init(undefined)
  t.equal(3, obj.x, 'Check the object moved')

  tween.reset()

  t.end()
})
