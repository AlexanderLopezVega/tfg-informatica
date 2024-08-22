import { Spin } from "antd";
import { ReactNode } from "react";

export type LoadingSpinProps = {
	isLoading: boolean;
	children: ReactNode;
};

export const LoadingSpin: React.FC<LoadingSpinProps> = ({ isLoading, children }) => (isLoading ? <Spin>{children}</Spin> : <>{children}</>);
