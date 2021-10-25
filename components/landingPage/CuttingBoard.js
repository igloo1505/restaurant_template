/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { to, useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import store from "../../stateManagement/store";
import { ContactShadows } from "@react-three/drei";
import { a as web } from "@react-spring/web";
import { useTheme } from "@material-ui/styles";
import { gsap } from "gsap";

const sectionTwoRotation = [
	(Math.PI * 20) / 36,
	(-Math.PI * 1) / 36,
	(Math.PI * 102) / 36,
];

const Model = ({
	cameraRef,
	canvasRef,
	newShadowProps,
	setNewShadowProps,
	cuttingBoardRef: group,
	visibleSection,
}) => {
	const modelRef = useRef();
	const sphereRef = useRef();
	const [currentAnimations, setCurrentAnimations] = useState([]);
	const { nodes, materials } = useGLTF("/cuttingBoard.glb");
	const [newBoardPosition, setNewBoardPosition] = useState(
		visibleSection === 1 ? "alignTitle" : "demoLeft"
	);
	const [latestAlignedPosition, setLatestAlignedPosition] = useState(null);

	const clearAnimations = () => {
		currentAnimations.forEach((animation, index) => {
			console.log("animation: ", animation);
			if (typeof animation === undefined) {
				return;
			}
			animation?.kill();
			// animation.killAll();
			animation?.pause();
			// delete currentAnimations[Object.keys(currentAnimations)[index]];
			// animation?.remove();
		});
		console.log("currentAnimations: ", currentAnimations);
		// setCurrentAnimations({});
	};

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

	useEffect(() => {
		let dw = window?.innerWidth;
		if (!dw) {
			return;
		}
		clearAnimations();
		if (visibleSection === 2) {
			setNewBoardPosition("demoLeft");
		}
		if (visibleSection === 1) {
			// setNewBoardPosition("alignTitle");
			if (dw >= 1200) {
				console.log("Aligning top");
				setNewBoardPosition("alignTitle");
			}
			if (dw >= 750 && dw < 1200) {
				console.log("Aligning bottom");
				setNewBoardPosition("alignBottom");
			}
		}
	}, [visibleSection]);

	const wobbleBoard = () => {
		if (visibleSection !== 1) {
			clearAnimations();
			let _int = setInterval(() => {
				toggleItemPosition("demoLeft", cancelSetPosition);
			});
			const cancelSetPosition = () => {
				clearInterval(_int);
			};
			return;
		}
		let tl = gsap.timeline({
			yoyo: true,
			repeat: -1,
		});
		let _target = group?.current?.rotation;
		let clone = modelRef.current?.clone();
		if (!_target || !clone) {
			return;
		}
		modelRef.current.geometry.computeBoundingBox();
		let bBox = clone.geometry.boundingBox;
		let obSize = bBox.getSize(new THREE.Vector3());
		let _offset = (Math.tan(THREE.MathUtils.degToRad(6)) * obSize.y) / 2;
		console.log("d: angle offset target", _offset);
		// let wobbleOffset = {
		// 	p:
		// 	n:
		// }
		let _positionTarget = group?.current?.position;
		let otherTl = gsap.timeline({
			yoyo: true,
			repeat: -1,
		});
		if (_target) {
			tl.fromTo(
				_target,
				{
					duration: 1,
					x: 0,
				},
				{
					duration: 1,
					x: 0 + THREE.MathUtils.degToRad(6),
				}
			);
			tl.to(_target, {
				duration: 1,
				x: 0 + THREE.MathUtils.degToRad(0),
			});
			tl.to(_target, {
				duration: 1,
				x: 0 + THREE.MathUtils.degToRad(-6),
			});
			tl.to(_target, {
				duration: 1,
				x: 0 + THREE.MathUtils.degToRad(0),
			});
		}
		if (_positionTarget && latestAlignedPosition) {
			otherTl.fromTo(
				_positionTarget,
				{
					duration: 1,
					z: latestAlignedPosition.z,
				},
				{
					duration: 1,
					z: latestAlignedPosition.z - _offset,
				}
			);
			otherTl.to(_positionTarget, {
				duration: 1,
				z: latestAlignedPosition.z,
			});
			otherTl.to(_positionTarget, {
				duration: 1,
				z: latestAlignedPosition.z + _offset,
			});
			otherTl.to(_positionTarget, {
				duration: 1,
				z: latestAlignedPosition.z,
			});
		}

		let sphereTl = gsap.timeline({
			yoyo: true,
			repeat: -1,
			repeatDelay: 0.5,
		});
		let sphereMaterial = sphereRef?.current?.material.color;
		if (!sphereMaterial) {
			return;
		}
		// 212, 86, 14)
		// 0.83137255, 0.3372549, 0.05490196
		sphereTl.fromTo(
			sphereMaterial,
			{
				r: 0.83137255,
				g: 0.3372549,
				b: 0.05490196,
				duration: 0.35,
				onUpdateParams: [sphereMaterial.newColor],
			},
			{
				r: 1,
				g: 1,
				b: 1,
				// r: 0.83137255,
				// g: 0.3372549,
				// b: 0.05490196,
				duration: 0.35,
				onUpdateParams: [sphereMaterial.newColor],
			}
		);
		let sphereScaleTl = gsap.timeline({
			yoyo: true,
			repeat: -1,
			repeatDelay: 0.5,
		});
		let sphereScale = sphereRef.current.scale;
		console.log("sphereScale: ", sphereScale);
		sphereScaleTl.fromTo(
			sphereScale,
			{
				x: 1,
				y: 1,
				z: 1,
				duration: 0.35,
				onUpdate: (...self) => {
					console.log("this self", self);
				},
				onUpdateParams: [sphereMaterial.newColor],
			},
			{
				x: 0.6,
				y: 0.6,
				z: 0.6,
				duration: 0.35,
				onUpdateParams: [sphereMaterial.newColor],
			}
		);
		return {
			sphereScaleTl,
			tl,
			sphereTl,
			otherTl,
		};
	};

	const [UIstate, setUIstate] = useState(null);

	useEffect(() => {
		let dw = UIstate?.viewport?.width;
		if (dw >= 1200 && visibleSection === 1) {
			console.log("Aligning top");
			return setNewBoardPosition("alignTitle");
		}
		if (dw >= 750 && dw < 1200 && visibleSection === 1) {
			console.log("Aligning bottom");
			return setNewBoardPosition("alignBottom");
		}
	}, [UIstate]);

	const handleUIState = (isLoop) => {
		clearAnimations();
		let state = store.getState();
		if (UIstate?.UI?.viewport?.width !== state?.UI?.viewport?.width) {
			console.log("handling ui state target");
			let int = setInterval(() => {
				// setTargetPosition([])
				let nb = visibleSection === 1 ? newBoardPosition : "demoLeft";
				toggleItemPosition(nb, cancelInt);
			}, 200);
			const cancelInt = () => {};

			setTimeout(() => {
				clearInterval(int);
				clearAnimations();
				if (visibleSection === 1) {
					const wobbleWobble = wobbleBoard();
					if (wobbleWobble) {
						setCurrentAnimations([
							...currentAnimations,
							...Object.values(wobbleWobble),
						]);
					}
				}
				if (visibleSection !== 1) {
					if (!isLoop) {
						clearAnimations();
						handleUIState(true);
					}
				}
			}, 1500);
		}
		setUIstate(state.UI);
	};

	useEffect(() => {
		let unsubscribe = store.subscribe(handleUIState);
		return () => {
			unsubscribe();
		};
	}, []);

	const [styles, api] = useSpring(() => ({
		// position: [0, 0, 0],
		config: config.stiff,
	}));

	useEffect(() => {
		// if (newBoardPosition === "demoLeft") {
		// 	return cancelInterval();
		// }

		if (visibleSection !== 1) {
			clearAnimations();
		}
		let lookForTarget = setInterval(() => {
			toggleItemPosition(newBoardPosition, cancelInterval);
		});
		function cancelInterval() {
			clearInterval(lookForTarget);
			const wobbleWobble = wobbleBoard();
			// if (!wobbleWobble) {
			// 	debugger;
			// }
			if (wobbleWobble) {
				setCurrentAnimations([
					...currentAnimations,
					...Object.values(wobbleWobble),
				]);
			}
			if (visibleSection !== 1) {
				clearAnimations();
			}
		}
		// }
	}, [newBoardPosition]);

	const getVisibleBox = (z) => {
		if (!cameraRef?.current) {
			return;
		}
		console.log(
			"cameraRef.current.fov: visbox",
			cameraRef?.current?.fov,
			cameraRef?.current?.aspect,
			z,
			cameraRef?.current?.position.z
		);
		let _z = Math.abs(z - cameraRef.current.position.z) || z;
		console.log("_z: visbox", _z);
		var t = Math.tan(THREE.Math.degToRad(cameraRef.current.fov));
		var h = t * (_z / 2);
		console.log("h: visBox", h);
		var w = h * cameraRef.current.aspect;
		return new THREE.Box2(new THREE.Vector2(-w, h), new THREE.Vector2(w, -h));
	};

	const getDemoLeftPosition = () => {
		let scalePercentage = 40;
		let camera = cameraRef.current;
		let target = document
			.getElementById("hover-bottom-landing-page-target")
			?.getBoundingClientRect();
		// will probably have to toggle 240> with drawer here
		let _x = window.innerWidth / 4;
		let _y = window.innerHeight / 2;
		if (!target || !modelRef?.current) {
			return;
		}
		let clone = modelRef.current.clone();
		modelRef.current.geometry.computeBoundingBox();
		let bBox = clone.geometry.boundingBox;
		let obSize = bBox.getSize(new THREE.Vector3());
		console.log("obSize: ", obSize);
		var vec = new THREE.Vector3();
		var pos = new THREE.Vector3();
		vec.set(
			(_x / window.innerWidth) * 2 - 1,
			-(_y / window.innerHeight) * 2 + 1,
			clone.position.z
		);
		vec.unproject(camera);
		vec.sub(camera.position).normalize();
		var distance = -camera.position.z / vec.z;
		pos.copy(camera.position).add(vec.multiplyScalar(distance));
		setLatestAlignedPosition({
			x: pos.x,
			y: pos.y - obSize.y,
			z: pos.z,
		});
		return {
			x: pos.x,
			y: pos.y - (obSize.y * scalePercentage) / 100,
			z: pos.z,
		};
	};

	const getAlignBottomPosition = () => {
		let scalePercentage = 40;
		let camera = cameraRef.current;
		let target = document
			.getElementById("hover-bottom-landing-page-target")
			?.getBoundingClientRect();
		if (!target) {
			return;
		}
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
		setLatestAlignedPosition({
			x: pos.x,
			y: pos.y - obSize.y,
			z: pos.z,
		});
		return {
			x: pos.x,
			y: pos.y - (obSize.y * scalePercentage) / 100,
			z: pos.z,
		};
	};

	const getAlignTitlePosition = () => {
		console.log("Running get title position target");
		let scalePercentage = 67;

		// if (window.innerHeight < 900) {
		// 	scalePercentage = 40;
		// }
		// if (window.innerHeight < 700) {
		// 	scalePercentage = 30;
		// }
		let camera = cameraRef.current;
		let target = document
			.getElementById("dot-io-target")
			?.getBoundingClientRect();
		if (!target) {
			return;
		}
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
		setLatestAlignedPosition({
			x: pos.x,
			y: pos.y - (obSize.y * scalePercentage) / 100,
			z: pos.z,
		});
		return {
			x: pos.x,
			y: pos.y - (obSize.y * scalePercentage) / 100,
			z: pos.z,
		};
	};

	const toggleItemPosition = (transformation, cancel) => {
		if (!transformation && !newBoardPosition) {
			return;
		}
		if (!transformation) transformation = newBoardPosition;
		// debugger;
		let visBox = getVisibleBox(0.5);
		if (!visBox || !group?.current) {
			return;
		}
		let pValues = {
			topLeft: [visBox.min.x, visBox.min.y, 0],
			topRight: [visBox.max.x, visBox.min.y, 0],
			bottomLeft: [visBox.min.x, visBox.max.y, 0],
			bottomRight: [visBox.max.x, visBox.max.y, 0],
		};

		// let x = rendererRef.current.getObjectByName("cuttingBoard")
		let _bBox = new THREE.Box3()?.setFromObject(group.current);
		let obSize = _bBox?.getSize(new THREE.Vector3());
		let newPosition = pValues[transformation];
		let additionalStyles = {};
		if (visibleSection === 1) {
			additionalStyles.rotation = [0, 0, 0];
		}
		if (!obSize) {
			return;
		}
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
			additionalStyles.rotation = [0, 0, 0];
			additionalStyles.scale = [1.3, 1.3, 1.3];
			if (np) {
				cancel();
				newPosition = [np.x, np.y, np.z];
			}
		}
		if (transformation === "alignBottom") {
			let np = getAlignBottomPosition();
			additionalStyles.rotation = [0, 0, 0];
			additionalStyles.scale = [1.3, 1.3, 1.3];
			if (np) {
				cancel();
				newPosition = [np.x, np.y, np.z];
			}
		}
		if (transformation === "demoLeft") {
			let np = getDemoLeftPosition();
			if (np) {
				cancel();
				newPosition = [np.x, np.y, 0.75];
				additionalStyles.rotation = sectionTwoRotation;
				additionalStyles.scale = [2.9, 2.9, 2.9];
			}
		}
		let sending = {
			position: newPosition,
			...additionalStyles,
		};
		console.log("sending: ", sending, additionalStyles);
		api.start({
			position: newPosition,
			...additionalStyles,
		});
	};

	return (
		<three.group
			ref={group}
			dispose={null}
			// position={[0, 0, 0]}
			name="cuttingBoard"
			scale={[1.3, 1.3, 1.3]}
			castShadow
			receiveShadow
			// {...wobbleStyles}
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
				>
					<three.sphereGeometry attach="geometry" args={[0.005]} />
					<three.meshStandardMaterial
						attach="material"
						roughness={0.1}
						metalness={0}
					/>
				</three.mesh>
			)}
		</three.group>
	);
};

useGLTF.preload("/cuttingBoard.glb");

export default Model;
