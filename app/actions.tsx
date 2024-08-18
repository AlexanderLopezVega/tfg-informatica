"use server";

import { cookies } from "next/headers";

interface StoreTokenRequest {
	token: string;
	userID: number;
}

export const storeToken = async (request: StoreTokenRequest) => {
	cookies().set({
		name: "accessToken",
		value: JSON.stringify({
			token: request.token,
			userID: request.userID,
		}),
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});
};

export const getToken = async () => cookies().get("accessToken");

export const deleteToken = async () => cookies().delete("accessToken");
