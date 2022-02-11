import React, { useEffect, useState, useRef, Suspense } from "react";

import * as THREE from "three";
import { Html, useProgress } from "@react-three/drei";
import OBJLoader from "./ObjLoader";
import { a as three, config } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useSpring } from "@react-spring/core";
import { Controls, useControl } from "react-three-gui";
// import Radish from './RadishCompressed';

const GROUP = "mainLandingModel";

const Model = ({ ...modelProps }) => {
	console.log("modelProps: ", modelProps);
	const [model, setModel] = useState(false);
	const [texture, setTexture] = useState(false);
	const [animationState, setAnimationState] = useState(null);
	const [show, setShow] = useState(false);
	const { progress } = useProgress();
	const mesh = useRef();

	const group = useRef();

	const [active, setActive] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [shouldShift, setShouldShift] = useState(false);

	const animStart = {
		["scale-z"]: 0.7,
		["scale-x"]: 0.7,
		["scale-y"]: 0.7,
		rotation: [0, Math.PI * 1.23, 0],
		position: [-3, 1, 0],
	};
	const animFinish = {
		["scale-z"]: 1,
		["scale-x"]: 1,
		["scale-y"]: 1,
		rotation: [0, Math.PI * 1.95, 0],
		position: [0, 0, 0],
	};

	const newSpring = useSpring({
		["scale-z"]: shouldShift ? 0.7 : 1,
		["scale-x"]: shouldShift ? 0.7 : 1,
		["scale-y"]: shouldShift ? 0.7 : 1,
		rotation: shouldShift ? [0, Math.PI * 1.23, 0] : [0, Math.PI * 1.95, 0],
		position: shouldShift ? [-3, 1, 0] : [0, 0, 0],
		config: config.stiff,
	});

	console.log("newSpring: lp ", newSpring);

	const handleModelClick = (e) => {
		setShouldShift(!shouldShift);
	};

	return (
		<>
			<three.group
				ref={group}
				dispose={null}
				onClick={() => setActive(!active)}
				// position={[0, -0.04, 0.41]}
			></three.group>
		</>
	);
};

export default Model;
