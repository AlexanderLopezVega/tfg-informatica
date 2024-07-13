"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Typography } from "antd/lib";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./dashboard.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1");
	const items = [
		{
			key: "search",
			label: "Search",
			icon: <VideoCameraOutlined />,
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
	];

	const onMenuPageSelected = (key: string) => {
		router.push(key);
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider width={300} breakpoint="sm">
				<Menu
					items={items}
					theme="dark"
					defaultSelectedKeys={["search"]}
					onSelect={({ key }: { key: string }) => {
						setSelectedMenuItem(key);
						onMenuPageSelected(key);
					}}
				></Menu>
			</Sider>

			<Layout>
				<Header style={{ background: "#fff", padding: 0 }} className="header-shadow">
					<Title level={3}>Title goes here</Title>
				</Header>

				<Content style={{ marginTop: 10 }}>{children}</Content>
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