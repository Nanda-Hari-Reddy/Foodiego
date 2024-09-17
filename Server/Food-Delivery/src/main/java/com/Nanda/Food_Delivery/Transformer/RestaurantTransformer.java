package com.Nanda.Food_Delivery.Transformer;
import com.Nanda.Food_Delivery.Model.Restaurant;
import com.Nanda.Food_Delivery.dtoRequests.RestaurantRequest;
import com.Nanda.Food_Delivery.dtoResponse.RestaurantResponse;

public class RestaurantTransformer
{
    public static Restaurant requestToEntity(RestaurantRequest request)
    {
         return Restaurant.builder()
                 .restaurantName(request.getRestaurantName())
                 .contactNumber(request.getContactNumber())
                 .location(request.getLocation())
                 .restaurantCategory(request.getRestaurantCategory())
                 .imageURL(request.getImageURL())
                 .build();
    }

    public static RestaurantResponse entityToResponse(Restaurant entity)
    {
        return RestaurantResponse.builder()
        		.id(entity.getId())
                .restaurantName(entity.getRestaurantName())
                .contactNumber(entity.getContactNumber())
                .location(entity.getLocation())
                .restaurantCategory(entity.getRestaurantCategory())
                .opened(entity.getOpened())
                .imageURL(entity.getImageURL())
                .build();
    }
}
