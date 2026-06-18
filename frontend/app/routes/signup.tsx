import { useNavigate } from "react-router";
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
    <AuthForm
      title="Sign Up"
      submitLabel="Sign Up"
      submittingLabel="Creating..."
      onSubmit={handleSubmit}
      bottomText="Already have an account?"
      bottomLink="/signin"
      bottomLinkLabel="Sign In"
    />
  );
}
