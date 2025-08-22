import { ReactNode, use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components/LoginForm";
import { RegisterForm } from "../_components/RegisterForm";
import { ForgotPasswordForm } from "../_components/ForgotPasswordForm";
import VerifyEmail from "../_components/VerifyEmail";
import SetNewPassword from "../_components/SetNewPassword";
import BackButton from "../_components/BackButton";

export async function generateStaticParams() {
  return [
    { authItem: "login" },
    { authItem: "register" },
    { authItem: "forgot-password" },
    { authItem: "reset-password" },
    { authItem: "verify-email" },
    { authItem: "reset-password" },
  ];
}

function AuthPage({ params }: { params: Promise<{ authItem: string }> }) {
  const authItem = use(params).authItem ?? "login";

  type ComponentConfig = {
    title: string;
    description: string;
    component: ReactNode;
  };

  const components: Record<string, ComponentConfig> = {
    login: {
      title: "Sign in to your account",
      description: "Enter your email and password to access NUB IT Support",
      component: <LoginForm />,
    },
    register: {
      title: "Create an account",
      description: "Join NUB IT Support system and start managing your tasks",
      component: <RegisterForm />,
    },
    "forgot-password": {
      title: "Forgot your password?",
      description:
        "Enter your email address and we'll send you a link to reset your password.",
      component: <ForgotPasswordForm />,
    },
    "verify-email": {
      title: "",
      description: "",
      component: <VerifyEmail />,
    },
    "set-new-password": {
      title: "Set new password",
      description: "Enter your new password to access NUB IT Support",
      component: <SetNewPassword />,
    },
  };

  const selectedComponent = components[authItem];

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-zinc-50 dark:bg-zinc-800">
        <CardHeader className="space-y-1">
          <BackButton />
          {authItem !== "verify-email" && (
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IT</span>
              </div>
            </div>
          )}
          <CardTitle className="text-2xl text-center">
            {selectedComponent?.title ?? null}
          </CardTitle>
          <CardDescription className="text-center">
            {selectedComponent?.description ?? null}
          </CardDescription>
        </CardHeader>
        <CardContent>{selectedComponent?.component ?? null}</CardContent>
      </Card>
    </div>
  );
}

export default AuthPage;
