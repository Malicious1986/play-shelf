import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-69px)] bg-background text-foreground">
      <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="default">Go Back Home</Button>
      </Link>
    </div>
  );
}
