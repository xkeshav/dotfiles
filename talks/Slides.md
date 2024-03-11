---
marp: true
title: Make your VS Code Smarter
paginate: true
theme: default
author: Keshav Mohta
Date: July 01, 2023
Place: React Meetup #68 @Atlassian
_class: invert
---

**Keshav Mohta**
_SDE III at JP Morgan Chase & Co._

> Make your VS Code Smarter
> author: _@xkeshav_

---

<!-- backgroundColor: whitesmoke  -->
<!-- color: green -->

# VS Code Anatomy

- Activity Bar
- Side Bar - Primary and Secondary
- Status Bar
- Editor Groups
- Workbench
- Tracker
- Minimap
- Bottom Panel

---

# Project vs Workspace

- [project]._code-workspace_

```json
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {}
}
```

---

# Settings File [ _⌘ + ,_ ]

 <!-- Workspace Settings / User Settings / global settings / profile settings 
     - Windows: `%APPDATA%\Code\User\settings.json`
     - Mac: `~/Library/Application Support/Code/User/settings.json`
-->

- Workspace settings file --> _.vscode/settings.json_
- User settings file --> _settings.json_
- Current profile settings ( if profile set other than _default_ )
- Change settings using settings view or setting file
- See modified settings using filter `@modified` term

---

# Keyboard shortcuts [ _⌘ + K + S_ ]

<!-- {
		"key": "cmd+j",
		"command": "editor.action.joinLines",
		"when": "editorTextFocus && !editorReadonly"
	}
-->

- Search existing key bindings using keystrokes
- Change key bindings
- Add new key bindings ( User Path/_keybindings.json_ )
- check modified key bindings using `@source: user` term

---

# most used keyboard shortcut

| Action                     | Mac                    | Windows              |
| -------------------------- | ---------------------- | -------------------- |
| Join lines                 | **⌘ + J**              | **Ctrl + J**         |
| Move line up               | **Option + ▲**         | **Ctrl + ↑**         |
| Copy line down (duplicate) | **Shift + Option + ▼** | **Shift + Alt + ↓**  |
| Delete line                | **⌘ + Shift + K**      | **Ctrl + Shift + K** |
| Last Cursor Position       | **Ctrl -**             | **Alt -**            |

---

# Extensions [ _⌘ + Shift + X_ ]

<!-- install using VSIX or marketplace -->

- Add recommended extensions located in _.vscode/extensions.json_ file

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "alefragnani.project-manager",
    "streetsidesoftware.code-spell-checker",
    "esbenp.prettier-vscode",
    "oderwat.indent-rainbow",
    "davidanson.vscode-markdownlint",
    "christian-kohler.path-intellisense",
    "artdiniz.quitcontrol-vscode"
  ]
}
```

---

# UI Modification

- Theme and Icons
- Move/Remove item from Side bar / Activity bar / Bottom Panel
- Pin Tab
- Source Action -- Rename Symbol
- Mini Map
- Exclude/ Include
- Window Title
- Font ( **Fira Code** ❤️ )
- Local File History

---

# Search Feature [ _⌘ + Shift + F_ ]

- File Search
- Folder Search
- Regex
- show line # while search

---

# **⌘ + P** is your friend

- File search by acronym
- Go to line using `:num`
- Go to symbol using `:@`
- Open multiple files using `->`
- View Only files have italic title

---

# **Cmd + Shift + P** is your guard

<!-- F1 is also used -->

- Command panel
- Extension Shortcut
- general editing feature -- Change Case / Sort
- Developer Tools

---

# Git integration

- default branch naming
- lock specific branch
- random branch name
- commit and push together

```json
{
  "git.autofetch": true,
  "git.branchPrefix": "feature/zero/",
  "git.postCommitCommand": "push",
  "git.rememberPostCommitCommand": true,
  "git.branchProtection": ["master", "develop"]
}
```

---

# custom snippets

<!--
"rfc": {
		"scope": "javascript, javascriptreact, typescript, typescriptreact",
		"prefix": "rfc",
		"body": [
			"import * as React from 'react';",
			"",
			"export type <$TM_FILENAME>Props = {};",
			"export const ${1:$TM_FILENAME}: React.FC<$TM_FILENAME>Props = () => {",
			"\t",
			"}"
		],
		"description": "destructured console log"
	}
  -->

- user snippet

  - scope
  - prefix
  - body
  - description

- global snippet
- key binding for snippet

---

# Zen Mode

- distraction free
- modifications in settings.json

```json
"zenMode.hideLineNumbers": false
"zenMode.centerLayout": false,
"zenMode.hideTabs": false,
```

---

# Screencast mode

---

# Auto Format and lint

```json
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.format.enable": true,
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false,
    "[typescriptreact][typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.codeActionsOnSave": {
      "source.fixAll": true,
      "source.organizeImports": true
    }
    "
```

---

# settings order

.editorconfig > .prettierrc > .eslintrc > vs code config

.eslintrc.json < .eslintrc.yaml < .eslintrc.js

---

# Custom dictionary

- code spell extension settings

```json
"cSpell.customDictionaries": {
    "myDictionary": {
      "name": "myDictionary",
      "path": "~/myDictionary.txt",
      "scope": "user",
      "addWords": true
    }
  }
```

---

# Javascript Debugger

add snippets in **launch.json**

---

# Custom Profile and Settings Sync

- export custom profile

---

<!-- backgroundColor: khaki  -->
<!-- color: black  -->

# Thank you

![w:500](./images/dotfiles.png)
