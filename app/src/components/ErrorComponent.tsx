import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorComponentProps {
  title?: string;
  message?: string;
  actionLabel?: string;
}

export default function ErrorComponent({
  title = "Not Found",
  message = "Sorry, we couldn't find what you're looking for.",
}: ErrorComponentProps = {}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <FileQuestion className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <Button onClick={() => window.history.back()}><ArrowLeft size={16} className="mr-2" /> Go Back</Button>
    </div>
  );
}
