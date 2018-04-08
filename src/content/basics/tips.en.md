+++
date = "2017-05-21T13:06:37+09:00"
title = "Tips"
toc = true
weight = 8

+++

### How to write tweens ?
* Keep them simple: a **Tween** should do only one thing (avoid nesting and complexity)
* Split them in smaller tween to have more control (like splitting a `x` and `y` movement in two separated tweens)
* Group them in **Sequence** and prefer using `.append()` and `.join()`
* When you destroy an object like a sprite, Try to clean tweens related
* Avoid **SetTimeout()** and prefer **Fatina.setTimeout()**: All the objects/events should be ticked together, normal settimeout cannot be paused ...

### How to go farther ?
* If you already have an update loop, try to tick manually **Fatina** to keep animation and rendering in sync
* Having sequence of sequence of sequence is perfectly fine ^^
* You can tween a proxy object or a proxy property and use the result to calculate something else (`dx`/`dy` to after calculate `x`/`y`)
* With **Ticker**, you can tween times of other tweens (bullet time, ...)
* You can use `Ticker.setTimescale()` to tick part of your game at different speed and manage multiple tick unit (frame, seconds, ...)

## Debug
Sometime, debugging animations and tweens can be quite complicated. **Fatina** provides few features to help you:

* Change the **Verbosity** (Fatina.setLog, Tween.setLog, Sequence.setLog)
   * `.setLog(0)`: **None** (default value), print nothing
   * `.setLog(1)`: **Info**, log only warning
   * `.setLog(2)`: **Debug**, log every event
