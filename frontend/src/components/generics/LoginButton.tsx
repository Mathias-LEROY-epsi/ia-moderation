import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Button variant="outline" size="sm" onClick={() => loginWithPopup()}>
      Login
    </Button>
  );
};
