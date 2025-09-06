

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation';


export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = cookie ? await decrypt(cookie) : null

    if (!session?.userId) {
        redirect('/login')
    }

    return { isAuth: true, userId: session?.userId }
})

export const getUser = cache(async () => {

    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value;

        if (!session) {
            return null; // Return null instead of undefined
        }

        const payload = await decrypt(session);

        if (!payload) {
            return null;
        }
        return payload.user; // or whatever user data you store
    } catch (error) {
        console.error('Failed to get user:', error);
        return null; // Return null on error
    }
})