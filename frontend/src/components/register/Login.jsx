import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from "../../assets/background.jpg";
import trello from "../../assets/trello.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/login', formData); 
      console.log(response);
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/board');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => navigate('/signup');

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="flex w-full max-w-6xl bg-transparent shadow-2xl rounded-2xl overflow-hidden">
        {/* Left side: Login Form */}
        <div className="w-full lg:w-1/2 p-10 bg-white bg-opacity-90">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mb-4 px-3 py-2 border placeholder:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-6 px-3 py-2 border placeholder:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p
            onClick={goToSignup}
            className="text-blue-500 underline mt-5 text-center cursor-pointer hover:text-blue-700"
          >
            Don’t have an account? Create your account
          </p>
        </div>

        {/* Right side: Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img src={trello} alt="Trello Graphic" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
