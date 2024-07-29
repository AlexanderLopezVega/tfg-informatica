import type { Metadata } from "next";
import "@/globals.css";
import { RootStyleRegistry } from "@/lib/RootStyleRegistry";
import { HeaderProvider } from "@/src/headerContext";

export const metadata: Metadata = {
	title: "TFG Informática",
	description: "Proyecto para la gestión de muestras de rocas",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en">
			<body>
				<HeaderProvider>
					<RootStyleRegistry>{children}</RootStyleRegistry>
				</HeaderProvider>
			</body>
		</html>
	);
};

export default RootLayout;
