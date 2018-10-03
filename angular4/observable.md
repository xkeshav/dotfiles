you can create type of observable by using 

> Observable.of(<whatever>);


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
    