import { Card, Col, Flex, Typography } from 'antd';
import Link from 'next/link';
import React, { CSSProperties } from 'react';
import { CollectionPreviewDTO } from '../lib/Types';

const { Text, Title } = Typography;

type CollectionCardProps = {
  columnsSizes: any;
  cardStyle: CSSProperties;
} & Partial<CollectionPreviewDTO>;

export const CollectionCard: React.FC<CollectionCardProps> = ({
  name,
  description,
  columnsSizes,
  cardStyle,
  sampleList,
  ID,
}) => {
  
  return (
    <Col
      xs={columnsSizes.xs}
      sm={columnsSizes.sm}
      md={columnsSizes.md}
      lg={columnsSizes.lg}>
      <Link href={`/dashboard/collection?id=${ID}`}>
        <Card hoverable style={cardStyle}>
          <Flex vertical gap='middle'>
            <Title level={3}>{name}</Title>
            <Text>{description}</Text>
            {sampleList &&
              [...sampleList].slice(0, 3).map((e, i) => {
                return (
                  <React.Fragment
                    key={`${name}-${description}-sample-${i}-${e.name}`}>
                    <Text code>{e.name}</Text>
                  </React.Fragment>
                );
              })}
            {sampleList && sampleList.length > 3 ? <Text>...</Text> : ''}
          </Flex>
        </Card>
      </Link>
    </Col>
  );
};
