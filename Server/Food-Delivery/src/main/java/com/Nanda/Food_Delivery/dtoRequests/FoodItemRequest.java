package com.Nanda.Food_Delivery.dtoRequests;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class FoodItemRequest
{

	String imageURL;
	
	String name;

	boolean  veg;

	double totalcost;
}
