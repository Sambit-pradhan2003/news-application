import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './component/pages/Home.jsx';
import { 
  Signup,
  Login,
  Articles,
  Writearticle,
  Yourblogs,
 } from './Allcomponent.js';
import { Provider } from 'react-redux'
import store from './store/store.js';



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
      {
        path:"login",
      element:<Login/>
      },
      {
        path:"articles",
      element:<Articles/>
      },
      {
        path:"writearticle",
      element:<Writearticle/>
      },
      {
        path:"yourblogs",
      element:<Yourblogs/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
