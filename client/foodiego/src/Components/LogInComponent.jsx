import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom"
import { useMyContext } from './Security/ContextProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const myContext = useMyContext()
  const theme = myContext.theme
  
  const validateForm =  async () => {
    let formErrors = {};
    if (!username) formErrors.username = 'Username is required';
    if (!password) formErrors.password = 'Password is required';
    if (password && password.length < 8) formErrors.password = 'Password must be at least 8 characters';
    setErrors(formErrors);
    if(!myContext.logIn(username, password)) formErrors.credentials = "Invalid Credentials";
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login successful');
      navigate(`/foodiego/home`)
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Handle forgot password logic here
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    // Handle sign up logic here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div>
          <h2 className= "mt-6 text-center text-3xl font-extrabold text-gray-900" >Welcome Foodie</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-lg -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"name="username" type="text" autoComplete="username" required value={username}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div className="relative top-5">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
              >
                <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
                <span>Google</span>
              </button>
            </div>

            <div>
              <button
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
              >
                <FaFacebook className="w-5 h-5 mr-2 text-blue-500" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to={"/foodiegi/register"} ><button
              type="button"
              onClick={handleSignUp}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Sign up
            </button></Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;