#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const requestArgs = yargs(hideBin(process.argv)).argv;
if (requestArgs._.length === 1 && requestArgs._[0].endsWith(".json")) {
  const pathToLog = path.join(__dirname, requestArgs._[0]);
  fs.readFile(pathToLog, (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data);
      const gamesCount = parsedData.length;
      let wonGames = 0;
      let lostGames = 0;
      parsedData.forEach(gameData => {
        gameData.randomNumber === gameData.answer ? wonGames++ : lostGames++;
      });
      const winRate = Math.round(Number((wonGames / gamesCount).toFixed(2)) * 100);

      console.log(`Общее количество партий: ${gamesCount}`);
      console.log(`Количество выигранных партий: ${wonGames}`);
      console.log(`Количество проигранных партий: ${lostGames}`);
      console.log(`Процент выигранных партий: ${winRate}%`);
    }
  });
} else {
  console.error("Error: Unknown command");
}
