"use client";

import { LoadingSpin } from "@/components/loadingSpin";
import { SampleDTO } from "@/lib/Types";
import { authFetch } from "@/src/authFetch";
import { Alert, Button, Form, Input, message, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title } = Typography;

type EditSampleFormProps = {
	data?: SampleDTO;
	onFormFinished: (data: SampleDTO) => void;
};

const EditSampleForm: React.FC<EditSampleFormProps> = ({ data, onFormFinished }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (!data) return;

		form.setFieldsValue(data);
	}, [data]);

	return (
		<Form form={form} onFinish={onFormFinished} wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
			<Form.Item<SampleDTO> name="name" label="Name" rules={[{ required: true, message: "Please input the sample name" }]}>
				<Input />
			</Form.Item>
			<Form.Item wrapperCol={{ span: 20, offset: 4 }}>
				<Button type="primary" htmlType="submit">
					Confirm changes
				</Button>
			</Form.Item>
		</Form>
	);
};

const EditSamplePage: React.FC = () => {
	const [sampleData, setSampleData] = useState<SampleDTO>();
	const [loading, setLoading] = useState<boolean>(true);
	const [messageApi, contextHolder] = message.useMessage();
	const router = useRouter();
	const params = useSearchParams();
	const id = params.get("id");

	const onBackButtonClicked = () => router.push(`/dashboard/library/samples/view?id=${id}`);
	const onFormFinished = (data: SampleDTO) => {
		if (id == null) {
			console.error("Sample ID not found");
			return;
		}

		data.ID = id;

		authFetch("http://localhost:5047/api/samples", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.ok) {
				messageApi.success("Sample updated", 5);
				router.push(`/dashboard/library/samples/view?id=${id}`);
			} else messageApi.error("Could not update sample", 5);
		});
	};

	useEffect(() => {
		setLoading(true);
		authFetch(`http://localhost:5047/api/samples/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not load sample data");
					return undefined;
				}

				return response.json();
			})
			.then((data: SampleDTO) => {
				if (!data) return;

				setSampleData(data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	return (
		<>
			{contextHolder}
			<Title>Edit sample</Title>

			<Button onClick={onBackButtonClicked}>Back</Button>

			<LoadingSpin isLoading={loading}>
				{sampleData ? <EditSampleForm data={sampleData} onFormFinished={onFormFinished} /> : loading ? <></> : <Alert type="error" message="Could not load sample data" />}
			</LoadingSpin>
		</>
	);
};

export default EditSamplePage;
