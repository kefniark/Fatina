+++
date = "2017-05-21T13:06:37+09:00"
title = "Helpers Plugin - API"
toc = true
weight = 3

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/plugins/helpers/">Helpers</a>
    <a class="btn btn-default" href="/Fatina/plugins/helpers-usage/">Getting Started</a>
    <a class="btn btn-primary" href="/Fatina/plugins/helpers-api/">API</a>
</div>

### Position
Following methods use `.position.x` and `.position.y`

* **moveTo**(x: `number`, y: `number`, duration: `number`): Move to an absolute position
* **moveXTo**(x: `number`, duration: `number`)
* **moveYTo**(y: `number`, duration: `number`)
* **moveToRel**(x: `number`, y: `number`, duration: `number`): Move to a relative position
* **moveXToRel**(x: `number`, duration: `number`)
* **moveYToRel**(y: `number`, duration: `number`)
* **punchPosition**(x: `number`, y: `number`, duration: `number`, iteration: `number`): Oscillate around the current position
* **shake**(x: `number`, y: `number`, duration: `number`, iteration: `number`): Shake around the current position

### Rotation
Following methods use `.rotation`

* **rotateTo**(rad: `number`, duration: `number`) : Rotate to a specific angle in radiant (to PI/2)
* **rotateToRel**(rad: `number`, duration: `number`) : Rotate by a relative radiant angle (+PI/2)
* **rotateDegTo**(deg: `number`, duration: `number`) : Rotate to a specific angle in degrees (to 90°)
* **rotateDegToRel**(deg: `number`, duration: `number`) : Rotate to a specific angle in degrees (+90°)
* **punchRotate**(rad: `number`, duration: `number`, iteration: `number`)

### Alpha
Following method use `.alpha`

* **fadeTo**(alpha, duration: `number`) : Alpha is a float between 0 and 1 (1: fadeIn, 0: fadeOut)

### Scale
Following methods use `.scale.x` and `.scale.y`

* **scaleTo**(x: `number`, y: `number`, duration: `number`) : Scale to a specified value
* **scaleXTo**(x: `number`, duration: `number`)
* **scaleYTo**(y: `number`, duration: `number`)
* **scaleToRel**(x: `number`, y: `number`, duration: `number`)
* **scaleXToRel**(x: `number`, duration: `number`)
* **scaleYToRel**(y: `number`, duration: `number`)
* **punchScale**(x: `number`, y: `number`, duration: `number`, iteration: `number`)

### Color / Tint
Following methods use `.tint` or `.hue` (the color API are slightly different between libs)

* **colorTo**(r: `number`, g: `number`, b: `number`, duration: `number`): R,G,B are float between 0-1
* **colorToRel**(r: `number`, g: `number`, b: `number`, duration: `number`)
* **colorRGBTo**(color: `string`, duration: `number`): color is a string representation '#FFFFFF'
* **colorRGBToRel**(color: `string`, duration: `number`)
* **punchColor**(r: `number`, g: `number`, b: `number`, duration: `number`, iteration: `number`)