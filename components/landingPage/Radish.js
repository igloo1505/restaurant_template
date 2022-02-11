import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Spring } from "@react-spring/core";

const configs = {
	1: {},
	2: {},
};

export default function Model({ ...props }) {
	const group = useRef();
	const { nodes, materials } = useGLTF("/radish.glb");
	const handleAsyncTo = async (next, cancel) => {
		await next({ opacity: 1, color: "#ffaaee" });
		await next({ opacity: 0, color: "rgb(14,26,19)" });
	};

	return (
		<Spring>
			<group ref={group} {...props} dispose={null}>
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
							<group
								position={[4.2, 0.06, 8.68]}
								rotation={[-Math.PI / 2, 0, 0]}
							>
								<mesh
									geometry={nodes.AM130_009_002_AM130_009_001_0.geometry}
									material={nodes.AM130_009_002_AM130_009_001_0.material}
								/>
							</group>
							<group
								position={[4.2, 0.06, 8.68]}
								rotation={[-Math.PI / 2, 0, 0]}
							>
								<mesh
									geometry={nodes.AM130_009_003_AM130_009_004_0.geometry}
									material={materials.AM130_009_004_0}
								/>
							</group>
							<group
								position={[1.68, 2.4, 7.92]}
								rotation={[-Math.PI / 2, 0, 0]}
							>
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
							<group
								position={[1.68, 2.4, 7.92]}
								rotation={[-Math.PI / 2, 0, 0]}
							>
								<mesh
									geometry={nodes.AM130_009_006_AM130_009_001_0.geometry}
									material={nodes.AM130_009_006_AM130_009_001_0.material}
								/>
							</group>
						</group>
					</group>
				</group>
			</group>
		</Spring>
	);
}

useGLTF.preload("/radish.glb");
