import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-md fixed w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo & App Name */}
        <Link to="/" className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">🚂</span>
          <span>Play Shelf</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/games" className="hover:text-gray-300">Games</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white flex flex-col space-y-2 p-4">
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/games" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Games</Link>
          <Link to="/about" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
}
