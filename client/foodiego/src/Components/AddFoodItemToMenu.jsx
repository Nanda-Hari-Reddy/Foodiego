import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, frameData } from "framer-motion";
import { addFoodItemToMenu } from "./api/foodiegoAPI";

const AddFoodItemToMenu = ({isOpen, setIsOpen, restaurantId, setIsMenuUpdated}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    imageURL: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    validateField(name, type === "file" ? files[0] : value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.trim() === "" ? "Name is required" : "";
        break;
      case "category":
        error = value.trim() === "" ? "category is required" : "";
        break;
      case "price":
        error =
          value === "" || isNaN(parseFloat(value))
            ? "Price must be a valid number"
            : "";
        break;
      case "image":
        error = '' ? "Image is required" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      validateField(key, formData[key]);
      if (errors[key]) acc[key] = errors[key];
      return acc;
    }, {});

    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);

      const foodItem = {
          imageURL : formData.imageURL,
          dishName : formData.name,
          price : parseFloat(formData.price),
          category : formData.category
      }
      console.log(foodItem)
      addFoodItemToMenu(foodItem, restaurantId)
      .then( (response) => { 
                              console.log(response)
                              setIsMenuUpdated(true)
                            })
      .catch( (error) => console.log(error) )

      setIsLoading(false);
      setIsOpen(false);
      setFormData({ name: "", description: "", price: "", image: null });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="p-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add Food Item</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter food item name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="category"
                    rows="3"
                  ></input>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter price"
                    step="0.01"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="imageURL"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    id="imageURL"
                    name="imageURL"
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    }`}
                    accept="image/*"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddFoodItemToMenu;
