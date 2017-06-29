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

* **MoveTo**(x: `number`, y: `number`, duration: `number`): Move to an absolute position
* **MoveXTo**(x: `number`, duration: `number`)
* **MoveYTo**(y: `number`, duration: `number`)
* **MoveToRel**(x: `number`, y: `number`, duration: `number`): Move to a relative position
* **MoveXToRel**(x: `number`, duration: `number`)
* **MoveYToRel**(y: `number`, duration: `number`)
* **PunchPosition**(x: `number`, y: `number`, duration: `number`, iteration: `number`): Oscillate around the current position
* **Shake**(x: `number`, y: `number`, duration: `number`, iteration: `number`): Shake around the current position

### Rotation
Following methods use `.rotation`

* **RotateTo**(rad: `number`, duration: `number`) : Rotate to a specific angle in radiant (to PI/2)
* **RotateToRel**(rad: `number`, duration: `number`) : Rotate by a relative radiant angle (+PI/2)
* **RotateDegTo**(deg: `number`, duration: `number`) : Rotate to a specific angle in degrees (to 90°)
* **RotateDegToRel**(deg: `number`, duration: `number`) : Rotate to a specific angle in degrees (+90°)
* **PunchRotate**(rad: `number`, duration: `number`, iteration: `number`)

### Alpha
Following method use `.alpha`

* **FadeTo**(alpha, duration: `number`) : Alpha is a float between 0 and 1 (1: fadeIn, 0: fadeOut)

### Scale
Following methods use `.scale.x` and `.scale.y`

* **ScaleTo**(x: `number`, y: `number`, duration: `number`) : Scale to a specified value
* **ScaleXTo**(x: `number`, duration: `number`)
* **ScaleYTo**(y: `number`, duration: `number`)
* **ScaleToRel**(x: `number`, y: `number`, duration: `number`)
* **ScaleXToRel**(x: `number`, duration: `number`)
* **ScaleYToRel**(y: `number`, duration: `number`)
* **PunchScale**(x: `number`, y: `number`, duration: `number`, iteration: `number`)

### Color / Tint
Following methods use `.tint` or `.hue` (the color API are slightly different between libs)

* **ColorTo**(r: `number`, g: `number`, b: `number`, duration: `number`): R,G,B are float between 0-1
* **ColorToRel**(r: `number`, g: `number`, b: `number`, duration: `number`)
* **ColorRGBTo**(color: `string`, duration: `number`): color is a string representation '#FFFFFF'
* **ColorRGBToRel**(color: `string`, duration: `number`)
* **PunchColor**(r: `number`, g: `number`, b: `number`, duration: `number`, iteration: `number`)