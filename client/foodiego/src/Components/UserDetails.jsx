import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "./Security/ContextProvider";
import { retrieveUser, updateUser, updateuserProfilePic } from "./api/foodiegoAPI";

const UserDetails = () => {
  const context = useMyContext()
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenForImageChange, setIsOpenForImageChange] = useState(false)

  const getUser = () =>
  { 
    retrieveUser(context.userDetails.email)
    .then((response) => 
                        {
                            console.log(response)
                            setUser(response.data)
                        })
    .catch((error) => console.log(error))
  }

  useEffect(() => getUser(), [])

  useEffect(() => {
    validateForm();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  var count  = 0
  const validateForm = () => {
    let errors = {};
    if (!user?.name.trim()) errors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(user?.email)) errors.email = "Invalid email format";
    if (!/^\+?[1-9]\d{1,14}$/.test(user?.mobileNo)) errors.mobileNo = "Invalid phone number";
    if (!user?.gender.trim()) errors.gender = "gender is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const togglePopUp = () =>
  {
    setIsOpenForImageChange(!isOpenForImageChange)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsEditing(false);
      const usr = {
        imageURL: user?.imageURL,
        name: user?.name,
        email: user?.email,
        password: user?.password,
        mobileNo: user?.mobileNo,
        gender: user?.gender,
        addressRequest: {
          street: "",
          area: "",
          city: ""
      }}
      updateUser(context.userDetails.id, usr)
      .then(( response ) => console.log(response))
      .catch( (error) => console.log(error))
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Please correct the errors before submitting.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
      <div className="flex flex-col md:flex-column items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
        <button>
          { isOpenForImageChange && <PopupForProfileImageChange handleClose={togglePopUp} user = {user} setUser={setUser} setIsOpenForImageChange= {setIsOpenForImageChange} /> }
          <img
            src={user?.imageURL}
            alt="User Avatar"
            onClick={ togglePopUp }
            className="w-full h-full object-cover"
          />
          </button>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <FaUser className="inline mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user?.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  <FaEnvelope className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user?.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  <FaPhone className="inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  value={user?.mobileNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  aria-invalid={errors.mobileNo ? "true" : "false"}
                  aria-describedby="phone-error"
                />
                {errors.mobileNo && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.mobileNo}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={user?.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  aria-invalid={errors.gender ? "true" : "false"}
                  aria-describedby="gender-error"
                />
                {errors.gender && (
                  <p id="address-error" className="mt-1 text-sm text-red-600">
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">My Address</h1>
              { 
                user?.addressResponse?.map( (item ) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg  relative flex flex-row justify-start space-x-4">
                    {/* <h1>street : {item.street}</h1> */}
                    <p className="font-bold">{++count}</p>
                    <label htmlFor="street" className="font-bold ">Street</label>
                    <input type="text" name="street" id="street" value={item.street} />
                    <label htmlFor="area" className="font-bold">area</label>
                    <input type="text" name="area" id="area" value={item.area} />
                    <label htmlFor="city" className="font-bold">city</label>
                    <input type="text" name="city" id="city" value={item.city} />
                    {/* <h1>area : {item.area}</h1> */}
                    {/* <h1>city : {item.city}</h1> */}
                  </div>
                ))}
            <div className="flex justify-center space-x-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
export const PopupForProfileImageChange = ({ setIsOpenForImageChange, user, setUser }) =>
  {
        const handleChange = (value) =>
        {
          setUser({ ...user, imageURL : value });
        }
        const handleClose = () =>
          {
              updateuserProfilePic(user?.id, user?.imageURL)
              .then( (response) => 
                                    {
                                      console.log(user?.imageURL) 
                                      console.log(response) 
                                      setIsOpenForImageChange(false)
                                    })
              .catch( (error) => 
                                    {
                                      console.log(error) 
                                      setIsOpenForImageChange(false)
                                    })
          }
      return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full ">
            <h2 className="text-xl font-bold m-5">Change Profile Picture</h2>
            <input type="text" 
                  value={user?.imageURL}
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
