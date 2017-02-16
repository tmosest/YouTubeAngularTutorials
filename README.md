# AngularJS Tutorials by tmosest
## Video 4: Directives Part 2

In this video we will continue to learn more about built in angular directives.

#### Learning Objectives:
* ngSubmit, ngMinlength, ngMaxlength, ngDisabled, ngClass

### More Built-In Directives

#### ngSubmit

Let's pick up where we left off in the last video and continues to add new features to our Todo Application.

One thing that would be nice is if we could simply press enter to add a new item to our todo list.

Now if we think about it when we press enter in a normal HTML form it submits the form.

So if we could override the default event for the form submission we would be good to go.

Luckily AngularJS gives us a way to do this with the `ng-submit` directive.

`ng-submit` binds to the form's onsubmit events and overrides them, but only if the form does not contain an `action`, `data-action`, or `x-action`.

`ng-submit` can be used as an element

```html
<ng-submit 
    ng-submit="expression">
</ng-submit>
```

or as an attribute (which is the more common approach due to IE issues).

```html
<form
    ng-submit="expression">
</form>
```

To show how this would work let's go inside of our [index.html file](./calculator/index.html) and wrap the code inside of the TodoController div in a form like so.

```html
<div 
    ng-controller="TodoController as ctr">
    <form
        ng-submit="">
        <h1>{{ctr.title}} {{ctr.count}}</h1>
        <p>Task Name: <input type=text ng-model="ctr.taskTitle" /></p>
        <p><button ng-click="ctr.add()">Add Task</button></p>
        <p>
            <ul>
                <li ng-repeat="todo in ctr.todos">{{ todo.title }}</li>
            </ul>
        </p>
    </form>
</div>
```

Now what we can do is transform the button into a submit button and then move the function `add()` to be inside of the `ng-submit`

```html
<div 
    ng-controller="TodoController as ctr">
    <form
        ng-submit="ctr.add()">
        <h1>{{ctr.title}} {{ctr.count}}</h1>
        <p>Task Name: <input type=text ng-model="ctr.taskTitle" /></p>
        <p><input type="submit" value="Add Task" /></p>
        <p>
            <ul>
                <li ng-repeat="todo in ctr.todos">{{ todo.title }}</li>
            </ul>
        </p>
    </form>
</div>
```

Now when we press enter inside of the text input the form fires the `add()` function. We added a cool new feature without even having to change a single line of JavaScript.

That is pretty amazing.

However while we are add it let's add an additional feature to our form just to make things a little bit more convient.

When we press enter inside of the text input it should clear the text for us.

To do this lets add a few lines of code to our [todo.controller.js file](./calculator/js/todo.controller.js)

```javascript
vm.add = function () {
    vm.count++;
    vm.task = {
        id: vm.count,
        title: vm.taskTitle
    };
    vm.todos.push(vm.task);
    // Reset the taskTitle:
    vm.taskTitle = null;
}; // end add method
```

Now after we press enter the `add()` method is fired and right before it finishes the `taskTitle` variable is set to null clearing the field.

#### ngRequired

After playing around with the form for a few minutes we realize that if we press the enter key too fast then we can submit a blank todo task!

Let's fix this by not allowing our form to submit with a string that is null.

We could do this the hard way and add some calculations to the controller that would check the length of the stirng before pushing our task to the array.

But why work hard when we can work smart! Let's use another built in angular directive.

`ngRequired` allows us to set the required value attribut of an element based on the value of an expression.

To see how this works lets update:

```html
<p>Task Name: <input type=text ng-model="ctr.taskTitle" /></p>
```

to

```html
<p>Task Name: 
    <input type=text 
        ng-model="ctr.taskTitle" 
        ng-required="true" />
</p>
```

In this simple example above we simply set required to always be true but we could have used a variable to do this dynamically.

If we go back and test the form now we will see that we can still add blank requests.

However if we inspect the form we will see that it has an additional class now of `ng-invalid` whenever the input is null.

All we need to do now is find some way to utilize that class.

We can do this by giving the form a name and then accessing the boolean value with `formName.$valid`

