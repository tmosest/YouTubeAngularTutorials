#AngularJS Tutorials by tmosest
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