export default function TemplateTableLoading() {
    return (
        <ul data-table-list>
            {/* Generate 5 skeleton rows */}
            {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="animate-pulse">
                    <span className="h-5 py-2 bg-gray-200 text-red-600 rounded w-full col-span-3"></span>
                </li>
            ))}
        </ul>
    )
}