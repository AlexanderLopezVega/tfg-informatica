"use client";

//	Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithAuthentication } from "@/src/authFetch";
import { Alert, Table, TableProps } from "antd";
import { useHeader } from "@/src/headerContext";
import SamplesHeader from "@/components/headers/samplesHeader";

//	Type declaration
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

//	Component declaration
const Samples: React.FC = () => {
	const [data, setData] = useState<TableSamplePreview[] | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const { setHeaderContent } = useHeader();

	useEffect(() => {
		setHeaderContent(<SamplesHeader />);

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

	// if (loading) return <Skeleton></Skeleton>;
	if (!loading && !data) return <Alert message="An error ocurred while loading the samples"></Alert>;

	const columns: TableProps<TableSamplePreview>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) => <Link href={`/dashboard/sample?id=${record.key}`}>{text}</Link>,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
	];

	return (
		<>
			<Table dataSource={data} loading={loading} columns={columns}></Table>
		</>
	);
};

export default Samples;
