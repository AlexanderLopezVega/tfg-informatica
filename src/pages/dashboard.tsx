import { useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd/lib";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import http from "http";
import "antd/dist/reset.css";
import "./dashboard.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1");

	useEffect(() => {
		const options = {
			hostname: "localhost",
			port: 7048,
			path: "",
			headers: {
				"access-control-allow-origin": "*"
			},
			agent: false,
		};

		http.get(options, (res: http.IncomingMessage) => {
			console.log(res);
		});
	});

	const renderContent = () => {
		switch (selectedMenuItem) {
			case "1":
				return <h1>Asset search</h1>;
			case "2":
				return <h1>User assets</h1>;
			default:
				return <h1>Default content</h1>;
		}
	};

	const items = [
		{
			key: "asset-search",
			label: "Asset Search",
			icon: <VideoCameraOutlined />,
			value: <>Asset Search</>,
		},
		{
			key: "user-assets",
			label: "User Assets",
			icon: <UserOutlined />,
			value: <>User Assets</>,
		},
		{
			key: "asset-upload",
			label: "Asset Upload",
			icon: <UploadOutlined />,
			value: <>Asset Upload</>,
		},
	];

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider width={300} breakpoint="sm">
				<Menu items={items} theme="dark" defaultSelectedKeys={["asset-search"]} onSelect={({ key }) => setSelectedMenuItem(key)}></Menu>
			</Sider>

			<Layout>
				<Header style={{ background: "#fff", padding: 0 }} className="header-shadow">
					<Title level={3}>Title goes here</Title>
				</Header>

				<Content style={{ marginTop: 10 }}>{renderContent()}</Content>
			</Layout>
		</Layout>
	);
};

export default Dashboard;
