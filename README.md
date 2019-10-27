# `@norjs/ui`

Common NorJS frontend components.

### WebStorm and Typing in JSDoc

@FIXME: This should be an article at norjs.com

#### Enable ES6 in WebStorm

Change to use *EcmaScript 6* at *Webstorm* -> *Preferences* -> *Languages & Frameworks* -> *JavaScript*.

#### Install 3rd Party typing information

You may 3rd party libraries from *Webstorm* -> *Preferences* -> *Languages & Frameworks* -> *JavaScript* -> *Libraries*.

You should have *Node.js Core* and *HTML* enabled.

We use type names from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) for AngularJS, UI Router, 
etc. You should clone this repository on your local system.

You can install these .d-files to your WebStorm so it can also understand them. 

We recommend to install only specific versions:

  * types/angular/index.d.ts
  * types/angular-ui-router/index.d.ts
  * types/angular-translate/index.d.ts
  * types/angular-sanitize/index.d.ts
  * types/angular/jqlite.d.ts
  * types/lodash/index.d.ts
  * types/moment-timezone/index.d.ts
  * types/uuidv4/index.d.ts

You may install these libraries from *Webstorm* -> *Preferences* -> *Languages & Frameworks* -> *JavaScript* -> *Libraries*.

#### Typing Quick List

| Injectable Name               | Type Name                       |
| ----------------------------- | ------------------------------- |
| `$injector`                   | `angular.auto.IInjectorService` |
| `$element`                    | `JQLite`                        |
| `$q`                          | `angular.IQService`             |
| `$attrs`                      | `angular.IAttributes`           |
| `$scope`                      | `angular.IScope`                |
| `$compile`                    | `angular.ICompileService`       |
| `$timeout`                    | `angular.ITimeoutService`       |
| `$document`                   | `angular.IDocumentService`      |
| `$rootScope`                  | `angular.IRootScopeService`     |
| `$interval`                   | `angular.IIntervalService`      |
| `$http`                       | `angular.IHttpService`          |
| `$state`                      | `angular.ui.IState`             |
| AngularJS's component options | `angular.IComponentOptions`     |
| form's controller             | `angular.IFormController`       |
| ng-model's controller         | `angular.INgModelController`    |
