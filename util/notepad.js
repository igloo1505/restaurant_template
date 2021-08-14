const unitObject = {
  WEIGHT: [
    { long: "Pounds", short: "lbs" },
    { long: "Ounces", short: "oz" },
    { long: "Grams", short: "gm" },
    { long: "Kilograms", short: "kg" },
    { long: "Stone", short: "st" },
  ],
  VOLUME: [
    { long: "Teaspoons", short: "tsp" },
    { long: "Tablespoons", short: "tbsp" },
    { long: "Cups", short: "cups" },
    { long: "Quarts", short: "qt" },
    { long: "Gallons", short: "gal" },
    { long: "Milliliters", short: "ml" },
    { long: "Cubic cm", short: "cc" },
    { long: "liters", short: "L" },
  ],
  SUBJECTIVE: [
    { long: "A pinch", short: "pinch" },
    { long: "A smidgen", short: "smidge" },
    { long: "A heap", short: "heap" },
    { long: "just a little", short: "little" },
    { long: "A wee bit", short: "wee bit" },
    { long: "A speckle", short: "speck" },
  ],
};

const getIngredientUnits = () => {
  let unitKeys = [];
  Object.keys(unitObject).map((k) => {
    unitKeys.push({ long: k, short: k, key: true });
    unitObject[k].map((u) => {
      unitKeys.push({ ...u, key: false });
    });
  });
  return unitKeys;
};

const getIngredientByIndex = (index) => {
  let _index = parseInt(index, 10);
  let unitKeys = getIngredientUnits();
  return unitKeys[_index];
};

const validateInput = (value) => {
  let values = getIngredientUnits();
  // values.filter((v) => )
  values.filter((v) => !v.key);
};

const filterData = (_regex) => {
  let regex = new RegExp(_regex, "gi");
  // let regex = new RegExp(/pin/gi);
  console.log("regex: ", regex);
  let ingredients = getIngredientUnits();
  // getIngredientUnits().filter((u) => regex.test(u.long) && !u.key);
  let options = getIngredientUnits()
    .filter(
      (u) => (regex.test(u.long) && !u.key) || (regex.test(u.short) && !u.key)
    )
    .sort((a, b) => {
      let longStringA =
        a.long.indexOf(" ") === -1
          ? a.long.toUpperCase()
          : a.long
              .slice(a.long.lastIndexOf(" ") + 1, a.long.length)
              .toUpperCase();
      let longStringB =
        b.long.indexOf(" ") === -1
          ? b.long.toUpperCase()
          : b.long
              .slice(b.long.lastIndexOf(" ") + 1, b.long.length)
              .toUpperCase();
      // if (a.long === "just a little") {
      //   debugger;
      // }
      if (longStringA < longStringB) {
        return -1;
      }
      if (longStringA > longStringB) {
        return 1;
      }
      return 0;
    });
  console.log("options: ", options);
};

filterData("s");
