#! /usr/bin/env node

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const guessInterface = readline.createInterface({ input, output });
const randomNumber = Math.round(Math.random() * 20);
let runQuestionCallCount = 0;

async function runQuestion() {
  const question = runQuestionCallCount === 0 ? "Загадано число в диапазоне от 0 до 20\n" : "";
  const answer = await guessInterface.question(question);
  runQuestionCallCount++;
  if (+answer !== randomNumber) {
    if (+answer > randomNumber) {
      console.log("Меньше");
    } else {
      console.log("Больше");
    }

    runQuestion();
  } else {
    guessInterface.close();
    console.log(`Отгадано число ${randomNumber}`);
  }
}

runQuestion();