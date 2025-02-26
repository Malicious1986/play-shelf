import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoginButton from "@/components/loginButton";

type WithAuthProps<T> = T & { fallback?: React.ReactNode };

/**
 * Generic HOC to restrict access to authenticated users
 * @param WrappedComponent - The component to be protected
 * @param fallback - Optional fallback component (e.g., LoginButton)
 */
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback: React.ReactNode = <LoginButton />
) => {
  return function AuthWrapper(props: WithAuthProps<P>) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      return fallback;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
