const inquirer = require("inquirer");
const Svg = require("./lib/svg");
const { Circle, Triangle, Square } = require("./lib/shapes");
const fs = require("fs");

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter your logo text (max 3 characters):",
    validate: (input) => input.length <= 3,
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter your logo's text color (by keyword or hexadecimal number):",
  },
  {
    type: "list",
    name: "shape",
    message: "Select your logo shape:",
    choices: ["circle", "triangle", "square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter your logo shape's colour (by keyword or hexadecimal number):",
  },
];
inquirer
  .prompt(questions)
  .then((response) => {
    let shape;
    if (response.shape === "circle") {
      shape = new Circle();
    } else if (response.shape === "triangle") {
      shape = new Triangle();
    } else {
      shape = new Square();
    }
    shape.setColor(response.shapeColor);
    const svg = new Svg();
    svg.setShape(shape);
    svg.setText(response.text, response.textColor);
    fs.writeFile(`examples/logo.svg`, svg.render(), (err) => {
      if (err) console.log(err);
      console.log("Generated logo.svg");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });