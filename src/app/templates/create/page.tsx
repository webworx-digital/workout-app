'use client'
import { createTemplate } from "@/app/actions/createTemplate";
import Button from "@/app/ui/Button/Button";
import ExerciseForm from "@/app/ui/ExerciseForm/ExerciseForm";
import Input from "@/app/ui/Input/Input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useWorkoutTemplates } from "@/app/providers/workout-templates/templates";

export default function CreateTemplate() {
    const [state, action, pending] = useActionState(createTemplate, undefined);
    const { addTemplate } = useWorkoutTemplates();
    const router = useRouter();
    const [exercises, setExercises] = useState([{ id: 1 }]);

    const handleAddExercise = () => {
        const newExercise = {
            id: exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1
        };
        setExercises([...exercises, newExercise]);
    };

    const handleRemoveExercise = (exerciseId: number) => {
        if (exercises.length > 1) {
            setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
        }
    };

    useEffect(() => {
        if (state?.success) {
            addTemplate(state?.data);
            router.push('/templates');
        }
    }, [state, router, addTemplate])

    return (

        <div>
            <div className="flex justify-between items-center v">
                <h2 className="text-3xl font-bold mb-3">Create Templates</h2>
                <Link href="/templates" className="underline hover:no-underline">View Templates</Link>
            </div>
            <form action={action} className="flex flex-col bg-accent/20 rounded-[40px] p-7 ">
                {/* Input for basic information */}
                <div className="space-y-4">
                    <Input label="Template Name" name="name" type="text" error={state?.errors?.templateName} />
                </div>

                {/* Exercises */}
                <div >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-lg font-medium">Add Exercise</span>
                        <Button
                            onClick={handleAddExercise}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            + Add Exercise
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {exercises.map((exercise, index) => (
                            <ExerciseForm
                                key={exercise.id}
                                exerciseNumber={index + 1}
                                onRemove={() => handleRemoveExercise(exercise.id)}
                                errors={state?.errors?.exercises?.[`exercise_${index}`]}
                            />
                        ))}

                        <div className="flex justify-end pt-4 border-t border-gray-200">
                            <Button type="submit" className="bg-green-500 hover:bg-green-600">
                                {!pending ? 'Save Template' : 'Seving...'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}