
import { ZodError } from 'zod'

// Types for better type safety
export interface SetErrors {
  reps?: string[]
  weight?: string[]
}

export interface ExerciseErrors {
  exerciseName?: string[]
  restBetweenSets?: string[]
  sets: Record<string, SetErrors>
}

interface GroupedErrors {
  templateName?: string[]
  exercises: Record<string, ExerciseErrors>
  general?: string[]
}

// Optimized grouped error formatter
export const formatZodErrorsGrouped = (error: ZodError): GroupedErrors => {
  const result: GroupedErrors = { exercises: {} }
  
  const issues = error.issues
  const issueCount = issues.length
  
  for (let i = 0; i < issueCount; i++) {
    const issue = issues[i]
    const path = issue.path
    const message = issue.message
    const pathLength = path.length
    
    if (pathLength === 0) {
      (result.general ??= []).push(message)
      continue
    }
    
    const firstPath = path[0]
    
    if (firstPath === 'templateName') {
      (result.templateName ??= []).push(message)
      continue
    }
    
    if (firstPath === 'exercises' && pathLength >= 2) {
      const exerciseIndex = path[1] as number
      const exerciseKey = `exercise_${exerciseIndex}`
      
      // Lazy initialization of exercise object
      let exercise = result.exercises[exerciseKey]
      if (!exercise) {
        exercise = result.exercises[exerciseKey] = { sets: {} }
      }
      
      if (pathLength === 2) {
        // General exercise error
        (exercise.exerciseName ??= []).push(message)
        continue
      }
      
      const fieldName = path[2] as string
      
      if (fieldName === 'exerciseName') {
        (exercise.exerciseName ??= []).push(message)
      } else if (fieldName === 'restBetweenSets') {
        (exercise.restBetweenSets ??= []).push(message)
      } else if (fieldName === 'sets' && pathLength >= 4) {
        const setIndex = path[3] as number
        const setKey = `set_${setIndex}`
        
        // Lazy initialization of set object
        let set = exercise.sets[setKey]
        if (!set) {
          set = exercise.sets[setKey] = {}
        }
        
        if (pathLength >= 5) {
          const setField = path[4] as 'reps' | 'weight'
          if (setField === 'reps') {
            (set.reps ??= []).push(message)
          } else if (setField === 'weight') {
            (set.weight ??= []).push(message)
          }
        } else {
          // General set error - default to reps
          (set.reps ??= []).push(message)
        }
      }
    } else {
      // Fallback for unknown paths
      (result.general ??= []).push(message)
    }
  }
  
  return result
}