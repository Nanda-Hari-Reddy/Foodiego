import { apiClient } from './BaseURL'

export const retrieveUser = (email) => apiClient.get(`/user/getUser`,{ params : { email } })
export  const retrieveDataForHomePage = () => apiClient.get(`/home`)
export const retrieveRestaurant = (restaurantId) => apiClient.get(`/restaurants/${ restaurantId }`)
export const retrieveMostOrdersForRestaurant = (rsntId) => apiClient.get(`/restaurants/${rsntId}/mostOrders`)
export const retrieveMenu = (restaurantId) => apiClient.get(`/restaurants/${restaurantId}/menu`)
export const additemToCart = (restaurantId, index, orderRequest) => apiClient.post(`/restaurants/${restaurantId}/menu/${index}`, orderRequest)
export const deleteitemToCart = (restaurantId, index, orderRequest) => apiClient.post(`/restaurants/${restaurantId}/menu/${index}`, orderRequest)
export const retrieveCart = (userId) => apiClient.get(`/user/${userId}/cart`)
export const deleteOrderInCart = ( userId,orderId ) => apiClient.delete(`/user/${userId}/cart/${orderId}`)
export const retrieveAllAddress = (userId) => apiClient.get(`/user/${userId}/address`)
export const deleteDeliveryAddress = (userId, addressId) => apiClient.delete(`/user/${userId}/address`, { params : {addressId}} )
export const addNewAddress = (userId, address) => apiClient.post(`/user/${userId}/address`, address)
export const updateDeliveryAddress = (userId, addressId, address) => apiClient.put(`/user/${userId}/address/${addressId}`, address)
export const placeOrder = (orderId) => apiClient.post(`/placeOrder`, null, { params: { orderId } });
export const getDeliveriesForUser = (email) => apiClient.get(`/getDeliveries`, { params :  { email }})
export const idOrderThere = (userId, orderId) => apiClient.head(`/user/${userId}/cart/${orderId}`)
export const retrieveCartTotal = (userId) => apiClient.get(`/user/${userId}/cart/cartTotal`)
export const addRestaurant = (restaurant) => apiClient.post(`/restaurants`, restaurant)
export const retrieveRestaurantForAdmin  = (adminUserName) => apiClient.get(`/restaurants/restaurantforadmin/${adminUserName}`)
export const updateRestaurant = (restaurantId, restaurant) => apiClient.put(`/restaurants/${restaurantId}`, restaurant)
export const updateRestaurantImage = (restaurantId, imageURL) => apiClient.patch(`/restaurants/${restaurantId}`, { params : { imageURL }} )
export const addFoodItemToMenu = (foodItem, restaurantId) => apiClient.post(`/restaurants/${restaurantId}/menu`, foodItem)
export const deleteFoodItem = (restaurantId, foodItemId) => apiClient.delete(`/restaurants/${restaurantId}/menu/${foodItemId}`)
export const updateItem = (restaurantId, foodItemId, updates) => apiClient.patch(`/restaurants/${restaurantId}/menu/${foodItemId}`, updates)
export const validateRestaurantAdmin = (adminRequest) => apiClient.head(`/restaurants/resaurantadmin`, {
    headers : 
                { restaurantAdmin : JSON.stringify(adminRequest) }
})

