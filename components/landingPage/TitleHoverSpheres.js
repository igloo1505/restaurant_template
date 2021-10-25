/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { connect } from "react-redux";
import { useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import { ContactShadows } from "@react-three/drei";
import store from "../../stateManagement/store";
import { useFrame } from "react-three-fiber";
import { a as web } from "@react-spring/web";
import { useTheme } from "@material-ui/styles";
import { gsap } from "gsap";
// import {useDrag} from "react-use-gesture"

const TitleHoverSpheres = ({
	cameraRef,
	canvasRef,
	visibleSection,
	shouldSetNewScale,
}) => {
	const [targetPosition, setTargetPosition] = useState([]);
	const setTargets = (cancel, method) => {
		let _scaleUp = 0.025;
		let targets = document.getElementsByClassName("i-hover-target");
		let newTargets = [];
		for (var i = 0; i < targets.length; i++) {
			let _t = targets[i];
			let _hasColor = false;
			_t.setAttribute("hasThreeHoveredEm", true);
			let target = _t.getBoundingClientRect();
			// start
			let camera = cameraRef.current;
			var vec = new THREE.Vector3();
			var pos = new THREE.Vector3();
			vec.set(
				(target.x / window.innerWidth) * 2 - 1,
				-(target.y / window.innerHeight) * 2 + 1,
				-1
			);
			vec.unproject(camera);
			vec.sub(camera.position).normalize();
			var distance = -camera.position.z / vec.z;
			pos.copy(camera.position).add(vec.multiplyScalar(distance));
			let targetPosition = [pos.x, pos.y + _scaleUp, pos.z];
			console.log("targetPosition: target positions", targetPosition);
			// debugger
			if (_t.classList.contains("white")) {
				_hasColor = "white";
			}
			newTargets.push({ position: targetPosition, hasColor: _hasColor });
			// setHasFoundTargets(true)
			// end
		}
		setTargetPosition(newTargets);
		if (newTargets.length !== 0) {
			if (method !== "resize") {
				cancel();
			}
			if (method === "resize") {
				setTimeout(() => {
					cancel();
				}, 1000);
			}
		}
	};

	const [UIstate, setUIstate] = useState(null);

	const handleUIState = (force) => {
		let state = store.getState();
		if (UIstate?.UI?.viewport?.width !== state?.UI?.viewport?.width || force) {
			console.log("handling ui state target");
			let int = setInterval(() => {
				// setTargetPosition([])
				setTargets(cancelInt);
			}, 200);
			const cancelInt = () => {};
			setTimeout(() => {
				clearInterval(int);
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

	useEffect(() => {
		if (targetPosition.length === 0) {
			let _interval = setInterval(() => {
				setTargets(clearInt);
			});
			const clearInt = () => {
				clearInterval(_interval);
			};
		}
	}, [targetPosition]);

	return (
		<>
			{targetPosition.map((t, i) => {
				console.log("Target!!!! hoverSpheres", t);
				return (
					<HoverOrb
						t={t.position}
						hasColor={t.hasColor}
						i={i}
						key={`hover-orb-${i}`}
						UIState={UIstate}
						visibleSection={visibleSection}
						handleUIState={handleUIState}
						shouldSetNewScale={shouldSetNewScale}
					/>
				);
			})}
		</>
	);
};

export default TitleHoverSpheres;

const HoverOrb = ({
	t: targetPosition,
	i,
	UIState: UI,
	hasColor,
	visibleSection,
	handleUIState,
	shouldSetNewScale: sns,
}) => {
	const ref = useRef();

	useEffect(() => {
		if (sns) {
			ref.current.scale.set(sns.x, sns.y, sns.z);
		}
	}, [sns]);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		let np = {};
		np.y = THREE.MathUtils.lerp(
			targetPosition[1],
			ref.current.position.y + Math.sin(t) / 3,
			0.02
		);
		np.z = THREE.MathUtils.lerp(
			targetPosition[2],
			ref.current.position.z + Math.sin(t) / 3,
			0.05
		);
		// np.x
		ref.current.rotation.x = THREE.MathUtils.lerp(
			ref.current.rotation.x,
			open ? Math.cos(t / 2) / 8 + 0.25 : 0,
			0.1
		);
		ref.current.rotation.y = THREE.MathUtils.lerp(
			ref.current.rotation.y,
			open ? Math.sin(t / 4) / 4 : 0,
			0.1
		);
		ref.current.rotation.z = THREE.MathUtils.lerp(
			ref.current.rotation.z,
			open ? Math.sin(t / 4) / 4 : 0,
			0.1
		);
		ref.current.position.y = np.y;
		ref.current.position.z = np.z;
	});
	const hideSphere = (ns) => {
		const _tl = gsap.timeline({ paused: true });
		let _target = ref.current.scale;
		// debugger;
		_tl.to(_target, {
			x: ns.x,
			y: ns.y,
			z: ns.z,
			duration: 0.5,
		});
		return _tl;
	};

	useEffect(() => {
		if (visibleSection === 2) {
			hideSphere({ x: 0, y: 0, z: 0 }).play();
		}
		if (visibleSection !== 2) {
			handleUIState(true);
			let s = hasColor === "white" ? 3 : 5;
			hideSphere({ x: s, y: s, z: s }).play();
		}
	}, [visibleSection]);

	return (
		<>
			<three.mesh
				ref={ref}
				receiveShadow
				castShadow
				scale={hasColor === "white" ? [3, 3, 3] : [5, 5, 5]}
				position={targetPosition}
				// position={[0, 0.19, 0]}
				// {...sphereStyles}
			>
				<three.sphereGeometry attach="geometry" args={[0.005]} />
				<three.meshStandardMaterial
					attach="material"
					roughness={0.1}
					metalness={0}
					color={hasColor === "white" ? "#fff" : "#eb6010"}
				/>
			</three.mesh>
			<ContactShadows
				rotation={[-Math.PI / 2, 0, 0]}
				opacity={0.95}
				width={1}
				height={1}
				blur={1}
				far={10}
			/>
		</>
	);
};
