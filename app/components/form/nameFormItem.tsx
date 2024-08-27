import { Form, Input } from "antd";

const NameFormItem: React.FC = () => {
	return (
		<Form.Item name="name" label="Name" rules={[{ required: true, message: "Name cannot be empty" }]}>
			<Input />
		</Form.Item>
	);
};

export default NameFormItem;
