const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/nutritions.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const uniqueFields = [
  ...new Set(
    data.map((item) => {
      const area = item.collection_information["Collection area"];
      // {en, mn} бүтэцтэй болсон бол en утгыг авна
      return typeof area === "object" ? area.en : area;
    })
  ),
];

console.log(uniqueFields);