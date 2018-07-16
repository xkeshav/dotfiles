you can create type of observable by using **.of** and **.from** operators

```
import {Observable} from 'rxjs';

Observable.of(object); // or 
Observable.from(array);

```



```
let words = ['coding blast', 'badword', 'coding', 'blast'];

let source = Observable.create(observer => {
    for (let word of words) {
        if (word === 'badword') {
            observer.error('Bad word!');
        }
        observer.next(word);
    }
    observer.complete();
});
```


- Error and Finally Block in Observable.

```
        methodCall(login: HTMLInputElement) {
                this.formSubmitted = true;
                this.authService.login(login.value)
                    .finally(() => { this.formSubmitted = false; })
                    .subscribe(
                        (user) => {
                           // success message
                        }
                        , (err) => {
                            throw err;
                        }
                    }
                    );
        }
```
    
