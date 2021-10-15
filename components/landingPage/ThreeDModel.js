import React, { useEffect, useState, useRef, Suspense } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Html, useProgress } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import OBJLoader from './ObjLoader';
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animati
import { useLoader } from '@react-three/fiber'




const Model = () => {
    const [model, setModel] = useState(false)    
    const [animationState, setAnimationState] = useState(null)

    const group = useRef()
    useEffect(() => {
        // const loader = new GLTFLoader();
        const loader = new OBJLoader();
        loader.load("/assets/coffeeCup.obj", (cup) => {
            console.log('cup: lp', cup);
            // const nodes = obj
            setModel(cup)
        }, 
        // onProgress,
        //  onError
         )
        // loader.load("scene.gltf", async (gltf) => {
        //   const nodes = await gltf.parser.getDependencies("node");
        //   const animations = await gltf.parser.getDependencies("animation");
        //   setModel(nodes[0]);
        //   setAnimationState(animations);
        // });
      }, []);

      const {progress} = useProgress();
    //   const cupTexture = useLoader(TextureLoader, '/assets/uploads_files_830234_coffe.mtl')
    // <meshStandardMaterial map={cupTexture}/>

    return (
        <>
        {model ? (
            <group ref={group} position={[-20, 0, 0]} dispose={null}>
            <mesh>
            <primitive ref={group} name="Object_0" object={model} />
            </mesh>
          </group>
        ) : 
        <Html>Loading... {progress}</Html>
    }
    </>
    )
}

export default Model