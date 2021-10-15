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
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader"




const Model = () => {
    const [model, setModel] = useState(false)    
    const [texture, setTexture] = useState(false)
    const [animationState, setAnimationState] = useState(null)

    const group = useRef()
    useEffect(() => {
        // const loader = new GLTFLoader();
        // const loader = new OBJLoader();
        // loader.load("/assets/coffeeCup.obj", (cup) => {
        //     setModel(cup)
        // }
        // )
        // const mtlLoader = new MTLLoader();
        // mtlLoader.load('/assets/coffeeCupTexture.mtl', (_t) => {
        //     _t.preload()
        //     console.log('_t: cup: ', _t);
        //     // setTexture(_t)
        // })
        var mtlLoader = new MTLLoader();
            // mtlLoader.setPath('obj/male02/');
            mtlLoader.load('/assets/coffeeCupTexture.mtl', function(materials) {
              materials.preload();
              var objLoader = new OBJLoader();
              objLoader.setMaterials(materials);
            //   objLoader.setPath('obj/male02/');
              objLoader.load('/assets/coffeeCup.obj', function(object) {
                // object.position.y = -95;
                // scene.add(object);
                setModel(object)
              });
            });

    }, []);

      const {progress} = useProgress();
    //   const cupTexture = useLoader(TextureLoader, '/assets/uploads_files_830234_coffe.mtl')
    
    return (
        <>
        {model ? (
            <group ref={group} position={[-20, 0, 0]} dispose={null}>
            <mesh>
            <primitive ref={group} name="Object_0" object={model} />
            <meshStandardMaterial map={texture}/>
            </mesh>
          </group>
        ) : 
        <Html>Loading... {progress}</Html>
    }
    </>
    )
}

export default Model