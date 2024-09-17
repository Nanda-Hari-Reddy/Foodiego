import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaCreditCard, FaPaypal, FaArrowRight } from 'react-icons/fa';
import { SiPhonepe, SiGooglepay } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyContext } from './Security/ContextProvider';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { placeOrder } from './api/foodiegoAPI';

const PaymentOptions = () => {
    const { arrayString } = useParams()
    const context = useMyContext()
    const navigate = useNavigate()
    const userData = context.userDetails
    const [selectedMethod, setSelectedMethod] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+91 '+userData.mobileNo);
    const [error, setError] = useState('');
    const[isOrderCompleted, setIsOrderCompleted] = useState(false)
    const addressAndOrders = JSON.parse(decodeURIComponent(arrayString))
    const addressAndOrdersPhone =
    {
        address: addressAndOrders.address,
        orders:addressAndOrders.orders,
        phone:phoneNumber,
        paymentMode : selectedMethod
    }
    
    const totalAmount = addressAndOrders.orders.reduce((total, order)=> total+order.orderTotal, 0)
    const ArrayAsString = encodeURIComponent(JSON.stringify(addressAndOrdersPhone))
    const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: FaMoneyBillWave },
    { id: 'phonepay', name: 'PhonePay', icon: SiPhonepe },
    { id: 'googlepay', name: 'Google Pay', icon: SiGooglepay },
    { id: 'credit card', name: 'Credit Card', icon: FaCreditCard },
    { id: 'debit card', name: 'Debit Card', icon: FaCreditCard },
    { id: 'paypal', name: 'PayPal', icon: FaPaypal },
    
  ];
  // useEffect(()=>{console.log(addressAndOrders.orders)},[])

  const handleMethodSelect = (id) => {
    setSelectedMethod(id);
    setError('');
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    setError('');
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }
    setIsOrderCompleted(true)
    addAllOrdersToDelivery()
    navigate(`/foodiego/delivery/payment/order_details/${ArrayAsString}`)
  };

    const addOrderToDelivery = async (orderId) =>
    {
        console.log(addressAndOrdersPhone.orders.length+"LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        try {
                const response = await placeOrder(orderId)
                console.log(`added order ${orderId}:`, response);
                return response
            }
        catch (error) {
                console.log(error)
                throw error
             }
    }

    const addAllOrdersToDelivery = async () =>
    {   
        try {
                await Promise.all(
                    addressAndOrdersPhone.orders.map((order) => addOrderToDelivery(order.orderId))
                )
        }
        catch(error){
                console.log(error)
        }
    }

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
        
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="mb-6">
          <label htmlFor="phone" className="block text-bold font-medium text-gray-700 mb-2">
            Change Contact Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>

        <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`flex items-center justify-center p-4 border rounded-lg transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Select ${method.name}`}
            >
              <method.icon className="text-2xl mr-2" />
              <span>{method.name}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors duration-200"
        >
            <p className='inline p-4'>Pay Now</p>
              <FaArrowRight className='inline'/>
              <MdOutlineCurrencyRupee className='inline ml-2 mb-1'/>
              <p className='inline'> {totalAmount.toFixed(2) }</p>
        </button>
      </div>
    </div>
  );
};
export default PaymentOptions;

// const deleteOrder = async (orderId) => {
//   try {
//     const response = await deleteOrderInCart(userData.id, orderId);
//     console.log(`Deleted order ${orderId}:`, response);
//     return response;
//   } catch (error) {
//     console.error(`Error deleting order ${orderId}:`, error);
//     throw error;
//   }
// };

// const deleteOrders = async () => {
//   try {
//       await Promise.all(
//         addressAndOrders.orders.map((order) => deleteOrder(order.orderId))
//     );
//     setIsOrderCompleted(false);
//   } catch (error) {
//     console.error('Error deleting multiple orders:', error);
//   }
// };

// useEffect(() => {
// if (isOrderCompleted) {
//   deleteOrders();
// }
// }, [isOrderCompleted]);