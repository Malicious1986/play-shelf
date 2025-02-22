import { login } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      dispatch(login());
      navigate("/");
    } else {
      // TBD: Handle login failure
      navigate("/login-failed");
    }
  }, [searchParams, navigate]);

  return <p>Logging in...</p>;
}
