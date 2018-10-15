"use strict";
if (App.Core === undefined)
    App.Core = {};

App.Core.View = function (name, id, classes) {
    this.Name = name;
    this.Id = id;
    this.cElement = undefined;
    this.template = '';
    this.classList = classes;
    this.customdata_rec = {};
    this.display = function (prepend) {
        if (!prepend) {
            //this.Parent.append(this.cElement);
            this.cElement = this.Parent.appendChild(this.cElement);
        } else {
            this.cElement = this.Parent.insertBefore(this.cElement, this.Parent.childNodes[0])
        }
    }
    this.prepare = function (parent, attr) {
        if (attr == undefined)
            attr = {};
        var p = parent;
        this.cElement = document.createElement(attr.type || 'div');
        for (var i = 0; i < Object.keys(attr).length; i++)
            this.cElement.setAttribute(Object.keys(attr)[i], attr[Object.keys(attr)[i]]);
        this.Parent = p;
        this.template = App.TOOLS.TemplateManager.load(this.Name);
        this.cElement.innerHTML = this.template;

        if (this.Id)
            this.cElement.id = this.Id;
        if (this.classList) {
            //debugger;
            for (var i = 0; i < this.classList.length; i++)
                this.cElement.classList.add(this.classList[i]);
        }
        this.fillResource();
    }
    this.fillResource = function () {
        var resourceElements = this.cElement.querySelectorAll('[data-resource]');
        for (var i = 0; i < resourceElements.length; i++) {
            var r = App.TOOLS.ResourceManager.getResource(resourceElements[i].getAttribute('data-resource'));
            if (r)
                resourceElements[i].innerText = r;
            else
                resourceElements[i].innerText = '-Resource Not Found-'
        }
    }
    this.focus = function () {
        this.cElement.classList.add('focus');
        // App.focusedElement = this;
    }
    this.clearFocus = function () {
        this.cElement.classList.remove('focus')
        // App.focusedElement = this;
    }
    this.addClass = function (c) {
        this.cElement.classList.add(c);
    }
    this.removeClass = function (c) {
        this.cElement.classList.remove(c);
    }
    this.fillCustomData = function (data) {
        var nData = Object.keys(data);
        var newData = true;
        if (Object.keys(this.customdata_rec).length > 0) {
            newData = false;
            for (var i = 0; i < nData.length; i++) {
                if (this.customdata_rec[nData[i]] !== undefined) {
                    if (this.customdata_rec[nData[i]].val !== data[nData[i]]) {
                        this.cElement.innerHTML = this.cElement.innerHTML.replaceBetween(this.customdata_rec[nData[i]].s, this.customdata_rec[nData[i]].e, data[nData[i]]); 
                    }
                } else
                    newData = true;
            }
        }
        if(newData){
            for(var i = 0; i< nData.length;i++){
                if(this.customdata_rec[nData[i]]=== undefined)
                {
                    this.customdata_rec[nData[i]] = {};
                    this.customdata_rec[nData[i]].val = data[nData[i]];
                    if(this.cElement.innerHTML.includes('{{'+nData[i]+'}}')){
                        this.customdata_rec[nData[i]].s = this.cElement.innerHTML.indexOf('{{'+nData[i]+'}}');
                        this.customdata_rec[nData[i]].e = this.customdata_rec[nData[i]].s + data[nData[i]].length;
                        this.cElement.innerHTML = this.cElement.innerHTML.replaceBetween(this.customdata_rec[nData[i]].s, this.customdata_rec[nData[i]].s + nData[i].length+ 4, data[nData[i]]); 

                    }
                }
            }
        }

        // var cElement = document.createElement('div');
        // cElement.innerHTML = this.template;
        // for (var i = 0; i < Object.keys(data).length; i++) {
        //     if (cElement.innerHTML.includes('{{' + Object.keys(data)[i] + '}}')) {

        //         cElement.innerHTML = cElement.innerHTML.replace('{{' + Object.keys(data)[i] + '}}', data[Object.keys(data)[i]])
        //         i--;
        //     }
        // }
        // this.cElement.innerHTML = cElement.innerHTML;
    }
    this.fillDynamicResource = function () {
        var resourceElements = this.cElement.querySelectorAll('[dynamic-resource]');
        for (var i = 0; i < resourceElements.length; i++) {
            var r = App.TOOLS.ResourceManager.getResource(resourceElements[i].getAttribute('dynamic-resource'));
            if (r)
                resourceElements[i].innerText = r;
        }
    }

    this.addEventListener = function (eventname, listener) {
        this.cElement.addEventListener(eventname, listener)
    }

    this.remove = function () {
        this.Parent.removeChild(this.cElement);
        this.Parent = undefined;
        this.cElement = undefined;
    }
}