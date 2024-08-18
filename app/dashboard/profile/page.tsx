"use client";

import { deleteToken, getToken } from "@/actions";
import { authFetch } from "@/src/authFetch";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Descriptions, Divider, Flex, Input, Modal, Space, Typography } from "antd";
import { DescriptionsProps } from "antd/lib";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const { Title } = Typography;

interface ProfileData {
	username: string;
}

const ProfilePage: React.FC = () => {
	const [userID, setUserID] = useState<number>();
	const [profileData, setProfileData] = useState<ProfileData>();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [isConfirmValid, setIsConfirmValid] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		getToken()
			.then((cookie) => {
				if (!cookie) {
					console.error("Could not read cookie ", cookie);
					return;
				}

				const userID = JSON.parse(cookie.value)["userID"];

				setUserID(userID);
			})
			.catch();
	}, []);
	useEffect(() => {
		if (!userID) return;
		console.log(userID);

		authFetch(`http://localhost:5047/api/users/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => setProfileData(data));
	}, [userID, setProfileData]);

	if (!profileData) return <Alert type="warning" message="Could not load user data" />;

	const hideModal = () => setModalOpen(false);
	const showModal = () => setModalOpen(true);
	const handleConfirmUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const username = event.target.value;
		console.log(username === profileData.username);

		setIsConfirmValid(username === profileData.username);
	};
	const onConfirmDeleteAccount = () => {
		console.log(`deleting account ${userID}`);
		if (!userID) return;

		authFetch(`http://localhost:5047/api/users/${userID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not delete user");
					return;
				}

				deleteToken().then(() => {
					router.push("/");
				});
			})
			.catch();
	};

	const items: DescriptionsProps["items"] = [
		{
			key: "username",
			label: "Username",
			children: <p>{profileData.username}</p>,
		},
	];

	return (
		<>
			<Title>{profileData.username}'s Profile</Title>
			<Descriptions items={items} column={1} />
			<Divider />
			<Space>
				<Button danger type="primary" onClick={showModal}>
					Delete account
				</Button>
			</Space>
			<Modal
				title={
					<Space>
						<ExclamationCircleOutlined style={{ color: "red" }} />
						<p style={{ margin: 0 }}>Delete account</p>
					</Space>
				}
				open={modalOpen}
				closable
				centered
				onCancel={hideModal}
				footer={
					<Space>
						<Button onClick={hideModal}>Cancel</Button>
						<Button danger type="primary" disabled={!isConfirmValid} onClick={onConfirmDeleteAccount}>
							Delete account
						</Button>
					</Space>
				}
			>
				<Flex vertical style={{ padding: 20 }}>
					<p>Are you sure you want to delete your account? This process is irreversible</p>
					<p>Write your username here to make sure</p>
					<Input placeholder={profileData.username} onChange={handleConfirmUsernameChange} />
				</Flex>
			</Modal>
		</>
	);
};

export default ProfilePage;
