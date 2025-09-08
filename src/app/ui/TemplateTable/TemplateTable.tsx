'use client'
import { Suspense, useEffect, useState } from "react";
import { useWorkoutTemplates } from "@/app/providers/workout-templates/templates";
import TemplateTableLoading from "../TemplateTableLoading/TemplateTableLoading";
import TemplateTableContent from "../TemplateTableContent/TemplateTableContent";

export default function TemplateTable() {
    const { templates } = useWorkoutTemplates();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        console.log(templates)
    }, [ templates.length]);

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