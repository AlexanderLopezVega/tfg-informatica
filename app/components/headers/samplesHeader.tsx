import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

const SamplesHeader: React.FC = () => {
	return (
		<>
			<Button icon={<UploadOutlined />}>Upload</Button>
		</>
	);
};

export default SamplesHeader;
