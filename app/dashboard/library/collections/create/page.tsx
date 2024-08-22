"use client";

import TableTransfer, { TableData, TableTransferProps } from "@/components/tableTransfer";
import { CreateCollectionDTO, CreateCollectionResponseDTO, SamplePreviewDTO, UserDTO } from "@/lib/Types";
import { authFetch } from "@/src/authFetch";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, SelectProps, Table, TableColumnsType, Transfer, TransferProps, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sampled3DTexture } from "three/examples/jsm/renderers/common/SampledTexture.js";

const { Title } = Typography;

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

const mockData = Array.from({ length: 20 }).map<TableData>((_, i) => ({
	key: i.toString(),
	name: `content${i + 1}`,
	description: `description of content${i + 1}`,
}));

const columns: TableColumnsType<TableData> = [
	{
		dataIndex: "name",
		title: "Name",
	},
	{
		dataIndex: "description",
		title: "Description",
	},
];

const CreateCollectionPage: React.FC = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const [searchData, setSearchData] = useState<SelectProps["options"]>();
	const [searchValue, setSearchValue] = useState<string>();
	const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
	const [userID, setUserID] = useState<number>();
	const [sampleData, setSampleData] = useState<SamplePreviewDTO[]>();

	useEffect(() => {
		authFetch("http://localhost:5047/api/user", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not retrieve user data");
					return undefined;
				}

				return response.json();
			})
			.then((data: UserDTO) => {
				if (!data) return;

				setUserID(data.userID);
			});
	}, []);
	useEffect(() => {
		if (!userID) return;

		authFetch(`http://localhost:5047/api/samples/previews?userID=${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not get samples previews");
					return undefined;
				}

				return response.json();
			})
			.then((data: SamplePreviewDTO[]) => {
				if (!data) return;

				setSampleData(data);
			});
	}, [userID]);

	const handleSearch = (newValue: string) => {
		if (newValue.length < 2) {
			setSearchData([]);
		} else fetchTags(newValue, setSearchData);
	};
	const handleSelectChange = (newValue: string) => {
		setSearchValue(newValue);
	};
	const handleTransferChange: TableTransferProps["onChange"] = (nextTargetKeys) => {
		setTargetKeys(nextTargetKeys);
	};
	const onBackButtonClicked = () => router.push("/dashboard/library/collections");
	const onFormFinished = (data: CreateCollectionDTO) => {
		data.publicationStatus = Number(data.publicationStatus);

		authFetch("http://localhost:5047/api/collections", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not create collection");
					return undefined;
				}

				return response.json();
			})
			.then((data: CreateCollectionResponseDTO) => {
				if (!data) return;

				const collectionID = data.id;

				router.push(`/dashboard/library/collections/view?id=${collectionID}`);
			});
	};
	const onFailure = () => {};

	return (
		<>
			<Title>Create collection</Title>
			<Button onClick={onBackButtonClicked}>
				<ArrowLeftOutlined />
			</Button>
			<Form
				form={form}
				name="create-collection"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				labelWrap
				initialValues={{
					remember: true,
				}}
				onFinish={onFormFinished}
				onFinishFailed={onFailure}
				autoComplete="off"
			>
				<FormItem name="name" label="Name" rules={[{ required: true, message: "Please input a name" }]}>
					<Input />
				</FormItem>
				<FormItem name="description" label="Description">
					<Input />
				</FormItem>
				<Form.Item name="tags" label="Tags">
					<Select
						mode="tags"
						showSearch
						value={searchValue}
						placeholder="Enter tags here"
						defaultActiveFirstOption={false}
						filterOption={false}
						onSearch={handleSearch}
						onChange={handleSelectChange}
						notFoundContent={null}
						options={(searchData || []).map((item) => ({ value: item.value, label: item.text }))}
					/>
				</Form.Item>
				<Form.Item name="publicationStatus" label="Publication status" required initialValue={"0"}>
					<Select
						options={[
							{ value: "0", label: "Private" },
							{ value: "1", label: "Public" },
						]}
					/>
				</Form.Item>
				<Form.Item name="samples" label="Samples">
					<TableTransfer
						leftColumns={columns}
						rightColumns={columns}
						dataSource={
							sampleData
								? sampleData.map<TableData>((item, i) => ({
										key: i.toString(),
										name: item.name,
										description: item.description ?? "No description provided",
								  }))
								: []
						}
						targetKeys={targetKeys}
						onChange={handleTransferChange}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 4 }}>
					<Button type="primary" htmlType="submit">
						Create
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default CreateCollectionPage;
