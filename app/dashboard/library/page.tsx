"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Card, Col, Divider, Image, Row, Typography } from "antd";
import { fetchWithAuthentication } from "../../src/authFetch";

const { Title, Paragraph } = Typography;

const Library: React.FC = () => {
	interface SamplePreview {
		id: number;
		name: string;
		description: string;
	}

	const [data, setData] = useState<SamplePreview[] | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!loading) return;

		const url = "http://localhost:5047/api/sample/preview";
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
				data.json().then((data: any) => {
					console.log(data);

					setData(data);
					setLoading(false);
				});
			},
			() => {
				setLoading(false);
				setData(undefined);
			}
		);
	}, []);

	if (loading) return <p>Loading...</p>;
	if (data === undefined) return <p>No data</p>;

	return (
		<>
			<Title level={2}>Samples</Title>
			<Suspense>
				<Row gutter={[16, 16]} justify="start" align="stretch">
					{data.map((item: SamplePreview) => (
						<Col key={item.id} span={4}>
							<Card hoverable title={item.name}>
								<Paragraph ellipsis={true}>{item.description}</Paragraph>
							</Card>
						</Col>
					))}
				</Row>
			</Suspense>
			<Divider></Divider>
			<Title level={2}>Collections</Title>
		</>
	);
};
