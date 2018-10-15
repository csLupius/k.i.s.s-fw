"use strict"
if(App.TOOLS === undefined){
    App.TOOLS = {}
}
App.TOOLS.TemplateManager = {
    templates: [],
    load: function (templateName, fileExtension ) {
        if(!fileExtension)fileExtension ='html';
        if (this.templates[templateName]) {
            return this.templates[templateName];
        }
        var stringToReturn = '';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                stringToReturn = this.responseText;
            } else
                stringToReturn = this.response;
        };
        xhr.open("GET", "/Templates/" + templateName + "." + fileExtension,false);
        
        xhr.send();

        if (stringToReturn.length > 0) {
            this.templates[templateName] = stringToReturn;
            return this.templates[templateName];
        } else {
            return templateName + ".html Template cannot be loaded";
        }
    }
}