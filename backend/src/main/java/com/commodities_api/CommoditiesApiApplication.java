package com.commodities_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CommoditiesApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommoditiesApiApplication.class, args);
        System.out.println("Commodities API is running...");
	}

}
