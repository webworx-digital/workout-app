
import Link from "next/link";
import { getWorkoutTemplates } from "../lib/dal";
import TemplateTable from "../ui/TemplateTable/TemplateTable";

export default async function Templates() {
  // Fetch data at the page level
  const data = await getWorkoutTemplates();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-3">Templates</h2>
        <Link href="/templates/create" className="underline hover:no-underline">
          Create Templates
        </Link>
      </div>

      <TemplateTable initialData={data} />
    </div>
  );
}
