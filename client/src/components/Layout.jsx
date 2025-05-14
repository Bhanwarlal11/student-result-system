import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-10  h-16">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row pt-16 h-full">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Scrollable Content Area (Only Outlet scrolls) */}
        <div
          className="w-full flex-1 overflow-y-auto p-4 mr-1"
          style={{
            height: "calc(100vh - 64px)",
            backgroundColor: "#ffffff",
            color: "#333",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
