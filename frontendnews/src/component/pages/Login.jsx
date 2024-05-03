import React,{ useState,useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { login  } from '../../store/authslice'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcorrect, setpasscorrect] = useState(false);
  const [count, setCount] = useState();
  const [loggedin, setlogedin] = useState(false);
  const [dataavail, setDataavail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const x =useSelector(state=>state.auth.status)
  const y=useSelector(state=>state.auth.userdata)


  useEffect(() => {
    if (count !== undefined && count !== null) {
      dispatch(login({ userdata: count }));
      localStorage.setItem('isLoggedIn1', 'true');
      setpasscorrect(false); // Reset passcorrect state
    }
  }, [count, dispatch]);

  const hsubmit = async () => {
    try {
      if (password && email) {
        const response = await axios.post('/api/v1/users/login', {
          email: email,
          password: password,
        });
        setCount(response.data);
        dispatch(login({ userdata: response.data }));
      } else {
        setDataavail(true);
      }
    } catch (error) {
      setpasscorrect(true);
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    // console.log("gghfhgf",count)
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

          {dataavail && <p>Please fill in all input fields.</p>}
          {passcorrect && <p>invalid credential</p>}


          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={hsubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
