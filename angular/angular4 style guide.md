
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
    
    public color: Color[]; 
    
    constructor ( private colorService: ColorService) {}
    
    this.colorService.getColors().subscribe( (data) => {
        // do some action on data and return
        this.color = data;
    }, (err) => {
        // handle error
    });
}
```
