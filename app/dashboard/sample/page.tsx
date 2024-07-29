"use client";

import { Alert, Skeleton, Descriptions } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { DescriptionsProps } from "antd";
import { fetchWithAuthentication } from "@/src/authFetch";
import ModelRenderer from "@/components/modelRenderer";
import { writeToFile } from "@/actions";

//	Type declaration
interface SampleDTO {
	id: number;
	name: string;
	description?: string;
}
interface ModelDTO {
	id: string;
	modelFile: Uint8Array;
}

const Sample: React.FC = () => {
	const [data, setData] = useState<SampleDTO | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const params = useSearchParams();
	const id = params.get("id");

	useEffect(() => {
		const url = `http://localhost:5047/api/sample/${id}`;
		const init = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};

		fetchWithAuthentication(
			url,
			init,
			(data: Response) => {
				data.json().then((data: SampleDTO) => {
					setData(data);
					setLoading(false);

					const url = `http://localhost:5047/api/model/${id}`;
					const init = {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					};

					fetchWithAuthentication(
						url,
						init,
						(modelData: Response) => {
							modelData.json().then((modelData: ModelDTO) => {
								writeToFile(modelData.id, modelData.modelFile);
							});
						},
						(reason: any) => {
							console.log("Couldn't load model");
						}
					);
				});
			},
			(reason: any) => {
				setLoading(false);
			}
		);
	}, []);

	if (loading) return <Skeleton active />;
	if (!data) return <Alert message="Could not load sample" type="error" />;

	const items: DescriptionsProps["items"] = [
		{
			key: "description",
			label: "Description",
			children: data.description ?? "No description provided",
		},
	];

	return (
		<>
			<Descriptions title={data.name} items={items} />
			<div style={{ height: 700 }}>
				<ModelRenderer modelName={"yoshi.glb"} />
			</div>
		</>
	);
};

export default Sample;
