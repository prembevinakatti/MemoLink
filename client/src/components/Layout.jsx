import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiHome, FiSearch, FiPlusCircle, FiGrid, FiBell } from "react-icons/fi";
import toast from "react-hot-toast";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location to track active route

  // Helper function to check if the route is active
  const isActive = (path) =>
    location.pathname === path ? "text-blue-500" : "text-gray-600";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      {/* Header with Logout Button */}
      <header className="fixed top-0 w-full bg-black shadow-lg border-b border-zinc-900 text-white z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold ">MemoLink</h1>
          <Button
            variant="destructive"
            onClick={() => {
              toast.success("Logout Successfully"); // Replace with actual logout logic
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Outlet for rendering child routes */}
      <main className="flex-grow pt-20 p-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-black shadow-lg rounded-full border-t border-zinc-900">
        <div className="flex justify-around py-2">
          <button
            onClick={() => navigate("/home")}
            className={`flex flex-col transition-all hover:scale-110 items-center ${isActive(
              "/home"
            )} hover:text-blue-500`}
          >
            <FiHome size={24} />
            <span className="text-sm">Home</span>
          </button>
          <button
            onClick={() => navigate("/home/search")}
            className={`flex transition-all hover:scale-110 flex-col items-center ${isActive(
              "/home/search"
            )} hover:text-blue-500`}
          >
            <FiSearch size={24} />
            <span className="text-sm">Search</span>
          </button>
          <button
            onClick={() => navigate("/home/create")}
            className={`flex flex-col transition-all hover:scale-110 items-center ${isActive(
              "/home/create"
            )} hover:text-blue-500`}
          >
            <FiPlusCircle size={24} />
            <span className="text-sm">Create</span>
          </button>
          <button
            onClick={() => navigate("/home/dashboard")}
            className={`flex flex-col transition-all hover:scale-110 items-center ${isActive(
              "/home/dashboard"
            )} hover:text-blue-500`}
          >
            <FiGrid size={24} />
            <span className="text-sm">Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/home/notifications")}
            className={`flex flex-col transition-all hover:scale-110 items-center ${isActive(
              "/home/notifications"
            )} hover:text-blue-500`}
          >
            <FiBell size={24} />
            <span className="text-sm">Notifications</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
