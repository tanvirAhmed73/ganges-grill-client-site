"use client";

import useAuth from "@/hooks/useAuth";

export default function ViewPage() {
  const { user, logOut } = useAuth();

  return (
    <div>
      <h1 className="mt-3 text-center text-4xl text-orange-600 underline">
        WELCOME BACK!
      </h1>
      <div className="mx-auto w-3/4 justify-center text-center">
        <img
          className="mx-auto my-7 h-[200px] w-[200px]"
          src={
            user?.photoURL
              ? user.photoURL
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
        />
        <h1 className="text-3xl">{user?.displayName}</h1>
        <h2 className="md:text-2xl">{user?.email}</h2>
        <button
          type="button"
          className="btn btn-sm mb-4 bg-red-600 text-white"
          onClick={() => logOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
