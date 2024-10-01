package com.Nanda.Food_Delivery.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.Nanda.Food_Delivery.Model.Order_Entity;
import com.Nanda.Food_Delivery.Model.Restaurant;
import com.Nanda.Food_Delivery.Model.RestaurantAdmin;
import com.Nanda.Food_Delivery.Repository.OrderRepository;
import com.Nanda.Food_Delivery.Repository.RestaurantAdminRepository;
import com.Nanda.Food_Delivery.Repository.RestaurantRepository;
import com.Nanda.Food_Delivery.Transformer.FoodItemTransformer;
import com.Nanda.Food_Delivery.Transformer.RestaurantTransformer;
import com.Nanda.Food_Delivery.dtoRequests.RestaurantRequest;
import com.Nanda.Food_Delivery.dtoResponse.FoodResponse;
import com.Nanda.Food_Delivery.dtoResponse.RestaurantResponse;
import com.Nanda.Food_Delivery.exception.RestaurantAdminNotFoundException;
import com.Nanda.Food_Delivery.exception.RestaurantNotFoundException;

@Service
public class RestaurantService
{
	RestaurantRepository restaurantRepository;
	OrderRepository orderRepository;
	CartService cartService;
	RestaurantAdminRepository adminRepository;
	public RestaurantService(RestaurantRepository restaurantRepository, CartService cartService, OrderRepository orderRepository, RestaurantAdminRepository adminRepository) 
	{
		this.restaurantRepository = restaurantRepository;
		this.cartService = cartService;
		this.orderRepository = orderRepository;
		this.adminRepository = adminRepository;
	}

	public RestaurantResponse addRestaurant(RestaurantRequest restaurantRequest)
	{
		
		 RestaurantAdmin admin = RestaurantAdmin.builder()
				 		   .userName(restaurantRequest.getAdminUserName())
				 		   .password(restaurantRequest.getPassword())
				 		   .build();
		 
		 Restaurant restaurant =  RestaurantTransformer
				 				  .requestToEntity(restaurantRequest, admin);
		 Restaurant saved = restaurantRepository.save(restaurant);
		 admin.setRestaurant(restaurant);
		 adminRepository.save(admin);
		 return getRestautantById(saved.getId());
	}

	public List<RestaurantResponse> retrieveallRestaurants()
	{
		List<Restaurant> restaurantsList = restaurantRepository.findAll();
		if(restaurantsList==null) return null;
		List<RestaurantResponse> restaurantRespsList = new ArrayList<>();

		for(Restaurant restaurant: restaurantsList)
		{
			restaurantRespsList.add(getRestautantById(restaurant.getId()));
		}
		return restaurantRespsList;
	}

	public RestaurantResponse getRestautantById(int id)
	{
		Optional<Restaurant> restaurant =  restaurantRepository.findById(id);
		if(restaurant.isEmpty()) throw new RestaurantNotFoundException("No restaurant found with id "+id);
		RestaurantResponse restaurantResponse = RestaurantTransformer
												.entityToResponse(restaurant.get());
		return restaurantResponse;
	}
	
	public RestaurantResponse getRestautantByAdmin(String adminusername) 
	{
		Optional<RestaurantAdmin> restaurantAdmin = adminRepository.findByUserName(adminusername);
		if(restaurantAdmin.isEmpty()) throw new RestaurantAdminNotFoundException("No admin found with username "+adminusername);
		
		Optional<Restaurant> restaurant = restaurantRepository.findByAdmin(restaurantAdmin.get());
		if(restaurant.isEmpty()) throw new RestaurantNotFoundException("No Restaurant found with admin "+ adminusername);
		RestaurantResponse restaurantResponse = RestaurantTransformer
												.entityToResponseForAdmin(restaurant.get());
		return restaurantResponse;
	}

	public RestaurantResponse updateRestaurant(int restaurantId, RestaurantRequest restaurantRequest)
	{
		RestaurantAdmin admin = RestaurantAdmin.builder()
		 		   .userName(restaurantRequest.getAdminUserName())
		 		   .password(restaurantRequest.getPassword())
		 		   .build();
		
		Restaurant restaurant = RestaurantTransformer.requestToEntity(restaurantRequest, admin);
		admin.setRestaurant(restaurant);
		restaurant.setId(restaurantId);
		Optional<Restaurant> rsnt = restaurantRepository.findById(restaurantId);
		
		if(rsnt.isEmpty()) throw new RestaurantNotFoundException("No restaurant found with id "+restaurantId);
		restaurantRepository.save(restaurant);
		RestaurantResponse restaurantResponse = RestaurantTransformer.entityToResponse(restaurant);
		return restaurantResponse;
	}

	public RestaurantResponse deleteRestaurant(int restaurantId) 
	{
		Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
		
		if(restaurant.isEmpty()) throw new RestaurantNotFoundException("No restaurant found with id "+restaurantId);
		restaurantRepository.deleteById(restaurantId);
		RestaurantResponse restaurantResponse = RestaurantTransformer.entityToResponse(restaurant.get());
		return restaurantResponse;
	}

	public RestaurantResponse updateProfilePic(int restaurantId, String imageURL) 
	{
		Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
		
		if(restaurant.isEmpty()) throw new RestaurantNotFoundException("No restaurant found with id "+restaurantId);
		restaurant.get().setImageURL(imageURL);
		restaurantRepository.save(restaurant.get());
		RestaurantResponse restaurantResponse = RestaurantTransformer.entityToResponse(restaurant.get());
		return restaurantResponse;
	}

	public List<FoodResponse> getMostOrders(int restaurantId) 
	{
		Restaurant restaurant = restaurantRepository.findById(restaurantId).get();
		List<Order_Entity> orders  = orderRepository.findByRestaurant(restaurant);
		int count =0;
		if(orders.size()<=4) count =orders.size();
		else count =4;
		Order_Entity[] ordersArray = orders.toArray(new Order_Entity[0]);
		
		Arrays.sort(ordersArray, new Comparator<Order_Entity>() {
			@Override
			public int compare(Order_Entity o1, Order_Entity o2) 
			{
				if(o1.getQuantity()>o2.getQuantity()) return -1;
				else if(o1.getQuantity()<o2.getQuantity()) return 1;
				return 0;
			}
		});
		
		Function<Order_Entity, FoodResponse> itemsToResponses = order -> FoodItemTransformer.entityToResponse(order.getFoodItem());
		List<FoodResponse>  itemResponses = Arrays.stream(ordersArray).toList().subList(0, count)
								  .stream()
								  .map(itemsToResponses)
								  .collect(Collectors.toList());
		return itemResponses;
	}

}
