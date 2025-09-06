
export default function History() {
  return (
    <div className="gap-4 container mx-auto">
      <h2 className="text-3xl font-bold mb-3">Templates</h2>
      <div data-table="templates">
        <div data-table-header>
          <div>Template Name</div>
          <div>Total Exercises</div>
          <div>Actions</div>
        </div>
        <ul data-table-list>
          <li>
            <p>Push Day</p>
            <p>
              12 Exercises
            </p>
          </li>
          <li>
            <p>Push Day</p>
            <p>
              12 Exercises
            </p>
          </li>
          <li>
            <p>Push Day</p>
            <p>
              12 Exercises
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
