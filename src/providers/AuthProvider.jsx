"use client";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getClientFirebaseApp } from "@/lib/firebase/client";
import { axiosPublic } from "@/lib/api/axios-public";

export const AuthContext = createContext(null);

function getAuthSafe() {
  const app = getClientFirebaseApp();
  return app ? getAuth(app) : null;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);

  const signInWithGoogle = useCallback(() => {
    const auth = getAuthSafe();
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured"));
    }
    return signInWithPopup(auth, googleProvider);
  }, [googleProvider]);

  const register = useCallback((email, password) => {
    setLoading(true);
    const auth = getAuthSafe();
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured"));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const signIn = useCallback((email, password) => {
    setLoading(true);
    const auth = getAuthSafe();
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured"));
    }
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const sendPasswordReset = useCallback((email) => {
    const auth = getAuthSafe();
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured"));
    }
    return sendPasswordResetEmail(auth, email);
  }, []);

  const sendEmailSignInLink = useCallback((email) => {
    const auth = getAuthSafe();
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured"));
    }
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Email link sign-in is client-only"));
    }
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/complete-email-link`,
      handleCodeInApp: true,
    };
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  }, []);

  const logOut = useCallback(() => {
    const auth = getAuthSafe();
    if (!auth) {
      return Promise.resolve();
    }
    return signOut(auth);
  }, []);

  useEffect(() => {
    const auth = getAuthSafe();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const userEmail = currentUser?.email;
      if (currentUser) {
        axiosPublic.post("/jwt", { userEmail }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access_token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access_token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    signIn,
    sendPasswordReset,
    sendEmailSignInLink,
    logOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
