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
import {CameraHelper} from "three/src/helpers/CameraHelper"



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





const animationPhases = [
	{
		title: "initial",
		index: 0
	},
	{
		title: "firstScroll",
		index: 1
	},
	{
		title: "scrollToSecondSection",
		index: 2
	},
]


const Scene = withControls(() => {
	const cameraRef = useRef()
	const rayCaster = useRef()
	const canvasRef = useRef()
	const rendererRef = useRef()
	
	const [animationPhase, setAnimationPhase] = useState(animationPhases[0])
	
	const [_aspectRatio, setAspectRatio] = useState(1)
	useEffect(() => {
			let _canvas = document.getElementById("main-canvas-container");
			let ar = _canvas?.clientWidth / _canvas?.clientHeight;
			if(ar){
				setAspectRatio(ar)
			}
		// TODO call this on resize
	}, [])

	
	
	

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
				ref: rendererRef
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
					// backgroundColor: "#268AFF"
					backgroundColor: "transparent"
				}}
				//    camera={{ position: [-10, 10, 10], fov: 35 }}
			>
				<Suspense fallback={null}>
				<Camera cameraRef={cameraRef} _aspectRatio={_aspectRatio} rayCaster={rayCaster}/>
						<axesHelper args={[5]} />
						<Lights
						cameraRef={cameraRef}
						/>
						<CuttingBoard
						cameraRef={cameraRef}
						canvasRef={canvasRef}
						/>
          				<ContactShadows rotation-x={Math.PI / 2} position={[0, -0.4, 0]} opacity={0.65} width={10} height={10} blur={1.5} far={0.8} />

						<OrbitControls />
						<TransformControls />

				</Suspense>
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
		args={[100000, 100000]}
		// rotation={[-Math.PI, Math.PI / 2, 0]}
		// color="0xffffff"
		// // args={[1, 1, 2]}
		// {...props}
		/>
		<meshPhongMaterial 
		color="#268AFF"
		// color="#fff"
		depthWrite={false}
		/>
		</mesh>
		</>
	)
})



const Camera = ({cameraRef, rayCaster, _aspectRatio}) => {
	useHelper(cameraRef, CameraHelper, 1, 'hotpink')
	return (
		<PerspectiveCamera
		makeDefault 
		aspect={_aspectRatio} 
		fov={10}
		near={0.01} 
		far={50} 
		ref={cameraRef}
		raycaster={{
			ref: rayCaster
		}}
		// rotation={[-Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2)]}
		position={[0, 0, 10]}
		/>
	)
}


export default connect(mapStateToProps)(MainCanvas);