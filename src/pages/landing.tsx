import React from "react";
import { Button, Card, Form, Input, Tabs, Typography } from "antd/lib";
import { geekblue } from "@ant-design/colors";
import type { TabsProps } from "antd";
import "antd/dist/reset.css";
import "./landing.css";

const { Title } = Typography;

const LoginForm = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log("Login success:", values);
	};

	return (
		<Form form={form} name="login" onFinish={onFinish}>
			<Form.Item name="username" rules={[{ required: true, message: "Please input your username" }]}>
				<Input placeholder="Username"></Input>
			</Form.Item>

			<Form.Item name="password" rules={[{ required: true, message: "Please input your password" }]}>
				<Input placeholder="Password"></Input>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};

const RegisterForm = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log("Register success:", values);
	};

	return (
		<Form form={form} name="register" onFinish={onFinish}>
			<Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
				<Input placeholder="Username" />
			</Form.Item>

			<Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
				<Input.Password placeholder="Password" />
			</Form.Item>

			<Form.Item
				name="confirm"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{ required: true, message: "Please confirm your password!" },
					({ getFieldValue }) => ({
						validator(_: any, value: string) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("The two passwords do not match!"));
						},
					}),
				]}
			>
				<Input.Password placeholder="Confirm Password" />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};

const LandingPage: React.FC = () => {
	const items: TabsProps["items"] = [
		{
			key: "login",
			label: "Login",
			children: <LoginForm />,
		},
		{
			key: "register",
			label: "Register",
			children: <RegisterForm />,
		},
	];

	return (
		<div className="landing-page" style={{backgroundColor: geekblue[0]}}>
			<Card className="card-shadow">
				<Title level={2}>Rock samples app</Title>
				<Tabs defaultActiveKey="login" items={items}></Tabs>
			</Card>
		</div>
	);
};

export default LandingPage;
