package com.Nanda.Food_Delivery.Model;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.Nanda.Food_Delivery.enums.Opened;
import com.Nanda.Food_Delivery.enums.RestarauntCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RestaurantAdmin 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	String userName;
	
	String password;
	
	@OneToOne
	Restaurant restaurant;
}
