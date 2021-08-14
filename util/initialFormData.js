const initialFormData = {
  categories: [],
  title: ``,
  imgUrl: null,
  description: ``,
  prepTime: "",
  cookTime: "",
  servings: "",
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
};

export default initialFormData;
