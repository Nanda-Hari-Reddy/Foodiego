package com.Nanda.Food_Delivery.Transformer;

import java.util.stream.Collectors;

import com.Nanda.Food_Delivery.Model.Customer;
import com.Nanda.Food_Delivery.dtoRequests.CustomerRequest;
import com.Nanda.Food_Delivery.dtoResponse.CustomerResponse;

public class CustomerTransformer
{

	public static Customer requestToEntity(CustomerRequest customerRequest)
	{
		Customer customer = Customer.builder()
							.id(customerRequest.getId())
							.name(customerRequest.getName())
							.email(customerRequest.getEmail())
							.password(customerRequest.getPassword())
							.gender(customerRequest.getGender())
							.mobileNo(customerRequest.getMobileNo())
							.build();
		return customer;
	}

	public static CustomerResponse entityToResponse(Customer entity)
	{
		CustomerResponse customerResponse = CustomerResponse.builder()
							.id(entity.getId())
							.name(entity.getName())
							.email(entity.getEmail())
							.addressResponse(entity.getAddresses()
											.stream()
											.map(address -> DeliveryAddressTransformer.entityToResponse(address))
											.collect(Collectors
											.toList()))
							.gender(entity.getGender())
							.mobileNo(entity.getMobileNo())
							.cartResponse(CartTransformer.entityToResponse(entity.getCart()))
							.build();
		return customerResponse;
	}

}
