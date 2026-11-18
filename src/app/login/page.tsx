import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to continue planning your day"
      footerText="New to WedPlan?"
      footerLink="/register"
      footerLabel="Create an account"
    >
      <LoginForm />
    </AuthShell>
  );
}
