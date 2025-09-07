'use client'
import { Suspense, useEffect, useState } from "react";
import Button from "../Button/Button"
import { TemplateData, useWorkoutTemplates } from "@/app/providers/workout-templates/templates";
import TemplateTableLoading from "../TemplateTableLoading/TemplateTableLoading";

// Separate component for the actual table content
function TemplateTableContent({ templates, removeTemplate }: {
    templates: TemplateData[],
    removeTemplate: (id: number) => void
}) {
    return (
        <ul data-table-list>
            {templates?.length > 0 ?
                templates.map((item: TemplateData, index: number) => {
                    return (
                        <li key={`template-${item.name}-${index}`}>
                            <span>{item.name}</span>
                            <span>{item._count.exercises}</span>
                            <span>
                                <Button onClick={() => removeTemplate(item.id)}>Delete</Button>
                            </span>
                        </li>
                    )
                }) :
                <li>
                    <span className="col-span-3 text-center">No Workout Templates found.</span>
                </li>
            }
        </ul>
    );
}

export default function TemplateTable({ initialData }: {
    initialData: TemplateData[]
}) {
    const { setTemplates, templates, removeTemplate } = useWorkoutTemplates();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (templates.length === 0) {
            setTemplates(initialData);
        }
        setIsLoading(false);
    }, [initialData, setTemplates, templates.length]);

    return (
        <div data-table="templates">
            <div data-table-header>
                <div>Template Name</div>
                <div>Total Exercises</div>
                <div>Actions</div>
            </div>

            <Suspense fallback={<TemplateTableLoading />}>
                {isLoading ? (
                    <TemplateTableLoading />
                ) : (
                    <TemplateTableContent
                        templates={templates}
                        removeTemplate={removeTemplate}
                    />
                )}
            </Suspense>
        </div>
    )
}