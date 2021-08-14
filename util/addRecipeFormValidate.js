export const validateStepTwo = (formData) => {
  console.log("formData: ", formData);
  let validated = {};
  let keys = Object.keys(formData);
  keys.forEach((k) => (validated[k] = true));
  // return validated;
  return false;
};

// const validateIngredientAdd = (formData) => {
//   let passed = {
//     text: false,
//     optional: true,
//     unit: false
//   }
//   if(formData.ingredient.text.length >= 3){
// passed.text = true
//   }
//   if(getIngredientUnits().indexOf(formData.ingredient.text.unit)){
//     passed.text = true
//       }
// }
