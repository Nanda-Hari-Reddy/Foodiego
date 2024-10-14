import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { FaTrash, FaPlus, FaMinus, FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useMyContext } from './Security/ContextProvider';
import { additemToCart, deleteitemToCart, deleteOrderInCart, retrieveCart, retrieveCartTotal } from './api/foodiegoAPI';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaIndianRupeeSign } from 'react-icons/fa6';

const Cart = () => {
  const context = useMyContext()
  const userData = context.userDetails
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [total, setTotal] = useState(0)
  const [restaurantId, setRestaurantId] = useState(-1)
  const [orders, setOrders] =useState([])
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isOrderDeleted, setIsOrderDeleted] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const arrayAsString = encodeURIComponent(JSON.stringify(selectedOrders));
    function getCartOrders()
    {
      retrieveCart(userData.id)
      .then(( response ) => { 
                                console.log(response)
                                setOrders(response.data.orderResponseList)
                                
                                // flushSync(() => {
                                //   setTotal(response.data.cartTotal)
                              // });
                            })
      .catch(( error ) => console.log(error))
    }
    const getCartTotal = async () =>
      {
          try {
                    const response = await retrieveCartTotal(userData.id)
                    console.log(response.data+"CARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
                    setTotal(response.data)
          } catch (error) {
                    console.log(error)
          }
          
      }
      // useEffect(() => { getCartTotal() },[])
    useEffect(() => { 
                        if (isDeleted) {
                            getCartOrders();
                            getCartTotal()
                            setIsDeleted(false)
                        }
                        if (isAdded) {
                          getCartOrders();
                          getCartTotal()
                          setIsAdded(false)
                      }
                      if (isOrderDeleted) {
                        getCartOrders();
                        getCartTotal()
                        setIsOrderDeleted(false)
                    }
                    getCartOrders()
                    getCartTotal() },[isDeleted, isAdded, isOrderDeleted])
      
    const addItem = async (restaurantId, foodItemId) =>
    {
      const orderRequest =
      {
        quantity : 1,
        customerEmail : "hari@gmail.com",
      }
      try {
              const response = await additemToCart(restaurantId, foodItemId, orderRequest)
              console.log(response.data)
              setIsAdded(true)
      } catch (error) {
              console.log(error)
      }
    }

    const deleteItem = async (restaurantId, foodItemId, order) =>
    {
          if(order.orderQuantity===1 || order.orderQuantity===0)
          {
            deleteOrder(order.orderId)
            return
          }
          const orderRequest =
          {
            quantity : -1,
            customerEmail : "hari@gmail.com",
          }
          try {
                    const response = await deleteitemToCart(restaurantId, foodItemId, orderRequest)
                    console.log(response.data)
                    setIsDeleted(true);
          } catch (error) {
                    console.log(error)
          }
      
    }

    const deleteOrder = async (orderId) =>
    {
          try {
                  const response = await deleteOrderInCart ( userData.id, orderId )
                  console.log(response)
                  setIsOrderDeleted(true)
          } catch (error) {
                  console.log(error)
          }      
    }

    const handleCheckboxChange = (item) => {
      setSelectedOrders((prevSelected) =>
        prevSelected.some((selected) => selected.orderId === item.orderId)
          ? prevSelected.filter((selected) => selected.orderId !== item.orderId)
          : [...prevSelected, item]
      );
      console.log(selectedOrders)
    };
    const totalCost = selectedOrders.reduce((acc, selectedOrder) => acc + selectedOrder.orderTotal, 0);

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" /> Delivery Address
        </h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your delivery address"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Item</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b last:border-b-0"
              >
                <td>
                <div className="flex items-center flex-grow px-5">
                        <input
                          type="checkbox"
                          id={`checkbox-${item.id}`}
                          onChange={() => handleCheckboxChange(item)}
                          className="w-5 h-5"
                        />
                      </div>
                </td>
                <td className="p-4 flex items-center">
                  <img src={item.foodItem.imageURL} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.foodItem.dishName}</h3>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <button
                            onClick={() => { 
                              setRestaurantId(item.restaurantResponse.id)
                              if(item.orderQuantity>-1) deleteItem(restaurantId,item.foodItem.id, item)
                              }}                      
                              className="bg-red-500 text-white p-2 rounded-l hover:bg-red-600 transition duration-200"
                    >
                      <FaMinus />
                    </button>
                    <div className="m-4 bg-white-100">{item.orderQuantity}</div>
                    <button
                      onClick={() => { 
                                        setRestaurantId(item.restaurantResponse.id)
                                        addItem(restaurantId,item.foodItem.id)
                                        }}
                      className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600 transition duration-200"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-2xl">
                <MdOutlineCurrencyRupee className='inline'/>{(item.foodItem.price * item.orderQuantity).toFixed(2)}
                  <button
                    onClick={() => deleteOrder(item.orderId)}
                    className="ml-4 text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow-lg p-6 mt-8"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold flex items-center"><FaIndianRupeeSign className='mt-1'/>{total.toFixed(2)}</span>
        </div>
        <Link to={`/foodiego/delivery/${arrayAsString}`}>
        <button className="relative  w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200">
              <p className='inline p-4'>Proceed to Checkout</p>
              {totalCost>0 && <FaArrowRight className='inline'/> }
              {totalCost>0 && <MdOutlineCurrencyRupee className='inline ml-2 mb-1'/> }
              <p className='inline'> {totalCost>0 && totalCost.toFixed(2) }</p>
        </button>
        </Link>
      </motion.div>

      <div className="mt-8 text-center">
        <Link to='/foodiego/home' className="text-blue-500 hover:underline focus:outline-none text-lg">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Cart;