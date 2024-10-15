package com.Nanda.Food_Delivery.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.Nanda.Food_Delivery.Model.Customer;
import com.Nanda.Food_Delivery.Repository.CustomerRepository;
import com.Nanda.Food_Delivery.exception.UserNotFoundException;

@Configuration
@EnableWebSecurity
public class SecurityConfig
{
	@Autowired
	CustomerRepository customerRepository;
	
	@Bean
	public SecurityFilterChain configuresecurityfilters(HttpSecurity http) throws Exception
	{
		return http
		.authorizeHttpRequests(
			auth -> 
				auth
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.requestMatchers(HttpMethod.POST, "/user").permitAll()
				.anyRequest().authenticated()
			)
		.httpBasic(Customizer.withDefaults())
		.sessionManagement(
			session -> session.sessionCreationPolicy
			(SessionCreationPolicy.STATELESS))
		.csrf(csrf -> csrf.disable()) 
		.build();
	}
	
	@Bean
	public UserDetailsService userDetaisService()
	{
		return username -> {
            Customer customer = customerRepository.findByEmail(username)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            return User.withUsername(customer.getEmail())
                    .password(customer.getPassword())
                    .build();
        };
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	
//	@Bean
//	public DaoAuthenticationProvider aurthenticationProvider()
//	{
//		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//		authProvider.setUserDetailsService(userDetailsService);
//		authProvider.setPasswordEncoder(passwordEncoder());
//		return authProvider;
//	}
//	
//	 @Bean
//	public AuthenticationManager configure(AuthenticationManagerBuilder auth) throws Exception
//	{
//		auth.authenticationProvider(aurthenticationProvider());
//		return auth.build();
//	}
	
}
