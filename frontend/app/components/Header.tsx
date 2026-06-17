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
      <p>avatar</p>
    </div>
  );
}
