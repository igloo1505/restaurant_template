const initialFormData = {
  categories: [],
  title: "",
  imgUrl: null,
  description: "",
  prepTime: "0",
  cookTime: "0",
  prepTimeUnit: { long: "Minutes", short: "mins" },
  cookTimeUnit: { long: "Minutes", short: "mins" },
  servings: "4",
  servingUnit: "Cups",
  directions: [],
  direction: "",
  ingredients: [],
  ingredient: {
    text: "",
    optional: false,
    amount: 1,
    unit: { long: "Cups", short: "cups", key: "Volume" },
  },
  subRecipes: [
    {
      title: "",
      ingredients: [],
      ingredient: {
        text: "",
        optional: false,
        amount: 1,
        unit: { long: "Cups", short: "cups", key: "Volume" },
      },
    },
  ],
};

export default initialFormData;
