import { Card, Col, Flex, Image, Typography } from 'antd';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { SamplePreviewDTO } from '../lib/Types';

const { Text, Title } = Typography;

type SampleCardProps = {
  columnsSizes: any;
  cardStyle: CSSProperties;
  text: string;
  imageFallback: string;
} & Partial<SamplePreviewDTO>;

export const SampleCard: React.FC<SampleCardProps> = ({
  name,
  description,
  columnsSizes,
  cardStyle,
  imageFallback,
  imageUrl,
}) => {
  return (
    <Col
      xs={columnsSizes.xs}
      sm={columnsSizes.sm}
      md={columnsSizes.md}
      lg={columnsSizes.lg}>
      <Link href='#'>
        <Card hoverable style={cardStyle}>
          <Flex vertical gap='middle'>
            <Image
              alt={`Image of ${name}`}
              src={imageUrl}
              fallback={imageFallback}
              preview={false}
            />
            <Title level={5}>{name}</Title>
            <Text>{description}</Text>
          </Flex>
        </Card>
      </Link>
    </Col>
  );
};
