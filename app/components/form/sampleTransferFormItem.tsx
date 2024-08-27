import { Form, TableColumnsType, TransferProps, Typography } from "antd";
import TableTransfer, { TableData, TableTransferProps } from "@/components/tableTransfer";
import { SamplePreviewDTO } from "@/lib/Types";

const { Paragraph } = Typography;

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

type SampleTransferFormItemProps = {
	data?: SamplePreviewDTO[];
	targetKeys: TransferProps["targetKeys"];
	onTableTransferChange: TableTransferProps["onChange"];
};

const SampleTransferFormItem: React.FC<SampleTransferFormItemProps> = ({ data, targetKeys, onTableTransferChange }) => {
	data ??= [];

	return (
		<Form.Item name="samplesID" label="Samples">
			<TableTransfer
				leftColumns={columns}
				rightColumns={columns}
				dataSource={data.map<TableData>((item, i) => ({
					key: i.toString(),
					name: item.name,
					description: <Paragraph ellipsis={{ rows: 2, expandable: false }}>{item.description ?? "No description provided"}</Paragraph>,
				}))}
				targetKeys={targetKeys}
				onChange={onTableTransferChange}
			/>
		</Form.Item>
	);
};

export default SampleTransferFormItem;
