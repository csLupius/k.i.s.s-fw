"use strict"
if (App.Controller === undefined)
    App.Controller = {}

App.Controller.Main = {
    View: new App.View.Main()
}
//////////////////////////////

/////////////////////////////
App.Controller.Main.showCityCount = 7;
App.Controller.Main.show = function (container) {
    var ActiveHaberler = [];
    var c = container
    this.View.prepare(c, {
        "style": "background-color:#fffff8"
    });
    this.View.display(true);
    var self = this;
    var modelsHolder = undefined;

    var displayArticle = function (article) { //, loadfromright){
        var c = new App.Component.Sample()
        c.prepare(modelsHolder,{}, article);
        c.show(true);
        c.addEventListener("click", function (e) {
            console.log(e);
            window.lastClicked = e;
        })
    }
    var getModelHandler = function (models) {

        if (modelsHolder === undefined)
            modelsHolder = self.View.cElement.querySelector("#sampleholder");

        for (var i = models.length - 1; i >= 0; i--) {
            displayArticle(models[i])
        }
        unload(ActiveHaberler, function (r) {
            ActiveHaberler = r;
        })
        App.DoneWork();
    }

    //////////////////////
    var unload = function (ActiveList, activeListOutputcb) {
        for (var i = 0; i < ActiveList.length; i++) {
            ActiveList[i].remove();
        }
        activeListOutputcb([])
    }
    /////////////////////////

    /////////////////////////
    App.DoingWork();
    App.Controller.Connection.getModels(getModelHandler);

}
App.Controller.Main.remove = function _remove() {
    this.View.remove();
    this.Model = undefined;
    this.View = undefined;
}