'use server';

import { LogInFormSchema, FormState, SignUpFormSchema } from '@/app/lib/definitions'
import bcrypt from "bcryptjs";
import prisma from '../lib/prisma';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields

  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    age: parseInt(formData.get('age') as string || '0'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { age, name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age,
        gender: 'female'
      }
    })

    return {
      success: {
        message: "User created successfully."
      }
    }
  } catch (err: unknown) {
    // Handle email duplication
    const error = err as { name?: string };
    switch (error.name) {
      case "PrismaClientKnownRequestError":
        return {
          errors: {
            email: ['Email already exists. Please try another email']
          }
        }
    }
  }
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields

  const validatedFields = LogInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return {
      errors: {
        email: ['No user found with this email.']
      }
    }
  }

  if (!await bcrypt.compare(password, user.password)) {
    return {
      errors: {
        password: ['Incorrect Password entered.']
      }
    }
  }

  await createSession(String(user.id))

  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}