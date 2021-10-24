/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const ADD_CONTROLS = false;

import {
	Billboard,
	OrbitControls,
	PerspectiveCamera,
	TransformControls,
	useContextBridge,
} from "@react-three/drei";
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
import OvenMitts from "./Mitts";
import Rad_ish from "./Scene";
import { config, useSpring } from "@react-spring/core";
import gsap from "gsap";

let objs = [
	"../../public/assets/greenApples.OBJ",
	"../../public/assets/coffeeCup.obj",
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

const animationPhases = [
	{
		title: "initial",
		index: 0,
	},
	{
		title: "firstScroll",
		index: 1,
	},
	{
		title: "scrollToSecondSection",
		index: 2,
	},
];

const Scene = withControls(({ deviceWidth, visibleSection }) => {
	const cameraRef = useRef();
	const rayCaster = useRef();
	const canvasRef = useRef();
	const rendererRef = useRef();
	const cuttingBoardRef = useRef();
	const router = useRouter();
	const [newShadowProps, setNewShadowProps] = useState({});
	// const ContextBridge = useContextBridge(ThemeContext, GreetingContext)

	const [_aspectRatio, setAspectRatio] = useState(1);

	useEffect(() => {
		router.prefetch("/portal");
		let _canvas = document.getElementById("main-canvas-container");
		let ar = _canvas?.clientWidth / _canvas?.clientHeight;

		if (ar) {
			// TODO call this on resize
			setAspectRatio(ar);
		}
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
						{Boolean(deviceWidth > 1200 || visibleSection === 2) && (
							<CuttingBoard
								cameraRef={cameraRef}
								canvasRef={canvasRef}
								cuttingBoardRef={cuttingBoardRef}
								newShadowProps={newShadowProps}
								setNewShadowProps={setNewShadowProps}
								visibleSection={visibleSection}
							/>
						)}
						{visibleSection === 2 && (
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
		let cb = cuttingBoardRef?.current;
		if (!cb) {
			return;
		}
		let cbPos = cb.position;
		let clone = scene?.clone();
		console.log("_clone: ", clone);
		console.log("_clone _scene: ", scene);
		// debugger;
		// clone.geometry?.computeBoundingBox();
		// let bBox = clone.geometry.boundingBox;
		// let obSize = bBox.getSize(new THREE.Vector3());
		// console.log("cb: ", cb, cbPos, obSize);

		scene.position.set(cbPos.x - 0.12, cbPos.y - 0.005, cbPos.z + 0.015);
		scene.castShadow = true;
		scene.receiveShadow = true;
		// scene.position.set(cbPos.x, cbPos.y+ obSize, cbPos.z);
		// return {
		// 	x: cbPos.x,
		// 	y: cbPos.y,
		// 	// y: cbPos.y + obSize,
		// 	z: cbPos.z,
		// };
		return scene;
	};

	const updatePosition = () => {
		let cb = cuttingBoardRef?.current;
		let scene = group.current;
		debugger;
		if (!cb || !scene) {
			return;
		}
		let cbPos = cb.position;
		let clone = scene?.clone();
		console.log("_clone: ", clone);
		console.log("_clone _scene: ", scene);
		// debugger;
		// clone.geometry?.computeBoundingBox();
		// let bBox = clone.geometry.boundingBox;
		// let obSize = bBox.getSize(new THREE.Vector3());
		// console.log("cb: ", cb, cbPos, obSize);
		debugger;
		scene.position.set(cbPos.x - 0.12, cbPos.y - 0.005, cbPos.z + 0.015);
		scene.castShadow = true;
		scene.receiveShadow = true;
	};

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
				console.log("An error happened", error);
			}
		);
		if (typeof window !== "undefined") {
			document.addEventListener("resize", () => {
				debugger;
				updatePosition();
			});
		}
	}, []);

	return (
		<>
			{scene && (
				<primitive
					ref={group}
					name="Object_0"
					object={scene}
					scale={[0.03, 0.03, 0.03]}
					// RESUME here... everything working ok up until here but it's 3:30am and I'm tired. Line this up after getting 3Dworld board position and set this to hover that... not the 2d equiveleant.
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
	const [intensitySpring, api] = useSpring(() => ({
		to: {
			intensity: 0.7,
		},
		from: {
			intensity: 0.0,
		},
		config: config.slow,
	}));

	const setIntensity = (ni) => {
		gsap.to(lightRef.current, {
			intensity: 1.5,
			ease: "back.out(1.2, 0.2)",
			duration: 1.5,
		});
	};
	useEffect(() => {
		if (visibleSection === 1) {
			setIntensity(0.7);
		}
		if (visibleSection === 2) {
			setIntensity(1.5);
		}
	}, [visibleSection]);

	// useHelper(lightRef, SpotLightHelper);
	return (
		<>
			<spotLight
				intensity={0.7}
				angle={0.1}
				penumbra={1}
				position={[2, 2, 20]}
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
