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
		{ long: "Items", short: "items", key: "Subjective" },
		{ long: "A pinch", short: "pinch", key: "Subjective" },
		{ long: "A smidgen", short: "smidge", key: "Subjective" },
		{ long: "A heap", short: "heap", key: "Subjective" },
		{ long: "just a little", short: "little", key: "Subjective" },
		{ long: "A wee bit", short: "wee bit", key: "Subjective" },
		{ long: "A speckle", short: "speck", key: "Subjective" },
		{
			long: "People",
			short: "people",
			key: "Subjective",
			filter: ["serving", "servings"],
		},
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

export const filterData = (_regex, _filter) => {
	if (_regex === "_initial_") {
		return getIngredientUnits().filter((u) => !u?.filter?.includes(_filter));
	}
	let regex = new RegExp(_regex, "gi");

	let options = getIngredientUnits()
		.filter(
			(u) =>
				(regex.test(u.long) && !u.isKey) ||
				(regex.test(u.short) && !u.isKey && !u?.filter?.includes(_filter))
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
			if (longStringA < longStringB) {
				return -1;
			}
			if (longStringA > longStringB) {
				return 1;
			}
			return 0;
		});

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

export const getParsedValue = (val) => {
	let valFloat = parseFloat(val);
	valFloat = valFloat?.toFixed(3);
	valFloat = parseFloat(valFloat);
	console.log("Typeof ", typeof valFloat);
	if (valFloat >= 1) {
		return val;
	}
	if (valFloat < 1) {
		switch (valFloat) {
			case 0.25:
				return "1/4";
			case 0.75:
				return "3/4";
			case 0.5:
				return "1/2";
			case 0.333:
				return "1/3";
			case 0.666:
				return "2/3";
			case 0.125:
				return "1/8";
			case 0.375:
				return "3/8";
			case 0.625:
				return "5/8";
			case 0.875:
				return "7/8";
			default:
				return val;
		}
	}
};

export const healthKeyEnum = [
	"gluten free",
	"dairy free",
	"vegan",
	"vegetarian",
	"paleo",
	"keto",
	"lactose free",
	"low fat",
	"low carb",
	"low sodium",
	"high protein",
	"low cholesterol",
	"high fiber",
	"low sugar",
];

export const cuisineEnum = [
	"Italian",
	"American",
	"Chinese",
	"Thai",
	"Indian",
	"Mexican",
	"French",
	"Salad",
];

export const categoryEnum = [
	"one pan",
	"side",
	"drink",
	"condiment",
	"dinner",
	"snack",
	"holiday",
	"celebration",
	"breakfast",
	"on the go",
	"affordable",
	"health focused",
	"Salad",
];

export const unitArray = [
	"A pinch",
	"A smidgen",
	"A heap",
	"just a little",
	"A wee bit",
	"A speckle",
	"Teaspoons",
	"Tablespoons",
	"Cups",
	"Quarts",
	"Gallons",
	"Milliliters",
	"Cubic cm",
	"liters",
	"Pounds",
	"Ounces",
	"Grams",
	"Kilograms",
	"Stone",
	"People",
	"Whole",
	"Items",
];
