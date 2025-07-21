import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from "../../assets/background.jpg";
// import BoardImagePattern from './BoardImagePattern.jsx';
import trello from '../../assets/trello.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Signup successful:', data);
        navigate('/'); 
      } else {
        console.error('Signup failed:', data.message);
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="flex w-full max-w-6xl bg-transparent bg-opacity-90 shadow-xl rounded-2xl overflow-hidden">
        {/* Left side: Signup Form */}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full mb-4 px-4 py-2 border placeholder:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.first_name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full mb-4 px-4 py-2 border placeholder:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.last_name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 placeholder:text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-6 px-4 py-2 border placeholder:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right side: Animated Board Pattern */}
        <div className="hidden mt-14 lg:block lg:w-1/2">
         <img src={trello} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
