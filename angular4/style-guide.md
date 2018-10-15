# Angular 4 Style Guide

### interfaces.ts

```js
export interface ResponseData {
    code: number;
    message: string;
    status: string;
}

export interface Color {
    id: string;
    code: string;
    name: string;
    value: number;
}
```

### color.service.ts

```js
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ResponseData, Color } from './interfaces';

@Injectable()
class ColorService {

    private headers: HttpHeaders;
    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({
            'Content-type': 'application/custom.json'
        });
    }

    getColors() {
        return this.httpClient
            .get<ColorArrayResponse>(`${BASE_URL}/color`, { headers: this.headers }).map((res) => {
                return res.items;
            });
    }

    getColorById(id) {
        const params = new HttpParams().set('id', id);
        // url would be http://end/point/color?id=<id>
        return this.httpClient
            .get<ColorResponse>(`${BASE_URL}/color/`, { headers: this.headers, params }).map((res) => {
                return res.item;
        });
    }
    // @param formdata = { id: '', code: '00ff00',  name: 'red', value: 25 }
    updateColor(formdata) {
        return this.httpClient
            .post<ColorResponse>(`${BASE_URL}/color/`, formdata, { headers: this.headers }).map((res) => {
                return res.item;
            });
    }

}

interface ColorArrayResponse extends ResponseData {
    items: Color[];
}

interface ColorResponse extends ResponseData {
    item: Color;
}
```

### color.component.ts

```js
import { Component, OnInit } from '@angular/core';

import { Color } from './shared/interface/';

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html'
}
class ColorComponent extends OnInit {

    public colors: Color[];

    constructor ( private colorService: ColorService) {}

    this.colorService.getColors().subscribe( (data) => {
        // do some action on data and return
        this.colors = data;
    }, (err) => {
        // handle error
    });
}
```

---

## HTML

*   use array notation of property of object in html

```js
{
    {
        user.firstName;
    }
}
```

will give the error squigglies

```js
{
    {
        user["fisrtName"];
    }
}
```

is the proper way

*   always make property public ( default visibility is public) if it is being used in html

*   use built-in structuctural directive

```html
<ng-template ngFor let-app [ngForOf]="userDetails.roles">
<div> {{app.name}}</div>
</ng-template>
```

below is the similar can be done in shorter way

```html
<div *ngFor="let app for userDetail['roles']">{{app.name}}</div>
```

*   use `[InnerHTML]` instead of interploation `{{}}` when value is not changing in HTML

<p [InnerHTML]="''.concat(user.firstName, ' ', user.lastName)"></p>

*   error undefiend supress method
    use `firstName?.errors?.required`

---

# Component

*   must have `ngOninit()` and `constructor()`

*   `constructor()` have all attribute initialization place mostly Boolean

*   all services initialization with `private` keyword

*   Do not use _this_ keyword inside `constructor()` for the services but in `ngOninit` we need to call with _this_ .

for eg. `this.authService.methodCall()`

*   `ngOnInit()` have the methods which need to call as soon as we arrive on this page or call this component.

# Directive

must start with some namespace

*   extends lifecycle interfaces such as `OnDestroy` if using lifecycle methods `ngOnDestroy()` within the component,

Note: Although it does not throw any error if you use the lifecycle methods but did not extend the respective interface. And if you implements these interface than must call their method with empty body.

for eg.

    class Shape {
            ngOnInit() {
                //this will work
            }
            ngOnDestroy() {
                // unsubscribe
            }
        }

But following is more correct and valid

    class Shape implements OnInit, OnDestroy {
            ngOnInit() {
                    // initialize varaibles and call methods
                }
                ngOnDestroy() {
                    // unsubscribe
                }
    }

additionaly you can set typing of these methods such as `ngOnDestroy(): void`

# Unsubscription of Observables

If you unsubscribe a subscription; make sure it has been initialized

    import { Subscription } from 'rxjs/Subscription';
    class Beta implements OnDestroy () {
       private alpha$: Subscription;
         otherMethod() {
             this.alpha$ = service.method().subscribe( () => );
        }
        ngOnDestroy(){
             this.alpha$.unsubscribe();
         }
    }

will throw error of memory leak

to fix this, initialize with this line

    private alpha$: Subscription = new Subscription();

---

*   Reduce ternary method with or conditions

    const val = someArray[0] ? someArray[0] : '';

can we re-written as

    const val = someArray[0] || '';

*   Follow same convention throughout the file for typings

`Array<User>` or `User[]`

*   User _Partial_ keyword insead of optional binding `?`

    *   Partial<Array<string>>
    *   Partial<UserList[]>

-   Assign same alias for common service thorughtout all files of project.

          constructor(
              private auth: AuthenticationService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private modalService: BsModalService

          ) {}

## ngOnChanges signature

this will be used whenever there is input binding with component i.e. @Input()

standard format of `ngOnChanges()`

either use `for...of`

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            if (propName === 'whatever') {
                const change: SimpleChange = changes[propName];
            }
        }
    }

or when use `for...in` wrap it within if condition.

    for (const propName in changes) {
        if (changes.hasOwnProperty(propName)) {
            if (propName === 'whatever') {
                const change: SimpleChange = changes[propName];
            }
        }
    }

*   if there are object as input property always check equality with `JSON.stringify()`


        if (propName === 'inputData') {
                const change: SimpleChange = changes[propName];
                if (
                        change.currentValue &&
                        JSON.stringify(change.currentValue) !== JSON.stringify(change.previousValue)
                    ) {
                        console.log('iinputData changed to==>', change.currentValue);
                        thius.doWhatever(change.currentValue);
                    }
            }

some object method are not defined in _.d.ts_ file for eg. `Object.entries()``

so use this way `(<any>Object).entries(obj)`

*   Modal component file and class always ends with _modal_

file name: _instance-modal.ts_

        @Component({
        selector: 'app-instance-modal',
        templateUrl: './instance-modal.component.html'
        })

        export class InstanceModalComponent implements OnInit {}

*   put space after comment starts

//TODO: need to refactor X
// TODO: need to refactor ✓

avoid blacklisted import issue

    import { Subscription, Subject } from 'rxjs'; X

//instead of that write

        import { Subscription } from 'rxjs/Subscription';
        import { Subject } from 'rxjs/Subject';

Do not rename the Input

        @Input('data') processData: Process[]; X
        // in HTML
        <app-element [data]="processItem" ></app-element>

correct one is

        @Input() processData: Process[]; ✓
        // in HTML
        <app-element [processData]="processItem" ></app-element>

*   Always use `const` which is not going to re-assigned.

*   Do not use shadow variables.

    function (data, item) {
    data.map( (item) => item.toUpperCase());
    // here item is shadowed varaible
    }
