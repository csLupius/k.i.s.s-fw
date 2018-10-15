"use strict"
window.addEventListener("load", function () {
    document.body.addEventListener("keydown", function (e) {
        // console.log(e.key);
        //console.documentlog('App.Controller.key', e.keyCode + '<-->' + e.key);
        switch (e.keyCode) {
            case 38:
            case 803:
                e.preventDefault()
                App.Up();
                break;
            case 40:
            case 804:
                e.preventDefault()
                App.Down();
                break;
            case 807:
            case 39:
                App.Right();
                break;
            case 805:
            case 37:
                e.preventDefault();
                App.Left()
                break;
            case 13:
            case 802:
                App.Activate();
                break;
            case 8:
                App.End();
                break;
            case 276:
                window.location.reload(false);
            default:
                break;
        }
    });
    App.Start(this.document.body)
    document.body.focus();
})