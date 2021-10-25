/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { to, useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import store from "../../stateManagement/store";
import { ContactShadows } from "@react-three/drei";
import { a as web } from "@react-spring/web";
import { useTheme } from "@material-ui/styles";
import { gsap } from "gsap";

export default function Model({ ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF("/mitts.glb");
	console.log("nodes: ", nodes);
	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.CookingGloves_Teal_0.geometry}
						material={materials.Teal}
					/>
					<group position={[16.75, 0, 0]}>
						<mesh
							geometry={nodes.CookingGloves1_Green_0.geometry}
							material={materials.Green}
						/>
					</group>
					<group position={[-16.3, 0, 0]}>
						<mesh
							geometry={nodes.CookingGloves2_RedStars_0.geometry}
							material={materials.RedStars}
						/>
					</group>
					<group position={[32.2, 0, 0]}>
						<mesh
							geometry={nodes.CookingGloves3_StraightRed_0.geometry}
							material={materials.StraightRed}
						/>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/mitts.glb");
