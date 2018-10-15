"use strict"
if (App.TOOLS === undefined)
    App.TOOLS = {}



App.TOOLS.ConfigManager = (function () {
    var configJSON = undefined;

    function readResourceFile(callback) {
        var stringToReturn = '';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    stringToReturn = this.responseText;
                    configJSON = JSON.parse(stringToReturn);
                    callback(configJSON);
                }
            }
        };

        xhr.open("GET", "/Resources/" + 'config' + "." + "json", false);

        xhr.send();
    }

    function _getResource(field, callback) {
        // debugger;
        if (configJSON === undefined) {
            readResourceFile(function () {
                _getResource(field, callback)
            });
        }
        if (configJSON.hasOwnProperty(field)) {
            if (configJSON[field] === '')
                callback(undefined);
            else
                callback(configJSON[field]);
        } else
            callback(undefined)
    }
    return {
        getResource: _getResource
    }
})();
