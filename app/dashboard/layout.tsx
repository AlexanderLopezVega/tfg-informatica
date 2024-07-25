"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Space, Typography } from "antd/lib";
import "antd/dist/reset.css";
import "./dashboard.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const items = [
		{
			key: "search",
			label: "Search",
			icon: <SearchOutlined />,
			value: <>Search</>,
		},
		{
			key: "library",
			label: "My Library",
			icon: <UserOutlined />,
			value: <>My Library</>,
		},
		{
			key: "upload",
			label: "Upload",
			icon: <UploadOutlined />,
			value: <>Upload</>,
		},
		{
			key: "renderer",
			label: "Renderer",
			value: <>Upload</>,
		},
	];

	const onMenuPageSelected = (key: string) => {
		router.push(key);
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider width={300} breakpoint="sm">
				<Header style={{ padding: "20px 40px" }} className="header-shadow">
					<Title level={4} style={{ color: "#fff", fontWeight: 400 }}>
						Title goes here
					</Title>
				</Header>
				<Menu
					items={items}
					theme="dark"
					defaultSelectedKeys={["search"]}
					onSelect={({ key }: { key: string }) => {
						onMenuPageSelected(key);
					}}
				></Menu>
			</Sider>

			<Layout>
				<Header style={{ background: "#fff", padding: "0px 15px" }} className="header-shadow">
					<Space>
						<Button type="primary">Primary button</Button>
						<Button>Default button</Button>
					</Space>
				</Header>

				<Content style={{ marginTop: 10, padding: "15px" }}>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;

//	For fetching data from the API
// useEffect(() => {
// 	fetch("http://localhost:5077/", { method: "GET" })
// 	.then((response) => response.json())
// 	.then((data) => console.log(data))
// 	.catch((error) => console.error("Error:", error));
// });
