import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  HelmetProvider } from 'react-helmet-async';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import MainMenu from './Pages/OurMenu/MainMenu/MainMenu';
import Order from './Pages/OrderPage/Order/Order';
import AuthProvider from './Provider/AuthProvider';
import SignUp from './Pages/SignUpPage/SignUp';
import LoginPage from './Pages/LoginPage/LoginPage';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import DashBoardLayout from './DashBoard/DashBoardLayOut/DashBoardLayout';
import Cart from './DashBoard/DashBoardPages/CartPage/Cart';
import AllUser from './DashBoard/AdminPages/AllUser/AllUser';
import AddItems from './DashBoard/AdminPages/AddItems/AddItems';
import ViewPage from './DashBoard/DashBoardPages/CartPage/ViewPage/ViewPage';
import ManageMenuItem from './DashBoard/AdminPages/ManageMenuItem/ManageMenuItem';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/home',
        element:<Home></Home>, 
      },
      {
        path:'/contact',
        element:<Contact></Contact>, 
      },
      {
        path:'/ourMenu',
        element:<MainMenu></MainMenu>, 
      },
      {
        path: '/order/:category',
        element: <Order></Order>
      },
      {
        path: '/order',
        element: <Order></Order>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <LoginPage></LoginPage>
      },
    ]
  },
  
  {
    path: '/dashboard',
    element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
    children: [
      {
        path: 'cart',
        element: <PrivateRoutes><Cart></Cart></PrivateRoutes>
      },
      {
        path: '/dashboard',
        element: <PrivateRoutes><ViewPage></ViewPage></PrivateRoutes>
      },
      {
        path: 'allUser',
        element: <PrivateRoutes><AllUser></AllUser></PrivateRoutes>
      },
      {
        path: 'addItem',
        element: <PrivateRoutes><AddItems></AddItems></PrivateRoutes>
      },
      {
        path: 'manageMenuItem',
        element: <PrivateRoutes><ManageMenuItem></ManageMenuItem></PrivateRoutes>
      }
    ]
  }
]);

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-slate-300'>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
    
  </div>
)
