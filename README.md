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

### Basic Calculator:

Now that we are done with learning about git procedure, let's build a basic calculator.

Checkout the `remotes/origin/video_1b` branch which contains the starting files:

....