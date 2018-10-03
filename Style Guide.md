Following is the style guide for the FE project. It is recommened to follow one and be consisnet throughout the project

1) root folder for FE would be **WebUI**  with following file structure

```
    └── .gitignore
    ├── node_modules
    ├── webpack.config.json
    ├── package.json
    ├── README.md
    └── src
```

**node_modules**

 - all node.js package reside here.
 - **do no change** anything  inside this folder, it is not going to uploaded on production server

**src** 

- this is the top-level directory
- following is the folder structure

```
├── app 
├── assets
├── favicon.ico
├── index.html
└── libs
└── specs
```

**assets**

 - All static assests will be placed here

```
  ├── images
  ├── fonts
```

All images of project will be placed under **images** folder
  - logo.png
  - no-whitespace-and-special-character.png
  - all-smallcase-hypen-divided-alphanumeric.jpg

**specs**

  - unit testing files will be placed here.
  - one component testing per file.
  - file name suffixed with *.spec.js* for eg. login.spec.js

**libs**

- save extrenal library/ plugins JS files which package are not resolvable by 
`bower install` or `npm install`
  + FileSaver.js
  + Moment.js
  
 *favicon.ico* -- icon file visible in browser's top right in URL

*__index.html__*

 - HTML skeleton have `<head>` and `<body>` decalaration
 - enable ng-strict-di `<div ng-app="myApp" ng-strict-di>`
 - Service worker registration code will be here in `<script>` tag

**app** directory has below folder structure ( Note: this is **folder-by-type** structure )


```
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
  - file name: lowercase, appended with *<whatever>.controller.js*
  - component name would be pascal case suffixed with `Controller` 
     for eg. *DashboardController*
  - Use the `controllerAs` syntax over the classic controller with *$scope* syntax.
  - Categorize your controllers in 2 category
  
     - Parent controller --controller which associated with a complete page.
       - use controllerAS `vm`
       - filename: *user.controller.js*
       - controller name: `.controller('UserController', {});`
  
    - Child controller --  controller which are associated with modal (pop-up) page
       - use controllerAS  `$ctrl` for child controller
       - file name: *confirm-modal.controller.js*
       - controller name: `.controller('ConfirmModalController', {});`
       - All child controller template at one place under *views/templates* folder

    - Define all variables on top of controller and bind with `vm`  with `angualr.extend()` method.

```
/* avoid */
function CustomerController() {
    this.name = {};
    this.sendMessage = function() { };
}

function CustomerController($scope) {
    $scope.name = {};
    $scope.sendMessage = function() { };
}

/* recommended */
function CustomerController() {
    const vm = this;
    angular.extend(vm , {
    name: {},
    sendMessage: sendMessage
    })

    const sendMessage = function() { };
}

```
  
- Use named functions instead of passing an anonymous function in as a callback.

```
/* avoid */

angular
    .module('app')
    .controller('DashboardController', function() { })


/* recommended */

// dashboard.js
angular
    .module('app')
    .controller('DashboardController', DashboardController);

function DashboardController() { }
```

**directives**

  - file name: camel case suffixed with *.directive.js*
    eg: *disallowSpace.directive.js*
  - directive name: camel case
    eg: ` angular.directive('matchWindowHeight', {})` 
    and in HTML *<div match-window-height = "">*
  - use `restrict: 'EA'` in directive 


**services**

  - file name: lowercase suffixed with *.service.js* 
      eg: *database.service.js*
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

```
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
            const updateList => (formdata) {
                 return $http.put('endpoint',angular.toJson(formdata, true)
            };

            const fetchItem => (id) => $http.get('/api/v1.0/database/description', { params: { id: id }});
      }
```

**views**

- contains the `.html` files.
- folders of each module
- folder name - singular ( except *templates* )
- file names will be single word and meaningful.
- in *templates* folder, file name are separated by `_` and will have minimal self explanatory name such as *enroll_user.html*  *confirm_remove.html* and so on.
- *common* folder have basic html files such as header, footer and navigation.

**less**

We are using  less files for the styling of application.

*custom.less* in this file we add new stylesheet.
*base.less* contains all basic and default css 
*variable.less* contains all variables such as colors and images location

- Use BEM (Block Element Modifier) model while decakring custom css

*header--title_size*


*__index.less__* 

is the main stylesheet file which import other less files located on */app/less* folder.

*__index.module.js__*

The very first file of our project where we defined our module and register outher modules.

`angular.module('app', ['ngStorage','ui-router', ...]);`

*__index.config.js__*

is the file we are using for the purpose of all routing and other provider basic configuration.

we also define `BASE_URL` here through `.value` provider

*__index.run.js__*

- All broadcast messages and `.run` block method will be added here.
- `$rootScope` is used.
- user authentication and page accessibility will be done from here.
- event using `$scope.on` and _State Events_ are defined here.

*__app.filter.js__*

- contains all filter definition in a single file.
- filter method name will be uppercase prefix with  `_FILTER`.

```
    .filter(<WHAT>_FILTER, function (DI) {
        return (input, arg) => {
            var output = filterToApply(input,arg);
            return output;
        };
    });

```

*__app.constant.js__* 

- contains all constant in a single file used across the application.
- `.constant` name will be in uppercase and value can be {object} , [array] or [{object}, {object}].
for eg.

```
    .constant('USER_ROLES', {
            ROLE_SYSTEM_ADMIN: 'System Administrator'
    })
```

```
.constant('TOP_NAVBAR', [{
            "caption": "Dashboard",
            "link": "dashboard"
        }, {
            "caption": "Applications",
            "link": "application"
        }];
```

*__app.interceptor.js__* 

- creating an interceptor that will modify all requests made with the $http service as well as intercept any response errors.
- We want to modify the outgoing requests so that we can add an authorization token to the header of our call. 

-The `$httpProvider` provider contains an array of interceptors which added  in `.config()`.

*__app.messages.js__* 

- The file required for the confirm button pop-up messages list.
- Add all messages custom text using `.value` provider.

*__app.route.js__*

 - Separate route configuration into its own file. Examples might be *app.route.js* for the main module and *admin.route.js* for the admin module. 

*__base.js__* 

- javascript code which is used to adjust the height of application on scroll and resize.

*__sw.js__*

 - Service worker configuration will be written here ( activation, installation and strategy)

*__chart.config.js__* 

- The file contains basic configuration for the chart and graphs with mock data.

### Naming convention

Use consistent names for all components following a pattern that describes the component's feature then (optionally) its type. My recommended pattern is feature.type.js.

There are 2 names for most assets:

the file name (*noun.controller.js*)
the registered component name with Angular (*NounController*)

 - PascalCaseConroller
 - camleCaseService
 - directiveDoesThis

websockets 
 - websocket topic id in uppercase = TOPIC_FORWHAT eg; TOPIC_DBCOUNT
 - topic name prefixed with `topic` => topic_<forwhat> eg. topic_usage, `topic_dbcount`
 - channel name prefixed with `channel` => channel_<forwhat> eg. `channel_dbcount`

for more Reference: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

