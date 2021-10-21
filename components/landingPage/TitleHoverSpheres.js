/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {connect} from "react-redux"
import { useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import { ContactShadows } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { a as web } from "@react-spring/web";
import { useTheme } from "@material-ui/styles";
import { gsap } from "gsap";

const TitleHoverSpheres = ({cameraRef, canvasRef}) => {
	// let hoverSpheres = [];
    const [hasFoundTargets, setHasFoundTargets] = useState(false)
    const [targetPosition, setTargetPosition] = useState([])
    

    const setTargets = (cancel) => {
        let targets = document.getElementsByClassName("i-hover-target")
        let newTargets = []
        for(var i = 0; i < targets.length; i ++){
            let _t = targets[i]
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
		let targetPosition = [ pos.x, pos.y + 0.095, pos.z]
        console.log('targetPosition: target positions', targetPosition);
        // debugger
        newTargets.push(targetPosition)
        // setHasFoundTargets(true)
        // end
    }
    setTargetPosition(newTargets)
    if(newTargets.length !== 0){
        cancel()
    }
    }
    useEffect(() => {
            let _interval = setInterval(() => {
                setTargets(clearInt)
            })
            const clearInt = () => {
                clearInterval(_interval)
            }        
        // document.addEventListener("resize", () => {
        //     setTargets()
        // })
    }, []) 

	return (
		<>
        {targetPosition.map((t, i) => {
            console.log("Target!!!! hoverSpheres", t)
            // const ref = useRef()
            // refArray.push(ref)
            return (
                <>
                <three.mesh
                // ref={ref}
                receiveShadow
                castShadow
                scale={[5, 5, 5]}
                position={t}
                key={`titleHoverSphere-${i}`}
                // position={[0, 0.19, 0]}
                // {...sphereStyles}
                >
                <three.sphereGeometry attach="geometry" args={[0.005]} />
                <three.meshStandardMaterial
                attach="material"
                roughness={0.1}
                metalness={0}
                color={"#eb6010"}
                />
                </three.mesh>
                <ContactShadows rotation={[-Math.PI / 2, 0, 0]} opacity={0.95} width={1} height={1} blur={1} far={10} />
                </>
                )
        })}
		</>
	);
};



export default TitleHoverSpheres;
