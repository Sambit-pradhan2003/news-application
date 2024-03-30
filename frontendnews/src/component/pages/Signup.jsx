import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [fullname, setfullname] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [data, setdata] = useState({});
  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement your registration logic here
    try {

      const formData = new FormData();
        formData.append("username", username);
        formData.append("fullName", fullname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", profileImage); // Change the field name to "avatar"
        formData.append("coverImage", coverImage);

        const response = await axios.post("/api/v1/users/register", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setdata(response.data);
      
    } catch (error) {
      console.log("error at handlae submit",error)
    }
  };
  useEffect(() => {
    if (data.statuscode === 200) {
      navigate("/login");
    }
  }, [data.statuscode, navigate]);

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            fullname
          </label>
          <input
            type="fullname"
            id="fullname"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your fullname"
            onChange={(e) => setfullname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded-md"
            placeholder="Choose a username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
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
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
