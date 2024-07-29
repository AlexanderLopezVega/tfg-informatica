"use client"

//  Imports
import React, { createContext, useContext, useState, ReactNode } from "react";

//  Interface declarations
interface HeaderContextType {
	headerContent: ReactNode;
	setHeaderContent: (content: ReactNode) => void;
}

//  External component declarations
export const HeaderContext: React.Context<HeaderContextType | undefined> = createContext<HeaderContextType | undefined>(undefined);

//  Component declaration
export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [headerContent, setHeaderContent] = useState<ReactNode>(null);

	return <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>{children}</HeaderContext.Provider>;
};

//  Other exports
export const useHeader = () => {
	const context = useContext(HeaderContext);

	if (!context) throw new Error("useHeader must be used within a HeaderProvider");

	return context;
};