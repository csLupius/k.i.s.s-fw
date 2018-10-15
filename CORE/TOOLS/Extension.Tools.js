"use strict"
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};
Date.prototype.dayMonth = function () {
    //ResourceManager.setLang("EN");
    var monthNames = App.TOOLS.ResourceManager.getResource("monthNames");
    var dayNames = App.TOOLS.ResourceManager.getResource("dayNames");
    return (dayNames[this.getDay()] + ", " + this.getDate() + "/" + monthNames[this.getMonth()])
}
String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

String.prototype.trCharToEnCharString = function () {
    var res = this.allReplace({
        'Ö': 'O',
        'ö': 'o',
        'Ü': 'U',
        'ü': 'u',
        'Ğ': 'G',
        'ğ': 'g',
        'Ş': 'S',
        'ş': 's',
        'İ': 'I',
        'ı': 'i',
        'Ç': 'C',
        'ç': 'c'
    });
    return res;
}
console.documentlog = function (place, log, type) {
    console.log(place + ": " + log);
    if (true) return;
    if (App.DebugElement == undefined) {
        App.DebugElement = document.createElement("div");
        App.DebugElement.setAttribute("style", "width:35%;height:100%; right:1%; border:1px solid white;position:absolute;top:0;z-index:1000;background-color:rgba(0, 0, 0, 0.7);font-size:13px;overflow-y:scroll");
        document.body.appendChild(App.DebugElement);
        App.DebugElement.innerHTML = '<p style="color:yellow">Start Debug Console..</p>' +
            '<p style="color:yellow">Bootup URL:' + document.location + '</p>';
    }
    var text = place + ": " + log;
    if (type == 1 || type == undefined)
        text = '<p style="color:white;word-wrap:break-word;">' + text + '</p>';
    else if (type == 2)
        text = '<p style="color:yellow;word-wrap:break-word;">' + text + '</p>';
    else if (type == 3)
        text = '<p style="color:red;word-wrap:break-word;">' + text + '</p>';
    if (App.DebugElement.innerHTML.split('<p ').length > 40)
        App.DebugElement.innerHTML = App.DebugElement.innerHTML.substring(0, App.DebugElement.innerHTML.lastIndexOf('<p '));
    App.DebugElement.innerHTML = text + App.DebugElement.innerHTML;
    App.DebugElement.scrollTop = App.DebugElement.scrollHeight;
    App.DebugElement.scrollTop = 1; // DebugElement.scrollHeight;
}