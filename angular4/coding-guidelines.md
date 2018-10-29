# Separate modules

* Separate default modules and custom modules with newline, first default modules ( packages ) than custom modules (components)

## sample module

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
import { WorldRoutes } from './earth/world.routing';
import { WorldComponent } from './earth/world.component';
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

1.  default modules are the one which do not start with `./`,
2.  custom module always starts with `./` and always be in TitleCase (recommeneded)
3.  When you use _auto import_ feature of vc code editor then it import that modules at the end of the list of imported modules, so change their position after getting inserted.
4.  sometime IDE ( vs code ) import the relative path for any package ; so check that too and change.
5.  if there are multiple import items, separate with `,` and space, put space before and after `{` `}` . If you are using `prettier` aor any other linter plugin than it will be be done automatically.
6.  remove unused modules. in `vs code editor` unused modules will automatically grey out you can remove that.
7.  adding extension of imported modules are unnecessary. ( it is by default consider as .ts )
8.  alternative syntax of import statement also works but vary with the version of that library.

for eg, older RxJs version you have to write each operator separately

```ts
import "rxjs/add/operator/finally";
import "rxjs/add/operator/add";
import "rxjs/add/operator/map";
```

whereas in newer RxJs version, it has been combined into one line

`import { map, add, finally } from 'rxjs/operators`;

9.  You can combined modules if they are extends from same location ( note: you need to check whether the export variable exist or not)

for eg.

```ts
import { AbstractControl, FormControl } from "@angular/forms";
import { ValidationErrors } from "@angular/forms/src/directives/validators";
```

can be combined as following.

```ts
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
```

or

following import statements

```ts
import { CanLoad } from "@angular/router/src/interfaces";
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot
} from "@angular/router";
```

can be re-written as

```ts
import {
  CanLoad,
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot
} from "@angular/router";
```

or

```ts
import { BsModalService } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
```

can be re-written

```
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
```

---

Here is the key point to remember while developing diffrent decorators

1.  When we write **`@NgModule`** Decorator then there are chances that `RouterModule` and `CommonModule` modules will be there

## earth.module.ts

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

Note: adding duplicated modules in `import` metadata in NgModule will not throw any error so check carefully and remove duplicate modules.

2.  When we write **`@Component`** Decorator then there will be some life cycle interfaces and would be helping classes/services/components/interfaces/errors/validators

## earth.component.ts

```ts
import { Component, OnInit, Optional, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
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
    providers: [DatePipe] // in case of any Pipe which we are using within this component;
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
        this.buildForm(); // build reactive form if there is no @Input decorators or not any requirement to assign values to the form
        this.isPending = false;
        this.isLoading = false;
        this.currentDate = new Date();
    }

    ngOnInit() {
        this.formattedDate = this.datePipe.transform( this.currentDate, 'medium'); // do not use `this` when calling service in the constructor
        this.getElementList(); // call default method which need to be call as soon as we each on this component
    }

     private buildForm() {
         this.elementForm = this.fb.group({
           name: ['', Validators.required],
           age: [null, Validator.required]
           ]
        });
     }

     ngOnDestroy() {
       // unsubscribe observables and clear interval here
     }

    }
```

Note: There are no standard defined for the order of custom modules, you can import custom modules in any order but it is recommened to categorized by type or by directory.

I personally prefer first - which is common (shared) then componets and then service files. generally I follow below order

    - interfaces
    - constants
    - Guards
    - Resolver
    - Error handlers
    - Custom validators
    - Pipes
     - model class
     - Modules
     - Components (child and modal),
     - Directives (if any)
     - Routing file (if any)
     - Services

for eg.

```ts
import { ResponseData } from "../shared/interfaces"; // custom interfaces
import { AppConstants } from "../../app.constants"; // constants
import { AuthGuard } from "../guards"; // guards
import { LinkValidityResolver } from "./link-validity-resolver"; // resolvers
import { AuthFail, BadInput } from "../../shared/errors"; // error handler
import {
  ValidatePassword,
  ValidateEmail,
  noWhitespaceValidator
} from "../../app.validators"; //custom validators
import { User } from "./user.model"; // custom class'
import { SharedModule } from "../shared/shared.module"; // shared modules ( common other modules which have pipes and libraries )
import { LoginComponent } from "./login/login.component"; // components
import { RegisterComponent } from "./register/register.component"; // other component in the order of feature ( register after login)
import { AuthenticationRoutes } from "./authentication.routing"; // routing component
import { UserService } from "../user/user.service"; // specific service
import { UtilsService } from "../shared/utils.service"; // common service
```

Note: above is the maximum kinds of imports, generally it does not have much variations of components. so you can set by directory locations as well

Note: we can add newline in custom modules too based on category or type when there are a lot of imports.

for eg.

```ts
import { SharedModule } from "../shared/shared.module";

import { StepOneComponent } from "./step/one.component";
import { StepTwoComponent } from "./step/two.component";
import { StepThreeComponent } from "./step/three.component";

import { StepService } from "./step/step.service";
import { StepRoutes } from "./step/step.routing";
```

or

```ts
import { SharedModule } from "../shared/shared.module";
import { EarthRoutes } from "./earth.routing";
import { EarthService } from "./earth.service";

import { AirComponent } from "./earth/air.component";
import { FireComponent } from "./earth/fire.component";
import { SkyComponent } from "./earth/sky.component";
import { WaterComponent } from "./earth/water.component";
```

3.  When we write **`@Injectable`** Decorator ( for service files) then there would be Injectable and Http modules and Observables and custom Interfaces and other services which bing used

## earth.servivce.ts

```ts
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { ResponseData, Continent } from "../shared/interfaces";
import { UtilsService } from "../shared/utils/utils.service";

export class EarthService {
  private announcePlanetName = new Subject<any>();
  constructor(private httpClient: HttpClient, private utils: UtilsService) {}

  getContinentList() {
    return this.httpClient
      .get<ContinentResponse>(`/earth/continent`, { withCredentials: true })
      .map((res) => res.item);
  }
}

interface ContinentResponse extends ResponseData {
  item: Continent;
}
```

4.  Routing files have only export `Routes` typing Object

## earth.routing.ts

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
