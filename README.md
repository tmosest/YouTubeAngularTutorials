# AngularJS Tutorials by tmosest
## Video 2: Modules and Controllers

In this video we will become familiar with the github repo.

#### Learning Objectives:
* Modules
* Controllers
* Dependency Injection

### Modules

#### Introduction to Modules

In the last video we saw the following line of code:

```javascript
angular.module('CalculatorApp', []);
```

Which was used to make an angular `module` named `CalculatorApp`.

A module in AngularJs is a way to group various pieces of code into a package under a common name.

In the previous example what we did was create a controller and packages it into the `CalculatorApp`.

In general a module has two parts:

1. The various components that are included in it (controllers, services, factories, and directives).

2. Other modules that are needed for this module called `dependencies`. Angular will go and find those other various modules and give our module access to the components of that module.

Another key property of `modules` is that they bootstrap or initialize angular applications by using the built in `ng-app` directive.

As we have seen the `module` method really takes two components:

```javascript
angular.module('CalculatorApp', []);
```

1. A string representing the name of the module which in our case is `CalculatorApp`.

2. An array of dependencies which in our case is the empty `[]`.

Now if we wanted to add some cool 3rd party library graph module (`coolGraphs`) or if we had a seperate ui package for our calculator containing widgets (`CalculatorApp.ui`) we could include them with the following code.

```javascript
angular.module('CalculatorApp', ['coolGraphs', 'CalculatorApp.ui']);
// Note that dependencies are a string array.
```
#### Modules Common Errors

Now that we know how to define cool new modules and inject other modules into them, it's time to introduce some common pitfalls.

If we wanted to add a component to an already existing module we would use the following code:

```javascript
angular.module('CalculatorApp');
// Note the lack of []
```

This can lead to two common pitfalls:

1. Forgetting the `[]` which results in an `No module found` error.
2. Searching for the module before it has been declared.

#### Bootstrapping applications

We have already seen two example of bootstrapping angular applications:

1. `ng-app`: A blank ng-app which initializes a generic application.
2. `ng-app='appName'`: A custom module.

Both of these examples let angular automatically handle the initialization by using an HTML attribut.

There is a way to do this without using the `ng-app` directive that allows us to control when the appllication starts.

Here is an example:

```javascript
// Define our module
angular.module('CalculatorApp', []);
// Init when document is ready
angular.element.find(document).ready(function () {
  angular.bootstrap(document, ['CalculatorApp']);
});
```

In the above example we are using the built in version of jQuery Lite to find the document and when it is ready we are going to initialize our module.

* Note this is just doing exactly what the `ng-app` attribute does by default.

### Controllers

#### Introduction to Controllers

Now it is time to look at controllers more in depth.

Controllers hold the logic for the view and ensentially connect the model to the view.

Some common applications of controllers are:

* Fetching data from a server for the UI.
* Determing what parts of the model to show the user.
* Presentation logic.
* How to handle user driven events.

As we have previously seen a controller is packaged inside a module:

```javascript
// Create a module
angular.module('CalculatorApp', [])
    // Add a controller the new module.
    .controller('CalculatorController', function () {
        // controller code.
    });
```

The above lines of code created a module named `CalculatorApp` and added a controller to it named `CalculatorController`.

#### Controllers and Dependency Injection

Controllers (likes modules) can have other components injected into them.

The naive way to do this is like what we did in `calculator.controller.js`:

```javascript
// Create a module
angular.module('CalculatorApp', [])
    // Add a controller the new module.
    .controller('CalculatorController', function ($scope) {
        // This time we injected the angular $scope component.
        $scope.title = 'AngularJS Calculator';
    });
```

The problem with this method comes when we try to minify the js file for production code. 

The variable named `$scope` we be transformed to another variable name that angular will no longer recognize.

The easiest way to fix this is to change the way we create a controller:

```javascript
// Create a module
angular.module('CalculatorApp', [])
    // Add a controller the new module.
    .controller('CalculatorController', ['$scope', function ($scope) {
        // This time we injected the angular $scope component.
        $scope.title = 'AngularJS Calculator';
    }]);
```

This time we have replaced the second paramter in our controller function with an array of dependencies.

The string `'$scope'` will always reference the first variable in our defining function.

To defined our function we make sure that the last element in our dependency array is our defining function.

Here is another example of that using a private function instead.

```javascript
// Create a module
angular.module('CalculatorApp', [])
    // Add a controller the new module.
    .controller('CalculatorController', ['$scope', CalculatorController]);

    //Private funcitons
    function CalculatorController($scope) {
      $scope.title = 'AngularJS Calculator';
    }
```

There is a third way for users to create a controller and safely inject dependencies that doesn't require the above array format.

```javascript
// Create a module
angular.module('CalculatorApp', [])
    // Add a controller the new module.
    .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = ['$scope'];

    //Private funcitons
    function CalculatorController($scope) {
      $scope.title = 'AngularJS Calculator';
    }
```

Something to remember with any of these approaches is that order matters:

```javascript
// Create a module
angular.module('CalculatorApp', [])
    // Add a controller the new module.
    .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = ['$q', '$scope'];

    //Private funcitons
    function CalculatorController($scope, $q) {
      $scope.title = 'AngularJS Calculator';
    }
```

In the above example anytime we use the `$scope` variable inside our controller we are really referencing `$q`.
* This is because we injected it as the first dependency and it is the first parameter in our funciton.

#### ng-controller

Now that we can create a controller we need to connected it to the View.

To do this we use the built in `ng-controller` directived like we did in `index.html` for the simple calculator.

```HTML
<body ng-controller="CalculatorController">
<!-- some elements -->
</body>
```

This will bind the controller that we have created to this elements assuming we have also bound the DOm to our module.

We are free to bind both the controller and the module to the same element:

```HTML
<body ng-app="CalculatorApp" ng-controller="CalculatorController">
<!-- some elements -->
</body>
```

Last time we used the `$scope` to make our controllers data and operations accessible to the View.
This however is bad practice and no longer used because it overcrowds the `$scope`.

Instead we can think of the controller as it's own object/class and assign the operations directly to it.

```javascript
function CalculatorController() {
  var vm = this; //Very important b/c of the way JavaScript handles 'this' inside fucntions.
  // Now replace $scope with vm (short for View Model)
  vm.title = 'AngularJS Calculator';
  // ...
  vm.result = function () { 
    // ...
  };
}
```

Doing this also leads to another needed update though.
The view can no longer just reference a variable like `a` by name because that is shorthand for `$scope.a`.

To fix this we could do something like: 

```HTML
<body ng-app="CalculatorApp" ng-controller="CalculatorController">
<h1>{{CalculatorController.title}}</h1>
<!-- some elements -->
</body>
```

However that would lead to typing `CalculatorController` over and over again which is tedious.

Instead angular provides us with an additional option for the `ng-controller` attribute.

We can use `as` to assign `CalculatorController` to a shorter name:

```HTML
<body ng-app="CalculatorApp" ng-controller="CalculatorController as ctr">
<h1>{{ctr.title}}</h1>
<!-- some elements -->
</body>
```

In the above example we no longer need to use `CalculatorController` because we have replaced it with `ctr`.
