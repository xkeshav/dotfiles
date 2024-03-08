# Angular Project Structure Guidelines

Following is the style guide for the FE project Based on Angular 1. It is recommended to follow one and be consistent throughout the project

1. root folder for FE would be **WebUI** with following file structure

```sh
    └── .gitignore
    ├── node_modules
    ├── webpack.config.json
    ├── package.json
    ├── README.md
    └── src
```

## folder structure

**node_modules**

- all node.js package reside here.
- **do no change** anything inside this folder, it is not going to uploaded on production server

  **src**

- this is the top-level directory
- following is the folder structure

```sh
├── app
├── assets
├── favicon.ico
├── index.html
└── libs
└── specs
```

**assets**

- All static assets will be placed here

```
  ├── images
  ├── fonts
```

All images of project will be placed under **images** folder

- _logo.png_
- _no- whitespace-and-special-character@.png_
- _all-small-case-hyphen-divided-alphanumeric.jpg_

**specs**

- unit testing files will be placed here.
- one component testing per file.
- file name suffixed with _.spec.js_ for eg. _login.spec.js_

**libs**

- save external library/ plugins JS files which package are not resolvable by
  `bower install` or `npm install`
  - FileSaver.js
  - Moment.js
    _favicon.ico_ -- icon file visible in browser's top right in URL

**_index.html_**

- HTML skeleton have `<head>` and `<body>` decalaration
- enable ng-strict-di `<div ng-app="myApp" ng-strict-di>`
- Service worker registration code will be here in `<script>` tag

**app** directory has below folder structure ( Note: this is **folder-by-type** structure)

```sh
.
├── app.constant.js
├── app.filter.js
├── app.interceptor.js
├── app.messages.js
├── app.route.js
├── chart.config.js
├── index.config.js
├── index.less
├── index.module.js
├── index.run.js
├── base.js
├── sw.js
├── directives
├── controllers
├── less
├── services
└── views

```

**controllers**

- Define one controller per file.
- file name: lowercase, appended with _<whatever>.controller.js_
- component name would be pascal case suffixed with `Controller`
  for eg. _DashboardController_
- Use the `controllerAs` syntax over the classic controller with _$scope_ syntax.
- Categorize your controllers in 2 category

  - Parent controller --controller which associated with a complete page.

    - use controllerAS `vm`
    - filename: _user.controller.js_
    - controller name: `.controller('UserController', {});`

  - Child controller -- controller which are associated with modal (pop-up) page

    - use controllerAS `$ctrl` for child controller
    - file name: _confirm-modal.controller.js_
    - controller name: `.controller('ConfirmModalController', {});`
    - All child controller template at one place under _views/templates_ folder

  - Define all variables on top of controller and bind with `vm` with `angular.extend()`

```js
/* avoid */
function CustomerController() {
  this.name = {};
  this.sendMessage = function () {};
}

function CustomerController($scope) {
  $scope.name = {};
  $scope.sendMessage = function () {};
}

/* recommended */
function CustomerController() {
  const vm = this;
  angular.extend(vm, {
    name: {},
    sendMessage: sendMessage,
  });

  const sendMessage = function () {};
}
```

- Use named functions instead of passing an anonymous function in as a callback.

```js
/* avoid */

angular.module("app").controller("DashboardController", function () {});

/* recommended */

// dashboard.js
angular.module("app").controller("DashboardController", DashboardController);

function DashboardController() {}
```

**directives**

- file name: camel case suffixed with _.directive.js_
  eg: _disallowSpace.directive.js_
- directive name: camel case
  eg: `angular.directive('matchWindowHeight', {})`
  and in HTML _<div match-window-height = "">_
- use `restrict: 'EA'` in directive

**services**

- file name: lowercase suffixed with _.service.js_
  eg: _database.service.js_
- service name: camel cased prefixed with `Service`
  eg: `angular.factory('dataService', dataService)`
- use a `.factory` instead of `.service` for consistency.
- service dependency: `$http`
- all method return Promise object
- Using function declarations and accessible members up top or if there is one line of return than write inline.
- use angular standard method `$http.get()`, `$http.post()`, `$http.put()`
- always write `angular.toJson(formdata, true)` when using $http.post
- use `params` or template literal syntax when argument in the URL ( $http.get )
- Do Manual Annotating for Dependency Injection or use ng-annonate
  `dataService.$inject = ['$http', '$q', logger'];`

