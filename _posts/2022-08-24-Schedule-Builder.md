---
title: Schedule Builder
date: 2022-08-24
categories: [Projects]
tags: [angular, scss, problem solving, human computer interaction, angular material, html, css, asp.net, c#] # Tag names should be lowercase
img_path: ../../assets/img
---

![Schedule builder logo](/Schedule%20Maker/schedule%20maker%20icon.png){: w="120"}

## Description

Design and edit schedules without worrying about collisions between rooms or teachers. Also, you can build a schedule from scratch by generating lectures automatically you just have to provide the essential information such as how many hours in a week a subject needs to be lectured. However, you can add a subject in a pre-built schedule so that the lectures generator can place your lectures in collision-free places.


> [Take a look at the application, which is currently live at this link.](https://schedule-builder.alkaf.org) 
{: .prompt-tip}


We often need to change a lecture place from time to time, (teachers or students don't like their schedule... etc.). In this case, you don't need more than dragging and dropping this lecture, and if there is another schedule that has a lecture with the same teacher or room in the dropped place you will face a collision detection red flash. that will tell you all collision information without any text using only interactive UI design. Red flashy (schedule name, teacher name, room name, ... etc.) that indicates a collision place and reason.



> This project is made as a project for [Human-Computer Interaction (HCI)](https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction) subject at [Al-Ahgaff University](http://ahgaff.edu).
{: .prompt-info}

You can run the project easily in a development server following the [Angular instructions](#angular-development-environment) at the end of this file. 

> Clone or Download the code of the [localStorage-NoBackend](https://github.com/Ahmad-Alkaf/schedule_maker/tree/localStorage-NoBackend) branch because it can run without any server configuration and it will save schedules' information in the browser's local storage instead of the main branch which was built with backend server capability using ASP.NET to store data in a Database. Which is not needed for such a program. But as you know university stuff...
{: .prompt-warning}


There are many features such as Print a schedule, Copy / cut / paste a lecture within a schedule or between different schedules, and more... But I will let the reader find out these and other features by using the app [here](https://schedule-builder.alkaf.org).

## Screenshots


<div align="center">
  <img src="/Schedule%20Maker/Level%204%20table.png" />
    <p>App interface showing Level 4 schedule with left side tools</p>
</div>

<div id="generate-lectures-dialog" align="center">
  <img src="/Schedule%20Maker/generate%20lectures%20dialog.png" />
  <p>Generate lectures dialog form, filled as an example</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/conflict%20lectures%20warning.png" />
  <p>Example: Collision detected interface, between Level 4 and Level 1 schedules in Teacher and room. (i.e., teacher and room are busy on Wednesday between 9 - 12 O'Clock</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/adding%20subject.png" />
  <p>Adding a subject. Same process for room and teacher</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/create%20new%20lecture%20dialog.png" />
  <p>Create a new lecture dialog form. The created lecture will be placed on the left side container so that you can drag or copy it into any schedule</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/dark%20mode%20and%20themes.png" />
  <p>User preferences are a priority (at least in HCI). Dark mode and different themes are supported</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/drag%20and%20drop%20lectures.png" />
  <p>Usability is present with drag and drop capability</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/generated%20lectures.png" />
  <p>The generated lectures on an empty schedule from the previous generate lectures dialog image</p>
</div>

<div align="center">
  <img src="/Schedule%20Maker/new%20table%20dialog.png" />
  <p>Create new schedule dialog</p>
</div>

## Summary

Web application to build schedules of lectures. The user starts by adding the available subjects, teachers, and rooms. Then the user creates a schedule by either dragging and dropping lectures or letting the system generate it by only determining the weekly hours of a lecture. Open source at the link provided.

- Built using Angular framework.
- Automatically generate a schedule free of collision. Using Backtracking algorithm.
- Drag and drop lectures.
- Collision detection between different schedules’ rooms or teachers.

<br/>
<br/>

## Angular Development Environment

### Installation

- Install `NodeJs`.
- Install `Angular CLI`.
- Clone the repo.
- Run `npm install`.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.