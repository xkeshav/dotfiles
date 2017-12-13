
- Wrap Angular components in an Immediately Invoked Function Expression (IIFE).
- Do Manual Annotating (`$inject`) for Dependency Injection or use ng-annonate.
- single quoted strings
- no un necessary white space in the file.
- use IDE tools for beautification and indentation.

1) USE es6

- let and const 
- template literal 
- fat arrow function
- async/await
- default, rest and spread 
- modules import/export
- classes
- destructing variable
- iterator, for..of
- object assign and other higher order function ( pure functions)
- advance array function map, filter, reduce, find

1) Component Convetions

###Controller

Use a capture variable for this when using the controllerAs syntax. Choose a consistent variable name such as `vm`, which stands for ViewModel.

- Use the `controllerAs` syntax over the classic controller with *$scope* syntax.
  
- The `controllerAs` syntax uses `this` inside controllers which gets bound to *$scope*
  
- Use a capture variable for `this` when using the controllerAs syntax. Choose a consistent variable name such as *vm*, which stands for ViewModel.
- 
###Modules:

- When there are multiple modules, the main module file is named *app.module.js* while other dependent modules are named after what they represent. For example, an admin module is named *admin.module.js*. The respective registered module names would be app and admin.

###Routes:

- Separate route configuration into its own file. Examples might be *app.route.js* for the main module and *admin.route.js* for the admin module. Even in smaller apps I prefer this separation from the rest of the configuration.


###Routing:
- Use the AngularUI Router for client-side routing.
- UI Router offers all the features of the Angular router plus a few additional ones including nested routes and states.
- The syntax is quite similar to the Angular router and is easy to migrate to UI Router.


below is the basic format if DI in controller

.controller('NounController', ( __ANGULAR SERVICES, __OTHER_MODULES , __SERVICES, __CONSTANT, __RESOLVABLE)


__ANGULAR SERVICES
     $scope, $rootScope, $log,
     $state, $filter, $injector, $sce, $q, $http,
     $interval, $timeout, $interpolate, $parse, $compile
     $cookies, $window, $document, $location, $anchorScroll
     $uibModal, $uibModalInstance
__OTHER_MODULES like toastr, NgStorage etc..
__SERVICES
__CONSTANT
__RESOLVABLE



//example controller
```
(function() {

    'use strict'; // always use this
    angular
    .module('app')
    .controller('ApplicationController', function($scope, $log, $timeout, $uibModal, toastr, ApplicationService, TILE_COLORS, parentData) {
        //first line on controller will be
        const vm  = this;

        let defaultSignupForm = {
            firstName: "",
            lastName: "",
            companyName: "",
            email: ""
        };

        //Place bindable members at the top of the controller, intialize all variable using `angular.extend(vm ,{..})`

        angular.extend(vm, {
            title: 'Title Text',
            errorName: '',
            errorMessage: '',
            list: null,
            search: '',
            arr_data: [],
            obj_data: {},
            parent: parentData,
            isValid: true,
            hasError: false,
            formdata: {
                usename: '',
                password: '',
                email: ''
            },
            signupFormdata: angular.copy(defaultSignupForm),
            color_box: TILE_COLORS
        });

         // initialize method with `const methodName = () => { ...}`  and add  with `angular.extend` on bottom whichever being used on HTML

        const methodOne = function () {
            .....
        };

        // this is an internal method which is called within controller by other methods

        const methodTwo = function () {
            angular.copy(defaultSignupForm, vm.signupFormdata); //reset the form
            .....
        };

        const methodThree = function () {
            methodtwo();
            ...
        };

        var openModal = (arg1, agr2) =>  {
            let modalInstance = $uibModal.open({
                templateUrl: 'app/views/templates/view_data.html',
                controller: 'AppEnrollController',
                controllerAs: '$ctrl',
                bindToController: true,
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    parent: function() {
                        return {
                            arg1,
                            agr2
                        };
                    }
                }
            });
            modalInstance.result.then(function(result) { ... });
        };

        // Error handler method

        var errorHandler = function(err) {
            // $log.error('ErrorHandler: ', err);
            vm.errorName = (err && err.data.name) ? err.data.name : "Error";
            vm.errorMessage = (err && err.data.message) ? err.data.message : "Something went wrong. Please try again";
        };

        const finalTask = () => {
            console.log('OK');
        }

        //use chained way of any service method like below

        serviceName.methodName().then(successHandler).catch(errorHandler).finally(finalTask);

        angular.extend(vm, {
            methodOne: methodOne,
            openModal: openModal,
            methodThree: methodThree
        });
    });

})();
```

3) filter and constants

- *.filter* signature will be as below

```
    .filter(<WHAT>_FILTER, function (DI) {
        return function(input, arg) {
            var output = filterToApply(input,arg);
            return output;
        };
    });

```

- *.constant* will always be in UPPERCASE

// in object style
```
     .constant('USER_TYPE', {
                KEY1 :'value1',
                KEY2: 'value2'
     });
```

OR in array style

```
     .constant ('TILE_COLOR', [
         '#aabbcc',
         '#112233'
     ]);
```

