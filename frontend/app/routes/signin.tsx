import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthForm } from "../components/AuthForm";
import { AuthTabs } from "../components/AuthTabs";

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
    toast.success("Connecté avec succès");
    navigate("/books");
  };

  return (
    <div>
      <AuthTabs />
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
