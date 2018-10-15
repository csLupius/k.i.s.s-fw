# K.I.S.S Core
## What is this? 

This core's purpose is to create a user interface with cleanest, simplest way possible.
k.i.s.s core uses MVC architecture to achive this purpose.

_This core needs a bit more attention while creating controlers, but gives a lot more readability and control_

### Folder structure and naming
When creating a Component, Creating a js file under the same name with the Component Type folder is standard.
And while naming your Component's javascript file use the following naming convention
- *name*.*componenttype*.js
- Sample.Model.js
- Sample.View.js
- Sample.Controller.js
- Sample.Component.js

### Creating a Model

When creating a Model, using constructor pattern is useful.
This pattern makes sure the model is always the way the developer intend it to be.

### Creating a View

#### Code structure
When creating a view, using constructor pattern is useful with hoisting problem.

#### inheriting View.Core

With constructor pattern using ```call``` function to inherit is simplest way.
Like the code below.

```
App.View.Sample = function () {
    App.Core.View.call(this, 'TemplateName', 'idselector', ['array','of','classes'])
}
``` 
_Check out wiki about View.Core_

### Creating a Controller
In k.i.s.s core a controller is much loose than other components.
It depends on the purpose of the object

### Creating a Component
Component's responsibility is attaching Model to View and View to user interface.

#### inheriting Component.Core
With constructor pattern using ```call``` function to inherit is simplest way.
Like the code below.

```
App.Component.Sample = function () {
    App.Core.Component.call(this, App.View.Sample);
}
``` 
_Check out wiki about Component.Core_

