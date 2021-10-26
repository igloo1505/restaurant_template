/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
	Billboard,
	OrbitControls,
	PerspectiveCamera,
	TransformControls,
	useHelper,
} from "@react-three/drei";
import { SpotLightHelper } from "three/src/helpers/SpotLightHelper";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/router";
import React, {
	forwardRef,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
import { connect } from "react-redux";
import { Controls, withControls } from "react-three-gui";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import CuttingBoard from "./CuttingBoard";
import TitleHoverSpheres from "./TitleHoverSpheres";
import ClientSidePortal from "../portalAuthenticated/ClientSidePortal";
import { config, useSpring } from "@react-spring/core";
import gsap from "gsap";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";

const ADD_CONTROLS = false;

const hoverTargetIds = [
	{
		id: "landingPage-banner-loginButton",
		action: (router) => {
			router.push("/portal");
		},
	},
	{
		id: "landingPage-banner-signupButton",
		action: (router) => {
			router.push({
				pathname: "/portal",
				query: {
					signup: true,
				},
			});
		},
	},
];

const canvasId = "mainCanvas";

const MainCanvas = ({
	viewport: { width: deviceWidth, height: deviceHeight, navHeight },
	props: { visibleSection },
}) => {
	// console.log("visibleSection_props: ", props);

	return (
		<Controls.Provider>
			<Scene deviceWidth={deviceWidth} visibleSection={visibleSection} />
		</Controls.Provider>
	);
};

const mapStateToProps = (state, props) => ({
	viewport: state.UI.viewport,
	props: props,
});

const Scene = withControls(({ deviceWidth, visibleSection }) => {
	const cameraRef = useRef();
	const rayCaster = useRef();
	const canvasRef = useRef();
	const rendererRef = useRef();
	const cuttingBoardRef = useRef();
	const router = useRouter();
	const [newShadowProps, setNewShadowProps] = useState({});
	// const ContextBridge = useContextBridge(ThemeContext, GreetingContext)

	const getHoverPositions = () => {
		let newTargets = [];
		hoverTargetIds.forEach((hti) => {
			let tar = document.getElementById(hti.id)?.getBoundingClientRect();
			tar && newTargets.push({ target: tar, id: hti.id, action: hti.action });
		});
		return newTargets;
	};
	// RESUME
	const checkHoverPositions = (e) => {
		let hoverTargets = getHoverPositions();
		console.log("e: checkhoverPosition", e, hoverTargets);
		// debugger;
		if (!hoverTargets) return;
		let currentHoveredTargets = hoverTargets.filter(
			(ht) =>
				e.clientX > ht.target.left &&
				e.clientX < ht.target.right &&
				e.clientY > ht.target.top &&
				e.clientY < ht.target.bottom
		);
		currentHoveredTargets.length > 0
			? (document.body.style.cursor = "pointer")
			: (document.body.style.cursor = "default");
		return currentHoveredTargets;
	};

	const [_aspectRatio, setAspectRatio] = useState(1);

	const setAR = () => {
		let _canvas = document.getElementById("main-canvas-container");
		let ar = _canvas?.clientWidth / _canvas?.clientHeight;
		if (ar) {
			setAspectRatio(ar);
		}
		document.addEventListener("resize", setAR);
	};

	useEffect(() => {
		router.prefetch("/portal");
		setAR();
		window.addEventListener("mousemove", (e) => {
			checkHoverPositions(e);
		});
		window.addEventListener("click", (e) => {
			let hovered = checkHoverPositions(e);
			if (hovered.length > 0) {
				hovered[0].action(router);
				debugger;
			}
		});
	}, []);

	return (
		<div className="mainCanvasContainer">
			<ClientSidePortal selector="#topLevelPortalContainer">
				<Canvas
					colorManagement
					dpr={[1, 2]}
					ref={canvasRef}
					gl={{
						shadowMapEnabled: true,
						"shadowMap.type": THREE.PCFSoftShadowMap,
						outputEncoding: THREE.sRGBEncoding,
						pixelRatio: window.devicePixelRatio,
						alpha: true,
						ref: rendererRef,
					}}
					id={canvasId}
					style={{
						width: "100vw",
						height: "calc(100vh)",
						minHeight: "calc(100vh)",
						maxHeight: "fit-content",
						position: "absolute",
						zIndex: 99999999,
						top: 0,
						left: 0,
						backgroundColor: "transparent",
					}}
				>
					<Suspense fallback={null}>
						<Camera
							cameraRef={cameraRef}
							_aspectRatio={_aspectRatio}
							rayCaster={rayCaster}
						/>
						<Billboard ponsition={[0, 0, -0.5]} receiveShadow />
						<Lights cameraRef={cameraRef} visibleSection={visibleSection} />
						<MainPlane cameraRef={cameraRef} />
						{Boolean(deviceWidth > 1200 || visibleSection === 2) &&
							!isMobile && (
								<CuttingBoard
									cameraRef={cameraRef}
									canvasRef={canvasRef}
									cuttingBoardRef={cuttingBoardRef}
									newShadowProps={newShadowProps}
									setNewShadowProps={setNewShadowProps}
									visibleSection={visibleSection}
								/>
							)}
						{!isMobile && (
							<Radish
								cameraRef={cameraRef}
								canvasRef={canvasRef}
								cuttingBoardRef={cuttingBoardRef}
								newShadowProps={newShadowProps}
								setNewShadowProps={setNewShadowProps}
								visibleSection={visibleSection}
							/>
						)}

						<TitleHoverSpheres
							cameraRef={cameraRef}
							canvasRef={canvasRef}
							rayCasterRef={rayCaster}
							visibleSection={visibleSection}
						/>
						{ADD_CONTROLS && (
							<>
								<OrbitControls />
								<TransformControls />
								<axesHelper args={[5]} />
							</>
						)}
					</Suspense>
				</Canvas>
			</ClientSidePortal>
		</div>
	);
});

const Radish = ({
	cameraRef,
	canvasRef,
	cuttingBoardRef,
	newShadowProps,
	setNewShadowProps,
	visibleSection,
}) => {
	const [scene, setScene] = useState(null);
	const group = useRef();
	const getRadishPosition = (scene) => {
		scene.traverse((child) => {
			console.log("child: ", child);
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
		let cb = cuttingBoardRef?.current;
		if (!cb) {
			return;
		}
		let cbPos = cb.position;
		let clone = scene?.clone();
		console.log("_clone: ", clone);
		console.log("_clone _scene: ", scene);
		scene.position.set(cbPos.x - 0.12, cbPos.y - 0.005, cbPos.z + 0.015);
		scene.castShadow = true;
		scene.receiveShadow = true;
		return scene;
	};

	const positionAnimation = (newPosition, newScale, opt) => {
		let model = group.current;
		if (!model) {
			return;
		}
		newPosition &&
			gsap.to(model.position, {
				x: newPosition.x,
				y: newPosition.y,
				z: newPosition.z,
				duration: opt?.duration || 1,
			});
		newScale &&
			gsap.to(model.scale, {
				x: newScale.x,
				y: newScale.y,
				z: newScale.z,
				duration: opt?.duration || 1,
			});
	};

	const updatePosition = () => {
		let cb = cuttingBoardRef?.current;
		let scene = group.current;
		// debugger;
		if (!cb || !scene) {
			return;
		}
		if (visibleSection === 1) {
			let _scaleUp = 0.025;
			let targets = document.getElementsByClassName("i-hover-target");
			let newTargets = [];
			for (var i = 0; i < targets.length; i++) {
				let _t = targets[i];
				let _hasColor = false;
				let target = _t.getBoundingClientRect();
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
				if (_t.classList.contains("white")) {
					_hasColor = "white";
				}
				newTargets.push({ position: targetPosition, hasColor: _hasColor });
			}

			console.log("newTargets: ", newTargets);
			if (newTargets.length === 0) {
				return;
			}
			let _x = newTargets[0].position[0];
			// BUG: set this to zero after transition is handled obviously.
			newTargets[1] && (_x = (_x + newTargets[1].position[0]) / 2);
			positionAnimation(
				{
					x: _x,
					y: newTargets[1].position[1],
					z: newTargets[1].position[2],
				},
				{
					x: 0,
					y: 0,
					z: 0,
				},
				{
					duration: 0.2,
				}
			);
			scene.castShadow = false;
			scene.receiveShadow = false;
		}

		if (visibleSection === 2) {
			let cbPos = cb.position;
			// scene.scale.set(0.03, 0.03, 0.03);
			// scene.position.set(cbPos.x - 0.12, cbPos.y - 0.005, cbPos.z + 0.015);
			positionAnimation(
				{
					x: cbPos.x - 0.12,
					y: cbPos.y - 0.005,
					z: cbPos.z + 0.015,
				},
				{
					x: 0.03,
					y: 0.03,
					z: 0.03,
				},
				{
					duration: 0.2,
				}
			);
			scene.castShadow = true;
			scene.receiveShadow = true;
		}
	};

	useEffect(() => {
		if (visibleSection === 2) {
			// Remove this timeout or adjust accordingly when sphere animation is finished.
			return setTimeout(() => {
				updatePosition();
			}, 1000);
		}
		if (visibleSection !== 2) {
			updatePosition({ p: visibleSection });
		}
	}, [visibleSection]);

	useEffect(() => {
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("/examples/js/libs/draco/");
		loader.setDRACOLoader(dracoLoader);
		loader.load(
			"/scene.gltf",
			(gltf) => {
				let _scene = gltf.scene;
				let Scene = getRadishPosition(gltf.scene);
				console.log("_scene: ", _scene, Scene);
				setScene(Scene);
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error) => {
				console.error("An error happened", error);
			}
		);
		window.addEventListener("resize", () => {
			updatePosition();
		});
	}, []);

	return (
		<>
			{scene && (
				<primitive
					ref={group}
					name="Object_0"
					object={scene}
					scale={[0, 0, 0]}
					// position={[-0.7, -0.03, 5.5]}
					castShadow
					receiveShadow
				/>
			)}
		</>
	);
};

const Lights = ({ cameraRef, visibleSection }) => {
	const lightRef = useRef();

	const setIntensity = (ni, dur) => {
		gsap.to(lightRef.current, {
			intensity: ni,
			ease: "back.out(1.2, 0.2)",
			duration: dur || 1.5,
		});
	};
	const setPosition = (np, dur) => {
		gsap.to(lightRef.current.position, {
			x: np.x,
			y: np.y,
			z: np.z,
			ease: "back.out(1.2, 0.2)",
			duration: dur || 1.5,
		});
	};
	useEffect(() => {
		if (visibleSection === 1) {
			let dw = window?.innerWidth;
			if (dw < 1200) {
				setPosition({
					x: 1,
					y: 2,
					z: 20,
				});
			}
			if (dw > 1200) {
				setPosition({
					x: 0.35,
					y: 0.5,
					z: 10,
				});
			}
			setIntensity(0.7);
		}
		if (visibleSection === 2) {
			setPosition({
				x: 1,
				y: 1,
				z: 10,
			});
			setTimeout(() => {
				setIntensity(1.5, 3);
			}, 1000);
		}
	}, [visibleSection]);

	// step one 1? position={[0.35, 0.5, 5]}

	ADD_CONTROLS && useHelper(lightRef, SpotLightHelper);
	return (
		<>
			<spotLight
				intensity={0.7}
				angle={0.1}
				penumbra={1}
				position={[0.35, 0.5, 5]}
				// position={[1, 1, 10]}
				castShadow
				ref={lightRef}
				shadowDarkness={0.8}
			/>
			<ambientLight intensity={0.5} />
		</>
	);
};

const MainPlane = forwardRef((props, ref) => {
	const planeRef = useRef();
	// useHelper(planeRef, PlaneHelper);
	return (
		<>
			<Billboard
				receiveShadow
				follow={true}
				lockX={true}
				lockY={true}
				lockZ={true}
				position={[0, 0, -0.25]}
				color="transparent"
				ref={planeRef}
			>
				<mesh
					receiveShadow
					position={[0, -0.01, 0]}
					rotation={[0, 0, 0]}
					visible
					// material={new THREE.MeshBasicMaterial( { color: "green", transparent: true, opacity: 1} )}
					material={new THREE.ShadowMaterial({ opacity: 0.25 })}
					geometry={new THREE.PlaneGeometry(10, 10)}
				></mesh>
			</Billboard>
		</>
	);
});

const Camera = ({ cameraRef, rayCaster, _aspectRatio }) => {
	// useHelper(cameraRef, CameraHelper, 1, "hotpink");
	return (
		<PerspectiveCamera
			makeDefault
			aspect={_aspectRatio}
			fov={10}
			near={0.01}
			far={50}
			ref={cameraRef}
			raycaster={{
				ref: rayCaster,
			}}
			// rotation={[-Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2)]}
			position={[0, 0, 10]}
		/>
	);
};

export default connect(mapStateToProps)(MainCanvas);
