import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/mitts.glb')
  useEffect(() => {
    Object.keys(nodes).forEach((n) => {
        if ( nodes[n].isMesh ) {
          nodes[n].geometry.center(); // center here
        }
    });
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.CookingGloves_Teal_0.geometry} material={materials.Teal} />
          <group position={[16.75, 0, 0]}>
            <mesh geometry={nodes.CookingGloves1_Green_0.geometry} material={materials.Green} />
          </group>
          <group position={[-16.3, 0, 0]}>
            <mesh geometry={nodes.CookingGloves2_RedStars_0.geometry} material={materials.RedStars} />
          </group>
          <group position={[32.2, 0, 0]}>
            <mesh geometry={nodes.CookingGloves3_StraightRed_0.geometry} material={materials.StraightRed} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/mitts.glb')
