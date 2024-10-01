package com.Nanda.Food_Delivery.Controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Nanda.Food_Delivery.Service.RestaurantService;
import com.Nanda.Food_Delivery.dtoRequests.RestaurantRequest;
import com.Nanda.Food_Delivery.dtoResponse.FoodResponse;
import com.Nanda.Food_Delivery.dtoResponse.RestaurantResponse;
import com.Nanda.Food_Delivery.exception.ErrorDetails;
import com.Nanda.Food_Delivery.hateoas.RestaurantModelAssembler;


@RestController
@RequestMapping("/restaurants")
@SuppressWarnings({ "unchecked", "rawtypes" })
public class RestaurantController
{
	RestaurantService restaurantService;
	RestaurantModelAssembler modelAssembler;
	ErrorDetails errorDetails;
	
	public RestaurantController(RestaurantService restaurantService, RestaurantModelAssembler modelAssembler,
			ErrorDetails errorDetails) {
		super();
		this.restaurantService = restaurantService;
		this.modelAssembler = modelAssembler;
		this.errorDetails = errorDetails;
		errorDetails.setMessage("No requested body found");
		errorDetails.setTimestamp(LocalDateTime.now());
	}

	@PostMapping
	public ResponseEntity<EntityModel<RestaurantResponse>> addRestaurant(@RequestBody RestaurantRequest restaurantRequest)
	{
		if(restaurantRequest==null) return new ResponseEntity(errorDetails, HttpStatus.NOT_ACCEPTABLE);

		RestaurantResponse restaurantResponse = restaurantService.addRestaurant(restaurantRequest);
//		URI location = ServletUriComponentsBuilder
//					   .fromCurrentRequest().path("/{id}")
//					   .buildAndExpand(restaurantResponse.getId())
//					   .toUri();
		EntityModel<RestaurantResponse> entityModel = modelAssembler.toModel(restaurantResponse, "create");
		return new ResponseEntity<>(entityModel, HttpStatus.ACCEPTED);
		
	}

	@GetMapping
	public ResponseEntity<CollectionModel<EntityModel<RestaurantResponse>>> findAllRestaurants()
	{
		List<RestaurantResponse> restaurantResponses = restaurantService.retrieveallRestaurants();
		List<EntityModel<RestaurantResponse>> entityModels = restaurantResponses.stream()
														.map( restaurantResponse -> modelAssembler.toModel(restaurantResponse, "GetOne"))
														.collect(Collectors.toList());
		CollectionModel<EntityModel<RestaurantResponse>> entityModelCollection = CollectionModel.of(entityModels, linkTo(methodOn(RestaurantController.class).findAllRestaurants()).withSelfRel());
		return new ResponseEntity<>(entityModelCollection, HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping(path = "/{adminusername}")
	public ResponseEntity<RestaurantResponse> findRestaurantByAdmin(@PathVariable String adminusername)
	{
		RestaurantResponse restaurantResponse = restaurantService.getRestautantByAdmin(adminusername);
		return new ResponseEntity<>(restaurantResponse, HttpStatus.ACCEPTED);
	}

	@GetMapping(path = "/{restaurantId}")
	public ResponseEntity<EntityModel<RestaurantResponse>> findRestaurantById(@PathVariable int restaurantId)
	{
		RestaurantResponse restaurantResponse = restaurantService.getRestautantById(restaurantId);
		EntityModel<RestaurantResponse> entityModel = modelAssembler.toModel(restaurantResponse, "GetOne");
		return new ResponseEntity<>(entityModel, HttpStatus.ACCEPTED);
	}
	
	@GetMapping(path = "/{restaurantId}/mostOrders")
	public ResponseEntity<FoodResponse> findMostOrdersForRstaurant(@PathVariable int restaurantId)
	{
		List<FoodResponse> foodItems = restaurantService.getMostOrders(restaurantId);
		return new ResponseEntity(foodItems, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(path = "{restaurantId}")
	public ResponseEntity<EntityModel<RestaurantResponse>> UpdateRestaurant(@PathVariable int restaurantId, @RequestBody RestaurantRequest restaurantRequest) 
	{
		if(restaurantRequest==null) return new ResponseEntity(errorDetails, HttpStatus.NOT_ACCEPTABLE);

		RestaurantResponse restaurantResponse = restaurantService.updateRestaurant(restaurantId, restaurantRequest);
		EntityModel<RestaurantResponse> entityModel = modelAssembler.toModel(restaurantResponse, "update");
		return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entityModel);
	}
	
	@DeleteMapping(path = "{restaurantId}")
	public ResponseEntity<EntityModel<RestaurantResponse>> deleteRestaurant(@PathVariable int restaurantId)
	{
		RestaurantResponse restaurantResponse = restaurantService.deleteRestaurant(restaurantId);
		EntityModel<RestaurantResponse> entityModel = modelAssembler.toModel(restaurantResponse, "delete");
		return new ResponseEntity<>(entityModel, HttpStatus.ACCEPTED); 
	}
	@PatchMapping(path = "{restaurantId}")
	public ResponseEntity<EntityModel<RestaurantResponse>> updateProfilePicture(@PathVariable int restaurantId, String imageURL)
	{
		RestaurantResponse restaurantResponse = restaurantService.updateProfilePic(restaurantId, imageURL);
		EntityModel<RestaurantResponse> entityModel = modelAssembler.toModel(restaurantResponse, "update");
		return new ResponseEntity<>(entityModel, HttpStatus.ACCEPTED);
	}
	
}
