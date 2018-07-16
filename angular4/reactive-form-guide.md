below is sample reactive form snippet ; use below class and semantics

```js
<form [formGroup]="loginForm" novalidate class="form" (ngSubmit)="doLogin()">
<div class="row">
    <div class="form-group col-md-6">
        <label class="form__label" for="user_name">Username</label>
        <input type="text" formControlName="username" class="form-control form__input" name="username" id="user_name" required />
        <div class="form__error fl">
            <div class="text-danger" *ngIf="loginForm.controls['username'].touched && !loginForm.controls['username'].valid">
                <span *ngIf="loginForm.controls['username']?.errors?.required">Please enter username.</span>
            </div>
        </div>
    </div>
    <div class="form-group col-md-6">
        <label class="form__label" for="password">password</label>
        <input type="password" formControlName="password" class="form-control form__input" name="password" id="password" required />
        <div class="form__error fl">
            <div class="text-danger" *ngIf="loginForm.controls['password'].touched && !loginForm.controls['password'].valid">
                <span *ngIf="loginForm.controls['password']?.errors?.required">Please enter password.</span>
            </div>
        </div>
    </div>
</div>
<div class="form-group text-center space-20">
    <button class="btn b-w-m btn-action" [disabled]="!loginForm.valid" type="submit"> Login </button>
</div>
</form>
```

Instead of using ` new FormControl()`` use `['']``

        this.applicationForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(55)]],
            version: ['', [Validators.required, Validators.maxLength(55)]],
            type: [null, Validators.required],
            //url: new FormControl({ value: '', disabled: true })
            url: [{ value: '', disabled: true }]
        });
