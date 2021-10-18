import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/cuttingBoard.glb')
  useEffect(() => {
    Object.keys(nodes).forEach((n) => {
        if ( nodes[n].isMesh ) {
          nodes[n].castShadow = true
          // nodes[n].geometry.center(); // center here
        }
    });
  }, [])
  console.log('materials: ', materials);
  return (
    <group ref={group} {...props} dispose={null} position={[0,0,0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh receiveShadow castShadow geometry={nodes.mesh_0.geometry} material={materials.Cutting_Board} />
      </group>
    </group>
  )
}

useGLTF.preload('/cuttingBoard.glb')
