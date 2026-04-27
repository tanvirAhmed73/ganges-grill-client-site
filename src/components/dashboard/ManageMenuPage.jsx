"use client";

import Title from "@/components/ui/Title";
import useMenu from "@/hooks/useMenu";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function ManageMenuPage() {
  const [menu] = useMenu();
  const axiosSecure = useAxiosSecure();

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
        axiosSecure.delete(`/menuItem/${id}`).then((res) => {
          if (res.data.deletedCount && typeof window !== "undefined") {
            window.location.reload();
          }
        });
      }
    });
  };

  return (
    <div>
      <Title
        title={"---ALL MENU ITEM LIST---"}
        subtitle={"MANAGE YOUR RESTURANT MENU"}
      />

      <div className="mx-auto bg-white md:w-3/4">
        <div className="flex justify-around">
          <h1 className="mt-5">TOTAL item: {menu.length}</h1>
        </div>
        <div>
          {menu.map((item) => (
            <div
              key={item._id}
              className="mx-auto mt-3 flex w-11/12 bg-white shadow-xl md:hidden"
            >
              <figure className="w-1/2">
                <img className="h-auto w-full" src={item.image} alt="food" />
              </figure>

              <div className="mx-auto ml-2 flex flex-col justify-center">
                <h2 className="text-xs">{item.name}</h2>
                <p>Price :${item.price}</p>

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
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{item.name}</div>
                  </td>
                  <td>{item.price}</td>
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
