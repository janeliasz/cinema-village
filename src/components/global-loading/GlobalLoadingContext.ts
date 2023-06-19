import { createContext } from "react";

export type GlobalLoadingContextType = (isLoading: boolean) => void;

export const GlobalLoadingContext = createContext<GlobalLoadingContextType | null>(null);