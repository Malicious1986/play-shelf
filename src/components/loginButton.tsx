import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API;

export default function LoginButton() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorage.removeItem("token");
  
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  
    dispatch(logout());
  
    const googleLogoutUrl = "https://accounts.google.com/Logout";
  
    const googleLogoutWindow = window.open(googleLogoutUrl, "_blank");
  
    setTimeout(() => {
      if (googleLogoutWindow) googleLogoutWindow.close();
      window.location.href = "/";
    }, 200);
  };
  

  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <Button
      className="cursor-pointer"
      variant="outline"
      onClick={() => {
        isLoggedIn ? handleLogout() : handleLogin();
      }}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
}
