import React from "react";
import Title from "../../../Title/Title";
import useMenu from "../../../CustomHooks/useMenu";
import useCart from "../../../CustomHooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const ManageMenuItem = () => {
    const [menu] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDelete = (id)=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/menuItem/${id}`)
            .then(res =>{
              console.log(res)
              if(res.data.deletedCount){
                  window. location. reload()
              }
            })
          }
        });
        
      }
  return (
    <div>
      <Title title={"---ALL MENU ITEM LIST---"} subtitle={"MANAGE YOUR RESTURANT MENU"}></Title>

      {/* lg device */}
      <div className="bg-white md:w-3/4 mx-auto">
        <div className="flex   justify-around">
          <h1 className="mt-5">TOTAL item: {menu.length}</h1>
          
        </div>
        {/* small device */}
        <div>
          {menu.map((item) => (
            <div
              key={item._id}
              className="w-11/12 md:hidden mx-auto mt-3 bg-white shadow-xl flex"
            >
              <figure className="w-1/2">
                <img className="h-auto w-full" src={item.image} alt="food" />
              </figure>

              <div className="flex flex-col justify-center mx-auto ml-2">
                <h2 className="text-xs">{item.name}</h2>
                <p>Price :${item.price}</p>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-ghost bg-red-600 text-white btn-xs"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* table */}
        <div className=" hidden md:block overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{item.name}</div>

                    <br />
                  </td>
                  <td>{item.price}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost bg-red-600 text-white btn-xs"
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
};

export default ManageMenuItem;
