import React, { useState } from "react";
import { FaUtensils, FaMapMarkerAlt, FaPhone, FaGlobe, FaClock, FaList, FaImage, FaImages } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { addRestaurant } from "./api/foodiegoAPI";
const AddRestaurant = () => {

  const [formData, setFormData] = useState({
    name: "",
    adminUserName:"",
    adminPassword:"",
    address: "",
    phone: "",
    website: "",
    cuisineType: "",
    opens: "",
    closes: "",
    imageURL: "",
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.trim() === "" ? "Restaurant name is required" : "";
        break;
      case "address":
        error = value.trim() === "" ? "Address is required" : "";
        break;
      case "phone":
        error = !/^\d{10}$/.test(value) ? "Invalid phone number" : "";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const newRestaurant = async () =>
  {
    const restaurant ={
      imageURL : formData.imageURL,
      restaurantName : formData.name,
      location : formData.address,
      restaurantCategory : formData.cuisineType,
      contactNumber : formData.phone,
      opens : formData.opens,
      closes : formData.closes,
      adminUserName : formData.adminUserName,
      password : formData.adminPassword
    }
      try {
            const response = await addRestaurant(restaurant)
            console.log(response)
            navigate(`/addRestaurant/RestaurantAdded`)
      } catch (error) {
        console.log(error)
      }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(errors!==null)
    {
      newRestaurant()
    }
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-green-600">
          <h2 className="text-2xl font-bold text-white">Register Your Restaurant</h2>
          <p className="mt-1 text-sm text-indigo-100">Join our online ordering platform</p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-2"
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Restaurant Name *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUtensils className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter restaurant name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="adminUserName" className="block text-sm font-medium text-gray-700">
                Admin username *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdAdminPanelSettings className="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  type="text"
                  name="adminUserName"
                  id="adminUserName"
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.adminUserName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Admin Username"
                  value={formData.adminUserName}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.adminUserName && <p className="mt-2 text-sm text-red-600">{errors.adminUserName}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">
                password *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordFill className="h-5 w-5 text-gray-400"/>
                </div>
                <input
                  type="password"
                  name="adminPassword"
                  id="adminPassword"
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.adminPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="password"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.adminPassword && <p className="mt-2 text-sm text-red-600">{errors.adminPassword}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                    <div>
                        <label htmlFor="opens" className="text-sm font-medium text-gray-700">
                            Opens At *
                        </label>
                        <input
                            type="time"
                            name="opens"
                            id="opens"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
                            value={formData.opens}
                            onChange={handleChange}
                            required
                        />
                    </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                    <div>
                        <label htmlFor="closes" className="text-sm font-medium text-gray-700">
                            Closes At *
                        </label>
                        <input
                            type="time"
                            name="closes"
                            id="closes"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
                            value={formData.closes}
                            onChange={handleChange}
                            required
                        />
                    </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">
                Cuisine Type *
              </label>
              <select
                name="cuisineType"
                id="cuisineType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.cuisineType}
                onChange={handleChange}
                required
              >
                <option value="">Select cuisine type</option>
                <option value="PURE_VEG">PURE VEG</option>
                <option value="NON_VEG">NON VEG</option>
                <option value="CHINESE">CHINESE</option>
                <option value="FAST_FOOD">FAST FOOD</option>
                <option value="BIRYANI_POINT">BIRYANI POINT</option>
                <option value="BEVERAGES">BEVERAGES</option>
                <option value="SOUTH_INDIAN">SOUTH INDIAN</option>
                <option value="NORTH_INDIAN">NORTH INDIAN</option>
                <option value="MEXICAN">MEXICAN</option>
                <option value="BAKERY">BAKERY</option>
                <option value="HEALTHY_FOOD">HEALTHY FOOD</option>
                <option value="BIRYANI">BIRYANI</option>
                <option value="SWEETS">SWEETS</option>
                <option value="PUNJABI">PUNJABI</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-2"
            >
              <label htmlFor="menuItems" className="block text-sm font-medium text-gray-700">
                Image *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <FaImages className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="imageURL"
                  id="imageURL"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="image url"
                  value={formData.imageURL}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6"
          >
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Register Restaurant
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
