package com.Rishabh.ExpenseTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.Rishabh.ExpenseTracker") // This annotation is used to indicate that the class is a Spring Boot application.
public class ExpenseTrackerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerApplication.class, args);

	}
}