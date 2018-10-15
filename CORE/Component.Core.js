"use strict"
if (App.Core === undefined)
    App.Core = {}
if (App.Core.Component === undefined)
    App.Core.Component = {}


App.Core.Component = function (View, Model) {
    var v = View;
    var m = Model;
    this.model = m;
    this.View = new v();

    this.onactivate = undefined;
    this.Activate = function () {
        if (typeof this.onactivate === 'function')
            this.onactivate(this, this.Model);
    }
    this.prepare = function (container,attr,Model) {
        this.View.prepare(container,attr);
        if (Model)
            this.model = Model;
        if (this.model)
            this.View.fillCustomData(Model);
            
        this.View.fillResource();
    }
    this.show = function (prepend) {
        this.View.display(prepend);
    }
    this.addEventListener = function (eventname, listener) {
        var self = this;
        this.View.addEventListener(eventname, function () {
            listener({
                sender: self,
                Model: self.Model,
                View: self.View
            });
        });

    }
    this.remove = function () {
        this.onactivate = undefined;
        this.View.remove();
        this.View = undefined;
        this.model = undefined;
    }

    Object.defineProperty(this, "Model", {
        get: function () {
            return this.model;
        },
        set: function (val) {
            this.model = val;
            this.View.fillCustomData(val);
        }
    });
}