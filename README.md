<h1 align="center">XMeme: </h1>

[![](https://img.shields.io/badge/Swagger%20-Docs-blue.svg)](https://xmeme-raj.herokuapp.com/docs)
[![](https://img.shields.io/badge/Backend-launch-Yellow.svg)](https://xmeme-raj.herokuapp.com/)
[![](https://img.shields.io/badge/Frontend-launch-blue.svg)](https://xmeme-raj.netlify.app/)

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)

<!-- ABOUT THE PROJECT -->

## About The Project

This is a fancy project to share dope Memes / Images

### Built With

![Html](https://cdn.svgporn.com/logos/html-5.svg)

![](https://cdn.svgporn.com/logos/sass.svg)
![](https://camo.githubusercontent.com/86d9ca3437f5034da052cf0fd398299292aab0e4479b58c20f2fc37dd8ccbe05/68747470733a2f2f666173746170692e7469616e676f6c6f2e636f6d2f696d672f6c6f676f2d6d617267696e2f6c6f676f2d7465616c2e706e67)
![Python](https://cdn.svgporn.com/logos/python.svg)
![JQuery](https://cdn.svgporn.com/logos/jquery.svg)
![](https://cdn.svgporn.com/logos/docker.svg)
![](https://cdn.svgporn.com/logos/javascript.svg)
![](https://cdn.svgporn.com/logos/gunicorn.svg)
![](https://cdn.svgporn.com/logos/vue.svg)
![](https://cdn.svgporn.com/logos/heroku.svg)
![](https://cdn.svgporn.com/logos/netlify.svg)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.The server is runned on port 8081 in the below instructions.

> Directory Structure

```
-- iamrajkashyap-me_buildout_xmeme
    |-- Backend
    |   |-- main.py
    |   |-- requirements.txt
    |   `-- test.db
    |-- Dockerfile
    |-- Frontend
    |   |-- icon.png
    |   |-- index.html
    |   |-- scripts
    |   |   |-- app.js
    |   |   |-- particles.js
    |   |   `-- typed.js
    |   `-- styles
    |       |-- styles.css
    |       |-- styles.css.map
    |       `-- styles.scss
    |-- Procfile
    |-- README.md
    |-- addMeme.sh
    |-- install.sh
    |-- requirements.txt
    |-- server_run.sh
    `-- sleep.sh
```

### Installation

```
chmod +x install.sh
sudo ./install.sh
```

### Usage

```
chmod +x server_run.sh
./server_run.sh
```

### Dockerized Way:

> > Build:
>
> ```
> docker build -t xmeme_app .
> ```
>
> > Run :
>
> ```
> docker run -d --net="host" xmeme_app
> ```
