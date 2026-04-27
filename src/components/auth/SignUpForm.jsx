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
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="mt-24 text-5xl font-bold lg:mt-0">Register now!</h1>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                />
                <label className="label underline">
                  <Link href="/login">Already have an account?</Link>
                </label>
                <label className="ml-1 text-red-700">{error ? error : ""}</label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="SignUp" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
