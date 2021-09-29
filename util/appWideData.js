const unitObject = {
  WEIGHT: [
    { long: "Pounds", short: "lbs", key: "Weight" },
    { long: "Ounces", short: "oz", key: "Weight" },
    { long: "Grams", short: "gm", key: "Weight" },
    { long: "Kilograms", short: "kg", key: "Weight" },
    { long: "Stone", short: "st", key: "Weight" },
  ],
  VOLUME: [
    { long: "Teaspoons", short: "tsp", key: "Volume" },
    { long: "Tablespoons", short: "tbsp", key: "Volume" },
    { long: "Cups", short: "cups", key: "Volume" },
    { long: "Quarts", short: "qt", key: "Volume" },
    { long: "Gallons", short: "gal", key: "Volume" },
    { long: "Milliliters", short: "ml", key: "Volume" },
    { long: "Cubic cm", short: "cc", key: "Volume" },
    { long: "liters", short: "L", key: "Volume" },
  ],
  SUBJECTIVE: [
    { long: "A pinch", short: "pinch", key: "Subjective" },
    { long: "A smidgen", short: "smidge", key: "Subjective" },
    { long: "A heap", short: "heap", key: "Subjective" },
    { long: "just a little", short: "little", key: "Subjective" },
    { long: "A wee bit", short: "wee bit", key: "Subjective" },
    { long: "A speckle", short: "speck", key: "Subjective" },
    { long: "People", short: "people", key: "Subjective" },
  ],
};

export const getIngredientUnits = () => {
  let unitKeys = [];
  Object.keys(unitObject).map((k) => {
    unitKeys.push({ long: k, short: k, isKey: true });
    unitObject[k].map((u) => {
      unitKeys.push({ ...u, isKey: false });
    });
  });
  return unitKeys;
};

export const getIngredientByIndex = (index) => {
  let _index = parseInt(index, 10);
  let unitKeys = getIngredientUnits();
  return unitKeys[_index];
};

export const filterData = (_regex) => {
  if (_regex === "_initial_") {
    console.log("getIngredientUnits(): ", getIngredientUnits());
    return getIngredientUnits();
  }
  let regex = new RegExp(_regex, "gi");
  let options = getIngredientUnits()
    .filter(
      (u) =>
        (regex.test(u.long) && !u.isKey) || (regex.test(u.short) && !u.isKey)
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
  // return options.length > 0 ? options : null;

  return options.length !== getIngredientUnits().filter((i) => !i.isKey).length
    ? options
    : [];
};

export const validateUnit = (formDataUnit) => {
  const compareUnit = (unit) => {
    let upperCase = formDataUnit.toUpperCase();
    return {
      long: upperCase === unit.long.toUpperCase(),
      short: upperCase === unit.short.toUpperCase(),
    };
  };
  const units = getIngredientUnits(formDataUnit).filter((u) =>
    Object.values(compareUnit(u)).every()
  );
  return units.length > 0;
};
