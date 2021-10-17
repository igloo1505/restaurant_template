/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, Suspense } from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { WebGLCheck } from "./webGLCheck";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { a, config } from "@react-spring/three";
import {
	TransformControls,
	Sky,
	OrbitControls,
	FlyControls,
	MapControls,
	PerspectiveCamera
} from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import DatGui from "./DatGui";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Controls, useControl, withControls } from "react-three-gui";
console.log("useLoader: lp", useLoader);
// import ObjLoader from './ObjLoader';
// import GUI_editor from './GUI_editor';
// import GREEN_APPLES from '../../public/assets/greenApples.OBJ';
import OBJLoader from "./ObjLoader";
import Radish from './Radish';
import CuttingBoard from './CuttingBoard';
import Mitts from './Mitts';

// const OBJLoader = dynamic(() => import('three/examples/jsm/loaders/OBJLoader').then((mod) => mod.OBJLoader), {
//     ssr: false,
// })

let objs = [
	"../../public/assets/greenApples.OBJ",
	"../../public/assets/coffeeCup.obj",
];


const canvasId = "mainCanvas";

const MainCanvas = ({
	viewport: { width: deviceWidth, height: deviceHeight, navHeight },
	props,
}) => {
	const [canvasTop, setCanvasTop] = useState("64px");
	

	useEffect(() => {
		setCanvasTop(`${navHeight}px`);
	}, [navHeight]);

	const [model, setModel] = useState(null);
	const mesh = useRef();

	const handlePropUpdate = (_update) => {
		// console.log('_update: ', _update);
	};
	const logStuff = () => {};

	const controlStyles = {
		width: "400px",
		height: "fit-content",
		minHeight: "300px",
		position: "absolute",
		top: "64px",
		right: "0px",
		// backgroundColor: "black",
	};

	const handleUpdate = (update) => {
		console.log("update: ", update);
	};

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
				id={canvasId}
				style={{
					width: "100%",
					height: "calc(60vh - 64px)",
					position: "absolute",
					top: 0,
					left: 0,
					border: "1px solid red",
				}}
				//    camera={{ position: [-10, 10, 10], fov: 35 }}
			>
				<Suspense fallback={null}>
				<PerspectiveCamera
				makeDefault 
				aspect={_aspectRatio} 
				fov={100} 
				near={1.1} 
				far={500} 
				ref={cameraRef}
				onWheel={handleScrollWheel}
				// rotateX={30}
				rotation={[-Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2), Math.abs(Math.PI * 0.2)]}
				position={[2, 2, 4]}
				// position={[4, 4, 4]}
				// position={[0, 0, 5]}
						/>
						
						<pointLight position={[50, 50, 50]} castShadow color={"#fff"}
						/>
						<TestModel />
						<OrbitControls/>
						<TransformControls/>
				</Suspense>
			</Canvas>
		</div>
	);
});



const TestModel = () => {

	const [scene, setScene] = useState(null)
	useEffect(() => {
		const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	// resource URL
	'/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		console.log('gltf: ', gltf);

		// scene.add( gltf.scene );
		setScene(gltf.scene)

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object
	},
	// called while loading is progressing
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