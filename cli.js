#!/usr/bin/env node
const { execSync } = require("child_process");
const [, , ...args] = process.argv;
const fs = require("fs");

console.log("Adding dependencies");
execSync("yarn add -D tailwindcss postcss-cli autoprefixer", err => {
  if (err) throw err;
});

console.log("Writing to public/index.html");
fs.appendFile(
  "./public/index.html",
  '<link rel="stylesheet" href="styles.css" />',
  err => {
    if (err) throw err;
  }
);

console.log("Writing to postcss.config.js");
fs.writeFile(
  "postcss.config.js",
  "module.exports = { plugins: [require('tailwindcss'), require('autoprefixer'),]};",
  err => {
    if (err) throw err;
  }
);

console.log("Writing to tailwind.config.js");
fs.writeFile(
  "tailwind.config.js",
  "module.exports = {theme: {  extend: {}}, variants: {}, plugins: []};",
  err => {
    if (err) throw err;
  }
);

console.log("Writing to src/tailwind.css");
fs.writeFile(
  "src/tailwind.css",
  "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
  err => {
    if (err) throw err;
  }
);

console.log("Writing to package.json");
const buffer = fs.readFileSync("package.json");
const json = JSON.parse(buffer);
json.scripts["build:styles"] = "postcss src/tailwind.css -o public/styles.css";
json.scripts["prebuild"] = "yarn build:styles";
json.scripts["prestart"] = "yarn build:styles";

fs.writeFile("package.json", JSON.stringify(json), err => {
  if (err) throw err;
});

console.log(`Success!`);

// "build:styles": "postcss src/tailwind.css -o public/styles.css",
// "prebuild": "yarn build:styles",
// "prestart": "yarn build:styles"
