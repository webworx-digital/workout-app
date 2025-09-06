'use client'

import { login } from '@/app/actions/auth'
import { useActionState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { FormProps } from '../SignUpForm/SignUpForm'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'

export default function LoginForm({ className }: FormProps) {
    //
    const [state, action, pending] = useActionState(login, undefined)
    
    return (
        <form action={action} className={`gap-2 shadow-md p-12 flex text-gray-800 relative flex-wrap ${className}`}>
            <div className='w-full mb-6 text-center'>
                <h1 className='text-xl font-semibold'>Login</h1>
                <p className='text-gray-400'>Log your workout today!</p>
            </div>
            <Input label='Email' classNames="w-full" name="email" type='text' error={state?.errors?.email} />
            <Input label="Password" classNames="w-full" name="password" type='password' error={state?.errors?.password} />

            <div className="flex justify-center items-center gap-3 flex-col w-full">
                <Button disabled={pending} size="lg" type='submit'>Login</Button>
                <p>
                    Want to Register? <Link className="underline" href="/signup">Signup</Link>
                </p>
            </div>
            <Toaster />
        </form>
    )
}