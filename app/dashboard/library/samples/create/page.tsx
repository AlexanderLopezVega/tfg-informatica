"use client";

import ModelRenderer from "@/components/modelRenderer";
import SampleMetadataDisplay from "@/components/sampleMetadataDisplay";
import { CreateSampleDTO } from "@/lib/Types";
import { authFetch } from "@/src/authFetch";
import { UploadOutlined } from "@ant-design/icons";
import { Steps, Form, Input, Button, Space, Divider, Upload, Flex, Typography, Select, SelectProps, Tag, UploadProps, Spin, Result, Alert } from "antd";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

interface Metadata {
	name: string;
	description?: string;
	tags?: string[];
	publicationStatus: number;
}
interface ModelDTO {
	modelFile: string;
}
interface JobStatus<T> {
	id: string;
	status: number;
	data: T;
}

interface MetadataStepProps {
	metadata?: Metadata;
	setMetadata: React.Dispatch<React.SetStateAction<any>>;
	nextStep: () => void;
}
interface ModelStepProps {
	modelFile?: string;
	setModelFile: React.Dispatch<React.SetStateAction<any>>;
	setModelID: React.Dispatch<React.SetStateAction<any>>;
	nextStep: () => void;
	previousStep: () => void;
}
interface SummaryStepProps {
	metadata?: Metadata;
	modelFile?: string;
	finish: () => void;
	previousStep: () => void;
}

let timeout: ReturnType<typeof setTimeout> | undefined;
let currentValue: string;

const fetchTags = (value: string, callback: (data: { value: string; text: string }[]) => void) => {
	if (timeout) {
		clearTimeout(timeout);
		timeout = undefined;
	}

	currentValue = value;

	const searchTags = () => {
		authFetch(`http://localhost:5047/api/tags/${value}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (currentValue !== value) return;

				console.log(responseData);

				const data = responseData.map((item: any) => ({
					value: item["value"],
					text: item["value"],
				}));

				callback(data);
			});
	};

	if (value) {
		timeout = setTimeout(searchTags, 300);
	} else {
		callback([]);
	}
};

//  Auxiliary components
const MetadataStep: React.FC<MetadataStepProps> = ({ metadata, nextStep, setMetadata }) => {
	const [form] = Form.useForm();
	const [searchData, setSearchData] = useState<SelectProps["options"]>();
	const [searchValue, setSearchValue] = useState<string>();

	const handleSearch = (newValue: string) => {
		if (newValue.length < 2) {
			setSearchData([]);
		} else fetchTags(newValue, setSearchData);
	};
	const handleChange = (newValue: string) => {
		setSearchValue(newValue);
	};
	const onFinish = (values: Metadata) => {
		setMetadata(values);
		nextStep();
	};

	return (
		<>
			<Form name="metadata-form" form={form} onFinish={onFinish} initialValues={metadata} autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
				<Form.Item>
					<Space>
						<Button disabled={true}>Back</Button>
						<Button type="primary" htmlType="submit">
							Next
						</Button>
					</Space>
				</Form.Item>
				<Form.Item name="name" label="Name" rules={[{ required: true, message: "Name cannot be empty" }]}>
					<Input />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<TextArea rows={5} />
				</Form.Item>
				<Form.Item name="tags" label="Tags">
					<Select
						mode="tags"
						showSearch
						value={searchValue}
						placeholder="Enter tags here"
						defaultActiveFirstOption={false}
						filterOption={false}
						onSearch={handleSearch}
						onChange={handleChange}
						notFoundContent={null}
						options={(searchData || []).map((item) => ({ value: item.value, label: item.text }))}
					/>
				</Form.Item>
				<Form.Item name="publicationStatus" label="Publication status" initialValue={"0"}>
					<Select
						options={[
							{ value: "0", label: "Private" },
							{ value: "1", label: "Public" },
						]}
					/>
				</Form.Item>
			</Form>
		</>
	);
};

const ModelStep: React.FC<ModelStepProps> = ({ modelFile, setModelFile, setModelID, nextStep, previousStep }) => {
	const [jobStatus, setJobStatus] = useState<JobStatus<ModelDTO>>();
	let intervalID = useRef<NodeJS.Timeout>();

	const pollJobStatus = useCallback(() => {
		if (!jobStatus) return;

		authFetch(`http://localhost:5047/api/models/jobs/${jobStatus.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response: Response) => response.json())
			.then((jobStatus: JobStatus<ModelDTO>) => {
				if (jobStatus.status === 1) setJobStatus(jobStatus);
			});
	}, [jobStatus?.id]);
	const onFinish = () => {
		nextStep();
	};

	useEffect(() => {
		if (!jobStatus) return;

		switch (jobStatus.status) {
			case 0:
				{
					intervalID.current = setInterval(pollJobStatus, 5000);
				}
				break;
			case 1:
				{
					setModelFile(jobStatus.data.modelFile);
					setModelID(jobStatus.id);
					clearInterval(intervalID.current);
				}
				break;
		}
	}, [jobStatus, pollJobStatus]);

	const props: UploadProps = {
		name: "file",
		accept: "image/jpg, image/jpeg, image/png",
		customRequest: ({ file, onSuccess }) => {
			const formData = new FormData();

			formData.append("ModelImage", file);

			authFetch("http://localhost:5047/api/models/jobs", {
				method: "POST",
				body: formData,
			})
				.then((data) => data.json())
				.then((jobStatus: JobStatus<ModelDTO>) => setJobStatus(jobStatus));
		},
		multiple: false,
		maxCount: 1,
	};

	let draggerContent = (
		<Dragger {...props}>
			<p className="ant-upload-drag-icon">
				<UploadOutlined />
			</p>
			<p className="ant-upload-text">Click or drag image to this area to upload</p>
			<p className="ant-upload-hint">Only JPG, JPEG and PNG files supported. Make sure your background has as little details as possible.</p>
		</Dragger>
	);

	if (jobStatus && jobStatus.status === 0) draggerContent = <Spin tip={<b>Generating model...</b>}>{draggerContent}</Spin>;

	const modelReady = modelFile !== undefined;

	return (
		<Flex vertical gap="middle">
			<Space>
				<Button onClick={() => previousStep()}>Back</Button>
				<Button type="primary" disabled={!modelReady} onClick={() => onFinish()}>
					Next
				</Button>
			</Space>

			{draggerContent}

			{modelReady && <ModelRenderer model={modelFile} />}
		</Flex>
	);
};

