import React, { useEffect, useState, useRef, Suspense } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Html, useProgress } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {extend} from "@react-three/fiber"
import OBJLoader from './ObjLoader';
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animati
import { useLoader } from '@react-three/fiber'
import { a, config } from '@react-spring/three';
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader"
import { Controls, useControl } from 'react-three-gui';



function Extra() {
    const rotateX = useControl('Rotate X', {
      type: 'number',
      group: GROUP,
      distance: 10,
      scrub: true,
      min: -Infinity,
      max: Infinity,
      spring: true,
    });
    const rotateY = useControl('Rotate Y', {
      type: 'number',
      group: GROUP,
      distance: 10,
      scrub: true,
      min: -Infinity,
      max: Infinity,
      spring: true,
    });
    return (
      <a.mesh position={[1.5, 0, 0.5]} rotation-x={rotateX} rotation-y={rotateY}>
        <boxGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
        <a.meshStandardMaterial attach="material" color={0xffff00} />
      </a.mesh>
    );
  }

  const GROUP = "mainLandingModel"


const Model = ({modelProps}) => {
    const [model, setModel] = useState(false)    
    const [texture, setTexture] = useState(false)
    const [animationState, setAnimationState] = useState(null)
    const [show, setShow] = useState(false)
    const {progress} = useProgress();
    const mesh = useRef()
    
    
    useControl('Toggle cube', {
        group: GROUP,
        type: 'button',
        onClick: () => set(s => !s),
      });



    const group = useRef()
    useEffect(() => {
        var mtlLoader = new MTLLoader();
            mtlLoader.load('/assets/coffeeCupTexture.mtl', function(materials) {
                console.log('materials: ', materials);
              materials.preload();
              var objLoader = new OBJLoader();
              objLoader.setMaterials(materials);
              objLoader.load('/assets/coffeeCup.obj', function(object) {
                setModel(object)
              });
            });

    }, []);


    const posX = useControl('Pos X', { type: 'number', spring: true });
  const posY = useControl('Pos Y', {
    type: 'number',
    spring: config.wobbly,
  });
  const rotateXY = useControl('Rotation', { type: 'xypad', distance: Math.PI });
  const color = useControl('Material Color', { type: 'color' });


    
    return (
        <>
        {model ? (
            <group ref={group} position={[0, 0, 0]} dispose={null}>
                <mesh 
                ref={mesh}
                {...modelProps}
                rotation-x={rotateXY.x}
                // rotation-y={rotateXY.y}
                // position-x={posX}
                // position-y={posY}
                 >
                    <primitive ref={group} name="Object_0" object={model} />
                    <meshStandardMaterial map={texture}/>

                </mesh>
                {show && <Extra />}
            </group>
        ) : 
        <Html>Loading... {progress}</Html>
    }
    </>
    )
}

export default Model



















// var mtlLoader = new MTLLoader();
// mtlLoader.setPath('obj/male02/');
// mtlLoader.load('/assets/coffeeCupTexture.mtl', function(materials) {
//   materials.preload();
//   var objLoader = new OBJLoader();
//   objLoader.setMaterials(materials);
// //   objLoader.setPath('obj/male02/');
//   objLoader.load('/assets/coffeeCup.obj', function(object) {
//       console.log('object: ', object);
//     // object.position.y = -95;
//     // scene.add(object);
//     setModel(object)
//   });
// });