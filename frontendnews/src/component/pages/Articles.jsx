import React from 'react';

const Articles = () => {
  // Sample data for demonstration
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
   <>
    <div className=" h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-20 relative ">
      <h1 className="text-4xl font-bold text-white absolute bottom-10 left-0 mb-4 ml-10">Read our blog</h1>
      <p className=' text-white absolute bottom-0 left-0 mb-4 ml-10'> helo</p>
      <button className='absolute bottom-0 right-0 mb-4 mr-10'> hello</button>
    </div>
    <div className="grid grid-cols-3 gap-8 mt-8 mx-12">
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
    </>
  );
};

export default Articles;