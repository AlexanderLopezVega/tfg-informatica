"use client";

import {useState } from "react";
import { Table, TableProps} from "antd";

interface TableCollectionPreview {
	key: number;
	name: string;
}

const Collections: React.FC = () => {
	const [data, setData] = useState<TableCollectionPreview[] | undefined>(undefined);
	const [loading, setLoading] = useState(true);

    //  TODO: Implement in backend collection preview DTO
	// useEffect(() => {
	// 	if (!loading) return;

	// 	const url = "http://localhost:5047/api/collection/preview";
	// 	const init = {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	};

	// 	fetchWithAuthentication(
	// 		url,
	// 		init,
	// 		(data: Response) => {
	// 			data.json().then((data: CollectionPreview[]) => {
	// 				const tableData = data.map((value: CollectionPreview): TableCollectionPreview => {
	// 					return {
	// 						key: value.id,
	// 						name: value.name,
	// 					};
	// 				});
	// 				console.log(tableData);

	// 				setData(tableData);
	// 				setLoading(false);
	// 			});
	// 		},
	// 		() => {
	// 			setLoading(false);
	// 			setData(undefined);
	// 		}
	// 	);
	// }, []);

	// if (loading) return <Skeleton></Skeleton>;
	// if (!data) return <Alert message="An error ocurred while loading the samples"></Alert>;

	const columns: TableProps<TableCollectionPreview>["columns"] = [
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

export default Collections;
