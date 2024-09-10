import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
        {children}
      </div>
    </React.Fragment>
  );
};

export default AuthLayout;
