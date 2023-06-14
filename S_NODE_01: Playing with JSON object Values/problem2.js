const moment = require("moment");
const { readFile, writeFile } = require("fs/promises");
readFile(`${__dirname}/problem2.json`, { encoding: "utf-8" })
  .then(JSON.parse)
  .then((data) => ({
    ...data,
    accidents: data.accidents.map((accident) => ({
      ...accident,
      date: moment(accident.date, "MM/DD/YYYY").format("YYYY-MM-DD"),
    })),
  }))
  .then((data) =>
    writeFile(`${__dirname}/output.json`, JSON.stringify(data, null, 2))
  );

// console.log(moment);
