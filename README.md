# WinfProjekt2-WebRTC
This project is part of a project work at the university of applied sciences Stuttgart and is not meant to be used for commercial purposes.

## Code responsibilities + functionality

```
angular2-webrtc/
 ├──src/                                         * our source files that will be compiled to javascript
 │   ├──app/                                     * our app source code
 │       ├──features/                            * all angular components
 │             ├──components/                    * these components are used in views and have no route
 │                   ├──calendar/                * Florian/Marvin
 │                   │ 
 │                   ├──chat/                    * Florian
 │                   │ 
 │                   ├──login/                   * Valentin/Alina/Florian
 │                   │ 
 │                   ├──meetings/                * Florian/Daniel
 │                   │ 
 │                   ├──nav/                     * Florian
 │                   │ 
 │                   ├──passwordchange/          * Marvin/Florian
 │                   │ 
 │                   ├──video/                   * Florian
 │                   │ 
 │                   ├──webrtccaller/            * Florian
 │                   │ 
 │                   └──webrtcreceiver/          * Florian
 │             │ 
 │             ├──dialogs/                       * our dialogs using @angular/material`s MDDialog
 │                   ├──createMeeting-dialog/    * Florian/Marvin
 │                   │ 
 │                   ├──forgot-dialog/           * Alina/Valentin
 │                   │ 
 │                   ├──info-dialog/             * Marvin
 │                   │ 
 │                   ├──meeting-dialog/          * Florian/Daniel
 │                   │ 
 │                   ├──meetings-dialog/         * Florian
 │                   │ 
 │                   └──register-dialog/         * Florian/Alina/Valentin
 │             │ 
 │             └──views/                         * views of our webapp e.g. /login
 │                   ├──calendar-view/           * Florian
 │                   │ 
 │                   ├──caller-view/             * Florian
 │                   │ 
 │                   ├──login-view/              * Florian/Marvin
 │                   │ 
 │                   ├──profprofil-view/         * Florian/Marvin
 │                   │ 
 │                   ├──receiver-view/           * Florian
 │                   │ 
 │                   └──studprofil-view/         * Florian/Marvin
 │       │ 
 │       ├──model/                               * Daniel || contains all Typescript models
 │       │ 
 │       ├──reducers/                            * contains all reducers for ngrx/store
 │             ├──index.ts                       * Florian || bundles all reducers
 │             ├──chat.reducer.ts                * Florian
 │             ├──peerconn.reducer.ts            * Florian
 │             ├──professors.reducer.ts          * Daniel/Florian
 │             ├──slots.reducer.ts               * Daniel/Florian
 │             └──user.reducer.ts                * Florian
 │       │ 
 │       └──services/                            * our services we use with angular
 │             ├──auth.service.ts                * Florian
 │             ├──call.service.ts                * Florian
 │             ├──peerconnection.service.ts      * Florian
 │             ├──profguard.service.ts           * Florian
 │             ├──rest.service.ts                * Daniel/Florian
 │             ├──studguard.service.ts           * Florian
 │             └──wamp.service.ts                * Florian
 │   │ 
 │   ├──assets/                                  * static assets are served here
 │       ├──icon/                                * our list of icons from www.favicon-generator.org
 │   │ 
 |   ├──index.html                               * Index.html: where we generate our index page
 │   │ 
 |   ├──main.browser.aot.ts                      * our entry file for our browser environment
 │   │
 |   └──polyfills.browser.aot.ts                 * our polyfills file
 │
 ├──constants.js                                 * constants e.g. ports and more webpack-configuration
 ├──package.json                                 * what npm uses to manage it's dependencies
 ├──prodserver.js                                * node.js server config
 ├──tslint.json                                  * typescript lint config
 └──webpack.config.js                            * webpack main configuration file
```

then
```
git clone https://github.com/fmoessle/angular2-webrtc.git
cd angular2-webrtc
npm install
npm start
```

## Basic scripts

Use npm run server:hmr` for dev server. Default dev port is `3000`.

Use `npm run build` for production build.

