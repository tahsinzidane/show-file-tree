# @tahsinzidane/sft

A simple Node.js CLI tool that prints the full file tree of a directory in your terminal. Quickly visualize your project structure without leaving the command line.

## Installation

Install globally via npm:

```bash
npm install -g @tahsinzidane/sft
````

## Usage

Print the file tree of the current directory:

```bash
sft
```

Print the file tree of a specific directory:

```bash
sft path/to/directory
```

Example:

```bash
sft C:\Users\tahsinzidane\projects
```

Output:

```
project-folder
├── index.js
├── package.json
└── src
    ├── app.js
    └── utils.js
```

## Features

* Recursive directory traversal
* Pretty tree-style formatting
* Works on Windows, macOS, and Linux
* Lightweight and fast

## Author

[Tahsin Zidane](https://github.com/tahsinzidane)
