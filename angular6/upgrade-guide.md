# Upgrading application from Angular 5 to Angular 6

-   Old version _v 5.5.12_
-   New version _v 6.1.10_

first get help from https://update.angular.io/ to get detail of all necessary changes, choose advance option for application complexity.

Now let’s go command by command. Before that make sure NodeJS version is 8.9+ if not update it.

`1. npm uninstall -g angular-cli`
Don’t forget to put “sudo” in front of this command if you are on unix-like machine.

`2. npm cache verify`
Verify the contents of the cache folder, garbage collecting any unneeded data, and verifying the integrity of the cache index and all cached data.

`3. npm install -g @angular/cli@6.1`
Note: Don't forget to mention version

`4. rm -rf node_modules` and delete `package-lock.json`
Make sure you are in same folder as node_modules of your project. You can delete them manually or with help of this command. This will remove all fo your local dependencies from node_modules.

`5. npm uninstall --save-dev angular-cli`
This will remove old angular-cli from your package.json.

`6. npm install --save-dev @angular/cli@l6.1`
This will install mentioned version of angular cli as development dependency.

`7. ng update @angular/cli`
This command will update your local configuration files to the latest versions. It will also remove old “angular-cli.json” and move configuration from this file to new “angular.json”. It will update also `tslint` , `tsconfig` and `karma` file.

`8. ng update @angular/core@6.1`
Update angular core related packages to the newest versions. Packages like @angular/common, @angular/http, @angular/router and so on..

Note: If you faced incompatible peer dependency issues when run the above command to update, then use following command, `ng update @angular/core@6.1 --next --force`

`9. npm install -g rxjs-tslint`
TSLint rules for rxjs which is managing RxJS Imports with TSLint.

`10. rxjs-5-to-6-migrate -p src/tsconfig.app.json`
Using the current set of rules allows you to automatically migrate your project which uses RxJS 5 to RxJS 6.

Note: if you have faced Typescript error, then install typescript globally by `npm install -g typescript`

`11. npm install rxjs-compat --save-dev`
New changes in rxjs will probably break your code, with installation of this package you will provide backward-compatibility of RxJS.

Note: Once all of your dependencies have updated to RxJS 6, remove rxjs-compat as it increases bundle size. please see this [RxJS Upgrade Guide](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md) for more info. `npm uninstall rxjs-compat`

`12. npm install`

Now, if you faced incompatible dependency issues then uninstall the package and reinstall with new ones.

That's ALL.

-   You can check all version with `ng -v`
```
   _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 6.1.5
Node: 8.12.0
OS: darwin x64
Angular: 6.1.10
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... platform-server, router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.7.5
@angular-devkit/build-angular     0.7.5
@angular-devkit/build-optimizer   0.7.5
@angular-devkit/build-webpack     0.7.5
@angular-devkit/core              0.7.5
@angular-devkit/schematics        0.7.5
@angular/cli                      6.1.5
@ngtools/webpack                  6.1.5
@schematics/angular               0.7.5
@schematics/update                0.7.5
rxjs                              6.3.3
typescript                        2.9.2
webpack                           4.9.2

```
Now run `ng serve`

**All works fine.**
# REFACTOR CODE

-   change individual rxjs operators into one import line from `'rxjs/operators'` and use `.pipe()`
-   Rename below operators ( although old is working but will be deprecated soon)
    -   `catch` --> `catchError`
    -   `do` --> `tap`
    -   `finally` --> `finalize`
-   `Observable.of()` -> `of`

-   RxJs 6 changes
    - Changes to import paths
        The recommendation for TypeScript developers is to use `rxjs-tslint` to refactor import paths.

    - The following rules have been designed by the RxJS team to help JavaScript developers refactor import paths:

        -   rxjs: Contains creation methods, types, schedulers, and utilities.
        ```import { Observable, Subject, pipe, of, from, interval, merge, fromEvent } from "rxjs";```
        -   rxjs/operators: Contains all pipeable operators.
        ```import { map, filter, scan } from "rxjs/operators";```
        -   rxjs/webSocket: Contains the web socket subject implementation.
        ```import { webSocket } from "rxjs/webSocket";```
    - Uses Functions instead of Classes
        - Functions have replaced classes that operate on observables. All observable classes have been removed.
        For example:
            ```
            // removed
            TimeObservable.create(0, 1000)

            // use instead

            timer(0,1000)
            ```
