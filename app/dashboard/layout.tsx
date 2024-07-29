"use client";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Space, Typography } from "antd/lib";
import { LogoutOutlined, SearchOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "@/dashboard/dashboard.css";
import { useHeader } from "@/src/headerContext";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MenuItem {
	key: string;
	label: string;
	icon?: ReactNode;
	value: ReactNode;
	children?: MenuItem[];
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname().replace("/dashboard", "");
	const { headerContent } = useHeader();

	const mainMenuItems: MenuItem[] = [
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
			children: [
				{
					key: "library/samples",
					label: "Samples",
					value: <>Samples</>,
				},
				{
					key: "library/collections",
					label: "Collections",
					value: <>Collections</>,
				},
			],
		},
		{
			key: "renderer",
			label: "Renderer",
			value: <>Renderer</>,
		},
	];
	const secondaryMenuItems: MenuItem[] = [
		{
			key: "logout",
			label: "Logout",
			icon: <LogoutOutlined />,
			value: <>Logout</>,
		},
	];

	//	Route to page when menu item selected
	const onMenuPageSelected = (key: string) => router.push(`/dashboard/${key}`);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider width={300}>
				<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
					<Header style={{ padding: "20px 40px" }} className="header-shadow">
						<Title level={4} style={{ color: "#fff", fontWeight: 400 }}>
							Title goes here
						</Title>
					</Header>
					<Menu
						items={mainMenuItems}
						theme="dark"
						defaultSelectedKeys={[pathname]}
						mode="inline"
						onSelect={({ key }: { key: string }) => {
							onMenuPageSelected(key);
						}}
						style={{ flexGrow: 1 }}
					></Menu>
					<Menu
						items={secondaryMenuItems}
						theme="dark"
						mode="inline"
						selectable={false}
						style={{ marginTop: "auto" }}
						onSelect={({ key }: { key: string }) => {
							if (key === "logout") {
								// Handle logout logic here
								console.log("Logout");
							}
						}}
					></Menu>
				</div>
			</Sider>

			<Layout>
				<Header style={{ background: "#fff", padding: "0px 15px" }} className="header-shadow">
					{headerContent}
				</Header>
				<Content style={{ marginTop: 10, padding: "15px" }}>
					{children}
				</Content>
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
