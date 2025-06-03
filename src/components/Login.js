import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userType, setUserType] = useState('User');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', { userType, username, password });
      
    }
    navigate('/dashboard'); // Redirect to dashboard after successful login
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#30c9d6]">
      <div className="bg-white rounded-2xl shadow-2xl flex overflow-hidden max-w-5xl w-full">
        
        {/* Left side illustration */}
        <div className="w-1/2 bg-[#029aaa] flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Welcome to WSLOS</h1>
          <img
            src="https://acemoney.in/assets/images/fintech/neo%20bank-01.png"
            alt="Banking Illustration"
            className="w-full max-w-xs rotate-2 px-5"
          />
        </div>

        {/* Right side form */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#01c4d5] mb-6">Admin / User Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* User Type */}
            <div>
              <label className="block mb-1 text-gray-700">Login As</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa]"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between text-sm text-gray-600">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-[#029aaa] hover:underline">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#029aaa] text-white py-2 rounded hover:bg-[#01c4d5] transition"
            >
              Login
            </button>

            {/* Create Account */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <a href="/register" className="text-[#029aaa] hover:underline">Create Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
