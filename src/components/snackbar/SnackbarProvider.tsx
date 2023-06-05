import { useCallback, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext, SnackbarSeverity } from "./SnackbarContext";

function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("info");

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const showSnackbar = useCallback(
    (text: string, variant: SnackbarSeverity = "info") => {
      setMessage(text);
      setSeverity(variant);
      setOpen(true);
    },
    [],
  );

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw Error("Snackbar context used outside provider!");
  }
  return ctx;
}

export default SnackbarProvider;
