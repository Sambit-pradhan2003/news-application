import React from 'react'
import Homeheader from '../header/Homeheader'
import { Link } from 'react-router-dom';

function Home() {

  const data = [
    {
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Title 1',
      writer: 'Writer 1',
      description: 'Description 1',
      timestamp: '2024-03-30T12:00:00Z',
    },
    {
      id: 2,
      imageUrl: 'https://example.com/image2.jpg',
      title: 'Title 2',
      writer: 'Writer 2',
      description: 'Description 2 njfjvfhbfh hjfbvhdf jhfhg ',
      timestamp: '2024-03-29T12:00:00Z',
    },
    {
      id: 3,
      imageUrl: 'https://example.com/image3.jpg',
      title: 'Title 3',
      writer: 'Writer 3',
      description: 'Description 3',
      timestamp: '2024-03-28T12:00:00Z',
    },
    {
      id: 3,
      imageUrl: 'https://example.com/image3.jpg',
      title: 'Title 3',
      writer: 'Writer 3',
      description: 'Description 3',
      timestamp: '2024-03-28T12:00:00Z',
    },
  ];
  return (
    <div>
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
      <div className="grid grid-cols-3 gap-8 mt-36 mx-12">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow">
           <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.writer}</p>
              <p className="text-sm text-gray-800">{item.description}</p>
              <p className="text-xs text-gray-400">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  )
}

export default Home