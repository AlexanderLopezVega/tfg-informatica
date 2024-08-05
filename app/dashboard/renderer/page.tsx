"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

//	Type declaration
interface RendererProperties {
	defaultModelPath?: string;
}

// Dynamically import the ModelViewer to prevent it from loading on the server
const ModelRenderer = dynamic(() => import("@/components/modelRenderer"), { ssr: false });

//	Component declaration
const Renderer: React.FC<RendererProperties> = (props: RendererProperties) => {
	const [modelPath, setModelPath] = useState(props.defaultModelPath);
	
	if (!modelPath) return <Skeleton active/>;

	return <ModelRenderer model={modelPath} />;
};

export default Renderer;
