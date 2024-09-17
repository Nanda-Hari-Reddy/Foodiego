import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FoodCarousel = ({ featureFoods }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  
  console.log(featureFoods)
  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      scroll('right');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Featured Food Items</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide h-60"
        onScroll={handleScroll}
      >
        {featureFoods.map((item) => (
          <div
            key={item.id}
            className="flex-none w-32 h-32 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
            <div className="pt-2 text-center">
              <h3 className="text-lg font-semibold text-black-900">{item.dishName}</h3>
            </div>
          </div>
        ))}
        
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FoodCarousel;