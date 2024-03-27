import React,{ useState,useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { login  } from '../../store/authslice'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const [count, setCount] = useState();
  const [loggedin, setlogedin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const x =useSelector(state=>state.auth.status)
  const y=useSelector(state=>state.auth.userdata)



  const hsubmit = async () => {
    try {
      const response = await axios.post("/api/v1/users/login", {
        "username": username,
        "email": email,
        "password": password,
      });
      setCount(response.data);

    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  if (count !== undefined && count !== null){
    dispatch(login({userdata:count}))
  }


  useEffect(() => {
    // This block will run whenever count is updated
    // setlogedin(x)

    if (count !== undefined && count !== null) {
      setlogedin(true);

      if (loggedin) {
        navigate('/');
      }
    }
  }, [count, loggedin, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={hsubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Login
            </button>
            <a href="/forgot-password" className="text-blue-500 text-sm">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
