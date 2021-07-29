export const unitObject = {
  WEIGHT: [
    { short: "lbs", long: "Pounds" },
    { short: "oz", long: "Ounces" },
    { short: "gm", long: "Grams" },
    { short: "kg", long: "Kilograms" },
    { short: "st", long: "Stone" },
  ],
  VOLUME: [
    "teaspoons",
    "tablespoons",
    "cups",
    "quarts",
    "gallons",
    "milliliters",
    "liters",
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

export const getIngredientUnits = () => {
  let unitKeys = [];
  Object.keys(unitObject).map((k) => {
    unitKeys.push({ long: k, key: true });
    unitObject[k].map((u) => {
      unitKeys.push({ ...u, key: false });
    });
  });
  console.log("unitKeys: ", unitKeys);
  return unitKeys;
};
