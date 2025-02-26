import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-center py-4 text-sm text-gray-500">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <p>&copy; {new Date().getFullYear()} Play Shelf. All rights reserved.</p>

        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}