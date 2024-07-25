"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, Col, Divider, Image, Row, Typography } from "antd";

const { Title } = Typography;

const ModelRenderer = dynamic(() => import("../../components/modelRenderer"), { ssr: false });

const Library: React.FC = () => {
	interface SampleInfo {
		key: number;
		name: string;
	}

	const items: SampleInfo[] = [
		{
			key: 1,
			name: "Amethyst",
		},
		{
			key: 2,
			name: "Quartz",
		},
		{
			key: 3,
			name: "Corundum",
		},
		{
			key: 4,
			name: "Corundum",
		},
		{
			key: 5,
			name: "Corundum",
		},
		{
			key: 6,
			name: "Corundum",
		},
		{
			key: 7,
			name: "Corundum",
		},
	];

	return (
		<>
			<Title level={2}>Samples</Title>
			<Row gutter={[16, 16]} justify="start">
				{items.map((item: SampleInfo) => (
					<Col key={item.key} span={4}>
						<Card hoverable title={item.name}>
							<ModelRenderer modelPath="/models/yoshi.glb" />
						</Card>
					</Col>
				))}
			</Row>
			<Divider></Divider>
			<Title level={2}>Collections</Title>
		</>
	);
};

export default Library;
