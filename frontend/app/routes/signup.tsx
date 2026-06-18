import { Link, useNavigate } from "react-router";
import { AuthForm } from "../components/AuthForm";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "user" }),
    });

    if (!response.ok) {
      throw new Error("Signup failed. Email may already exist.");
    }

    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-black">
        <div className="flex justify-center text-lg border border-black">
          <Link to="/signin" className="p-1 bg-white text-black no-underline border-r border-black">
            Connexion
          </Link>
          <Link to="/signup" className="p-1 bg-black text-white no-underline">
            Inscription
          </Link>
        </div>
        <AuthForm
          title="Inscription"
          submitLabel="Inscription"
          submittingLabel="Inscription en cours..."
          onSubmit={handleSubmit}
          bottomText="Déjà un compte ?"
          bottomLink="/signin"
          bottomLinkLabel="Connexion"
        />
      </div>
    </div>
  );
}
