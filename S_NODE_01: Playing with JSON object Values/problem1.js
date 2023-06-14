const fs = require("fs/promises");

const listActivities = (data) => {
  console.log(
    "\n\nstep 4:",
    data.catFriends.flatMap((el) => el.activities)
  );
  return data;
};
const friendsNames = (data) => {
  console.log("\n\nstep 5:", ...data.catFriends.map((el) => el.name));
  return data;
};

const totalWeight = (data) => {
  console.log(
    "\n\nstep 6:",
    data.catFriends.reduce((prv, cur) => prv.weight + cur.weight)
  );
  return data;
};
const totalActivities = (data) => {
  console.log(
    "\n\nstep 7:",
    data.catFriends.reduce(
      (prv, cur) => prv.activities.length + cur.activities.length
    )
  );
  return data;
};

const add2Activites = (data) => {
  return {
    ...data,
    catFriends: data.catFriends.map((cat) => ({
      ...cat,
      activities: [...cat.activities, "activity1", "activity2"],
    })),
  };
};
const updateColor = (data) => {
  return {
    ...data,
    catFriends: data.catFriends.map((cat) =>
      cat.name != "bar" ? cat : { ...cat, furcolor: "black" }
    ),
  };
};

fs.readFile(`${__dirname}/problem1.json`, { encoding: "utf-8" })
  .then(JSON.parse)
  .then((data) => console.log("\n\nstep 1: ", data) || data)
  .then((data) => ({ ...data, height: 7, weight: 5 }))
  .then((data) => console.log("\n\nstep 2: ", data) || data)
  .then((data) => ({ ...data, name: "Fluffyy" }))
  .then((data) => console.log("\n\nstep 3: ", data) || data)
  .then(listActivities)
  .then(friendsNames)
  .then(totalWeight)
  .then(totalActivities)
  .then(add2Activites)
  .then(
    (data) => console.log("\n\nstep 8: catfriends >>", data.catFriends) || data
  )
  .then(updateColor)
  .then((data) => console.log("\n\nstep 9:", data));
