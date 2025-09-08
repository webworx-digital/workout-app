'use server'
import { deleteWorkoutTemplate } from "../lib/dal";

export async function deleteWorkoutTemplateAction(id: number) {
    try {

        const result = await deleteWorkoutTemplate(id);

        return {
            success: result.status,
            data: result
        };
    } catch (error) {
        console.error('Error deleting workout template:', error);
        return {
            success: false,
            error: 'Failed to delete workout template'
        };
    }
}