/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import { ContactShadows } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { a as web } from "@react-spring/web";
import { useTheme } from "@material-ui/styles";
import {gsap} from "gsap"

const Model = ({ cameraRef, canvasRef, newShadowProps, setNewShadowProps }) => {
	const group = useRef();
	const modelRef = useRef();
	const sphereRef = useRef();
	const [boardIsExtended, setBoardIsExtended] = useState(false);
	const { nodes, materials } = useGLTF("/cuttingBoard.glb");
	const [newBoardPosition, setNewBoardPosition] = useState("alignTitle");
	useEffect(() => {
		let canvasWrapper = document
			.getElementById("mainCanvas")
			.getBoundingClientRect();
		console.log("canvasWrapper: ", canvasWrapper);
		// cameraRef.current.lookAt(group.current.position)
		// cameraRef.current.target.position.copy()
		Object.keys(nodes).forEach((n) => {
			if (nodes[n].isMesh) {
				nodes[n].castShadow = true;
				// nodes[n].geometry.center(); // center here
			}
		});
	}, []);

	const [styles, api] = useSpring(() => ({
		// ["scale-z"]: boardIsExtended ? 1 : 0.7,
		// ["scale-x"]: boardIsExtended ? 1 : 0.7,
		// ["scale-y"]: boardIsExtended ? 1 : 0.7,
		rotation: boardIsExtended
			? [(-Math.PI * 17) / 36, (Math.PI * 73) / 36, (-Math.PI * 8) / 36]
			: [0, 0, 0],
		position: boardIsExtended ? [0, 0, 0.5] : [0, 0, 0],
		config: config.stiff,
	}));

	useEffect(() => {
			let lookForTarget = setInterval(() => {
				toggleItemPosition(newBoardPosition, cancelInterval)
			})
			const cancelInterval = () => {
				clearInterval(lookForTarget)	
			}
		// }
	}, [newBoardPosition, boardIsExtended]);

	const getVisibleBox = (z) => {
		console.log(
			"cameraRef.current.fov: visbox",
			cameraRef.current.fov,
			cameraRef.current.aspect,
			z,
			cameraRef.current.position.z
		);
		let _z = Math.abs(z - cameraRef.current.position.z) || z;
		console.log("_z: visbox", _z);
		var t = Math.tan(THREE.Math.degToRad(cameraRef.current.fov));
		var h = t * (_z / 2);
		console.log("h: visBox", h);
		var w = h * cameraRef.current.aspect;
		return new THREE.Box2(new THREE.Vector2(-w, h), new THREE.Vector2(w, -h));
	};

	const getAlignTitlePosition = () => {
		console.log("Running get title position target");
		const scalePercentage = 40;
		let camera = cameraRef.current;
		let target = document
			.getElementById("dot-io-target")
			.getBoundingClientRect();
		let clone = modelRef.current.clone();
		modelRef.current.geometry.computeBoundingBox();
		let bBox = clone.geometry.boundingBox;
		let obSize = bBox.getSize(new THREE.Vector3());
		console.log("obSize: ", obSize);

		var vec = new THREE.Vector3();
		var pos = new THREE.Vector3();
		vec.set(
			(target.x / window.innerWidth) * 2 - 1,
			-(target.y / window.innerHeight) * 2 + 1,
			clone.position.z
		);

		vec.unproject(camera);

		vec.sub(camera.position).normalize();

		var distance = -camera.position.z / vec.z;

		pos.copy(camera.position).add(vec.multiplyScalar(distance));
		return {
			x: pos.x,
			y: pos.y - (obSize.y * scalePercentage) / 100,
			z: pos.z,
		};
	};

	const toggleItemPosition = (transformation, cancel) => {
		if(!transformation) transformation = "alignTitle"
		
		let visBox = getVisibleBox(0.5);
		let pValues = {
			topLeft: [visBox.min.x, visBox.min.y, 0],
			topRight: [visBox.max.x, visBox.min.y, 0],
			bottomLeft: [visBox.min.x, visBox.max.y, 0],
			bottomRight: [visBox.max.x, visBox.max.y, 0],
		};
		// let x = rendererRef.current.getObjectByName("cuttingBoard")
		let _bBox = new THREE.Box3().setFromObject(group.current);
		let obSize = _bBox.getSize(new THREE.Vector3());
		let newPosition = pValues[transformation];

		if (transformation === "topLeft") {
			newPosition[0] = newPosition[0] + obSize.x / 2;
			newPosition[1] = newPosition[1] - obSize.y / 1.5;
		}
		if (transformation === "topRight") {
			newPosition[0] = newPosition[0] - obSize.x / 2;
			newPosition[1] = newPosition[1] - obSize.y / 1.5;
		}
		if (transformation === "bottomLeft") {
			newPosition[0] = newPosition[0] + obSize.x / 2;
			newPosition[1] = newPosition[1] + obSize.y / 1.5;
		}
		if (transformation === "bottomRight") {
			newPosition[0] = newPosition[0] - obSize.x / 2;
			newPosition[1] = newPosition[1] + obSize.y / 1.5;
		}
		if (transformation === "center") {
			newPosition = [0, 0, 0];
		}
		if (transformation === "alignTitle") {
			let np = getAlignTitlePosition();
			if(np){
				cancel()
			}
			newPosition = [np.x, np.y, np.z];
		}
		api.start({
			position: newPosition,
		});

	};

	const sphereStyles = useSpring({
		loop: true,
		to: [
			{ scale: [0.5, 0.5, 0.5], opacity: 0.7, color: "#fff" },
			{ scale: [1, 1, 1], opacity: 1, color: "#ed7028" },
			{ scale: [0.5, 0.5, 0.5], opacity: 0.7, color: "#fff" },
		],
		from: {
			scale: [0.5, 0.5, 0.5],
			opacity: 0.7,
			color: "#fff",
		},
		config: config.gentle,
	});



	const handleItemClick = (e) => {
		e.stopPropagation();
		setBoardIsExtended(!boardIsExtended);
		const arr = [
			"topLeft",
			"topRight",
			"bottomRight",
			"alignTitle",
			"bottomLeft",
			"center",
		];
		setNewBoardPosition(arr[arr.indexOf(newBoardPosition) + 1]);
	};

	return (
		<three.group
			ref={group}
			dispose={null}
			position={[0, 0, 0]}
			onClick={handleItemClick}
			name="cuttingBoard"
			scale={[1.3, 1.3, 1.3]}
			castShadow
			{...styles}
		>
			<three.group rotation={[0, 0, 0]}>
				<mesh
					receiveShadow
					castShadow
					geometry={nodes.mesh_0.geometry}
					material={materials.Cutting_Board}
					ref={modelRef}
				/>
			</three.group>
			{newBoardPosition && newBoardPosition === "alignTitle" && (
				<three.mesh
          			ref={sphereRef}
					receiveShadow
					castShadow
					scale={[1, 1, 1]}
					position={[0, 0.19, 0]}
					{...sphereStyles}
				>
					<three.sphereGeometry attach="geometry" args={[0.005]} />
					<three.meshStandardMaterial
						attach="material"
						roughness={0.1}
						metalness={0}
						color={sphereStyles.color}
					/>
				</three.mesh>
			)}
		</three.group>
	);
};

useGLTF.preload("/cuttingBoard.glb");

export default Model;
