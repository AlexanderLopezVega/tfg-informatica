"use client";

import type { TabsProps } from "antd";
import { useRouter } from "next/navigation";
import { storeToken } from "@/actions";
import React from "react";
import { Button, Card, Form, Input, Tabs, Typography } from "antd/lib";
import { geekblue } from "@ant-design/colors";
import "antd/dist/reset.css";
import "./login.css";

const { Title } = Typography;

const LoginForm = () => {
	const [formData] = Form.useForm();
	const router = useRouter();

	const onFinish = async (values: any) => {
		//	Post login request
		const input = "http://localhost:5047/api/auth/login";
		const init = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: values.username,
				passwordHash: values.password,
			}),
		};

		fetch(input, init)
			.then((data) => {
				if (data.ok)
					data.json().then((data) => {
						storeToken(data).then(() => router.push("dashboard"));
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Form form={formData} name="login" onFinish={onFinish}>
			<Form.Item name="username" rules={[{ required: true, message: "Please input your username" }]}>
				<Input placeholder="Username"></Input>
			</Form.Item>

			<Form.Item name="password" rules={[{ required: true, message: "Please input your password" }]}>
				<Input.Password placeholder="Password"></Input.Password>
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
	const router = useRouter();

	const onFinish = async (values: any) => {
		//	Post register request
		const url = "http://localhost:5047/api/auth/register";
		const init = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: values.username,
				passwordHash: values.password,
			}),
		};

		fetch(url, init)
			.then((data) => {
				data.json().then((data) => {
					storeToken(data).then(() => router.push("dashboard"));
				});
			})
			.catch((error) => {
				console.log(error);
			});
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

const Login: React.FC = () => {
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
		<div className="login-page" style={{ backgroundColor: geekblue[0] }}>
			<Card className="card-shadow">
				<Title level={2}>Rock samples app</Title>
				<Tabs defaultActiveKey="login" items={items}></Tabs>
			</Card>
		</div>
	);
};

export default Login;
