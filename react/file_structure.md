# File and Folder Naming Convention

1. **components** folder files will have named export and have to re export in `components/index.ts` file for abstraction purpose (`export const WhatEverComponent`)

2. pages folder files will have default export (export default WhatEverPage)

3. file name will be singular noun and in PascalCase in components and pages folder (.e. ends with .tsx), rest folder files will have lower-case name

4. folder name within components are lower-case only.

5. utils folder will have all common utilities such as validation files.

6. create separate utility files and re export in `utils/index.ts`

7. shared folder contains constants and messages used in the project

8. `messages.ts` file have string and labels that are hard coded text (copy doc) for eg. BUTTON_LABEL and INPUT_LABEL.

9. metadata.ts file will have static list such as PAGES, ACTION_LIST, ICON_LIST

10. `constants.ts` files have some constant and metadata such as POUND SIGN or MAX LENGTH Le, whose value will be specific number/ specific string/object/ regex pattern

11. variables in metadata.ts, constants.ts and messages.ts will be in UPPERCASE ONLY

12. **models** folder will contains all common typings and interfaces used in project

13. create separate typing files which lies under common namespace and re export in **models/index.ts**

14. types and interface name will be PascalCase (prefer types over interfaces)

15. test files suffix with **whatever.test.ts**, but if you are creating any mock component in the test file then file will be ends with **whatever_test.tsx**

16. styles folder will have scss files common and custom css will be written in separate files

17. Infra folder will have redux structure and each action will have separate folder

18. `tagging` folder will have adobe analytics code for each page separately.
