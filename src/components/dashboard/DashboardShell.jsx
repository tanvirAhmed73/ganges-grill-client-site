"use client";

import Link from "next/link";
import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";

export default function DashboardShell({ children }) {
  const [closeBtn, setCloseBtn] = useState(true);
  const { logOut } = useAuth();
  const handleCloseBtn = () => setCloseBtn(!closeBtn);

  const [isAdmin] = useAdmin();

  const adminRoutes = (
    <div>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/dashboard/allUser">ALL USERS</Link>
      </li>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/dashboard/addItem">ADD ITEMS</Link>
      </li>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/dashboard/manageMenuItem">MANAGE MENU</Link>
      </li>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/">HOME</Link>
      </li>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/dashboard/cart">MY CART</Link>
      </li>
    </div>
  );

  const userRoutes = (
    <div>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/">HOME</Link>
      </li>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/dashboard/cart">MY CART</Link>
      </li>
      <li className="mb-5 hover:bg-slate-600">
        <Link href="/contact">CONTACT</Link>
      </li>
    </div>
  );

  return (
    <div>
      <div className="relative">
        <div className="drawer relative">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="navbar w-full bg-base-300">
              <div className="flex-none">
                <label
                  onClick={handleCloseBtn}
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">DashBoard</div>
            </div>
            {children}
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay" />
            <label
              onClick={handleCloseBtn}
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="absolute right-0 top-0 z-10 m-4 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={`${
                  closeBtn ? "hidden" : "block"
                } h-6 w-6 stroke-current`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </label>
            <ul className="menu min-h-full w-80 bg-base-200 p-4">
              {isAdmin ? adminRoutes : userRoutes}
              <button
                type="button"
                onClick={() => logOut()}
                className="btn btn-sm bg-red-600 text-white"
              >
                Log Out
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
