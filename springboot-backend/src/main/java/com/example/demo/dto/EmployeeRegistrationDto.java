package com.example.demo.dto;

import lombok.Data;

@Data
public class EmployeeRegistrationDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String city;
    private String departement;
    private String badge;
    private String password;
    private String confirmPassword;
}