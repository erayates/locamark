import AuthLayout from "@/layouts/AuthLayout";
import SignInForm from "@/components/forms/sign-in-form";

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login into your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your username and password to login
            </p>
          </div>
          <hr />
          <SignInForm />
          <div className="flex flex-col space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              Do not have an account?{" "}
              <a
                href="/sign-up"
                className="underline text-blue-500 underline-offset-4 hover:text-primary"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
