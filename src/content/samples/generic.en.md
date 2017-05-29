+++
date = "2017-05-21T13:06:37+09:00"
title = "Generic Tweens"
toc = true
weight = 1

+++

<style>
.imgTest {
    position: relative;
    margin: 0;
}

hr {
    border-top: 1px dashed #8c8b8b;
    border-bottom: 1px dashed #fff;
    margin-top: 25px !important;
    clear: both;
}
</style>

<p>
The following example are moving html elements but you can tween almost any kind of object and data.
</p>
<div style="text-align:center">
    <button class="btn btn-success" onclick="playAll()">PlayAll</button>
</div>

<h3>Linear tween</h3>

{{% code "static/samples/generic1.html" %}}
{{%expand "See Code" %}}
```js
{{% snippet "static/samples/generic1.html" %}}
```
{{% /expand %}}

<hr/>

<h3>Easing <small>(based on <a href="http://easings.net">easings.net</a>)</small></h3>

{{% code "static/samples/generic2.html" %}}
{{%expand "See Code" %}}
```js
{{% snippet "static/samples/generic2.html" %}}
```
{{% /expand %}}
<hr/>

<h3>Sequence <small>(Sequential &amp; Parallel)</small></h3>

{{% code "static/samples/generic3.html" %}}
{{%expand "See Code" %}}
```js
{{% snippet "static/samples/generic3.html" %}}
```
{{% /expand %}}
<hr/>

<h3>Pause / Resume</h3>
{{% code "static/samples/generic4.html" %}}
{{%expand "See Code" %}}
```js
{{% snippet "static/samples/generic4.html" %}}
```
{{% /expand %}}
<hr/>

<h3>Timescale <small>(on both sequence &amp; tween)</small></h3>
{{% code "static/samples/generic5.html" %}}
{{%expand "See Code" %}}
```js
{{% snippet "static/samples/generic5.html" %}}
```
{{% /expand %}}
<hr/>

<h3>Loop <small>(on both sequence &amp; tween)</small></h3>
{{% code "static/samples/generic6.html" %}}
{{%expand "See Code" %}}
```js
{{% snippet "static/samples/generic6.html" %}}
```
{{% /expand %}}

<script>
    function playAll() {
        sample1();
        sample2();
        sample3();
        sample4();
        sample5();
        sample6();
    }

    (function() {
        setTimeout(() => playAll(), 500);
    })();
</script>