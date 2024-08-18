"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authFetch } from "@/src/authFetch";
import ModelRenderer from "@/components/modelRenderer";
import SampleMetadataDisplay from "@/components/sampleMetadataDisplay";
import { Button, Flex, Typography } from "antd";

const { Title } = Typography;

interface Metadata {
	name: string;
	description?: string;
	tags?: string[];
	publicationStatus: number;
}
interface ModelDTO {
	modelFile: string;
}

const fetchInit = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
};

const Sample: React.FC = () => {
	const [metadata, setMetadata] = useState<Metadata>();
	const [model, setModel] = useState<ModelDTO | undefined>(undefined);

	const params = useSearchParams();
	const id = params.get("id");

	useEffect(() => {
		//	Fetch metadata
		authFetch(`http://localhost:5047/api/samples/${id}`, fetchInit)
			.then((data) => data.json())
			.then((data: Metadata) => setMetadata(data));

		//	Fetch 3D model
		authFetch(`http://localhost:5047/api/models/${id}`, fetchInit)
			.then((data) => data.json())
			.then((model: ModelDTO) => setModel(model));
	}, [id]);

	return (
		<Flex vertical gap="middle">
			<Flex align="center">
				<Title level={1} style={{ margin: 0 }}>
					{metadata?.name}
				</Title>
				<Button type="primary" style={{ marginLeft: "auto" }}>
					Edit
				</Button>
			</Flex>
			{metadata && <SampleMetadataDisplay {...metadata} />}
			{model && <ModelRenderer model={model.modelFile} />}
		</Flex>
	);
};

export default Sample;
