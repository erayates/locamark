import AuthLayout from "@/layouts/AuthLayout";
import SignUpForm from "@/components/forms/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the form below to create your account
            </p>
          </div>

          <hr />
          <SignUpForm />
          <div className="flex flex-col space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="underline text-blue-500 underline-offset-4 hover:text-primary"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
