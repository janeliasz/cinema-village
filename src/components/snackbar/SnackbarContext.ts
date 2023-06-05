import { createContext } from "react";

export type SnackbarSeverity = "info" | "success" | "error";

export type SnackbarContextType = (message: string, severity?: SnackbarSeverity) => void;

export const SnackbarContext = createContext<SnackbarContextType | null>(null);