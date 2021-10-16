import React, { useEffect, useState, useRef, Suspense } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Html, useProgress } from "@react-three/drei";
import OBJLoader from "./ObjLoader";
import { a as three, config } from '@react-spring/three'
import { a as web } from '@react-spring/web';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useSpring } from "@react-spring/core";
import { Controls, useControl } from "react-three-gui";



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

	useEffect(() => {
		var mtlLoader = new MTLLoader();
		mtlLoader.load("/assets/coffeeCupTexture.mtl", function (materials) {
			console.log("materials: ", materials);
			materials.preload();
			var objLoader = new OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.load("/assets/coffeeCup.obj", function (object) {
				setModel(object);
			});
		});
	}, []);

    const [active, setActive] = useState(false)
	const [hovered, setHovered] = useState(false)
	const [shouldShift, setShouldShift] = useState(false)


	// interpolate values from commong spring
	// const scale = spring.to([0.5, 0.5], [1.0, 1.0]);
	// const scale = spring.to([0.8, 1.0], [1.0, 1.2])
	// const rotation = spring.to([0, 1], [0, Math.PI * 2]);
	// const color = spring.to([0, 1], ["#6246ea", "#e45858"]);
	
	const animStart = {
		['scale-z']: 0.7,
		['scale-x']: 0.7,
		['scale-y']: 0.7,
		rotation: [0, Math.PI * 1.23, 0],
		position: [-3, 1, 0]
	}
	const animFinish = {
		['scale-z']: 1,
		['scale-x']: 1,
		['scale-y']: 1,
		rotation: [0, Math.PI * 1.95, 0],
		position: [0, 0, 0]
	}
	
	const newSpring = useSpring({
		['scale-z']: shouldShift ? 0.7 :  1,
		['scale-x']: shouldShift ? 0.7 :  1,
		['scale-y']: shouldShift ? 0.7 :  1,
		rotation: shouldShift ? [0, Math.PI * 1.23, 0] :  [0, Math.PI * 1.95, 0],
		position: shouldShift ? [-3, 1, 0] :  [0, 0, 0]
	})
	
	console.log('newSpring: lp ', newSpring);

	return (
		<>
			{model ? (
				<three.group 
				ref={group} 
				dispose={null}
				onClick={() => setActive(!active)}
				// position={[0, -0.04, 0.41]}
				>
				<group 
				ref={group} 
				dispose={null} 
				onClick={() => setActive(!active)}
				// position={[0, 2.96, -0.13]} 
				// rotation={[Math.PI / 2, 0, 0]}
				>
					<three.mesh
						ref={mesh}
						{...newSpring}
						// {...modelProps}
						// rotation-y={[10, 0, 0]}
						// rotation={[0, Math.PI * 1.23, 0]}
						// // rotation={[0, Math.PI * 1.95, 0]}
						// position={[-3, 1, 0]}
						// scale-z={0.7}
						// scale-x={0.7}
						// scale-y={0.7}
						// style={styles}
					>
						<primitive ref={group} name="Object_0" object={model} 
						onPointerOver={(e) => (e.stopPropagation(), setHovered(true), setShouldShift(true))}
						onPointerOut={(e) => (setHovered(false), setShouldShift(false))}
						/>
						<three.meshStandardMaterial map={texture} />
					</three.mesh>
				</group>
				</three.group>
			) : (
				<Html>Loading... {progress}</Html>
			)}
		</>
	);
};

export default Model;
