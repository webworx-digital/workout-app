'use client'
import { Suspense, useEffect, useState } from "react";
import { TemplateData, useWorkoutTemplates } from "@/app/providers/workout-templates/templates";
import TemplateTableLoading from "../TemplateTableLoading/TemplateTableLoading";
import TemplateTableContent from "../TemplateTableContent/TemplateTableContent";

export default function TemplateTable({ initialData }: {
    initialData: TemplateData[]
}) {
    const { setTemplates, templates } = useWorkoutTemplates();
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
                    <TemplateTableContent  />
                )}
            </Suspense>
        </div>
    )
}