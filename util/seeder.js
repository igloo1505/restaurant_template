import Ingredient from "../models/Ingredient";
import Recipe from "../models/Recipe";

const unitArray = [
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
];

const healthKeyEnum = [
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

let getTime = (time, unit) => {
  switch (unit.long.toLowerCase()) {
    case "minutes":
      return parseFloat(time);
    case "hours":
      return parseFloat(time) * 60;
    case "days":
      return parseFloat(time) * 1440;
    default:
      return parseFloat(time);
  }
};

const recipe1 = {
  createdBy: "60ca3c4e89226b09e04ad70e",
  categories: ["dinner"],
  title: "One Pan Chicken Parm",
  cuisineType: ["Italian"],
  description:
    "Tender chicken breasts cook a garlicky, creamy tomato bath, and the addition of kale rounds the creamy chicken skillet meal into a true one-pan dinner. Plus, it’s ready in just about 20 minutes.",
  ingredients: [
    new Ingredient({
      name: "Olive Oil",
      quantity: 2,
      unit: "tbsp",
      optional: false,
      text: "2 tbsp Olive oil",
    }),
    new Ingredient({
      name: "Chicken Breast",
      quantity: 1.5,
      unit: "lbs",
      optional: false,
      text: "1.5 lbs Chicken breast (4 medium), boneless, skinless",
    }),
    new Ingredient({
      name: "Salt",
      quantity: 1,
      unit: "tsp",
      optional: false,
      text: "1 tsp Salt",
    }),
    new Ingredient({
      name: "Pepper",
      quantity: 0.5,
      unit: "tsp",
      optional: false,
      text: "½ tsp Pepper",
    }),
    new Ingredient({
      name: "Tomato Paste",
      quantity: 2,
      unit: "tbsp",
      optional: false,
      text: "2 tbsp Tomato paste",
    }),
    new Ingredient({
      name: "Garlic",
      quantity: 3,
      unit: "cloves",
      optional: false,
      text: "3 Cloves garlic, minced",
    }),
    new Ingredient({
      name: "Fennel seeds",
      quantity: 1,
      unit: "tsp",
      optional: false,
      text: "1 tsp Fennel seeds",
    }),
    new Ingredient({
      name: "Fennel seeds",
      quantity: 1,
      unit: "tsp",
      optional: false,
      text: "1 tsp Fennel seeds",
    }),
    new Ingredient({
      name: "Red Pepper Flakes",
      quantity: 0.5,
      unit: "tsp",
      optional: true,
      text: "1/2 tsp Crushed red pepper flakes",
    }),
    new Ingredient({
      name: "Red Pepper Flakes",
      quantity: 0.5,
      unit: "Ounces",
      optional: false,
      text: "1 (14 oz) can Crushed tomatoes",
    }),
    new Ingredient({
      name: "Heavy Cream",
      quantity: 1,
      unit: "Cup",
      optional: false,
      text: "1 cup Heavy cream",
    }),
    new Ingredient({
      name: "Grated Parmesan Cheese",
      quantity: 0.5,
      unit: "Cup",
      optional: false,
      text: "½ cup Parmesan cheese, divided",
    }),
    new Ingredient({
      name: "Kale",
      quantity: 4,
      unit: "Cup",
      optional: false,
      text: "4 cups Kale, ribs removed, torn into small pieces, packed",
    }),
    new Ingredient({
      name: "Basil",
      quantity: 0.25,
      unit: "Cup",
      optional: false,
      text: "1/4 cup Basil leaves, thinly sliced",
    }),
  ],
  favoriteCount: 0,
  time: {
    prepTime: {
      time: 15,
      unit: "minutes",
    },
    cookTime: {
      time: 25,
      unit: "minutes",
    },
    totalTime: null,
  },
  servings: {
    amount: 4,
    unit: "People",
  },
  directions: [
    "Heat olive oil in an ovenproof skillet cast iron skillet over medium-high heat.",
    "Season chicken breasts with 1/2 teaspoon salt and pepper.",
    "Add chicken to skillet and cook until golden, about 5 minutes. Turn and cook on the other side for another 5 minutes. Remove chicken from the pan and set aside.",
    "In the same skillet, add tomato paste, garlic, fennel seeds and red pepper flakes and cook until just fragrant, about 1 minutes.",
    "Add crushed tomatoes and bring to a simmer, allow to cook for 3 minutes.",
    "Stir in heavy cream, ¼ cup parmesan cheese and kale, stirring until kale is just wilted, about 3 minutes.",
    "Season with remaining ½ teaspoon salt and add chicken back into the skillet. Allow to cook for 5 more minutes or until the internal temperature of the chicken breasts reaches 165°F with an instant read thermometer.",
    "Serve topped with fresh basil and remaining cheese.",
  ],
  healthKeys: ["gluten free", "low carb"],
};

const recipe2 = {
  createdBy: "60ca3c4e89226b09e04ad70e",
  categories: ["condiment"],
  title: "Guacamole",
  cuisineType: ["Mexican"],
  description: "Just good really good guacamole",
  ingredients: [
    new Ingredient({
      name: "Avocadoes",
      quantity: 2,
      unit: "whole",
      optional: false,
      text: "2 ripe avocadoes",
    }),
    new Ingredient({
      name: "Lemon",
      quantity: 1,
      unit: "whole",
      optional: false,
      text: "Juice and grated rind of 1 lemon",
    }),
    new Ingredient({
      name: "Garlic",
      quantity: 3,
      unit: "cloves",
      optional: false,
      text: "3 cloves garlic, chopped fine",
    }),
    new Ingredient({
      name: "Sea Salt",
      quantity: 0.5,
      unit: "tsp",
      optional: false,
      text: "½ teaspoon sea salt",
    }),
    new Ingredient({
      name: "Chipotle Chile powder",
      quantity: 0.25,
      unit: "tsp",
      optional: false,
      text: "¼ teaspoon powdered chipotle chile peppers",
    }),
    new Ingredient({
      name: "Tomato",
      quantity: 0.5,
      unit: "whole",
      optional: true,
      text: "½ small tomato seeded and chopped",
    }),
    new Ingredient({
      name: "Chives",
      quantity: 0.25,
      unit: "cup",
      optional: true,
      text: "¼ cup chopped fresh chives",
    }),
    new Ingredient({
      name: "Onion",
      quantity: 0.25,
      unit: "cup",
      optional: true,
      text: "¼ cup finely diced onion",
    }),
    new Ingredient({
      name: "Carrot",
      quantity: 0.25,
      unit: "cup",
      optional: true,
      text: "¼ cup shredded carrot, rutabaga, celeriac, or beet",
    }),
    new Ingredient({
      name: "Bell Peppers",
      quantity: 0.25,
      unit: "cup",
      optional: true,
      text: "¼ cup finely chopped green or red bell pepper",
    }),
    new Ingredient({
      name: "Olives",
      quantity: 0.25,
      unit: "cup",
      optional: true,
      text: "¼ cup chopped olives",
    }),
    new Ingredient({
      name: "Cilantro",
      quantity: 3,
      unit: "tbsp",
      optional: true,
      text: "3 tablespoons finely chopped fresh cilantro, parsley, or oregano",
    }),
  ],
  favoriteCount: 0,
  time: {
    prepTime: {
      time: 5,
      unit: "minutes",
    },
    cookTime: null,
    totalTime: null,
  },
  servings: {
    amount: 2,
    unit: "Cups",
  },
  directions: [
    "Starting at the top end slit an avocado lengthwise in half and twist to separate the halves. Using a spoon remove and discard the pit. Hold one half in the palm of your hand, cut end up, and slip the spoon between the flesh and the skin to remove the flesh, discarding the skin. Roughly chop and place in a medium bowl. Drizzle lemon juice over. Remove skin from the second half and add chopped flesh to the bowl and toss to coat with lemon juice. Repeat with the second avocado.",
    "Mash the avocadoes using a potato masher.",
    "Add lemon rind, garlic, salt and chipotle powder. Stir well and add other ingredients if desired.",
  ],
  healthKeys: [],
};

const recipe3 = {
  createdBy: "60ca3c4e89226b09e04ad70e",
  categories: ["health focused", "Salad"],
  title: "Cowboy Salad",
  cuisineType: ["Salad"],
  description:
    "The great thing about Cowboy Salad and really any homemade salad is how much you can customize it to your tastes. There are no rules or measurements that really matter so add what you like! If you want to add shredded vegan cheese, go for it! Try the dressing as-is but then it's okay to experiment and add a little more of one thing or a little less of another, to get a taste you really like. Have fun!",
  ingredients: [
    new Ingredient({
      name: "Spinach",
      quantity: 4,
      unit: "cups",
      optional: false,
      text: "4-5 cups spinach",
    }),
    new Ingredient({
      name: "Black Beans",
      quantity: 0.33,
      unit: "cups",
      optional: false,
      text: "1/3 cup black beans, rinsed ",
    }),
    new Ingredient({
      name: "Corn",
      quantity: 0.25,
      unit: "cups",
      optional: false,
      text: "1/4 cup corn (canned, frozen or fresh from the cob)",
    }),
    new Ingredient({
      name: "Tomatoes",
      quantity: 0.25,
      unit: "cups",
      optional: false,
      text: "1/4 cup grape tomatoes, sliced",
    }),
    new Ingredient({
      name: "Red Onion",
      quantity: 0.25,
      unit: "cups",
      optional: false,
      text: "1/4 cup red onion, diced",
    }),
    new Ingredient({
      name: "Gypsy Pepper",
      quantity: 1,
      unit: "whole",
      optional: false,
      text: "1 gypsy pepper, sliced and seeded",
    }),
    new Ingredient({
      name: "Avocado",
      quantity: 0.5,
      unit: "whole",
      optional: false,
      text: "1/2 avocado, chopped",
    }),
    new Ingredient({
      name: "Cilantro",
      quantity: 2,
      unit: "tbsp",
      optional: false,
      text: "2 Tbs cilantro",
    }),
    new Ingredient({
      name: "Salt & Pepper",
      quantity: 0,
      unit: "A smidgen",
      optional: false,
      text: "salt and pepper, to taste",
    }),
  ],
  favoriteCount: 0,
  time: {
    prepTime: {
      time: 10,
      unit: "minutes",
    },
    cookTime: {
      time: 0,
      unit: "minutes",
    },
    totalTime: null,
  },
  servings: {
    amount: 2,
    unit: "People",
  },
  directions: [
    "Whisk together dressing ingredients until smooth. You can also mix it in food processor, if desired.",
    "Layer salad toppings on top of spinach, or toss together. Top with dressing.",
  ],
  healthKeys: ["Vegetarian", "low carb"],
};