```js
      angular
          .module('app.core')
          .factory('dataService', dataService);

          const dataService = ($http, $q, logger) => {
                  let isPrimed = false;
                  let primePromise;
                  const service = {
                      getList: (pn = 1, ps = 20) => $http.get(`/api/v1.0/database?pagenum=${pn}&pagesize=${ps}`),
                      updateList: updateList,
                      saveList: saveList,
                      fetchItem: fetchItem
                  };

            //////////// or define later /////////////
            const updateList => (form_data) {
                 return $http.put('endpoint',angular.toJson(form_data, true)
            };

            const fetchItem => (id) => $http.get('/api/v1.0/database/description', { params: { id: id }});
      }
```

**views**

- contains the `.html` files.
- folders of each module
- folder name - singular ( except _templates_ )
- file names will be single word and meaningful.
- in _templates_ folder, file name are separated by `_` and will have minimal self explanatory name such as _enroll_user.html_ _confirm_remove.html_ and so on.
- _common_ folder have basic html files such as header, footer and navigation.

**less**

We are using less files for the styling of application.

_custom.less_ in this file we add new stylesheet.
_base.less_ contains all basic and default css
_variable.less_ contains all variables such as colors and images location

- Use BEM (Block Element Modifier) model while declaring custom css

_header--title_size_

**_index.less_**

is the main stylesheet file which import other less files located on _/app/less_ folder.

**_index.module.js_**

The very first file of our project where we defined our module and register outher modules.

`angular.module('app', ['ngStorage','ui-router', ...]);`

**_index.config.js_**

is the file we are using for the purpose of all routing and other provider basic configuration.

we also define `BASE_URL` here through `.value` provider

**_index.run.js_**

- All broadcast messages and `.run` block method will be added here.
- `$rootScope` is used.
- user authentication and page accessibility will be done from here.
- event using `$scope.on` and _State Events_ are defined here.

**_app.filter.js_**

- contains all filter definition in a single file.
- filter method name will be uppercase prefix with `_FILTER`.

```js
    .filter(<WHAT>_FILTER, function (DI) {
        return (input, arg) => {
            var output = filterToApply(input,arg);
            return output;
        };
    });

```

**_app.constant.js_**

- contains all constant in a single file used across the application.
- `.constant` name will be in uppercase and value can be {object} , [array] or [{object}, {object}].
  for eg.

```js
    .constant('USER_ROLES', {
            ROLE_SYSTEM_ADMIN: 'System Administrator'
    })
```

```js
.constant('TOP_NAVBAR', [{
            "caption": "Dashboard",
            "link": "dashboard"
        }, {
            "caption": "Applications",
            "link": "application"
        }];
```

**_app.interceptor.js_**

- creating an interceptor that will modify all requests made with the $http service as well as intercept any response errors.
- We want to modify the outgoing requests so that we can add an authorization token to the header of our call.

-The `$httpProvider` provider contains an array of interceptors which added in `.config()`.

**_app.messages.js_**

- The file required for the confirm button pop-up messages list.
- Add all messages custom text using `.value` provider.

**_app.route.js_**

- Separate route configuration into its own file. Examples might be _app.route.js_ for the main module and _admin.route.js_ for the admin module.

**_base.js_**

- javascript code which is used to adjust the height of application on scroll and resize.

**_sw.js_**

- Service worker configuration will be written here ( activation, installation and strategy)

**_chart.config.js_**

- The file contains basic configuration for the chart and graphs with mock data.

### Naming convention

Use consistent names for all components following a pattern that describes the component's feature
then (optionally) its type.My recommended pattern is _feature.type.js_

There are 2 names for most assets:

the file name (_noun.controller.js_)
the registered component name with Angular (_NounController_)

- PascalCaseController
- camelCaseService
- directiveDoesThis

### webSockets

- websocket topic id in uppercase = TOPIC_FOR_WHAT eg; TOPIC_DB_COUNT
- topic name prefixed with `topic` => topic\_<for_what> eg. topic_usage, `topic_db_count`
- channel name prefixed with `channel` => channel\_<for_what> eg. `channel_db_count`

for more Reference: <https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md>
