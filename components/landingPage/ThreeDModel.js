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

function Extra() {
	const rotateX = useControl("Rotate X", {
		type: "number",
		group: GROUP,
		distance: 10,
		scrub: true,
		min: -Infinity,
		max: Infinity,
		spring: true,
	});
	const rotateY = useControl("Rotate Y", {
		type: "number",
		group: GROUP,
		distance: 10,
		scrub: true,
		min: -Infinity,
		max: Infinity,
		spring: true,
	});

	return (
		<a.mesh position={[1.5, 0, 0.5]} rotation-x={rotateX} rotation-y={rotateY}>
			<boxGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
			<a.meshStandardMaterial attach="material" color={0xffff00} />
		</a.mesh>
	);
}

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
	// const [styles, api] = useSpring(() => ({
	// 	from: { x: -50, opacity: 1 },
	//   }))
	
	//   useEffect(() => {
	// 	api({
	// 	  x: 50,
	// 	  opacity: 1,
	// 	  loop: { reverse: true },
	// 	})
	//   }, [])
	const styles= {}
	// const { spring } = useSpring({
	// 	spring: active,
	// 	// config: { mass: 1, tension: 400, friction: 250, precision: 0.0001 },
	// 	config: config.molasses
	// });

	const newSpring = useSpring()
	// interpolate values from commong spring
	// const scale = spring.to([0.5, 0.5], [1.0, 1.0]);
	// const scale = spring.to([0.8, 1.0], [1.0, 1.2])
	// const rotation = spring.to([0, 1], [0, Math.PI * 2]);
	// const color = spring.to([0, 1], ["#6246ea", "#e45858"]);


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
						// {...modelProps}
						// rotation-y={rotation}
						// scale-z={scale}
						// scale-x={scale}
						// scale-y={scale}
						// style={styles}
					>
						<primitive ref={group} name="Object_0" object={model} 
						onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
						onPointerOut={(e) => setHovered(false)}
						/>
						<three.meshStandardMaterial map={texture} />
					</three.mesh>
					{show && <Extra />}
				</group>
				</three.group>
			) : (
				<Html>Loading... {progress}</Html>
			)}
		</>
	);
};

export default Model;
