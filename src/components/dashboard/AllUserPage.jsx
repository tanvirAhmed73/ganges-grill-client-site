"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Title from "@/components/ui/Title";
import Swal from "sweetalert2";

export default function AllUserPage() {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const handleMakeAdmin = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/admin/${item._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Make Admin!",
              text: "The User Is Now Admin",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <Title title={"---How Many---"} subtitle={"MANAGE ALL USERS"} />

      <div className="mx-auto rounded-2xl bg-white p-4 md:w-3/4">
        <div className="flex justify-around">
          <h1 className="mt-5">TOTAL USERS:{users.length} </h1>
        </div>
        <div>
          {users.map((item) => (
            <div
              key={item._id}
              className="mx-auto mt-3 flex w-[90%] rounded-xl border border-black/5 bg-white shadow-sm md:hidden"
            >
              <h1 className="w-1/3 p-4 uppercase">
                User Name:- &apos;{item.name ? item.name : item.displayName}&apos;
              </h1>
              <div className="ml-1">|</div>
              <div className="my-4 ml-2 justify-center">
                <p>Role :{item.role ? item.role : " User"}</p>
                {item.role === "admin" ? (
                  <button
                    type="button"
                    className="rounded-md bg-green-700 px-2 py-1 text-xs font-semibold text-white opacity-60"
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMakeAdmin(item)}
                    className="rounded-md bg-green-700 px-2 py-1 text-xs font-semibold text-white"
                  >
                    Make Admin
                  </button>
                )}
                <h1>Email: {item.email}</h1>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/10 text-sm text-brand-muted">
                <th className="px-3 py-2">NAME</th>
                <th className="px-3 py-2">EMAIL</th>
                <th className="px-3 py-2">ROLE</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id} className="border-b border-black/5">
                  <td className="px-3 py-2">
                    <div className="font-bold">{item.name ? item.name : item.displayName}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-bold">{item.email}</div>
                  </td>
                  <td className="px-3 py-2">
                    <p>Role :{item.role ? item.role : " User"}</p>
                    {item.role === "admin" ? (
                      <button
                        type="button"
                        className="rounded-md bg-green-700 px-2 py-1 text-xs font-semibold text-white opacity-60"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMakeAdmin(item)}
                        className="rounded-md bg-green-700 px-2 py-1 text-xs font-semibold text-white"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
