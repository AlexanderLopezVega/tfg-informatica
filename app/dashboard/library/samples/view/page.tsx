"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { authFetch } from "@/src/authFetch";
import ModelRenderer from "@/components/modelRenderer";
import SampleMetadataDisplay from "@/components/sampleMetadataDisplay";
import { Button, Flex, Input, message, Modal, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();
	const [metadata, setMetadata] = useState<Metadata>();
	const [model, setModel] = useState<ModelDTO | undefined>(undefined);
	const [isConfirmValid, setIsConfirmValid] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

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

	const onBackButtonClicked = () => router.push("/dashboard/library/samples");
	const onEditSampleButtonClicked = () => router.push(`/dashboard/library/samples/edit?id=${id}`);
	const onDeleteSampleButtonClicked = () => showModal();
	const onSampleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => metadata && setIsConfirmValid(event.target.value === metadata?.name);
	const onConfirmDeleteSampleButtonClicked = () => {
		const body = JSON.stringify({ sampleIDs: [Number(id)] });

		console.log(body);

		authFetch("http://localhost:5047/api/samples", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not delete sample");
					return;
				}

				messageApi.success("Sample deleted correctly", 5);
				router.push("/dashboard/library/samples");
			})
			.catch();
	};

	const showModal = () => setModalOpen(true);
	const hideModal = () => setModalOpen(false);

	return (
		<>
			{contextHolder}
			<Flex vertical gap="middle">
				<Title level={1} style={{ margin: 0 }}>
					{metadata?.name}
				</Title>
				<Flex gap="small">
					<Button onClick={onBackButtonClicked}>Back</Button>
					<Space style={{ marginLeft: "auto" }}>
						<Button type="primary" onClick={onEditSampleButtonClicked}>
							Edit
						</Button>
						<Button type="primary" danger onClick={onDeleteSampleButtonClicked}>
							Delete
						</Button>
					</Space>
				</Flex>
				{metadata && <SampleMetadataDisplay {...metadata} />}
				{model && <ModelRenderer model={model.modelFile} />}
				{metadata && (
					<Modal
						title={
							<Space>
								<ExclamationCircleOutlined style={{ color: "red" }} />
								<p style={{ margin: 0 }}>Delete sample</p>
							</Space>
						}
						open={modalOpen}
						closable
						centered
						onCancel={hideModal}
						footer={
							<Space>
								<Button onClick={hideModal}>Cancel</Button>
								<Button danger type="primary" disabled={!isConfirmValid} onClick={onConfirmDeleteSampleButtonClicked}>
									Delete sample
								</Button>
							</Space>
						}
					>
						<Flex vertical style={{ padding: 20 }}>
							<p>Are you sure you want to delete the sample {metadata.name}? This process is irreversible</p>
							<p>Write the sample name here to make sure</p>
							<Input placeholder={metadata.name} onChange={onSampleNameInputChange} />
						</Flex>
					</Modal>
				)}
			</Flex>
		</>
	);
};

export default Sample;
