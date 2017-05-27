+++
date = "2017-05-21T13:06:37+09:00"
title = "Fatina"
weight = 7

+++

## Tweens

A tween (from [_in-between_](http://en.wikipedia.org/wiki/Inbetweening)) is a concept that allows you to change the values of the properties of an object in a smooth way. You just tell it which properties you want to change, which final values should they have when the tween finishes running, and how long should this take, and the tweening engine will take care of finding the intermediate values from the starting to the ending point.

## What is Fatina ?

Fatina is a new tweening library designed to be easy to use and easy to understand.
The main inspiration is the C# library [DOTween](http://dotween.demigiant.com/)

## Fatina Features

* **Logical and easy to use API** : An API made to boost efficiency, intuitiveness and ease of use.
* **Lightweight** no extra dependencies and a minified file < 25KB
* **Speed and efficiency** : Not only very fast, but also very efficient: everything is cached and reused to avoid useless GC allocations.
* **Open source & Easy to read**
* **Safe mode** : Activate the optional safe mode and let DOTween take care of unexpected occurrences, like a tween's target being destroyed while playing.
* **Plugins** : Fatina is built with an extensible architecture in mind, which allows you to create your own tween plugins as separate files.