import React, { useState } from 'react';

const Writearticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);
    // Reset form fields after submission
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Write your Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};



export default Writearticle;