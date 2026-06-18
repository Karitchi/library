import { Link, useLocation } from "react-router";

export function AuthTabs() {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center text-lg">
      <div className="border border-black flex">
        <Link
          to="/signin"
          className={`p-1 no-underline border-r border-black ${
            pathname === "/signin" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Connexion
        </Link>
        <Link
          to="/signup"
          className={`p-1 no-underline ${
            pathname === "/signup" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Inscription
        </Link>
      </div>
    </div>
  );
}
