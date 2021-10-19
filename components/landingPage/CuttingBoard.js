/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";
import { useSpring } from '@react-spring/core';
import { a as three, config } from "@react-spring/three";
import { a as web } from "@react-spring/web";



const Model = ({ 
  cameraRef,
  canvasRef
 }) =>  {
  const group = useRef()
  const [boardIsExtended, setBoardIsExtended] = useState(false)
  const { nodes, materials } = useGLTF('/cuttingBoard.glb')
  useEffect(() => {
    let canvasWrapper = document.getElementById("mainCanvas").getBoundingClientRect()
    console.log('canvasWrapper: ', canvasWrapper);
    // cameraRef.current.lookAt(group.current.position)
    // cameraRef.current.target.position.copy()
    Object.keys(nodes).forEach((n) => {
        if ( nodes[n].isMesh ) {
          nodes[n].castShadow = true
          // nodes[n].geometry.center(); // center here
        }
    });
  }, [])



  const handleItemClick = (e) => {
    setBoardIsExtended(!boardIsExtended)
    // var vec = new THREE.Vector3(); // create once and reuse
    // var pos = new THREE.Vector3(); // create once and reuse

    // vec.set(
    //     ( e.clientX / window.innerWidth ) * 2 - 1,
    //     - ( e.clientY / window.innerHeight ) * 2 + 1,
    //     0.5 );
    
    // vec.unproject( cameraRef.current );
    
    // vec.sub( cameraRef.current.position ).normalize();
    
    // var distance = - cameraRef.current.position.z / vec.z;
    
    // pos.copy( cameraRef.current.position ).add( vec.multiplyScalar( distance ) );
    // console.log('pos: canvasWrapper', pos);
    // // requestAnimationFrame(animateBoard)
    // animateOnClick(pos)
  } 

  const styles = useSpring({
    // ["scale-z"]: boardIsExtended ? 1 : 0.7,
    // ["scale-x"]: boardIsExtended ? 1 : 0.7,
    // ["scale-y"]: boardIsExtended ? 1 : 0.7,
    rotation: boardIsExtended ? [-Math.PI * 17 / 36, Math.PI * 73 / 36, -Math.PI * 8 / 36] : [0, 0, 0],
    position: boardIsExtended ? [0, 0, 0] : [0, 0, -0.5],
    config: config.stiff,
  })
  // const animateOnClick = (vec) => {
  //   // styles.position
  //   api.start({position: vec})
  // }

  return (
    <three.group
     ref={group}
     dispose={null}
     position={[0,0,0]}
     onClick={handleItemClick}
     name="cuttingBoard"
     scale={[10, 10, 10]}
     castShadow
     >
      <three.group rotation={[-Math.PI / 2, 0, 0]} {...styles}>
        <mesh receiveShadow castShadow geometry={nodes.mesh_0.geometry} material={materials.Cutting_Board} />
      </three.group>
    </three.group>
  )
}


useGLTF.preload('/cuttingBoard.glb')


export default Model