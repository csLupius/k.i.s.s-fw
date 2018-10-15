"use strict"
if (App.View === undefined)
    App.View = {};

// App.View.Main = Object.create(App.Core.View);
// App.View.Main.init('MainWindow','MainWindow',[]);
App.View.Main = function () {
    App.Core.View.call(this, 'SampleWindow','MainWindow',[])
}