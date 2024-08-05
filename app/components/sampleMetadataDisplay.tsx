import { Alert, Descriptions, DescriptionsProps, Divider, Flex, Space, Tag, Typography } from "antd";

export interface Metadata {
    id: number;
    name: string;
    description?: string;
};

interface Props {
    metadata?: Metadata;
}

const { Title } = Typography;

const SampleMetadataDisplay: React.FC<Props> = (props) => {
    const metadata = props.metadata;

    if (!metadata)
        return <Alert message="Could not load sample metadata" type="error" />

    const items: DescriptionsProps["items"] = [
        {
            key: "description",
            label: "Description",
            children: metadata.description ?? "No description provided",
        },
    ];

    return (
        <>
            <Space size="middle" direction="vertical">
                <div>
                    <Title level={1}>{metadata.name}</Title>
                    <Flex>
                        <Tag closable>Foo</Tag>
                        <Tag closable>Bar</Tag>
                        <Tag closable>Baz</Tag>
                    </Flex>
                </div>
                <div>
                    <Descriptions items={items} />
                </div>
            </Space>
            <Divider />
        </>
    );
};

export default SampleMetadataDisplay;