#! /usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const moment = require("moment");

const argv = yargs(hideBin(process.argv)).option("year", {
  alias: "y",
  type: "boolean",
}).option("month", {
  alias: "m",
  type: "boolean",
}).option("date", {
  alias: "d",
  type: "boolean",
}).argv;

const dateNow = moment();
if (argv._.length === 1 && typeof +argv._[0] === "number") {
  if (argv.year) {
    console.log(dateNow.subtract(argv._[0], "years").toISOString());
  } else if (argv.month) {
    console.log(dateNow.subtract(argv._[0], "months").toISOString());
  } else if (argv.date) {
    console.log(dateNow.subtract(argv._[0], "days").toISOString());
  } else {
    console.error("Error: Unknown command");
  }
} else {
  console.error("Error: Unknown command");
}