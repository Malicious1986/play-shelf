import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/graphql/types";
import { login } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";

const API_URL = import.meta.env.VITE_API;

export default function LoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginMutation();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await loginUser({
        variables: { email, password },
      });

      if (data?.login.auth?.token) {
        localStorage.setItem("token", data.login.auth.token);
        dispatch(login(data.login.auth.user));
        navigate("/");
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col items-center bg-background">
      <div className="p-8 bg-card shadow-lg rounded-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {/* 🔹 Email Input */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />

        {/* 🔹 Password Input */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />

        {/* 🔹 Show Error if Exists */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* 🔹 Login Button */}
        <Button
          className="w-full mt-4"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>

        {/* 🔹 Google Login */}
        <Button
          className="w-full flex items-center justify-center gap-2 mt-4"
          variant="secondary"
          onClick={handleGoogleLogin}
        >
          <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </Button>

        {/* 🔹 Links for Register & Forgot Password */}
        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <Button variant="link" onClick={() => navigate("/register")}>
              Sign up
            </Button>
          </p>
          <p>
            <Button variant="link" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
