#! /usr/bin/env node

const http = require("http");
const dotenv = require("dotenv");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

dotenv.config();

const args = yargs(hideBin(process.argv)).argv;
if (args._.length === 1 && Object.keys(args).length === 2) {
  const city = args._[0];
  const requestUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${city}`;
  http.get(requestUrl, res => {
    const statusCode = res.statusCode;
    if (statusCode !== 200) {
      if (statusCode === 400) {
        console.error("Error: Unknown city");
      }

      throw new Error(statusCode);
    }

    res.setEncoding("utf-8");
    let recievedData = "";
    res.on("data", chunk => {
      recievedData += chunk;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(recievedData);
      console.log(`Weather at ${city}:`);
      console.log(...parsedData.current.weather_descriptions);
      console.log(`Temperature: `, parsedData.current.temperature);
    }).on("error", e => {
      console.error(e);
      throw new Error(e);
    });
  });
} else {
  console.error("Error: Unknown command");
}
