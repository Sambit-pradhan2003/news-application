import React from 'react';
import { useLocation } from 'react-router-dom';

const Reader = () => {
  const { state } = useLocation();
  const articleData = state && state.data;

  if (!articleData) {
    return <div className="max-w-3xl mx-auto mt-24 py-8">Unexpected Error</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 py-8">
      <div className="max-w-xl mx-auto">
        <img src={articleData.ArticleImage} alt="Blog post" className="w-full h-96" />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">{articleData.title}</h2>
        <p className="text-sm text-gray-600">{articleData.channel}</p>
        <p className="text-xs text-gray-400">{articleData.createdAt}</p>
            
        <p className="text-gray-700 mt-2">
          {articleData.Text}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque justo et justo
          condimentum, vitae facilisis ex ultricies. Maecenas quis justo velit. Donec id tellus nec
          magna sollicitudin interdum vel non nulla.
        </p>
      </div>
    </div>
  );
};

export default Reader;

