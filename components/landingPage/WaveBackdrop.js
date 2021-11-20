/* eslint-disable react/prop-types */
import React from "react";

const WaveBackdrop = ({ color, additionalStyles }) => {
	const styles = {
		position: "absolute",
		minWidth: "100vw",
		bottom: 0,
		left: 0,
		zIndex: "-1",
	};
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				style={{ ...styles, ...additionalStyles }}
			>
				<path
					fill={color ? color : "#227ce6"}
					fillOpacity="1"
					d="M0,160L21.8,154.7C43.6,149,87,139,131,112C174.5,85,218,43,262,69.3C305.5,96,349,192,393,229.3C436.4,267,480,245,524,229.3C567.3,213,611,203,655,197.3C698.2,192,742,192,785,192C829.1,192,873,192,916,197.3C960,203,1004,213,1047,186.7C1090.9,160,1135,96,1178,90.7C1221.8,85,1265,139,1309,154.7C1352.7,171,1396,149,1418,138.7L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
				></path>
			</svg>
		</>
	);
};

export default WaveBackdrop;