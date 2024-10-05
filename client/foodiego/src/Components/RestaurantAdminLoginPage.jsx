import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { validateRestaurantAdmin } from "./api/foodiegoAPI";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "./Security/ContextProvider";

const RestaurantAdminLoginPage = () => {
  const context = useMyContext()
  context.setIsAdminAuthenticated(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password too short");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      const adminRequest = {
        userName : email,
        password : password
      }
      validateRestaurantAdmin(adminRequest)
      .then((response) => 
                            {
                              console.log(response)
                              if(response.status==200)
                              {
                                context.setAdmin(email)
                                context.setIsAdminAuthenticated(true)
                                navigate(`/foodiego/myrestaurant`)
                              }
                            })
      .catch((error) => console.log(error))
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Email"
              autoComplete="email"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white rounded-lg py-3 font-semibold transition duration-300 ease-in-out transform hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 `}
          >
              Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantAdminLoginPage;