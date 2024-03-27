import React, { useState } from 'react'
import axios from 'axios';

function Articles() {

    const [count, setCount] = useState()

    const hsubmit = async () => {
        try {
          const response = await axios.post("/api/v1/users/logout"
          );
          setCount(response.data);
         
    
        } catch (error) {
          console.log("error fetching data", error);
        }
      };
      console.log(count)
  return (
    <button
    type="button"
    onClick={hsubmit}
    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
  >
    Login
  </button>
  )
}

export default Articles
