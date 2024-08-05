"use client";

//	Imports
import { useEffect, useState } from "react";
import { fetchWithAuthentication } from "@/src/authFetch";
import { Alert, Button, Table, TableProps } from "antd";
import SamplesTable, { TableEntry } from "@/components/samplesTable";
import { FileAddOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface SamplePreview {
	id: number;
	name: string;
	description: string;
}

//	Component declaration
const Samples: React.FC = () => {
	const router = useRouter();
	const [tableData, setTableData] = useState<TableEntry[]>();
	const [loading, setLoading] = useState(true);

	const onCreateSample = () => {
		router.push('/dashboard/create-sample');
	};

	useEffect(() => {
		fetchWithAuthentication(
			"http://localhost:5047/api/sample/preview",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
			(data: Response) => {
				data.json().then((data: SamplePreview[]) => {
					const tableData = data.map((value: SamplePreview): TableEntry =>
					({
						key: value.id,
						name: value.name,
						description: value.description ?? "No description provided",
					}));

					setTableData(tableData);
					setLoading(false);
				});
			},
			() => { setLoading(false); }
		);
	}, []);

	if (!loading && !tableData) return <Alert message="An error ocurred while loading the samples"></Alert>

	return (
		<>
			<Button type="primary" icon={<FileAddOutlined />} onClick={onCreateSample}>Create</Button>
			<SamplesTable tableData={tableData} />
		</>
	);
};

export default Samples;
