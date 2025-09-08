import Link from "next/link";
import TemplateTable from "../ui/TemplateTable/TemplateTable";

export default async function Templates() {

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-3">Templates</h2>
        <Link href="/templates/create" className="underline hover:no-underline">
          Create Templates
        </Link>
      </div>

      <TemplateTable />
    </div>
  );
}
