import React, { useEffect, useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaShoppingCart, FaSearch, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { retrieveRestaurant, retrieveMenu } from '../api/foodiegoAPI';
import MenuRecomendation from './MenuRecomendation.jsx'
import Menu from './Menu.jsx'
const Restaurant = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const { restaurantId } = useParams()
  const [rsnt, setRsnt] = useState('')
  const [menu, setMenu] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(0)
  function getRestaurantDetails()
  {
    retrieveRestaurant(restaurantId)
    .then(( response ) => { 
                            // console.log(response)
                            setRsnt(response.data)
                          })
    .catch((error) => console.log(error))

    retrieveMenu(restaurantId)
    .then(( response ) => {
                            setMenu(response.data._embedded.foodResponseList);                      
                          })
    .catch((error) => console.log(error))
                          console.log(menu)
  }
  useEffect( () =>{ getRestaurantDetails(restaurantId) }, [restaurantId])

  return (
    <div className="container mx-10 px-28 py-8 mb-12 mt-20 mr-20 pr-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{ rsnt.restaurantName }</h1>{/*{restaurant.name}*/}
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-semibold">4.5{/*{restaurant.rating}*/}</span>
          <span className="mx-2">|</span>
          <span>{ rsnt.restaurantCategory }{/*{restaurant.cuisine}*/}</span>
        </div>
        <p className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          {rsnt.location }{/*{restaurant.address}*/}
        </p>
      </header>
      <MenuRecomendation restaurantId = {restaurantId}/>
      <Menu  menu = {menu} restaurantId = {restaurantId} setQuantity = {setQuantity} isVisible = {isVisible} setIsVisible = {setIsVisible}/>

      <section className="mb-12 mx-10 px-10 mb-12 mt-20 mr-20 pr-20">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Add review components here */}
          <p className="text-gray-600">Customer reviews will be displayed here.</p>
        </div>
      </section>

      <footer className="bg-gray-100 rounded-lg shadow-md p-6 mx-10 px-10 mb-12 mt-20 mr-20 pr-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Restaurant Info</h3>
            <p><strong>Open Hours:</strong> {/* {restaurant.openHours}*/}</p>
            <p><strong>Phone:</strong> {/* {restaurant.phone}*/}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p>{/* {restaurant.address}*/}</p>
            {/* Add a map component here */}
            <div className="bg-gray-300 h-32 mt-2 rounded-md"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF size={24} /></a>
              <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-pink-600 hover:text-pink-800"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-20 right-4">
          <Link to="/foodieGo/cart">
              <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center">
                  <FaShoppingCart className="mr-2" />
                  <span className="font-semibold">{quantity}</span>
              </button>
          </Link>
        
      </div>
      <div className="relative">
        {isVisible && (
          <div
            className="fixed bottom-0 left-0 right-0 p-4 bg-green-600 text-white shadow-lg transition-all duration-300 ease-in-out transform translate-y-0 opacity-100"
            role="alert"
            aria-live="assertive"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <FaShoppingCart className="text-2xl mr-3 animate-pulse" />
                <p className="font-semibold text-lg">
                  {quantity} Items successfully added to your cart!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;