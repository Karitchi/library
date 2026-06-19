import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthForm } from "../components/AuthForm";
import { AuthTabs } from "../components/AuthTabs";

export default function Signin() {
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Email ou mot de passe invalide");
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
      <div className="flex justify-center mt-8">
        <div className="flex flex-col items-center gap-6">
          <AuthForm
            title="Connexion"
            submitLabel="Connexion"
            submittingLabel="Connexion en cours..."
            onSubmit={handleSubmit}
            bottomText="Pas encore de compte ?"
            bottomLink="/signup"
            bottomLinkLabel="Inscription"
          />
          <div className="border border-black p-4 text-sm max-w-md space-y-1">
            <p>Ceci est un projet test pour apprendre Java Spring Boot.</p>
            <p>Deux utilisateurs sont disponibles par défaut :</p>
            <p><span className="font-bold">user@library.com</span> — mot de passe : <span className="font-bold">testtest</span> (utilisateur)</p>
            <p><span className="font-bold">librarian@library.com</span> — mot de passe : <span className="font-bold">testtest</span> (bibliothécaire)</p>
            <p className="mt-2">Fonctionnalités : parcourir les livres, consulter les détails, louer des livres, gérer les retours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
