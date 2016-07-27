# Angular Material-Start (ES6 Tutorials)

This branch contains the tutorial steps and processes used to implement the start-app shown below:

![material-starter-ux2](https://cloud.githubusercontent.com/assets/6004537/14996543/b588eb46-1137-11e6-803c-ce23996c9742.png)

Above is a snaphot of the Starter-App with a **Master-Detail** layout: showing a list of users (left) and a user detail
view (right).

Also shown is the user experience that will be displayed for smaller device sizes. The responsive layout reveals the **menu** button that can be used to hide the user list. And the **share** button can be used to show the Share bottom
sheet view.

This Starter app demonstrates how:

*  Angular Material `layout` and `flex` options can easily configure HTML containers
*  Angular Material components `<md-toolbar>`, `<md-sidenav>`, `<md-icon>` can be quickly used
*  Custom controllers can use and show `<md-bottomsheet>` with HTML templates
*  Custom controller can easily, programmatically open & close the SideNav component.
*  Responsive breakpoints and `$mdMedia` are used
*  Theming can be altered/configured using `$mdThemingProvider`


This sample application is purposed as both a learning tool and a skeleton application for a typical
[AngularJS Material](http://angularjs.org/) web app: comprised of a Side navigation area and a content area. You can
use it to quickly bootstrap your angular webapp projects and dev environment for these projects.

- - -

#### "How to build an App"

Here are some generalized steps that may be used to conceptualize the application implementation process:

1. Plan your layout and the components you want to use

2. Use hard-coded HTML and mock content to make sure the components appear as desired

3. Wire components to your application logic

   > Use the seamless integration possible with Angular directives and controllers<br/>
   > This integration assumes that you have unit tested your app logic

4. Add Responsive breakpoints

5. Add Theming support

6. Confirm ARIA compliance

7. Write e2e Tests

   > It is important to validate your app logic with Angular Material UI components.

###### Wirefame

The illustration below shows how we planned the layout and identified the primary components that will be used in the Starter app:

<br/>
![plancomponents2](https://cloud.githubusercontent.com/assets/210413/6444676/c247c8f8-c0c4-11e4-8206-208f55cbceee.png)

> **Note:** The container #2 (above) is a simple `<div>` container and not an Angular Material component.

- - -

##### ES6 Tutorials

These tutorial use jspm.io: package manager for SystemJS which is built on top of the dynamic ES6 module loader. This
allows developers to load any module format (ES6, CommonJS, AMD, and globals).

These tutorials assume that you have already cloned the repository and executed the following commands:

* `git checkout es6-tutorial`
* `npm install jspm live-server -g`
* `jspm update`
* `live-server --open=app`

> **Note:** You should use a web-server (like live-server above) to view your app at each step. Open the dev console to see
  any warnings and browse the elements.

You will notice a few directories within this tutorial:

 1. `app/src` - This is where all of your application files will be created and edited.
 2. `app/src/users` - This folder contains some tutorial-provided services and views for you to
    reuse.
 3. `app/assets` - This folder contains some tutorial-provided images and icons which are used by
    the application.

> **Note:** You should not need to edit anything in the `app/src/users` or `app/assets` directories until
  Steps #9 & #10 where we will refactor the users code.

These folders and files will be used to guide you through the development process. By following these tutorial steps,
you will be very quickly introduced to the powerful features of Angular Material.

We encourage you to walk through each step yourself and build the application from the ground up. However, if you get
stuck or want to start from a clean slate, each step has an associated Git tag that you can checkout to reset your
code to match the start of the associated step in the tutorial.

For instance, to start on Step 3, run `git checkout step-3`. Also note that `step-1` is the same as the `es6-tutorial`
branch.

> **Note:** In some of the Steps in this README, we have abbreviated some of the HTML or JavaScript in order to show
  what is being added or changed, so you may not be able copy/paste every example into your code. If you wish to start
  fresh, use the Git tags as described above.

- - -

Now let's review our initial setup:

`app/index.html`
```html
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />

    <title>Angular Material - Starter App</title>
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,700'>
    <link rel="stylesheet" href="./assets/app.css"/>
  </head>

  <body ng-cloak>
    <!--
        No content yet!
    -->
    <script src="./jspm_packages/system.js" type="text/javascript"></script>
    <script src="config.js" type="text/javascript"></script>
    <script type="text/javascript">
      System
          .import('src/boot/boot')
          .catch( console.error.bind(console) ); // make sure any errors print to console
    </script>

  </body>
```

`app/src/boot/boot.js`
```js
import angular from 'angular';

/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */
angular
  .element( document )
  .ready( function() {
    angular
      .module( 'starter-app-bootstrap', [ ] )
      .run(()=>{
        console.log(`Running the 'starter-app-bootstrap' module for ES6 Material-Start Tutorial`);
      });

    let body = document.getElementsByTagName("body")[0];
    angular.bootstrap( body, [ 'starter-app-bootstrap' ]);
  });
```

- - -

### Step #1:

Here you will modify the application to use Angular-Material.

* In the HTML, load the Angular Material CSS stylesheet and appropriate `<meta>`/`<title>` tags
* Load the Angular Material JS library and its dependent libraries
* Configure the app dependency on 'ngMaterial'

`app/index.html`
```html
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />

    <title>Angular Material - Starter App</title>
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,700'>
    <link rel="stylesheet" href="./jspm_packages/github/angular/bower-material@master/angular-material.css"/>
    <link rel="stylesheet" href="./assets/app.css"/>
  </head>
```

> **Note:** The NPM and JSPM configurations already installed the Angular Material libraries. Re-installs are easily
  done using `jspm install angular-material@master`.

> **Note:** Note that we have manually included the Material CSS. This is because JSPM does not guarantee
  the order in which CSS files are loaded, and we want to ensure that our `app.css` file is loaded
  after the Material CSS so that it can properly override certain selectors.

`app/src/app.js`
```js
// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

export default angular.module( 'starter-app', [ 'ngMaterial' ] )
  .run(() => {
    console.log(`Starting the 'starter-app' module`);
  });
```

`app/src/boot/boot.js`
```js
import angular from 'angular';

import App from 'src/app';

/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */
angular
  .element( document )
  .ready( function() {
    angular
      .module( 'starter-app-bootstrap', [ App.name ] )
      .run(()=>{
        console.log(`Running the 'starter-app-bootstrap' module for ES6 Material-Start Tutorial`);
      });

    let body = document.getElementsByTagName("body")[0];
    angular.bootstrap( body, [ 'starter-app-bootstrap' ]);
  });
```
- - -

### Step #2:

Here we will use the wireframe planning and layout to identify the components and attributes needed.

* Add the `<md-toolbar>`, `<md-sidenav>`, `<md-content>` containers

> **Note:** The `md-sidenav` is the container for the Users **master** list view, and the `md-content` is the container
for the User **detail** view.

* Add the **layout** and **flex** attributes to configure the container layouts and sizing aspects
* Use `md-is-locked-open` to lock the sidenav open on the left
* Use the `md-whiteframe-4dp` class to add a shadow the the sidenav

`app/index.html`
```html
  <body ng-cloak layout="column">

    <!-- Container #1 (see wireframe) -->
    <md-toolbar layout="row" class="md-toolbar-tools">
      <h1>Angular Material - Starter App</h1>
    </md-toolbar>

    <!-- Container #2 -->
    <div flex layout="row">

      <!-- Container #3 -->
      <md-sidenav md-is-locked-open="true" class="md-whiteframe-4dp">
        Sidenav
      </md-sidenav>

      <!-- Container #4 -->
      <md-content flex id="content">
        Content
      </md-content>

    </div>

  </body>
```

- - -

### Step #3:

Here you will use hard-coded elements to confirm rendering and layout of the container child elements and Angular Material
components.

`app/index.html`
```html
<body layout="column">

  <!-- Container #1 (see wireframe) -->
  <md-toolbar layout="row" class="md-toolbar-tools">
    <h1>Angular Material - Starter App</h1>
  </md-toolbar>

  <!-- Container #2 -->
  <div flex layout="row">

    <!-- Container #3 -->
    <md-sidenav md-is-locked-open="true" class="md-whiteframe-4dp">
      <md-list>
        <!-- List item #1 -->
        <md-list-item>
          <md-button>
            <md-icon md-svg-src="./assets/svg/avatar-1.svg" class="avatar"></md-icon>
            Lia Luogo
          </md-button>
        </md-list-item>

        <!-- List item #2 -->
        <md-list-item>
          <md-button>
            <md-icon md-svg-src="./assets/svg/avatar-4.svg" class="avatar"></md-icon>
            Lawrence Ray
          </md-button>
        </md-list-item>

      </md-list>
    </md-sidenav>

    <!-- Container #4 -->
    <md-content flex id="content">
      <!-- User details sample -->

      <md-icon md-svg-src="./assets/svg/avatar-1.svg" class="avatar"></md-icon>
      <h2>Lia Luogo</h2>
      <p>
        I love cheese...
      </p>
    </md-content>

  </div>
</body>
```

- - -

### Step #4:

Here you integrate your custom, application logic.

* `app.js` internally loads the Users module
* `Users.js` defines your data services, models, and controllers (remember that this is provided by the tutorial)

`app/src/app.js`
```js
// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Users from 'src/users/Users';

export default angular.module( "starter-app", [ 'ngMaterial', Users.name ] )
  .run(() => {
    // ...
  });
```

- - -

### Step #5:

Here you will replace the hardcoded HTML with dynamic markup using Angular directives (eg `ng-repeat`) and `{{ }}` interpolation markup to utilize the User functionality we just imported in Step #4.

* Add the `ng-controller` tag to the `<body>` element
* Use dynamic HTML that will be compiled and rendered by Angular
* Register a custom icon set of 'user' avatars for the user list
* Register **menu** and **share** icon urls for the md-buttons

`app/index.html`
```html
<body ng-cloak layout="column" ng-controller="UsersController as ul">

  
  <!-- Container #1 (see wireframe) -->
  <md-toolbar layout="row" class="md-toolbar-tools">
    <md-button class="menu md-icon-button">
      <md-icon md-svg-icon="menu"></md-icon>
    </md-button>
    <h1>Angular Material - Starter App</h1>
  </md-toolbar>

  <!-- Container #2 -->
  <div flex layout="row">

    <!-- Container #3 -->
    <md-sidenav md-is-locked-open="true" class="md-whiteframe-4dp">
      <md-list>
        <md-list-item ng-repeat="it in ul.users">
          <md-button ng-click="ul.selectUser(it)" ng-class="{'selected' : it === ul.selected }">
            <md-icon md-svg-icon="{{it.avatar}}" class="avatar"></md-icon>
            {{it.name}}
          </md-button>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <!-- Container #4 -->
    <md-content flex id="content">
      <md-icon md-svg-icon="{{ul.selected.avatar}}" class="avatar"></md-icon>
      <h2>{{ul.selected.name}}</h2>
      <p>{{ul.selected.content}}</p>

      <md-button class="md-fab md-fab-bottom-right">
        <md-icon md-svg-icon="share"></md-icon>
      </md-button>
    </md-content>

  </div>
</body>
```

in `src/app.js`

```js
// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Users from 'lib/users/Users';

export default angular.module( "starter-app", [ 'ngMaterial', Users.name ] )
  .config(($mdIconProvider) => {
    // Register the user `avatar` icons
    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24);
  });
```

- - -

### Step #6:

Here you will add responsive breakpoints so the application layout will adapt to different device display sizes.

* Lock the Users list open if device display is wider than > 960px; hide otherwise
* Hide the Toolbar menu icon button if the Users list is open
* Add `md-component-id="left"` to the sidenav so we can toggle it open/closed
* Add `click` support for the **menu** and **share** buttons
* Register icons for bottom sheet

`app/index.html`
```html
<body ng-cloak layout="column" ng-controller="UsersController as ul">

<!-- Container #1 (see wireframe) -->
<md-toolbar layout="row" class="md-toolbar-tools">
  <md-button class="menu md-icon-button" hide-gt-sm ng-click="ul.toggleList()">
    <md-icon md-svg-icon="menu" ></md-icon>
  </md-button>
  <h1>Angular Material - Starter App</h1>
</md-toolbar>

<!-- Container #2 -->
<div flex layout="row">

  <!-- Container #3 -->
  <md-sidenav class="md-whiteframe-4dp" md-is-locked-open="$mdMedia('gt-sm')"
              md-component-id="left" ng-click="ul.toggleList()">
    <md-list>
      <md-list-item ng-repeat="it in ul.users">
        <md-button ng-click="ul.selectUser(it)" ng-class="{'selected' : it === ul.selected }">
          <md-icon md-svg-icon="{{it.avatar}}" class="avatar"></md-icon>
          {{it.name}}
        </md-button>
      </md-list-item>
    </md-list>
  </md-sidenav>

  <!-- Container #4 -->
  <md-content flex id="content">
    <md-icon md-svg-icon="{{ul.selected.avatar}}" class="avatar"></md-icon>
    <h2>{{ul.selected.name}}</h2>
    <p>{{ul.selected.content}}</p>

    <md-button class="md-fab md-fab-bottom-right" ng-click="ul.share($event)">
      <md-icon md-svg-icon="share"></md-icon>
    </md-button>
  </md-content>

</div>
</body>
```

In `app.js` register the **share** icons displayed in the User Detail view's bottomsheet:

`app/src/app.js`
```js
// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Users from 'src/users/Users';

export default angular
  .module( "starter-app", [ 'ngMaterial', Users.name ] )
  .config(($mdIconProvider) => {

    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);
  });
```

- - -

### Step #7:

Here you will configure a different, darker theme to be used.

* Use `$mdThemingProvider` to configure a different theme using primary colors from the **brown** color palette and
  accent colors from the **red** color palette.

`app/src/app.js`
```js
// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Users from 'src/users/Users';

export default angular
  .module( "starter-app", [ 'ngMaterial', Users.name ] )
  .config(($mdIconProvider, $mdThemingProvider) => {

    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  });
```

- - -

### Step #8:

Here you will fix any ARIA warnings that Angular Material may display in the Dev console.

* Insert `aria-label` attributes for `<md-button>` components that do not have labels.

`app/index.html`
```html
<body>

  <!-- Wireframe Container #1 -->
  <md-toolbar layout="row">
    <md-button ... aria-label="Show User List"></md-button>
  </md-toolbar>

  <!-- Wireframe Container #2 -->
  <div flex layout="row">

    <!-- Wireframe Container #3 -->
    <md-sidenav>...</md-sidenav>

    <!-- Wireframe Container #4 -->
    <md-content flex id="content">
      <md-button ... aria-label="Share"></md-button>
    </md-content>

  </div>
</body>
```

Congratulations! You now have a fully functional Angular Material application!

In the next two steps, we'll refactor our code into separate Angular 1.4-style components, and then
once again refactor using the new Angular 1.5 `component()` API.

- - -

### Step #9:

Here you will refactor your HTML and code to create the `<users-list>` and `<user-details>` components.

* create templates based on HTML in `index.html`
* define your UsersList and UserDetails directives
* create your directive controllers and extract logic from the `lib/users/controllers/UsersController.js`
* update your `app.js` module to register the new directives

For this app, we recommend the following layout for your files:

  - src
    - users
      - details
        - UserDetails.html
        - UserDetails.js <-- This is our directive file
        - UserDetailsController.js
      - list
        - UsersList.html
        - UsersList.js <-- This is our directive file
        - UsersListController.js

In lieu of copy/pasting all of the files, we have shown just the `Users.js` and `index.html` files below. If you wish
to see how we have separated the directives so you can run `git checkout step-10` and view the files.

> **Note:** In order to stay with the ES6 paradigm of classes, the `UsersList` and `UserDetails` have been written as
  full classes rather than plain functions. This means that we must first instantiate the class before we pass it to
  Angular's `.directive()` method as you can see below. We'll change this in Step #10 below to export a simple config
  object that is more consistent with the `.component()` API.

`app/src/users/Users.js`
```js
// Load the custom app ES6 modules

import UsersService from 'src/users/services/UsersDataService'
import UsersController from 'src/users/controllers/UsersController'

import UsersList from 'src/users/list/UsersList';
import UserDetails from 'src/users/details/UserDetails';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial'])
   
  .directive("usersList", () => new UsersList)
  .directive("userDetails", () => new UserDetails)
  
  .service("usersService", UsersService)
  .controller("UsersController", UsersController);
```

`app/index.html`
```html
<!-- Container #2 -->
<div flex layout="row">

  <!-- Container #3 -->
  <md-sidenav ...>
    <!-- Custom UsersList component -->
    <users-list
        users="ul.users"
        selected="ul.selected"
        on-selected="ul.selectUser(user)">
    </users-list>
  </md-sidenav>

  <!-- Container #4 -->
  <md-content ...>
    <!-- Custom UserDetails component -->
    <user-details
        selected="ul.selected" >
    </user-details>
  </md-content>

</div>
```
- - -

### Step #10:

Here you will refactor your directives and controllers to use the Angular 1.5 Component API.

* combine the directives and controllers logic into the **UsersList** and **UserDetails** classes
* Use the **bindings** keyword and *1-way* data-binding
* update the Users module to register the new components

> **Note:** If you want to copy/paste the code from the `step-10` directory, you will also need to delete the
  `app/src/users/list/UsersListController.js` as it is not used.

`app/src/users/details/UserDetails.js`
```js
class UserDetailsController  {
  // previous code here...
}

export default {
  name : 'userDetails',
  config : {
    bindings         : {  selected: '<'  },
    templateUrl      : 'src/users/details/UserDetails.html',
    controller       : [ '$mdBottomSheet', '$log', UserDetailsController]
  }
};
```

`app/src/users/list/UsersList.js`
```js
export default {
  name : 'usersList',
  config : {
    bindings         : {  users: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/users/list/UsersList.html'
  }
};
```

`app/src/users/Users.js`
```js
// Load the custom app ES6 modules

import UsersService from 'src/users/services/UsersDataService';
import UsersController from 'src/users/controllers/UsersController';

import UsersList from 'src/users/list/UsersList';
import UserDetails from 'src/users/details/UserDetails';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial'])
   
  .component( UsersList.name, UsersList.config )
  .component( UserDetails.name, UserDetails.config )
  
  .service("usersService", UsersService)
  .controller("UsersController", UsersController);
```

## Summary

With only ten (10) Tutorial Steps and a few minutes of work, we have quickly created a functional Angular Material
application that is beautiful, responsive, theme'ed, accessible, component-based, and easily maintained.
