import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const DescriptionFormItem: React.FC = () => {
	return (
		<Form.Item name="description" label="Description">
			<TextArea rows={5} />
		</Form.Item>
	);
};

export default DescriptionFormItem;
