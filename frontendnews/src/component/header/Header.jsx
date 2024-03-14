import React from 'react'
import { Link } from 'react-router-dom';

function Header({user}) {
    console.log(user)
    return (
        <header className="flex justify-between items-center py-2 px-5 bg-blue-300 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <img className="h-7 w-8" src="logo" alt="Logo" />
            </div>
            <div className="text-xl font-semibold">{ 'Welcome'}</div>
          </div>
          <div className="flex items-center">
            {user ? (
              <button className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded text-white">
                Logout
              </button>
            ) : (
              <div>
                <Link to="/signup" >
                <button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white mr-2">
                  Sign Up
                </button>
                </Link>


                <Link to="/login" >
                <button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white">
                  Log In
                </button>
                </Link>
              </div>
            )}
          </div>
        </header>
      );
}

export default Header
