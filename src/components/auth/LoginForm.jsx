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
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="mt-24 text-5xl font-bold lg:mt-0">Login now!</h1>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
            <form onSubmit={handleLoginSubmit} className="card-body">
              <div className="form-control">
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
              </div>
              <div className="form-control">
                <div className="items-center justify-center">
                  <label className="">
                    <LoadCanvasTemplate />
                    <input
                      type="text"
                      name="captcha"
                      ref={captchaRef}
                      placeholder="Enter Captcha"
                      className="input input-bordered mr-2"
                      required
                    />
                  </label>
                </div>
              </div>

              <label className="label underline">
                <Link href="/signUp">Need to create an account?</Link>
              </label>
              <p className="ml-1">
                Sign in with Google:
                <FaGoogle
                  onClick={handleGoogleLogin}
                  className="ml-1 inline cursor-pointer text-xl text-red-600"
                />
              </p>
              <label className="ml-1 text-red-700">{error ? error : ""}</label>

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
