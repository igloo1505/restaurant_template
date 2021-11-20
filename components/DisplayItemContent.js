/* eslint-disable react/prop-types */
import React from "react";
import { getParsedValue } from "../util/appWideData";

const DisplayItemContent = ({ item, text, removeItem, name, classes }) => {
	const checkAmount = (amount, unit) => {
		if (parseFloat(amount) === 1) {
			if (unit.charAt(unit.length - 1).toLowerCase() === "s") {
				return unit.slice(0, unit.length - 1);
			}
			return unit;
		} else {
			return unit;
		}
	};
	switch (name) {
		case "ingredients": {
			let {
				amount,
				text: Text,
				unit: { short: unitShort, long: unitLong },
			} = item;
			return (
				<div className={classes.text}>
					{Text.split(/\r?\n/).map((i) => (
						<span className={classes.textyText} key={`${text}-${i}`}>
							{i}
						</span>
					))}
					<span className={classes["text-subtitle"]}>{`${getParsedValue(
						amount
					)} ${checkAmount(amount, unitLong)}`}</span>
				</div>
			);
		}
		case "ingredients-subRecipe": {
			let {
				amount: subRecipeAmount,
				optional: subRecipeOptional,
				ingredient: subRecipeText,
				unit: { short: subRecipeUnitShort, long: subRecipeUnitLong },
			} = item;
			return (
				<div className={classes.text}>
					{subRecipeText.split(/\r?\n/).map((i) => (
						<span className={classes.textyText} key={`${subRecipeText}-${i}`}>
							{i}
						</span>
					))}
					<span className={classes["text-subtitle"]}>{`${getParsedValue(
						subRecipeAmount
					)} ${checkAmount(subRecipeAmount, subRecipeUnitLong)}`}</span>
				</div>
			);
		}
		case "directions":
		default:
			return (
				<div className={classes.text}>
					{text.split(/\r?\n/).map((i, ind) => (
						<span
							className={classes.textyText}
							key={`form-item-direction-${ind}`}
						>
							{i}
						</span>
					))}
				</div>
			);
	}
};

export default DisplayItemContent;
