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
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <AuthForm
            title="Inscription"
            submitLabel="Inscription"
            submittingLabel="Inscription en cours..."
            onSubmit={handleSubmit}
            bottomText="Déjà un compte ?"
            bottomLink="/signin"
            bottomLinkLabel="Connexion"
          />
          <div className="border border-black p-4 text-sm max-w-xs space-y-3">
            <p>
              <strong>Librarian</strong> est une application de démonstration conçue pour apprendre
              Java Spring Boot et React Router, développée en tandem avec une IA.
            </p>
            <p className="font-bold">Fonctionnalités</p>
            <p>Catalogue de 55 livres avec couvertures · Emprunt et retour · Interface noir et blanc</p>
            <hr className="border-black" />
            <p className="font-bold">Rôles</p>
            <p><span className="font-bold">Utilisateur</span> — parcourir le catalogue, emprunter et consulter ses emprunts</p>
            <p><span className="font-bold">Bibliothécaire</span> — tout ce que l'utilisateur fait + voir tous les emprunts, gérer les retours</p>
            <hr className="border-black" />
            <p>Plus d'infos sur <a href="https://github.com/Karitchi/librarian" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>.
            </p>
            <hr className="border-black" />
            <p className="font-bold">Comptes de démonstration :</p>
            <p><span className="font-bold">user@library.com</span> — mot de passe : <span className="font-bold">testtest</span> (utilisateur)</p>
            <p><span className="font-bold">librarian@library.com</span> — mot de passe : <span className="font-bold">testtest</span> (bibliothécaire)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
