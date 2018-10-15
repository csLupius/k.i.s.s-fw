"use strict"
if (App.Component === undefined)
    App.Component = {}
App.Component.Sample = function () {
    App.Core.Component.call(this, App.View.Sample);
}