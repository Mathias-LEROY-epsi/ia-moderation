import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./generics/LoginButton";
import { LogoutButton } from "./generics/LogoutButton";

export const Auth = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();

  if (isLoading)
    return (
      <div className="d-flex align-items-center me-2">
        <div className="text-sm font-bold">Loading...</div>
      </div>
    );
  if (isAuthenticated && user !== undefined) {
    return (
      <div className="d-flex align-items-center me-2">
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center me-2">
      <LoginButton />
    </div>
  );
};
