import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function AvatarMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Déconnecté avec succès");
    navigate("/signin");
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-9 h-9 bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-10 bg-black shadow-md z-10">
          <Link to="/rentals" className="block px-4 py-2 text-white border border-transparent hover:bg-white hover:text-black hover:border-black" onClick={() => setOpen(false)}>
            Mes locations
          </Link>
          {role === "librarian" && (
            <Link to="/rentals/all" className="block px-4 py-2 text-white border border-transparent hover:bg-white hover:text-black hover:border-black" onClick={() => setOpen(false)}>
              Toutes les locations
            </Link>
          )}
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white border border-transparent hover:bg-white hover:text-black hover:border-black cursor-pointer">
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
