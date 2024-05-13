import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Title from "../../../Title/Title";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const handleMakeAdmin= (item)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/admin/${item._id}`)
        .then(res => {
          if(res.data.modifiedCount > 0){
            Swal.fire({
              title: "Make Admin!",
              text: "The User Is Now Admin",
              icon: "success"
            });
            refetch()
          }
        })
      }
    });

    
  }


  // handle delete 
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
        axiosSecure.delete(`/user/${id}`)
        .then(res =>{
          // console.log(res)
          if(res.data.deletedCount){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch()
          }
        })
      }
    });
    
  }
  return (
    <div>
      <Title title={"---How Many---"} subtitle={"MANAGE ALL USERS"}></Title>

      
        {/* lg device */}
        <div className="bg-white md:w-3/4 mx-auto">
          <div className="flex   justify-around">
            <h1 className="mt-5">TOTAL USERS:{users.length} </h1>
          </div>
          {/* small device */}
          <div>
            {users.map((item) => (
              <div
                key={item._id}
                className="  md:hidden w-[90%] mx-auto mt-3 bg-white shadow-xl flex"
              >
                <h1 className="uppercase p-4 w-1/3 ">User Name:- '{item.name ? item.name : item.displayName}'</h1>

                {/* divider  */}
                <div className="ml-1">|</div>

                <div className=" justify-center my-4 ml-2">
                  <p>Role :{item.role ? item.role : " User"}</p>
                  {
                    item.role === "admin" ? 
                    <button className="btn bg-green-700 btn-disabled text-white btn-xs ">Make Admin</button>
                    :
                    <button onClick={()=>handleMakeAdmin(item)} className="btn bg-green-700 text-white btn-xs ">Make Admin</button>
                  }

                <h1>Email: {item.email}</h1>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-ghost bg-red-600 text-white btn-xs">
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
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                          <div className="font-bold">{item.name? item.name : item.displayName}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{item.email}</div>
                      <br />
                    </td>
                    <td>

                        <p>Role :{item.role ? item.role : " User"}</p>
                       {
                          item.role === "admin" ? 
                          <button className="btn bg-green-700 btn-disabled text-white btn-xs ">Make Admin</button>
                          :
                          <button onClick={()=>handleMakeAdmin(item)} className="btn bg-green-700 text-white btn-xs ">Make Admin</button>
                        }
                    </td>
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

export default AllUser;
