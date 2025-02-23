import { login } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface JWTTokenPayload {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      try {
        const decoded: JWTTokenPayload = jwtDecode(token);

        localStorage.setItem("token", token);

        dispatch(login(decoded));

        navigate("/");
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login-failed");
      }
    } else {
      navigate("/login-failed");
    }
  }, [searchParams, navigate, dispatch]);

  return <p>Logging in...</p>;
}
