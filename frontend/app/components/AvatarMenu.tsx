import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function AvatarMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-300 transition-colors">
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-10 bg-white border rounded shadow-md z-10">
          <Link to="/rentals" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
            My Rentals
          </Link>
          {role === "librarian" && (
            <Link to="/rentals/all" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
              All Rentals
            </Link>
          )}
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
