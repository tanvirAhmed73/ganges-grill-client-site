import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../CustomHooks/useAdmin";
import useAuth from "../../CustomHooks/useAuth";

const DashBoardLayout = () => {
    const [closeBtn, setCloseBtn] = useState(true);
    const {logOut}= useAuth()
    const handlecloseBtn = ()=>{
        setCloseBtn(!closeBtn)
    }

    const [isAdmin] = useAdmin()

    const adminRoutes = <div>
        <li className="mb-5 hover:bg-slate-600  "><Link to={'allUser'}>ALL USERS</Link></li>
        <li className="mb-5 hover:bg-slate-600  "><Link to={'addItem'}>ADD ITEMS</Link></li>
        <li className="mb-5 hover:bg-slate-600  "><Link to={'manageMenuItem'}>MANAGE MENU</Link></li>
        <li className="mb-5 hover:bg-slate-600  "><Link to={'/'}>HOME</Link></li>
        <li className="mb-5 hover:bg-slate-600  "><Link to={'cart'}>MY CART</Link></li>
    </div>

    const userRoutes = <div className="">
        <li className="mb-5 hover:bg-slate-600  "><Link to={'/'}>HOME</Link></li>
        <li className="mb-5 hover:bg-slate-600  "><Link to={'cart'}>MY CART</Link></li>
        <li className="mb-5 hover:bg-slate-600  "><Link>CONTACT</Link></li>
        
    </div>
    return (
    <div>
      {/* drawer */}
      <div className="relative">
        <div className="drawer relative">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar bg-base-300">
              <div className="flex-none ">
                <label
                onClick={handlecloseBtn}
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
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
              <div className="flex-1 px-2 mx-2">DashBoard</div>
              
            </div>
            {/* Page content here */}
            <Outlet></Outlet>
          </div>
          <div className="drawer-side ">
            <label
              className="drawer-overlay"
            ></label>
            {/* Close button */}
            <label
            onClick={handlecloseBtn}
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="absolute top-0 right-0 m-4 z-10 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={`${closeBtn? "hidden": "block"}  w-6 h-6 stroke-current`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              {/* Sidebar content here */}
              {
                isAdmin? adminRoutes  : userRoutes
              }
              <button onClick={()=> logOut()} className="btn btn-sm bg-red-600 text-white">Log Out</button>
             
            </ul>
            
          </div>
        </div>
      </div>

      
    </div>
    );
  };
export default DashBoardLayout;
