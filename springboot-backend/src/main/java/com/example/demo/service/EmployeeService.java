package com.example.demo.service;

import com.example.demo.dto.EmployeeRegistrationDto;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Employee registerEmployee(EmployeeRegistrationDto registrationDto) {
        // Check if email already exists
        if (employeeRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Check if badge already exists
        if (employeeRepository.existsByBadge(registrationDto.getBadge())) {
            throw new RuntimeException("Badge number already exists");
        }
        
        // Create new employee
        Employee employee = new Employee();
        employee.setFirstName(registrationDto.getFirstName());
        employee.setLastName(registrationDto.getLastName());
        employee.setEmail(registrationDto.getEmail());
        employee.setPhoneNumber(registrationDto.getPhoneNumber());
        employee.setCity(registrationDto.getCity());
        employee.setDepartement(registrationDto.getDepartement());
        employee.setBadge(registrationDto.getBadge());
        
        // Encrypt password
        employee.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        
        return employeeRepository.save(employee);
    }
    
    public boolean emailExists(String email) {
        return employeeRepository.existsByEmail(email);
    }
    
    public boolean badgeExists(String badge) {
        return employeeRepository.existsByBadge(badge);
    }
}