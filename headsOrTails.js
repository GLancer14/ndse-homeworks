#! /usr/bin/env node

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const requestArgs = yargs(hideBin(process.argv)).option("logfile", {
  alias: "l",
  type: "string",
  desc: "Only JSON files",
}).argv;
const guessInterface = readline.createInterface({ input, output });
if (requestArgs.logfile && requestArgs.logfile.endsWith(".json")) {
  runQuestion();
} else {
  guessInterface.close();
  console.error("Error: Unknown command");
}

async function runQuestion() {
  const randomNumber = Math.round(Math.random() + 1);
  const answer = await guessInterface.question("Загадано число 1 или 2\n");
  if (+answer === randomNumber) {
    console.log("Верно");
  } else {
    console.log("Неверно");
  }

  const pathToLog = path.join(__dirname, requestArgs.logfile);
  fs.readFile(pathToLog, (err, data) => {
    const newData = {
      date: new Date(),
      randomNumber,
      answer: +answer,
    };
    if (err) {
      fs.writeFile(pathToLog, JSON.stringify([ newData ]), { encoding: "utf8" }, err => {
        if (err) {
          throw err;
        }
      });
    } else {
      const prevData = JSON.parse(data);
      prevData.push(newData);
      fs.writeFile(pathToLog, JSON.stringify(prevData), { encoding: "utf8" }, err => {
        if (err) {
          throw err;
        }
      });
    }

    guessInterface.close();
  });
}
