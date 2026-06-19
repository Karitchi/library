import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

interface AuthFormProps {
  title: string;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  bottomText: string;
  bottomLink: string;
  bottomLinkLabel: string;
}

export function AuthForm({ title, submitLabel, submittingLabel, onSubmit, bottomText, bottomLink, bottomLinkLabel }: AuthFormProps) {
  const [email, setEmail] = useState("user@library.com");
  const [password, setPassword] = useState("testtest");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(email, password);
    } catch (err: any) {
      toast.error(err?.message || "Impossible de se connecter au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black p-8 w-96">
        <h1 className="text-2xl mb-6 text-center text-white">{title}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white text-black border border-transparent focus:outline-none"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1 text-white">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white text-black border border-transparent focus:outline-none"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2 cursor-pointer border border-black hover:bg-black hover:text-white hover:border-white disabled:opacity-50"
          >
            {loading ? submittingLabel : submitLabel}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-white">
          {bottomText}{" "}
          <Link to={bottomLink} className="text-white underline">
            {bottomLinkLabel}
          </Link>
        </p>
      </div>
  );
}
