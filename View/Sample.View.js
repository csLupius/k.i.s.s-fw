"use strict"
if (App.View === undefined)
    App.View = {};

// App.View.Sample = Object.create(App.Core.View);
// App.View.Sample.init('SampleCard', '', []);
App.View.Sample = function () {
    App.Core.View.call(this, 'SampleCard', '', [])
}