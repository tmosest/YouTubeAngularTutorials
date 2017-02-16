# AngularJS Tutorials by tmosest
## Video 5: Directives Part 3

In this video we will learn about angular expressions and continue to learn more about Angular's built in directives.

#### Learning Objectives:
* Expressions
* ngCloack and ngBind
* More about ngRepeat ($index)
* $first, $last, $middle, $odd, and $even
* ngIf
* ngInclude

### Expressions

#### Angular vs Vanilla Javascript

What we are really doing whenever we use the doubly curly brackets is invoking an angular expression. 

They are essentially JavaScript like snippets of code except they are more limited and also invoke two-way databinding.

Some valid expressions would include:

* 1 + 2
* a + b
* todo.id
* items[index]

There are some difference between Angular Expressions and JavaScript expressions though.

1. Context: JavaScript expressions are evalauted against the global window object, while angular uses the scrop.
2. Forgiving: JavaScript will generate Reference Error or Type Error if undefined properties are used. Angular is forgiving and returns undefined or null.
3. Filters: Angular allows you to use filters to format your data, which we will go over later.
4. No Control Flow Statements: Angular will not let you use conditionals, loops, or exceptions.
5. No Function declarations: You cannot declare a funciton inside of an expression.
6. No RegExp Creation with literal Notation: You cannot create a regular expression inside of an angular expression.
7. No Object Creation with new: You cannot use the new keyword to create an object inside of an angular expression.
8. No Bitwise, Comma, and Void Operators: Self Explanatory.

As you can see this is an additional reason why we need to create a controller, it allows us to perform these more complicated expressions.

#### ngCloack and ngBind

One annoying thing about the double curly brackets is that the user can see them while they wait for the application to load.

There are a two ways around this.

1. The first and easiest way around this is to use the `ng-cloack` attribute.

In our `index.html` file, if we go edit the first real line of code to be as follows:

```html
<html ng-app="CalculatorApp" ng-cloak>
```

Then the entire application will be cloacked. This will make all of the curl brackets invisible until the application has loaded by using the css property of display none.

2. The second way is another way to bing data to an element. The `ng-bind` directive does the same thing as curly brackets but with two twists.

To show that this works let's do the following in index.html. We are going to remove the {{todo.title}} and replace it with ng-bind:

```html
<span ng-class="{strike: todo.checked, important: todo.important}" ng-bind="todo.title"></span>
```

The first twist is that it automatically performs and ng-cloack on itself, so you don't have to worry about code bleeding through.

The second twist is that we can use `ng-bind="::variable"` to spit out the variable without two way data-binding. This saves computational energy on the things that we know won't change.

One example of this is our title variable for the calculator. It never changes so we should update it to only spit out once:

```html
<h1 ng-show="ctr.showTitle" ng-bind="::ctr.title"></h1>
```

### ngRepeat

There are some more advanced things that we can do with `ng-repeat` that I didn't go over last time:

#### $index

The first is that we can actually spit out a count or keep track of what elements in the array we are looking at by using $index, which is a built in property.

To see how this works lets spit out some numbers with our tasks to make them look like they have an order:

```html
<li ng-repeat="todo in ctr.todos">
          #{{$index}}
          <span ng-class="{strike: todo.checked, important: todo.important}" ng-bind="todo.title">
                            </span>
          <label>(C): <input type="checkbox" ng-model="todo.checked"></label>
          <label>(I): <input type="checkbox" ng-model="todo.important"></label>
</li>
```

Now we should see a number or each $index variable.

#### $first, $last, $middle, $odd, and $even

Angular also gives us some helpful boolean properties to help us keep track of where we are inside of the array.

* $first returns true when we are on the first element
* $last returns true when we are on the last elemet
* $middle return trues when we are not on the first or last elements
* $odd returns true when the $index is odd.
* $even returns true when the $index is even.

The can be used to do some cool things like make an alternating colored table or to make it so the last element doesn't have a bottom margin etc.

We are just going to do something silly with them to show how they work. Copy and paste the following css into your header where we placed the other css.

```css
.blue {
    border-top: 1px solid blue;
}
.yellow {
    border-left: 1px solid yellow;
}
.red {
    border-bottom: 1px solid red;
}
.green {
    border-bottom: 1px solid green;
}
.orange {
    color: orange;
}
```

Now lets do something with these classes using `ng-class` like we did before.

Place the following ng-class on the repeated li for the todo list.

```html
<li ng-repeat="todo in ctr.todos" ng-class="{blue: $first, yellow: $last, red: $even, green: $odd, orange: $middle}"></li>
```

Now we can slowly add items to our todo list to see how it really works.

Notice that a single elements is both the first and the last element but not a middle one. We have to have atleast 3 elements before one is considered to be a middle.

#### Functions in side of ngRepeat

