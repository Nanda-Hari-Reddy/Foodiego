import React, { useState } from 'react';
import { addUser } from './api/foodiegoAPI';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    imageURL: '',
    gender: '',
    mobileNo: '',
    street: '',
    area: '',
    city: ''
  });
//   {
//     "imageURL": "https://tse3.mm.bing.net/th?id=OIP.Ug0LxLA_x_voC08yfY2LawHaJJ&pid=Api&P=0&h=180",
//     "name": "Q",
//     "email": "q@gmail.com",
//     "password": "WASDskal",
//     "mobileNo": "8908908789",
//     "gender": "MALE",
//     "addressRequest": {
//       "street": "gurijala",
//       "area": "simhadripuram",
//       "city": "pulivendula"
//     }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user =
        {
            imageURL : formData?.imageURL,
            name : formData?.name,
            email : formData?.email,
            password : formData?.password,
            mobileNo : formData?.mobileNo,
            gender : formData?.gender.toUpperCase(),
            addressRequest : {
                street : formData?.street,
                area : formData?.area,
                city : formData?.city
            }
        }
        addUser(user)
        .then(( response ) => console.log(response))
        .catch(( error ) => console.log(error))
        console.log(formData.imageURL+" form data");
    };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">User Registration</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Street */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="street">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Area */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="area">
            Area
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
