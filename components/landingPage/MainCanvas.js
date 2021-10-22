/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const ADD_CONTROLS = false;

import React, {
	useEffect,
	createContext,
	forwardRef,
	useRef,
	useState,
	Suspense,
} from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { WebGLCheck } from "./webGLCheck";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useResource } from "react-three-fiber";
import * as THREE from "three";
import { a, config } from "@react-spring/three";
import {
	TransformControls,
	Sky,
	OrbitControls,
	FlyControls,
	MapControls,
	PerspectiveCamera,
	useHelper,
	ContactShadows,
	Environment,
	Plane,
	Billboard,
} from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import DatGui from "./DatGui";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Controls, useControl, withControls } from "react-three-gui";
import CuttingBoard from "./CuttingBoard";
import Mitts from "./Mitts";
import { DirectionalLightHelper } from "three/src/helpers/DirectionalLightHelper";
import { PlaneHelper } from "three/src/helpers/PlaneHelper";
import { SpotLightHelper } from "three/src/helpers/SpotLightHelper";
import { PointLightHelper } from "three/src/helpers/PointLightHelper";
import { CameraHelper } from "three/src/helpers/CameraHelper";
import TitleHoverSpheres from "./TitleHoverSpheres";
import { useRouter } from "next/router";

let objs = [
	"../../public/assets/greenApples.OBJ",
	"../../public/assets/coffeeCup.obj",
];

const canvasId = "mainCanvas";

const MainCanvas = ({
	viewport: { width: deviceWidth, height: deviceHeight, navHeight },
	props,
}) => {
	return (
		<Controls.Provider>
			<Scene deviceWidth={deviceWidth} />
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

const Scene = withControls(({ deviceWidth }) => {
	const cameraRef = useRef();
	const rayCaster = useRef();
	const canvasRef = useRef();
	const rendererRef = useRef();
	const router = useRouter();
	const [newShadowProps, setNewShadowProps] = useState({});

	const [animationPhase, setAnimationPhase] = useState(animationPhases[0]);

	const [_aspectRatio, setAspectRatio] = useState(1);
	useEffect(() => {
		router.prefetch("/portal")
		let _canvas = document.getElementById("main-canvas-container");
		let ar = _canvas?.clientWidth / _canvas?.clientHeight;

		let hoverListener = document.addEventListener("mousemove", (e) => {
			let dim = document
				.getElementById("landingPage-banner-signupButton")
				?.getBoundingClientRect();
				if(!dim){
					return
				}
			if (e.x > dim.left && e.x < dim.right) {
				if (e.y > dim.top && e.y < dim.bottom) {
					console.log("handle mouse movement now!!");
					return (document.body.style.cursor = "pointer");
				}
			}


			let loginDim = document
				.getElementById("landingPage-banner-loginButton")
				?.getBoundingClientRect();
				
				if(!loginDim){
					return
				}

			if (e.x > loginDim.left && e.x < loginDim.right) {
				if (e.y > loginDim.top && e.y < loginDim.bottom) {
					console.log("handle mouse movement now!!");
					return (document.body.style.cursor = "pointer");
				}
			}
			return (document.body.style.cursor = "default");
		});
		let clickListener = document.addEventListener("click", (e) => {
			let dim = document
				.getElementById("landingPage-banner-signupButton")
				?.getBoundingClientRect();
				let loginDim = document
				.getElementById("landingPage-banner-loginButton")
				?.getBoundingClientRect();
				if(!dim || !loginDim){
					return
				}
			console.log("Mouse movement", e.x, dim.left);
			if (e.x > dim.left && e.x < dim.right) {
				if (e.y > dim.top && e.y < dim.bottom) {
					console.log("handle mouse movement now!!");
					return router.push("/portal");
				}
			}
			if (e.x > loginDim.left && e.x < loginDim.right) {
				if (e.y > loginDim.top && e.y < loginDim.bottom) {
					console.log("handle mouse movement now!!");
					return router.push({
						pathname: "/portal",
						query: {login: true}
					});
				}
			}
			return (document.body.style.cursor = "default");
		});

		if (ar) {
			setAspectRatio(ar);
		}
		// TODO call this on resize
	}, []);

	return (
		<div className="mainCanvasContainer">
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
				// shadows={true}
				id={canvasId}
				style={{
					width: "100%",
					height: "calc(100vh - 64px)",
					minHeight: "calc(100vh - 64px)",
					maxHeight: "fit-content",
					position: "absolute",
					zIndex: 99999999,
					top: 0,
					left: 0,
					// backgroundColor: "#268AFF"
					backgroundColor: "transparent",
				}}
				//    camera={{ position: [-10, 10, 10], fov: 35 }}
			>
				<Suspense fallback={null}>
					<Camera
						cameraRef={cameraRef}
						_aspectRatio={_aspectRatio}
						rayCaster={rayCaster}
					/>
					<Billboard ponsition={[0, 0, -0.5]} receiveShadow />
					<Lights cameraRef={cameraRef} />
					<MainPlane cameraRef={cameraRef} />
					{deviceWidth > 1200 && (
						<CuttingBoard
							cameraRef={cameraRef}
							canvasRef={canvasRef}
							newShadowProps={newShadowProps}
							setNewShadowProps={setNewShadowProps}
						/>
					)}
					<TitleHoverSpheres
						cameraRef={cameraRef}
						canvasRef={canvasRef}
						rayCasterRef={rayCaster}
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
		</div>
	);
});

const Radish = () => {
	const [scene, setScene] = useState(null);
	useEffect(() => {
		const loader = new GLTFLoader();
		// Optional: Provide a DRACOLoader instance to decode compressed mesh data
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("/examples/js/libs/draco/");
		loader.setDRACOLoader(dracoLoader);
		// Load a glTF resource
		loader.load(
			"/scene.gltf",
			function (gltf) {
				setScene(gltf.scene);
			},

			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			// called when loading has errors
			function (error) {
				console.log("An error happened", error);
			}
		);
	}, []);
	const group = useRef();

	return (
		<>{scene && <primitive ref={group} name="Object_0" object={scene} />}</>
	);
};

const Lights = ({ cameraRef }) => {
	const lightRef = useRef();
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
