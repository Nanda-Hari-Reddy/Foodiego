package com.Nanda.Food_Delivery.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Nanda.Food_Delivery.Model.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>
{

}
