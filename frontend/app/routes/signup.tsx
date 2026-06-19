import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthForm } from "../components/AuthForm";
import { AuthTabs } from "../components/AuthTabs";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "user" }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Inscription échouée. Cet email existe peut-être déjà.");
    }

    toast.success("Inscription réussie");
    navigate("/signin");
  };

  return (
    <div>
      <AuthTabs />
      <div className="flex justify-center mt-8">
        <div className="flex flex-col items-center gap-6">
          <AuthForm
            title="Inscription"
            submitLabel="Inscription"
            submittingLabel="Inscription en cours..."
            onSubmit={handleSubmit}
            bottomText="Déjà un compte ?"
            bottomLink="/signin"
            bottomLinkLabel="Connexion"
          />
          <div className="border border-black p-4 text-sm max-w-md space-y-1">
            <p>Ceci est un projet test pour apprendre Java Spring Boot.</p>
            <p>Deux utilisateurs sont disponibles par défaut :</p>
            <p><span className="font-bold">user@library.com</span> / testtest (utilisateur)</p>
            <p><span className="font-bold">librarian@library.com</span> / testtest (bibliothécaire)</p>
            <p className="mt-2">Fonctionnalités : parcourir les livres, consulter les détails, louer des livres, gérer les retours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
