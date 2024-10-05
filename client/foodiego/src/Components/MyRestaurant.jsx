import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import AddFoodItemToMenu from "./AddFoodItemToMenu";
import { deleteFoodItem, retrieveRestaurantForAdmin, updateItem, updateRestaurant, updateRestaurantImage } from "./api/foodiegoAPI";
import { useMyContext } from "./Security/ContextProvider";

const MyRestaurant = () => {
  
    const context = useMyContext()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForImage, setIsOpenForImage] = useState(false);
    const[menu, setMenu] = useState()
    const togglePopUp = () =>
    {
      setIsOpenForImage(!isOpenForImage)
    }
    const [isUpdated, setIsUpdated] = useState(false);
    const [isMenuUpdated, setIsMenuUpdated] = useState(false);
    const [editing, setEditing] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [restaurantSaved, setRestaurantSaved] = useState(null)
    const getRestaurantForAdmin = () =>
    {
          retrieveRestaurantForAdmin(context.admin)
          .then((response) => 
                      {
                          setRestaurantSaved(response.data)
                          setMenu(response.data?.menuResponse?.foodItemsList)
                          console.log(response.data.id)
                          console.log(restaurantSaved+" saved")
                      })
          .catch((error) => console.log(error))
    }
    useEffect(() => { getRestaurantForAdmin()}, [])
    useEffect(() => { 
                        getRestaurantForAdmin()
                        console.log(restaurantSaved?.menuResponse?.foodItemsList[0].dishName+" after menu updated")
                        setIsMenuUpdated(false)
                        }, [isMenuUpdated])
    
    const updateTheRestaurant = () =>
    {
        const restaurant ={
          imageURL : restaurantSaved?.imageURL,
          restaurantName : restaurantSaved?.restaurantName,
          location : restaurantSaved?.location,
          restaurantCategory : restaurantSaved?.restaurantCategory,
          contactNumber : restaurantSaved?.contactNumber,
          opens : restaurantSaved?.opens,
          closes : restaurantSaved?.closes,
          adminUserName : restaurantSaved?.adminUserName,
          password : restaurantSaved?.adminPassword
        }
        console.log(restaurantSaved.adminUserName+" before updating")
        updateRestaurant(restaurantSaved.id, restaurant)
        .then((response) => {
                                console.log(response)
                                setIsUpdated(true)
                            })
        .catch((error) => console.log(error))
    }
    const handleRestaurantEdit = (field, value) => {
      setRestaurantSaved({ ...restaurantSaved, [field]: value });
    };

    const handleMenuItemEdit = (itemId, field, value) => 
    {
      const updatedMenu = menu?.map(item => {
        if (item.id === itemId) {
          // Return a new object with the updated field and value
                    return {
            ...item,         // Spread the existing properties of the item
            [field]: value  
             // Dynamically update the specified field with the new value
             
          };
        }
        return item;
        // Return other items unchanged
      });
    
      // Update the state with the new array
      setMenu(updatedMenu);
    };

    const saveUpdatedFoodItem = (itemId) =>
    {
        menu?.map(item => {
          if (item.id === itemId) {

            const map = {
              dishName : item.dishName,
              price : item.price,
              imageURL : item.imageURL
            }

            updateItem(restaurantSaved.id, item.id, map)
            .then(( response) => console.log(response))
            .catch(( error ) => console.log(error)) 
          }
        })
    }
  const handleAddItem = (categoryId) => {
    // setNewItem({ categoryId, name: "", price: 0, description: "", image: "", available: true });
  };

  const handleSaveNewItem = () => {
    // if (newItem) {
    //   const updatedMenu = menu.map(category => {
    //     if (category.id === newItem.categoryId) {
    //       const newId = Math.max(...category.items.map(item => item.id)) + 1;
    //       return {
    //         ...category,
    //         items: [...category.items, { ...newItem, id: newId }]
    //       };
    //     }
    //     return category;
    //   });
    //   setMenu(updatedMenu);
    //   setNewItem(null);
    // }
  };

  const handleDeleteItem = (itemId) => 
  {
      deleteFoodItem(restaurantSaved.id, itemId)
      .then((response) => 
                            {
                              console.log(response)
                              setIsMenuUpdated(true)
                            })
      .catch((error) => console.log(error))
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Restaurant Profile</h1>
      <button className="block w-full" >
        <div onClick={togglePopUp}><img src={restaurantSaved?.imageURL} className="w-full h-96 object-cover hover:opacity-50" alt="" /></div>
        { isOpenForImage && <PopupForImageChange handleClose={togglePopUp} setIsOpenForImage={setIsOpenForImage} restaurantSaved= {restaurantSaved} setRestaurantSaved={setRestaurantSaved} />}
      </button>
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Restaurant Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
               value={restaurantSaved?.restaurantName}
              onChange={(e) => handleRestaurantEdit("restaurantName", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={restaurantSaved?.location}
              onChange={(e) => handleRestaurantEdit("location", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={restaurantSaved?.adminUserName}
              onChange={(e) => handleRestaurantEdit("adminUserName", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="text"
              value={restaurantSaved?.adminPassword}
              onChange={(e) => handleRestaurantEdit("adminPassword", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={restaurantSaved?.contactNumber}
              onChange={(e) => handleRestaurantEdit("contactNumber", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Category</label>
            <input
              type="text"
              value={restaurantSaved?.restaurantCategory}
              onChange={(e) => handleRestaurantEdit("restaurantCategory", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opens</label>
            <input
              type="time"
              value={restaurantSaved?.opens}
              onChange={(e) => handleRestaurantEdit("opens", e.target.value)}
              className="mt-1 block w-half rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Closes</label>
            <input
              type="time"
              value={restaurantSaved?.closes}
              onChange={(e) => handleRestaurantEdit("closes", e.target.value)}
              className="mt-1 block w-half rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" mt-4 bg-green-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center"
                onClick={() => updateTheRestaurant()}
            >
                Update Changes
            </motion.button>
            { isUpdated && <h3>Details Updated Successfully</h3> }
      </section>

      {/* Menu Details Section */}
      <h2 className="text-2xl font-semibold pl-6 mb-4"> Menu </h2> 
      <section className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu?.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 relative">
                  {editing === item.id ? (
                    <div>
                      <input
                        type="text"
                        value={item.dishName}
                        onChange={(e) => handleMenuItemEdit(item.id, "dishName", e.target.value)}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleMenuItemEdit(item.id, "price", parseFloat(e.target.value))}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <input
                        type="text"
                        value={item.imageURL}
                        onChange={(e) => handleMenuItemEdit(item.id, "imageURL", e.target.value)}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Image URL"
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => {
                                            setEditing(null)
                                            saveUpdatedFoodItem(item.id)
                                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mr-2"
                        >
                          <FaSave className="inline-block mr-1" /> Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                        >
                          <FaTimes className="inline-block mr-1" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover rounded-md mb-2" />
                      <h4 className="text-lg font-semibold">{item.dishName}</h4>
                      <p className="text-indigo-600 font-semibold mt-2">{item.price.toFixed(2)}</p>
                      <p className="text-indigo-600 font-semibold mt-2">{item.foodCategory}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => setEditing(item.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                        >
                          <FaEdit className="inline-block mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                        >
                          <FaTrash className="inline-block mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
      </section>
      <AddFoodItemToMenu isOpen={isOpen} setIsOpen={setIsOpen} restaurantId = {restaurantSaved?.id}  setIsMenuUpdated={setIsMenuUpdated} />
        <section className="flex justify-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center"
                onClick={() => setIsOpen(true)}
            >
                <FaPlus className="mr-2" /> Add Food Item
            </motion.button>
      </section>
    </div>
  );
};
export default MyRestaurant;

export const PopupForImageChange = ({ setIsOpenForImage, restaurantSaved, setRestaurantSaved }) =>
{
      const handleChange = (value) =>
      {
        setRestaurantSaved({ ...restaurantSaved, imageURL : value });
      }
      const handleClose = () =>
      {
          updateRestaurantImage(restaurantSaved.id, restaurantSaved?.imageURL)
          .then( (response) => 
                                {
                                  console.log(response) 
                                  setIsOpenForImage(false)
                                })
          .catch( (error) => console.log(error) )
      }
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full ">
          <h2 className="text-xl font-bold m-5">Change Profile Picture</h2>
          <input type="text" 
                value={restaurantSaved?.imageURL}
                onChange={(e) => handleChange(e.target.value)}
                className="mb-4 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Image URL"
          
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={handleClose}> OK </button>
        </div>
      </div>
    );
};