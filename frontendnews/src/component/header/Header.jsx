import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authslice';
import axios from 'axios';




const Header = () => {
  const [loggedIn,setloggedIn]=useState(false)
  const dispatch = useDispatch()


  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout"
          );
          await dispatch(logout())
          await localStorage.removeItem('isLoggedIn1');
     

    } catch (error) {
      console.log("error fetching data", error);
    }
  };

    const x=useSelector(state=>state.auth.status)
    useEffect(() => {
      setloggedIn(x);
    }, [x]);
    const isLoggedIn = localStorage.getItem('isLoggedIn1') === 'true';
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-violet-500 text-white fixed top-0 w-full z-10">
    <div className="flex items-center">
      <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center mr-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" />
      </div>
      <h1 className="text-xl font-bold">Your App Name</h1>
    </div>
    <nav>
      {loggedIn ||isLoggedIn ? (
        <button onClick={handleLogout} className="mx-2">
          Logout
        </button>
      ) : (
        <>
          <Link to="/signup" className="mx-2">
            Signup
          </Link>
          <Link to="/login" className="mx-2">
            Login
          </Link>
        </>
      )}
    </nav>
  </header>
  );
};

export default Header;
