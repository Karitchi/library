import { useState } from "react";
import { Link } from "react-router";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between my-5 relative">
      <div>
        <button onClick={() => setOpen(!open)} className="text-xl cursor-pointer">
          ☰
        </button>
        {open && (
          <div className="absolute top-8 left-0 bg-white border rounded shadow-md z-10">
            <Link to="/books" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
              Books
            </Link>
            <Link to="/rentals" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
              My Rentals
            </Link>
          </div>
        )}
      </div>
      <Link to="/books" className="text-center text-2xl no-underline text-inherit">librarian</Link>
      <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-300 transition-colors">
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </button>
    </div>
  );
}
