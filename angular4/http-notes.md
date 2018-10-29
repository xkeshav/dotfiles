## HttpClient

With HttpClient, `@angular/common/http` provides a simplified API for HTTP functionality for use with Angular applications, building on top of the XMLHttpRequest interface exposed by browsers. Additional benefits of HttpClient include testability support, strong typing of request and response objects, request and response interceptor support, and better error handling via apis based on Observables.

Before you can use the HttpClient, you need to install the HttpClientModule which provides it. This can be done in your application module, and is only necessary once.

// app.module.ts:

```ts
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module  after BrowserModule.
    HttpClientModule
  ]
})
export class MyAppModule {}
```

```ts
return this.httpClient
  .verb<TypeOfResponse>(`/only/endpoint`, { withCredentials: true | false })
  .map((res) => res.item);
```

* if _post_ / _put_ then second argument of httpclient class is the body of request.Keep null or {} if no body

```ts
    .put(`/user/resend`, null, { params, withCredentials: true })
```

---

When _content-type_ is `application/x-www-form-urlencoded` or body has
`multipart/form-data.`

than use [formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) as following

```
const formdata = new FormData();
formdata.append('key', value);

return this.httpClient
.post<TypeOfResponse>(`/only/endpoint`, formdata, { withCredentials: true})
.map((res) => res.item );
```

--

if any custom content-type is required for any specific endpoint ( other than the predefined custom type) than use `HttpHeaders`

```js
const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });

return this.httpClient
    .verb<TypeOfResponse>(`/only/endpoint`, {
                responseType: 'blob',
                headers,
                withCredentials: true})
     .map(...);
```

---

if some API ( for eg. forgot or register) do not require auth token than write `withCredential:false` and handle it into interceptor

```js
return this.httpClient
    .verb<TypeOfResponse>(`/no/auth/endpoint`, { withCredentials: false })
    .map(...);
```

## Service File Conventions

* Write service name and parameters self explanatory ( camelCase)

```ts
    getProcessesForApplicationInstance(id: string, data) X

    getProcessListByInstance(instanceId:string, formdata) ✓
```

* Add typing of response ahead to http verb: for eg:

- Add typing ahead to function name when there is DELETE or PATCH request and e are not sure about the response object shape, for eg:

```ts
    deleteApplication(appId: string): Observable<any> {
       return this.httpClient
              .delete(`/application/${appId}`, { withCredentials: true })
              .catch((error) => Observable.throw(error));
    }
```

## HttpParams

* If any http request requires query params than we do it with `HttpParams`
* `params` is the key name which hold query parameters data as 3rd argument of http request
* we can create a method which create query params object

```ts
    buildParams(paramList: object) {
        let params = new HttpParams(); // use let as we immute it
        for (const key in paramList) {
            if (paramList[key]) {
                params = params.set(key, paramList[key]);
            }
        }
        return params;
    }

    getIncidentList(paramsData) {
        const params: HttpParams = this.buildParams(paramsData);
        return this.httpClient
            .get<IncidentListResponse>(`/application/incidents/`, {
            params, withCredentials: true })
            .catch((error) => Observable.throw(error))
            .map((res) => res.item)
    }
```

* If there is only 1 property you need to append with API endpoint then use directly

```ts
function setUserid(userId: string) {
  const params: HttpParams = new HttpParams().set("userId", userId);
  return this.httpClient.getWhatever(`/api/endpoint`, { params });
  // this will turns into `/api/enpoint?userId={userId}`
}
```

* set method output `void` if it does not return enything, for eg. we are stoing data on sesssion storage or logout

```ts
    private setSession(response: AuthTokenResponse): void {}
```
