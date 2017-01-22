#AngularJS Tutorials by tmosest
##Video 0: What you will need and a basic introduction.

In this video you will download the things that you are going to need to get started,
and see a very basic example of the AngularJS Hello World app.

####Learning Objectives:
* Download Git.
* Download a text editor.
* See basic example of jQuery vs AngularJS.

###Download Git

To download git:

1) For windows users:

Simply google git and navigate to https://git-scm.com/ from there you will find a download for it. I highly recommend that you install it using the Git Bash Version to keep the linux commands separate from your windows commands.

2) For Mac users:

You can install the GUI version from https://git-scm.com/ however if you want to install the command line version which I recommend then you should google how to install brew and use it to install git instead.

Here is a good article on how to do this: https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/

###Download a text editor

There are plenty on the market, however here are a few of my recommendations:

1) Microsoft's Visual Studio Code:

https://code.visualstudio.com/c?utm_expid=101350005-35.Eg8306GUR6SersZwpBjURQ.2&utm_referrer=https%3A%2F%2Fwww.google.com%2F

2) Atom:

https://atom.io/

3) Sublime Text:

https://www.sublimetext.com/

4) Dream Weaver:

http://www.adobe.com/products/dreamweaver.html

5) Bracket

http://brackets.io/

###jQuery vs AngularJS

We will go over the major difference between the two through the remaining videos as you learn how to use AngularJS. AngularJS is a very powerful frame work and a simple comparison between AngularJS and jQuery would be that jQuery is a hammer while AngularJS is a bag containing a hammer, a saw, a wrench, a swiss army knife, etc..

If we look at the hello world examples for AngularJS and jQuery, we will see that we had to add 4+ lines of code for the jQuery example:

```javascript
$(document).ready(function() {
        $("#input").keyup(function() {
          var name = $("#input").val();
          $("#name").html("Hello " + name);
        });
      });
```

As compared to the AngularJS example where we did not add one additional line of code.

For the jQuery example we also had to add two id attrributes:

```html
<p id="name">Hello </p>
<input id="input" type="text"/>
```

While for the for the AngularJS example all we had to add was `ng-app`, `ng-model="name"` and `{{name}}`.
    
##Video 1: Working with the Github Repository

In this video we will become familiar with the github repo.

####Learning Objectives:
* How to clone it.
* The structure of it.
* Easiest ways to follow along.

###Cloning the Repo:

The firs thing we need to do is make a copy of the repo by clicking on the green clone button and copying the url.

Then perform the following command: but replace `<your_directory>` with something like `tmosestdevAngularTutorials`

```
git clone https://github.com/tmosest/YouTubeAngularTutorials.git <your_directory>
```

This will allow you to get the latest code for each video by performing:

```
git pull
```

From inside the directory that you made earlier.

### Navigating the Repo:

First navigate into the repo folder using

```
cd <your_directory>
```

Note: Tabs will autocomplete the folder name after a few keystrokes.

Now that you have the repository files, you can see which videos you have by looking at branches with:
* The -a option shows hidden branches.

```
git branch -a
```

This should show a listing of all the avaliable video branches. 
They should be of the format `video_{number}{b/e}`: 
* Where number is the video number and B/E stand for the begining and ending project.

To navigate to a specific branch you first need to create a local copy of the remote branch.

```
git checkout <you_branch_branch> <remote_branch_name>
```

Now we can use the branch that you created to follow along in your own repo.

### Personal Github Project:

Open up your github accout and create your own reposity with the same name as the folder from earlier.

You can use this repo to track your progress, have reference code, and to show future employers.

After you have created your repo, we need to add it as a remote local. 

We can't use `origin` because that is reserved for my repo; instead we will use `github`.

```
git remote add github https://github.com/<your_username>/<your_repo_name.git
```

Now you will be able to push code to your own repo using the following command:

```
git push -u github <my_branch_name>
```

### Example of Process:

As a test let's add chapter one.

From inside you directory run:

```
git pull
```

then:

```
git branch -a
```

Copy the `remotes/origin/video_0` branch:

```
git checkout -b video_0 remotes/origin/video_0
```

Now push the code to your repo:

```
git push -u github video_0
```

If you visit you github repo you should now see the README.md from video 0.

For future videos you will just want to have a `video_#` branch and not worry about `b\e`.

### Basic Calculator:

Now that we are done with learning about git procedure, let's build a basic calculator.

Checkout the `remotes/origin/video_1b` branch which contains the starting files:

```
git checkout -b video_1 remotes/origin/video_1b
```

In this folder you will see a folder titled [calculator](./calculator).

Inside this folder you will see two files.

1. [index.html](./calculator/index.html): the view for our calculator.
2. [calculator.controller.js](.calculator/js/calculator.js): the controller for our calculator.

If we look inside the [index.html](./calculator/index.html) file we see a few things that are different from the hello world example.

* We have added an additional `<script></script` tag that links to our custom controller.
* Our `ng-app` attribute now has a value of `CalculatorApp`, which will link it to the module in our [calculator.controller.js](.calculator/js/calculator.js) file.
* We have added a new `ng-controller` attribute with a value of `CalculatorController`
* We have a `<select></select>` tag that also has an `ng-model` attribute on it.
* We have a `{{ result() }}` expression that prints out the results of our calculation.

If we look inside the [calculator.controller.js](.calculator/js/calculator.js) we will see how to declare a customer controller.

* First we have the `angular.module` method which declares a `module` which we will talk about more in the next video.
* We use the `module` to add a `controller`. The controller contains all of the logic for our view.
* Within our controller we make use a built in angular object called the `scope`. We will learn more about this later but for now it is a way to store global data.
  * All built in angular objects use start wih a `$` like `$scope`.
* Our controller shows how to add two important functionalities to our view:
  1. Data: `$scope.title` adds a `title` variable to our scope and gives it an initial value.
  2. Methods: `$scope.result` adds a public function to the scop that our view can access to show our calculation.

Now let's make some alterations to the controller to make it a littler better.

1. Lets initialize our variables `$scope.a` and `$scope.b` by giving them a value within our controller.
2. Lets move our computation into a private function and then call that private function within our public method.

Now tht we have made some changes to the file lets add it to our github repo:

```
git add -A 
git commit -m "Updated calculator.controller.js"
git push -u github video_1
```

Now if we go over to our github page we should see that our new branh has been created.

Tune in to the next video where we go over modules and controllers.

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
