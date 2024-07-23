// "use client";
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useRef, useState } from 'react';

// const Box = (props: any) => {
//   // This reference will give us direct access to the mesh
//   const meshRef: any = useRef()
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (meshRef.current.rotation.x += delta))
//   // Return view, these are regular three.js elements expressed in JSX
//   return (
//     //@ts-ignore
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={active ? 1.5 : 1}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }

// const Renderer = (props: any) => {
//  return (
//   <Canvas>
//       <ambientLight intensity={Math.PI / 2} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//       <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//       <Box position={[-1.2, 0, 0]} />
//       <Box position={[1.2, 0, 0]} />
//     </Canvas>
//   );
// }

// export default Renderer;

"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the ModelViewer to prevent it from loading on the server
const ModelRenderer = dynamic(() => import("../../components/modelRenderer"), { ssr: false });

const Renderer: React.FC = () => {
	return <ModelRenderer modelPath="/models/yoshi.glb" />;
};

export default Renderer;
