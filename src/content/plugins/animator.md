+++
date = "2017-05-21T13:06:37+09:00"
title = "Animator Plugin"
toc = true
weight = 4

+++

### Description
This plugin was designed to provide an easy way to write game animations with **Fatina**.

It was design to solve few common issues related to game animations:

* **Reusability**: Animations can be shared by completely different object (fadeIn, gravity, ...)
* **Easy to use**: The main function is just `obj.Animator.Play('animationName');`
* **Performance**: Animations by default are reusable tweens, it means less instantiation at runtime and less memory usage
* **Animation State**: Each animation group is a state machine, starting a new animation will stop the previous one automatically

<div style="text-align: center; margin-top: 30px;">
    <a class="btn btn-primary" href="https://github.com/kefniark/Fatina-Plugin-Animator/" target="_blank">Github</a>
    <a class="btn btn-info" href="https://github.com/kefniark/Fatina-Plugin-Animator/releases" target="_blank">Download</a>
    <a class="btn btn-success" href="https://www.npmjs.com/package/fatina-plugin-animator" target="_blank">NPM</a>
</div>

### Demo - UnityChan Animator
{{% code "static/animator/index.html" %}}
