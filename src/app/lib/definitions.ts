import { z } from 'zod'

export const LogInFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})


export const SignUpFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    age: z.number().min(12, { message: 'Age must be 12 years or more.' })
})



export const CreateTemplateSchema = z.object({
    templateName: z
        .string()
        .min(3, { message: 'Template Name must be at least 3 characters long.' })
        .trim(),
    exercises: z
        .array(
            z.object({
                name: z
                    .string()
                    .min(3, { message: 'Exercise name must be at least 3 characters long.' })
                    .trim(),
                restBetweenSets: z
                    .number()
                    .min(0, { message: 'Rest time must be positive.' }),
                sets: z
                    .array(
                        z.object({
                            reps: z
                                .number()
                                .min(1, { message: 'Reps must be at least 1.' }),
                            weight: z
                                .number()
                                .min(0, { message: 'Weight must be positive.' })
                        })
                    )
                    .min(1, { message: 'Each exercise must have at least one set.' })
            })
        )
        .min(1, { message: 'Template must have at least one exercise.' })
})

export type CreateTemplateFormState = | {
    errors?: {

        templateName?: string[]
        name?: string[]
    }
    message?: string
    success?: {
        message?: string
    }
} | undefined

export type FormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
            age?: string[]


        }
        message?: string
        success?: {
            message?: string
        }
    }
    | undefined