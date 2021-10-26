/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const SecondWaveBackdrop = ({
	color,
	tintRightColor,
	tintLeftColor,
	additionalStyles,
	animId,
}) => {
	const [currentStyles, setCurrentStyles] = useState({
		_color: null,
		_tintRightColor: null,
		_tintLeftColor: null,
		_additionalStyles: null,
	});

	useEffect(() => {
		setCurrentStyles({
			_color: color,
			_tintRightColor: tintRightColor,
			_tintLeftColor: tintLeftColor,
			_additionalStyles: additionalStyles,
		});
	}, [color, tintRightColor, tintLeftColor, additionalStyles]);

	const styles = {
		position: "absolute",
		minWidth: "102vw",
		width: "100vw",
		bottom: 0,
		left: 0,
		zIndex: "-1",
	};

	return (
		<>
			<svg
				id="svg"
				viewBox="0 0 1440 400"
				xmlns="http://www.w3.org/2000/svg"
				style={{ ...styles, ...currentStyles._additionalStyles }}
			>
				<defs>
					<linearGradient id={`${animId}-gradient`}>
						{tintLeftColor && (
							<stop
								offset="10%"
								stopColor={`${currentStyles._tintLeftColor}`}
							/>
						)}
						<stop offset="50%" stopColor={`${currentStyles._color}`} />
						{tintRightColor && (
							<stop
								offset="90%"
								stopColor={`${currentStyles._tintRightColor}`}
							/>
						)}
					</linearGradient>
				</defs>
				<path
					d="M 0,400 C 0,400 0,200 0,200 C 53.17304860088366,223.35290868924892 106.34609720176732,246.7058173784978 164,222 C 221.65390279823268,197.2941826215022 283.7886597938144,124.52963917525773 353,125 C 422.2113402061856,125.47036082474227 498.4992636229749,199.1756259204713 561,242 C 623.5007363770251,284.8243740795287 672.2142857142857,296.7678571428571 737,268 C 801.7857142857143,239.23214285714286 882.6435935198822,169.75294550810014 933,167 C 983.3564064801178,164.24705449189986 1003.2113402061855,228.22036082474227 1050,251 C 1096.7886597938145,273.7796391752577 1170.5110456553757,255.3656111929308 1240,240 C 1309.4889543446243,224.6343888070692 1374.7444771723121,212.3171944035346 1440,200 C 1440,200 1440,400 1440,400 Z"
					stroke="none"
					strokeWidth="0"
					fillOpacity="1"
					fill={
						color
							? tintRightColor || tintLeftColor
								? `url(#${animId}-gradient)`
								: color
							: "#0099ff"
					}
				></path>
			</svg>
		</>
	);
};

export default SecondWaveBackdrop;