OR Array of Objects
```
    .constant('TOP_NAVBAR', [{
            "caption": "Dashboard",
            "link": "dashboard"
        }, {
            "caption": "Applications",
            "link": "application"
        }];
```

- use `ng-bind` instead of interpolation `{{ }}`if the value is not changing.
you can use filter and condition within ng-bind as below

<td style="width:5%" ng-bind="(vm.policy === '') ? 'None' : vm.policy"></td>
<span ng-bind="(vm.policy | SOME_FILTER)"></span>

- use strict equality operator  `===` or `!==`
- use string with double quotes "string"
- variable name will be either camleCased or under_scored but be consistent and meaningful over a single file.
- keep space between interpolation and varaible {{ vm.likeThis }}
- When looping through items in an object use `object.hasOwnProperty`
```
        for(key in object) {
           if(object.hasOwnProperty(key) {
              ...then do something...
           }
        }
```

- to debug the data on HTML use `<pre> {{ controllerVariable | json }}</pre>`


4) Services and factories:

- Services are instantiated with the new keyword, use this for public methods and variables. Since these are so similar to factories, use a factory instead for consistency.
// service
angular
    .module('app')
    .service('logger', logger);

function logger() {
  this.logError = function(msg) {
    /* */
  };
}
// factory
angular
    .module('app')
    .factory('logger', logger);

function logger() {
    return {
        logError: function(msg) {
          /* */
        }
   };
}

- Return a Promise from Data Calls:
- When calling a data service that returns a promise such as $http, return a promise in your calling function too.
- You can chain the promises together and take further action after the data call completes and resolves or rejects the promise.

/**
 * recommended
 * Using function declarations
 * and accessible members up top.
 */

    angular
        .module('app.core')
        .factory('dataService', dataService);

- Do Manual Annotating for Dependency Injection or use ng-annonate
    dataService.$inject = ['$http', '$q', logger']; 

    function dataService($http, $q, logger) {
        var isPrimed = false;
        var primePromise;
        var service = {
            getAvengersCast: getAvengersCast,
            getAvengerCount: getAvengerCount,
            getAvengers: getAvengers,
            ready: ready
        };
    return service;
    //////////// define later /////////////
    function getAvengers() {
        // implementation details go here
    }

    function getAvengerCount() {
        // implementation details go here
    }

    function getAvengersCast() {
        // implementation details go here
    }

    function prime() {
        // implementation details go here
    }

    function ready(nextPromises) {
        // implementation details go here
    }
    function getAvengers() {
        return $http.get('/api/maa')
            .then(getAvengersComplete)
            .catch(getAvengersFailed);

        function getAvengersComplete(response) {
            return response.data.results;
        }

        function getAvengersFailed(error) {
            logger.error('XHR Failed for getAvengers.' + error.data);
        }
    }
}

5) Use ng-annotate 
for Gulp or Grunt and comment functions that need automated dependency injection using /* @ngInject */

angular
    .module('app')
    .controller('AvengersController', AvengersController);

/* @ngInject */
function AvengersController(storage, avengerService) { ..}

- also can be used in routing

// Using @ngInject annotations
function config($routeProvider) {
    $routeProvider
        .when('/avengers', {
            templateUrl: 'avengers.html',
            controller: 'AvengersController',
            controllerAs: 'vm',
            resolve: { /* @ngInject */
                moviesPrepService: function(movieService) {
                    return movieService.getMovies();
                }
            }
        });
}


6)Restrict to Elements and Attributes:

- When creating a directive that makes sense as a stand-alone element, allow restrict E (custom element) and optionally restrict A (custom attribute). Generally, if it could be its own control, E is appropriate. General guideline is allow EA but lean towards implementing as an element when it's stand-alone and as an attribute when it enhances its existing DOM element.
<my-calendar-range></my-calendar-range>
<div my-calendar-range></div>


        angular
            .module('app.widgets')
            .directive('myCalendarRange', myCalendarRange);

        function myCalendarRange() {
            var directive = {
                link: link,
                templateUrl: '/template/is/located/here.html',
                restrict: 'EA'
            };
            return directive;

            function link(scope, element, attrs) {
              /* */
            }
        }



7) Naming Guidelines

Use consistent names for all components following a pattern that describes the component's feature then (optionally) its type. My recommended pattern is *feature.type.js*. 

There are 2 names for most assets:

the file name (avengers.controller.js)
the registered component name with Angular (AvengersController)


PascalCaseConroller name
camleCaseSerive name
directiveDoesThis Name 


When I find my structure is not feeling comfortable, I go back and revisit these *LIFT* guidelines

Locating our code is easy
Identify code at a glance
Flat structure as long as we can
Try to stay DRY (Don’t Repeat Yourself) or T-DRY

/*
* avoid
* Alternative folders-by-type.
* I recommend "folders-by-feature", instead.
*/

websocket topic id in uppercase = TOPIC_FORWHAT eg; TOPIC_DBCOUNT
topic name prefixed with `topic` => topic_<forwhat> eg. topic_usage, `topic_dbcount`
channel name prefixed with `channel` => channel_<forwhat> eg. `channel_dbcount`