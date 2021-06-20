export const data = {
  categories: [
    {
      name: "Recipes",
      keys: [
        {
          display: "Category",
          type: "select",
          dataSet: ["Specialty", "Side", "Drink", "Desert"],
        },
        { display: "Title", type: "string" },
        { display: "Price", type: "number" },
        { display: "Description", type: "textArea" },
        { display: "In Stock", type: "boolean" },
        { display: "Spicy", type: "boolean" },
        { display: "Gluten Free", type: "boolean" },
      ],
    },
    // {name: "Tacos", keys: [
    //     {display: "Proteins", }
    // ]}
    {
      name: "User",
      keys: [
        { display: "First Name", type: "string" },
        { display: "Last Name", type: "string" },
        { display: "Username", type: "string" },
        { display: "Password", type: "password" },
        { display: "Confirm Password", type: "password" },
      ],
    },
    {
      name: "Tacos",
      keys: [],
      subCategories: [
        {
          name: "Tortilla",
          type: "string",
          keys: [
            {
              display: "Type",
              type: "string",
              dataSet: ["Flour", "Whole Wheat", "Gluten Free"],
            },
            {
              display: "Gluten Free",
              type: "boolean",
            },
            {
              display: "In Stock",
              type: "boolean",
            },
          ],
        },
        {
          name: "Protein",
          type: "string",
          keys: [
            {
              display: "Name",
              type: "string",
            },
            {
              display: "Description",
              type: "textArea",
            },
            {
              display: "Gluten Free",
              type: "boolean",
            },
            {
              display: "Is Spicy",
              type: "boolean",
            },
            {
              display: "In Stock",
              type: "boolean",
            },
          ],
        },
        {
          name: "Toppings",
          type: "string",
          keys: [
            {
              display: "Name",
              type: "string",
            },
            {
              display: "Gluten Free",
              type: "boolean",
            },
            {
              display: "Is Spicy",
              type: "boolean",
            },
            {
              display: "In Stock",
              type: "boolean",
            },
          ],
        },
        {
          name: "Add-on",
          type: "string",
          keys: [
            {
              display: "Name",
              type: "string",
            },
            {
              display: "Gluten Free",
              type: "boolean",
            },
            {
              display: "Is Spicy",
              type: "boolean",
            },
            {
              display: "In Stock",
              type: "boolean",
            },
          ],
        },
        { name: "Back", type: "string" },
      ],
    },
  ],
};

export const submissionHandler = (someData) => {
  console.log("Running from handler");
};