const SummaryStep: React.FC<SummaryStepProps> = ({ metadata, modelFile, finish, previousStep }) => {
	const tagsComponent = metadata?.tags?.map((tag: string) => <Tag key={tag}>{tag}</Tag>);

	const capitalise = (string: string | undefined) => {
		console.log(metadata);
		if (!string) return undefined;

		return string[0].toUpperCase() + string.slice(1);
	};

	console.log(metadata);

	return (
		<>
			<Space>
				<Button onClick={previousStep}>Back</Button>
				<Button type="primary" onClick={finish}>
					Finish
				</Button>
			</Space>

			<div style={{ marginTop: 10, marginBottom: 10 }}>
				<Text strong>Metadata</Text>
			</div>

			{metadata ? <SampleMetadataDisplay {...metadata} /> : <Alert type="error" message="Couldn't load sample metadata" />}

			{/* <Row>
				<Col span={4}>
					<Text type="secondary">Name:</Text>
				</Col>
				<Col span={19} offset={1}>
					<Text>{metadata?.name ?? "No name"}</Text>
				</Col>
			</Row>
			<Row>
				<Col span={4}>
					<Text type="secondary">Description:</Text>
				</Col>
				<Col span={19} offset={1}>
					<Text>{metadata?.description ?? "No descrtipion"}</Text>
				</Col>
			</Row>
			<Row>
				<Col span={4}>
					<Text type="secondary">Tags:</Text>
				</Col>
				<Col span={19} offset={1}>
					{tagsComponent}
				</Col>
			</Row>
			<Row>
				<Col span={4}>
					<Text type="secondary">Publication Status:</Text>
				</Col>
				<Col span={19} offset={1}>
					<Text>{capitalise(metadata?.publicationStatus)}</Text>
				</Col>
			</Row> */}

			<Divider />

			<div style={{ marginTop: 10, marginBottom: 10 }}>
				<Text strong>3D Model</Text>
			</div>

			<ModelRenderer model={modelFile} />
		</>
	);
};

//  Main component
const CreateSampleForm: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [metadata, setMetadata] = useState<Metadata>();
	const [modelFile, setModelFile] = useState<string>();
	const [modelID, setModelID] = useState<string>();
	const [sampleID, setSampleID] = useState<number>();
	const [formCompleted, setFormCompleted] = useState<boolean>(false);
	const router = useRouter();

	const nextStep = () => setCurrentStep(currentStep + 1);
	const previousStep = () => setCurrentStep(currentStep - 1);

	const onFinish = () => {
		if (!metadata) {
			console.error("Metadata is undefined in onFinish!");
			return;
		}
		if (!modelID) {
			console.error("Model ID is undefined in onFinish!");
			return;
		}

		const createSampleDTO: CreateSampleDTO = {
			name: metadata.name,
			description: metadata.description,
			tags: metadata.tags,
			publicationStatus: Number(metadata.publicationStatus),
			modelID: modelID,
		};

		console.log("Finished creation step", JSON.stringify(createSampleDTO));

		authFetch("http://localhost:5047/api/samples", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(createSampleDTO),
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not create sample");
					return undefined;
				}

				return response.json();
			})
			.then((data: undefined | number) => {
				if (!data) return;

				const id: number = data;

				console.log(id);

				setSampleID(id);
				setFormCompleted(true);
			});
	};
	const onViewCreatedSample = () => {
		const id = sampleID;
		router.push(`/dashboard/library/samples/view?id=${id}`);
	};

	const steps = [
		{
			title: "Metadata",
			content: <MetadataStep metadata={metadata} setMetadata={setMetadata} nextStep={nextStep} />,
		},
		{
			title: "3D Model",
			content: <ModelStep modelFile={modelFile} setModelFile={setModelFile} setModelID={setModelID} nextStep={nextStep} previousStep={previousStep} />,
		},
		{
			title: "Summary",
			content: <SummaryStep metadata={metadata} modelFile={modelFile} finish={onFinish} previousStep={previousStep} />,
		},
	];
	const onBackButtonClicked = () => router.push("/dashboard/library/samples");

	return (
		<>
			{formCompleted ? (
				<Result
					status="success"
					title="Sample created successfully"
					extra={[
						<Button type="primary" key="show-sample" onClick={onViewCreatedSample}>
							Go to sample
						</Button>,
					]}
				/>
			) : (
				<>
					<Title>Create sample</Title>
					<Space>
						<Button onClick={onBackButtonClicked}>Back</Button>
					</Space>
					<Steps current={currentStep} items={steps} style={{ paddingTop: 20, paddingBottom: 20 }} />
					<div style={{ paddingTop: 20, paddingBottom: 20 }}>{steps[currentStep].content}</div>
				</>
			)}
		</>
	);
};

export default CreateSampleForm;
