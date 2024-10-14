import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaSearch } from 'react-icons/fa';
import { Link, Navigate} from 'react-router-dom'
import  './FoodieGo.css';
import { IoFastFood } from 'react-icons/io5';
import { BsCartCheck, BsFillMoonFill, BsPerson } from 'react-icons/bs';
import { useMyContext } from './Security/ContextProvider';

const HeaderComponent = () =>
{
    
    const [searchTerm, setSearchTerm] = useState('');
    const context = useMyContext()
    const theme = context.theme
    const setTheme = context.setTheme
    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchTerm);
      };

      const toggleHighContrast = () => {
        setTheme(!theme);
      };

    return(
        <div className="headerComponent">
            <header className={`${theme ? 'bg-black text-white' : 'bg-white text-black'} pl-4 shadow-md`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center mt-5">
                        <IoFastFood className="text-3xl mr-2" />
                        <Link to="/foodieGo/home"><h1 className="text-2xl font-bold mr-10">FoodieGo</h1></Link>
                        { context.authenticated && <Link to="/foodieGo/home"className="text-lg hover:underline mr-10">Home</Link> }
                        { context.authenticated && <a href="#" className="text-lg hover:underline">Restaurants</a> }
                    </div>
                    <ul className="flex space-x-4 mt-10">
                    { context.authenticated &&  <form onSubmit={handleSearch} className="mb-8 mr-7">
                            <div className="relative">
                                <input
                                type="text" placeholder="Search for restaurants or dishes" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-[500px] p-2 rounded-full ${theme ? 'bg-white text-black' : 'bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                aria-label="Search for restaurants or dishes"
                                />
                                <button
                                    type="submit"
                                    className={`absolute top-1/2 transform -translate-y-1/2 ${theme ? 'text-white' : 'text-gray-600'}`}
                                    aria-label="Search">
                                    <FaSearch className="text-xl ml-5" />
                                </button>
                            </div>
                        </form> }
                    </ul>
                    <ul className='flex space-x-4 mt-10'>
                    { context.authenticated && <li><Link to='/foodieGo/cart'className="hover:underline"><BsCartCheck size={24} className='mb-10'/></Link></li> }
                    { context.authenticated && <Link to={`/foodiego/myprofile`}><li><a href="#" className="hover:underline"><BsPerson size={24}className='mb-10' /></a></li></Link> }
                    { context.authenticated && <li><button
                        onClick={toggleHighContrast}
                        className={`${theme ? 'bg-black text-white' : 'bg-white text-black'} px-4 py-2 rounded`}
                        aria-label="Toggle high contrast mode">{theme ? <BsFillMoonFill /> : <BsFillMoonFill /> }</button></li> }
                    </ul>
                    {context.authenticated || !context.adminAuthenticated && <ul className='flex space-x-4 mt-5 mr-10 font-bold text-lg'>
                        <Link to='/addRestaurant'><li>Add Restaurant</li></Link> 
                        <Link to={`/foodiego/restaurantlogin`}><li >My Restaurant</li></Link>
                    </ul> }
                </div>
            </header>
        </div>
    )
}
export default HeaderComponent