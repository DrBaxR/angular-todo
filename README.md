# TODOs
A simple todo list Angular application, meant to showcase some of the basic features of Angular.

## Project setup
This section contains a list of things that you need to do before getting started.

### Pull repository locally
The first thing you need to do is install Git on your machine. You can get it [here](https://git-scm.com/downloads).

In order to get the project on your local machine you first need to **pull** this repository. To do that, you need to run the following command in a terminal:

```sh
git pull https://github.com/DrBaxR/angular-todo.git
```

### Install [Node](https://nodejs.org/en/about/) & [Angular CLI](https://angular.io/cli)
There are a couple of things that you will need to install before being able to run the project that you pulled from GitHub.

First off, you will need to install NodeJS from [here](https://nodejs.org/en/). Once you're done with that, you should be able to run the following command and get an output with the version you have installed (something like `v16.19.0`).

```sh
node --version
```

You should also be able to run `npm --version` and get a version number (different from the `node` version). After that, you can run:

```sh
npm install -g @angular/cli
```

To install the Angular CLI. By doing so, you should now be able to run `ng --version`.

### Run the project
After being able to run the ```npm``` command, you can finally get the project running. To do so, you need to first open a terminal in the folder where you cloned the project, or navigate to it in a terminal:

```sh
cd angular-todo
```

After that you need to install the dependencies required for the project:

```sh
npm install
```

And finally, you can start the application by running the following command and opening `http://localhost:4200` in a browser.
