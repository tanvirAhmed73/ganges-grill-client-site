import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';

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
      }
  ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-slate-300'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </div>
)
