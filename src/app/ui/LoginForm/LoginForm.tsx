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
        <form action={action} className={`gap-2 shadow-md transition-[padding] px-8 py-12 lg:px-12 flex text-white relative flex-wrap ${className}`}>
            <div className='w-full mb-6 text-center'>
                <h1 className='text-3xl font-semibold'>Login</h1>
                <p className='text-gray-400'>Log your workout today!</p>
            </div>
            <Input label='Email' classNames="w-full text-white [&_span]:text-cyan-500/90! [&_input:focus]:bg-black/50!" name="email" type='text' error={state?.errors?.email} />
            <Input label="Password" classNames="w-full text-white [&_span]:text-cyan-500/90! [&_input:focus]:bg-black/50!" name="password" type='password' error={state?.errors?.password} />

            <div className="flex justify-center items-center gap-3 mt-4 flex-col w-full">
                <Button variant="outline" className="w-full" disabled={pending} size="lg" type='submit'>Login</Button>
                <p>
                    Want to Register? <Link className="underline hover:no-underline" href="/signup">Signup</Link>
                </p>
            </div>
            <Toaster />
        </form>
    )
}