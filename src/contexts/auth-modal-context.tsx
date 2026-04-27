"use client";

/**
 * Controls the global auth entry modal (social + “Log in” / “Sign up” paths).
 * Open from any client component via useAuthModal().openAuthModal('login' | 'signup').
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthModalIntent = "login" | "signup";

export interface AuthModalContextValue {
  isOpen: boolean;
  intent: AuthModalIntent;
  openAuthModal: (nextIntent?: AuthModalIntent) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  /** Which navbar action opened the modal (reserved for future UI emphasis). */
  const [intent, setIntent] = useState<AuthModalIntent>("login");

  const openAuthModal = useCallback((nextIntent: AuthModalIntent = "login") => {
    setIntent(nextIntent === "signup" ? "signup" : "login");
    setIsOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo<AuthModalContextValue>(
    () => ({
      isOpen,
      intent,
      openAuthModal,
      closeAuthModal,
    }),
    [isOpen, intent, openAuthModal, closeAuthModal]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (ctx === undefined) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
