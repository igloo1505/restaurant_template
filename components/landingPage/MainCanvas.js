/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { WebGLCheck } from "./webGLCheck";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
	TransformControls,
	Sky,
	OrbitControls,
	FlyControls,
	MapControls,
} from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import DatGui from "./DatGui";
import { Controls, useControl, withControls } from "react-three-gui";
console.log("useLoader: lp", useLoader);
// import ObjLoader from './ObjLoader';
// import GUI_editor from './GUI_editor';
// import GREEN_APPLES from '../../public/assets/greenApples.OBJ';
import OBJLoader from "./ObjLoader";

// const OBJLoader = dynamic(() => import('three/examples/jsm/loaders/OBJLoader').then((mod) => mod.OBJLoader), {
//     ssr: false,
// })

let objs = [
	"../../public/assets/greenApples.OBJ",
	"../../public/assets/coffeeCup.obj",
];

// <MapControls />
// <FlyControls />

console.log("OBJLoader: ", OBJLoader);

const MainCanvas = ({
	viewport: { width: deviceWidth, height: deviceHeight, navHeight },
	props,
}) => {
    const [canvasTop, setCanvasTop] = useState("64px")

    useEffect(() => {
        setCanvasTop(`${navHeight}px`)
    }, [navHeight])

    
    
	const [model, setModel] = useState(null);
	const mesh = useRef();


	const handlePropUpdate = (_update) => {};
	const logStuff = () => {
	};
    

	return (
		<Controls.Provider>
			<Scene />
			<Controls/>
		</Controls.Provider>
	);
};

const mapStateToProps = (state, props) => ({
	viewport: state.UI.viewport,
	props: props,
});

export default connect(mapStateToProps)(MainCanvas);

// <Canvas
//         id="mainCanvas"
//         style={{border: "1px solid red"}}
//         onClick={logStuff}
//         colorManagement
//         camera={{position: [5, 4, 10]}}
//         >

//         <OrbitControls />
//         <TransformControls />
//         <ambientLight intensity={0.2} />
//         <spotLight position={[-20, 20, 80]} castShadow/>
//         <ThreeDModel/>
//         </Canvas>


const Scene = withControls(() => {
	const [modelProps, setModelProps] = useState({
		castShadow: useControl('castShadow', { type: 'boolean', value: true }),
	});
        return (
        <Canvas
				id="mainCanvas"
                style={{ width: "60%", height: "calc(60vh - 64px)", position: "absolute", top: "64px", left: 0, border: "1px solid red" }}
			>
				<OrbitControls />
				<TransformControls />
				<ambientLight intensity={0.2} />
				<spotLight position={[-20, 20, 80]} castShadow />
				<ThreeDModel modelProps={modelProps} />
			</Canvas>
    )
})