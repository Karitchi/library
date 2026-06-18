import { Link, useNavigate } from "react-router";
import { AuthForm } from "../components/AuthForm";

export default function Signin() {
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    navigate("/books");
  };

  return (
    <div>
      <div className="flex justify-center text-lg">
        <div className="border border-black flex">
          <Link to="/signin" className="p-1 bg-black text-white no-underline border-r border-black">
            Connexion
          </Link>
          <Link to="/signup" className="p-1 bg-white text-black no-underline">
            Inscription
          </Link>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <AuthForm
          title="Connexion"
          submitLabel="Connexion"
          submittingLabel="Connexion en cours..."
          onSubmit={handleSubmit}
          bottomText="Pas encore de compte ?"
          bottomLink="/signup"
          bottomLinkLabel="Inscription"
        />
      </div>
    </div>
  );
}
