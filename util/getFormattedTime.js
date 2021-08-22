export const getFormattedTime = (recipe) => {
  // let prepTime = recipe.time.prepTime;
  let totalTime = false;

  if (!recipe?.time?.cookTime && !recipe?.time?.prepTime) {
    console.log("returning");
    return false;
  }
  if (recipe?.time?.cookTime) {
    totalTime = recipe?.time?.cookTime;
  }
  if (recipe?.time?.prepTime) {
    totalTime =
      typeof totalTime === "number"
        ? totalTime + recipe?.time?.prepTime
        : recipe?.time?.prepTime;
  }
  if (typeof totalTime !== "number") {
    return false;
  }

  let formatedTime = totalTime / 60;
  let _formatedTime = totalTime % 60;
  // let cookTime = recipe.time.cookTime;
  // console.log("cookTime: ", cookTime);
  let timE = {
    hours:
      parseInt(formatedTime.toFixed()) > 0
        ? parseInt(formatedTime.toFixed())
        : null,
    minutes: _formatedTime !== 0 ? _formatedTime : null,
  };
  console.log("timE: ", timE);
  return {
    hours: parseInt(formatedTime.toFixed()) > 0 ? formatedTime.toFixed() : null,
    minutes: _formatedTime !== 0 ? _formatedTime : null,
  };
};

export const getFormattedTimeIndividual = (recipe) => {
  // let prepTime = recipe.time.prepTime;
  let _time = false;
  if (recipe?.time?.cookTime) {
    let cHours = recipe.time.cookTime / 60;
    let cMins = recipe.time.cookTime % 60;
    _time = {
      cookTime: {
        hours: parseInt(cHours.toFixed()) > 0 ? cHours.toFixed() : null,
        minutes: cMins !== 0 ? cMins : null,
      },
    };
  }
  if (recipe?.time?.prepTime) {
    let pHours = recipe.time.prepTime / 60;
    let pMins = recipe.time.prepTime % 60;
    _time = {
      ..._time,
      prepTime: {
        hours: parseInt(pHours.toFixed()) > 0 ? pHours.toFixed() : null,
        minutes: pMins !== 0 ? pMins : null,
      },
    };
  }
  return _time;
};
