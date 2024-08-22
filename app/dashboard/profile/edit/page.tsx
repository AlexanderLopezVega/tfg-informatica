"use client";

import { LoadingSpin } from "@/components/loadingSpin";
import { UserDTO, UserProfileDTO } from "@/lib/Types";
import { authFetch } from "@/src/authFetch";
import { Alert, Button, Flex, Form, Input, message, Space, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const { Title } = Typography;

type EditProfileFormProps = {
	data?: UserProfileDTO;
	onFormFinished: (data: UserProfileDTO) => void;
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({ data, onFormFinished }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (!data) return;

		form.setFieldsValue(data);
	}, [data]);

	return (
		<Form form={form} onFinish={onFormFinished} wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
			<Form.Item<UserProfileDTO> name="username" label="Username" rules={[{ required: true, message: "Please input username" }]}>
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
const EditProfilePage: React.FC = () => {
	const [userID, setUserID] = useState<number>();
	const [profileData, setProfileData] = useState<UserProfileDTO>();
	const [loading, setLoading] = useState<boolean>(true);
	const [messageApi, contextHolder] = message.useMessage();

	const router = useRouter();

	//  Initially fetch userID
	useEffect(() => {
		setLoading(true);
		authFetch("http://localhost:5047/api/user", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Couldn't retrieve user ID");
					return undefined;
				}

				return response.json();
			})
			.then((data: UserDTO) => {
				if (data === undefined) return;

				setUserID(data.userID);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	//  Fetch user profile data
	useEffect(() => {
		if (!userID) return;

		setLoading(true);
		authFetch(`http://localhost:5047/api/users/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not fetch user profile data");
					return undefined;
				}

				return response.json();
			})
			.then((data: UserProfileDTO) => {
				if (!data) return;

				setProfileData(data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [userID]);

	const onBackButtonClicked = () => {
		router.push("/dashboard/profile");
	};
	const onFormFinished = (data: UserProfileDTO) => {
		authFetch("http://localhost:5047/api/users", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.ok) {
				messageApi.success("Profile updated", 5);
				router.push("/dashboard/profile");
			} else messageApi.error("Could not update profile", 5);
		});
	};

	return (
		<>
			{contextHolder}
			<Title>Edit profile</Title>
			<Flex vertical gap="middle">
				<Space>
					<Button onClick={onBackButtonClicked}>Back</Button>
				</Space>
				<LoadingSpin isLoading={loading}>
					{profileData ? <EditProfileForm data={profileData} onFormFinished={onFormFinished} /> : loading ? <></> : <Alert type="error" message="Could not load profile data" />}
				</LoadingSpin>
			</Flex>
		</>
	);
};

export default EditProfilePage;
