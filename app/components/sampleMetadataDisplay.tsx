import { Descriptions, DescriptionsProps, Flex, Tag } from "antd";

export interface SampleMetadataDisplayProps {
	name: string;
	description?: string;
	tags?: string[];
	publicationStatus: number;
	editableFields?: boolean;
}

const SampleMetadataDisplay: React.FC<SampleMetadataDisplayProps> = ({ name, description, tags, publicationStatus, editableFields = true }) => {
	const items: DescriptionsProps["items"] = [
		{
			key: "name",
			label: "Name",
			children: name,
		},
		{
			key: "description",
			label: "Description",
			children: description ?? "No description provided",
		},
		{
			key: "tags",
			label: "Tags",
			children: tags ? tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>) : <p>No tags</p>,
		},
		{
			key: "publicationStatus",
			label: "Publication Status",
			children: ["Private", "Public"][publicationStatus],
		},
	];

	return (
		<Flex vertical gap="middle">
			<Descriptions items={items} column={1} />

			{/* <Row>
				<Col span={4}>
					<Text type="secondary">Name:</Text>
				</Col>
				<Col span={19} offset={1}>
					<Text>{name}</Text>
				</Col>
			</Row>
			<Row>
				<Col span={4}>
					<Text type="secondary">Description:</Text>
				</Col>
				<Col span={19} offset={1}>
					<Text>{description ?? "No descrtipion"}</Text>
				</Col>
			</Row>
			<Row>
				<Col span={4}>
					<Text type="secondary">Tags:</Text>
				</Col>
				<Col span={19} offset={1}>
					{tags?.map((tag: string) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</Col>
			</Row> */}
		</Flex>
	);
};

export default SampleMetadataDisplay;
