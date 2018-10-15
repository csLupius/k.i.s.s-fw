"use strict"
if (App.Controller === undefined)
    App.Controller = {}
App.Controller.Connection = (function () {

    var _getModel = function (cb) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var source = JSON.parse(this.responseText);
                        var res = [];
                        for (var i = 0; i < source.length; i++) {
                            var a = new App.Model.Sample(source[i].Title, source[i].Description, source[i].PubDate);
                            res.push(a);
                        }
                        cb(res);
                    }
                }
            };
            App.TOOLS.ConfigManager.getResource('SampleAdress', function (url) {
                xhr.open("GET", url, true);
                xhr.send();
            })

        } catch (e) {
            console.log(e.message);
        }
    }

    return {
        getModels: _getModel,
    }
})();