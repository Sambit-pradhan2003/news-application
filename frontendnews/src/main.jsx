import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './component/pages/Home.jsx';
import { Signup } from './Allcomponent.js';



const router= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
      element:<Home/>
      },
      {
        path:"signup",
      element:<Signup/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>,
)
