export const initialFormData = {
  User: {
    ["First Name"]: "",
    ["Last Name"]: "",
    Username: "",
    Password: "",
    ["Confirm Password"]: "",
  },
  Recipes: {
    ["In Stock"]: false,
    ["Gluten Free"]: false,
    ["Spicy"]: false,
    Price: "",
    Category: "",
    Title: "",
    Description: "",
  },
  Tacos: {
    Tortilla: {
      Type: "",
      ["In Stock"]: true,
      ["Gluten Free"]: false,
      ["Is Spicy"]: false,
    },
    Protein: {
      Name: "",
      Description: "",
      ["In Stock"]: true,
      ["Gluten Free"]: false,
    },
  },
};
