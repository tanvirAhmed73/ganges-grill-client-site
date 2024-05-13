import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { PiEyeClosedFill } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaLuggageCart } from "react-icons/fa";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCart from "../../CustomHooks/useCart";
const Navbar = () => {
  const axiosSecure = useAxiosSecure()
  const { user, logOut } = useContext(AuthContext);
  let [open, setOpen] = useState(false);
  const [cart] = useCart() 
  const navigate = useNavigate();

  

  const navOPtions= (
    <>
      <li>
        <Link to={"/home"}>HOME</Link>
      </li>
      <li>
        <Link to={"/ourMenu"}>OUR MENU</Link>
      </li>
      <li>
        <Link to={"/order"}>OUR SHOP</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>DashBoard</Link>
      </li>
      <li>
        <Link to={"dashboard/cart"}>
          <div className=" gap-1 flex ">
            <FaLuggageCart className="text-2xl " />
            <div className="badge badge-secondary">+{cart.length}</div>
          </div>
        </Link>
      </li>
    </>
  );
  

 

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
        // Sign-out successful.
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Out SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu z-10 menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52"
          >
            {
                navOPtions
            }
          </ul>
        </div>
        <a className="">
        <img src="../../../Pictures/logo/Logo.webp" alt="" />

        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            navOPtions
          }
        </ul>
      </div>
      <div className="navbar-end">
        {
             user?
                <div className="uppercase">
                    {
                        user.displayName ?
                            user.displayName
                            :
                            ''
                        
                    }
                    <button onClick={handleLogout} className='btn btn-sm ml-2 text-white bg-red-700'>Log Out</button>
                </div>
                :
             <NavLink to={'/login'}>
                 <button className='btn btn-sm px-8 md:px-1 text-white bg-green-700'>Log In</button>
             </NavLink>

         }
      </div>
        
    </div>
    
  );
};

export default Navbar;
