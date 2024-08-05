"use client";

import { Alert, Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWithAuthentication } from "@/src/authFetch";
import ModelRenderer from "@/components/modelRenderer";
import SampleMetadataDisplay, { Metadata } from "@/components/sampleMetadataDisplay";

interface ModelDTO {
	modelFile: string;
};

const fetchInit = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
};

const Sample: React.FC = () => {
	const [metadata, setMetadata] = useState<Metadata | undefined>(undefined);
	const [model, setModel] = useState<ModelDTO | undefined>(undefined);
	const [metadataLoading, setMetadataLoading] = useState<boolean>(true);
	const [modelLoading, setModelLoading] = useState<boolean>(true);

	const params = useSearchParams();
	const id = params.get("id");

	useEffect(() => {
		//	Fetch metadata
		fetchWithAuthentication(
			`http://localhost:5047/api/sample/${id}`,
			fetchInit,
			(data: Response) => {
				data.json().then((data: Metadata) => {
					setMetadata(data);
					setMetadataLoading(false);
				});
			},
			() => {
				setMetadataLoading(false);
			}
		);

		//	Fetch 3D model
		fetchWithAuthentication(
			`http://localhost:5047/api/model/${id}`,
			fetchInit,
			(modelData: Response) => {
				modelData.json().then((model: ModelDTO) => {
					setModel(model);
					setModelLoading(false);
				});
			},
			() => {
				setModelLoading(false);
			}
		);
	}, [id]);

	return (
		<>
			{
				metadataLoading
					? <Skeleton active />
					:
					<>
						<SampleMetadataDisplay metadata={metadata} />
						<ModelRenderer model={model?.modelFile} />
					</>
			}
		</>
	);
};

export default Sample;
