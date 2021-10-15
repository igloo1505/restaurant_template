/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import dynamic from "next/dynamic"
import { WebGLCheck } from './webGLCheck';
import { useLoader } from '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'
import ThreeDModel from './ThreeDModel';
console.log('useLoader: lp', useLoader);
// import ObjLoader from './ObjLoader';
// import GUI_editor from './GUI_editor';
// import GREEN_APPLES from '../../public/assets/greenApples.OBJ';
import OBJLoader from './ObjLoader';


// const OBJLoader = dynamic(() => import('three/examples/jsm/loaders/OBJLoader').then((mod) => mod.OBJLoader), {
//     ssr: false,
// })

let objs = [
    "../../public/assets/greenApples.OBJ",
    "../../public/assets/coffeeCup.obj",
]


console.log('OBJLoader: ', OBJLoader);


const MainCanvas = ({viewport: {width: deviceWidth, height: deviceHeight}, props}) => {
    
    const [model, setModel] = useState(null)
    const mesh = useRef()   

    // useEffect(() => {
    //         if(OBJLoader){
    //             console.log('LOADDDINGGGG: lp', OBJLoader);
    //             // console.log('GreenApples: lp', GreenApples);
    //             // const loader = OBJLoader();
    //             const GreenApples = useLoader(OBJLoader, "../../public/assets/coffeeCup.obj")
    //             debugger
    //             setModel(GreenApples)
    //         }
    //         // const GreenApples = (await import('../../public/assets/greenApples.OBJ'))
            
    //             }, [OBJLoader])
                
                // useEffect(() => {
                    //     if(WebGLCheck.isWebGLAvailable()){
                        //     setCanvas()
                        //     }
                        // }, [deviceHeight, deviceWidth]);
                        
                        const logStuff = () => {
                            // console.log('Loader: lp', Boolean(ObjLoader));
                            console.log('model: lp', model);
                            
                        }
                        

    return (
        <Canvas 
        id="mainCanvas" 
        style={{border: "1px solid red"}} 
        onClick={logStuff}
        colorManagement
        camera={{position: [0, 0, 50]}}
        >
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 0, 80]} castShadow/>
        <ThreeDModel/>
        </Canvas>
    )
}


const mapStateToProps = (state, props) => ({
    viewport: state.UI.viewport,
    props: props
});

export default connect(mapStateToProps)(MainCanvas)
