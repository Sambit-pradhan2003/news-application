import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authslice';
import axios from 'axios';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.status);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const handleBeforeUnload = async() => {
  //     const response = await axios.post("/api/v1/users/logout");
  //     await dispatch(logout())
  //     localStorage.removeItem('isLoggedIn1');
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);



  useEffect(() => {
    const isLoggedIn2 = localStorage.getItem('isLoggedIn1') === 'true';
    setLoggedIn(isLoggedIn2);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      await dispatch(logout());
      localStorage.removeItem('isLoggedIn1');
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  const x = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoggedIn(x);
  }, [x]);

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-violet-500 text-white fixed top-0 w-full z-10">
      <div className="flex items-center">
        <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center mr-4">
          <img src="https://w7.pngwing.com/pngs/898/590/png-transparent-newspaper-mobile-app-mailonline-android-news-files-free-miscellaneous-text-logo.png" alt="Logo" className="h-8 w-8" />
        </div>
        <Link to="/">
        <h1 className="text-xl font-bold">SN NEWS</h1>
        </Link>
      </div>
      <nav>
        {isLoggedIn && loggedIn? (
          <Link to="/">
          <button onClick={handleLogout} className="mx-2">
            Logout
          </button>
          </Link>
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
