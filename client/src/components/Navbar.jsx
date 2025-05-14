import React from "react";
import { UserCircle2, Menu } from "lucide-react"; // Lucide React User and Menu Icons
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[8vh] flex justify-between items-center px-4 bg-main w-full py-2 md:px-12 shadow-lg">
      <div className="flex items-center space-x-4">
        <Menu
          className="w-6 h-6 cursor-pointer"
          onClick={toggleSidebar} 
        />

        <span
          className="cursor-pointer text-xl font-bold"
          onClick={() => navigate("/")}
        >
          Student Results
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <UserCircle2 className="w-6 h-6" />
        <span className="text-sm font-medium">Admin</span>
      </div>
    </div>
  );
};

export default Navbar;
