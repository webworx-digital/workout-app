'use client'

import { deleteWorkoutTemplateAction } from '@/app/actions/deleteTemplate';
import { createContext, useCallback, useState, useContext, useEffect } from 'react'

// Fix: Define TemplateData as a single object, not an array
export interface TemplateData {
    name: string,
    id: number,
    _count: {
        exercises: number
    }
}

export interface WorkoutTemplatesContextType {
    templates: TemplateData[]; // This is the array
    addTemplate: (template: TemplateData) => void; // This takes a single template
    removeTemplate: (id: number) => void;
    updateTemplate: (id: number, template: TemplateData) => void;
    setTemplates: (templates: TemplateData[]) => void;
}

export const WorkoutTemplatesContext = createContext<WorkoutTemplatesContextType>({
    templates: [],
    addTemplate: () => { },
    removeTemplate: () => { },
    updateTemplate: () => { },
    setTemplates: () => { },
})

// Custom hook for better error handling
export const useWorkoutTemplates = () => {
    const context = useContext(WorkoutTemplatesContext);
    if (!context) {
        throw new Error('useWorkoutTemplates must be used within a WorkoutTemplatesProvider');
    }
    return context;
}

export default function WorkoutTemplatesProvider({
    children,
    initialData = []
}: {
    children: React.ReactNode,
    initialData?: TemplateData[]
}) {



    const [templates, setTemplates] = useState<TemplateData[]>(() => {
        if (typeof window === 'undefined') {
            return initialData;
        }

        try {
            const savedTemplates = localStorage.getItem(process.env.TEMPLATE_STORAGE_KEY as string);
            if (savedTemplates) {
                const parsedTemplates = JSON.parse(savedTemplates);
                return parsedTemplates.length > 0 ? parsedTemplates : initialData;
            }
        } catch (error) {
            console.error('Error loading templates from localStorage:', error);
        }

        return initialData;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(process.env.TEMPLATE_STORAGE_KEY as string, JSON.stringify(templates));
            } catch (error) {
                console.error('Error saving templates to localStorage:', error);
            }
        }
    }, [templates]);

    const addTemplate = useCallback((newTemplate: TemplateData) => {
        console.log("addTemplate called with:", newTemplate)
        setTemplates(prev => [...prev, newTemplate])
    }, [])

    const removeTemplate = useCallback(async (id: number) => {
        try {
            const status = await deleteWorkoutTemplateAction(id);
            // Only update state if deletion was successful
            if (status) {
                setTemplates(prev => prev.filter(template => template.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete template:', error);
            // Handle error (show notification, etc.)
        }
    }, []);

    const updateTemplate = useCallback((id: number, updatedTemplate: TemplateData) => {
        console.log("updateTemplate called with id:", id, "template:", updatedTemplate)
        setTemplates(prev => prev.map(template =>
            template.id === id ? updatedTemplate : template
        ))
    }, [])

    const value: WorkoutTemplatesContextType = {
        templates,
        addTemplate,
        removeTemplate,
        updateTemplate,
        setTemplates
    }
    
    return (
        <WorkoutTemplatesContext.Provider value={value}>
            {children}
        </WorkoutTemplatesContext.Provider>
    )
}