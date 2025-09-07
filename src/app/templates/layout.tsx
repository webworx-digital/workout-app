import WorkoutTemplatesProvider from "../providers/workout-templates/templates";

export default async function TemplatesViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
   <WorkoutTemplatesProvider>{children}</WorkoutTemplatesProvider>
  );
}
