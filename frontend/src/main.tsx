import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 2,
      staleTime: 2 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN ?? ""}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID ?? ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      <StrictMode>
        <App />
      </StrictMode>
    </Auth0Provider>
  </QueryClientProvider>,
);
