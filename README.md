# Workout Tracker

## Description

A workout tracking mobile-first app that I designed and built from scratch completely on my own. Its purpose is to log workouts. After creating a routine, it is very easy to log exercises and modify them on the fly. Features very clear interface, stores data offline on localStorage. It is a MVP version still - there is a lot of work to do.

## Quick overview

Demo: [https://workouttracker.szymonpulut.com/](https://workouttracker.szymonpulut.com/)

User can quickly add new exercises and results, modify, remove them. Exercises are separated into 3 tiers according to GZCLP routine. User can add next workout days and remove them. App can be quickly reset to initial state.

## Technologies used & features

React, Redux, TypeScript, Material-UI (inline styles), hooks, local storage data persistence (redux-persist), and many more.

## TODO

-   drag-and-drop exercises in and between tiers (probably using react-beautiful-dnd)
-   ~~switch completely to inline Material-UI styles~~
-   code optimisations (unify code in reducers and more)
-   ~~add ability to remove day~~
-   ~~add ability to purge localStorage in app~~
-   write tests (I tried but I got stuck because of troublesome combination of TypeScript, Redux, and Material-UI used as HOC)

## Running

```
npm install
```

`npm run start` starts development server

`npm run build` creates production ready package
