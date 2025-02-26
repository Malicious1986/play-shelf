import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const API_URL = import.meta.env.VITE_API;

export default function LoginButton() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // ✅ Redirect if already logged in
    }
  }, [isLoggedIn, navigate]);


  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };


  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <div className="p-8 bg-card shadow-lg rounded-lg text-center max-w-sm w-full">
        <p className="text-gray-500 mb-6">
          Please log in to manage your board game collection.
        </p>
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleLogin}
        >
          <img
            src="/images/google-logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
