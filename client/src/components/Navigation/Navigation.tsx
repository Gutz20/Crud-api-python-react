import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <div className="flex justify-between py-3">
        <Link
          to="/tasks"
          className="hover:underline"
        >
          <h1 className="text-3xl font-bold">Tasks App</h1>
        </Link>
        <Link
          to="/tasks/new"
          className="hover:underline bg-indigo-500 px-3 py-2 rounded-lg"
        >
          Create Task
        </Link>
      </div>
    </header>
  );
};

export default Navigation;
