
# Angular 4 Style Guide

### color.service.ts

```js
import {Color, ResponseData } from './shared/interface/';

@Injectable
class ColorService {

    contructor(private httpClient: HttpClient) { }
    getColor() {
       this.httpClient.get<ColorResponse>(`assets/data/under-attacks.json`).map((res) => {
            res.items;
        });
    }

    getColorById() {
        const params = new HttpParams()
        .set('first', 'value')
        .set('second', 'value');
        .set()
         this.httpClient.getColorById<ColorResponse>(`assets/data/under-attacks.json`, {param} ).map((res) => {
            res.items;
        });
    }
}

// if it is single object
interface ColorResponse extends ResponseData {
  item : Color;
}

// if it is array of objects
interface ColorArrayResponse extends ResponseData {
    items: Color[];
}

```

### color.componenet.ts

```js
import {Color } from './shared/interface/';

@Componenet

class ColorComponent extends OnInit {
    public color: Color;
    constructor ( private colorService: ColorService) {}
    this.colorService.getColor().subscribe( (data) => {
        // do some action on data and return
        this.color = data;
    }, (err) => {
        // handle error
    });
}
```
