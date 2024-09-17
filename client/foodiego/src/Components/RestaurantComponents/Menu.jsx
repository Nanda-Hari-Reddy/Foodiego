import React, { useEffect, useState } from 'react';
import { FaSearch, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { additemToCart } from '../api/foodiegoAPI'
const Menu = ({ menu, restaurantId, setQuantity, setIsVisible, isVisible }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(menu.map(item => item.category))];
  const firstIndex = menu[0]
  const [counts, setCounts] = useState([]);
  
  useEffect(() => {
    if (menu) {
      setCounts(menu.map(() => 0));  // Initialize counts to an array of 0's matching the menu length
    }
  }, [menu]);

    const handleClick =  (index) => {
      setCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[index-firstIndex.id] += 1;
        return newCounts;
      });
      setQuantity((prevQuantity) => {
        var newQuantity = prevQuantity;
        newQuantity += 1;
        return newQuantity;
      });
      const orderRequest =
      {
        quantity : 1,
        customerEmail : "hari@gmail.com",
      }
      additemToCart(restaurantId, index, orderRequest)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))

        setIsVisible(true);
        
      
    };
                                                           
  const filteredItems = menu.filter(item =>
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    item.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 mx-10 px-10 mb-12 mt-20 mr-20 pr-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="relative mb-4 md:mb-0 w-full md:w-64">
          <input
            type="text"
            placeholder="Search menu items"
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 hover:text-white transition duration-300`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <img 
              src={item.imageURL} 
              alt={item.dishName}
              className="w-full md:w-48 h-48 object-cover"
            />
            <div className="flex-grow p-4">
              <h2 className="text-xl font-semibold mb-2">{item.dishName}</h2>
              <p className="text-gray-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
              <p className="text-lg font-bold text-blue-600"><FaIndianRupeeSign />{item.price.toFixed(2)}</p>
            </div>
            <div className="p-4">
              <button
                  onClick={() => handleClick(item.id)}
                  className="flex items-center justify-center w-40 h-16 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-gradient-to-r from-green-500 to-indigo-600 hover:to-bg-gradient-to-r from-green-500 to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {counts[item.id-firstIndex.id] === 0 ? (
                    <span className="mr-2 text-xl">Add To Cart</span>
                  ) : (
                    <span className="text-3xl font-semibold">{counts[item.id-firstIndex.id]}</span>
                  )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Menu;