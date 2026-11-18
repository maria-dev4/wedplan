import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join WedPlan as a couple or a vendor"
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Login"
    >
      <RegisterForm />
    </AuthShell>
  );
}
