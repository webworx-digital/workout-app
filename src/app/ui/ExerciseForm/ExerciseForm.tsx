import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import SetForm from "../SetForm/SetForm";
import { ExerciseErrors } from "@/app/utils/formatZodErrors";

export interface ExerciseForm {
    exerciseNumber: number,
    onRemove: () => void,
    errors: ExerciseErrors | undefined
}

const vars: Omit<ExerciseForm, "onRemove"> = { exerciseNumber: 1, errors: undefined }

export default function ExerciseForm({ exerciseNumber, onRemove, errors }: ExerciseForm) {
    const [sets, setSets] = useState([{ id: 1 }]);

    const handleAddSet = () => {
        const newSet = {
            id: sets.length > 0 ? Math.max(...sets.map(s => s.id)) + 1 : 1
        };
        setSets([...sets, newSet]);
    };

    const handleRemoveSet = (setId: number) => {
        if (sets.length > 1) {
            setSets(sets.filter(set => set.id !== setId));
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-3">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Exercise {exerciseNumber}</h3>
                <Button
                    size="sm"
                    onClick={onRemove}
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    Remove Exercise
                </Button>

            </div>

            <div className="space-y-4">
                {/* Exercise Name */}
                <Input
                    label="Exercise Name"
                    name={`exercise-${exerciseNumber}-name`}
                    type="text"
                    placeholder="e.g., Bench Press"
                    error={errors?.exerciseName}
                />

                {/* Sets Section */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-md font-medium text-gray-700">Sets ({sets.length})</h4>
                        <Button
                            size="sm"
                            onClick={handleAddSet}
                            className="bg-green-500 hover:bg-green-600 text-white"
                        >
                            + Add Set
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {sets.map((set, index) => (
                            <SetForm
                                key={set.id}
                                setNumber={index + 1}
                                exerciseNumber={exerciseNumber}
                                onRemove={() => handleRemoveSet(set.id)}
                                errors={errors?.sets?.[`set_${index}`]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}