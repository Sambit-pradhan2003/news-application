import React, { useEffect, useState } from 'react'
import { Link ,useLocation} from 'react-router-dom'
import axios from 'axios'

const Articles = () => {



  const[count,setCount1]=useState({});
  const[query,setquery]=useState("")
  const[query1,setquery1]=useState("")
  let blogs=[]

  const hadlebutton=()=>{
    setquery(query1)
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/articles/publisarticle", {
          
            // page: "2",
            query: query?query:"rcb"
            // sortType: "ascending",
          
        });

        setCount1(response.data);;
      } catch (error) {
        console.log("error at home", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [query])


  if (count.data!=null) {
    blogs=count.data

  }
  if (count.data==null) {
    return(
      <div>
        <div className="max-w-3xl mx-auto mt-24 py-8">Unexpected Error</div>
        <div className="max-w-3xl mx-auto  py-8">please login to view this page  </div>
      </div>
      )

  }

  return (
   <>
    <div className=" h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-20 relative ">
      <h1 className="text-4xl font-bold text-white absolute bottom-10 left-0 mb-4 ml-10">Read our blog</h1>
      <p className=' text-black absolute bottom-0 left-0 mb-4 ml-10'> <input
            type="text"
            placeholder="Search"
            id="query1"
            name="query1"
            value={query1}
            onChange={(e) => setquery1(e.target.value)}
            className="px-2 py-1 mr-2 border border-gray-600 rounded h-6"
          />
          <button  onClick={hadlebutton} className="px-3  h-6 text-white bg-gray-600 hover:bg-gray-700 rounded">
            Search
          </button></p>
      <Link to= '/writearticle'>
      <button className='absolute bottom-0 text-blue-200 bg-blue-500 p-1  right-0 mb-4 mr-10'> write blog</button>
      </Link>
    </div>
    <div className="grid grid-cols-3 gap-8 mt-8 mx-12">
      {blogs.map((item) => (
        <div className="bg-gray-100 p-4 rounded shadow">
          <img src={item.ArticleImage} alt={item.title} className="w-full h-40 object-cover rounded" />
          <div className="mt-2">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.channel}</p>
            <p className="text-xs text-gray-400">{item.createdAt}</p>
            <p className="text-sm text-gray-800">{item.Text.slice(0, 20)}......</p>
            <Link to= '/reading'
            state={{data:item}} key={item.id}>
            <button className='text-blue-600'>readmore</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Articles;