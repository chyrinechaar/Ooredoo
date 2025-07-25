package com.example.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRegistrationDto {
    
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@ooredoo\\.tn$", message = "Email must be from ooredoo.tn domain")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+\\d{1,4}\\d{7,15}$", message = "Phone number format is invalid")
    private String phoneNumber;
    
    @NotBlank(message = "City is required")
    private String city;
    
    @NotBlank(message = "Department is required")
    private String departement;
    
    @NotBlank(message = "Badge is required")
    @Pattern(regexp = "^BDG.*", message = "Badge must start with 'BDG'")
    private String badge;
    
    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$", 
             message = "Password must be at least 8 characters with uppercase, lowercase, digit and special character")
    private String password;
}