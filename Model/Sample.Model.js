"use strict"
if (App.Model === undefined)
    App.Model = {}

App.Model.Sample = function(Title,Description,PubDate) {
    this.Description = Description;
    this.PubDate = PubDate;
    this.Title=  Title;
}