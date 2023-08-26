# VS Code Task

Creating a VA code task which create a basic HTML file inside a folder which name is asked by user when run the task

## Steps

- Press `F1` or `Ctrl+ Shift+ P` to open command pellet
- type _Tasks_ and select _Configure Tasks_
- select _Create tasks.json file from template_ option > then select _Others_
- it will create a _tasks.json_ file under .vscode folder in your project root with below content

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "echo",
      "type": "shell",
      "command": "echo Hello"
    }
  ]
}
```

OR simply create **tasks.json** file in your workspace under .vscode

- paste below content in the file , if you already have then just copy the _tasks_ and _inputs_ of below file and paste accordingly

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "node file",
      "detail": "Create file from node",
      "type": "shell",
      "command": "echo Running",
      "dependsOrder": "sequence",
      "dependsOn": ["create folder"],
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      },
      "problemMatcher": [],
      "args": ["${input:name}"]
    },
    {
      "label": "create folder",
      "type": "shell",
      "command": "node ./.vscode/boilerplate.js ${input:name}"
    }
  ],
  "inputs": [
    {
      "id": "name",
      "description": "Name your folder",
      "default": "alpha",
      "type": "promptString"
    }
  ]
}
```

in that task we have mentioned file name, so create file _boilerplate.js_ and paste below content in the file, keep this file in .vscode folder ( or you can place anywhere but write relative path in _command_ )

```js
const fs = require("fs");

const args = process.argv.slice(2);
console.log({ args });

const name = args[0].trim();

const createFiles = (name) => {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
 <title>${name}</title>
 <style>
  .container {
   display:grid;
   height: 100vh;
   background-color: grey;
  }
 </style>
</head>
<body class="container">
 <header class="header"> </header>
 <main class="main"> </main>
 <footer class="footer"> </footer>
</body>
</html>
`;

  fs.writeFile(`${name}/index.html`, content, (err) => {
    if (err) throw err;
    console.log("HTML file created!");
  });
};

if (!fs.existsSync(name)) {
  fs.mkdirSync(name, { recursive: true });
  createFiles(name);
}
```

## How to run

- Press F1 -> Tasks -> Run Task
- it will display the task name as per the _label_ in tasks.json, our label is node file so select that one
- it will prompt for folder name
- it also open bottom panel as we set below, you can hide by changing value
-

```json

presentation": {
"reveal": "always",
"panel": "shared"
},
```

- after successful execution of command, it will create folder and an index.html file inside that folder in your workspace
