import { useNavigate } from "react-router";
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
    <AuthForm
      title="Sign In"
      submitLabel="Sign In"
      submittingLabel="Signing in..."
      onSubmit={handleSubmit}
      bottomText="Don't have an account?"
      bottomLink="/signup"
      bottomLinkLabel="Sign Up"
    />
  );
}
