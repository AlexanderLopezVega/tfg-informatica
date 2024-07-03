import { Button, Card, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import "../app/globals.css";
import "./landing.css";

const { Title } = Typography;

type FieldType = {
	username?: string;
	password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
	console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const Landing = () => {
	return (
		<div id="landingContainer">
			<Card className="box-shadow">
				<Title level={1} style={{ textAlign: "center" }}>
					Login
				</Title>
				<Form
					name="test"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
						<Input />
					</Form.Item>

					<Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Landing;
