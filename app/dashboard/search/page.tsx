'use client';

import {
	Divider,
	Flex,
	Input,
	Pagination,
	Radio,
	Row,
	Spin,
	Typography,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { CollectionCard } from '../../components/collectionCard';
import { SampleCard } from '../../components/sampleCard';
import { CollectionPreviewDTO, SamplePreviewDTO } from '../../lib/Types';

const { Search } = Input;
const { Title } = Typography;

type cardData = Partial<SamplePreviewDTO | CollectionPreviewDTO> & { image?: string };

const SearchType = {
  Sample: "Sample",
  Collection: "Collection",
} as const;

type SearchTypeType = keyof typeof SearchType;

const columnsSizes = {
  xs: 24 / 1,
  sm: 24 / 2,
  md: 24 / 3,
  lg: 24 / 4,
};
const imageFallback: string =
  'data:image/png;base64,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';

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

type cardsWithMemoProps = { elements: cardData[]; };

const CardsWithMemo = React.memo(
  ({ elements }: cardsWithMemoProps) => (
    <Row gutter={[15, 15]}>
      {elements?.map((e: any, i: number) => {
        return (
          <React.Fragment key={i}>
            {
              /// Check Card type here, easier
              e.sampleList === undefined ? (
                <SampleCard
                  {...(e as SamplePreviewDTO)}
                  columnsSizes={columnsSizes}
                  cardStyle={cardStyle}
                  imageFallback={imageFallback}
                />
              ) : (
                <CollectionCard
                  {...(e as CollectionPreviewDTO)}
                  columnsSizes={columnsSizes}
                  cardStyle={cardStyle}
                />
              )
            }
          </React.Fragment>
        );
      })}
    </Row>
  ),
  (oldProps, newProps) => {
    return oldProps.elements === newProps.elements;
  }
);

const initialContent: cardData[] = [];
for (var i = 0; i < 43; ++i)
  initialContent.push({
    name: `Element ${i}`,
    description: `description text`,
    image: ``,
  });

const pageSize = 12;

const SearchPage: React.FC = () => {
  const getPagination = (elements: any[], newPage: number) =>
    elements.slice(pageSize * (newPage - 1), pageSize * newPage);

  const [searchType, setSearchType] = useState<SearchTypeType>(SearchType.Sample);
  const [elements, setElements] = useState<cardData[]>(initialContent);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSlice, setCurrentSlice] = useState<cardData[]>(
    getPagination(initialContent, 1)
  );
  const totalPages = Math.ceil(Math.max(elements.length / pageSize, 1));

  useEffect(() => {
    if (!searchQuery || searchQuery.length === 0) return;
		setLoading(true);
    const originalQuery = searchQuery;

    fetch(
      `http://localhost:5047/api/${searchType}/previews?` +
        new URLSearchParams({
          name: searchQuery,
        })
    )
      .then((response: Response) => response.json())
      .then((json) => {
        if (searchQuery != originalQuery) return;

        loadData(json);
      });
  }, [searchQuery, searchType]);

  useEffect(() => {
    setCurrentPage(0);
    setCurrentSlice(getPagination(elements, 1));
  }, [elements]);

  const loadData = (data: SamplePreviewDTO[]) => {
    setElements(data as any);
    setLoading(false);
  };

  const onSearchTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    if (searchType === value) return;
    setSearchType(value);
    const initialContent: cardData[] = [];
		///TODO REMEMBER TO REMOVE THIS
		if(value === SearchType.Collection) for(var i = 0; i < 120; ++i) initialContent.push({ name: `Element CHANGED ${i}`, description: `description CHANGED text`, sampleList: [
			{ name: "sex", ID: "1231231" },
			{ name: "sex 2", ID: "1231231" },
			{ name: "sex 3", ID: "1231231" },
			{ name: "sex 4", ID: "1231231" }]});
		else for (var i = 0; i < 43; ++i)initialContent.push({name: `Element ${i}`, description: `description text`, image: ``, });
    setElements(initialContent);
  };

  const onSearch = (value: string) => {
    if (!value || value === '' || value === searchQuery) return;

    setLoading(true);
    setSearchQuery(value);
  };

  const searchTypes: string[] = [
    SearchType[SearchType.Sample],
    SearchType[SearchType.Collection],
  ];

  return (
    <>
      <Title>Search</Title>
      <Flex vertical={true} gap='small'>
        <Search placeholder='e.g. Andesite' onSearch={onSearch} />
        <Flex vertical={false} gap={'middle'}>
          <Radio.Group
            options={searchTypes}
            optionType='button'
            value={currentPage}
            defaultValue={SearchType[searchType]}
            onChange={onSearchTypeChange}
          />
          {!loading && totalPages > 1 ? (
            <Pagination
              onChange={(newPage) => {
                if (newPage === currentPage) return;
                setCurrentPage(newPage);
                setCurrentSlice(getPagination(elements, newPage));
              }}
              defaultCurrent={currentPage}
              pageSize={pageSize}
              total={elements.length}
              showSizeChanger={false}
            />
          ) : (
            ''
          )}
        </Flex>
      </Flex>
      <Divider />
      {loading ? (
        <Spin size='large' tip='Loading...' />
      ) : (
        <>
          <CardsWithMemo elements={currentSlice} />
        </>
      )}
    </>
  );
};

export default SearchPage;
