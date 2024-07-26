"use client";

import { useEffect, useState } from "react";
import { fetchWithAuthentication } from "@/src/authFetch";
import { Skeleton, Table, TableProps, Typography } from "antd";

const { Text } = Typography;

interface SamplePreview {
	id: number;
	name: string;
	description?: string;
}

interface TableSamplePreview {
	key: number;
	name: string;
	description: string;
}

const Samples: React.FC = () => {
	const [data, setData] = useState<TableSamplePreview[] | undefined>(undefined);
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
				data.json().then((data: SamplePreview[]) => {
					const tableData = data.map((value: SamplePreview): TableSamplePreview => {
						return {
							key: value.id,
							name: value.name,
							description: value.description ?? "No description provided",
						};
					});
					console.log(tableData);

					setData(tableData);
					setLoading(false);
				});
			},
			() => {
				setLoading(false);
				setData(undefined);
			}
		);
	}, []);

	if (loading) return <Skeleton></Skeleton>;
	if (!data) return <Text type="warning">An error ocurred while loading the samples</Text>;

	const columns: TableProps<TableSamplePreview>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
	];

	return (
		<>
			<Table dataSource={data} columns={columns}></Table>
		</>
	);
};

export default Samples;
