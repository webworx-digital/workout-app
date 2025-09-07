import { getTotalWorkoutTemplates } from "./lib/dal";


export default async function Home() {
  const totalTemplates = await getTotalWorkoutTemplates();
  return (
    <div className="text-2xl gap-4">
      <div className="bg-accent/20 w-1/4 text-center overflow-hidden shadow sm:rounded-lg ">
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-sm leading-5 mb-5 font-medium text-primary/80">Total Templates</dt>
            <dd className="mt-1 text-6xl leading-9 font-semibold text-primary">{totalTemplates}</dd>
          </dl>
          <div></div>
        </div>
      </div>
    </div>
  );
}
