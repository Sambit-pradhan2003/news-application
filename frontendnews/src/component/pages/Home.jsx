import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  // const apik = process.env.REACT_APP_API_KEY;
  //     console.log(apik)
  const [count, setCount1] = useState({});
  const [query, setQuery] = useState('');
  const[query1,setquery1]=useState("")
  const [news, setNews] = useState([]); // Initialize news as an empty array

  const hadlebutton=()=>{
    setQuery(query1)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: query ?(query):('india') ,
            apiKey: import.meta.env.VITE_SOME_KEY,
          },
        });

        setCount1(response.data);
        if (response.data.articles) {
          setNews(response.data.articles); // Set news only if articles are available in the response
        }
      } catch (error) {
        console.log('error at home', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [query]);

  return (
    <div>
      <nav className="bg-blue-950 text-white w-full fixed top-20 flex items-center justify-between px-4 h-10 z-10">
        <div className="flex items-center">
          <input
           type="text"
           placeholder="Search"
           id="query1"
           name="query1"
           value={query1}
           onChange={(e) => setquery1(e.target.value)}
            className="px-2 py-1 mr-2 border text-black border-gray-600 rounded h-6"
          />
          <button onClick={hadlebutton} className="px-3  h-6 bg-gray-600 hover:bg-gray-700 rounded">
            Search
          </button>
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={(e)=>{
            setQuery(e.target.innerText)
          }}>Cricket</button>
          <button onClick={(e)=>{
            setQuery(e.target.innerText)
          }}>Science</button>
          <button onClick={(e)=>{
            setQuery(e.target.innerText)
          }}>Finance</button>
          <button onClick={(e)=>{
            setQuery(e.target.innerText)
          }}>Tech</button>
        </div>
        <div>
          <Link to="articles">go to blog➡️</Link>
        </div>
      </nav>
      <div className="grid grid-cols-3 gap-8 mt-36 mx-12">
        {news.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow">
            <img src={item.urlToImage} alt={item.title} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.source?.name}</p>
              <p className="text-xs text-gray-400">{item.publishedAt}</p>
              <p className="text-sm text-gray-800">{item.description?.slice(0, 20)}.........</p>
              {/* <Link to="/readingnews" state={{ data: item }} key={item.id}>
                <button className="text-blue-600">readmore</button>
              </Link> */}
              <Link to={item.url} >
                <button className="text-blue-600">readmore</button>
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
