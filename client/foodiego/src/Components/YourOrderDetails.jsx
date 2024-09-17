import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTruck, FaUser, FaPhone, FaExclamationTriangle, FaRupeeSign, FaAddressBook, FaHome } from 'react-icons/fa';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOrderInCart, getDeliveriesForUser, placeOrder } from './api/foodiegoAPI';
import { useMyContext } from './Security/ContextProvider';

const OrderDetails = () => {
  const { selectedMethod } = useParams()
  const context = useMyContext()
  const userData = context.userDetails
  const { arrayString } = useParams()
  const addressAndOrdersPhone = JSON.parse(decodeURIComponent(arrayString))
  const[deliveries, setDelivries] = useState([])
  const[delivered, setDelivered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0.2 * 60);
  const navigate = useNavigate();
  useEffect(() => {
    // Only run if there is time left
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); // Run every second

      // Clean up the interval on component unmount or when timeLeft is 0
      return () => clearInterval(timerInterval);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => { console.log(addressAndOrdersPhone.orders.length+"**************************************") }, []);

        const getDeliveriesToUser = async () =>
        {
            try{
                const response = await getDeliveriesForUser(userData.email)
                console.log(response.data)
                setDelivries(response.data)
                return response
            }
            catch(error) {
                console.log(error)
                throw error
            }
        }

        const deleteOrder = async (orderId) => {
            try {
            const response = await deleteOrderInCart(userData.id, orderId);
            console.log(`Deleted order ${orderId}:`, response);
            return response;
            } catch (error) {
            console.error(`Error deleting order ${orderId}:`, error);
            throw error;
            }
        };
        
        const deleteOrders = async () => {
            console.log("%%^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*()"+deliveries)
            try {
                await Promise.all(
                addressAndOrdersPhone.orders.map((order) => deleteOrder(order.orderId))
            );
            } catch (error) {
            console.error('Error deleting multiple orders:', error);
            }
        };
        
        useEffect(() => {
                            if (timeLeft===0) {
                                deleteOrders();
                                setDelivered(true)
                                getDeliveriesToUser()
                            }
        }, [timeLeft]);

        useEffect(() => { 
                            // addAllOrdersToDelivery()
                            getDeliveriesToUser()
                        }, []);
        useEffect(() => {
                            getDeliveriesToUser()
                        }, []);

            useEffect(() => {
                const handlePopState = (event) => {
                    event.preventDefault();
                    navigate('/'); // Redirect to the home page or any other page you want to direct to
                };
            
                window.addEventListener('popstate', handlePopState);
            
                return () => {
                    window.removeEventListener('popstate', handlePopState);
                };
                }, [navigate]);

        const totalPrice = addressAndOrdersPhone.orders.reduce( (total, order) => total + order.orderTotal, 0)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg m-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>

                <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center cursor-pointer" >
                    <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
                    </div>
                    <div className="mt-4 space-y-2">
                         <p><strong>Order Number: </strong> ORD-L112DN{addressAndOrdersPhone.orders[0].orderId}</p>
                        <p><strong>Total Amount:</strong> <LiaRupeeSignSolid className='inline mb-1'/>{totalPrice.toFixed(2)}</p>
                        <p><strong>Payment Method:</strong> {addressAndOrdersPhone.paymentMode}</p> 
                        <h3 className="font-semibold mt-4">Items:</h3>
                        <ul className="list-disc list-inside">
                        {addressAndOrdersPhone.orders.map((order, index) => (
                             <li key={index}>{order.foodItem.dishName} - Quantity: {order.orderQuantity} - <LiaRupeeSignSolid className='inline mb-1'/>{order.orderTotal.toFixed(2)}</li>
                        ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deliveries</h2>
                    {deliveries.map((delivery) => (
                    <div key={delivery.id} className="bg-gray-100 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center cursor-pointer" >
                         <h3 className="text-lg font-semibold text-gray-700">   Delivery   DLRY- AF2Q4{delivery.deliveryId}</h3>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 space-x-6">
                            <div>
                            <p className="flex items-center "><FaUser className="mr-2 text-blue-500" /> <strong>Delivery Person   :   </strong> { delivery.deliveryPersonResponse.name}</p>
                            <p className="flex items-center mt-2"><FaPhone className="mr-2 text-red-500" /> <strong>Contact      :   </strong> {delivery.deliveryPersonResponse.phoneNo}</p>
                            <p className="flex items-center mt-2"><FaRupeeSign className="mr-2 text-green-500" /> <strong> Pay    :   </strong>  {delivery.cost} rupees</p>
                            <p className="flex items-center mt-2"><FaHome className="mr-2 text-grey-500" /> <strong> Address:</strong> {addressAndOrdersPhone.address.street}, {addressAndOrdersPhone.address.area}, {addressAndOrdersPhone.address.city} </p>
                            </div>
                            <div>
                            <p><strong>Ordered Time:</strong> { delivery.createdAt }</p>
                            <p><strong className='text-green-700'>Estimated Delivery:  {formatTime(timeLeft)}</strong> </p>
                            
                            <p><strong>Items:</strong> <img src={delivery.orderResponse.foodItem.imageURL} alt={delivery.orderResponse.foodItem.dishName} className="w-16 h-16 object-cover rounded mr-4" />
                            {delivery.orderResponse.foodItem.dishName}</p>
                            </div>
                        </div>
                        { delivered && <h3 className='font-bold text-green-700'>Delivered</h3>}
                        
                    </div>
                    ))}
                    <Link to="/foodiego/home"><div className='bg-green-400 rounded-full p-3 font-bold text-xl mt-10 text-center hover:shadow-md'><p>Back To Home</p></div></Link>
                </div>
                
    </div>
  );
};

export default OrderDetails;

{/* <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                    <div className="flex items-center">
                    <FaExclamationTriangle className="mr-2" />
                    <p className="font-bold">Important Note</p>
                    </div>
                    <p className="mt-2">If you encounter any issues with your order or delivery, please contact our customer support at 1-800-123-4567 or support@example.com.</p>
                </div> */}

