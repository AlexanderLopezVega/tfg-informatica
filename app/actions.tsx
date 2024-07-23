'use server'

import { cookies } from 'next/headers';

interface StoreTokenRequest {
    token: string,
}

export const storeToken = async (request: StoreTokenRequest) => {
    cookies().set({
        name: 'accessToken',
        value: request.token,
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    });

    // cookies().set({
    //     name: 'refreshToken',
    //     value: request.refreshToken,
    //     httpOnly: true,
    //     sameSite: 'strict',
    //     secure: true
    // });
};