/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {connect} from "react-redux"
import { useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import { ContactShadows } from "@react-three/drei";
import store from '../../stateManagement/store';
import { useFrame } from "react-three-fiber";
import { a as web } from "@react-spring/web";
import { useTheme } from "@material-ui/styles";
import { gsap } from "gsap";

const TitleHoverSpheres = ({cameraRef, canvasRef}) => {
	// let hoverSpheres = [];
    const [hasFoundTargets, setHasFoundTargets] = useState(false)
    const [targetPosition, setTargetPosition] = useState([])
    const setTargets = (cancel, method) => {
        // let _width = window.innerWidth
        let _height = window.innerHeight

        let _scaleUp = 0.095
        
        if(_height < 1100){
                console.log('_height: ', _height);
                _scaleUp = 0.115
        }
        if(_height < 900){
                console.log('_height: ', _height);
                _scaleUp = 0.125
        }
        if(_height < 750){
                console.log('_height: ', _height);
                _scaleUp = 0.145
        }
        
        // if(_height < 1200)
        let targets = document.getElementsByClassName("i-hover-target")
        let newTargets = []
        for(var i = 0; i < targets.length; i ++){
            let _t = targets[i]
            let _hasColor = false
            _t.setAttribute("hasThreeHoveredEm", true)
            let target = _t.getBoundingClientRect()
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
		let targetPosition = [ pos.x, pos.y + _scaleUp, pos.z]
        console.log('targetPosition: target positions', targetPosition);
        // debugger 
        if(_t.classList.contains("white")){
            _hasColor = "white"
        }
        newTargets.push({position: targetPosition, hasColor: _hasColor})
        // setHasFoundTargets(true)
        // end
    }
    setTargetPosition(newTargets)
    if(newTargets.length !== 0){
        if(method !== "resize"){
            cancel()
        }
        if(method === "resize"){
            debugger
            console.log("Resize here target");
            setTimeout(() => {
                cancel()
            }, 1000)
        }
    }
    }

    const [UIstate, setUIstate] = useState(null)

    const handleUIState = () => {
        let state = store.getState()
        if(UIstate?.UI?.viewport?.width !== state?.UI?.viewport?.width){
            console.log("handling ui state target");
            let int = setInterval(() => {
                // setTargetPosition([])
                setTargets(cancelInt)
            }, 200)
            const cancelInt = () => {}
            setTimeout(() => {
                clearInterval(int)
            }, 1500);
        }
        setUIstate(state.UI)
    }


    useEffect(() => {
        let unsubscribe = store.subscribe(handleUIState)
        return () => {
            unsubscribe()
        }
    }, [])



    useEffect(() => {
        if(targetPosition.length === 0){
            let _interval = setInterval(() => {
                setTargets(clearInt)
            })
            const clearInt = () => {
                clearInterval(_interval)
            }        
        }
    }, [targetPosition]) 

	return (
		<>
        {targetPosition.map((t, i) => {
            console.log("Target!!!! hoverSpheres", t)
            return <HoverOrb t={t.position} hasColor={t.hasColor} i={i} key={`hover-orb-${i}`} UIState={UIstate} /> 
        })}
		</>
	);
};



export default TitleHoverSpheres;



const HoverOrb = ({t: targetPosition, i, UIState: UI, hasColor}) => {
    const ref = useRef()
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // state.camera.position.lerp(vec.set(0, 0, open ? -24 : -32), 0.1)
        // state.camera.lookAt(0, 0, 0)
        // let cp = d
        let np = {}
        np.y = THREE.MathUtils.lerp(targetPosition[1], ref.current.position.y + (Math.sin(t)) / 3, 0.02)
        np.z = THREE.MathUtils.lerp(targetPosition[2], ref.current.position.z + (Math.sin(t)) / 3, 0.05)
        // np.x
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, open ? Math.cos(t / 2) / 8 + 0.25 : 0, 0.1)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, open ? Math.sin(t / 4) / 4 : 0, 0.1)
        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, open ? Math.sin(t / 4) / 4 : 0, 0.1)
        ref.current.position.y = np.y
        ref.current.position.z = np.z
      })


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
        color={hasColor === "white" ? "#fff"  : "#eb6010"}
        />
        </three.mesh>
        <ContactShadows rotation={[-Math.PI / 2, 0, 0]} opacity={0.95} width={1} height={1} blur={1} far={10} />
        </>
        )
}