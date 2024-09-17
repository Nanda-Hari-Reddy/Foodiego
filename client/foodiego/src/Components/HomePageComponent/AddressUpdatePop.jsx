import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { updateDeliveryAddress } from '../api/foodiegoAPI';
import { useMyContext } from '../Security/ContextProvider';

const AddressUpdateForm = ({isOpen, setIsOpen, address, setAddress, getAddresses, setIsAddressDeleted, idToUpdate}) => {
    const context = useMyContext()
    const userData = context.userDetails
  const[isAddressUpdated, setIsAddressUpdated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleAddressUpdate = () => 
    {
      const newAddress = 
      {
        street : address.street,
        area : address.area,
        city : address.city
      }
      updateDeliveryAddress(userData.id, idToUpdate, newAddress)
      .then((response) => {
                            setIsAddressDeleted(true)
                            console.log(response.data)
                          })
      .catch((error) =>console.log(error))
    };

    useEffect(() => {
        if(isAddressUpdated)
        {
            getAddresses()
            setIsAddressUpdated(false)
        }
        getAddresses()
    },[isAddressUpdated])

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Your Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Street</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="street"
                        value={address.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Area</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="text"
                        name="area"
                        id="area"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="area"
                        value={address.area}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="city"
                        value={address.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact No</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="text"
                        name="mobileNo"
                        id="mobileNo"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={address.mobileNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-gray-600 hover:text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                        handleAddressUpdate()
                        setIsOpen(false)
                    }}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressUpdateForm;