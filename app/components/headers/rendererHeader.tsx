import React from "react"
import { Input, Button } from "antd";

const { Search } = Input;

const RendererHeader: React.FC = () => {
    return (
        <div style={{height: "100%", width: "500px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Search placeholder="apple.glb" enterButton="Load model"></Search>
        </div>
    );
};

export default RendererHeader;