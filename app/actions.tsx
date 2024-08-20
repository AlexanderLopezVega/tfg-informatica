"use server";

import { cookies } from "next/headers";

export const storeToken = async (token: string) => {
	cookies().set({
		name: "accessToken",
		value: token,
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});
};

export const getToken = async () => cookies().get("accessToken");

export const deleteToken = async () => cookies().delete("accessToken");
