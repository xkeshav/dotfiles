Following is the style guide for the FE project. It is recommened to follow one and be consisnet throughout the project

1) root folder for FE would be **WebUI**  with following file structure

└── .gitignore
├── node_modules
├── webpack.config.json
├── package.json
├── README.md
└── **src**

-- node.js packages installed into **node_modules** directories. do no change this folder, it is not going to loaded on production server

**src** 
- this is the top-level directory
- following is the folder structure

├── **app**
├── **assets**
├── favicon.ico
├── index.html
└── **libs**
├── **specs**

**assets**
  ├── **images**
  ├── **fonts**

All images will be placed under **images** folder
  - logo.png
  - no-whitespace-and-special-character.png
  - all-smallcase-hypen-divided-alphanumeric.jpg

**libs**

- save extrenal library/ plugins JS files which package are not resolvable by 
`bower install` or `npm install`
  + FileSaver.js
  + Moment.js

**index.html**

- HTML skeleton have <head> and <body> decalaration
- enable ng-strict-di <div ng-app="myApp" ng-strict-di>

**app** directory has below folder structure 
( Note: this is **folder-by-type** structure )
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
├── inspinia.js
├── **directives**
├── **controllers**
├── **less**
├── **services**
└── **views**

**controllers**

  - Define one controller per file.
  - file name: lowercase, appended with *<whatever>.controller.js*
  - component name would be pascal case suffixed with `Controller`; 
     eg. *DashboardController*
  - Use the `controllerAs` syntax over the classic controller with *$scope* syntax.
  - Categorize your controllers in 2 category
  - Parent Controller: controller which associated with a complete page.
  - Child Controller: controller which are associated with modal (pop-up) page.
  
  - Parent controller
   - use controllerAS `vm`
   - filename: *user.controller.js*
   - controller name: `.controller('UserController', {});`
  
  - Child controller
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

Do Manual Annotating (using `$inject`) for Dependency Injection or use ng-annonate.

Note:

**directives**

  - file name: camel case suffixed with *.directive.js*
    eg: *disallowSpace.directive.js*
  - directive name: camel case
    eg: ` angular.directive('matchWindowHeight', {})` 
  - use `restrict: 'EA'` in directive 

   <div match-window-height = "" >

**services**

  - file name: lowercase suffixed with *.service.js* 
      eg: *database.service.js*
  - directive name: camel cased prefixed with `Service`
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

header--title_size


*app/index.less* 

is main stylesheet file which import other less file located on */app/less* folder.

*index.module.js*

The very first file of our project where we defined our module and register outher modules.

`angular.module('app', ['ngStorage','ui-router', ...]);`

*index.config.js*

is the file we are using for the purpose of all routing and other provider basic configuration.

we also define `BASE_URL` here through `.value` provider

*index.run.js*

- All broadcast messages and `.run` block method will be added here.
- `$rootScope` is used.
- user authentication and page accessibility will be done from here.
- event using `$scope.on` and _State Events_ are defined here.

*app.filter.js*

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

*app.constant.js* 

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

*app.interceptor.js* 

- creating an interceptor that will modify all requests made with the $http service as well as intercept any response errors.
- We want to modify the outgoing requests so that we can add an authorization token to the header of our call. 

-The `$httpProvider` provider contains an array of interceptors which added  in `.config()`.

*app.messages.js* 

- The file required for the confirm button pop-up messages list.
- Add all messages custom text using `.value` provider.

*app.route.js*

 - Separate route configuration into its own file. Examples might be *app.route.js* for the main module and *admin.route.js* for the admin module. 

*inspinia.js* 

- javascript code which is used to adjust the height of application on scroll and resize.

*chart.config.js* 

- The file contains basic configuration for the chart and graphs with mock data.

websockets naming convetion

websocket topic id in uppercase = TOPIC_FORWHAT eg; TOPIC_DBCOUNT
topic name prefixed with `topic` => topic_<forwhat> eg. topic_usage, `topic_dbcount`
channel name prefixed with `channel` => channel_<forwhat> eg. `channel_dbcount`

Reference: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

