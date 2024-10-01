import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import AddFoodItemToMenu from "./AddFoodItemToMenu";

const MyRestaurant = () => {
  
  const [restaurant, setRestaurant] = useState({
    name: "Gourmet Delights",
    address: "123 Culinary Lane, Foodville, FC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@gourmetdelights.com",
    hours: "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM",
    description: "Experience fine dining with a modern twist at Gourmet Delights."
  });
    const [isOpen, setIsOpen] = useState(false);
    const [menu, setMenu] = useState([
    {
      id: 1,
      category: "Appetizers",
      items: [
        { id: 101, name: "Bruschetta", price: 8.99, description: "Toasted bread topped with fresh tomatoes, garlic, and basil", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f", available: true },
        { id: 102, name: "Calamari", price: 10.99, description: "Crispy fried squid rings served with marinara sauce", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0", available: true }
      ]
    },
    {
      id: 2,
      category: "Main Courses",
      items: [
        { id: 201, name: "Grilled Salmon", price: 22.99, description: "Fresh Atlantic salmon with lemon butter sauce", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2", available: true },
        { id: 202, name: "Beef Tenderloin", price: 28.99, description: "8oz beef tenderloin with red wine reduction", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976", available: true }
      ]
    },
    {
      id: 3,
      category: "Desserts",
      items: [
        { id: 301, name: "Tiramisu", price: 7.99, description: "Classic Italian dessert with coffee-soaked ladyfingers", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", available: true },
        { id: 302, name: "Chocolate Fondant", price: 8.99, description: "Warm chocolate cake with a molten center", image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3", available: true }
      ]
    }
  ]);

  const [editing, setEditing] = useState(null);
  const [newItem, setNewItem] = useState(null);

  const handleRestaurantEdit = (field, value) => {
    setRestaurant({ ...restaurant, [field]: value });
  };

  const handleMenuItemEdit = (categoryId, itemId, field, value) => {
    const updatedMenu = menu.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => {
          if (item.id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setMenu(updatedMenu);
  };

  const handleAddItem = (categoryId) => {
    setNewItem({ categoryId, name: "", price: 0, description: "", image: "", available: true });
  };

  const handleSaveNewItem = () => {
    if (newItem) {
      const updatedMenu = menu.map(category => {
        if (category.id === newItem.categoryId) {
          const newId = Math.max(...category.items.map(item => item.id)) + 1;
          return {
            ...category,
            items: [...category.items, { ...newItem, id: newId }]
          };
        }
        return category;
      });
      setMenu(updatedMenu);
      setNewItem(null);
    }
  };

  const handleDeleteItem = (categoryId, itemId) => {
    const updatedMenu = menu.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        };
      }
      return category;
    });
    setMenu(updatedMenu);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Restaurant Profile</h1>
      <div>
        <img src="https://b.zmtcdn.com/data/pictures/2/51232/e811eb8ee82e2c14447b04450a5e4334.jpg" className="w-full h-64 object-cover" alt="name" />
      </div>
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Restaurant Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={restaurant.name}
              onChange={(e) => handleRestaurantEdit("name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={restaurant.address}
              onChange={(e) => handleRestaurantEdit("address", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={restaurant.phone}
              onChange={(e) => handleRestaurantEdit("phone", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={restaurant.email}
              onChange={(e) => handleRestaurantEdit("email", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Business Hours</label>
            <input
              type="text"
              value={restaurant.hours}
              onChange={(e) => handleRestaurantEdit("hours", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={restaurant.description}
              onChange={(e) => handleRestaurantEdit("description", e.target.value)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
        </div>
      </section>
        <AddFoodItemToMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <section>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
                onClick={() => setIsOpen(true)}
            >
                <FaPlus className="mr-2" /> Add Food Item
            </motion.button>
      </section>
      {/* Menu Details Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        {menu.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 relative">
                  {editing === item.id ? (
                    <div>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleMenuItemEdit(category.id, item.id, "name", e.target.value)}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleMenuItemEdit(category.id, item.id, "price", parseFloat(e.target.value))}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => handleMenuItemEdit(category.id, item.id, "description", e.target.value)}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="2"
                      ></textarea>
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => handleMenuItemEdit(category.id, item.id, "image", e.target.value)}
                        className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Image URL"
                      />
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.available}
                          onChange={(e) => handleMenuItemEdit(category.id, item.id, "available", e.target.checked)}
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-600">Available</span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => setEditing(null)}
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
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-2" />
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-indigo-600 font-semibold mt-2">${item.price.toFixed(2)}</p>
                      <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                        {item.available ? 'Available' : 'Not Available'}
                      </p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => setEditing(item.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                        >
                          <FaEdit className="inline-block mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(category.id, item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                        >
                          <FaTrash className="inline-block mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAddItem(category.id)}
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              <FaPlus className="inline-block mr-1" /> Add Item
            </button>
          </div>
        ))}
        {newItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Item</h3>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Item Name"
                className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                placeholder="Price"
                className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Description"
                className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              ></textarea>
              <input
                type="text"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                placeholder="Image URL"
                className="mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Available</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNewItem}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mr-2"
                >
                  <FaSave className="inline-block mr-1" /> Save
                </button>
                <button
                  onClick={() => setNewItem(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  <FaTimes className="inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyRestaurant;