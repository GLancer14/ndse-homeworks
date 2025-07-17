#! /usr/bin/env node

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const guessInterface = readline.createInterface({ input, output });
const randomNumber = Math.round(Math.random() * 20);

async function runQuestion() {
  let answer = await guessInterface.question("Отгадайте число в диапазоне от 0 до 20\n");
  if (+answer !== randomNumber) {
    if (+answer > randomNumber) {
      console.log("Меньше");
    } else {
      console.log("Больше");
    }
    
    runQuestion();
  } else {
    guessInterface.close();
    console.log("Верный ответ");
  }
}

runQuestion();