# AngularJS Tutorials by tmosest
## Video 3: Directives Part 1

In this video we will become familiar with the github repo.

#### Learning Objectives:
* Directives
* Built-in directives
* ngShow, ngHide, ngClick, ngRepeat

### Directives

#### Introduction to Directives

The simplest way to think about `Directives` is that they are a way to add code to an html element.

While a controller might hold business logic, a directive will typically hold view logic that you want to use over and over agan.

One example of this would be a slider, we could make a custom slider directive that we use any where we want a slider.

```HTML
<div ng-slider>
    <div ng-slide-1>...</div>
    <div ng-slide-2>...</div>
    <div ng-slide-3>...</div>
</div>
```

In the above example we placed a `custom attribute` on our html element to turn it into a directive.

This is not the only way to declare a directive, we could also create a custom element, class, or comment.

However we will go over how to do that in a future video.

#### A New Light on Old Views

In the previous video we used the following code to link our `module` and `controller` to our view.

```HTML
<html ng-app="module">
    <!-- ... -->
    <body ng-controller="controller">
        <!-- ... -->
    </body>
</html>
```

What we were really doing was using two built-in AngularJS directives to do the work for us.

`ng-app` binds a `module` to a part of the DOM and `ng-controller` does the same for a controller.

We have also seen `ng-model` which binds a form element to a variable.

### Built-In Views

#### Introdution

Angular has a lot of these built in directives to add additional functionality.

[directives](https://docs.angularjs.org/api/ng/directive)

It is important to have a reference to them. This will prevent you from creating a directive that already exists.

#### ngShow and ngHide

The first built in directive that we are going to do over is `ng-show` and `ng-hide`.

These two directives allow us to show or hide a part of the DOM based on a boolean value.

Let's go to `calculator.controller.js` and add a variable `vm.showTitle = false;`.

Now let's go to `index.html` and update:

```HTML
<h1>{{ctr.title}}</h1>
```

to:

```HTML
<h1 ng-show="ctr.showTitle">{{ctr.title}}</h1>
```

If we refresh the browser the title should disappear. 

This is because of the fact that `ng-show` only appears when the value of the attribute is true.

Now let's set `vm.showTitle = true;` look at a more productive example.

In the last video we got rid of the ugly `=` at the bottom of html by setting some default values.

However if the user removes the inut values we are left with something like:

```
+ = 0
``` 

Which looks bad. Let's hide that if `a` or `b` is undefined.

Let's add `vm.hideResults = vm.a == null || vm.b == null;` below `vm.showTitle` and update:

```HTML
<p>{{ ctr.a }} {{ctr.operator}} {{ ctr.b }} = {{ ctr.result() }}</p>
```

to

```HTML
<p ng-hide="ctr.hideResults">{{ ctr.a }} {{ctr.operator}} {{ ctr.b }} = {{ ctr.result() }}</p>
```

Now if you refresh your browser you'll notice and remove a number, you'll notice that nothing is happening.

This is due to the fact that `vm.hideResults` never get's updated. We set it to true when the controller was activated and it never get's tested again.

To fix this let's copy it into our only method:

```javascript
 vm.result = function () {
    vm.hideResults = vm.a == null || vm.b == null; // This value gets updated!
    return calculate(vm.a, vm.b, vm.operator);
};
```

Since `ctr.result()` calls this function everytime we make an update, it will work now!

As you can see `ng-show` and `ng-hide` provide a powerful way to display content to the user.

#### ngClick

To show off some more built-in directives we are going to make a basic todo app.

We start by adding another js file named `todo.controller.js` then we place the following code in it:

```javascript
// Notice the lack of [] b/c we already defined CalculatorApp in calculator.controller.js
angular.module('CalculatorApp')
    .controller('TodoController', TodoController);
    
    TodoController.$inject = [];

    function TodoController() {
        var vm = this;
        // variables
        vm.title = "Todo List";
        vm.count = 0;
    }
```

Like before we are creating a new module and a new controller.

We now need to add them to the `index.html` file.

Below:

```HTML
<script src="js/calculator.controller.js"></script>
```

We paste:

```HTML
<script src="js/todo.controller.js"></script>
```

Then remove the `ng-controller="CalculatorController as ctr"` from the `body` tag.

Finally we wrap the html inside the body tag with:

```HTML
<div ng-app="CalculatorApp" ng-controller="CalculatorController as ctr">
    <!-- Calculator code -->
</div>
```

This will confine our Calculator app to that div and allow use to make another div above it that will hold our Todo App.

```HTML
<div ng-controller="TodoController as ctr">
    <h1>{{ctr.title}} {{ctr.count}}</h1>
</div>
```

Refresh and you should see "Todo List 0" appear.

Now let's look at another built in directive called `ng-click`.

This directive will allow us to bind a controller method to the onClick event for an element.

In `todo.controller.js` we add a method:

```javascript
vm.add = function () {
    vm.count++;
};
```

When this function is called it will simply increment the count variable by one.

Now we add the following inside our Todo Div:

```HTML
<p><button ng-click="ctr.add()">Add Task</button></p>
```

Now when press the button the click even will call `vm.add()` which will make the count in the title increase.

#### ngRepeat

Now let's look at show some tasks using the `ng-repeat` directive.

This directive allows us to loop over an array in our html and show all of the items.

First let's add an array and a way to add elements to it.

In `index.html` place this code betwen the button and the title.

```HTML
<p>Task Name: <input type=text ng-model="ctr.task" /></p>
```

Now in `todo.controller.js` let's add an array and a way to add to add them:

```javascript
vm.todos = []; // empty array
// methods
vm.add = function () {
    vm.count++;
    vm.todos.push(vm.task);
};
```

Now when we click the button it not only adds to the count it also pushes the text in our input into the array.

However we have no way to see that!

To fix this we add the following code below our button:

```HTML
<p>
    <ul>
        <li ng-repeat="todo in ctr.todos">{{ todo }}</li>
    </ul>
</p>
```

Now we can add items to our to do list however if we try to add two with the same title it will explode!

Let's fix this by making a custom object to put in there instead of a string:

Update `todo.controller.js` to:

```javascript
vm.task = {}; // empty object
// methods
vm.add = function () {
    vm.count++;
    vm.task = {
        id: vm.count,
        title: vm.taskTitle
    };
    vm.todos.push(vm.task);
};
```

And `index.html` to:

```HTML
<p>Task Name: <input type=text ng-model="ctr.taskTitle" /></p>
```

Now when we click the button we will add a new task object with an id of the current count and a title equal to what we type in.

We can now add multiple tasks with the same name, but they look like this:

```
{"id":1,"title":"Todo 1"}
```

To fix that we just update 

```HTML
<li ng-repeat="todo in ctr.todos">{{ todo }}</li>
```

to 

```HTML
<li ng-repeat="todo in ctr.todos">{{ todo.title }}</li>
```

This will force Angular to spit out just the object's title and not the whole object.