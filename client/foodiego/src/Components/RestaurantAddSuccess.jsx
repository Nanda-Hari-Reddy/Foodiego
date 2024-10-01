import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowLeft, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantAddSuccess = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2" role="alert">
            Restaurant Added Successfully
          </h1>
          <p className="text-gray-600 mb-6">
            Your restaurant has been successfully added to our platform.
          </p>
        </div>

        <div className="space-y-4 ml-28">        
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              aria-label="View Restaurant Profile"
            >
              <FaEye className="mr-2" />
              <Link to={`/foodiego/myrestaurant`}>{isMobile ? "View Profile" : "View Restaurant"}</Link>
            </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Thank you for joining our platform. We're excited to have your restaurant on board!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RestaurantAddSuccess;