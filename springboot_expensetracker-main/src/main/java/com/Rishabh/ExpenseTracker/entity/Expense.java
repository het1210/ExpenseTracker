package com.Rishabh.ExpenseTracker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity  // This annotation is used to specify that the class is an entity and is mapped to a database table.
@Data   // This annotation is used to generate getters and setters for the class.
public class Expense {

    @Id // This annotation is used to specify the primary key of an entity.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This annotation is used to specify the generation strategy for the primary key.
    private long id;

    private String title;

    private String description;

    private String category;

    private LocalDate date;

    private Integer amount;
}
