import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { message } from "antd";

interface ModelProps {
	modelName: string;
	onError?: (message: string) => void;
};

const Model: React.FC<ModelProps> = ({ modelName, onError }) => {
	const modelRef = useRef<THREE.Group | null>(null);

	useEffect(() => {
		if (!modelName) return;

		console.log(modelName);

		const loader = new GLTFLoader();

		loader.load(
			`/models/${modelName}`,
			(gltf) => {
				if (modelRef.current) {
					modelRef.current.add(gltf.scene);
				}
			},
			undefined,
			() => {
				onError?.("An error occurred while loading the model");
			}
		);
	}, [modelName]);

	return <group ref={modelRef} />;
};

const ModelRenderer: React.FC<ModelProps> = ({ modelName }) => {
	const [messageAPI, contextHolder] = message.useMessage();

	const showError = (content: string) => {
		messageAPI.open({
			type: "error",
			content: content,
		});
	};

	return (
		<>
			{contextHolder}
			<Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{background: "rgb(220, 220, 220)"}}>
				<ambientLight intensity={1} />

				<pointLight position={[-2, -2, -2]} intensity={10} />
				<pointLight position={[2, -2, -2]} intensity={10} />
				<pointLight position={[-2, -2, 2]} intensity={10} />
				<pointLight position={[2, -2, 2]} intensity={10} />

				<pointLight position={[-2, 2, -2]} intensity={10} />
				<pointLight position={[2, 2, -2]} intensity={10} />
				<pointLight position={[-2, 2, 2]} intensity={10} />
				<pointLight position={[2, 2, 2]} intensity={10} />

				<Model modelName={modelName} onError={showError} />

				<OrbitControls />
			</Canvas>
		</>
	);
};

export default ModelRenderer;

// import React, { useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { message } from "antd";

// //	Type declaration
// interface ModelProps {
// 	modelName?: string;
// }

// //	Component declaration
// const ModelRenderer: React.FC<ModelProps> = ({ modelName }) => {
// 	const modelRef = useRef<THREE.Group | null>(null);
// 	const [messageAPI, contextHolder] = message.useMessage();

// 	const showError = (content: string) => {
// 		messageAPI.open({
// 			type: "error",
// 			content: content,
// 		});
// 	};

// 	useEffect(() => {
// 		console.log('Ref: %s', modelRef.current);
// 		console.log(`Model: ${modelName}`);

// 		if (!modelName) return;

// 		const loadNewModel = () => {
// 			//	Remove all objects from scene
// 			if (modelRef.current) while (modelRef.current.children.length > 0) modelRef.current.remove(modelRef.current.children[0]);

// 			//	Load new model
// 			const loader = new GLTFLoader();

// 			loader.load(
// 				`\\models\\${modelName}`,
// 				(gltf) => {
// 					if (modelRef.current) modelRef.current.add(gltf.scene);
// 				},
// 				undefined,
// 				() => {
// 					showError("Failed to load the provided model. Check for spelling.");
// 				}
// 			);
// 		};

// 		loadNewModel();
// 		console.log('Ref: %s', modelRef.current);
// 	}, [modelName]);

// 	return (
// 		<>
// 			{contextHolder}
// 			<Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "rgb(220, 220, 220)" }}>
// 				<ambientLight intensity={1} />

// 				<pointLight position={[-2, -2, -2]} intensity={10} />
// 				<pointLight position={[2, -2, -2]} intensity={10} />
// 				<pointLight position={[-2, -2, 2]} intensity={10} />
// 				<pointLight position={[2, -2, 2]} intensity={10} />

// 				<pointLight position={[-2, 2, -2]} intensity={10} />
// 				<pointLight position={[2, 2, -2]} intensity={10} />
// 				<pointLight position={[-2, 2, 2]} intensity={10} />
// 				<pointLight position={[2, 2, 2]} intensity={10} />

// 				<group ref={modelRef} />

// 				<OrbitControls />
// 			</Canvas>
// 		</>
// 	);
// };

// export default ModelRenderer;
