# Separate modules

- Separate default modules and custom modules with newline, first default modules ( packages ) than custom modules (components)


    **Note:** default modules are the one which do not start with `./`, although you can write the relative path,
    whereas custom module always starts with `./`

## sample code-block

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // external libraries
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';
import * as moment from 'moment';
// add new line
import { SharedModule } from '../shared/shared.module';
import { WorldComponent } from './earth/world.component';
import { WorldRoutes } from './earth/world.routing';
import { WorldService } from '../earth/world.service';
//add new line after end oif all import statements and then start component
@NgModule({
    imports:[],
    providers:[],
    declarations:[]
});

export class WorldModule {}
```

Note:

1. When you use _auto import_ feature of vc code editor then it import that modules at the end of the list of imported modules, so change their position after getting inserted.
2. sometime IDE ( vs code ) import the relative path for any package ; so check that too.
3. if there are multiple import items, separate with , and space, put space before and after `{` `}` , If you are using `prettier` aur any other linter than it could be done automatically.
4. remove unused modules ; in `vs code editor` it will automatically grey out you can remove that.
5. adding extension of imported modules are unnecessary. ( it is by default taken as .ts )
6. create custom modules always in TitleCase
7. alternative syntax of import statement also works but vary with the version of that library.

for eg, older RxJs version you have to write each operator separately

```ts
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/add';
import 'rxjs/add/operator/map';
```

whereas in newer RxJs version, it has been combined into one line

`import { map, add, finally } from 'rxjs/operators`;

8. You can combined modules if they are extends from same location ( note: you need to check whether the export variable exist or not)

for eg.

```ts
import { AbstractControl, FormControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
```

can be combined as following.

```ts
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
```

another example :

following import statements

```ts
import { CanLoad } from '@angular/router/src/interfaces';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
```

can be re-written as

```ts
import {
  CanLoad,
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
```

_Side note_: There are very less chances when `NgModule` and `Component` will be imported together in one file ( which was written on sample code-block)

Here is the key point to remember:

- When we import **`NgModule`** then there are chances that `RouterModule` and `CommonModule` and other main modules will be there

## Sample Module

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgPipesModule } from 'ngx-pipes';

import { SharedModule } from '../shared/shared.module';
import { EarthComponent } from './earth.component';
import { EarthRoutes } from './earth.routing';
import { EarthService } from './earth.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EarthRoutes),
        SharedModule,
        NgPipesModule,
        ModalModule.forRoot()
    ],
    exports: [AirComponent],
    declarations: [EarthComponent],
    providers: [EarthService]
});

export class EarthModule {}
```

Note: adding duplicated modules in `import` metadata in NgModule will not throw any error.

- When we import **`Component`** then there will be some life cycle interfaces and helping classes/services/components

## Sample Component

```ts
import { Component, OnInit, Optional, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms'; // add only necessary modules
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { EarthService } from '../earth.service';
import { Element } from '../../shared/interfaces';

 @Component({
    selector: 'app-earth',
    templateUrl: './earth.component.html',
    styleUrls: ['./earth.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe] // this is in case of any Pipe which is using in the component;
 });

 class EarthComponent implements OnInit, OnDestroy {

      private isPending:boolean;
      isLoading: boolean;
      currentDate: Date;
      ElementForm: FormGroup;

    constructor(
        private datePipe: DatePipe,
        private service: EarthService,
        private fb: FormBuilder,
        @Optional() public bsModalRef: BsModalRef
    ) {
        // initialize default value of variables in constructor
        this.buildForm(); // build empty form here if there is no @Input parameters or not any requirement to assign values to the form
        this.isPending = false;
        this.isLoading = false;
        this.currentDate = new Date();
    }

    ngOnInit() {
        this.formattedDate = this.datePipe.transform( this.currentDate, 'medium'); // do not use `this` when calling service in the constructor
        this.getElementList(); // call default method which need to be cal as soon as we each on this component
    }

     private buildForm() {
         this.elementForm = this.fb.group({
           name: ['', Validators.required],
           age: [null, Validator.required]
           ]
        });
     }

}
```

9. As There are no standard set for the order of custom modules , you can import in any order but you can categorized by type or by directory

I personally prefer first those which is common and used prior to component for eg.

     - Guards,
     - Modules,
     - Components (child and inter related),
     - Directives (if have any)
     - Routing file (if any)
     - Services

place below files together either starting of custom modules or in the ending ( as these not going to change or update often)

    - interfaces
    - Resolver
    - classes
    - error component
    - custom validators
    - constant
    - pipes

for eg.

```ts
import { AuthGuard } from '../guards'; // guards
import { AuthFail, BadInput } from '../../shared/errors'; // error objects
import { AppConstants } from '../../app.constants'; // constants
import { ValidatePassword, ValidateEmail, noWhitespaceValidator } from '../../app.validators'; //custom validators
import { ResponseData } from '../shared/interfaces'; // custom interfaces
import { User } from './user.model'; // custom class'
import { SharedModule } from '../shared/shared.module'; // shared modules ( common other modules which have pipes and libraries )
import { LoginComponent } from './login/login.component'; // components
import { RegisterComponent } from './register/register.component'; // other component in the order of feature ( register after login)
import { LinkValidityResolver } from './link-validity-resolver'; // some resolver files
import { AuthenticationRoutes } from './authentication.routing'; // routing component
import { UserService } from '../user/user.service'; // specific service
import { UtilsService } from '../shared/utils.service'; // common service
```

you can insert newline to define every custom module and it's component and service together

Note: above is the maximum kinds of imports, generally it does not have much variations of components. so you can set by directory locations as well

for eg.

```ts
import { SharedModule } from '../shared/shared.module';

import { StepOneComponent } from './step/one.component';
import { StepTwoComponent } from './step/two.component';
import { StepThreeComponent } from './step/three.component';

import { StepService } from './step/step.service';
import { StepRoutes } from './step/step.routing';
```

or module first routing then service then all components as component can increase

```ts
import { SharedModule } from '../shared/shared.module';
import { EarthRoutes } from './earth.routing';
import { EarthService } from './earth.service';

import { AirComponent } from './earth/air.component';
import { FireComponent } from './earth/fire.component';
import { SkyComponent } from './earth/sky.component';
import { WaterComponent } from './earth/water.component';
```

## Sample Service class

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ResponseData } from '../shared/interfaces';

export class EarthService {}
```

## Sample Routing File

```ts
import { Routes } from '@angular/router';

import { EarthComponent } from './earth/earth.component';
import { AirComponent } from './earth/air.component';
import { FireComponent } from './earth/fire.component';
import { SkyComponent } from './earth/sky.component';
import { AuthGuard, RoleGuard } from '../../guards';

export const EarthRoutes: Routes = [
  {
    path: '',
    component: EarthComponent,
    data: {
      breadcrumb: '',
      AuthRequired: true,
      authorizedRoles: ['ROLE_SUPER_ADMIN', 'ROLE_OTHER']
    },
    canActivateChild: [RoleGuard, AuthGuard],
    children: [
            {
                path: 'air',
                component: AirComponent,
                data: {
                    breadcrumb: 'free',
                    AuthRequired: true,
                }
            }
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '**', component: AirComponent }
    ]
  }
];
```
