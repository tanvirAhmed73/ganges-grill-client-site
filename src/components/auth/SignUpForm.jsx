"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import usePublic from "@/hooks/usePublic";
import Swal from "sweetalert2";

export default function SignUpForm() {
  const axiosPublic = usePublic();
  const { register } = useContext(AuthContext);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setError("Password Didn't Match");
      return;
    }

    const passwordPattern =
      /^(?=.*[0-9])(?=.*[-?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9-?!@#$%^&*\/\\]{8,30}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password should 8 character, one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }

    register(email, password)
      .then((userCredential) => {
        axiosPublic.post("/user", { name, email }).then(() => {});
        router.push("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created SuccessFully",
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
          <h1 className="text-4xl font-bold text-brand-dark">Register now!</h1>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-dark">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
                required
              />
            </div>
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
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-dark">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full rounded-lg border border-brand-secondary/70 px-3 py-2.5 outline-none ring-brand-primary focus:ring-2"
                required
              />
            </div>
            <label className="block text-sm underline">
              <Link href="/login">Already have an account?</Link>
            </label>
            <label className="block text-sm text-red-700">{error ? error : ""}</label>

            <input
              className="mt-2 w-full rounded-lg bg-brand-primary px-4 py-2.5 font-semibold text-white"
              type="submit"
              value="Sign Up"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
