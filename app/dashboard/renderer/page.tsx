"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useHeader } from "@/src/headerContext";
import RendererHeader from "@/components/headers/rendererHeader";
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
	const { setHeaderContent } = useHeader();

	useEffect(() => {
		setHeaderContent(<RendererHeader setModelPath={setModelPath} />);

		return () => setHeaderContent(null);
	}, []);

	if (!modelPath) return <Skeleton active/>;

	return <ModelRenderer modelName={modelPath} />;
};

export default Renderer;
