import { getWorkoutTemplates } from "../lib/dal";
import WorkoutTemplatesProvider from "../providers/workout-templates/templates";

export default async function TemplatesViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getWorkoutTemplates();
  return (
    <WorkoutTemplatesProvider initialData={data}>{children}</WorkoutTemplatesProvider>
  );
}
