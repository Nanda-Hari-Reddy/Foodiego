import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdCancelPresentation } from "react-icons/md";
import { additemToCart, retrieveMostOrdersForRestaurant } from '../api/foodiegoAPI';
import { FaShoppingCart } from 'react-icons/fa';

const MenuRecommendation = ({restaurantId}) => {
  
  const images = [
    { id: 1, name: 'Mountain Vista', url: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks2024/47699827A.png' },
    { id: 2, name: 'Ocean Waves', url: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks2024/47699839A.png' },
    { id: 3, name: 'Forest Trail', url: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks2024/47699832A.png' },
    { id: 4, name: 'Desert Sunset', url: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/zbrpxvywfsrrb7os11jf' },
    { id: 5, name: 'City Skyline', url: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/wqvc9jnr4vhjmkkjiir0' },
    { id: 6, name: 'Autumn Colors', url: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/txnhcbhyu0kkltnqxyyu' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [recommendations, setRecommendations] = useState([])
  const[show, setShow] = useState(false)
  const mostOrders = () =>
  {
    console.log(restaurantId+"************************************************")
    retrieveMostOrdersForRestaurant(restaurantId)
    .then((response) => {
                          console.log(response)
                          setRecommendations(response.data)
                        })
    .catch((error) => console.log(error))
  }
  useEffect(() => { mostOrders()}, [])
  useEffect(() => {
    updateVisibleImages();
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const updateVisibleImages = () => {
    const screenWidth = window.innerWidth;
    let imagesToShow = 4;
    if (screenWidth < 640) imagesToShow = 1;
    else if (screenWidth < 1024) imagesToShow = 2;
    else if (screenWidth < 1280) imagesToShow = 3;

    const endIndex = currentIndex + imagesToShow;
    const wrappedImages = [...images, ...images.slice(0, endIndex)];
    setVisibleImages(wrappedImages.slice(currentIndex, endIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleSubmit = (imageId) => {
    console.log(`Submitted image with ID: ${imageId}`);
    const orderRequest =
      {
        quantity : 1,
        customerEmail : "hari@gmail.com",
      }
      additemToCart(restaurantId, imageId, orderRequest)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      setShow(true)

  };

  return (
    <div className="relative w-full px-32 overflow-hidden">
      <h4 className='text-3xl font-bold mb-7'>Top Picks</h4>
      <div className="flex transition-transform duration-500 ease-in-out transform">
        {recommendations.map((image) => (
          <div key={image.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={image.imageURL}
                alt={image.dishName}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-bold">{image.dishName}</h3>
                <button
                  onClick={() => handleSubmit(image.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-2xl" />
      </button>
         { show &&   <div className="container mx-auto flex  justify-between">
            <div className="flex items-center">
                <FaShoppingCart className="text-2xl mr-3 animate-pulse" />
                <p className="font-semibold text-green text-lg">
                  Item successfully added to your cart!
                </p>
                </div>
                <button onClick={() => {setShow(false)}}><MdCancelPresentation /></button>
              </div>}
    </div>
  );
};
export default MenuRecommendation;