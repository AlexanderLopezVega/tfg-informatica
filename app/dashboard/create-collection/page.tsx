"use client";

import TableTransfer, { TableData, TableTransferProps } from "@/components/tableTransfer";
import { authFetch } from "@/src/authFetch";
import { Button, Form, Input, Select, SelectProps, Table, TableColumnsType, Transfer, TransferProps, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";

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

const CreateCollection: React.FC = () => {
	const [form] = Form.useForm();
	const [searchData, setSearchData] = useState<SelectProps["options"]>();
	const [searchValue, setSearchValue] = useState<string>();
	const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);

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
	const onSuccess = (data: any) => {console.log(data)};
	const onFailure = () => {};

	return (
		<>
			<Title>Create collection</Title>
			<Form form={form} name="create-collection" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }} onFinish={onSuccess} onFinishFailed={onFailure} autoComplete="off">
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
				<Form.Item name="publicationStatus" label="Publication status" required>
					<Select
						options={[
							{ value: "0", label: "Private" },
							{ value: "1", label: "Public" },
						]}
						defaultValue={"0"}
					/>
				</Form.Item>
				<Form.Item name="samples" label="Samples">
					<TableTransfer leftColumns={columns} rightColumns={columns} dataSource={mockData} targetKeys={targetKeys} onChange={handleTransferChange} />
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

export default CreateCollection;
