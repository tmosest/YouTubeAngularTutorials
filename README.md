#AngularJS Tutorials by tmosest
##Video 1: Working with the github Repositor

In this video we will become familiar with the github repo.

####Learning Objectives:
* How to clone it.
* The structure of it.
* Easiest ways to follow along.

###Cloning the repo:

In stead of simplying cloning the repository like you usually would, we are going to clone a bare version of it using:

```
clone --bare https://github.com/tmosest/YouTubeAngularTutorials.git tmosestDevTutorials
```

This will allow you to follow along without working about overloading my remote repository.

###Navigating the repo:

First navigate into the repo folder using

``''
cd tmosestDevTutorials
```

Note: Tabs will autocomplete the folder name after a few keystrokes.

Now that you have the repository files, you can see which videos you have by looking at branches with:

```
git branch
```

This should show a listing of all the avaliable video branches. They should be of the format video_{number}{B/E} where number is the video number and B/E stand for the begining and ending project.

To navigate to a specific branch use the following:

```
git checkout [branch]
```
