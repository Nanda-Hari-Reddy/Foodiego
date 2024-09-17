import React, { useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMyContext } from './Security/ContextProvider';
import { addNewAddress, deleteDeliveryAddress, idOrderThere, retrieveAllAddress } from './api/foodiegoAPI';
import AddressUpdateForm from './HomePageComponent/AddressUpdatePop';

const Delivery = () => {
  const navigate = useNavigate()
  const { arrayString } = useParams();
  const context = useMyContext()
  const userData = context.userDetails
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState({
                                              street: '',
                                              area: '',
                                              city: ''
                                          });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const orderDetails = JSON.parse(decodeURIComponent(arrayString));
  const accumulate = {
        address:selectedAddress,
        orders:orderDetails
  }
  
  const arrayAsString = encodeURIComponent(JSON.stringify(accumulate));
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef(null);
  const[isAddressDeleted, setIsAddressDeleted] = useState(false)
  const [isAddressAdded, setIsAddressAdded] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const[idToUpdate, setIdToUpdate] = useState(0)
  const[ordersNotCought, setOrdersNotCought] = useState(false)
  const totalAmount = orderDetails.reduce((total, order) => total + order.orderTotal  , 0);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
    const handleAddressSelect = (address) => {
      setSelectedAddress(address);
    };

    const getAddresses = async () =>
    {
        try {
                const response = await retrieveAllAddress(userData.id)
                console.log(response)
                setAddresses(response.data._embedded.deliveryAddressResponseList)

        } catch (error) {
                console.log(error)
        }
    }

    const addAddress = async (event) =>
    {
          event.preventDefault();
          const newAddress = 
          {
            street : address.street,
            area : address.area,
            city : address.city
          }
          try {
                    const response = await addNewAddress(userData.id, newAddress)
                    console.log(response)
                    setIsAddressAdded(true)
          } catch (error) {
                    console.log(error)
          }
    }

    const handleAddressDelete = async (id) => 
    {
        try {
                const response = await deleteDeliveryAddress(userData.id, id)
                setIsAddressDeleted(true)
                console.log(response.data)
        } catch (error) {
                console.log(error)
        }
    };
  
  useEffect(() => { 
                    if(isAddressAdded)
                    {
                        getAddresses()
                        setIsAddressAdded(false)
                    }
                    if(isAddressDeleted)
                    {
                        getAddresses()
                        setIsAddressDeleted(false)
                    }
                    getAddresses()
  },[isAddressDeleted, isAddressAdded])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isExpanded]);

  const ordersthere = async () =>
    {
        try {
              const response = await idOrderThere( userData.id, orderDetails[0].orderId)
              if(response.status === 200)
              {
                setOrdersNotCought(false)
                console.log(response.status +"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
              }
              else
              {
                console.log(response.status +"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                setOrdersNotCought(true)
              }
        } catch (error) {
            setOrdersNotCought(true)
            console.log(error)
        }
        
    }
    const proceedToPayment = () =>
    {
      if(!ordersNotCought)
        {
          navigate(`/foodiego/delivery/payment/${arrayAsString}`)
        }
    }



    useEffect(() => {
      ordersthere()
    }, []);

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Delivery Details</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <AddressUpdateForm  isOpen ={isOpen} setIsOpen = {setIsOpen} address = {address} setAddress = {setAddress} isAddressDeleted = {isAddressDeleted} setIsAddressDeleted = {setIsAddressDeleted} getAddresses={getAddresses} idToUpdate={idToUpdate}/>
          <h2 className="text-2xl font-semibold mb-4">Choose Delivery Address</h2>
          {addresses.slice(0, 3).map((address) => (
            <div key={address.id} className={`border p-4 rounded-lg mb-4 cursor-pointer transition-colors duration-300 ${selectedAddress && selectedAddress.id === address.id ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`} onClick={() => {setSelectedAddress(address)
                                                                                                                                                                                                                                                      console.log(accumulate)}
                                                                                                                                                                                                                                                      }>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{address.street}</h3>
                <div>
                  <button onClick={() => { 
                                            setIdToUpdate(address.id)
                                            setIsOpen(true)
                                          }} className="text-blue-500 mr-2" aria-label="Edit address">
                    <FaEdit />
                  </button>
                  <button className="text-red-500" onClick={() => handleAddressDelete(address.id)} aria-label="Delete address">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p>{address.area}</p>
              <p>{address.city}</p>
            </div>
          ))}
          <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight }}
          aria-hidden={!isExpanded}
        >
          <ul className="space-y-2 mt-2">
            {addresses.slice(3).map((address) => (
              <div key={address.id} className={`border p-4 rounded-lg mb-4 cursor-pointer transition-colors duration-300 ${selectedAddress && selectedAddress.id === address.id ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`} onClick={() => {setSelectedAddress(address)}}>
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-semibold">{address.street}</h3>
                <div>
                   <button onClick={() => { 
                                            setIdToUpdate(address.id)
                                            setIsOpen(true)
                                          }} className="text-blue-500 mr-2" aria-label="Edit address">
                    <FaEdit />
                  </button>
                  <button className="text-red-500" onClick={() => handleAddressDelete(address.id)} aria-label="Delete address">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p>{address.area}</p>
              <p>{address.city}</p>
              
            </div>
            ))}
          </ul>
        </div>
          <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-controls="collapsible-content"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Show Less</span>
              <FaChevronUp />
            </>
          ) : (
            <>
              <span className="mr-2">Show More</span>
              <FaChevronDown />
            </>
          )}
        </button>
          <form onSubmit={addAddress} className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                value={address.area}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              <FaPlus className="inline mr-2" /> Add Address
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            {orderDetails.map((order) => (
              <div key={order.orderId} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">{order.foodItem.dishName}</h3>
                  <p className="text-sm text-gray-600">Quantity: {order.orderQuantity}</p>
                </div>
                <p className="font-semibold">${(order.foodItem.price * order.orderQuantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Total</h3>
                <p className="text-xl font-semibold">${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        {ordersNotCought && <div className='text-red-600 font-bold'>Selected Orders Not available in your Cart please check your cart</div>}
            <button
            onClick={ () =>proceedToPayment() }
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={!selectedAddress}
            >
              Place Order
            </button>
      </div>
    </div>
  );
};
export default Delivery;