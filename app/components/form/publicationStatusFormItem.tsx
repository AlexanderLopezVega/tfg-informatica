import { Form, Select } from "antd";

const PublicationStatusFormItem: React.FC = () => {
	return (
		<Form.Item name="publicationStatus" label="Publication status">
			<Select
				options={[
					{ value: 0, label: "Private" },
					{ value: 1, label: "Public" },
				]}
			/>
		</Form.Item>
	);
};

export default PublicationStatusFormItem;