
const EnvTest: React.FC = () => {
	

	return (
		<>
			<p>Current working directory: {process.cwd()}</p>
			<br/>
			<p>Frontend port: {process.env.FRONTEND_PORT}</p>
			<p>Frontend address: {process.env.FRONTEND_ADDRESS}</p>
			<br/>
			<p>Backend port: {process.env.BACKEND_PORT}</p>
			<p>Backend address: {process.env.BACKEND_ADDRESS}</p>
		</>
	);
};

export default EnvTest;
