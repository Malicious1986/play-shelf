import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import LogoutButton from "@/components/logoutButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="shadow-md fixed w-full border-b bg-background z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo & App Name */}
        <Link to="/" className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">🚂</span>
          <span>Play Shelf</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/games" className="hover:text-gray-300">
              Games
            </Link>
          )}
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{user?.name}</span>
            </div>
          ) : (
            null
          )}
          <LogoutButton />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </Button>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white flex flex-col space-y-4 p-4">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/games"
              className="hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Games
            </Link>
          )}
          <Link
            to="/about"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          {/* ✅ User Info & Logout in Mobile */}
          {isLoggedIn ? (
            <div className="flex flex-col space-y-2 border-t border-gray-600 pt-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
            </div>
          ) : (
            null
          )}
          <LogoutButton />
        </div>
      )}
    </header>
  );
}
