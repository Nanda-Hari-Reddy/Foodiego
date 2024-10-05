import React, { useEffect, useState } from 'react';
import { FaSearch, FaStar, FaShare, FaCommentAlt } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { BsChevronLeft, BsChevronRight, BsFillMoonFill, BsPerson, BsCartCheck } from 'react-icons/bs';
import FoodCarousel from './FoodCorousel';
import { useMyContext } from '../Security/ContextProvider';
import { Link } from 'react-router-dom';
import { retrieveDataForHomePage } from '../api/foodiegoAPI';



const HomePage = () => {

  const context = useMyContext()
  context.setIsAdminAuthenticated(false)
  const theme = context.theme
  const [restaurants, setRestaurants] = useState([])
  const [foods, setFoods] = useState([])
  const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'Thai', 'American', 'Mediterranean'];

  const offers = [
    { id: 1, text: '50% OFF up to ₹100', code: 'WELCOME50' },
    { id: 2, text: 'Free Delivery on your first order', code: 'FREEDEL' },
    { id: 3, text: '20% OFF on orders above ₹500', code: 'BIGORDER' },
  ];

  const rsnts = []
  function retrieveData()
  {
    retrieveDataForHomePage()
    .then( (response) => { 
                            console.log(response)
                            setRestaurants(response.data.Restaurants )
                            setFoods(response.data.Foods )  } )
    .catch( (error) => console.log(error))
  }
  useEffect( () => { retrieveData()}, [] )

  return (
    
    <div className={`min-h-screen ${theme ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}>
      <main className="container mx-auto mt-8 px-20">
        <section className="mb-1" aria-labelledby="trending-restaurants">
          <FoodCarousel featureFoods = { foods } />
        </section>
        <section className="mb-12" aria-labelledby="trending-restaurants">
            <h2 id="trending-restaurants" className="text-2xl font-bold mb-4">Trending Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <Link to={`/foodieGo/restaurant/${restaurant.id}`}>
                                      <div key={restaurant.id} className={`${theme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105`}>
                                        <img src={restaurant.imageURL} alt={restaurant.name} className="w-full h-48 object-cover" />
                                        <div className="p-4">
                                          <h3 className="font-bold text-lg mb-2">{restaurant.restaurantName}</h3>
                                          <p className="text-sm mb-2">{restaurant.restaurantCategory}</p>
                                          <div className="flex items-center">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{4.5}</span>
                                          </div>
                                          <div className="mt-4 flex justify-between items-center">
                                            <button className={`${theme ? 'bg-white text-black' : 'bg-orange-500 text-white'} px-4 py-2 rounded`}>Order Now</button>
                                            <div className="flex space-x-2">
                                              <button aria-label="Share" className={`${theme ? 'text-white' : 'text-gray-600'} hover:text-orange-500`}>
                                                <FaShare />
                                              </button>
                                              <button aria-label="Reviews" className={`${theme ? 'text-white' : 'text-gray-600'} hover:text-orange-500`}>
                                                <FaCommentAlt />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                  </Link>
                ))}
            </div>
        </section>
          <section className="mb-12" aria-labelledby="popular-cuisines">

            <h2 id="popular-cuisines" className="text-2xl font-bold mb-4">Popular Cuisines</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6">
              {cuisines.map((cuisine, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full ${theme ? 'bg-white text-black' : 'bg-orange-100 text-orange-800'} hover:bg-orange-200 transition-colors duration-300`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-12" aria-labelledby="special-offers">
            <h2 id="special-offers" className="text-2xl font-bold mb-4">Special Offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className={`${theme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 border-2 border-dashed ${theme ? 'border-white' : 'border-orange-500'}`}>
                  <h3 className="font-bold text-lg mb-2">{offer.text}</h3>
                  <p className={`text-sm ${theme ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Use code: <span className="font-bold">{offer.code}</span></p>
                  <button className={`${theme ? 'bg-white text-black' : 'bg-orange-500 text-white'} px-4 py-2 rounded w-full`}>Apply Offer</button>
                </div>
              ))}
            </div>
          </section>
      </main>

      <footer className={`${theme ? 'bg-indigo-950 text-white' : 'bg-red-600 text-black'} py-8`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Foodie</h3>
              <p>Foodie is your go-to app for delicious meals delivered right to your doorstep.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="hover:text-orange-500"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter" className="hover:text-orange-500"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram" className="hover:text-orange-500"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Foodie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
