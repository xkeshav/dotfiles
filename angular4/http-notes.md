new signature in service file to call http request;

```js
    return this.httpClient.verb<TypeOfResponse>(`/only/endpoint`, { withCredentials: true|false }).map(...);
```

if verb is *post* than second argument of http will be body of post data; keep null or {} if no body

----

when content-type is `application/x-www-form-urlencoded` or body has `multipart/form-data.`

than use [formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) as following

const formdata = new FormData();
formdata.append('key', value);

then

```js
return this.httpClient.post<TypeOfResponse>(`/only/endpoint`, formdata, { withCredentials: true|false }).map(...);
```

--

if any custom content-type is required for any specific endpoint ( other than the predefined custom type) than use HttpHeaders

```js

const headers = new HttpHeaders({
       'Content-type': 'application/specific-custom.json'
});

return this.httpClient.verb<TypeOfResponse>(`/only/endpoint`, { headers, withCredentials: true })
```

---

if any endpoint need query params than use HttpParams

```js
const params = new HttpParams()
.set('param1', 'value')
.set('foo', 'bar');

return this.httpClient.verb<TypeOfResponse>(`/only/endpoint`, { params, withCredentials: true });
```
