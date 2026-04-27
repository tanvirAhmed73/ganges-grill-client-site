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

      <div className="mx-auto bg-white md:w-3/4">
        <div className="flex justify-around">
          <h1 className="mt-5">TOTAL USERS:{users.length} </h1>
        </div>
        <div>
          {users.map((item) => (
            <div
              key={item._id}
              className="mx-auto mt-3 flex w-[90%] bg-white shadow-xl md:hidden"
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
                    className="btn btn-disabled btn-xs bg-green-700 text-white"
                  >
                    Make Admin
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMakeAdmin(item)}
                    className="btn btn-xs bg-green-700 text-white"
                  >
                    Make Admin
                  </button>
                )}
                <h1>Email: {item.email}</h1>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-ghost btn-xs bg-red-600 text-white"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">
                        {item.name ? item.name : item.displayName}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{item.email}</div>
                  </td>
                  <td>
                    <p>Role :{item.role ? item.role : " User"}</p>
                    {item.role === "admin" ? (
                      <button
                        type="button"
                        className="btn btn-disabled btn-xs bg-green-700 text-white"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMakeAdmin(item)}
                        className="btn btn-xs bg-green-700 text-white"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-xs bg-red-600 text-white"
                    >
                      DELETE
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
