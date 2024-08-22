"use client";

import { LoadingSpin } from "@/components/loadingSpin";
import { CollectionDTO } from "@/lib/Types";
import { authFetch } from "@/src/authFetch";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Alert, Button, Descriptions, DescriptionsProps, Flex, Space, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title } = Typography;

const ViewCollectionPage: React.FC = () => {
	const router = useRouter();
	const [collectionData, setCollectionData] = useState<CollectionDTO>();
	const [loading, setLoading] = useState<boolean>(true);

	const params = useSearchParams();
	const id = params.get("id");

	const items: DescriptionsProps["items"] = collectionData && [
		{
			key: "name",
			label: "Name",
			children: collectionData.name,
		},
		{
			key: "description",
			label: "Description",
			children: collectionData.description ?? "No description provided",
		},
	];

	useEffect(() => {
		setLoading(true);
		authFetch(`http://localhost:5047/api/collections/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.error("Could not load collection data");
					return undefined;
				}

				return response.json();
			})
			.then((data: CollectionDTO) => {
				if (!data) return;

				setCollectionData(data);
			})
			.finally(() => setLoading(false));
	}, [id]);

	const onBackButtonClicked = () => router.push("/dashboard/library/collections");

	return (
		<>
			<LoadingSpin isLoading={loading}>
				{loading ? (
					<p>Loading, please wait</p>
				) : collectionData ? (
					<Flex vertical gap="middle">
						<Title>{collectionData.name}</Title>
						<Space>
							<Button onClick={onBackButtonClicked}>
								<ArrowLeftOutlined />
							</Button>
						</Space>
						<Descriptions items={items} column={1} />
					</Flex>
				) : (
					<Alert type="error" message="Could not load collection data" />
				)}
			</LoadingSpin>
		</>
	);
};

export default ViewCollectionPage;
