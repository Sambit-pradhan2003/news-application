
import React from 'react';
import { Link } from 'react-router-dom';

const Homeheader = () => {
    return (
        <nav className="bg-blue-950 text-white w-full fixed top-20 flex items-center justify-between px-4 h-10 z-10">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 mr-2 border border-gray-600 rounded h-6"
          />
          <button className="px-3  h-6 bg-gray-600 hover:bg-gray-700 rounded">
            Search
          </button>
        </div>
        <div className="flex justify-center space-x-4">
          <Link to="/cricket">Cricket</Link>
          <Link to="/politics">Politics</Link>
          <Link to="/bollywood">Bollywood</Link>
        </div>
        <div>
          <Link to="articles">go to blog➡️</Link>
        </div>
      </nav>
      );
};

export default Homeheader;