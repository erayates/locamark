import SignInForm from "@/components/forms/sign-in-form";

export default function SignInPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src="/assets/images/locamark-logo.png"
              width={200}
              height={50}
              alt="Locamark Logo"
            />
          </div>
          <div className="relative space-y-8 z-20 mt-auto">
            <p className="text-6xl font-bold uppercase">
              LocaMark: Your Personal Map, Your Marked Memories.
            </p>
            <p className="text-lg text-muted-foreground font-semibold">
              Easily mark, save, and revisit your favorite locations with
              LocaMark, the ultimate map app for capturing your journey!
            </p>
          </div>
        </div>
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
      </div>
    </>
  );
}
