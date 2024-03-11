# Style Guide

1. 3rd party import and custom import must be separated with new line

2. run `Organize Imports` action in vs code and separate custom and 3rd party import after it

3. custom import statement must starts with 'relative path' `./` or 'alias' `@components`

4. component props will be suffixed with `Props` and will reside in same components.

5. use object destructuring instead of using `props.whatever`

   ```ts
   const {
     target: { value },
   } = e;
   ```

6. method name and variable name will be in camelCase

7. variable/methods/props which posses boolean value must start with `is` `has` `with`, e.g. `IsActive`, `hasRemoved`, `withIcon`

8. whenever use map in JSX, write `key` attribute in very first tag as key and key value will be `key={underscore_separated}` ; set key as unique value of the array object (avoid using index)

9. write attribute `aria-label="lowercase"` value in links and button

10. use double quotes (as preferred by eslint config ) but keep your consistent whether single quotes or double quotes

11. add type attribute in button

12. for testing purpose add custom data attribute on any tag in this pattern data-test-id-test-something

13. use `Object.assign()` and spread operator to avoid mutability.

```ts
const output = Object.assign({}, ...input, a: 'apple', [v]: 'value' }); // assuming v is a dynamic variable
```

can be re-written as

```ts
const output = { ...input, a: "apple", [v]: "value" };
```

14. use loop variable name short and no typings required if you assign the array typings correctly.

```ts
list.map((category: CategoryType, index: number) => ());
```

typing of `list` has to be assigned earlier , then we can write

```ts
list.map((ct, idx) => ())
```

15. Apply Object destructuring within map in JSX, if you require only few value from a long array
