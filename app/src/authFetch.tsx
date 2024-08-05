import { getToken } from "@/actions";

export const fetchWithAuthentication = (url: string | URL | globalThis.Request, init: RequestInit, thenCallback: (data: Response) => void, catchCallback?: (reason: any) => void) => {
	//  Fetch authentication token
	getToken().then((cookie) => {
		//  Raise error if not found cookie or token
		if (!cookie || !cookie.value) throw new Error("Authentication missing");

		//  Add authentication header to init
		const requestHeaders = new Headers(init.headers);
		const token = cookie.value;

		requestHeaders.set("Authentication", `Bearer ${token}`);

		init.headers = requestHeaders;

		//  Perform fetch
		fetch(url, init)
			.then((data) => thenCallback(data))
			.catch((reason) => catchCallback?.(reason));
	});
};

export const authFetch = async (url: string | URL | globalThis.Request, init: RequestInit) => {
	//  Fetch authentication token
	const cookie = await getToken();

	//  Raise error if not found cookie or token
	if (!cookie || !cookie.value)
		throw new Error("Authentication missing");

	//  Add authentication header to init
	const requestHeaders = new Headers(init.headers);
	const token = cookie.value;

	requestHeaders.set("Authentication", `Bearer ${token}`);

	init.headers = requestHeaders;

	//  Perform fetch
	return fetch(url, init);
}