Now there is more than one way to do this but we are going to go with the HTML approach: if we add `formName.$valid && expression` to our ng-submit then it will check to see if formName.$valid is true before firing our method.

Lets update our html to:

```html
<!-- Add a name and update ng-submit -->
<form
    name="todoForm"
    ng-submit="todoForm.$valid && ctr.add()">
    <h1>{{ctr.title}} {{ctr.count}}</h1>
    <p>Task Name: 
        <input type=text 
            ng-model="ctr.taskTitle"
            ng-required="true"/>
    </p>
    <p><input type="submit" value="Add Task" /></p>
    <p>
        <ul>
            <li ng-repeat="todo in ctr.todos">{{ todo.title }}</li>
        </ul>
    </p>
</form>
```

Now try to submit a null text input and you will see that you cannot.

#### ngMinlength and ngMaxlength

In my opinion a task should isn't worth writing down, unless it has atleast 3 letters.

Again we could caluculate this ourselves inside of the controller but there is no reason to when angular has another built in directive.

`ngMinlength` adds a validator to a `ng-model` (the directive that is responsible for two-way data binding) that checks for a minimum length.

Lets test this out on our Task Name input:

```html
<p>Task Name:  
    <input type=text 
        ng-model="ctr.taskTitle"
        ng-required="true" />
</p>
```

Should become:

```html
<p>Task Name:  
    <input type=text 
        ng-model="ctr.taskTitle"
        ng-required="true"
        ng-minlength="3" />
</p>
```

Now if we try to submit a task with less than 3 letters it won't work.

Similarily I think that a task with more than 20 letters is too long and should be broken down into smaller tasks.

We can accomplish this by using the `ng-maxlength` directive as follows:

```html
<p>Task Name:  
    <input type=text 
        ng-model="ctr.taskTitle"
        ng-required="true"
        ng-minlength="3"
        ng-maxlength="20" />
</p>
```

Now we cannot submit a task with 21 characters in it.

#### ngDisabled

One annoying thing about the current state of the UI is that the user thinks that they can still click the submit button even when the input is null.

We can fix this by disabling the submit button whenever the form is null.

To do this we use the built-in `ng-disabled` directive.

```html
<p><input type="submit" value="Add Task" ng-disabled="todoForm.$invalid"/></p>
```

This time instead of feeding it `todoForm.$valid` we feed it `todoForm.$invalid` to make it disabled whenever the form isn't ready yet.

#### ngClass

Another cool feature that angular provides is the ability to dynamically add and remove classes using the `ng-class` attribute.

Let's add the ability to strike out completed tasks in our todo list.

First we are going to need a class to represent a marked out item:

Add the following style tag somewhere inside your [index.html file](./calculator/index.html)

```html
<style>
    .strike {
        text-decoration: line-through;
    }
</style>
```

Now we need to add a new attribute to our item object inside of [todo.controller.js file](./calculator/js/todo.controller.js):

```javascript
vm.task = {
    id: vm.count,
    title: vm.taskTitle,
    checked: false // new checked property
};
```

Now we just need to tie this into our html as follows:

```html
<li ng-repeat="todo in ctr.todos" 
    ng-class="{strike: todo.checked}">
    {{ todo.title }}
    <input type="checkbox" ng-model="todo.checked">
</li>
```

Now whenever todo.checked is true it will add the strike class to the list element and put a line through it.

If we want we can declare multiple classes with different boolean properties by adding a comma.

Let's add a bold important item.

```html
<style>
    .strike {
        text-decoration: line-through;
    }
    .important {
        font-weight: bold;
    }
</style>
```

```javascript
vm.task = {
    id: vm.count,
    title: vm.taskTitle,
    checked: false,
    important: false
};
```

```html
<li ng-repeat="todo in ctr.todos">
    <span ng-class="{strike: todo.checked, important: todo.important}">
        {{ todo.title }}
    </span>
    <label>(C): <input type="checkbox" ng-model="todo.checked"></label>
    <label>(I): <input type="checkbox" ng-model="todo.important"></label>
</li>
```

Thank you and tune in for next time.