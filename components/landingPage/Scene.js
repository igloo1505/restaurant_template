import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF("/scene.gltf");
	console.log("nodes: in Scene.js", nodes);
	useEffect(() => {
		let canvasWrapper = document
			.getElementById("mainCanvas")
			.getBoundingClientRect();
		console.log("canvasWrapper: ", canvasWrapper);
		// cameraRef.current.lookAt(group.current.position)
		// cameraRef.current.target.position.copy()
		Object.keys(nodes).forEach((n) => {
			console.log("nodes[n]: ", nodes[n]);
			if (nodes[n].isMesh) {
				let mesh = nodes[n];
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				// mesh.material.needsUpdate = true;
				// nodes[n].geometry.center(); // center here
			}
			if (nodes[n].type === "Object3D") {
				let geo = nodes[n];
				geo.scale.set(10, 10, 10);
				geo.position.set(0, 0, 0);
				// mesh.castShadow = true;
				// mesh.receiveShadow = true;
				// mesh.material.needsUpdate = true;
				// nodes[n].geometry.center(); // center here
			}
		});
	}, []);

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			scale={[10, 10, 10]}
			position={[0, 0, 0]}
		>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[0, 0, Math.PI / 4]}>
					<group rotation={[Math.PI / 2, 0, 0]}>
						<group
							position={[1.75, 0.03, 10.9]}
							rotation={[-Math.PI / 2, 0, 0]}
						>
							<mesh
								geometry={nodes.AM130_009_001_AM130_009_004_0.geometry}
								material={materials.AM130_009_004}
							/>
						</group>
						<group position={[4.2, 0.06, 8.68]} rotation={[-Math.PI / 2, 0, 0]}>
							<mesh
								geometry={nodes.AM130_009_002_AM130_009_001_0.geometry}
								material={nodes.AM130_009_002_AM130_009_001_0.material}
							/>
						</group>
						<group position={[4.2, 0.06, 8.68]} rotation={[-Math.PI / 2, 0, 0]}>
							<mesh
								geometry={nodes.AM130_009_003_AM130_009_004_0.geometry}
								material={materials.AM130_009_004_0}
							/>
						</group>
						<group position={[1.68, 2.4, 7.92]} rotation={[-Math.PI / 2, 0, 0]}>
							<mesh
								geometry={nodes.AM130_009_004_AM130_009_004_0.geometry}
								material={materials.AM130_009_004_1}
							/>
						</group>
						<group
							position={[1.75, 0.03, 10.9]}
							rotation={[-Math.PI / 2, 0, 0]}
						>
							<mesh
								geometry={nodes.AM130_009_005_AM130_009_001_0.geometry}
								material={nodes.AM130_009_005_AM130_009_001_0.material}
							/>
						</group>
						<group position={[1.68, 2.4, 7.92]} rotation={[-Math.PI / 2, 0, 0]}>
							<mesh
								geometry={nodes.AM130_009_006_AM130_009_001_0.geometry}
								material={nodes.AM130_009_006_AM130_009_001_0.material}
							/>
						</group>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/scene.gltf");
