import { SetErrors } from "@/app/utils/formatZodErrors";
import Button from "../Button/Button";
import Input from "../Input/Input";
interface SetForm {
    setNumber: number,
    exerciseNumber: number,
    onRemove: () => void,
    errors: SetErrors | undefined
}
export default function SetForm({ setNumber, exerciseNumber, onRemove, errors }: SetForm) {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-sm font-medium text-blue-700">
                {setNumber}
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1">
                <Input
                    label="Reps"
                    name={`exercise-${exerciseNumber}-set-${setNumber}-reps`}
                    type="number"
                    placeholder="Enter Reps"
                    error={errors?.reps}
                />
                <Input
                    label="Weight"
                    name={`exercise-${exerciseNumber}-set-${setNumber}-weight`}
                    type="number"
                    placeholder="Enter Weight in lbs"
                    error={errors?.weight}
                />
            </div>

            <Button
                size="sm"
                onClick={onRemove}
                variant="danger"
            >
                ×
            </Button>
        </div>
    );
}
