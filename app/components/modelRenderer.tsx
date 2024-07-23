import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type ModelProps = {
	modelPath: string;
};

const Model: React.FC<ModelProps> = ({ modelPath }) => {
	const modelRef = useRef<THREE.Group | null>(null);

	useEffect(() => {
		const loader = new GLTFLoader();

		loader.load(
			modelPath,
			(gltf) => {
				if (modelRef.current) {
					modelRef.current.add(gltf.scene);
				}
			},
			undefined,
			(error) => {
				console.error("An error occurred while loading the model:", error);
			}
		);
	}, [modelPath]);

	return <group ref={modelRef} />;
};

const ModelRenderer: React.FC<ModelProps> = ({ modelPath }) => {
	return (
		<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
			<ambientLight intensity={1} />

			<pointLight position={[-2, -2, -2]} intensity={10} />
			<pointLight position={[2, -2, -2]} intensity={10} />
			<pointLight position={[-2, -2, 2]} intensity={10} />
			<pointLight position={[2, -2, 2]} intensity={10} />
			
			<pointLight position={[-2, 2, -2]} intensity={10} />
			<pointLight position={[2, 2, -2]} intensity={10} />
			<pointLight position={[-2, 2, 2]} intensity={10} />
			<pointLight position={[2, 2, 2]} intensity={10} />

			<Model modelPath={modelPath} />
			
			<OrbitControls />
		</Canvas>
	);
};

export default ModelRenderer;