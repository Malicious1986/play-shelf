import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/graphql/types";
import { login } from "@/store/slices/authSlice";

const API_URL = import.meta.env.VITE_API;

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerUser] = useRegisterMutation();

  const handleGoogleRegister = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await registerUser({
        variables: { name, email, password },
      });

      if (data?.register?.auth?.token) {
        localStorage.setItem("token", data.register.auth.token);
        dispatch(login(data.register.auth.user));
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

  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <div className="p-8 bg-card shadow-lg rounded-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Create an Account</h2>
        <p className="text-gray-500 mb-4">
          Sign up to manage your board game collection.
        </p>

        {/* 🔹 Name Input */}
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />

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

        {/* 🔹 Confirm Password */}
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-3"
        />

        {/* 🔹 Show Error if Exists */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* 🔹 Register Button */}
        <Button className="w-full mt-4" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </Button>

        {/* 🔹 Google Sign Up */}
        <Button
          className="w-full flex items-center justify-center gap-2 mt-4"
          variant="secondary"
          onClick={handleGoogleRegister}
        >
          <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </Button>

        {/* 🔹 Login Link */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Button variant="link" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
}
