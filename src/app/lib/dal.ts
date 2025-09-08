

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation';
import prisma from './prisma';
import { revalidateTag, unstable_cache } from 'next/cache';

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
        return payload; // or whatever user data you store
    } catch (error) {
        console.error('Failed to get user:', error);
        return null; // Return null on error
    }
})
export const getWorkoutTemplates = async () => {
    const { isAuth, userId } = await verifySession();

    if (!isAuth || !userId) {
        return {
            error: {
                message: "You are not authorised to see the templates"
            }
        };
    }

    return await getCachedWorkoutTemplates(userId.toString());
}

const getCachedWorkoutTemplates = unstable_cache(
    async (userId: string) => {
        const data = await prisma.workoutTemplate.findMany({
            where: {
                userId: parseInt(userId)
            },
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        exercises: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });
        return JSON.parse(JSON.stringify(data));
    },
    ['workout-templates'],
    {
        tags: ['workout-templates'],
        revalidate: 3600
    }
);

export const getUserAuthorizationForTemplate = async (templateId: number, userId: number) => {
    const template = await prisma.workoutTemplate.findFirst({
        where: {
            id: templateId,
            userId
        },
    })

    return template ? true : false;
}

export const deleteWorkoutTemplate = async (id: number) => {
    console.log(id)
    const { isAuth, userId } = await verifySession();

    const isUserAuthorized = await getUserAuthorizationForTemplate(id, parseInt(userId.toString()));
    // Add proper validation before using userId
    if (!isAuth || !userId || !isUserAuthorized) {
        return {
            status: false,
            error: "User not authenticated"
        }
    }
    try {
        await prisma.workoutTemplate.delete({
            where: {
                id: id,
                userId: parseInt(userId.toString())
            }
        })
        revalidateTag('workout-templates');
        return {
            status: true
        }
    } catch (err) {
        console.log(err)
        return {
            status: false
        }
    }
}


export const getTotalWorkoutTemplates = async () => {
    const { isAuth, userId } = await verifySession();
    if (isAuth && userId) {
        const count = await prisma.workoutTemplate.count({
            where: {
                userId: parseInt(userId.toString())
            }
        });
        return JSON.parse(JSON.stringify(count));
    }
}