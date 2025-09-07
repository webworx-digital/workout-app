'use server';
import { getUser } from '../lib/dal';
import { CreateTemplateFormState, CreateTemplateSchema } from '../lib/definitions';
import prisma from '../lib/prisma';
import { formatZodErrorsGrouped } from '../utils/formatZodErrors';


export async function createTemplate(state: CreateTemplateFormState, formData: FormData) {
    // Validate form fields

    try {
        // Parse the form data
        const workoutName = formData.get('name'); // "Push"

        // Extract exercise data
        const exercises = [];
        let exerciseIndex = 1;

        while (formData.has(`exercise-${exerciseIndex}-name`)) {
            const exerciseName = formData.get(`exercise-${exerciseIndex}-name`);

            // Extract sets for this exercise
            const sets = [];
            let setIndex = 1;

            while (formData.has(`exercise-${exerciseIndex}-set-${setIndex}-reps`)) {
                const reps = parseInt(formData.get(`exercise-${exerciseIndex}-set-${setIndex}-reps`) as string || '0');
                const weight = parseFloat((formData.get(`exercise-${exerciseIndex}-set-${setIndex}-weight`) as string) || '0');

                sets.push({
                    reps,
                    weight,
                });

                setIndex++;
            }

            exercises.push({
                name: typeof exerciseName === 'string' ? exerciseName : (exerciseName?.toString() ?? ''),
                restBetweenSets: 60, // Default rest time, you might want to add this to your form
                sets
            });
            exerciseIndex++;
        }



        const validatedFields = CreateTemplateSchema.safeParse({
            templateName: workoutName,
            exercises: exercises
        })


        if (!validatedFields.success) {
            return {
                errors: formatZodErrorsGrouped(validatedFields.error)
            }
        }

        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }
        // Create the workout with nested exercises and sets
        const workout = await prisma.workoutTemplate.create({
            data: {
                name: typeof workoutName === 'string' ? workoutName : (workoutName?.toString() ?? ''),
                userId: parseInt(user.userId as string),
                exercises: {
                    create: exercises.map(exercise => ({
                        name: exercise.name,
                        restBetweenSets: exercise.restBetweenSets,
                        sets: {
                            create: exercise.sets
                        }
                    }))
                }
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
        });

        return {
            success: {
                message: "Workout Template Created!!",
            },
            data: workout
        };
    } catch (error) {
        console.error('Error saving workout:', error);
        throw error;
    }

}