"use client";

/**
 * Global auth modal: login (email → password) and signup entry.
 * `openAuthModal('login', returnPath?)` sets optional post-login navigation.
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
  /** When set, successful login should navigate here (e.g. private route redirect). */
  returnAfterLogin: string | null;
  openAuthModal: (
    nextIntent?: AuthModalIntent,
    returnAfterLogin?: string | null
  ) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<AuthModalIntent>("login");
  const [returnAfterLogin, setReturnAfterLogin] = useState<string | null>(null);

  const openAuthModal = useCallback(
    (nextIntent: AuthModalIntent = "login", returnTo?: string | null) => {
      setIntent(nextIntent === "signup" ? "signup" : "login");
      setReturnAfterLogin(
        returnTo === undefined || returnTo === null || returnTo === ""
          ? null
          : returnTo
      );
      setIsOpen(true);
    },
    []
  );

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
    setReturnAfterLogin(null);
  }, []);

  const value = useMemo<AuthModalContextValue>(
    () => ({
      isOpen,
      intent,
      returnAfterLogin,
      openAuthModal,
      closeAuthModal,
    }),
    [isOpen, intent, returnAfterLogin, openAuthModal, closeAuthModal]
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
