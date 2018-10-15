"use strict"
if (App.TOOLS === undefined)
    App.TOOLS = {}

App.TOOLS.StorageManager = {}
App.TOOLS.StorageManager.get = function (key,cb) {
    if (localStorage.getItem(key)) {
        if (typeof cb === 'function')
            cb(JSON.parse(localStorage.getItem(key)))
    } else {
        if (typeof cb === 'function')
            cb(undefined)
    }
}
App.TOOLS.StorageManager.setCity = function (key,value, cb) {
    localStorage.setItem(key, JSON.stringify(value))
    if (typeof cb === 'function')
        cb(value)
}
