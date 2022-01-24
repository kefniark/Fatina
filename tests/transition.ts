import * as test from 'tape'
import { Test } from 'tape'
import { Fatina } from '../src/fatina'

const fatina = new Fatina()
fatina.init(false)

test('[Fatina.Transition] Create a simple Transition', (t: Test) => {
  const obj = { x: 0 }
  const transition = fatina.transition(obj)
  transition.to({ x: 1 }, 10)

  fatina.update(5)
  t.equal(obj.x, 0.5)
  fatina.update(10)
  t.equal(obj.x, 1)

  t.end()
})

test('[Fatina.Transition] Avoid duplicated Transitions', (t: Test) => {
  const obj = { x: 0 }
  const transition = fatina.transition(obj)
  transition.to({ x: 1 }, 10)
  for (let i = 0; i < 5; i++) {
    fatina.update(1)
    transition.to({ x: 1 }, 10)
  }

  t.equal(obj.x, 0.5)
  fatina.update(5)
  t.equal(obj.x, 1)

  t.end()
})

test('[Fatina.Transition] Use speed and not duration', (t: Test) => {
  const obj = { x: 0, y: 0 }
  const transition = fatina.transition(obj)
  transition.toSpeed({ x: 100 }, 50)
  transition.toSpeed({ y: -100 }, 25)
  fatina.update(1)
  t.equal(obj.x, 50)
  fatina.update(1)
  t.equal(obj.x, 100)
  t.equal(obj.y, -50)

  t.end()
})

test('[Fatina.Transition] Use async/await', (t: Test) => {
  const obj = { x: 0 }
  const transition = fatina.transition(obj)
  transition.promiseTo({ x: 1 }, 50).then((x) => {
    t.equal(obj.x, 1)
    t.equal(x.elapsed, 50)
    t.end()
  })
  fatina.update(49)
  fatina.update(1)
})

test('[Fatina.Transition] Use async/await with killed transition', (t: Test) => {
  const obj = { x: 0 }
  const transition = fatina.transition(obj)
  transition.promiseTo({ x: 1 }, 50).then((x) => {
    t.equal(obj.x, 0.5)
    t.equal(x.elapsed, 25)
    t.end()
  })
  fatina.update(25)
  transition.kill()
})
