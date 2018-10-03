
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
----

## HTML
- use array notation of property of object in html

```js
{{user.firstName}}
``` 
will give the error squigglies

```js
{{user['fisrtName']}}
``` 

is the proper way


- always make property public ( default visibility is public) if it is being used in html

- use built-in structuctural directive 

```html
<ng-template ngFor let-app [ngForOf]="userDetails.roles">
<div> {{app.name}}</div>
</ng-template>
```

below is the similar can be done in shorter way

```html
<div *ngFor="let app for userDetail['roles']">{{app.name}}</div>
```

- use `[InnerHTML]` instead of interploation `{{}}` when value is not changing in HTML 

<p [InnerHTML]="''.concat(user.firstName, ' ', user.lastName)"></p>

- error undefiend supress method
    use ` firstName?.errors?.required `