Now lets look at performing actions on elements inside of our `ng-repeat` by adding a method to delete todo items.

First we need a method that will delete them from the array.

Add the following to `todo.controller.js`

```javascript
/** 		
    * Method to delete items from our task list 		
    */
    vm.delete = function (id) {
        if (id > 0) {
            index = -1;
            // Loop throught the array to find the id
            for (var i = 0; i < vm.todos.length; i++) {
                if (vm.todos[i].id == id) {
                    index = i;
                    break;
                }
            }
            // If id is found then we delete it.
            if (index != -1) {
                vm.todos.splice(index, 1);
                vm.count--;
            }
        }
    };
```

This simple method loops through the array of todos and looks for one who has an id equal to the id parameter. If one is found then splice him out of the array.

Now all we need to do is add this to our html and supply it with an id:

```html
<label>(C): <input type="checkbox" ng-model="todo.checked"></label>
<label>(I): <input type="checkbox" ng-model="todo.important"></label>
<button ng-click="ctr.delete(todo.id)">(D)</button>
```

Now we have a delete button that when clicked gives the id of the todo element to be deleted.

### ngIf

Now wouldn't be nice if we could only delete completed elements that not important.

Well we could use ngShow or ngHide like we have before but we have another option.

ngIf is similar to ngShow in that the element only appears if the expression is true, however unlike ngShow it actually removes it from the DOM completely.

Warning: the action of removing and appending an element from the DOM over and over again can be very computationally expesive so use it at your own risk.

Lets look at how this would work by adding it to our new button:

```html
<button ng-if="todo.checked && !todo.important" ng-click="ctr.delete(todo.id)">(D)</button>
```

As you can see the button will only appear now if the todo item is checked as complete and not important.

### ngInclude

The last directive that we are going to look at in this video is `ng-inlclude` which allows us to load html from external files.

This is a cool feature that basically replicates the ability of most server languages. The only downside is that it does not work in all web browsers without a server.

Typically angular application are organized into features so inside of our js folder we are going to add a calculator and todo folder and move our controllers into them.

Next we are going to add a caluclator.html file and todo.html file with out controllers.

After that we are going to go inside of our index.html file and change our controller locations:

```html
<script src="js/calculator/calculator.controller.js"></script>
<script src="js/todo/todo.controller.js"></script>
```

Now we are going to cut the following code out of the index.html file and place it inside of the calculator.html file we made:

```html
<div ng-controller="CalculatorController as ctr">
  <!-- Display the static title -->
  <h1 ng-show="ctr.showTitle" ng-bind="::ctr.title"></h1>
  <!-- First number input -->
  <p>Number a: <input type="number" ng-model="ctr.a" /></p>
  <!-- Operator Select -->
  <p>Operator: <select ng-model="ctr.operator">
                    <option>+</option>
                    <option>*</option>
                    <option>-</option>
                    <option>/</option>
                    <option>%</option>
                </select>
  </p>
  <!-- Second number input -->
  <p>Number b: <input type="number" ng-model="ctr.b" /></p>
  <p ng-hide="ctr.hideResults">{{ ctr.a }} {{ctr.operator}} {{ ctr.b }} = {{ ctr.result() }}</p>
</div>
```

Similarily we want to cut out this next bit of code and place it in the todo.html file:

```html
<div ng-controller="TodoController as ctr">
  <form name="todoForm" ng-submit="todoForm.$valid && ctr.add()">
    <h1>{{ctr.title}} {{ctr.count}}</h1>
    <p>Task Name:
      <input type=text ng-model="ctr.taskTitle" ng-required="true" ng-minlength="3" ng-maxlength="20" />
    </p>
    <p><input type="submit" value="Add Task" ng-disabled="todoForm.$invalid" /></p>
    <p>
      <ul>
        <li ng-repeat="todo in ctr.todos" ng-class="{blue: $first,
                                       yellow: $last,
                                       red: $even,
                                       green: $odd,
                                       orange: $middle}">
          #{{$index}}
          <span ng-class="{strike: todo.checked, important: todo.important}" ng-bind="todo.title">
                            </span>
          <label>(C): <input type="checkbox" ng-model="todo.checked"></label>
          <label>(I): <input type="checkbox" ng-model="todo.important"></label>
          <button ng-if="todo.checked && !todo.important" ng-click="ctr.delete(todo.id)">(D)</button>
          </li>
      </ul>
    </p>
  </form>
</div>
```

Now we need to replace them with `ng-include` directives:

```html
<div ng-include="'js/todo/todo.html'"></div>
<div ng-include="'js/calculator/calculator.html'"></div>
```

Note that the path for the each file wrapped in both double quotes and single quotes.

Also note that not all browsers will support this without a webserver of some sort. 

If you see Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource, the you need to change your web browser.
