const DisplayItemContent = ({ item, text, removeItem, name, classes }) => {
  console.log("item: ", item);
  const checkAmount = (amount, unit) => {
    if (parseFloat(amount) === 1) {
      if (unit.charAt(unit.length - 1).toLowerCase() === "s") {
        console.log("Did reach here");
        return unit.slice(0, unit.length - 1);
      }
      return unit;
    } else {
      return unit;
    }
  };
  switch (name) {
    case "ingredients":
      const {
        amount,
        optional,
        // I don't know why this causes an issue in the other cases but don't change this text: Text bit.
        text: Text,
        unit: { short: unitShort, long: unitLong },
      } = item;
      return (
        <div className={classes.text}>
          {Text.split(/\r?\n/).map((i) => (
            <span className={classes.textyText}>{i}</span>
          ))}
          <span className={classes["text-subtitle"]}>{`${amount} ${checkAmount(
            amount,
            unitLong
          )}`}</span>
        </div>
      );
    case "directions":
    default:
      return (
        <div className={classes.text}>
          {text.split(/\r?\n/).map((i) => (
            <span className={classes.textyText}>{i}</span>
          ))}
        </div>
      );
  }
};

export default DisplayItemContent;
