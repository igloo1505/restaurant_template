/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect, forwardRef, useRef, useState, Suspense } from "react";
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
	Environment
} from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import DatGui from "./DatGui";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Controls, useControl, withControls } from "react-three-gui";
import CuttingBoard from './CuttingBoard';
import Mitts from './Mitts';
import { DirectionalLightHelper } from "three/src/helpers/DirectionalLightHelper";
import {PlaneHelper} from "three/src/helpers/PlaneHelper"



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
			<Scene />
		</Controls.Provider>
	);
};

const mapStateToProps = (state, props) => ({
	viewport: state.UI.viewport,
	props: props,
});

export default connect(mapStateToProps)(MainCanvas);




const Scene = withControls(() => {
	const cameraRef = useRef()
	
	const [_aspectRatio, setAspectRatio] = useState(1)
	useEffect(() => {
			let _canvas = document.getElementById("main-canvas-container");
			let ar = _canvas?.clientWidth / _canvas?.clientHeight;
			if(ar){
				setAspectRatio(ar)
			}
		// TODO call this on resize
	}, [])

	const rotateXY = useControl("Rotation", { type: "xypad", distance: Math.PI });


	const positionX = useControl("Pos X", { type: "number", value: 0 });
	const positionY = useControl("Pos Y", {
		type: "number",
		value: 0,
	});

	const logOrbitChange = (e) => {
		console.log("e: logOrbitChange lp", e);
	};
	const logTransformChange = (e) => {
		console.log("e: logTransformChange lp ", e);
	};

	const handleScrollWheel = (e) => {
		console.log('e: scroll wheel here lp', e);

	}

	return (
		<div className="mainCanvasContainer" id={canvasId}>
			<Canvas
				colorManagement
				dpr={[1, 2]}
				gl={{
				shadowMapEnabled: true,
				outputEncoding: THREE.sRGBEncoding,
				pixelRatio: window.devicePixelRatio
				}}
				// shadows={true}
				id={canvasId}
				style={{
					width: "100%",
					height: "calc(100vh - 64px)",
    				minHeight: "calc(100vh - 64px)",
    				maxHeight: "fit-content",
					position: "absolute",
					top: 0,
					left: 0,
				
				}}
				//    camera={{ position: [-10, 10, 10], fov: 35 }}
			>
				<Suspense fallback={null}>
				<PerspectiveCamera
				makeDefault 
				aspect={_aspectRatio} 
				fov={80} 
				near={0.01} 
				far={500} 
				ref={cameraRef}
				onWheel={handleScrollWheel}
				// rotateX={30}
				rotation={[-Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2)]}
				position={[0, 0, 3]}
				// position={[4, 4, 4]}
				// position={[0, 0, 5]}
						/>
						<axesHelper args={[5]} />
						<Lights
						cameraRef={cameraRef}
						/>
						<CuttingBoard 
						scale={[10, 10, 10]}
						castShadow
						position={[0, 0, 0]}
						/>
						<MainPlane
						// rotation={[-Math.PI / 2, 0, 0]}
						/>
						<Environment preset="city" />
						<OrbitControls 
						/>
						<TransformControls/>
				</Suspense>
				
				<ContactShadows
					opacity={1}
					width={1}
					height={1}
					blur={1}
					far={10}
					resolution={256}
				  />
			</Canvas>
		</div>
	);
});



const Radish = () => {

	const [scene, setScene] = useState(null)
	useEffect(() => {
		const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	'/scene.gltf',
	function ( gltf ) {
		setScene(gltf.scene)
	},
	
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened', error );
	}
);
	}, [])
	const group = useRef()

	return (
		<>
		{scene && <primitive
			ref={group}
			name="Object_0"
			object={scene}
			// onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
			// onPointerOut={(e) => setHovered(false)}
			onClick={() => console.log("Clicked")}
		/>}
		</>
	)
}






const Lights = ({cameraRef}) => {
	return (
		<>
		<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
		<ambientLight intensity={0.7} />
		</>
		)
}

const MainPlane = forwardRef((props, ref) => {
	const planeRef = useRef()
	return (
		<>
		<mesh 
		rotation={[-Math.PI / 2, 0, 0]}
		receiveShadow
		position={[0 , -0.25, 0]} 
		>
		<planeGeometry 
		args={[100, 100]}
		// rotation={[-Math.PI, Math.PI / 2, 0]}
		// color="0xffffff"
		// // args={[1, 1, 2]}
		// {...props}
		/>
		<meshPhongMaterial 
		// color="#268AFF"
		color="#fff"
		depthWrite={false}
		/>
		</mesh>
		</>
	)
})
