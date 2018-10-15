"use strict"
if (App.TOOLS === undefined)
    App.TOOLS = {}
App.TOOLS.ResourceManager = (function () {
    var resourceJSON = undefined;
    var lan = 'tr';

    function readResourceFile() {
        var stringToReturn = '';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resourceJSON = {}
                    stringToReturn = this.responseText;
                    var response = JSON.parse(stringToReturn);
                    var resKeys = Object.keys(response);
                    for (var i = 0; i < resKeys.length; i++) {

                        resourceJSON[resKeys[i].toLowerCase()] = response[resKeys[i]];
                    }
                }
            }
        };

        xhr.open("GET", "/Resources/" + lan + '-Resource' + "." + "json", false);

        xhr.send();
    }

    function _setLang(_lan) {
        lan = _lan;
        //Storage?

    }

    function _getResource(field) {
        // debugger;
        if (resourceJSON === undefined) {
            readResourceFile();
        }
        if (resourceJSON.hasOwnProperty(field.toLowerCase())) {
            if (resourceJSON[field.toLowerCase()] === '')
                readResourceFile();
            return resourceJSON[field.toLowerCase()];
        } else
            return undefined
    }
    return {
        getResource: _getResource,
        setLang: _setLang
    }
})();