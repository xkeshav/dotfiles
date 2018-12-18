# Upgrading application from Angular 4 to Angular 5

* Old version _v 4.4.2_
* New version _v 5.5.12_

> ng -v

---
```

Angular CLI: 1.6.7
Node: 8.9.2
OS: darwin x64
Angular: 4.4.6
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router, tsc-wrapped

@angular/cli: 1.6.7
@angular-devkit/build-optimizer: 0.0.42
@angular-devkit/core: 0.0.29
@angular-devkit/schematics: 0.0.52
@ngtools/json-schema: 1.1.0
@ngtools/webpack: 1.9.7
@schematics/angular: 0.1.17
typescript: 2.3.4
webpack: 3.10.0

rxjs 5.1.0

```

---

first get help from https://update.angular.io/ to get detail of all necessary changes, choose advance option for application complexity.

And do the suggested changes if you have implemented those modules/options in your current application. Most important are followings.

* Remove **@angular/http** and replace with **@angular/common/http**

Replace

```ts
import { HttpModule } from '@angular/http';

imports: {
     HttpModule,
}
```

with

```ts
import { HttpClientModule } from '@angular/common/http';
imports: {
     HttpClientModule,
}
```

* Change `<template>` with `<ng-template>` .

2.  Now install angular 5 compatible libraries with below command

`npm install @angular/{animations,common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router}@^5.2.0 typescript@2.4.2 rxjs@^5.5.2`

`npm install typescript@2.4.2 --save-exact`

That's ALL.

Note: for pre-caution you can remove _node_modules_ directory and _package-lock.json_ file and run

    -   npm cache clean --force
    -   npm install
    -   Repeat step 2

* You can check all version with `ng -v`

```
    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.7.3
Node: 8.9.2
OS: darwin x64
Angular: 5.2.11
... animations, common, compiler, compiler-cli, core, forms
... http, platform-browser, platform-browser-dynamic
... platform-server, router

@angular/cli: 1.7.3
@angular/language-service: 4.4.6
@angular-devkit/build-optimizer: 0.3.2
@angular-devkit/core: 0.3.2
@angular-devkit/schematics: 0.3.2
@ngtools/json-schema: 1.2.0
@ngtools/webpack: 1.10.2
@schematics/angular: 0.3.2
@schematics/package-update: 0.3.2
typescript: 2.4.2
webpack: 3.11.0

rxjs 5.5.12
```

---

now run `ng serve` and it throws error in below line

```ts
export class GlobalErrorHandler extends ErrorHandler {
   constructor(private injector: Injector) {
   super(true); << here
}
```

So remove argument from `ErrorHandler` constructor change `super(true)` => to `super()`

again run `ng serve` and now it throws these errors

```bash
WARNING in ./node_modules/angular-io-slimscroll/node_modules/@angular/core/@angular/core.es5.js
5659:15-36 Critical dependency: the request of a dependency is an expression
```

To fix this:

reinstall latest version of the faulty library, in my case it's `angular-io-slimscroll`,dont forget to check angular 5 compataible version for the library as many of the libraries has been developed with compatible of latest angular version (v6 or v7).

`npm uninstall angular-io-slimscroll`

`npm install angular-io-slimscroll`

again run `ng serve`

it will throw error for Missing **\*.ts** files for some _node_modules_

```bash
    ERROR in ../node_modules/ng-multiselect-dropdown/**/*.ts

    index.ts is missing from the TypeScript compilation. Please make sure it is in your tsconfig via the 'files' or 'include' property.
```

you can see the list of similar errors for different 3rd party libraries which you are currently using

To fix this:

first note all _node_modules_ packages which throws this kind of error

now open _.angular-cli.json_ and add below line inside `defaults` property

```json
 "defaults": {
        "build": { "preserveSymlinks": true }
 }
```

also open _tsconfig.app.json_ add those library inside `include` property

```json
         "include": [
        "./**/*.ts",
        "../node_modules/ng-multiselect-dropdown/**/*.ts",
        "../node_modules/ngx-trim-directive/**/*.ts",
        "../node_modules/squeezebox/**/*.ts"
    ]
```

Now run `ng serve`

**All works fine.**

---

Note: in angular v5 you can run `ng-serve --aot` also, which was introduced in this version

also run `ng build --aot` and check and fix the errors if any as they are very descriptive.

additionally you can do the changes in _tsconfig.json_

```json
"angularCompilerOptions": {
     "preserveWhitespaces": false
}
```

* you can update angular-cli version also; both globally and locally to **v 1.7.2**

# REFACTOR CODE

* change individual rxjs operators into one import line from `'rxjs/operators'` and use `.pipe()`
* Rename below operators ( although old is working but will be deprecated soon)
  * `catch` --> `catchError`
  * `do` --> `tap`
  * `finally` --> `finalize`
* `Observable.of()` -> `of`

## Example

old code in angular 4

```
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

checkAccess() {
    return this.initService
            .checkAccess()
            .do(() => // do something )
            .take(1)
            .map((_) => // some manipulation)
            .catch((error: HttpErrorResponse) => {
                return Observable.of(false);
            })
            .finally( () => //complete something)

}
```

refactored code in angular 5

```
import { finalize, map, take, tap  } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

checkAccess() {
    return this.initService.checkAccess()
    .pipe(
            tap( () => // do something)
            take(1),
            map((_) => // some manipulation ),
            catchError((error: HttpErrorResponse) => of(false) })
            finalize( () => // complete something )
    );
}
```
