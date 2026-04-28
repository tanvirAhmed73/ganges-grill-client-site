"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import usePublic from "@/hooks/usePublic";

export default function LoginForm() {
  const axiosPublic = usePublic();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const captchaRef = useRef(null);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const value = captchaRef.current.value;
    if (validateCaptcha(value) === true) {
      signIn(email, password)
        .then(() => {
          router.push(from);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Log in SuccessFully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {});
    } else {
      setError("Captcha Does Not Match");
    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const email = result.user.email;
        const name = result.user.displayName;
        axiosPublic.post("/user", { email, name }).then(() => {});
        router.push(from);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log in SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-brand-background px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-dark">Login now!</h1>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-xl">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-dark">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-dark">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
                required
              />
            </div>
            <div className="space-y-2">
              <LoadCanvasTemplate />
              <input
                type="text"
                name="captcha"
                ref={captchaRef}
                placeholder="Enter Captcha"
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
                required
              />
            </div>

            <label className="block text-sm underline">
              <Link href="/signUp">Need to create an account?</Link>
            </label>
            <p className="text-sm text-brand-muted">
              Sign in with Google:
              <FaGoogle
                onClick={handleGoogleLogin}
                className="ml-2 inline cursor-pointer text-xl text-red-600"
              />
            </p>
            <label className="block text-sm text-red-700">{error ? error : ""}</label>

            <input
              className="mt-2 w-full rounded-lg bg-brand-primary px-4 py-2.5 font-semibold text-white"
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
