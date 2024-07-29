"use server";

import { writeFileSync } from "fs";
import { cookies } from "next/headers";

interface StoreTokenRequest {
	token: string;
}

export const storeToken = async (request: StoreTokenRequest) => {
	cookies().set({
		name: "accessToken",
		value: request.token,
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});
};

export const getToken = async () => cookies().get("accessToken");

export const writeToFile = (name: string, modelFile: Uint8Array) => {
	console.log("Writing file");
	writeFileSync(`/public/models/${name}.glb`, modelFile);
};