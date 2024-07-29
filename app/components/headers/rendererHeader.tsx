import React from "react";
import { Input } from "antd";

const { Search } = Input;

//  Type declaration
interface RendererHeaderProps {
	setModelPath: (modelPath: string) => void;
}

//  Component declaration
const RendererHeader: React.FC<RendererHeaderProps> = (props: RendererHeaderProps) => {
	const onSearch = (value: string) => {
        console.log(`Searching for ${value}`);
		props.setModelPath(value);
	};

	return (
		<div style={{ height: "100%", width: "500px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
			<Search placeholder="apple.glb" enterButton="Load model" onSearch={onSearch} />
		</div>
	);
};

export default RendererHeader;
