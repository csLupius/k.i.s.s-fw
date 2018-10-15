"use strict"
var App = {};
App.Started = false;
App.Ready = false;
App.Start = function (container) {
    var events = [];
    console.documentlog('App.Start', 'start', 1);
    var waitAnim = document.createElement('div');
    waitAnim.classList.add("waitAnim");
    waitAnim.id = "waitAnimationDiv";
    var waitimg = document.createElement('img');
    waitimg.src = "/Resources/img/waitanim.svg";
    waitimg.style.width = "200px";
    waitimg.style.height = "200px";
    waitAnim.appendChild(waitimg);

    //events.push(App.TOOLS.EventHandler.subscribe('doingWork', function () {
    //    App.Ready = false;
    //    container.appendChild(waitAnim)
    //}));
    //events.push(App.TOOLS.EventHandler.subscribe('doneWork', function () {
    //    App.Ready = true;
    //    container.removeChild(waitAnim);
    //}));
    //console.documentlog('App.Start', 'Goto show', 1);

    App.onWorkDoneEvent(function () {
        App.Ready = true;
        try {
            container.removeChild(waitAnim);
        } catch (e) {}
    });
    App.onWorkEvent(function () {
        App.Ready = false;
        container.appendChild(waitAnim);
    });
  

    this.Controller.Main.show(container);
    this.Started = true;
    
    //console.documentlog('App.Start', 'loaded', 1);
}
App.End = function () {
    if (this.Started) {
        this.Controller.Main.remove();
        window.close();
    }
    else return;
    this.Started = false;
}

App.Events = {
    onUpEventHandler: undefined,
    onDownEventHandler: undefined,
    onLeftEventHandler: undefined,
    onRightEventHandler: undefined,
    onActivateEventHandler: undefined,
    onWork: undefined,
    onWorkDone : undefined
}

App.onUpEvent = function (callback) {
    App.Events.onUpEventHandler = callback;
}
App.onDownEvent = function (callback) {
    App.Events.onDownEventHandler = callback;
}
App.onLeftEvent = function (callback) {
    App.Events.onLeftEventHandler = callback;
}
App.onRightEvent = function (callback) {
    // console.log('onRightEvent');
    App.Events.onRightEventHandler = callback;
}
App.onActivateEvent = function (callback) {
    App.Events.onActivateEventHandler = callback;
}
App.onWorkEvent = function (callback) {
    App.Events.onWork = callback;
}
App.onWorkDoneEvent = function (callback) {
    App.Events.onWorkDone = callback;
}
App.DoingWork = function () {
    if (typeof App.Events.onWork === "function")
        App.Events.onWork();
}
App.DoneWork = function () {
    if (typeof App.Events.onWork === "function")
        App.Events.onWorkDone();
}
App.Up = function () {
    if (this.Ready)
        if (typeof App.Events.onUpEventHandler === "function")
            App.Events.onUpEventHandler()
}
App.Down = function () {
    if (this.Ready)
        if (typeof App.Events.onDownEventHandler === "function")
            App.Events.onDownEventHandler()
}
App.Right = function () {
    // console.log('right');
    if (this.Ready)
        if (typeof App.Events.onRightEventHandler === "function")
            App.Events.onRightEventHandler()
}
App.Left = function () {
    if (this.Ready)
        if (typeof App.Events.onLeftEventHandler === "function")
            App.Events.onLeftEventHandler()
    //else cancelWork
}

App.Activate = function () {
    if (this.Ready)
        if (typeof App.Events.onActivateEventHandler === "function")
            App.Events.onActivateEventHandler()
}