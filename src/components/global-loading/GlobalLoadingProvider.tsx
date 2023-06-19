import { ReactNode, useCallback, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { GlobalLoadingContext } from "./GlobalLoadingContext";

function GlobalLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const setGlobalLoading = useCallback((isActive: boolean) => {
    setIsLoading(isActive);
  }, []);

  return (
    <GlobalLoadingContext.Provider value={setGlobalLoading}>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress size={150} />
      </Backdrop>
    </GlobalLoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  const ctx = useContext(GlobalLoadingContext);
  if (!ctx) {
    throw Error("GlobalLoading context used outside provider!");
  }
  return ctx;
}

export default GlobalLoadingProvider;
