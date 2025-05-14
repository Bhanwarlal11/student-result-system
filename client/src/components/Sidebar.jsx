import { Link } from "react-router-dom";

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
  const handleClick = () => {
    // Only close sidebar on small screens
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <aside
      className={`bg-background border-r md:w-64 w-64 fixed md:static h-full z-20 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out`}
    >
      <nav className="flex flex-col gap-2 p-4">
        <Link
          to="/"
          onClick={handleClick}
          className="!text-black hover:bg-muted px-3 py-2 rounded"
        >
          Overview
        </Link>
        <Link
          to="/students"
          onClick={handleClick}
          className="!text-black hover:bg-muted px-3 py-2 rounded"
        >
          Students
        </Link>
        <Link
          to="/subjects"
          onClick={handleClick}
          className="!text-black hover:bg-muted px-3 py-2 rounded"
        >
          Subjects
        </Link>
      </nav>
    </aside>
  );
}
