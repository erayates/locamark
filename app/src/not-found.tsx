import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(216,41%,18%)] to-[hsl(216,41%,10%)]">
      <div className="text-center px-4">
        <div>
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-300 mb-8">
            Oops! Page not found
          </p>
        </div>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            variant="secondary"
            className="bg-white text-[hsl(216,41%,18%)] hover:bg-gray-200"
          >
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
