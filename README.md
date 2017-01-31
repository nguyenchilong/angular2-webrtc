# WinfProjekt2-WebRTC
This project is part of a project work at the university of applied sciences Stuttgart and is not meant to be used for commercial purposes.

## Installation

- Install Node.js https://nodejs.org
- Clone project

  ```
  git clone https://github.com/fmoessle/angular2-webrtc.git
  cd angular2-webrtc
  npm install
  ```
- Run development server

  ```
  npm start
  ```
- Run build

  ```
  npm run compile
  ```
- Start server

  ```
  node prodserver.js
  ```
  
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

## Usage

- Go to: https://chor-am-killesberg.de:8000
- You can use one of the following users:
  - role: PROFESSOR, username: hoess, password: Test1234
  - role: STUDENT, username: ottooffline, password: Test1234
  
## Contributing

Florian, Marvin, Daniel, Alina und Valentin

## Credits

- Starter project for angular2 and webpack https://github.com/qdouble/angular-webpack2-starter

- Node.js https://github.com/nodejs/node
- Angular 2 https://github.com/angular/angular
- Angular 2 Material Components https://github.com/angular/material2
- Lodash https://github.com/lodash/lodash
- Autobahn.js https://github.com/crossbario/autobahn-js
- Calendar Component https://github.com/mattlewis92/angular-calendar
- Store for application state management https://github.com/ngrx/store
- TLS Certificate https://letsencrypt.org/

## License

MIT License.

