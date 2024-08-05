import { Table, TableProps } from "antd";
import Link from "next/link";
import React, { useState } from "react";

export interface TableEntry {
    key: number;
    name: string;
    description: string;
}
interface Props {
    tableData?: TableEntry[]
}

const SamplesTable: React.FC<Props> = ({ tableData: data }) => {
    const columns: TableProps<TableEntry>["columns"] = [
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

    return (<Table dataSource={data} loading={!data} columns={columns}></Table>);
};

export default SamplesTable;