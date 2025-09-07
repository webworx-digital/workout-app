'use client'

import { signup } from '@/app/actions/auth'
import { useActionState, useEffect } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link'

export interface FormProps {
    className?: string
}

export default function SignUpForm({ className }: FormProps) {
    const [state, action, pending] = useActionState(signup, undefined)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success.message || 'Success!');
        }
    }, [state?.success])

    return (
        <form action={action} className={` gap-2 shadow-md p-12 flex text-gray-800 relative flex-wrap ${className}`}>
            <div className='w-full mb-6 text-center'>
                <h1 className='text-xl font-semibold'>Create an Account</h1>
                <p className='text-gray-400'>Get started with WorkoutApp Today</p>
            </div>
            <Input label='Name' classNames='flex-1' name="name" type='text' error={state?.errors?.name} />
            <Input label='Age' classNames='flex-1' name="age" type='number' error={state?.errors?.age} />
            <Input label='Email' classNames='w-full' name="email" type='text' error={state?.errors?.email} />
            <Input label="Password" classNames='w-full' name="password" type='password' error={state?.errors?.password} />

            <div className="flex justify-center items-center gap-3 flex-col w-full">
                <Button disabled={pending} size="lg" type='submit'>Create Account</Button>
                <p>
                    Already Have an Account? <Link className="underline"href="/login">Login</Link>
                </p>
            </div>
            <Toaster />
        </form>
    )
}